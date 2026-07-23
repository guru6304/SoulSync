const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middlewares/auth.middleware');
const {
    uploadImage,
    uploadVideo,
    uploadAudio,
} = require('../middlewares/upload.middleware');

const uploadController = require('../controllers/upload.controller');

router.use(authMiddleware);

router.post(
    '/image',
    uploadImage,
    uploadController.uploadImage
);

router.post(
    '/video',
    uploadVideo,
    uploadController.uploadVideo
);

router.post(
    '/audio',
    uploadAudio,
    uploadController.uploadAudio
);

router.delete(
    '/',
    uploadController.deleteFile
);

module.exports = router;