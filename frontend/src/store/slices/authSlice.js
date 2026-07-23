import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const initialState = {
  user: null,
  token: token || null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },

    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },

    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },

    clearError(state) {
      state.error = null;
    },

    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
