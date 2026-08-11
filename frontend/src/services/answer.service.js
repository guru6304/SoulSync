import apiClient from "./apiClient";

const answerService = {
    answerQuestion(questionId, content, media = null) {
        return apiClient.post(
            `/answers/question/${questionId}`,
            {
                content,
                media,
            }
        );
    },

    getMyAnswer(questionId) {
        return apiClient.get(
            `/answers/my/${questionId}`
        );
    },

    getMyAnswers(mood = null) {
        return apiClient.get(
            `/answers/my-answers${mood ? `?mood=${mood}` : ''}`
        );
    },

    getPartnerAnswers(mood = null) {
        return apiClient.get(
            `/answers/partner-answers${mood ? `?mood=${mood}` : ''}`
        );
    },

    updateAnswer(answerId, content) {
        return apiClient.put(
            `/answers/${answerId}`,
            {
                content,
            }
        );
    },

    deleteAnswer(answerId) {
        return apiClient.delete(
            `/answers/${answerId}`
        );
    },
};

export default answerService;