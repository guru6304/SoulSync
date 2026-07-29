import apiClient from "./apiClient";

const BASE_URL = "/moods";

export const createMood = (payload) => {
    return apiClient.post(BASE_URL, payload);
};

export const getMoodHistory = () => {
    return apiClient.get(`${BASE_URL}/history`);
};