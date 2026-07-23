const isPresent = (value) =>
    typeof value === 'string' && value.trim().length > 0;

const VALID_REACTIONS = [
    'LIKE',
    'LOVE',
    'LAUGH',
    'WOW',
    'SAD',
    'ANGRY',
];

const reactionSchema = {
    memory_id: { required: true },
    type: { required: true },
};

const removeReactionSchema = {
    memory_id: { required: true },
};

const listReactionSchema = {
    memory_id: { required: true },
};

const validateReaction = (data = {}) => {
    const errors = [];

    if (!isPresent(data.memory_id)) {
        errors.push({
            field: 'memory_id',
            message: 'Memory ID is required.',
        });
    }

    if (!isPresent(data.type)) {
        errors.push({
            field: 'type',
            message: 'Reaction type is required.',
        });
    } else if (!VALID_REACTIONS.includes(data.type)) {
        errors.push({
            field: 'type',
            message: `Reaction must be one of: ${VALID_REACTIONS.join(', ')}`,
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

const validateRemoveReaction = (data = {}) => {
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

const validateListReactions = (data = {}) => {
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
    reactionSchema,
    removeReactionSchema,
    listReactionSchema,
    validateReaction,
    validateRemoveReaction,
    validateListReactions,
};