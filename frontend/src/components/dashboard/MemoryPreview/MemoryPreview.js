import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus } from "@phosphor-icons/react";
import "./MemoryPreview.css";

const MemoryPreview = ({ memories = [], onViewAll }) => {
  const navigate = useNavigate();
  const previewMemories = memories.slice(0, 4);

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      navigate("/memories");
    }
  };

  const handleAddMemory = () => {
    navigate("/memories/create");
  };

  return (
    <div className="ss-preview-card ss-memory-preview">
      <div className="ss-preview-header">
        <div>
          <h2>📸 Memories</h2>
          <p>Your beautiful moments together</p>
        </div>

        <button className="ss-view-all-btn" onClick={handleViewAll}>
          <span>View All</span>
          <ArrowRight size={16} weight="bold" />
        </button>
      </div>

      <div className="ss-preview-body">
        {previewMemories.length ? (
          <div className="ss-memory-grid">
            {previewMemories.map((memory) => (
              <div key={memory.id} className="ss-memory-item">
                <img src={memory.image || memory.imageUrl} alt={memory.title} />
                <div className="ss-memory-overlay">
                  <h4>{memory.title}</h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="ss-empty-preview">
            <span className="ss-empty-emoji">💗</span>
            <h3>No Memories Yet</h3>
            <p>Create your first beautiful memory together.</p>
            <button className="ss-empty-cta-btn" onClick={handleAddMemory}>
              <Plus size={16} weight="bold" />
              <span>Add Memory</span>
            </button>
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

export default MemoryPreview;
