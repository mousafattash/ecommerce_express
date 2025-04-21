import express from 'express';
import { validate } from '../../middleware/validate.js';
import { addToCartSchema, updateCartItemSchema } from './cart.validation.js';
import { 
    getCart, 
    addToCart, 
    updateCartItem, 
    removeFromCart, 
    clearCart 
} from './cart.controller.js';
import { auth } from '../../middleware/auth.js';

const router = express.Router();

// Apply auth middleware to all cart routes
router.use(auth);

// Get user's cart
router.get('/', getCart);

// Add item to cart
router.post('/', validate(addToCartSchema), addToCart);

// Update cart item quantity
router.patch('/:productId', validate(updateCartItemSchema), updateCartItem);

// Remove item from cart
router.delete('/:productId', removeFromCart);

// Clear cart
router.delete('/', clearCart);

export default router; 