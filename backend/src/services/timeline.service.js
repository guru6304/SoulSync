// src/services/timeline.service.js
const memoryRepository = require('../repositories/memory.repository');
const coupleService = require('./couple.service');
const ApiError = require('../utils/ApiError');

class TimelineService {
    async getFeed(userId, page = 1, limit = 10) {
        // 1. Validate couple membership
        const membership =
    await coupleService.findMembershipByUserId(
        userId
    );
        if (!membership) {
            throw new ApiError(403, 'You must be part of a couple to view the timeline');
        }

        // 2. Fetch paginated data
        const offset = (page - 1) * limit;
        const { rows: memories, count: totalItems } = await memoryRepository.getTimelineFeed(
            membership.couple_id, 
            userId, 
            limit, 
            offset
        );

        // 3. Transform data into the final production JSON structure
        const formattedMemories = memories.map(memory => {
            const data = memory.toJSON();

            // Format Reactions: { summary: {...}, users: [...] }
            const summary = { LIKE: 0, LOVE: 0, LAUGH: 0, WOW: 0, SAD: 0, ANGRY: 0, total: 0 };
            const users = [];

            if (data.reactions) {
                data.reactions.forEach(r => {
                    if (summary[r.type] !== undefined) {
                        summary[r.type] += 1;
                        summary.total += 1;
                    }
                    users.push({ user: r.user, reaction: r.type });
                });
            }

            data.reactions = { summary, users };
            return data;
        });

        return {
            memories: formattedMemories,
            pagination: {
                totalItems,
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                itemsPerPage: limit
            }
        };
    }
}

module.exports = new TimelineService();