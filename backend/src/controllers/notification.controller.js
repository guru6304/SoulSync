const notificationService = require('../services/notification.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

const getNotifications = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const data = await notificationService.getUserNotifications(
        userId,
        page,
        limit
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            data,
            'Notifications retrieved successfully'
        )
    );
});

const markAsRead = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const notificationId = req.params.id;

    const notification = await notificationService.markAsRead(
        notificationId,
        userId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            notification,
            'Notification marked as read'
        )
    );
});

const markAllAsRead = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const result = await notificationService.markAllAsRead(userId);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            'All notifications marked as read'
        )
    );
});

module.exports = {
    getNotifications,
    markAsRead,
    markAllAsRead,
};