// src/middlewares/auth.middleware.js
const ApiError = require('../utils/ApiError');
const jwt = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, 'Unauthorized: No token provided'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new ApiError(401, 'Unauthorized: Invalid token'));
    }
};

module.exports = { authMiddleware };