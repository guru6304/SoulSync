const express = require('express');

const { authMiddleware } = require('../middlewares/auth.middleware');

const answerController = require('../controllers/answer.controller');

const router = express.Router();

router.get(
  '/my-answers',
  authMiddleware,
  answerController.getMyAnswers
);

router.get(
  '/partner-answers',
  authMiddleware,
  answerController.getPartnerAnswers
);

router.get(
  '/:id',
  authMiddleware,
  answerController.getAnswerById
);

router.put(
  '/:id',
  authMiddleware,
  answerController.updateAnswer
);

router.delete(
  '/:id',
  authMiddleware,
  answerController.deleteAnswer
);
router.post(
    '/question/:questionId',
    authMiddleware,
    answerController.answerQuestion
);

router.get(
    '/my/:questionId',
    authMiddleware,
    answerController.getMyAnswer
);

module.exports = router;