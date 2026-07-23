const QUESTION_TITLE_MAX = 255;

const MOOD_TYPES = [
    'romantic',
    'happy',
    'funny',
    'sad',
    'angry',
    'missing_you',
    'celebration',
    'sleepy',
    'need_hug',
];

const ANSWER_TYPES = [
    'text',
    'image',
    'video',
    'audio',
    'music',
    'mixed',
];

const hasLength = (value, min, max) =>
    typeof value === 'string' &&
    value.trim().length >= min &&
    value.trim().length <= max;

const validateCreateQuestion = (data = {}) => {

    const errors = [];

    const {
        title,
        description,
        mood_type,
        answer_type,
        display_order,
    } = data;

    if (!hasLength(title, 3, QUESTION_TITLE_MAX)) {
        errors.push({
            field: 'title',
            message: 'Title must be between 3 and 255 characters.',
        });
    }

    if (
        description !== undefined &&
        typeof description !== 'string'
    ) {
        errors.push({
            field: 'description',
            message: 'Description must be a string.',
        });
    }

    if (!MOOD_TYPES.includes(mood_type)) {
        errors.push({
            field: 'mood_type',
            message: 'Invalid mood type.',
        });
    }

    if (!ANSWER_TYPES.includes(answer_type)) {
        errors.push({
            field: 'answer_type',
            message: 'Invalid answer type.',
        });
    }

    if (
        display_order !== undefined &&
        (!Number.isInteger(display_order) || display_order < 0)
    ) {
        errors.push({
            field: 'display_order',
            message: 'Display order must be a positive integer.',
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

const validateUpdateQuestion = validateCreateQuestion;

module.exports = {
    validateCreateQuestion,
    validateUpdateQuestion,
};