const ApiError = require("./ApiError");

module.exports = (validation) => {

    if (!validation.isValid) {

        console.log("Validation Errors:");
        console.log(validation.errors);

        throw new ApiError(
            400,
            "Validation failed",
            validation.errors
        );
    }

};