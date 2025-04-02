import Coupon from "../../../DB/models/coupon.model.js";

export const createCoupon = async (req, res) => {
    // try {
    //     const { code, discount, expirationDate } = req.body;
    //     const createdBy = req.user._id;

    //     // Validate the input
    //     if (!code || !discount || !expirationDate) {
    //         return res.status(400).json({ message: 'All fields are required' });
    //     }

    //     // Create the coupon
    //     const coupon = await Coupon.create({
    //         code,
    //         discount,
    //         expirationDate,
    //         createdBy
    //     });

    //     return res.status(201).json({ message: 'Coupon created successfully', coupon });
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ message: 'Internal server error' });
    // }

    if(await Coupon.findOne(req.body.name)){
        return res.status(400).json({message:'Coupon already exists'});
    }

    const coupon = await Coupon.create(req.body);
    
    return res.status(201).json({message:'Coupon created successfully', coupon});
}

export const getCoupons = async (req, res) => {
    // try {
    //     const coupons = await Coupon.find({}).populate('createdBy', 'name').populate('updatedBy', 'name');
    //     return res.status(200).json({ coupons });
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ message: 'Internal server error' });
    // }
    const coupons = await Coupon.find({});
    return res.status(200).json({coupons});
}