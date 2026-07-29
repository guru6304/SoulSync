import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import * as saySomethingService from "../../services/saySomething.service";

const initialState = {

    timeline: [],

    selectedMessage: null,

    loading: false,

    error: null,

};

export const fetchSaySomethingTimeline = createAsyncThunk(

    "saySomething/timeline",

    async (coupleId, thunkAPI) => {

        try {

            const response =
                await saySomethingService.getSaySomethingTimeline(
                    coupleId
                );

            return response.data.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Unable to load messages."

            );

        }

    }

);

export const fetchSaySomething = createAsyncThunk(

    "saySomething/details",

    async (saySomethingId, thunkAPI) => {

        try {

            const response =
                await saySomethingService.getSaySomething(
                    saySomethingId
                );

            return response.data.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Unable to load message."

            );

        }

    }

);

const saySomethingSlice = createSlice({

    name: "saySomething",

    initialState,

    reducers: {},

    extraReducers(builder) {

        builder

            .addCase(fetchSaySomethingTimeline.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchSaySomethingTimeline.fulfilled, (state, action) => {

                state.loading = false;

                state.timeline = action.payload;

            })

            .addCase(fetchSaySomethingTimeline.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

            .addCase(fetchSaySomething.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchSaySomething.fulfilled, (state, action) => {

                state.loading = false;

                state.selectedMessage = action.payload;

            })

            .addCase(fetchSaySomething.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });

    },

});

export default saySomethingSlice.reducer;