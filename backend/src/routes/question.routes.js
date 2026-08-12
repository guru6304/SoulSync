const express = require('express');

const router = express.Router();

const questionController = require('../controllers/question.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.get(
    '/',
    questionController.getQuestions
);

router.get(
    '/mood/:mood',
    questionController.getQuestionsByMood
);

router.get(
    '/today/:mood',
    questionController.getTodaysQuestion
);

router.get(
    '/daily/:mood',
    questionController.getDailySoulCard
);

router.get(
    '/:id',
    questionController.getQuestion
);

router.post(
    '/',
    questionController.createQuestion
);

router.put(
    '/:id',
    questionController.updateQuestion
);

router.delete(
    '/:id',
    questionController.deleteQuestion
);

module.exports = router;