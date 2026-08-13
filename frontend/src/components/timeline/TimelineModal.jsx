import React, { useState, useEffect } from "react";
import { X, FloppyDisk, CalendarBlank, Heart } from "@phosphor-icons/react";
import "./TimelineModal.css";

const EVENT_TYPES = [
  { key: "first_met", label: "First Met", emoji: "❤️" },
  { key: "first_seen", label: "First Seen", emoji: "👀" },
  { key: "first_conversation", label: "First Conversation", emoji: "💬" },
  { key: "first_date", label: "First Date", emoji: "🥂" },
  { key: "relationship_started", label: "Relationship Started", emoji: "💖" },
  { key: "proposal", label: "Proposal", emoji: "💍" },
  { key: "engagement", label: "Engagement", emoji: "✨" },
  { key: "marriage", label: "Marriage", emoji: "💒" },
  { key: "anniversary", label: "Anniversary", emoji: "🎉" },
  { key: "first_trip", label: "First Trip", emoji: "✈️" },
  { key: "birthday", label: "Birthday", emoji: "🎂" },
  { key: "custom", label: "Custom Event", emoji: "🌟" },
];

const EMOJI_OPTIONS = ["❤️", "💖", "💍", "💒", "🥂", "✈️", "🎉", "👀", "💬", "🎂", "🌟", "🌹", "🏖️", "💌", "🥰"];

const TimelineModal = ({ isOpen, onClose, onSubmit, initialValues = null, defaultType = "custom" }) => {
  const [form, setForm] = useState({
    title: "",
    event_type: "custom",
    event_date: "",
    emoji: "❤️",
    description: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || "",
        event_type: initialValues.event_type || "custom",
        event_date: initialValues.event_date ? initialValues.event_date.split("T")[0] : "",
        emoji: initialValues.emoji || "❤️",
        description: initialValues.description || "",
      });
    } else {
      const selectedTypeObj = EVENT_TYPES.find((t) => t.key === defaultType);
      setForm({
        title: selectedTypeObj && selectedTypeObj.key !== "custom" ? selectedTypeObj.label : "",
        event_type: defaultType,
        event_date: new Date().toISOString().split("T")[0],
        emoji: selectedTypeObj ? selectedTypeObj.emoji : "❤️",
        description: "",
      });
    }
  }, [initialValues, defaultType, isOpen]);

  if (!isOpen) return null;

  const handleTypeChange = (e) => {
    const typeKey = e.target.value;
    const typeObj = EVENT_TYPES.find((t) => t.key === typeKey);
    setForm((prev) => ({
      ...prev,
      event_type: typeKey,
      emoji: typeObj ? typeObj.emoji : prev.emoji,
      title: prev.title || (typeObj && typeObj.key !== "custom" ? typeObj.label : ""),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.event_date || saving) return;

    setSaving(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (_err) {
      // Error handled by parent
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="ss-timeline-modal-overlay" onClick={onClose}>
      <div className="ss-timeline-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="ss-timeline-modal-header">
          <div className="ss-timeline-modal-title">
            <Heart size={22} weight="fill" className="ss-modal-heart" />
            <h3>{initialValues ? "Edit Milestone 🗓️" : "Add Love Milestone 🗓️"}</h3>
          </div>
          <button className="ss-timeline-modal-close" onClick={onClose}>
            <X size={20} weight="bold" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="ss-timeline-modal-form">
          <div className="ss-modal-field">
            <label className="ss-modal-label">Milestone Type</label>
            <select
              className="ss-modal-select"
              value={form.event_type}
              onChange={handleTypeChange}
            >
              {EVENT_TYPES.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.emoji} {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="ss-modal-field">
            <label className="ss-modal-label">Title</label>
            <input
              type="text"
              className="ss-modal-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. The Day Our Story Began ❤️"
              required
            />
          </div>

          <div className="ss-modal-row">
            <div className="ss-modal-field ss-modal-field--flex">
              <label className="ss-modal-label">
                <CalendarBlank size={16} /> Date
              </label>
              <input
                type="date"
                className="ss-modal-input"
                value={form.event_date}
                onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                required
              />
            </div>

            <div className="ss-modal-field ss-modal-field--sm">
              <label className="ss-modal-label">Emoji</label>
              <div className="ss-emoji-picker-row">
                <input
                  type="text"
                  className="ss-modal-input ss-emoji-input"
                  value={form.emoji}
                  maxLength={4}
                  onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="ss-emoji-quick-select">
            {EMOJI_OPTIONS.map((em) => (
              <button
                type="button"
                key={em}
                className={`ss-emoji-chip ${form.emoji === em ? "active" : ""}`}
                onClick={() => setForm({ ...form, emoji: em })}
              >
                {em}
              </button>
            ))}
          </div>

          <div className="ss-modal-field">
            <label className="ss-modal-label">Story / Notes (Optional)</label>
            <textarea
              rows={3}
              className="ss-modal-textarea"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Write a sweet memory or detail about this day..."
            />
          </div>

          <div className="ss-modal-actions">
            <button type="button" className="ss-modal-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="ss-modal-submit-btn" disabled={saving || !form.title.trim()}>
              <FloppyDisk size={18} weight="fill" />
              <span>{saving ? "Saving..." : initialValues ? "Update Milestone" : "Save Milestone ❤️"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimelineModal;
