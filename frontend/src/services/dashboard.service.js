import apiClient from "./apiClient";

const dashboardService = {

    async getDashboard() {

        const { data } = await apiClient.get("/dashboard");

        return data.data;

    },

    async getStats() {

        const { data } = await apiClient.get("/dashboard/stats");

        return data.data;

    },

    async getActivity() {

        const { data } = await apiClient.get("/dashboard/activity");

        return data.data;

    },

};

export default dashboardService;