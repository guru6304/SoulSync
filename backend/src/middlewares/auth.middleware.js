const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { verifyAccessToken } = require('../utils/jwt');

const authenticate = asyncHandler(async (req, _res, next) => {
  const authorization = req.headers.authorization;
  const [scheme, token] = authorization ? authorization.split(' ') : [];

  if (scheme !== 'Bearer' || !token) {
    throw new ApiError(401, 'Authorization token is required');
  }

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch (_error) {
    throw new ApiError(401, 'Invalid or expired access token');
  }

  const user = await User.findByPk(payload.sub);
  if (!user) throw new ApiError(401, 'User not found');
  if (!user.is_active) throw new ApiError(403, 'User account is inactive');

  req.user = user;
  next();
});

module.exports = authenticate;
