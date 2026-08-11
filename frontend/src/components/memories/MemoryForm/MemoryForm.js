import React, { useState } from "react";
import {
  CalendarBlank,
  MapPin,
  Tag,
  Heart,
  NotePencil,
  FloppyDisk,
} from "@phosphor-icons/react";
import MemoryUpload from "../MemoryUpload";
import "./MemoryForm.css";

const moods = [
  "Romantic ❤️",
  "Happy 😊",
  "Funny 😂",
  "Travel ✈️",
  "Adventure 🏔️",
  "Celebration 🎉",
  "Missing You 🥺",
  "Special 💕",
];

const MemoryForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    mood: "Romantic ❤️",
    tags: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImages = (images) => {
    setForm((prev) => ({
      ...prev,
      images,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="ss-memory-form-container" onSubmit={submitHandler}>
      {/* Main Area (Left Column) */}
      <div className="ss-memory-main-column">
        {/* Title Input */}
        <div className="ss-memory-card">
          <label className="ss-memory-field-label">
            <Heart size={18} weight="fill" className="ss-memory-icon" />
            <span>Memory Title</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Our First Date ❤️"
            className="ss-memory-input"
          />
        </div>

        {/* Story Description */}
        <div className="ss-memory-card">
          <label className="ss-memory-field-label">
            <NotePencil size={18} weight="fill" className="ss-memory-icon" />
            <span>Tell the Story</span>
          </label>
          <textarea
            rows={10}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Tell the beautiful story behind this memory..."
            className="ss-memory-textarea"
          />
        </div>

        {/* Media Upload */}
        <div className="ss-memory-card">
          <label className="ss-memory-field-label">
            <span>Memory Media (Photos & Attachments)</span>
          </label>
          <MemoryUpload value={form.images} onChange={handleImages} />
        </div>
      </div>

      {/* Secondary Area (Right Column) */}
      <div className="ss-memory-side-column">
        {/* Metadata Details */}
        <div className="ss-memory-card">
          <label className="ss-memory-side-title">Memory Details</label>

          <div className="ss-memory-field-group">
            <label className="ss-memory-sublabel">
              <CalendarBlank size={16} /> Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="ss-memory-input-sm"
            />
          </div>

          <div className="ss-memory-field-group">
            <label className="ss-memory-sublabel">
              <MapPin size={16} /> Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Hyderabad"
              className="ss-memory-input-sm"
            />
          </div>

          <div className="ss-memory-field-group">
            <label className="ss-memory-sublabel">
              <Tag size={16} /> Tags
            </label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="date, love, trip"
              className="ss-memory-input-sm"
            />
          </div>
        </div>

        {/* Mood Selection */}
        <div className="ss-memory-card">
          <label className="ss-memory-side-title">Select Mood</label>
          <div className="ss-memory-mood-chips">
            {moods.map((mood) => (
              <button
                type="button"
                key={mood}
                className={`ss-memory-mood-chip ${form.mood === mood ? "active" : ""}`}
                onClick={() => setForm({ ...form, mood })}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Action */}
        <div className="ss-memory-card ss-memory-action-card">
          <button type="submit" className="ss-save-memory-btn">
            <FloppyDisk size={20} weight="fill" />
            <span>Save Memory 📸</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default MemoryForm;