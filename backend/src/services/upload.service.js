const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const ApiError = require('../utils/ApiError');

const uploadToCloudinary = (file, folder, resourceType) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
            },
            (error, result) => {
                if (error) {
                    return reject(
                        new ApiError(
                            500,
                            'File upload failed.'
                        )
                    );
                }

                resolve(result);
            }
        );

        streamifier
            .createReadStream(file.buffer)
            .pipe(stream);
    });
};

const uploadImage = async (file) => {
    if (!file) {
        throw new ApiError(400, 'Image is required.');
    }

    return uploadToCloudinary(
        file,
        'soulsync/images',
        'image'
    );
};

const uploadVideo = async (file) => {
    if (!file) {
        throw new ApiError(400, 'Video is required.');
    }

    return uploadToCloudinary(
        file,
        'soulsync/videos',
        'video'
    );
};

const uploadAudio = async (file) => {
    if (!file) {
        throw new ApiError(400, 'Audio is required.');
    }

    return uploadToCloudinary(
        file,
        'soulsync/audio',
        'video'
    );
};

const deleteFile = async (
    publicId,
    resourceType = 'image'
) => {

    if (!publicId) {
        throw new ApiError(
            400,
            'Public ID is required.'
        );
    }
    const result = await cloudinary.uploader.destroy(
        publicId,
        {
            resource_type: resourceType,
        }
    );

    if (result.result !== 'ok') {
        throw new ApiError(
            404,
            'File not found.'
        );
    }

    return result;
};

module.exports = {
    uploadImage,
    uploadVideo,
    uploadAudio,
    deleteFile,
};