const { MemoryMedia, User } = require('../models');

class MemoryMediaRepository {
    async create(data) {
        return await MemoryMedia.create(data);
    }

    async bulkCreate(data) {
        return await MemoryMedia.bulkCreate(data);
    }

    async findById(id) {
        return await MemoryMedia.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'uploader',
                    attributes: [
                        'id',
                        'first_name',
                        'last_name',
                        'profile_picture',
                    ],
                },
            ],
        });
    }

    async findByMemory(memoryId) {
        return await MemoryMedia.findAll({
            where: {
                memory_id: memoryId,
            },
            include: [
                {
                    model: User,
                    as: 'uploader',
                    attributes: [
                        'id',
                        'first_name',
                        'last_name',
                        'profile_picture',
                    ],
                },
            ],
            order: [['created_at', 'ASC']],
        });
    }

    async deleteMedia(id) {
        const media = await MemoryMedia.findByPk(id);

        if (!media) {
            return false;
        }

        await media.destroy();

        return true;
    }
}

module.exports = new MemoryMediaRepository();