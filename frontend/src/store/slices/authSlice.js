import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    user: JSON.parse(
        localStorage.getItem("user")
    ) || null,

    token:
        localStorage.getItem("accessToken"),

    refreshToken:
        localStorage.getItem("refreshToken"),

    isAuthenticated:
        !!localStorage.getItem("accessToken"),

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

            const {

                user,
                accessToken,
                refreshToken,

            } = action.payload;

            localStorage.setItem(
                "accessToken",
                accessToken
            );

            localStorage.setItem(
                "refreshToken",
                refreshToken
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            state.user = user;
            state.token = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;

        },

        loginFailure(state, action) {

            state.loading = false;
            state.error = action.payload;

        },

        logout(state) {

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");

            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;

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