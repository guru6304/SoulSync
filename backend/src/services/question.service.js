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

}

module.exports = new QuestionService();