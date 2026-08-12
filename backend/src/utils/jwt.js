const jwt = require('jsonwebtoken');

const getAccessSecret = () => process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'soulsync_jwt_access_secret_key_2026';
const getRefreshSecret = () => process.env.JWT_REFRESH_SECRET || 'soulsync_jwt_refresh_secret_key_2026';
const getAccessExpiresIn = () => process.env.JWT_ACCESS_EXPIRES_IN || process.env.JWT_EXPIRES_IN || '7d';
const getRefreshExpiresIn = () => process.env.JWT_REFRESH_EXPIRES_IN || '30d';

const generateAccessToken = (payload) => jwt.sign(payload, getAccessSecret(), {
  expiresIn: getAccessExpiresIn(),
  algorithm: 'HS256',
});

const generateRefreshToken = (payload) => jwt.sign(payload, getRefreshSecret(), {
  expiresIn: getRefreshExpiresIn(),
  algorithm: 'HS256',
});

const verifyAccessToken = (token) => jwt.verify(token, getAccessSecret());

const verifyRefreshToken = (token) => jwt.verify(token, getRefreshSecret());

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
