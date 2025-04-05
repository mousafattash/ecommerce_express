import { Schema, model,mongoose,Types } from 'mongoose';

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must be at most 5']
    },
    comment: {
        type: String,
        required: true,
    },image: {
        type: Object, 
    },
}, { timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
 });

reviewSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'productId'
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;