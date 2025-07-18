import Cart from '../../../DB/models/cart.model.js';
import Product from '../../../DB/models/product.model.js';
import { asyncHandler } from '../../middleware/catchError.js';

// Get user's cart
export const getCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart) {
        return res.status(200).json({
            success: true,
            data: { items: [], total: 0 }
        });
    }

    return res.status(200).json({
        success: true,
        data: cart
    });
});

// Add item to cart
export const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product is in stock
    if (product.stock < quantity) {
        return res.status(400).json({ message: 'Not enough stock available' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        // Create new cart if it doesn't exist
        cart = await Cart.create({
            user: userId,
            items: [{ product: productId, quantity }]
        });
    } else {
        // Check if product already exists in cart
        const existingItem = cart.items.find(item => 
            item.product.toString() === productId
        );

        if (existingItem) {
            // Update quantity if product exists
            existingItem.quantity += quantity;
            if (existingItem.quantity > product.stock) {
                return res.status(400).json({ message: 'Not enough stock available' });
            }
        } else {
            // Add new item if product doesn't exist
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
    }

    // Populate product details
    await cart.populate('items.product');

    return res.status(200).json({
        success: true,
        data: cart
    });
});

// Update cart item quantity
export const updateCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product is in stock
    if (product.stock < quantity) {
        return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Find and update the item
    const itemIndex = cart.items.findIndex(item => 
        item.product.toString() === productId
    );

    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Product not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    // Populate product details
    await cart.populate('items.product');

    return res.status(200).json({
        success: true,
        data: cart
    });
});

// Remove item from cart
export const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the item
    cart.items = cart.items.filter(item => 
        item.product.toString() !== productId
    );

    await cart.save();

    // Populate product details
    await cart.populate('items.product');

    return res.status(200).json({
        success: true,
        data: cart
    });
});

// Clear cart
export const clearCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    return res.status(200).json({
        success: true,
        data: cart
    });
});