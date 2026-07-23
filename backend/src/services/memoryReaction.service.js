const ApiError = require('../utils/ApiError');

const memoryRepository = require('../repositories/memory.repository');
const memoryReactionRepository = require('../repositories/memoryReaction.repository');
const coupleService = require('./couple.service');

const {
    validateReaction,
} = require('../validations/memoryReaction.validation');

class MemoryReactionService {
    async reactToMemory(userId, memoryId, type) {
        const validation = validateReaction({
            memory_id: memoryId,
            type,
        });

        if (!validation.isValid) {
            throw new ApiError(
                400,
                'Validation failed',
                validation.errors
            );
        }

        const memory = await memoryRepository.findById(memoryId);

        if (!memory) {
            throw new ApiError(
                404,
                'Memory not found'
            );
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

        const existingReaction =
            await memoryReactionRepository.findByMemoryAndUser(
                memoryId,
                userId
            );

        if (!existingReaction) {
            return await memoryReactionRepository.create({
                memory_id: memoryId,
                user_id: userId,
                type,
            });
        }

        return await memoryReactionRepository.update(
            existingReaction.id,
            {
                type,
            }
        );
    }

    async removeReaction(userId, memoryId) {
        const reaction =
            await memoryReactionRepository.findByMemoryAndUser(
                memoryId,
                userId
            );

        if (!reaction) {
            throw new ApiError(
                404,
                'Reaction not found'
            );
        }

        await memoryReactionRepository.remove(
            reaction.id
        );

        return {
            deleted: true,
        };
    }

    async listReactions(userId, memoryId) {
        const memory =
            await memoryRepository.findById(memoryId);

        if (!memory) {
            throw new ApiError(
                404,
                'Memory not found'
            );
        }

        await coupleService.findMembership(
            userId,
            memory.couple_id
        );

        return await memoryReactionRepository.findAllByMemory(
            memoryId
        );
    }

    async getReactionSummary(userId, memoryId) {
        const memory =
            await memoryRepository.findById(memoryId);

        if (!memory) {
            throw new ApiError(
                404,
                'Memory not found'
            );
        }

        await coupleService.findMembership(
            userId,
            memory.couple_id
        );

        return await memoryReactionRepository.getReactionSummary(
            memoryId
        );
    }
}

module.exports = new MemoryReactionService();