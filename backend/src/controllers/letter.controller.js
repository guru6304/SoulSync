const letterService = require('../services/letter.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const createLetter = asyncHandler(async (req, res) => {
  const letter = await letterService.createLetter(req.user.id, req.body);
  return res.status(201).json(new ApiResponse(201, letter, 'Letter created successfully'));
});

const getLetters = asyncHandler(async (req, res) => {
  const letters = await letterService.getLetters(req.user.id);
  return res.status(200).json(new ApiResponse(200, letters, 'Letters fetched successfully'));
});

const getLetter = asyncHandler(async (req, res) => {
  const letter = await letterService.getLetter(req.user.id, req.params.id);
  return res.status(200).json(new ApiResponse(200, letter, 'Letter fetched successfully'));
});

const updateLetter = asyncHandler(async (req, res) => {
  const letter = await letterService.updateLetter(req.user.id, req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, letter, 'Letter updated successfully'));
});

const deleteLetter = asyncHandler(async (req, res) => {
  await letterService.deleteLetter(req.user.id, req.params.id);
  return res.status(200).json(new ApiResponse(200, null, 'Letter deleted successfully'));
});

module.exports = {
  createLetter,
  getLetters,
  getLetter,
  updateLetter,
  deleteLetter,
};
