import { Router } from 'express';
import * as adminController from './admin.controller.js';
import { auth, allowedTo } from '../../middleware/auth.js';

const router = Router();

// All routes require authentication and admin/superadmin role
router.use(auth);

// Routes accessible by both admin and superadmin
router.get('/users', allowedTo('admin', 'superadmin'), adminController.getAllUsers);
router.get('/users/:userId', allowedTo('admin', 'superadmin'), adminController.getUserDetails);
router.patch('/users/:userId/status', allowedTo('admin', 'superadmin'), adminController.updateUserStatus);

// Routes accessible only by superadmin
router.patch('/users/:userId/role', allowedTo('superadmin'), adminController.updateUserRole);

export default router; 