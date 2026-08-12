const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

const notFound = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

const errorHandler = (error, _req, res, _next) => {
  const isCustomError = error instanceof ApiError || error.name === 'ApiError' || (error.statusCode && error.statusCode >= 400 && error.statusCode < 500);
  const statusCode = isCustomError ? error.statusCode : 500;
  const message = error.message || (statusCode === 500 ? 'Internal server error' : 'Request failed');

  if (statusCode >= 500) {
    console.error("\n================ 500 ERROR ================");
    console.error("Message:", error.message);
    console.error("Name:", error.name);
    if (error.parent) console.error("Parent:", error.parent.message);
    if (error.original) console.error("Original:", error.original.message);
    if (error.sql) console.error("SQL:", error.sql);
    console.error(error.stack);
    logger.error(message, error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(error.errors && error.errors.length > 0 && { errors: error.errors }),
    ...(process.env.NODE_ENV !== 'production' && {
      error: error.message,
      stack: error.stack,
      parent: error.parent?.message,
      sql: error.sql,
    }),
  });
};

module.exports = { notFound, errorHandler };
