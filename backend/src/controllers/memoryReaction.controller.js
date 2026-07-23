const memoryReactionService = require('../services/memoryReaction.service');

const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const {
    validateReaction,
    validateRemoveReaction,
    validateListReactions,
} = require('../validations/memoryReaction.validation');

const validateOrThrow = require('../utils/validateOrThrow');

const reactToMemory = asyncHandler(async (req, res) => {
    const validation = validateReaction({
        memory_id: req.params.memoryId,
        type: req.body.type,
    });

    validateOrThrow(validation);

    const result =
        await memoryReactionService.reactToMemory(
            req.user.id,
            req.params.memoryId,
            req.body.type
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            'Reaction saved successfully'
        )
    );
});

const removeReaction = asyncHandler(async (req, res) => {
    const validation = validateRemoveReaction({
        memory_id: req.params.memoryId,
    });

    validateOrThrow(validation);

    const result =
        await memoryReactionService.removeReaction(
            req.user.id,
            req.params.memoryId
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            'Reaction removed successfully'
        )
    );
});

const listReactions = asyncHandler(async (req, res) => {
    const validation = validateListReactions({
        memory_id: req.params.memoryId,
    });

    validateOrThrow(validation);

    const result =
        await memoryReactionService.listReactions(
            req.user.id,
            req.params.memoryId
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            'Reactions fetched successfully'
        )
    );
});

const getReactionSummary = asyncHandler(async (req, res) => {
    const validation = validateListReactions({
        memory_id: req.params.memoryId,
    });

    validateOrThrow(validation);

    const result =
        await memoryReactionService.getReactionSummary(
            req.user.id,
            req.params.memoryId
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            'Reaction summary fetched successfully'
        )
    );
});

module.exports = {
    reactToMemory,
    removeReaction,
    listReactions,
    getReactionSummary,
};