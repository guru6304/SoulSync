const { Notification } = require('../models');
const logger = require('../utils/logger');

class NotificationService {
    async createSystemNotification(userId, actorId, type, referenceId, message) {
        try {
            return await Notification.create({
                user_id: userId,
                actor_id: actorId,
                type,
                reference_id: referenceId,
                message,
            });
        } catch (error) {
            logger.error(`Failed to create notification for user ${userId}:`, error);
            throw error;
        }
    }

    async getUserNotifications(userId, page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        const { count, rows } = await Notification.findAndCountAll({
            where: {
                user_id: userId,
            },
            order: [['created_at', 'DESC']],
            limit,
            offset,
        });

        return {
            notifications: rows,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit),
            },
        };
    }

    async markAsRead(notificationId, userId) {
        const notification = await Notification.findOne({
            where: {
                id: notificationId,
                user_id: userId,
            },
        });

        if (!notification) {
            return null;
        }

        return await notification.update({
            is_read: true,
        });
    }

    async markAllAsRead(userId) {
        const [updated] = await Notification.update(
            {
                is_read: true,
            },
            {
                where: {
                    user_id: userId,
                    is_read: false,
                },
            }
        );

        return {
            updated,
        };
    }
}

module.exports = new NotificationService();