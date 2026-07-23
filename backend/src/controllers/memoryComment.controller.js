const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const memoryCommentService = require('../services/memoryComment.service');

const {
    validateCreateComment,
    validateUpdateComment,
    validateDeleteComment,
    validateListComments,
} = require('../validations/memoryComment.validation');

const validateOrThrow = require('../utils/validateOrThrow');

const addComment = asyncHandler(async (req, res) => {
    const validation = validateCreateComment(req.body);
    validateOrThrow(validation);

    const comment = await memoryCommentService.addComment(
    req.user.id,
    req.body.memory_id,
    req.body.content
);

    return res.status(201).json(
        new ApiResponse(201, comment, 'Comment added successfully')
    );
});

const updateComment = asyncHandler(async (req, res) => {
    const validation = validateUpdateComment({
        ...req.body,
        comment_id: req.params.commentId,
    });

    validateOrThrow(validation);

    const comment = await memoryCommentService.updateComment(
    req.user.id,
    req.params.commentId,
    req.body.content
);

    return res.status(200).json(
        new ApiResponse(200, comment, 'Comment updated successfully')
    );
});

const deleteComment = asyncHandler(async (req, res) => {
    const validation = validateDeleteComment({
        comment_id: req.params.commentId,
    });

    validateOrThrow(validation);

    const result = await memoryCommentService.deleteComment(
    req.user.id,
    req.params.commentId
);

    return res.status(200).json(
        new ApiResponse(200, result, 'Comment deleted successfully')
    );
});

const listComments = asyncHandler(async (req, res) => {
    const validation = validateListComments({
        memory_id: req.params.memoryId,
    });

    validateOrThrow(validation);

    const comments = await memoryCommentService.listComments(
    req.user.id,
    req.params.memoryId
);

    return res.status(200).json(
        new ApiResponse(200, comments)
    );
});

module.exports = {
    addComment,
    updateComment,
    deleteComment,
    listComments,
};