import User from '../../../DB/models/user.model.js';
import { asyncHandler } from '../../middleware/catchError.js';
import { sendAccountUpdate } from '../../utils/sendEmail.js';
import bcrypt from 'bcrypt';

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id)
    .select('-password -__v -createdAt -updatedAt');
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json({ user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, address } = req.body;
  const userId = req.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if email is being changed and if it's already taken
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
  }

  // Update user profile
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      name: name || user.name,
      email: email || user.email,
      phoneNumber: phoneNumber || user.phoneNumber,
      address: address || user.address
    },
    { new: true }
  ).select('-password -__v -createdAt -updatedAt');

  // Send email notification
  await sendAccountUpdate(updatedUser.email, updatedUser.name);

  return res.status(200).json({
    message: 'Profile updated successfully',
    user: updatedUser
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Current password is incorrect' });
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  await User.findByIdAndUpdate(userId, { password: hashedPassword });

  return res.status(200).json({ message: 'Password changed successfully' });
});

