const express = require('express');

const router = express.Router();

const questionController = require('../controllers/question.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.get(
    '/',
    authMiddleware,
    questionController.getQuestions
);

router.get(
    '/mood/:mood',
    authMiddleware,
    questionController.getQuestionsByMood
);

router.get(
    '/:id',
    authMiddleware,
    questionController.getQuestion
);
router.post(
    '/',
    authMiddleware,
    questionController.createQuestion
);

router.put(
    '/:id',
    authMiddleware,
    questionController.updateQuestion
);

router.delete(
    '/:id',
    authMiddleware,
    questionController.deleteQuestion
);
router.get(
    '/today/:mood',
    authMiddleware,
    questionController.getTodaysQuestion
);
module.exports = router;