import apiClient from './apiClient';

const login = async (data) => {
    const response = await apiClient.post(
        '/auth/login',
        data
    );

    return response.data;
};

const register = async (data) => {
    const response = await apiClient.post(
        '/auth/register',
        data
    );

    return response.data;
};

const getProfile = async () => {
    const response = await apiClient.get(
        '/profile'
    );

    return response.data;
};

export default {
    login,
    register,
    getProfile,
};