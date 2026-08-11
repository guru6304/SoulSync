import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChatCircleDots,
  NotePencil,
  Image as ImageIcon,
  ChatCircleText,
  BookmarkSimple,
  UsersThree,
  ArrowRight,
} from "@phosphor-icons/react";

import { useTheme } from "../../../theme/ThemeProvider";
import SSBottomNav from "../../common/ss-bottom-nav/SSBottomNav";
import MemoryPreview from "../../dashboard/MemoryPreview";
import LetterPreview from "../../dashboard/LetterPreview";

import "./UnifiedMoodHome.css";

const UnifiedMoodHome = () => {
  const navigate = useNavigate();
  const { moodId = "romantic" } = useParams();
  const theme = useTheme();

  const handleOpenSoulCard = () => {
    navigate(`/questions?mood=${moodId}`);
  };

  const handleOpenMyAnswers = () => {
    navigate(`/moods/${moodId}/my-answers`);
  };

  const handleOpenPartnerAnswers = () => {
    navigate(`/moods/${moodId}/partner-answers`);
  };

  return (
    <div className="ss-unified-mood-home">
      <div className="ss-mood-container">
        {/* 1. Daily Soul Card - Main Hero Section */}
        <section
          className="ss-mood-hero"
          style={{
            background: theme?.gradient || "linear-gradient(135deg, #EC4899, #F472B6)",
          }}
        >
          {/* Ambient Decorative Particles */}
          <div className="ss-hero-decorations">
            <span className="ss-floating-particle p1">✨</span>
            <span className="ss-floating-particle p2">💖</span>
            <span className="ss-floating-particle p3">🌟</span>
            <span className="ss-floating-particle p4">🌸</span>
          </div>

          <div className="ss-mood-hero__inner">
            <div className="ss-mood-badge">
              <span>{theme?.title || "Happy"} Mood</span>
              <span className="ss-mood-badge__emoji">{theme?.emoji || "😊"}</span>
            </div>

            <h1 className="ss-mood-hero__title">Daily Soul Card</h1>

            <p className="ss-mood-hero__subtitle">
              Explore today's question, created especially for your mood.
            </p>

            <div className="ss-hero-actions">
              <button
                className="ss-hero-btn ss-hero-btn--primary"
                onClick={handleOpenSoulCard}
              >
                <ChatCircleDots size={22} weight="fill" />
                <span>Answer Now</span>
              </button>

              <button
                className="ss-hero-btn ss-hero-btn--secondary"
                onClick={handleOpenMyAnswers}
              >
                <BookmarkSimple size={20} weight="bold" />
                <span>My Answers</span>
              </button>

              <button
                className="ss-hero-btn ss-hero-btn--secondary"
                onClick={handleOpenPartnerAnswers}
              >
                <UsersThree size={20} weight="bold" />
                <span>Partner Answers</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. Quick Actions Tiles */}
        <section className="ss-section">
          <div className="ss-section-header">
            <h2>Quick Actions</h2>
            <p>Connect with your partner right now</p>
          </div>

          <div className="ss-quick-actions-grid">
            {/* Tile 1: Write Letter */}
            <div
              className="ss-action-tile ss-action-tile--letter"
              onClick={() => navigate("/letters/write")}
            >
              <div className="ss-tile__icon-wrapper">
                <NotePencil size={28} weight="fill" />
              </div>

              <div className="ss-tile__content">
                <span className="ss-tile__label">WRITE LETTER</span>
                <p className="ss-tile__description">Pour your heart out</p>
              </div>

              <div className="ss-tile__arrow">
                <ArrowRight size={20} weight="bold" />
              </div>
            </div>

            {/* Tile 2: Add Memory */}
            <div
              className="ss-action-tile ss-action-tile--memory"
              onClick={() => navigate("/memories/create")}
            >
              <div className="ss-tile__icon-wrapper">
                <ImageIcon size={28} weight="fill" />
              </div>

              <div className="ss-tile__content">
                <span className="ss-tile__label">ADD MEMORY</span>
                <p className="ss-tile__description">Capture a beautiful moment</p>
              </div>

              <div className="ss-tile__arrow">
                <ArrowRight size={20} weight="bold" />
              </div>
            </div>

            {/* Tile 3: Say Something */}
            <div
              className="ss-action-tile ss-action-tile--say"
              onClick={() => navigate("/say-something")}
            >
              <div className="ss-tile__icon-wrapper">
                <ChatCircleText size={28} weight="fill" />
              </div>

              <div className="ss-tile__content">
                <span className="ss-tile__label">SAY SOMETHING</span>
                <p className="ss-tile__description">Share what's on your mind</p>
              </div>

              <div className="ss-tile__arrow">
                <ArrowRight size={20} weight="bold" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Desktop Two-Column Section: Memories & Love Letters */}
        <section className="ss-section ss-desktop-columns">
          <div className="ss-column">
            <MemoryPreview onViewAll={() => navigate("/memories")} />
          </div>

          <div className="ss-column">
            <LetterPreview onViewAll={() => navigate("/letters")} />
          </div>
        </section>
      </div>

      {/* 4. Desktop Wide Floating Navigation Bar */}
      <SSBottomNav activeTab="home" />
    </div>
  );
};

export default UnifiedMoodHome;
