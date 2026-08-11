import React from "react";
import "./SoulCard.css";

const SoulCardContent = ({ question }) => {
  if (!question) return null;

  return (
    <div className="ss-question-hero-container">
      <h1 className="ss-question-hero-title">
        "{question.title}"
      </h1>

      {question.description && (
        <p className="ss-question-hero-subtitle">
          {question.description}
        </p>
      )}
    </div>
  );
};

export default SoulCardContent;