const isPresent = (value) =>
    typeof value === "string" &&
    value.trim().length > 0;

const validateCreateSaySomething = (
    data = {}
) => {

    const errors = [];

    if (!isPresent(data.couple_id)) {

        errors.push({

            field: "couple_id",

            message:
                "Couple ID is required.",

        });

    }

    if (!isPresent(data.message)) {

    errors.push({

        field: "message",

        message: "Message is required.",

    });

} else if (data.message.trim().length > 1000) {

    errors.push({

        field: "message",

        message: "Message cannot exceed 1000 characters.",

    });

}

    return {

        isValid:
            errors.length === 0,

        errors,

    };

};

module.exports = {

    validateCreateSaySomething,

};