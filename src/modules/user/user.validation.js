import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/),
  address: Joi.string().min(10).max(100)
}).min(1).message('At least one field must be provided for update');

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'string.min': 'Password must be at least 8 characters long'
    })
});

