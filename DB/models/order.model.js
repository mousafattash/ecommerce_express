import { Schema, model,mongoose,Types } from 'mongoose';

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productName: {
                type: String,
                required: true,
            },
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity must be at least 1']
            },
            unitPrice: {
                type: Number,
                required: true,
                min: [0, 'Unit price cannot be negative']

            },
            totalPrice: {
                type: Number,
                required: true,
                min: [0, 'Total price cannot be negative']
            },
        }
    ],
    couponName: {
        type: String,
    },
    finalPrice: {
        type: Number,
        required: true,
        min: [0, 'Final price cannot be negative']
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },phonenumber: {
        type: String,
        required: true,
    },address: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        enum: ['cash','credit_card'],
    },
    shippingAddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending','cancelled','confirmed', 'onWay', 'delivered'],
        default: 'pending'
    },
    note: {
        type: String,
    },
    reasonRejected: {
        type: String,
    }, 
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },priceAfterDiscount: {
        type: Number,
        required: true,
        min: [0, 'Final price cannot be negative']
    },
}, { timestamps: true });





const Order = mongoose.model('Order', orderSchema);
export default Order;