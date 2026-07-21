const ApiError = require('../utils/ApiError');
const {
  validateCreateMemory,
  validateUpdateMemory,
  validateDeleteMemory,
  validateFavoriteMemory,
} = require('../validations/memory.validation');
const memoryRepository = require('../repositories/memory.repository');

const validateOrThrow = (validation) => {
  if (!validation.isValid) {
    throw new ApiError(400, 'Validation failed', validation.errors);
  }
};

const ensureCoupleMember = async (coupleId, userId) => {
  const membership = await memoryRepository.findMembership(coupleId, userId);
  if (!membership) throw new ApiError(403, 'You do not belong to this couple');
};

const getMemoryOrThrow = async (memoryId) => {
  const memory = await memoryRepository.findById(memoryId);
  if (!memory) throw new ApiError(404, 'Memory not found');
  return memory;
};

const ensureMemoryVisible = async (memory, userId) => {
  await ensureCoupleMember(memory.couple_id, userId);
  if (memory.visibility === 'private' && memory.created_by !== userId) {
    throw new ApiError(403, 'This private memory is not available to you');
  }
};

const createMemory = async (userId, coupleId, data) => {
  validateOrThrow(validateCreateMemory(data));
  await ensureCoupleMember(coupleId, userId);

  return memoryRepository.create({
    couple_id: coupleId,
    created_by: userId,
    title: data.title,
    description: data.description,
    memory_date: data.memory_date,
    visibility: data.visibility || 'shared',
  });
};

const updateMemory = async (userId, data) => {
  validateOrThrow(validateUpdateMemory(data));
  validateOrThrow(validateDeleteMemory(data));

  const memory = await getMemoryOrThrow(data.memory_id);
  await ensureCoupleMember(memory.couple_id, userId);
  if (memory.created_by !== userId) throw new ApiError(403, 'Only the memory creator can update it');

  const updates = {};
  for (const field of ['title', 'description', 'memory_date', 'visibility']) {
    if (data[field] !== undefined) updates[field] = data[field];
  }
  await memoryRepository.update(memory.id, updates);

  return memoryRepository.findById(memory.id);
};

const deleteMemory = async (userId, data) => {
  validateOrThrow(validateDeleteMemory(data));

  const memory = await getMemoryOrThrow(data.memory_id);
  await ensureCoupleMember(memory.couple_id, userId);
  if (memory.created_by !== userId) throw new ApiError(403, 'Only the memory creator can delete it');

  await memoryRepository.deleteMemory(memory.id);
};

const listMemories = async (userId, coupleId) => {
  await ensureCoupleMember(coupleId, userId);

  const memories = await memoryRepository.findAllByCouple(coupleId);
  return memories.filter((memory) => memory.visibility === 'shared' || memory.created_by === userId);
};

const toggleFavorite = async (userId, data) => {
  validateOrThrow(validateFavoriteMemory(data));
  if (typeof data.value !== 'boolean') {
    throw new ApiError(400, 'Favorite value must be a boolean');
  }

  const memory = await getMemoryOrThrow(data.memory_id);
  await ensureMemoryVisible(memory, userId);
  await memoryRepository.toggleFavorite(memory.id, data.value);

  return memoryRepository.findById(memory.id);
};

module.exports = {
  createMemory,
  updateMemory,
  deleteMemory,
  listMemories,
  toggleFavorite,
};
