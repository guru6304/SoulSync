import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import "./SoulCard.css";

const moodBadges = {
  romantic: { emoji: "❤️", label: "ROMANTIC" },
  happy: { emoji: "😊", label: "HAPPY" },
  funny: { emoji: "😂", label: "FUNNY" },
  sad: { emoji: "💙", label: "SAD" },
  angry: { emoji: "😡", label: "ANGRY" },
  missing_you: { emoji: "💜", label: "MISSING YOU" },
  celebration: { emoji: "🎉", label: "CELEBRATION" },
  sleepy: { emoji: "🌙", label: "SLEEPY" },
  need_hug: { emoji: "🫂", label: "NEED A HUG" },
};

const SoulCardHeader = ({ mood = "romantic" }) => {
  const navigate = useNavigate();
  const normalizedMood = mood?.replace(/-/g, "_");
  const badge = moodBadges[normalizedMood] || moodBadges[mood] || moodBadges.romantic;

  return (
    <div className="ss-question-top-bar">
      <button
        type="button"
        className="ss-back-circle-btn"
        onClick={() => navigate(`/moods/${mood}`)}
        title="Back to Mood"
      >
        <ArrowLeft size={20} weight="bold" />
      </button>

      <div className="ss-question-mood-badge">
        <span>{badge.emoji}</span>
        <span className="ss-badge-label">{badge.label}</span>
      </div>

      <div style={{ width: 40 }} />
    </div>
  );
};

export default SoulCardHeader;