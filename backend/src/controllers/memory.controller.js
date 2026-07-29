const memoryService = require('../services/memory.service');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const validateOrThrow = (validation) => {
    if (!validation.isValid) {
        throw new ApiError(400, 'Validation failed', validation.errors);
    }
};

const createMemory = asyncHandler(async (req, res) => {
    const memory = await memoryService.createMemory(req.user.id, req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            memory,
            'Memory created successfully'
        )
    );
});

const updateMemory = asyncHandler(async (req, res) => {
    const memory = await memoryService.updateMemory(
        req.user.id,
        req.params.memoryId,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            memory,
            'Memory updated successfully'
        )
    );
});

const getMemory = asyncHandler(async (req, res) => {

    const memory = await memoryService.getMemory(
        req.user.id,
        req.params.memoryId
    );

    return res.status(200).json(

        new ApiResponse(

            200,

            memory,

            "Memory fetched successfully"

        )

    );

});

const deleteMemory = asyncHandler(async (req, res) => {
    const result = await memoryService.deleteMemory(
        req.user.id,
        req.params.memoryId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            'Memory deleted successfully'
        )
    );
});

const listMemories = asyncHandler(async (req, res) => {
    const memories = await memoryService.listMemories(
        req.user.id,
        req.params.coupleId
    );

    return res.status(200).json(
        new ApiResponse(200, memories)
    );
});

module.exports = {
    createMemory,
    updateMemory,
    deleteMemory,
    listMemories,
    getMemory,
};