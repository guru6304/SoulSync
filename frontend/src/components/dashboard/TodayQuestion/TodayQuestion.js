import { ChatCircleDots, ArrowRight } from "@phosphor-icons/react";

import { Card } from "../../common/ui";

import "./TodayQuestion.css";
import { useNavigate } from "react-router-dom";

const TodayQuestion = ({ question = "How did you feel when we first met?", answered = false, mood, onAnswer }) => {
  const navigate = useNavigate();

  const handleAnswerClick = () => {
    if (onAnswer) {
      onAnswer();
    } else {
      const activeMood = mood || localStorage.getItem("activeMood") || "romantic";
      navigate(`/questions?mood=${activeMood}`);
    }
  };

  return (
    <Card className="ss-today-question">
      <div className="ss-today-question__header">
        <ChatCircleDots size={30} weight="fill" />

        <span>Daily Soul Card</span>
      </div>

      <h3>{question}</h3>

      <button
        className="ss-today-question__button"
        onClick={handleAnswerClick}
      >
        {answered ? "View Answer" : "Answer Now"}

        <ArrowRight size={18} weight="bold" />
      </button>
    </Card>
  );
};

export default TodayQuestion;
