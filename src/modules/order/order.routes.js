import express from 'express';
import { createOrder, getOrdersCustomer, getOrdersByStatus, changeOrderStatus } from './order.controller.js';
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import { createOrderSchema, changeOrderStatusSchema } from './order.validation.js';

const router = express.Router();

// Customer routes
router.post('/',
  auth('user'),
  validation(createOrderSchema),
  createOrder
);

router.get('/customer',
  auth('user'),
  getOrdersCustomer
);

// Admin routes
router.get('/status/:status',
  auth('admin'),
  getOrdersByStatus
);

router.patch('/:orderId/status',
  auth('admin'),
  validation(changeOrderStatusSchema),
  changeOrderStatus
);

export default router; 