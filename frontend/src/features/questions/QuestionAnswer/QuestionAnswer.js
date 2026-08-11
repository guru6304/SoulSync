import React, { useEffect, useState } from "react";
import { ImagePlus, Mic, Send, Video } from "lucide-react";
import apiClient from "../../../services/apiClient";
import "./QuestionAnswer.css";

const MAX_CHARACTERS = 1000;
const uploadableTypes = ["image", "audio", "video"];

const QuestionAnswer = ({ question, initialValue = "", loading = false, onSave }) => {
  const [answer, setAnswer] = useState(initialValue);
  const [media, setMedia] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const type = question?.answer_type || "text";

  useEffect(() => {
    setAnswer(initialValue);
    setMedia(null);
    setUploadError("");
  }, [initialValue, question?.id]);

  const uploadFile = async (file) => {
    if (!file || !uploadableTypes.includes(type)) return;
    setUploading(true);
    setUploadError("");
    try {
      const payload = new FormData();
      payload.append("file", file);
      const response = await apiClient.post(`/uploads/${type}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploaded = response.data.data;
      setMedia({
        media_type: uploaded.media_type,
        file_url: uploaded.url,
        public_id: uploaded.public_id,
        file_size: uploaded.file_size,
      });
    } catch (error) {
      setUploadError(error.response?.data?.message || "Unable to upload this file.");
    } finally {
      setUploading(false);
    }
  };

  const submit = () => {
    const content = typeof answer === "string" ? answer.trim() : answer;
    const requiresMedia = uploadableTypes.includes(type);
    if (
      loading ||
      uploading ||
      (requiresMedia && !media) ||
      (!requiresMedia && !content && type !== "mixed") ||
      (type === "mixed" && !content && !media)
    )
      return;
    onSave(content || "", media ? [media] : null);
  };

  const renderFilePicker = (label, Icon, accept) => (
    <label className="ss-glass-upload-zone">
      <Icon size={24} />
      <span>{uploading ? "Uploading file..." : media ? "File ready (Click to replace)" : label}</span>
      <input
        type="file"
        accept={accept}
        disabled={uploading || loading}
        onChange={(e) => uploadFile(e.target.files?.[0])}
      />
    </label>
  );

  const renderInputSurface = () => {
    if (type === "yes_no") {
      return (
        <div className="ss-emotional-yesno-grid">
          <button
            type="button"
            className={`ss-yesno-btn ${answer === "yes" ? "active" : ""}`}
            onClick={() => setAnswer("yes")}
          >
            Yes 😔
          </button>
          <button
            type="button"
            className={`ss-yesno-btn ${answer === "no" ? "active" : ""}`}
            onClick={() => setAnswer("no")}
          >
            No 🫶
          </button>
        </div>
      );
    }

    if (type === "image") return renderFilePicker("Upload Photo 📷", ImagePlus, "image/*");
    if (type === "audio") return renderFilePicker("Record or Upload Audio 🎙️", Mic, "audio/*");
    if (type === "video") return renderFilePicker("Upload Video 🎥", Video, "video/*");

    if (type === "music") {
      return (
        <div className="ss-glass-writing-card">
          <textarea
            rows={4}
            maxLength={MAX_CHARACTERS}
            className="ss-glass-textarea"
            placeholder="Share the song title or link that reminds you of us... 🎵"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      );
    }

    const placeholderText =
      type === "letter"
        ? "Write me a little letter from your heart... 💌"
        : "Open your heart and tell me...";

    return (
      <div className={`ss-glass-writing-card ${type === "letter" ? "ss-glass-writing-card--letter" : ""}`}>
        <textarea
          rows={type === "letter" ? 9 : 6}
          maxLength={MAX_CHARACTERS}
          className="ss-glass-textarea"
          placeholder={placeholderText}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        {type === "mixed" &&
          renderFilePicker("Add a photo, audio, or video", ImagePlus, "image/*,audio/*,video/*")}
      </div>
    );
  };

  const isTextLike = ["text", "letter", "music", "mixed"].includes(type);

  return (
    <div className="ss-answer-interaction-area">
      {renderInputSurface()}

      {media && <p className="ss-upload-ready-text">✨ Attachment attached and ready to send</p>}
      {uploadError && <p className="ss-upload-error-text">{uploadError}</p>}

      {isTextLike && (
        <div className="ss-character-counter">
          {answer.length} / {MAX_CHARACTERS}
        </div>
      )}

      <div className="ss-submit-action-container">
        <button
          type="button"
          className="ss-primary-submit-btn"
          disabled={loading || uploading}
          onClick={submit}
        >
          {loading ? (
            "Sending..."
          ) : (
            <>
              <Send size={18} />
              <span>{type === "letter" ? "Send Letter 💌" : "Submit Answer"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuestionAnswer;
