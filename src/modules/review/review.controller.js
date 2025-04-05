import Order from "../../../DB/models/order.model.js";
import Review from "../../../DB/models/review.model.js";


export const createReview = async (req, res) => {
    // const { productId } = req.params;
    // const { rating, comment } = req.body;

    // if (!rating || !comment) {
    //     return res.status(400).json({ message: 'Rating and comment are required' });
    // }

    // try {
    //     const review = await Review.create({
    //         productId,
    //         userId: req.user._id,
    //         rating,
    //         comment
    //     });

    //     return res.status(201).json({ message: 'Review created successfully', review });
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ message: 'Internal server error' });
    // }

    const userId=req.id;
    const { productId } = req.params;
    const { rating, comment } = req.body;
    
    const order=Order.findOne
    ({userId,status:'delivered',productId});

    if(!order){
        return res.status(400).json({ message: 'You can only review products you have purchased' });
    }
    if (!rating || !comment) {
        return res.status(400).json({ message: 'Rating and comment are required' });
    }

    const review = await Review.create({
        productId,
        userId,
        rating,
        comment
    });

    if(!review){
        return res.status(400).json({ message: 'Failed to create review' });
    }
 

    return res.status(201).json({ message: 'Review created successfully', review });
}

export const getReviewsCount = async (req, res) => {
    const { productId } = req.params;

    try {
        const reviewsCount = await Review.countDocuments({ productId });

        return res.status(200).json({ reviewsCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}