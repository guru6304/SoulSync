const express = require('express');
const router = express.Router();
const controller = require('../controllers/letter.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.post('/', controller.createLetter);
router.get('/', controller.getLetters);
router.get('/:id', controller.getLetter);
router.put('/:id', controller.updateLetter);
router.delete('/:id', controller.deleteLetter);

module.exports = router;
