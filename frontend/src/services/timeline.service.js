import apiClient from "./apiClient";

const BASE_URL = "/timeline";

export const getTimelineEvents = () => {
  return apiClient.get(BASE_URL);
};

export const createTimelineEvent = (payload) => {
  return apiClient.post(BASE_URL, payload);
};

export const updateTimelineEvent = (id, payload) => {
  return apiClient.put(`${BASE_URL}/${id}`, payload);
};

export const deleteTimelineEvent = (id) => {
  return apiClient.delete(`${BASE_URL}/${id}`);
};
