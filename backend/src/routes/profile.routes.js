const express = require('express');

const router = express.Router();

const controller = require('../controllers/profile.controller');

const {
    authMiddleware,
} = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.get(
    '/',
    controller.getProfile
);

router.put(
    '/',
    controller.updateProfile
);

router.put(
    '/password',
    controller.changePassword
);

module.exports = router;