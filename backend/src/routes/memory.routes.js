const express = require('express');

const {
    authMiddleware: authenticate,
} = require('../middlewares/auth.middleware');

const controller = require('../controllers/memory.controller');

const router = express.Router();

router.use(authenticate);

router.post('/', controller.createMemory);

router.get('/couple/:coupleId', controller.listMemories);

router.get("/:memoryId", controller.getMemory);

router.put('/:memoryId', controller.updateMemory);

router.delete('/:memoryId', controller.deleteMemory);

module.exports = router;