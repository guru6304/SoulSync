const { MemoryReaction, User } = require('../models');
const { Sequelize } = require('sequelize');

class MemoryReactionRepository {
    async findById(id) {
        return MemoryReaction.findByPk(id);
    } 

    async findByMemoryAndUser(memoryId, userId) {
        return await MemoryReaction.findOne({
            where: {
                memory_id: memoryId,
                user_id: userId,
            },
        });
    }

    async create(data) {
        return await MemoryReaction.create(data);
    }

    async update(id, data) {
        const reaction = await MemoryReaction.findByPk(id);

        if (!reaction) {
            return null;
        }

        return await reaction.update(data);
    }

    async remove(id) {
        const reaction = await MemoryReaction.findByPk(id);

        if (!reaction) {
            return false;
        }

        await reaction.destroy();

        return true;
    }

    async findAllByMemory(memoryId) {
        return await MemoryReaction.findAll({
            where: {
                memory_id: memoryId,
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: [
                        'id',
                        'first_name',
                        'last_name',
                        'profile_picture',
                    ],
                },
            ],
            order: [['created_at', 'DESC']],
        });
    }

    async getReactionSummary(memoryId) {
        const rows = await MemoryReaction.findAll({
            where: {
                memory_id: memoryId,
            },
            attributes: [
                'type',
                [
                    Sequelize.fn(
                        'COUNT',
                        Sequelize.col('id')
                    ),
                    'count',
                ],
            ],
            group: ['type'],
        });

        const summary = {
            LIKE: 0,
            LOVE: 0,
            LAUGH: 0,
            WOW: 0,
            SAD: 0,
            ANGRY: 0,
            total: 0,
        };

        for (const row of rows) {
            const count = Number(row.get('count'));

            summary[row.type] = count;
            summary.total += count;
        }

        return summary;
    }
}

module.exports = new MemoryReactionRepository();