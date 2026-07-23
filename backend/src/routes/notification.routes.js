const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.use(authMiddleware);

// GET /api/v1/notifications
router.get('/', notificationController.getNotifications);

// PATCH /api/v1/notifications/read-all
router.patch('/read-all', notificationController.markAllAsRead);

// PATCH /api/v1/notifications/:id/read
router.patch('/:id/read', notificationController.markAsRead);

module.exports = router;