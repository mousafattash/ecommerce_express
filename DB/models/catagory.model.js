import { Schema, model, mongoose } from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        unique: true,
        lowercase: true,
        index: true,
        minLength: [3, 'Category name must be at least 3 characters'],
        maxLength: [50, 'Category name cannot exceed 50 characters']
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        index: true
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
    image: {
     type:Object,
        required: true,
        validate: {
            validator: function(value) {
                return value && value.url && value.public_id;
            },
            message: 'Image URL and public ID are required'
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
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create slug before saving
categorySchema.pre('save', function(next) {
    this.slug = this.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    next();
});

// Add virtual for full image URL
categorySchema.virtual('imageUrl').get(function() {
    return this.image?.url || '';
});

const Category = model('Category', categorySchema);

export default Category;