import { Schema, model, mongoose,Types } from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        unique: true,
        lowercase: true,
        index: true,
        minLength: [3, 'Product name must be at least 3 characters'],
        maxLength: [50, 'Product name cannot exceed 50 characters']
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        index: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Product price cannot be negative']
    },
    discount: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%']
    },
    stock: {
        type: Number,
        required: [true, 'Product quantity is required'],
        min: [0, 'Product quantity cannot be negative']
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
    mainImage: {
     type:Object,
        required: true,
        validate: {
            validator: function(value) {
                return value && value.url && value.public_id;
            },
            message: 'Image URL and public ID are required'
        }
    },
    subImages: {
        type: [Object],
        validate: {
            validator: function(value) {
                return value && value.every(img => img.url && img.public_id);
            },
            message: 'All sub-images must have URL and public ID'
        }
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
    },
    catagory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },colors: {
        type: [String],
        required: true,
        validate: {
            validator: function(value) {
                return value && value.length > 0;
            },
            message: 'At least one color is required'
        }
    },sizes: {
        type: [String],
        required: true,
        validate: {
            validator: function(value) {
                return value && value.length > 0;
            },
            message: 'At least one size is required'
        }
    }
    ,description: {
        type: String,
        required: true,
        minLength: [20, 'Description must be at least 20 characters'],
        maxLength: [1000, 'Description cannot exceed 1000 characters']
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// Create slug before saving
productSchema.pre('save', function(next) {
    this.slug = this.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    next();
});
const Product = mongoose.model('Product', productSchema);
export default Product;

//must have name & price & quantity & status & mainImage & subImages & catagory & colors & sizes & description
