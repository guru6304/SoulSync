import "./QuestionCard.css";

const moodIcons = {
  romantic: "❤️",
  happy: "😊",
  funny: "😂",
  sad: "💙",
  angry: "😤",
  missing_you: "🥺",
  celebration: "🎉",
  sleepy: "🌙",
  need_hug: "🤗",
};

const QuestionCard = ({ question }) => {
  if (!question) return null;

  return (
    <div className={`question-card mood-${question.mood_type}`}>

      <div className="question-card__badge">
        {moodIcons[question.mood_type] || "❤️"} Today's Soul Card
      </div>

      <div className="question-card__icon">
        {moodIcons[question.mood_type] || "❤️"}
      </div>

      <h1 className="question-card__title">
        {question.title}
      </h1>

      {question.description && (
        <p className="question-card__description">
          {question.description}
        </p>
      )}

    </div>
  );
};

export default QuestionCard;