import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import * as letterService from "../../services/letter.service";

const initialState = {

    letters: [],

    currentLetter: null,

    loading: false,

    error: null,

};

export const fetchLetters = createAsyncThunk(
    "letters/fetchAll",
    async (_, thunkAPI) => {

        try {

            const { data } = await letterService.getLetters();

            return data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Unable to fetch letters."
            );

        }

    }
);

export const fetchLetter = createAsyncThunk(
    "letters/fetchOne",
    async (id, thunkAPI) => {

        try {

            const { data } = await letterService.getLetterById(id);

            return data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );

        }

    }
);

export const createLetter = createAsyncThunk(
    "letters/create",
    async (payload, thunkAPI) => {

        try {

            const { data } = await letterService.createLetter(payload);

            return data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );

        }

    }
);

const letterSlice = createSlice({

    name: "letters",

    initialState,

    reducers: {

        clearCurrentLetter(state) {

            state.currentLetter = null;

        },

        clearLetterError(state) {

            state.error = null;

        },

    },

    extraReducers(builder) {

        builder

            .addCase(fetchLetters.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchLetters.fulfilled, (state, action) => {

                state.loading = false;

                state.letters = action.payload;

            })

            .addCase(fetchLetters.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

            .addCase(fetchLetter.fulfilled, (state, action) => {

                state.currentLetter = action.payload;

            })

            .addCase(createLetter.fulfilled, (state, action) => {

                state.letters.unshift(action.payload);

            });

    },

});

export const {

    clearCurrentLetter,

    clearLetterError,

} = letterSlice.actions;

export default letterSlice.reducer;