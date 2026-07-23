const { Couple, CoupleMember, User } = require('../models');

class CoupleRepository {
    async create(data = {}, transaction = null) {
        return Couple.create(data, { transaction });
    }

    async findById(id) {
        return Couple.findByPk(id);
    }

    async delete(id, transaction = null) {
        return Couple.destroy({
            where: { id },
            transaction,
        });
    }

    async findMembership(userId, coupleId) {
        return CoupleMember.findOne({
            where: {
                user_id: userId,
                couple_id: coupleId,
            },
        });
    }

    async findMembershipByUserId(userId) {
        return CoupleMember.findOne({
            where: {
                user_id: userId,
            },
        });
    }
    async findActiveCoupleByUserId(userId) {
    return Couple.findOne({
        include: [
            {
                model: CoupleMember,
                as: 'members',
                where: {
                    user_id: userId,
                },
                attributes: [],
            },
        ],
        where: {
            status: 'active',
        },
    });
}

    async addMembers(members, transaction = null) {
        return CoupleMember.bulkCreate(
            members,
            { transaction }
        );
    }

    async findMembers(coupleId) {
        return CoupleMember.findAll({
            where: {
                couple_id: coupleId,
            },
            include: [
                {
                    model: User,
                    as: 'user',
                },
            ],
        });
    }

    async getPartner(userId, coupleId) {
        const { Op } = require('sequelize');

        return CoupleMember.findOne({
            where: {
                couple_id: coupleId,
                user_id: {
                    [Op.ne]: userId,
                },
            },
        });
    }
}

module.exports = new CoupleRepository();