import apiClient from "./apiClient";

const BASE_URL = "/letters";

export const getLetters = () => {

    return apiClient.get(BASE_URL);

};

export const getLetterById = (id) => {

    return apiClient.get(`${BASE_URL}/${id}`);

};

export const createLetter = (payload) => {

    return apiClient.post(BASE_URL, payload);

};

export const updateLetter = (id, payload) => {

    return apiClient.put(`${BASE_URL}/${id}`, payload);

};

export const deleteLetter = (id) => {

    return apiClient.delete(`${BASE_URL}/${id}`);

};