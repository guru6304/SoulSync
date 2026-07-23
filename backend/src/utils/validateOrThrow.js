const ApiError = require('./ApiError');

const validateOrThrow = (validation) => {
    if (!validation.isValid) {
        throw new ApiError(
            400,
            'Validation failed',
            validation.errors
        );
    }
};

module.exports = validateOrThrow;