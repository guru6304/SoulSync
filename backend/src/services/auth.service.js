const ApiError = require('../utils/ApiError');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const { hashToken } = require('../utils/token');
const { validateRegister, validateLogin } = require('../validations/auth.validation');
const coupleService = require("../services/couple.service");
const userRepository = require('../repositories/user.repository');
const refreshTokenRepository = require('../repositories/refreshToken.repository');

const toPublicUser = (user) => {
  const { password_hash, secret_code, ...publicUser } = user.get({ plain: true });
  return publicUser;
};

const createTokens = async (userId, metadata = {}) => {
  const payload = { sub: userId };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  const refreshPayload = verifyRefreshToken(refreshToken);

 await refreshTokenRepository.create({
    user_id: userId,
    token_hash: hashToken(refreshToken),
    device_name: metadata.device_name,
    ip_address: metadata.ip_address,
    user_agent: metadata.user_agent,
    expires_at: new Date(refreshPayload.exp * 1000),
});

  return { accessToken, refreshToken };
};

const register = async (data) => {
  const validation = validateRegister(data);
  if (!validation.isValid) throw new ApiError(400, 'Validation failed', validation.errors);

  const email = data.email.toLowerCase().trim();
  const username = data.username.toLowerCase().trim();
  const [existingEmail, existingUsername] = await Promise.all([
    userRepository.findByEmail(email),
    userRepository.findByUsername(username),
  ]);

  if (existingEmail) throw new ApiError(409, 'Email is already registered');
  if (existingUsername) throw new ApiError(409, 'Username is already taken');

  const password_hash = await hashPassword(data.password);
  const createdUser = await userRepository.create({
    first_name: data.first_name,
    last_name: data.last_name,
    username,
    email,
    password_hash,
    is_active: true,
});
  const tokens = await createTokens(createdUser.id, data);

const activeCouple =
    await coupleService.getActiveCouple(
        createdUser.id
    );

return {

    user: {

        ...toPublicUser(createdUser),

        active_couple: activeCouple,

    },

    ...tokens,

};
};

const login = async (data) => {
  const validation = validateLogin(data);
  if (!validation.isValid) throw new ApiError(400, 'Validation failed', validation.errors);

  const user = await userRepository.findByEmail(data.email.toLowerCase().trim());
  if (!user || !(await comparePassword(data.password, user.password_hash))) {
    throw new ApiError(401, 'Invalid email or password');
  }
  if (!user.is_active) {
  throw new ApiError(403, 'Account has been disabled');
}

  try {
    await userRepository.updateLastLogin(user.id);
  } catch (_err) {
    // Non-blocking timestamp update
  }
  const tokens = await createTokens(user.id, data);

const activeCouple =
    await coupleService.getActiveCouple(
        user.id
    );

return {

    user: {

        ...toPublicUser(user),

        active_couple: activeCouple,

    },

    ...tokens,

};
};

const refresh = async (refreshToken) => {
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (_error) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  const storedToken = await refreshTokenRepository.findByHash(hashToken(refreshToken));
  if (!storedToken || storedToken.expires_at <= new Date()) {
    if (storedToken) await refreshTokenRepository.delete(storedToken.id);
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  await refreshTokenRepository.delete(storedToken.id);
  return createTokens(payload.sub, storedToken);
};

const logout = async (refreshToken) => {
  if (!refreshToken) throw new ApiError(400, 'Refresh token is required');

  const storedToken = await refreshTokenRepository.findByHash(hashToken(refreshToken));
  if (storedToken) await refreshTokenRepository.delete(storedToken.id);
};

const logoutAll = async (userId) =>
    refreshTokenRepository.revokeAll(userId);

module.exports = { register, login, refresh, logout, logoutAll };
