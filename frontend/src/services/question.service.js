import apiClient from "./apiClient";

const BASE_URL = "/questions";

const questionService = {

    getQuestions: async () => {
        const response = await apiClient.get(BASE_URL);
        return response.data.data;
    },

    getQuestionById: async (questionId) => {
        const response = await apiClient.get(
            `${BASE_URL}/${questionId}`
        );

        return response.data.data;
    },

    createQuestion: async (payload) => {
        const response = await apiClient.post(
            BASE_URL,
            payload
        );

        return response.data.data;
    },
getDailySoulCard: async (moodType) => {
    const response = await apiClient.get(
        `${BASE_URL}/daily/${moodType}`
    );

    return response.data.data;
},

    updateQuestion: async (questionId, payload) => {
        const response = await apiClient.put(
            `${BASE_URL}/${questionId}`,
            payload
        );

        return response.data.data;
    },

    deleteQuestion: async (questionId) => {
        const response = await apiClient.delete(
            `${BASE_URL}/${questionId}`
        );

        return response.data.data;
    },

};

export default questionService;