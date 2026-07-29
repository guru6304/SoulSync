import "./QuestionProgress.css";

const QuestionProgress = ({ progress }) => {
  const answered = progress?.answered || 0;
  const total = progress?.total || 0;

  const percentage =
    total > 0
      ? Math.round((answered / total) * 100)
      : 0;

  return (
    <div className="question-progress">

      <div className="question-progress__top">

        <div>

          <h3 className="question-progress__title">
            ❤️ Today's Journey
          </h3>

          <p className="question-progress__subtitle">
            Every answer creates a beautiful memory together.
          </p>

        </div>

        <div className="question-progress__count">
          {answered} / {total}
        </div>

      </div>

      <div className="question-progress__bar">

        <div
          className="question-progress__fill"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="question-progress__bottom">

        <span>
          {answered} Memories Shared
        </span>

        <span>
          {percentage}% Complete
        </span>

      </div>

    </div>
  );
};

export default QuestionProgress;