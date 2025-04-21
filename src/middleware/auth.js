import jwt from 'jsonwebtoken';
import User from '../../DB/models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';

export const auth = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.status === "inactive") {
        return res.status(401).json({ message: "User not found or inactive" });
    }

    req.user = user;
    next();
});

export const allowedTo = (...roles) => {
    return asyncHandler(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You are not authorized to perform this action"
            });
        }
        next();
    });
};