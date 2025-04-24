import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            finalPrice: {
                type: Number,
                required: true
            }
        }
    ],
    couponName: {
        type: String,
        default: null
    },
    finalPrice: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    phonenumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        enum: ['cash', 'card'],
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    note: {
        type: String,
    },
    reasonRejected: {
        type: String,
    }, 
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    priceAfterDiscount: {
        type: Number,
        required: true,
        min: [0, 'Final price cannot be negative']
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    }],
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;