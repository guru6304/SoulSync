import React from "react";
import { Plus, Sparkle } from "@phosphor-icons/react";
import "./TimelineProfileSection.css";

const QUICK_PROMPTS = [
  { type: "first_met", label: "First Met", emoji: "❤️" },
  { type: "first_seen", label: "First Seen", emoji: "👀" },
  { type: "first_conversation", label: "First Conversation", emoji: "💬" },
  { type: "first_date", label: "First Date", emoji: "🥂" },
  { type: "relationship_started", label: "Relationship Started", emoji: "💖" },
  { type: "proposal", label: "Proposal", emoji: "💍" },
  { type: "engagement", label: "Engagement", emoji: "✨" },
  { type: "marriage", label: "Marriage", emoji: "💒" },
  { type: "anniversary", label: "Anniversary", emoji: "🎉" },
  { type: "first_trip", label: "First Trip", emoji: "✈️" },
  { type: "birthday", label: "Birthday", emoji: "🎂" },
  { type: "custom", label: "Custom Event", emoji: "🌟" },
];

const TimelineProfileSection = ({ onSelectPrompt, existingTypes = [] }) => {
  return (
    <div className="ss-timeline-profile-card">
      <div className="ss-timeline-profile-header">
        <div className="ss-profile-header-title">
          <Sparkle size={20} weight="fill" className="ss-sparkle-icon" />
          <h3>Our Story — Key Milestones 📖</h3>
        </div>
        <p>Click any milestone below to add your special date to your shared timeline.</p>
      </div>

      <div className="ss-timeline-prompts-grid">
        {QUICK_PROMPTS.map((p) => {
          const isAdded = existingTypes.includes(p.type) && p.type !== "custom";
          return (
            <button
              key={p.type}
              type="button"
              className={`ss-prompt-chip ${isAdded ? "added" : ""}`}
              onClick={() => onSelectPrompt(p.type)}
            >
              <span className="ss-chip-emoji">{p.emoji}</span>
              <span className="ss-chip-label">{p.label}</span>
              <span className="ss-chip-action">
                {isAdded ? "✓" : <Plus size={14} weight="bold" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineProfileSection;
