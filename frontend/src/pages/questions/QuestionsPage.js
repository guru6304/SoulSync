import { useEffect, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";

import "./QuestionsPage.css";

import { Loader } from "../../components/common/ui";
import SoulCard from "../../features/questions/SoulCard";
import EmptyQuestion from "../../features/questions/EmptyQuestion";
import useQuestions from "../../hooks/useQuestions";
import ThemeProvider from "../../theme/ThemeProvider";

const QuestionsPageContent = () => {
  const location = useLocation();
  const params = useParams();

  const searchParams = new URLSearchParams(location.search);
  const mood =
    params.moodId ||
    searchParams.get("mood") ||
    location.state?.mood ||
    localStorage.getItem("activeMood") ||
    "romantic";

  const {
    loading,
    error,
    saving,
    dailySoulCard,
    currentAnswer,
    progress,
    loadDailySoulCard,
    submitAnswer,
    editAnswer,
  } = useQuestions();

  const fetchQuestion = useCallback(() => {
    loadDailySoulCard(mood);
  }, [mood, loadDailySoulCard]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleSaveAnswer = async (content, media = null) => {
    try {
      if (currentAnswer?.id) {
        await editAnswer(currentAnswer.id, content);
      } else if (dailySoulCard?.id) {
        await submitAnswer(dailySoulCard.id, content, media);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNextQuestion = () => {
    fetchQuestion();
  };

  if (loading) {
    return (
      <div className="questions-page-wrapper">
        <Loader />
      </div>
    );
  }

  if (error || !dailySoulCard) {
    return (
      <div className="questions-page-wrapper">
        <div className="questions-page">
          <EmptyQuestion onRefresh={fetchQuestion} error={error} mood={mood} />
        </div>
      </div>
    );
  }

  return (
    <div className="questions-page-wrapper">
      <div className="questions-page">
        <SoulCard
          mood={mood}
          question={dailySoulCard}
          progress={progress}
          loading={saving}
          initialAnswer={currentAnswer?.content || ""}
          onSave={handleSaveAnswer}
          onContinue={handleNextQuestion}
        />
      </div>
    </div>
  );
};

const QuestionsPage = () => (
  <ThemeProvider>
    <QuestionsPageContent />
  </ThemeProvider>
);

export default QuestionsPage;
