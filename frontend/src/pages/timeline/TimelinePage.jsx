import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import TimelinePreview from "../../components/dashboard/TimelinePreview";
import SSBottomNav from "../../components/common/ss-bottom-nav/SSBottomNav";
import "./TimelinePage.css";

const TimelinePage = () => {
  const navigate = useNavigate();

  return (
    <div className="ss-timeline-page">
      <header className="ss-timeline-header">
        <button className="ss-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} weight="bold" />
        </button>

        <div className="ss-timeline-header__title">
          <h2>Relationship Timeline 🗓️</h2>
          <p>Our journey together, step by step</p>
        </div>
      </header>

      <main className="ss-timeline-container">
        <TimelinePreview />
      </main>

      <SSBottomNav activeTab="timeline" />
    </div>
  );
};

export default TimelinePage;
