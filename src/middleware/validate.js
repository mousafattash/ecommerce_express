import asyncHandler from '../utils/asyncHandler.js';

export const validate = (schema) => {
    return asyncHandler(async (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(err => ({
                field: err.path[0],
                message: err.message
            }));

            return res.status(400).json({
                message: "Validation Error",
                errors
            });
        }

        next();
    });
}; 