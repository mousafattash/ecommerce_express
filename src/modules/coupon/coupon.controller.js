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

export const getAllCoupons = async (req, res) => {
    const coupons = await Coupon.find({}).populate('createdBy', 'name').populate('updatedBy', 'name');
    return res.status(200).json({coupons});
}

export const getActiveCoupons = async (req, res) => {
    const currentDate = new Date();
    const coupons = await Coupon.find({
        status: 'active',
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate }
    }).populate('createdBy', 'name').populate('updatedBy', 'name');
    
    return res.status(200).json({coupons});
}

export const getCouponById = async (req, res) => {
    const { id } = req.params;
    
    const coupon = await Coupon.findById(id).populate('createdBy', 'name').populate('updatedBy', 'name');
    
    if (!coupon) {
        return res.status(404).json({message: 'Coupon not found'});
    }
    
    return res.status(200).json({coupon});
}

export const deleteCoupon = async (req, res) => {
    const { id } = req.params;
    
    const coupon = await Coupon.findByIdAndDelete(id);
    
    if (!coupon) {
        return res.status(404).json({message: 'Coupon not found'});
    }
    
    return res.status(200).json({message: 'Coupon deleted successfully'});
}

export const updateCoupon = async (req, res) => {
    const { id } = req.params;
    
    const coupon = await Coupon.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true, runValidators: true }
    ).populate('createdBy', 'name').populate('updatedBy', 'name');
    
    if (!coupon) {
        return res.status(404).json({message: 'Coupon not found'});
    }
    
    return res.status(200).json({message: 'Coupon updated successfully', coupon});
}

export const searchCoupons = async (req, res) => {
    const { keyword } = req.params;
    
    const coupons = await Coupon.find({
        name: { $regex: keyword, $options: 'i' }
    }).populate('createdBy', 'name').populate('updatedBy', 'name');
    
    return res.status(200).json({coupons});
}