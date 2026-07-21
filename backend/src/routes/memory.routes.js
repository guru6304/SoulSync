const { Router } = require('express');
const memoryController = require('../controllers/memory.controller');
const authenticate = require('../middlewares/auth.middleware');

const router = Router();

router.use(authenticate);

router.post('/', memoryController.createMemory);
router.get('/', memoryController.listMemories);
router.put('/:id', memoryController.updateMemory);
router.delete('/:id', memoryController.deleteMemory);
router.patch('/:id/favorite', memoryController.toggleFavorite);

module.exports = router;
