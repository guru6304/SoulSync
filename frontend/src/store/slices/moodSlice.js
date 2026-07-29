import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import * as moodService from "../../services/mood.service";

const initialState = {

    history: [],

    loading: false,

    error: null,

};

export const fetchMoodHistory = createAsyncThunk(

    "moods/history",

    async (_, thunkAPI) => {

        try {

            const response =
                await moodService.getMoodHistory();

            return response.data.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Unable to load mood history."

            );

        }

    }

);

const moodSlice = createSlice({

    name: "moods",

    initialState,

    reducers: {},

    extraReducers(builder) {

        builder

            .addCase(fetchMoodHistory.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchMoodHistory.fulfilled, (state, action) => {

                state.loading = false;

                state.history = action.payload;

            })

            .addCase(fetchMoodHistory.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });

    },

});

export default moodSlice.reducer;