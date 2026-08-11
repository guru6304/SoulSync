import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectQuestions,
  selectCurrentQuestion,
  selectQuestionLoading,
  selectQuestionError,
} from "../store/questions";

import {
  fetchQuestions,
  answerQuestion,
  updateAnswer,
  getMyAnswer,
  deleteAnswer,
  fetchDailySoulCard,
} from "../store/questions/questionThunks";

const useQuestions = () => {
  const dispatch = useDispatch();

  // Selectors
  const questions = useSelector(selectQuestions);

  const currentQuestion = useSelector(selectCurrentQuestion);

  const loading = useSelector(selectQuestionLoading);

  const error = useSelector(selectQuestionError);

  // New Answer State
  const { saving, saveError, currentAnswer,    dailySoulCard,
    progress, } = useSelector(
    (state) => state.questions,
  );

  useEffect(() => {
    if (currentQuestion?.id) {
      dispatch(getMyAnswer(currentQuestion.id));
    }
  }, [dispatch, currentQuestion?.id]);
  
  // Refresh Questions
  const refreshQuestions = useCallback(
    () => dispatch(fetchQuestions()),
    [dispatch],
  );

  // This callback is consumed by a page effect.  Keeping its identity stable
  // prevents every Redux state update from triggering another Soul Card request.
  const loadDailySoulCard = useCallback(
    (moodType) => dispatch(fetchDailySoulCard(moodType)),
    [dispatch],
  );

  // Answer APIs
  const submitAnswer = (questionId, content, media = null) =>
    dispatch(
      answerQuestion({
        questionId,
        content,
        media,
      }),
    );

  const editAnswer = (answerId, content) =>
    dispatch(
      updateAnswer({
        answerId,
        content,
      }),
    );

  const loadMyAnswer = (questionId) => dispatch(getMyAnswer(questionId));

  const removeAnswer = (answerId) => dispatch(deleteAnswer(answerId));

  // Computed Values
  const totalQuestions = questions.length;

  const answeredQuestions = questions.filter(
    (question) => question.isAnswered,
  ).length;

  const hasQuestions = questions.length > 0;
  

  return {
    // Questions
    questions,
    currentQuestion,

    // Question State
    loading,
    error,

    // Answer State
    saving,
    saveError,
    currentAnswer,

    // Computed
    totalQuestions,
    answeredQuestions,
    hasQuestions,

    // Question Actions
    refreshQuestions,

    // Answer Actions
    submitAnswer,
    editAnswer,
    loadMyAnswer,
    removeAnswer,
    dailySoulCard,

    progress,

    loadDailySoulCard,
  };
};

export default useQuestions;
