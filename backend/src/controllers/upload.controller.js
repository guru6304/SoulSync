const uploadService = require('../services/upload.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const uploadImage = asyncHandler(async (req, res) => {
    const result = await uploadService.uploadImage(req.file);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                url: result.secure_url,
                public_id: result.public_id,
                media_type: 'image',
                file_size: result.bytes,
                format: result.format,
            },
            'Image uploaded successfully.'
        )
    );
});

const uploadVideo = asyncHandler(async (req, res) => {
    const result = await uploadService.uploadVideo(req.file);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                url: result.secure_url,
                public_id: result.public_id,
                media_type: 'video',
                file_size: result.bytes,
                format: result.format,
                duration: result.duration,
            },
            'Video uploaded successfully.'
        )
    );
});

const uploadAudio = asyncHandler(async (req, res) => {
    const result = await uploadService.uploadAudio(req.file);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                url: result.secure_url,
                public_id: result.public_id,
                media_type: 'audio',
                file_size: result.bytes,
                format: result.format,
                duration: result.duration,
            },
            'Audio uploaded successfully.'
        )
    );
});

const deleteFile = asyncHandler(async (req, res) => {
    const {
    public_id,
    resource_type,
} = req.body;

await uploadService.deleteFile(
    public_id,
    resource_type || 'image'
);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            'File deleted successfully.'
        )
    );
});

module.exports = {
    uploadImage,
    uploadVideo,
    uploadAudio,
    deleteFile,
};