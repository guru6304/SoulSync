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
        const decoded = jwt.verifyAccessToken(token);
        console.log("Decoded Token:", decoded);

req.user = {
    ...decoded,
    id: decoded.id || decoded.sub,
};
console.log("req.user:", req.user);
        next();
    } catch (error) {
        console.log("JWT ERROR:", error.message);
    console.log("JWT_ACCESS_SECRET:", process.env.JWT_ACCESS_SECRET);
        return next(new ApiError(401, 'Unauthorized: Invalid token'));
    }
};

module.exports = { authMiddleware };