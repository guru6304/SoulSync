const multer = require('multer');
const ApiError = require('../utils/ApiError');

const storage = multer.memoryStorage();

const imageMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

const videoMimeTypes = [
    'video/mp4',
    'video/quicktime',
    'video/webm',
];

const audioMimeTypes = [
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/aac',
];

const createUploader = (allowedMimeTypes, maxSize) =>
    multer({
        storage,
        limits: {
            fileSize: maxSize,
        },
        fileFilter(req, file, cb) {
            if (!allowedMimeTypes.includes(file.mimetype)) {
                return cb(
                    new ApiError(
                        400,
                        'Unsupported file type.'
                    )
                );
            }

            cb(null, true);
        },
    });

const upload = multer({
    storage,
});

module.exports = {
    uploadImage: createUploader(
        imageMimeTypes,
        10 * 1024 * 1024
    ).single('file'),

    uploadVideo: createUploader(
        videoMimeTypes,
        100 * 1024 * 1024
    ).single('file'),

    uploadAudio: createUploader(
        audioMimeTypes,
        25 * 1024 * 1024
    ).single('file'),

    upload,
};