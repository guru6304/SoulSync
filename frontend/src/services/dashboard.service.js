import apiClient from "./apiClient";

const dashboardService = {

    async getDashboard() {

        const response = await apiClient.get("/dashboard");

        return response.data.data;

    },

    async getStats() {

        const response = await apiClient.get("/dashboard/stats");

        return response.data.data;

    },

    async getActivity() {

        const response = await apiClient.get("/dashboard/activity");

        return response.data.data;

    },

};

export default dashboardService;