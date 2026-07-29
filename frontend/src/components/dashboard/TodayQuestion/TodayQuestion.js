import { ChatCircleDots, ArrowRight } from "@phosphor-icons/react";

import { Card } from "../../common/ui";

import "./TodayQuestion.css";
import { useNavigate } from "react-router-dom";

const TodayQuestion = ({ question, answered = false, onAnswer }) => {
  const navigate = useNavigate();

  return (
    <Card className="ss-today-question">
      <div className="ss-today-question__header">
        <ChatCircleDots size={30} weight="fill" />

        <span>Daily Question</span>
      </div>

      <h3>{question}</h3>

      <button
        className="ss-today-question__button"
         onClick={onAnswer}
      >
        {answered ? "View Answer" : "Answer Now"}

        <ArrowRight size={18} weight="bold" />
      </button>
    </Card>
  );
};

export default TodayQuestion;
