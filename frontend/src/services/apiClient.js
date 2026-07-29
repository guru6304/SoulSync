import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    // Fix: Only add the header if token is not null, not undefined, and not the literal string "undefined"
    if (token && token !== 'undefined' && token !== 'null') {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn("API Call attempted without a valid token");
    }

    return config;
});

export default apiClient;