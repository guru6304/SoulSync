import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
      const response = await letterService.getLetters();
      const payload = response?.data?.data || response?.data || response;
      return Array.isArray(payload) ? payload : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch letters."
      );
    }
  }
);

export const fetchLetter = createAsyncThunk(
  "letters/fetchOne",
  async (id, thunkAPI) => {
    try {
      const response = await letterService.getLetterById(id);
      return response?.data?.data || response?.data || response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch letter."
      );
    }
  }
);

export const createLetter = createAsyncThunk(
  "letters/create",
  async (payload, thunkAPI) => {
    try {
      const response = await letterService.createLetter(payload);
      return response?.data?.data || response?.data || response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to save letter."
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
        state.letters = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchLetters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLetter.fulfilled, (state, action) => {
        state.currentLetter = action.payload;
      })
      .addCase(createLetter.fulfilled, (state, action) => {
        if (!Array.isArray(state.letters)) {
          state.letters = [];
        }
        state.letters.unshift(action.payload);
      });
  },
});

export const { clearCurrentLetter, clearLetterError } = letterSlice.actions;
export default letterSlice.reducer;