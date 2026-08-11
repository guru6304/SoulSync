// src/middlewares/auth.middleware.js
const ApiError = require('../utils/ApiError');
const jwt = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, 'Authentication required'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verifyAccessToken(token);
req.user = {
    ...decoded,
    id: decoded.id || decoded.sub,
};
        next();
    } catch (error) {
        const message = error.name === 'TokenExpiredError'
            ? 'Token expired'
            : 'Invalid token';
        return next(new ApiError(401, message));
    }
};

module.exports = { authMiddleware };
