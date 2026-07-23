const isPresent = (value) =>
    typeof value === 'string' && value.trim().length > 0;

const VALID_MEDIA_TYPES = [
    'image',
    'video',
    'audio',
];

const validateUploadMedia = (data = {}) => {
    const errors = [];

    if (!isPresent(data.memory_id)) {
        errors.push({
            field: 'memory_id',
            message: 'Memory ID is required.',
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

const validateDeleteMedia = (data = {}) => {
    const errors = [];

    if (!isPresent(data.media_id)) {
        errors.push({
            field: 'media_id',
            message: 'Media ID is required.',
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

const validateListMedia = (data = {}) => {
    const errors = [];

    if (!isPresent(data.memory_id)) {
        errors.push({
            field: 'memory_id',
            message: 'Memory ID is required.',
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

module.exports = {
    VALID_MEDIA_TYPES,
    validateUploadMedia,
    validateDeleteMedia,
    validateListMedia,
};