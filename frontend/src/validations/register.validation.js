const EMAIL_PATTERN =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const USERNAME_PATTERN =
    /^[a-zA-Z0-9_]+$/;

const PASSWORD_PATTERN =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const validateRegister = (data) => {

    const errors = {};

    if (!data.first_name.trim()) {

        errors.first_name =
            'First name is required.';

    } else if (data.first_name.trim().length < 2) {

        errors.first_name =
            'First name must be at least 2 characters.';

    }

    if (!data.last_name.trim()) {

        errors.last_name =
            'Last name is required.';

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

    } else if (!PASSWORD_PATTERN.test(data.password)) {

        errors.password =
            'Password must contain uppercase, lowercase, number and special character.';

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