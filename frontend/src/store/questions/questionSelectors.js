export const selectQuestions =
(state) => state.questions.questions;

export const selectCurrentQuestion =
(state) => state.questions.currentQuestion;

export const selectQuestionLoading =
(state) => state.questions.loading;

export const selectQuestionError =
(state) => state.questions.error;