const express = require('express');

const {
    authMiddleware: authenticate,
} = require('../middlewares/auth.middleware');

const controller = require('../controllers/memoryReaction.controller');

const router = express.Router();

router.use(authenticate);

router.post(
    '/:memoryId',
    controller.reactToMemory
);

router.get(
    '/:memoryId',
    controller.listReactions
);

router.get(
    '/:memoryId/summary',
    controller.getReactionSummary
);

router.delete(
    '/:memoryId',
    controller.removeReaction
);

module.exports = router;