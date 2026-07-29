const ApiError = require('../utils/ApiError');
const questionRepository = require('../repositories/question.repository');

class QuestionService {

    async getQuestions(filters) {
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
        return questionRepository.findByMood(moodType);
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

    const questions =
        await questionRepository.findUnansweredByMood(
            userId,
            moodType,
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

        let question = await questionRepository.findRandomUnansweredQuestion(
            userId,
            moodType,
            answeredForDate
        );

        if (!question) {

            const allQuestions =
                await questionRepository.findByMood(moodType);

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
                moodType
            );

        const answeredCount =
            await questionRepository.getAnsweredCount(
                userId,
                moodType,
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