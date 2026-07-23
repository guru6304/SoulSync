const express = require('express');

const {
    authMiddleware: authenticate,
} = require('../middlewares/auth.middleware');

const controller = require('../controllers/memoryComment.controller');

const router = express.Router();

router.use(authenticate);

router.post('/', controller.addComment);

router.get('/memory/:memoryId', controller.listComments);

router.put('/:commentId', controller.updateComment);

router.delete('/:commentId', controller.deleteComment);

module.exports = router;