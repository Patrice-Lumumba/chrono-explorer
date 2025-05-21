/**
 * Centralized Error Handling
 * Provides custom error classes and error handling utilities
 */

/**
 * Custom API Error class
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation Error
 */
class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

/**
 * Not Found Error
 */
class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Unauthorized Error
 */
class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

/**
 * Forbidden Error
 */
class ForbiddenError extends AppError {
  constructor(message = 'Forbidden access') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

/**
 * Middleware for handling errors in Express
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Log errors in development mode
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  // Return standardized error response
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  errorHandler
};
