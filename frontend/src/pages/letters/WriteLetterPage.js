import React from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import useLetters from "../../hooks/useLetters";
import LetterEditor from "../../components/letters/LetterEditor";
import ThemeProvider from "../../theme/ThemeProvider";
import "./WriteLetterPage.css";

const WriteLetterContent = () => {
  const navigate = useNavigate();
  const { addLetter } = useLetters();

  const handleSubmit = async (values) => {
    await addLetter(values);
    navigate("/letters");
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
        <LetterEditor onSubmit={handleSubmit} />
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