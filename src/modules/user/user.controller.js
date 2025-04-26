import { User } from "./user.model.js";
import bcrypt from "bcrypt";

// Get current user profile
export const getProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    throw new AppError("User not found", 404);
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

// Update current user profile
export const updateProfile = catchAsync(async (req, res) => {
  const allowedUpdates = ["name", "email", "phone"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    throw new AppError("Invalid updates", 400);
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  updates.forEach((update) => (user[update] = req.body[update]));
  await user.save();

  res.status(200).json({
    status: "success",
    data: user,
  });
});

// Delete current user profile
export const deleteProfile = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Get all users (admin only)
export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

// Get user by ID (admin only)
export const getUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    throw new AppError("User not found", 404);
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

// Update user role (admin only)
export const updateUserRole = catchAsync(async (req, res) => {
  const { role } = req.body;
  if (!["user", "admin"].includes(role)) {
    throw new AppError("Invalid role", 400);
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.role = role;
  await user.save();

  res.status(200).json({
    status: "success",
    data: user,
  });
});

// Delete user (admin only)
export const deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new AppError("Current password is incorrect", 400);
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password changed successfully",
  });
});

// Update user status (admin only)
export const updateUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate status
  if (!["active", "inactive"].includes(status)) {
    throw new AppError(
      "Invalid status. Must be either 'active' or 'inactive'",
      400
    );
  }

  const user = await User.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Prevent self-deactivation
  if (user._id.toString() === req.user._id.toString()) {
    throw new AppError("Cannot change your own status", 400);
  }

  // Prevent deactivating super admin
  if (user.role === "superadmin" && status === "inactive") {
    throw new AppError("Cannot deactivate a super admin", 403);
  }

  user.status = status;
  await user.save();

  res.status(200).json({
    status: "success",
    message: `User status updated to ${status}`,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
    },
  });
});
