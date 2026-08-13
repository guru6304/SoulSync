import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import dashboardReducer from "./dashboard";
import questionReducer from "./questions";
import saySomethingReducer from "./slices/saySomethingSlice";
import coupleInvitationReducer from "./slices/coupleInvitationSlice";
import letterReducer from "./slices/letterSlice";
import memoryReducer from "./slices/memorySlice";
import moodReducer from "./slices/moodSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        questions: questionReducer,
        saySomething: saySomethingReducer,
        coupleInvitation: coupleInvitationReducer,
        letters: letterReducer,
        memories: memoryReducer,
        moods: moodReducer,
    },
});
