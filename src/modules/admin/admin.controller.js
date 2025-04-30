import User from '../../../DB/models/user.model.js';
import {asyncHandler} from '../../middleware/catchError.js';

// Get all users (admin & superadmin only)
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json({ users });
});

// Update user role (superadmin only)
export const updateUserRole = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ message: "Invalid role specified" });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Prevent superadmin role changes
    if (user.role === 'superadmin') {
        return res.status(403).json({ message: "Cannot modify superadmin role" });
    }

    user.role = role;
    await user.save();

    res.json({
        message: "User role updated successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});

// Get user details (admin & superadmin only)
export const getUserDetails = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId, '-password');
    
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
});

// Update user status (admin & superadmin only)
export const updateUserStatus = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
        return res.status(400).json({ message: "Invalid status specified" });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Prevent superadmin status changes
    if (user.role === 'superadmin') {
        return res.status(403).json({ message: "Cannot modify superadmin status" });
    }

    user.status = status;
    await user.save();

    res.json({
        message: "User status updated successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            status: user.status
        }
    });
}); 