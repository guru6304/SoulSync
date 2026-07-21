const authService = require('../services/auth.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.status(201).json(new ApiResponse(201, result, 'Registration successful'));
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  res.status(200).json(new ApiResponse(200, result, 'Login successful'));
});

const refresh = asyncHandler(async (req, res) => {
  const result = await authService.refresh(req.body?.refreshToken);
  res.status(200).json(new ApiResponse(200, result, 'Tokens refreshed successfully'));
});

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.body?.refreshToken);
  res.status(200).json(new ApiResponse(200, null, 'Logout successful'));
});

const logoutAll = asyncHandler(async (req, res) => {
  await authService.logoutAll(req.user.id);
  res.status(200).json(new ApiResponse(200, null, 'Logged out from all devices successfully'));
});

const me = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user, 'Authenticated user retrieved successfully'));
});

module.exports = { register, login, refresh, logout, logoutAll, me };
