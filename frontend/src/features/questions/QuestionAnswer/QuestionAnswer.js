import { useEffect, useState } from "react";
import "./QuestionAnswer.css";

const MAX_CHARACTERS = 500;

const QuestionAnswer = ({
  question,
  initialValue = "",
  loading = false,
  onSave,
}) => {
  const [answer, setAnswer] = useState(initialValue);

  useEffect(() => {
    setAnswer(initialValue);
  }, [initialValue]);

  const handleSubmit = () => {
    const value =
      typeof answer === "string" ? answer.trim() : answer;

    if (!value || loading) return;

    onSave(value);
  };

  const renderInput = () => {
    switch (question?.answer_type) {
      case "yes_no":
        return (
          <div className="qa-options">
            <button
              className={`qa-option ${
                answer === "yes" ? "active" : ""
              }`}
              onClick={() => setAnswer("yes")}
            >
              ❤️ Yes
            </button>

            <button
              className={`qa-option ${
                answer === "no" ? "active" : ""
              }`}
              onClick={() => setAnswer("no")}
            >
              💔 No
            </button>
          </div>
        );

      case "rating":
        return (
          <div className="rating-group">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`rating-star ${
                  answer === String(star)
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setAnswer(String(star))
                }
              >
                ⭐
              </button>
            ))}
          </div>
        );

      case "emoji":
        return (
          <div className="emoji-group">
            {["😍", "🥰", "😘", "🤗", "❤️"].map(
              (emoji) => (
                <button
                  key={emoji}
                  className={`emoji-btn ${
                    answer === emoji
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setAnswer(emoji)
                  }
                >
                  {emoji}
                </button>
              )
            )}
          </div>
        );

      case "multiple_choice":
        return (
          <div className="qa-options">
            {question.options?.map((item) => (
              <button
                key={item}
                className={`qa-option ${
                  answer === item
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setAnswer(item)
                }
              >
                {item}
              </button>
            ))}
          </div>
        );

      default:
        return (
          <textarea
            rows={6}
            maxLength={MAX_CHARACTERS}
            className="question-answer__textarea"
            placeholder="Tell your partner what's in your heart..."
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
          />
        );
    }
  };

  return (
    <div className="question-answer">
      <h3 className="question-answer__title">
        Your Answer ❤️
      </h3>

      {renderInput()}

      {question?.answer_type === "text" && (
        <div className="question-answer__counter">
          {answer.length} / {MAX_CHARACTERS}
        </div>
      )}

      <button
        className="question-answer__button"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading
          ? "Saving..."
          : "Continue ❤️"}
      </button>
    </div>
  );
};

export default QuestionAnswer;