const isPresent = (value) =>
    typeof value === 'string' && value.trim().length > 0;

const VALID_MOODS = [
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

const validateCreateMood = (data = {}) => {
    const errors = [];

    if (!isPresent(data.mood_type)) {
        errors.push({
            field: 'mood_type',
            message: 'Mood type is required.',
        });
    } else if (!VALID_MOODS.includes(data.mood_type)) {
        errors.push({
            field: 'mood_type',
            message: 'Invalid mood type.',
        });
    }

    if (
        data.note !== undefined &&
        data.note !== null &&
        typeof data.note !== 'string'
    ) {
        errors.push({
            field: 'note',
            message: 'Note must be a string.',
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

const validateUpdateMood = validateCreateMood;

module.exports = {
    validateCreateMood,
    validateUpdateMood,
};