const ApiError = require('../utils/ApiError');
const questionRepository = require('../repositories/question.repository');

const normalizeMood = (mood) => (mood || 'romantic').replace(/-/g, '_');

class QuestionService {

    async getQuestions(filters) {
        if (filters && filters.mood_type) {
            filters.mood_type = normalizeMood(filters.mood_type);
        }
        return questionRepository.findAll(filters);
    }

    async getQuestion(id) {
        const question = await questionRepository.findById(id);

        if (!question) {
            throw new ApiError(404, 'Question not found');
        }

        return question;
    }

    async getQuestionsByMood(moodType) {
        const mood = normalizeMood(moodType);
        return questionRepository.findByMood(mood);
    }

    async createQuestion(data) {
        return questionRepository.create(data);
    }

    async updateQuestion(id, data) {
        await this.getQuestion(id);
        return questionRepository.update(id, data);
    }

    async deleteQuestion(id) {
        await this.getQuestion(id);
        await questionRepository.delete(id);
    }

    async getTodaysQuestion(userId, moodType, answeredForDate) {
        const mood = normalizeMood(moodType);
        const questions =
            await questionRepository.findUnansweredByMood(
                userId,
                mood,
                answeredForDate
            );

        if (!questions.length) {
            throw new ApiError(
                404,
                'No questions available.'
            );
        }

        const randomIndex = Math.floor(
            Math.random() * questions.length
        );

        return questions[randomIndex];
    }

    async getDailySoulCard(userId, moodType, answeredForDate) {
        const mood = normalizeMood(moodType);

        let question = await questionRepository.findRandomUnansweredQuestion(
            userId,
            mood,
            answeredForDate
        );

        if (!question) {
            const allQuestions =
                await questionRepository.findByMood(mood);

            if (!allQuestions.length) {
                throw new ApiError(
                    404,
                    "No Soul Cards available for this mood."
                );
            }

            question =
                allQuestions[
                    Math.floor(Math.random() * allQuestions.length)
                ];
        }

        const totalQuestions =
            await questionRepository.getQuestionCountByMood(
                mood
            );

        const answeredCount =
            await questionRepository.getAnsweredCount(
                userId,
                mood,
                answeredForDate
            );

        return {
            progress: {
                answered: answeredCount,
                total: totalQuestions,
            },
            question,
        };
    }
}

module.exports = new QuestionService();