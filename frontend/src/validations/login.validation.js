const EMAIL_PATTERN =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateLogin = (data) => {

    const errors = {};

    if (
        !data.email.trim()
    ) {

        errors.email =
            'Email is required.';

    }

    else if (
        !EMAIL_PATTERN.test(
            data.email.trim()
        )
    ) {

        errors.email =
            'A valid email is required.';

    }

    if (
        !data.password
    ) {

        errors.password =
            'Password is required.';

    }

    return {

        isValid:
            Object.keys(errors).length === 0,

        errors,

    };

};

export default validateLogin;