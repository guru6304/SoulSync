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

    loading: {

        dashboard: false,
        stats: false,
        activity: false,

    },

    error: {

        dashboard: null,
        stats: null,
        activity: null,

    },

};

const dashboardSlice = createSlice({

    name: "dashboard",

    initialState,

    reducers: {

        clearDashboardError(state) {

            state.error = {

                dashboard: null,
                stats: null,
                activity: null,

            };

        },

    },

    extraReducers: (builder) => {

        builder

            .addCase(fetchDashboard.pending, (state) => {

                state.loading.dashboard = true;
                state.error.dashboard = null;

            })

            .addCase(fetchDashboard.fulfilled, (state, action) => {

                state.loading.dashboard = false;
                state.dashboard = action.payload;

            })

            .addCase(fetchDashboard.rejected, (state, action) => {

                state.loading.dashboard = false;
                state.error.dashboard = action.payload;

            })

            .addCase(fetchDashboardStats.pending, (state) => {

                state.loading.stats = true;
                state.error.stats = null;

            })

            .addCase(fetchDashboardStats.fulfilled, (state, action) => {

                state.loading.stats = false;
                state.stats = action.payload;

            })

            .addCase(fetchDashboardStats.rejected, (state, action) => {

                state.loading.stats = false;
                state.error.stats = action.payload;

            })

            .addCase(fetchDashboardActivity.pending, (state) => {

                state.loading.activity = true;
                state.error.activity = null;

            })

            .addCase(fetchDashboardActivity.fulfilled, (state, action) => {

                state.loading.activity = false;
                state.activity = action.payload;

            })

            .addCase(fetchDashboardActivity.rejected, (state, action) => {

                state.loading.activity = false;
                state.error.activity = action.payload;

            });

    },

});

export const {

    clearDashboardError,

} = dashboardSlice.actions;

export default dashboardSlice.reducer;