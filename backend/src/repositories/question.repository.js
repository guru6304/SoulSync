const { Op } = require('sequelize');
const { Question, Answer } = require('../models');

class QuestionRepository {
    async findAll(filters = {}) {
        return Question.findAll({
            where: filters,
            order: [['display_order', 'ASC']],
        });
    }

    async findById(id) {
        return Question.findByPk(id);
    }

    async findByMood(moodType) {
        return Question.findAll({
            where: {
                mood_type: moodType,
                is_active: true,
            },
            order: [['display_order', 'ASC']],
        });
    }

    async create(data) {
        return Question.create(data);
    }

    async update(id, data) {
        await Question.update(data, { where: { id } });
        return this.findById(id);
    }

    async delete(id) {
        return Question.destroy({
            where: { id },
        });
    }

    async getAnsweredQuestionIds(userId, answeredForDate) {
        const answers = await Answer.findAll({
            where: {
                answered_by: userId,
                answered_for_date: answeredForDate,
            },
            attributes: ['question_id'],
        });

        return answers.map(answer => answer.question_id);
    }
    async findUnansweredByMood(userId, moodType, answeredForDate) {
        const answeredQuestionIds = await this.getAnsweredQuestionIds(
            userId,
            answeredForDate
        );

        const where = {
            mood_type: moodType,
            is_active: true,
        };

        if (answeredQuestionIds && answeredQuestionIds.length > 0) {
            where.id = { [Op.notIn]: answeredQuestionIds };
        }

        return Question.findAll({
            where,
            order: [['display_order', 'ASC']],
        });
    }

    async findRandomUnansweredQuestion(userId, moodType, answeredForDate) {
        const answeredQuestionIds = await this.getAnsweredQuestionIds(
            userId,
            answeredForDate
        );

        const where = {
            mood_type: moodType,
            is_active: true,
        };

        if (answeredQuestionIds && answeredQuestionIds.length > 0) {
            where.id = { [Op.notIn]: answeredQuestionIds };
        }

        return Question.findOne({
            where,
            order: Question.sequelize.random(),
        });
    }

    async getQuestionCountByMood(moodType) {

        return Question.count({
            where: {
                mood_type: moodType,
                is_active: true,
            },
        });

    }

    async getAnsweredCount(userId, moodType, answeredForDate) {

        return Answer.count({
            where: {
                answered_by: userId,
                answered_for_date: answeredForDate,
            },
            include: [
                {
                    model: Question,
                    as: "question",
                    where: {
                        mood_type: moodType,
                    },
                },
            ],
        });

    }
}

module.exports = new QuestionRepository();