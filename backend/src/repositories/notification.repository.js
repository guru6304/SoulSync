const { Notification, User } = require('../models');

class NotificationRepository {
    async create(data) {
        return await Notification.create(data);
    }

    async findById(id) {
        return await Notification.findByPk(id);
    }

    async update(id, data) {
        const notification = await Notification.findByPk(id);

        if (!notification) {
            return null;
        }

        return await notification.update(data);
    }

    async markAllAsRead(userId) {
        return await Notification.update(
            { is_read: true },
            {
                where: {
                    user_id: userId,
                    is_read: false,
                },
            }
        );
    }

    async findByUserIdPaginated(userId, limit, offset) {
        return await Notification.findAndCountAll({
            where: {
                user_id: userId,
            },
            include: [
                {
                    model: User,
                    as: 'actor',
                    attributes: [
                        'id',
                        'first_name',
                        'last_name',
                        'profile_picture',
                    ],
                },
            ],
            order: [['created_at', 'DESC']],
            limit,
            offset,
        });
    }

    async countUnread(userId) {
        return await Notification.count({
            where: {
                user_id: userId,
                is_read: false,
            },
        });
    }
}

module.exports = new NotificationRepository();