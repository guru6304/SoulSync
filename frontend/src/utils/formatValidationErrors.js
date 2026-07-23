const formatValidationErrors = (
    backendErrors = []
) => {

    const errors = {};

    backendErrors.forEach((error) => {

        errors[error.field] =
            error.message;

    });

    return errors;

};

export default formatValidationErrors;