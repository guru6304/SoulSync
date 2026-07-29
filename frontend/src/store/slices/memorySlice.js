import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import * as memoryService from "../../services/memory.service";

const initialState = {

    memories: [],

    currentMemory: null,

    loading: false,

    error: null,

};

export const fetchMemories = createAsyncThunk(
    "memories/fetchAll",
    async (coupleId, thunkAPI) => {

        try {

            const response = await memoryService.getMemories(coupleId);

return response.data.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Unable to fetch memories."
            );

        }

    }
);

export const fetchMemory = createAsyncThunk(
    "memories/fetchOne",
    async (id, thunkAPI) => {

        try {

            const { data } = await memoryService.getMemoryById(id);

            return data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );

        }

    }
);

export const createMemory = createAsyncThunk(
    "memories/create",
    async (payload, thunkAPI) => {

        try {

            const { data } = await memoryService.createMemory(payload);

            return data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );

        }

    }
);

const memorySlice = createSlice({

    name: "memories",

    initialState,

    reducers: {

        clearCurrentMemory(state) {

            state.currentMemory = null;

        },

        clearMemoryError(state) {

            state.error = null;

        },

    },

    extraReducers(builder) {

        builder

            .addCase(fetchMemories.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchMemories.fulfilled, (state, action) => {

                state.loading = false;

                state.memories = action.payload;

            })

            .addCase(fetchMemories.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

            .addCase(fetchMemory.fulfilled, (state, action) => {

                state.currentMemory = action.payload;

            })

            .addCase(createMemory.fulfilled, (state, action) => {

                state.memories.unshift(action.payload);

            });

    },

});

export const {

    clearCurrentMemory,

    clearMemoryError,

} = memorySlice.actions;

export default memorySlice.reducer;