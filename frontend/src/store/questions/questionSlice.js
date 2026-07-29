import { createSlice } from "@reduxjs/toolkit";
import {
  fetchQuestions,
  fetchDailySoulCard,
  answerQuestion,
  updateAnswer,
  getMyAnswer,
  deleteAnswer,
} from "./questionThunks";

const initialState = {
  questions: [],
  currentQuestion: null,

  loading: false,
  error: null,
  saving: false,
  saveError: null,
  currentAnswer: null,
  dailySoulCard: null,
progress: null,
};

const questionSlice = createSlice({
  name: "questions",

  initialState,

  reducers: {
    clearQuestionError(state) {
      state.error = null;
    },

    setCurrentQuestion(state, action) {
      state.currentQuestion = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;

        state.questions = action.payload;

        state.currentQuestion = action.payload[0] || null;
      })
      
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
    // =============================
    // Submit Answer
    // =============================

    builder
      .addCase(answerQuestion.pending, (state) => {
        state.saving = true;
        state.saveError = null;
      })
      .addCase(answerQuestion.fulfilled, (state, action) => {
        state.saving = false;
        state.currentAnswer = action.payload;
      })
      .addCase(answerQuestion.rejected, (state, action) => {
        state.saving = false;
        state.saveError = action.payload;
      });

    // =============================
    // Update Answer
    // =============================

    builder
      .addCase(updateAnswer.pending, (state) => {
        state.saving = true;
        state.saveError = null;
      })
      .addCase(updateAnswer.fulfilled, (state, action) => {
        state.saving = false;
        state.currentAnswer = action.payload;
      })
      .addCase(updateAnswer.rejected, (state, action) => {
        state.saving = false;
        state.saveError = action.payload;
      });

    // =============================
    // Get My Answer
    // =============================

    builder
      .addCase(getMyAnswer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAnswer = action.payload;
      })
      .addCase(getMyAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =============================
    // Delete Answer
    // =============================

    builder.addCase(deleteAnswer.fulfilled, (state) => {
      state.currentAnswer = null;
    })
    .addCase(fetchDailySoulCard.pending,(state)=>{

    state.loading=true;

    state.error=null;

})

.addCase(fetchDailySoulCard.fulfilled,(state,action)=>{

    state.loading=false;

    state.dailySoulCard=action.payload.question;

    state.progress=action.payload.progress;

    state.currentQuestion=action.payload.question;

})

.addCase(fetchDailySoulCard.rejected,(state,action)=>{

    state.loading=false;

    state.error=action.payload;

});
    
  },
});

export const {
  clearQuestionError,

  setCurrentQuestion,
} = questionSlice.actions;

export default questionSlice.reducer;
