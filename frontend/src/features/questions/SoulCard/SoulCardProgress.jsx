import React from "react";
import "./SoulCard.css";

const SoulCardProgress = ({ progress }) => {
  const answered = progress?.answered || 0;
  const total = progress?.total || 0;
  const percentage = total ? Math.min((answered / total) * 100, 100) : 0;

  if (!total) return null;

  return (
    <div className="ss-question-progress-bar-container">
      <div className="ss-question-progress-text">
        <span>Question {answered > 0 ? answered : 1} of {total}</span>
      </div>

      <div className="ss-question-thin-bar">
        <div
          className="ss-question-thin-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default SoulCardProgress;