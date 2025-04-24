import Order from '../../../DB/models/order.model.js';
import Cart from '../../../DB/models/cart.model.js';
import Product from '../../../DB/models/product.model.js';
import Coupon from '../../../DB/models/coupon.model.js';
import User from '../../../DB/models/user.model.js';
import { sendOrderConfirmation } from '../../utils/sendEmail.js';
import cloudinary from '../../utils/cloudinary.js';
import { asyncHandler } from '../../middleware/catchError.js';

export const createOrder = asyncHandler(async (req, res) => {
  const { couponName, shippingAddress, phoneNumber, paymentType } = req.body;
  const userId = req.id;
  const files = req.files;

  // Find user's cart
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  if (cart.cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  // Handle coupon if provided
  let coupon = null;
  if (couponName) {
    coupon = await Coupon.findOne({ name: couponName });
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    if (coupon.expireDate < new Date()) {
      return res.status(400).json({ message: 'Coupon expired' });
    }
    if (coupon.usedBy.includes(userId)) {
      return res.status(400).json({ message: 'Coupon already used' });
    }
  }

  // Process products and calculate total
  const finalProducts = [];
  let subTotal = 0;

  for (const item of cart.cartItems) {
    const product = await Product.findOne({
      _id: item.productId,
      stock: { $gte: item.quantity }
    });

    if (!product) {
      return res.status(400).json({ message: `Product ${item.productId} is not available` });
    }

    const productData = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      finalPrice: product.price * item.quantity
    };

    subTotal += productData.finalPrice;
    finalProducts.push(productData);
  }

  // Handle image uploads
  let uploadedImages = [];
  if (files && files.length > 0) {
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'order_images',
        resource_type: 'auto'
      });
      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id
      });
    }
  }

  // Get user details
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Create order
  const order = await Order.create({
    userId,
    products: finalProducts,
    couponName: couponName ?? null,
    finalPrice: subTotal - (subTotal * (coupon?.amount / 100) || 0),
    shippingAddress: shippingAddress || user.address,
    phoneNumber: phoneNumber || user.phoneNumber,
    paymentType,
    images: uploadedImages
  });

  // Update product stock
  for (const product of finalProducts) {
    await Product.findByIdAndUpdate(product.productId, {
      $inc: { stock: -product.quantity }
    });
  }

  // Update coupon if used
  if (coupon) {
    await Coupon.updateOne(
      { _id: coupon._id },
      { $push: { usedBy: userId } }
    );
  }

  // Clear cart
  await Cart.findByIdAndDelete(cart._id);

  // Send order confirmation email
  await sendOrderConfirmation(user.email, user.name, order._id, order.finalPrice);

  return res.status(201).json({
    message: 'Order created successfully',
    order
  });
});

export const getOrdersCustomer = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.id })
    .populate('products.productId')
    .populate('userId', 'name email phoneNumber address');
  
  return res.status(200).json({ orders });
});

export const getOrdersByStatus = asyncHandler(async (req, res) => {
  const { status } = req.params;
  const orders = await Order.find({ status })
    .populate('products.productId')
    .populate('userId', 'name email');
  
  return res.status(200).json({ orders });
});

export const changeOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  if (order.status === 'delivered') {
    return res.status(400).json({ message: "Can't modify a delivered order" });
  }

  if (status === 'cancelled') {
    // Restore product stock
    for (const product of order.products) {
      await Product.findByIdAndUpdate(product.productId, {
        $inc: { stock: product.quantity }
      });
    }

    // Remove user from coupon usedBy if applicable
    if (order.couponName) {
      await Coupon.updateOne(
        { name: order.couponName },
        { $pull: { usedBy: order.userId } }
      );
    }
  }

  order.status = status;
  order.updatedBy = req.user._id;
  await order.save();

  return res.status(200).json({ 
    message: 'Order status updated successfully',
    order 
  });
});

