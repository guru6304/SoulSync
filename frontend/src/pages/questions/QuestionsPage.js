import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./QuestionsPage.css";

import { Loader } from "../../components/common/ui";

import SoulCard from "../../features/questions/SoulCard";
import EmptyQuestion from "../../features/questions/EmptyQuestion";

import useQuestions from "../../hooks/useQuestions";

const QuestionsPage = () => {
  const location = useLocation();

  const mood = location.state?.mood || "romantic";

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

  useEffect(() => {
    loadDailySoulCard(mood);
  }, [mood, loadDailySoulCard]);

  const handleSaveAnswer = async (content) => {
    try {
      if (currentAnswer?.id) {
        await editAnswer(
          currentAnswer.id,
          content
        );
      } else {
        await submitAnswer(
          dailySoulCard.id,
          content
        );
      }

      await loadDailySoulCard(mood);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !dailySoulCard) {
    return (
      <div className="questions-page">
        <EmptyQuestion
          onRefresh={() =>
            loadDailySoulCard(mood)
          }
        />
      </div>
    );
  }

  return (
    <div className="questions-page">

      <SoulCard
        mood={mood}
        question={dailySoulCard}
        progress={progress}
        loading={saving}
        initialAnswer={
          currentAnswer?.content || ""
        }
        onSave={handleSaveAnswer}
      />

    </div>
  );
};

export default QuestionsPage;