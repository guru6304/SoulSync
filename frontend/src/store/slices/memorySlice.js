import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
      const data = response?.data?.data || response?.data || response;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch memories."
      );
    }
  }
);

export const fetchMemory = createAsyncThunk(
  "memories/fetchOne",
  async (id, thunkAPI) => {
    try {
      const response = await memoryService.getMemoryById(id);
      return response?.data?.data || response?.data || response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch memory."
      );
    }
  }
);

export const createMemory = createAsyncThunk(
  "memories/create",
  async (payload, thunkAPI) => {
    try {
      const response = await memoryService.createMemory(payload);
      return response?.data?.data || response?.data || response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to save memory."
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
        state.memories = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMemories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMemory.fulfilled, (state, action) => {
        state.currentMemory = action.payload;
      })
      .addCase(createMemory.fulfilled, (state, action) => {
        if (!Array.isArray(state.memories)) {
          state.memories = [];
        }
        if (action.payload && action.payload.id) {
          state.memories.unshift(action.payload);
        }
      });
  },
});

export const { clearCurrentMemory, clearMemoryError } = memorySlice.actions;
export default memorySlice.reducer;