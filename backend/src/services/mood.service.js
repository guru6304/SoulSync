const ApiError = require('../utils/ApiError');
const validateOrThrow = require('../utils/validateOrThrow');

const {
    validateCreateMood,
    validateUpdateMood,
} = require('../validations/mood.validation');

const moodRepository = require('../repositories/mood.repository');
const coupleRepository = require('../repositories/couple.repository');

class MoodService {

    async createMood(user, data) {

        validateOrThrow(
            validateCreateMood(data)
        );

        const membership =
            await coupleRepository.findMembershipByUserId(
                user.id
            );

        if (!membership) {
            throw new ApiError(
                404,
                'Couple not found'
            );
        }

        const today =
            new Date().toISOString().split('T')[0];

        const existingMood =
            await moodRepository.findTodayMood(
                user.id,
                today
            );

        if (existingMood) {
            throw new ApiError(
                409,
                'Mood already submitted for today'
            );
        }

        return moodRepository.create({
            user_id: user.id,
            couple_id: membership.couple_id,
            mood_type: data.mood_type,
            note: data.note,
            mood_date: today,
        });
    }

    async getTodayMood(userId) {

        const today =
            new Date().toISOString().split('T')[0];

        return moodRepository.findTodayMood(
            userId,
            today
        );
    }

    async updateTodayMood(userId, data) {

        validateOrThrow(
            validateUpdateMood(data)
        );

        const today =
            new Date().toISOString().split('T')[0];

        const mood =
            await moodRepository.findTodayMood(
                userId,
                today
            );

        if (!mood) {
            throw new ApiError(
                404,
                'Today mood not found'
            );
        }

        return moodRepository.update(
            mood.id,
            {
                mood_type: data.mood_type,
                note: data.note,
            }
        );
    }

    async getMoodHistory(userId) {

        return moodRepository.findMoodHistory(
            userId
        );
    }
}

module.exports = new MoodService();