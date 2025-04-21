// src/middleware/catchError.js

export const asyncHandler = (fn, statusCode = 500) => {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next))
        .catch((err) => {
          console.error(err);  // Log the error for debugging
          res.status(statusCode).json({ message: err.message || 'Internal Server Error' });
        });
    };
  };