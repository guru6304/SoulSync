import apiClient from "./apiClient";

const BASE_URL = "/memories";

export const getMemories = (coupleId) => {

    return apiClient.get(`${BASE_URL}/couple/${coupleId}`);

};

export const getMemoryById = (id) => {

    return apiClient.get(`${BASE_URL}/${id}`);

};

export const createMemory = (payload) => {

    return apiClient.post(BASE_URL, payload);

};

export const updateMemory = (id, payload) => {

    return apiClient.put(`${BASE_URL}/${id}`, payload);

};

export const deleteMemory = (id) => {

    return apiClient.delete(`${BASE_URL}/${id}`);

};