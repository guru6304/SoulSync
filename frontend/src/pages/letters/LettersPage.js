import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Plus, Envelope, ArrowLeft } from "@phosphor-icons/react";

import useLetters from "../../hooks/useLetters";
import LetterCard from "../../components/letters/LetterCard";
import SSBottomNav from "../../components/common/ss-bottom-nav/SSBottomNav";
import ThemeProvider, { useTheme } from "../../theme/ThemeProvider";

import "./LettersPage.css";

const LettersPageContent = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { letters, loading, getLetters } = useLetters();

  useEffect(() => {
    getLetters();
  }, [getLetters]);

  return (
    <div className="ss-letters-page-wrapper">
      <header
        className="ss-letters-header-banner"
        style={{
          background: theme?.gradient || "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)",
        }}
      >
        <button className="ss-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} weight="bold" />
        </button>

        <div className="ss-letters-banner__inner">
          <h1>
            <Envelope size={32} weight="fill" />
            Love Letters 💌
          </h1>
          <p>Words from the heart that stay forever.</p>
        </div>

        <button
          className="ss-write-letter-btn"
          onClick={() => navigate("/letters/write")}
        >
          <Plus size={18} weight="bold" /> Write Letter
        </button>
      </header>

      <main className="ss-letters-container">
        {loading ? (
          <div className="ss-letters-loading">
            <p>Loading your letters...</p>
          </div>
        ) : letters.length === 0 ? (
          <div className="ss-letters-empty">
            <Envelope size={48} weight="duotone" />
            <h3>No Letters Yet</h3>
            <p>Write your first love letter today.</p>
            <button
              className="ss-write-letter-btn"
              onClick={() => navigate("/letters/write")}
            >
              ✍️ Write a Letter
            </button>
          </div>
        ) : (
          <div className="ss-letters-grid">
            {letters.map((letter) => (
              <LetterCard key={letter.id} letter={letter} />
            ))}
          </div>
        )}
      </main>

      <SSBottomNav activeTab="letters" />
    </div>
  );
};

const LettersPage = () => (
  <ThemeProvider>
    <LettersPageContent />
  </ThemeProvider>
);

export default LettersPage;
