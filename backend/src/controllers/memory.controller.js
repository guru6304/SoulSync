const memoryService = require('../services/memory.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const createMemory = asyncHandler(async (req, res) => {
  const memory = await memoryService.createMemory(req.user.id, req.body.couple_id, req.body);
  res.status(201).json(new ApiResponse(201, memory, 'Memory created successfully'));
});

const updateMemory = asyncHandler(async (req, res) => {
  const memory = await memoryService.updateMemory(req.user.id, {
    ...req.body,
    memory_id: req.params.id,
  });
  res.status(200).json(new ApiResponse(200, memory, 'Memory updated successfully'));
});

const deleteMemory = asyncHandler(async (req, res) => {
  await memoryService.deleteMemory(req.user.id, { memory_id: req.params.id });
  res.status(200).json(new ApiResponse(200, null, 'Memory deleted successfully'));
});

const listMemories = asyncHandler(async (req, res) => {
  const memories = await memoryService.listMemories(req.user.id, req.query.couple_id);
  res.status(200).json(new ApiResponse(200, memories, 'Memories retrieved successfully'));
});

const toggleFavorite = asyncHandler(async (req, res) => {
  const memory = await memoryService.toggleFavorite(req.user.id, {
    memory_id: req.params.id,
    value: req.body.value,
  });
  res.status(200).json(new ApiResponse(200, memory, 'Memory favorite status updated successfully'));
});

module.exports = {
  createMemory,
  updateMemory,
  deleteMemory,
  listMemories,
  toggleFavorite,
};
