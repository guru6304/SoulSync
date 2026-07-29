import apiClient from "./apiClient";

const BASE_URL = "/say-somethings";

export const createSaySomething = (payload) => {
    return apiClient.post(BASE_URL, payload);
};

export const getSaySomethingTimeline = (coupleId) => {
    return apiClient.get(`${BASE_URL}/couple/${coupleId}`);
};

export const getSaySomething = (saySomethingId) => {
    return apiClient.get(`${BASE_URL}/${saySomethingId}`);
};