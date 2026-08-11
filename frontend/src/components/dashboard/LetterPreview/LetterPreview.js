import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ArrowRight, PencilSimple } from "@phosphor-icons/react";
import "./LetterPreview.css";

const LetterPreview = ({ letters = [], onViewAll }) => {
  const navigate = useNavigate();
  const recentLetters = letters.slice(0, 3);

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      navigate("/letters");
    }
  };

  const handleWriteLetter = () => {
    navigate("/letters/write");
  };

  return (
    <div className="ss-preview-card ss-letter-preview">
      <div className="ss-preview-header">
        <div>
          <h2>💌 Love Letters</h2>
          <p>Words that stay forever</p>
        </div>

        <button className="ss-view-all-btn" onClick={handleViewAll}>
          <span>View All</span>
          <ArrowRight size={16} weight="bold" />
        </button>
      </div>

      <div className="ss-preview-body">
        {recentLetters.length ? (
          <div className="ss-letter-list">
            {recentLetters.map((letter) => (
              <div key={letter.id} className="ss-letter-card">
                <div className="ss-letter-card__icon">💌</div>
                <div className="ss-letter-card__details">
                  <h4>{letter.title}</h4>
                  <p>
                    {letter.content.length > 100
                      ? `${letter.content.substring(0, 100)}...`
                      : letter.content}
                  </p>
                  <span className="ss-letter-card__date">
                    {letter.createdAt
                      ? new Date(letter.createdAt).toLocaleDateString()
                      : "Recently"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="ss-empty-preview ss-empty-preview--letter">
            <span className="ss-empty-emoji">💌</span>
            <h3>No Letters Yet</h3>
            <p>Write your first love letter today.</p>
            <button className="ss-empty-cta-btn" onClick={handleWriteLetter}>
              <PencilSimple size={16} weight="bold" />
              <span>Write a Letter</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

LetterPreview.propTypes = {
  letters: PropTypes.array,
  onViewAll: PropTypes.func,
};

export default LetterPreview;