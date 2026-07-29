import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    getReceivedInvitations,
} from "../../services/coupleInvitation.service";

export const fetchPendingInvitations =
    createAsyncThunk(
        "coupleInvitation/fetchPending",
        async (_, thunkAPI) => {
            try {
                return await getReceivedInvitations();
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message ||
                    "Failed to load invitations."
                );
            }
        }
    );

const initialState = {

    pendingInvitations: [],

    loading: false,

    error: null,

};

const coupleInvitationSlice = createSlice({

    name: "coupleInvitation",

    initialState,

    reducers: {

        clearInvitationError(state) {

            state.error = null;

        },

    },

    extraReducers: (builder) => {

        builder

            .addCase(
                fetchPendingInvitations.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchPendingInvitations.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.pendingInvitations =
                        action.payload;

                }
            )

            .addCase(
                fetchPendingInvitations.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );

    },

});

export const {

    clearInvitationError,

} = coupleInvitationSlice.actions;

export default coupleInvitationSlice.reducer;