import apiClient from "./apiClient";

const login = async (credentials) => {
    const response = await apiClient.post(
        "/auth/login",
        credentials
    );

    // Return only the backend data object
    return response.data.data;
};

const register = async (userData) => {
    const response = await apiClient.post(
        "/auth/register",
        userData
    );

    return response.data.data;
};

const getProfile = async () => {
    const response = await apiClient.get(
        "/profile"
    );

    return response.data.data;
};

const authService = {
    login,
    register,
    getProfile,
};

export default authService;