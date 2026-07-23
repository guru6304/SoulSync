const { Router } = require('express');

const moodController = require('../controllers/mood.controller');
const { authMiddleware: authenticate } = require('../middlewares/auth.middleware');

const router = Router();

router.use(authenticate);

router.post(
    '/',
    moodController.createMood
);

router.get(
    '/today',
    moodController.getTodayMood
);

router.put(
    '/today',
    moodController.updateTodayMood
);

router.get(
    '/history',
    moodController.getMoodHistory
);

module.exports = router;