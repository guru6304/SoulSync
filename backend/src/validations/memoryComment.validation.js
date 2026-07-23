const isPresent = (value) =>
    typeof value === 'string' && value.trim().length > 0;

const createCommentSchema = {
    memory_id: { required: true },
    content: { required: true, maxLength: 1000 },
};

const updateCommentSchema = {
    comment_id: { required: true },
    content: { required: true, maxLength: 1000 },
};

const deleteCommentSchema = {
    comment_id: { required: true },
};

const listCommentsSchema = {
    memory_id: { required: true },
};

const validateCreateComment = (data = {}) => {
    const errors = [];

    if (!isPresent(data.memory_id)) {
        errors.push({
            field: 'memory_id',
            message: 'Memory ID is required.',
        });
    }

    if (!isPresent(data.content)) {
        errors.push({
            field: 'content',
            message: 'Content is required.',
        });
    } else if (data.content.length > 1000) {
        errors.push({
            field: 'content',
            message: 'Content must not exceed 1000 characters.',
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

const validateUpdateComment = (data = {}) => {
    const errors = [];

    if (!isPresent(data.comment_id)) {
        errors.push({
            field: 'comment_id',
            message: 'Comment ID is required.',
        });
    }

    if (!isPresent(data.content)) {
        errors.push({
            field: 'content',
            message: 'Content is required.',
        });
    } else if (data.content.length > 1000) {
        errors.push({
            field: 'content',
            message: 'Content must not exceed 1000 characters.',
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

const validateDeleteComment = (data = {}) => {
    const errors = [];

    if (!isPresent(data.comment_id)) {
        errors.push({
            field: 'comment_id',
            message: 'Comment ID is required.',
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

const validateListComments = (data = {}) => {
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
    createCommentSchema,
    updateCommentSchema,
    deleteCommentSchema,
    listCommentsSchema,
    validateCreateComment,
    validateUpdateComment,
    validateDeleteComment,
    validateListComments,
};