const memoryMediaService = require('../services/memoryMedia.service');

const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const {
    validateUploadMedia,
    validateDeleteMedia,
    validateListMedia,
} = require('../validations/memoryMedia.validation');

const { v4: uuidv4 } = require('uuid');

const validateOrThrow = (validation) => {
    if (!validation.isValid) {
        throw new ApiError(
            400,
            'Validation failed',
            validation.errors
        );
    }
};

const uploadMedia = asyncHandler(async (req, res) => {
    const validation = validateUploadMedia({
        memory_id: req.params.memoryId,
    });

    validateOrThrow(validation);

    const result =
        await memoryMediaService.uploadMedia(
            req.user.id,
            req.params.memoryId,
            req.files
        );

    return res.status(201).json(
        new ApiResponse(
            201,
            result,
            'Media uploaded successfully.'
        )
    );
});

const listMedia = asyncHandler(async (req, res) => {
    const validation = validateListMedia({
        memory_id: req.params.memoryId,
    });

    validateOrThrow(validation);

    const result =
        await memoryMediaService.listMedia(
            req.user.id,
            req.params.memoryId
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            'Media fetched successfully.'
        )
    );
});

const deleteMedia = asyncHandler(async (req, res) => {
    const validation = validateDeleteMedia({
        media_id: req.params.mediaId,
    });

    validateOrThrow(validation);

    const result =
        await memoryMediaService.deleteMedia(
            req.user.id,
            req.params.mediaId
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            'Media deleted successfully.'
        )
    );
});

/**
 * POST /api/v1/memory-media/attach/:memoryId
 * Body: { media: [{ file_url, public_id, media_type, file_size, mime_type }] }
 * Attaches already-uploaded Cloudinary assets to a memory without re-uploading.
 */
const attachMedia = asyncHandler(async (req, res) => {
    const { memoryId } = req.params;
    const { media } = req.body;

    if (!memoryId) {
        throw new ApiError(400, 'memoryId is required');
    }

    if (!Array.isArray(media) || media.length === 0) {
        throw new ApiError(400, 'media array is required and must not be empty');
    }

    const result = await memoryMediaService.attachMedia(
        req.user.id,
        memoryId,
        media
    );

    return res.status(201).json(
        new ApiResponse(201, result, 'Media attached successfully.')
    );
});

module.exports = {
    uploadMedia,
    listMedia,
    deleteMedia,
    attachMedia,
};