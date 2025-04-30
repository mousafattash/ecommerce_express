import jwt from 'jsonwebtoken';
import User from '../../DB/models/user.model.js';
import { asyncHandler } from './catchError.js';

export const auth = (role) => asyncHandler(async (req, res, next) => {
    // Check if authorization header exists
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).json({ message: "Authentication required" });
    }
    
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user || user.status === "inactive") {
            return res.status(401).json({ message: "User not found or inactive" });
        }

        // Check role if provided
        if (role && user.role !== role) {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }

        req.user = user;
        req.id = user._id; // Add user ID to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
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