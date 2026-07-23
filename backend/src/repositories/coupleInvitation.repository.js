const {
    sequelize,
    CoupleInvitation,
} = require('../models');

class CoupleInvitationRepository {

    async findById(id) {
        return CoupleInvitation.findByPk(id);
    }

    async create(data) {
        return CoupleInvitation.create(data);
    }

    async update(id, data, transaction = null) {
        await CoupleInvitation.update(
            data,
            {
                where: { id },
                transaction,
            }
        );

        return this.findById(id);
    }

    async delete(id) {
        return CoupleInvitation.destroy({
            where: { id },
        });
    }

    async findPending(senderId, receiverId) {

        const { Op } = require('sequelize');

        return CoupleInvitation.findOne({
            where: {
                status: 'pending',

                [Op.or]: [
                    {
                        sender_id: senderId,
                        receiver_id: receiverId,
                    },
                    {
                        sender_id: receiverId,
                        receiver_id: senderId,
                    },
                ],
            },
        });
    }

    async transaction(callback) {
        return sequelize.transaction(callback);
    }
    async findReceived(userId) {
    return CoupleInvitation.findAll({
        where: {
            receiver_id: userId,
        },
        order: [['created_at', 'DESC']],
    });
}

async findSent(userId) {
    return CoupleInvitation.findAll({
        where: {
            sender_id: userId,
        },
        order: [['created_at', 'DESC']],
    });
}
}

module.exports = new CoupleInvitationRepository();