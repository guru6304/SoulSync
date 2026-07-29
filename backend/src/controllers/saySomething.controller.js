const saySomethingService = require("../services/saySomething.service");

const ApiResponse = require("../utils/ApiResponse");

const asyncHandler = require("../utils/asyncHandler");

const createSaySomething = asyncHandler(async (req, res) => {

    const saySomething =
        await saySomethingService.createSaySomething(
            req.user.id,
            req.body
        );

    return res.status(201).json(

        new ApiResponse(

            201,

            saySomething,

            "Message created successfully"

        )

    );

});

const getSaySomething = asyncHandler(async (req, res) => {

    const saySomething =
        await saySomethingService.getSaySomething(

            req.user.id,

            req.params.saySomethingId

        );

    return res.status(200).json(

        new ApiResponse(

            200,

            saySomething,

            "Message fetched successfully"

        )

    );

});

const listSaySomethings = asyncHandler(async (req, res) => {

    const messages =
        await saySomethingService.listSaySomethings(

            req.user.id,

            req.params.coupleId

        );

    return res.status(200).json(

        new ApiResponse(

            200,

            messages

        )

    );

});

module.exports = {

    createSaySomething,

    getSaySomething,

    listSaySomethings,

};