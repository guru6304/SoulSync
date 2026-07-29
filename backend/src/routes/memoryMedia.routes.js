const express = require('express');

const {
    authMiddleware: authenticate,
} = require('../middlewares/auth.middleware');


const { upload } = require('../middlewares/upload.middleware');
const controller = require('../controllers/memoryMedia.controller');

const router = express.Router();

router.use(authenticate);

router.post(
    '/:memoryId',
    upload.array('files', 10),
    controller.uploadMedia
);

router.get(
    '/:memoryId',
    controller.listMedia
);

router.delete(
    '/:mediaId',
    controller.deleteMedia
);

module.exports = router;