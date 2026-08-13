import React, { useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import useLetters from "../../hooks/useLetters";
import LetterEditor from "../../components/letters/LetterEditor";
import ThemeProvider from "../../theme/ThemeProvider";
import { useToast } from "../../context/ToastContext";
import "./WriteLetterPage.css";

const WriteLetterContent = () => {
  const navigate = useNavigate();
  const { addLetter } = useLetters();
  const { showSuccess, showError } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const action = await addLetter(values);
      if (addLetter.rejected?.match(action) || action?.error) {
        throw new Error(action.payload || action.error?.message || "Failed to save letter.");
      }
      showSuccess("Love letter saved successfully 💌");
      navigate("/letters");
    } catch (err) {
      showError(err, "Unable to save letter. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ss-write-letter-page-wrapper">
      <div className="ss-write-letter-page-container">
        {/* Top Header */}
        <div className="ss-write-letter-top-nav">
          <button
            type="button"
            className="ss-write-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} weight="bold" />
            <span>Back</span>
          </button>

          <div className="ss-write-letter-title-group">
            <h1>💌 Write a Love Letter</h1>
            <p>"Some words become memories forever."</p>
          </div>
        </div>

        {/* Form Composition */}
        <LetterEditor onSubmit={handleSubmit} disabled={submitting} />
      </div>
    </div>
  );
};

const WriteLetterPage = () => (
  <ThemeProvider>
    <WriteLetterContent />
  </ThemeProvider>
);

export default WriteLetterPage;