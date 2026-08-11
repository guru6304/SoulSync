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

let refreshPromise = null;

const clearStoredAuth = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const isAuthRequest = originalRequest?.url?.startsWith("/auth/");

        if (status !== 401 || !originalRequest || originalRequest._retried || isAuthRequest) {
            return Promise.reject(error);
        }

        const storedRefreshToken = localStorage.getItem("refreshToken");
        if (!storedRefreshToken) {
            clearStoredAuth();
            window.location.assign("/login");
            return Promise.reject(error);
        }

        originalRequest._retried = true;

        try {
            if (!refreshPromise) {
                refreshPromise = axios.post(
                    `${apiClient.defaults.baseURL}/auth/refresh`,
                    { refreshToken: storedRefreshToken },
                    { headers: { "Content-Type": "application/json" } },
                ).then((response) => response.data.data);
            }

            const { accessToken, refreshToken } = await refreshPromise;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return apiClient(originalRequest);
        } catch (refreshError) {
            clearStoredAuth();
            window.location.assign("/login");
            return Promise.reject(refreshError);
        } finally {
            refreshPromise = null;
        }
    },
);

export default apiClient;
