const isPresent = (value) =>
    typeof value === 'string' && value.trim().length > 0;

const VALID_VISIBILITY = [
    'private',
    'shared',
    'public',
];

const createMemorySchema = {
    couple_id: { required: true },
    title: { required: true, maxLength: 255 },
    description: { required: false },
    visibility: { required: false },
};

const updateMemorySchema = {
    title: { required: false, maxLength: 255 },
    description: { required: false },
    visibility: { required: false },
};

const validateCreateMemory = (data = {}) => {
    const errors = [];

    if (!isPresent(data.couple_id)) {
        errors.push({
            field: 'couple_id',
            message: 'Couple ID is required.',
        });
    }

    if (!isPresent(data.title)) {
        errors.push({
            field: 'title',
            message: 'Title is required.',
        });
    } else if (data.title.length > 255) {
        errors.push({
            field: 'title',
            message: 'Title must not exceed 255 characters.',
        });
    }

    if (
        data.visibility &&
        !VALID_VISIBILITY.includes(data.visibility)
    ) {
        errors.push({
            field: 'visibility',
            message: 'Invalid visibility.',
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

const validateUpdateMemory = (data = {}) => {
    const errors = [];

    if (
        data.title !== undefined &&
        typeof data.title === 'string' &&
        data.title.length > 255
    ) {
        errors.push({
            field: 'title',
            message: 'Title must not exceed 255 characters.',
        });
    }

    if (
        data.visibility &&
        !VALID_VISIBILITY.includes(data.visibility)
    ) {
        errors.push({
            field: 'visibility',
            message: 'Invalid visibility.',
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

const validateDeleteMemory = () => ({
    isValid: true,
    errors: [],
});

module.exports = {
    createMemorySchema,
    updateMemorySchema,
    validateCreateMemory,
    validateUpdateMemory,
    validateDeleteMemory,
};