import React, { useMemo, useState } from "react";
import { Heart, FloppyDisk, Eye, PencilSimple } from "@phosphor-icons/react";
import "./LetterEditor.css";

const moods = [
  "Romantic ❤️",
  "Happy 😊",
  "Missing You 🥺",
  "Thank You 🙏",
  "Sorry 💙",
  "Anniversary 🎉",
  "Forever 💕",
  "Special ✨",
];

const LetterEditor = ({
  onSubmit,
  initialValues = {
    title: "",
    mood: "Romantic ❤️",
    content: "",
  },
  submitLabel = "Save Letter 💌",
}) => {
  const [form, setForm] = useState(initialValues);

  const words = useMemo(() => {
    return form.content.trim().split(/\s+/).filter(Boolean).length;
  }, [form.content]);

  const readingTime = Math.max(1, Math.ceil(words / 200));

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form className="ss-letter-editor-container" onSubmit={submitHandler}>
      {/* Left / Main Column */}
      <div className="ss-letter-main-column">
        {/* Title Input */}
        <div className="ss-paper-title-card">
          <label className="ss-field-label">
            <Heart size={18} weight="fill" className="ss-label-icon" />
            <span>Letter Title</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={changeHandler}
            placeholder="My Forever Love ❤️"
            className="ss-title-paper-input"
          />
        </div>

        {/* Letter Editor Textarea */}
        <div className="ss-paper-editor-card">
          <label className="ss-field-label">
            <PencilSimple size={18} weight="fill" className="ss-label-icon" />
            <span>Your Heartfelt Letter</span>
          </label>

          <textarea
            rows={16}
            name="content"
            value={form.content}
            onChange={changeHandler}
            placeholder="Start writing from your heart..."
            className="ss-paper-textarea"
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="ss-letter-side-column">
        {/* Mood Selection */}
        <div className="ss-side-card">
          <label className="ss-side-card-title">Select Mood</label>
          <div className="ss-mood-chips-grid">
            {moods.map((m) => (
              <button
                key={m}
                type="button"
                className={`ss-mood-chip ${form.mood === m ? "active" : ""}`}
                onClick={() => setForm({ ...form, mood: m })}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Metadata */}
        <div className="ss-side-card">
          <label className="ss-side-card-title">Letter Stats</label>
          <div className="ss-stats-row">
            <div className="ss-stat-box">
              <strong>{words}</strong>
              <span>Words</span>
            </div>
            <div className="ss-stat-box">
              <strong>{form.content.length}</strong>
              <span>Characters</span>
            </div>
            <div className="ss-stat-box">
              <strong>{readingTime}m</strong>
              <span>Read</span>
            </div>
          </div>

          <button type="submit" className="ss-save-letter-btn">
            <FloppyDisk size={20} weight="fill" />
            <span>{submitLabel}</span>
          </button>
        </div>

        {/* Live Preview Card */}
        <div className="ss-side-card ss-preview-side-card">
          <div className="ss-preview-header">
            <Eye size={18} weight="fill" />
            <span>Live Letter Preview</span>
          </div>

          <article className="ss-letter-realistic-preview">
            <div className="ss-preview-mood-tag">{form.mood || "Romantic ❤️"}</div>
            <h2>{form.title || "Untitled Letter"}</h2>

            <div className="ss-preview-body">
              {(form.content || "Your heartfelt words will appear here...")
                .split("\n")
                .map((line, index) => (
                  <p key={index}>{line || <>&nbsp;</>}</p>
                ))}
            </div>
          </article>
        </div>
      </div>
    </form>
  );
};

export default LetterEditor;
