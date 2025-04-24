import Joi from 'joi';

export const createOrderSchema = Joi.object({
  couponName: Joi.string().allow(null, ''),
  shippingAddress: Joi.string().min(10).max(100),
  phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/),
  paymentType: Joi.string().valid('cash', 'card').required(),
  images: Joi.array().items(Joi.string()).max(5)
});

export const changeOrderStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').required()
});

