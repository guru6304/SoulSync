const validateUpdateProfile = (data) => {
    const errors = [];

    if (
        data.first_name !== undefined &&
        (!data.first_name.trim() ||
            data.first_name.length < 2)
    ) {
        errors.push({
            field: 'first_name',
            message: 'First name must be at least 2 characters.',
        });
    }

    if (
        data.last_name !== undefined &&
        (!data.last_name.trim() ||
            data.last_name.length < 2)
    ) {
        errors.push({
            field: 'last_name',
            message: 'Last name must be at least 2 characters.',
        });
    }

    if (
        data.username !== undefined &&
        data.username.length < 3
    ) {
        errors.push({
            field: 'username',
            message: 'Username must be at least 3 characters.',
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

const validateChangePassword = (data) => {
    const errors = [];

    if (!data.current_password) {
        errors.push({
            field: 'current_password',
            message: 'Current password is required.',
        });
    }

    if (
        !data.new_password ||
        data.new_password.length < 6
    ) {
        errors.push({
            field: 'new_password',
            message: 'New password must be at least 6 characters.',
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

module.exports = {
    validateUpdateProfile,
    validateChangePassword,
};