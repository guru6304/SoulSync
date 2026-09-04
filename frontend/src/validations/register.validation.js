const EMAIL_PATTERN =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const USERNAME_PATTERN =
    /^[a-zA-Z0-9_]+$/;

const validateRegister = (data) => {

    const errors = {};

    if (!data.first_name || !data.first_name.trim()) {

        errors.first_name =
            'First name is required.';

    }

    if (!data.username.trim()) {

        errors.username =
            'Username is required.';

    } else if (!USERNAME_PATTERN.test(data.username.trim())) {

        errors.username =
            'Username may contain only letters, numbers and underscores.';

    }

    if (!data.email.trim()) {

        errors.email =
            'Email is required.';

    } else if (!EMAIL_PATTERN.test(data.email.trim())) {

        errors.email =
            'Enter a valid email address.';

    }

    if (!data.password) {

        errors.password =
            'Password is required.';

    } else if (data.password.length < 6) {

        errors.password =
            'Password must be at least 6 characters.';

    }

    if (!data.confirmPassword) {

        errors.confirmPassword =
            'Confirm Password is required.';

    } else if (data.password !== data.confirmPassword) {

        errors.confirmPassword =
            'Passwords do not match.';

    }

    return {

        isValid: Object.keys(errors).length === 0,

        errors,

    };

};

export default validateRegister;