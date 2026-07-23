const ApiError = require('../utils/ApiError');

const memoryRepository = require('../repositories/memory.repository');
const memoryCommentRepository = require('../repositories/memoryComment.repository');
const coupleService = require('./couple.service');

class MemoryCommentService {
    async addComment(userId, memoryId, content) {
        const memory = await memoryRepository.findById(memoryId);

        if (!memory) {
            throw new ApiError(404, 'Memory not found');
        }

        const membership =
    await coupleService.findMembership(
        userId,
        memory.couple_id
    );

if (!membership) {
    throw new ApiError(
        403,
        'You are not a member of this couple'
    );
}

        return await memoryCommentRepository.create({
            memory_id: memoryId,
            user_id: userId,
            content,
        });
    }

    async updateComment(userId, commentId, content) {
        const comment = await memoryCommentRepository.findById(commentId);

        if (!comment) {
            throw new ApiError(404, 'Comment not found');
        }

        if (comment.user_id !== userId) {
            throw new ApiError(403, 'You can only edit your own comment');
        }

        return await memoryCommentRepository.update(commentId, {
            content,
        });
    }

    async deleteComment(userId, commentId) {
        const comment = await memoryCommentRepository.findById(commentId);

        if (!comment) {
            throw new ApiError(404, 'Comment not found');
        }

        if (comment.user_id !== userId) {
            throw new ApiError(403, 'You can only delete your own comment');
        }

        await memoryCommentRepository.remove(commentId);

        return {
            deleted: true,
        };
    }

    async listComments(userId, memoryId) {
        const memory = await memoryRepository.findById(memoryId);

        if (!memory) {
            throw new ApiError(404, 'Memory not found');
        }

        await coupleService.findMembership(userId, memory.couple_id);

        return await memoryCommentRepository.findAllByMemory(memoryId);
    }
}

module.exports = new MemoryCommentService();