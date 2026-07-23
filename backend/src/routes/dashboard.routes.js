const express = require('express');

const {
    authMiddleware: authenticate,
} = require('../middlewares/auth.middleware');

const controller = require('../controllers/dashboard.controller');

const router = express.Router();

router.use(authenticate);

router.get(
    '/',
    controller.getDashboard
);

router.get(
    '/stats',
    controller.getStats
);

router.get(
    '/activity',
    controller.getActivity
);

module.exports = router;