import { createSlice } from "@reduxjs/toolkit";

import {
    fetchDashboard,
    fetchDashboardStats,
    fetchDashboardActivity,
} from "./dashboardThunks";

const initialState = {

    dashboard: null,

    stats: null,

    activity: null,

    loading: false,

    error: null,

};

const dashboardSlice = createSlice({

    name: "dashboard",

    initialState,

    reducers: {

        clearDashboardError(state) {

            state.error = null;

        },

    },

    extraReducers: (builder) => {

        builder

            // Dashboard

            .addCase(fetchDashboard.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchDashboard.fulfilled, (state, action) => {

                state.loading = false;

                state.dashboard = action.payload;

            })

            .addCase(fetchDashboard.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

            // Stats

            .addCase(fetchDashboardStats.pending, (state) => {

                state.loading = true;

            })

            .addCase(fetchDashboardStats.fulfilled, (state, action) => {

                state.loading = false;

                state.stats = action.payload;

            })

            .addCase(fetchDashboardStats.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

            // Activity

            .addCase(fetchDashboardActivity.pending, (state) => {

                state.loading = true;

            })

            .addCase(fetchDashboardActivity.fulfilled, (state, action) => {

                state.loading = false;

                state.activity = action.payload;

            })

            .addCase(fetchDashboardActivity.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });

    },

});

export const {

    clearDashboardError,

} = dashboardSlice.actions;

export default dashboardSlice.reducer;