// src/repositories/memoryComment.repository.js
const { MemoryComment, User } = require('../models');

class MemoryCommentRepository {
    async findById(id) { return await MemoryComment.findByPk(id); }
    async create(data) { return await MemoryComment.create(data); }
    async update(id, data) {
        const comment = await MemoryComment.findByPk(id);
        return comment ? await comment.update(data) : null;
    }
    async remove(id) {
        const comment = await MemoryComment.findByPk(id);
        return comment ? await comment.destroy() : false;
    }
    async findAllByMemory(memoryId) {
        return await MemoryComment.findAll({
            where: { memory_id: memoryId },
            include: [{ model: User, as: 'user', attributes: ['id', 'first_name', 'last_name', 'profile_picture'] }],
            order: [['created_at', 'ASC']]
        });
    }
}

module.exports = new MemoryCommentRepository();