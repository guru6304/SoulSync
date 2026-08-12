const { Mood } = require('../models');

class MoodRepository {

    async create(data) {
        return Mood.create(data);
    }

    async findById(id) {
        return Mood.findByPk(id);
    }

    async findMoodHistory(userId, limit = 30) {
        return Mood.findAll({
            where: {
                user_id: userId,
            },
            order: [['mood_date', 'DESC']],
            limit,
        });
    }

    async findTodayMood(userId, moodDate) {
        return Mood.findOne({
            where: {
                user_id: userId,
                mood_date: moodDate,
            },
        });
    }

    async update(id, data) {
        await Mood.update(data, {
            where: { id },
        });

        return this.findById(id);
    }

}

module.exports = new MoodRepository();