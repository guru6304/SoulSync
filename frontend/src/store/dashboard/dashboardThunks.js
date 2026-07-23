import { createAsyncThunk } from "@reduxjs/toolkit";

import dashboardService from "../../services/dashboard.service";

export const fetchDashboard = createAsyncThunk(

    "dashboard/fetchDashboard",

    async (_, thunkAPI) => {

        try {

            return await dashboardService.getDashboard();

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch dashboard."

            );

        }

    }

);

export const fetchDashboardStats = createAsyncThunk(

    "dashboard/fetchStats",

    async (_, thunkAPI) => {

        try {

            return await dashboardService.getStats();

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch dashboard statistics."

            );

        }

    }

);

export const fetchDashboardActivity = createAsyncThunk(

    "dashboard/fetchActivity",

    async (_, thunkAPI) => {

        try {

            return await dashboardService.getActivity();

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch dashboard activity."

            );

        }

    }

);