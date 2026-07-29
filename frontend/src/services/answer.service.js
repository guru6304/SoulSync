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