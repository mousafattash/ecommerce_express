import { Schema, model,mongoose,Types } from 'mongoose';
const couponSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Coupon name is required'],
        trim: true,
        unique: true,
        lowercase: true,
        index: true,
        minLength: [3, 'Coupon name must be at least 3 characters'],
        maxLength: [50, 'Coupon name cannot exceed 50 characters']
    },
    amount: {
        type: Number,
        required: [true, 'Coupon amount is required'],
        min: [0, 'Coupon amount cannot be negative']
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        default: 'percentage'
    },
    discountValue: {
        type: Number,
        required: [true, 'Discount value is required'],
        min: [0, 'Discount value cannot be negative']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['active', 'inactive'],
            message: '{VALUE} is not a valid status'
        },
        default: 'active'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    
});

couponSchema.pre('save', function(next) {
    this.slug = this.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    next();
});
const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;