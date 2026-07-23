import { useState } from 'react';

const useForm = (initialValues, validationFunction = null) => {

    const [values, setValues] = useState(initialValues);

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {

        const { name, value } = event.target;

        setValues((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (errors[name]) {

            setErrors((previous) => ({
                ...previous,
                [name]: '',
            }));

        }

    };

    const validate = () => {

        if (!validationFunction) {

            return true;

        }

        const result = validationFunction(values);

        setErrors(result.errors);

        return result.isValid;

    };

    const resetForm = () => {

        setValues(initialValues);

        setErrors({});

    };

    return {

        values,

        errors,

        setErrors,

        handleChange,

        validate,

        resetForm,

    };

};

export default useForm;