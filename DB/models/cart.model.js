import { Schema, model,mongoose,Types } from 'mongoose';
const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        undefined:true,
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity must be at least 1']
            }
        }
    ],

}, { timestamps: true });


const Cart = mongoose.model('Cart', cartSchema);

export default Cart;