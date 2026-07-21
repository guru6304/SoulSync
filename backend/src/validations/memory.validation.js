const VISIBILITY_VALUES = new Set(['shared', 'private']);

const createMemorySchema = {
  title: { required: true, minLength: 1, maxLength: 200 },
  description: { required: false, maxLength: 5000 },
  memory_date: { required: true },
  visibility: { required: false, values: ['shared', 'private'] },
};

const updateMemorySchema = {
  title: { required: false, minLength: 1, maxLength: 200 },
  description: { required: false, maxLength: 5000 },
  memory_date: { required: false },
  visibility: { required: false, values: ['shared', 'private'] },
};

const memoryActionSchema = {
  memory_id: { required: true },
};

const isPresent = (value) => typeof value === 'string' && value.trim().length > 0;
const isValidDate = (value) => typeof value === 'string' && !Number.isNaN(Date.parse(value));

const validateMemoryFields = (data = {}, isCreate) => {
  const errors = [];

  if (isCreate && !isPresent(data.title)) {
    errors.push({ field: 'title', message: 'Title is required.' });
  }
  if (data.title !== undefined && (!isPresent(data.title) || data.title.trim().length > 200)) {
    errors.push({ field: 'title', message: 'Title must be 1 to 200 characters.' });
  }
  if (data.description !== undefined && data.description !== null &&
      (typeof data.description !== 'string' || data.description.length > 5000)) {
    errors.push({ field: 'description', message: 'Description must not exceed 5000 characters.' });
  }
  if (isCreate && !isPresent(data.memory_date)) {
    errors.push({ field: 'memory_date', message: 'Memory date is required.' });
  }
  if (data.memory_date !== undefined && !isValidDate(data.memory_date)) {
    errors.push({ field: 'memory_date', message: 'Memory date must be a valid date.' });
  }
  if (data.visibility !== undefined && !VISIBILITY_VALUES.has(data.visibility)) {
    errors.push({ field: 'visibility', message: 'Visibility must be shared or private.' });
  }

  return { isValid: errors.length === 0, errors };
};

const validateCreateMemory = (data) => validateMemoryFields(data, true);
const validateUpdateMemory = (data) => validateMemoryFields(data, false);

const validateMemoryAction = (data = {}) => {
  const errors = isPresent(data.memory_id)
    ? []
    : [{ field: 'memory_id', message: 'Memory ID is required.' }];

  return { isValid: errors.length === 0, errors };
};

const validateDeleteMemory = validateMemoryAction;
const validateFavoriteMemory = validateMemoryAction;

module.exports = {
  createMemorySchema,
  updateMemorySchema,
  memoryActionSchema,
  validateCreateMemory,
  validateUpdateMemory,
  validateDeleteMemory,
  validateFavoriteMemory,
};
