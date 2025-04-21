import Joi from 'joi';

export const addToCartSchema = {
    body: Joi.object({
        productId: Joi.string().required().hex().length(24).messages({
            'string.empty': 'Product ID is required',
            'string.hex': 'Invalid product ID format',
            'string.length': 'Invalid product ID length'
        }),
        quantity: Joi.number().integer().min(1).required().messages({
            'number.base': 'Quantity must be a number',
            'number.integer': 'Quantity must be an integer',
            'number.min': 'Quantity must be at least 1',
            'any.required': 'Quantity is required'
        })
    })
};

export const updateCartItemSchema = {
    params: Joi.object({
        productId: Joi.string().required().hex().length(24).messages({
            'string.empty': 'Product ID is required',
            'string.hex': 'Invalid product ID format',
            'string.length': 'Invalid product ID length'
        })
    }),
    body: Joi.object({
        quantity: Joi.number().integer().min(1).required().messages({
            'number.base': 'Quantity must be a number',
            'number.integer': 'Quantity must be an integer',
            'number.min': 'Quantity must be at least 1',
            'any.required': 'Quantity is required'
        })
    })
};

export const removeFromCartSchema = Joi.object({
    productId: Joi.string().required().messages({
        'string.empty': 'Product ID is required',
        'any.required': 'Product ID is required'
    })
});
