export const selectDashboard = (state) =>
    state.dashboard.dashboard;

export const selectDashboardStats = (state) =>
    state.dashboard.stats;

export const selectDashboardActivity = (state) =>
    state.dashboard.activity;

export const selectDashboardLoading = (state) =>
    state.dashboard.loading.dashboard;

export const selectDashboardStatsLoading = (state) =>
    state.dashboard.loading.stats;

export const selectDashboardActivityLoading = (state) =>
    state.dashboard.loading.activity;

export const selectDashboardError = (state) =>
    state.dashboard.error.dashboard;

export const selectDashboardStatsError = (state) =>
    state.dashboard.error.stats;

export const selectDashboardActivityError = (state) =>
    state.dashboard.error.activity;