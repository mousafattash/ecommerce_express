import express from 'express';
import { getProfile, updateProfile, changePassword } from './user.controller.js';
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import { updateProfileSchema, changePasswordSchema } from './user.validation.js';

const router = express.Router();

// Get user profile
router.get('/profile',
  auth('user'),
  getProfile
);

// Update user profile
router.put('/update',
  auth('user'),
  validation(updateProfileSchema),
  updateProfile
);

// Change password
router.put('/change-password',
  auth('user'),
  validation(changePasswordSchema),
  changePassword
);

export default router;

