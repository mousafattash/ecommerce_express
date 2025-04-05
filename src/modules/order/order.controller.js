import Order from '../../../DB/models/order.model.js';
import Cart from '../../../DB/models/cart.model.js';
import Product from '../../../DB/models/product.model.js';
import Coupon from '../../../DB/models/coupon.model.js';
import User from '../../../DB/models/user.model.js';
const router = Router();




export const createOrder = async (req, res) => { 
 

    const cart=await Cart.findOne({userId:req.id});

    if(!cart){
        return res.status(404).json({message:'Cart not found'});
    }
    if(cart.cartItems.length===0){
        return res.status(400).json({message:'Cart is empty'});
    }

    if(couponName){
        const coupon=await Coupon.findOne({name:couponName});
        if(!coupon){
            return res.status(404).json({message:'Coupon not found'});
        }
        if(coupon.expireDate<new Date()){
            return res.status(400).json({message:'Coupon expired'});
        }
        if(coupon.usedBy.includes(req.id)){
            return res.status(400).json({message:'Coupon already used'});
            
        }
        req.body.coupon=coupon;
    }

    const finalProducts=[];
    let subTotal=0;
    for(let product of cart.products){
        const checkProduct= await Product.findOne
        ({ productId: product.productId, stock: { $gte: product.quantity } });
        if(!checkProduct) {
            return res.status(400).json({ message: `Product ${product.productId} is not avaliable` });
        }
    }

    product=product.toObject();//convert mongoose object to js object --> bson into json
    product.name=checkProduct.name;
    product.price=checkProduct.price;
    product.unitPrice=checkProduct.priceAfterDiscount;
    product.finalPrice=checkProduct.priceAfterDiscount*product.quantity;
    subTotal+=product.finalPrice;

    finalProducts.push(product);

    const user=await User.findById(req.id);
    if(!req.body.shippingAddress){
        req.body.shippingAddress=user.address;
    }

    if(!req.body.phoneNumber){
        req.body.phoneNumber=user.phoneNumber;
    }

    const Order=await Order.create({
        userId:req.id,
        products:finalProducts,
        couponName:couponName ?? null,
        finalPrice:subTotal- (subTotal * (req.body.coupon?.amount / 100)|| 0),
        shippingAddress:req.body.shippingAddress,
        phoneNumber:req.body.phoneNumber,
        paymentType:req.body.paymentType
    });
    await Cart.findByIdAndDelete(cart._id);

    for(const product of cart.products){
        await Product.findByIdAndUpdate(product.productId, {
            $inc: { stock: -product.quantity }
        });
    }

    if(req.body.coupon){
        await Coupon.updateOne(
            { _id: req.body.coupon._id },
            { $push: { usedBy: req.id } }
        );
    }
   await Cart.updateOne(
        { userId: req.id },
        { $set: { products: [] } }
    );


}

export const getOrdersCustomer = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.id })
            .populate('products.product')
            .populate('userId', 'name email phoneNumber address');
        return res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getOrdersByStatus = async (req, res) => {
    // 
    const { status } = req.params;
    try {
        const orders = await Order.find({ status })
            .populate('products.productId')
            
        return res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const changeOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    if(!order){
        return res.status(400).json({message:'order not found'});
    }
    order.status = req.body;
    
    if (req.body.status === 'delivered' ) {
        res.status(400).json({ message: "can't cancel this order" });
    }

    if(req.body.status === 'cancelled') {
        for (const product of order.products) {
            await Product.findByIdAndUpdate(product.productId, {
                $inc: { stock: product.quantity }
            });
        }
        if(req.body.coupon){
            await Coupon.updateOne(
                { _id: req.body.coupon._id },
                { $pull: { usedBy: req.id } }
            );
        }
       
      
    }

    
    
    order.updatedBy = req.user._id;
    await order.save();
    return res.status(200).json({ message: 'Order status updated successfully' });
}

