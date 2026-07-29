import React from "react";
import PropTypes from "prop-types";
import "./MemoryPreview.css";
import { useNavigate } from "react-router-dom";
const MemoryPreview = ({ memories = [], onViewAll }) => {
  const navigate = useNavigate();
  const previewMemories = memories.slice(0, 4);

  return (
    <div className="theme-card">
        <div className="memory-preview__header">
          <div>
            <h2>📸 Memories</h2>
            <span>Your beautiful moments together</span>
          </div>

<button
    className="memory-preview__btn"
    onClick={onViewAll}
>
    View All
</button>
        </div>

        <div className="memory-preview__grid">
          {previewMemories.length ? (
            previewMemories.map((memory) => (
              <div key={memory.id} className="memory-preview__card">
                <img src={memory.image} alt={memory.title} />

                <div className="memory-preview__overlay">
                  <h4>{memory.title}</h4>
                </div>
              </div>
            ))
          ) : (
            <div className="memory-preview__empty">
              <span>💖</span>
              <h3>No Memories Yet</h3>
              <p>Create your first beautiful memory together.</p>
            </div>
          )}
        </div>
    </div>
  );
};

MemoryPreview.propTypes = {
  memories: PropTypes.array,
  onViewAll: PropTypes.func,
};

MemoryPreview.defaultProps = {
  memories: [],
  onViewAll: () => {},
};

export default MemoryPreview;
