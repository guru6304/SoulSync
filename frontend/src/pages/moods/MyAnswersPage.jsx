import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookmarkSimple, Eye } from "@phosphor-icons/react";

import ThemeProvider, { useTheme } from "../../theme/ThemeProvider";
import SSBottomNav from "../../components/common/ss-bottom-nav/SSBottomNav";
import answerService from "../../services/answer.service";
import Loader from "../../components/common/ui/Loader";

import "./AnswersPages.css";

const MyAnswersPageContent = () => {
  const navigate = useNavigate();
  const { moodId = "romantic" } = useParams();
  const theme = useTheme();

  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyAnswers = async () => {
      try {
        setLoading(true);
        const res = await answerService.getMyAnswers(moodId);
        const fetchedData = res?.data?.data || res?.data || res || [];
        setAnswers(Array.isArray(fetchedData) ? fetchedData : []);
      } catch (err) {
        console.error("Error fetching my answers:", err);
        setAnswers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAnswers();
  }, [moodId]);

  return (
    <div className="ss-answers-page">
      {/* Header */}
      <header
        className="ss-answers-header"
        style={{
          background: theme?.gradient || "linear-gradient(135deg, #FF4D88, #FF80AB)",
        }}
      >
        <button className="ss-back-btn" onClick={() => navigate(`/moods/${moodId}`)}>
          <ArrowLeft size={22} weight="bold" />
        </button>

        <div className="ss-answers-header__content">
          <h2>My Answers 📝</h2>
          <p>Your thoughts, your heart.</p>
        </div>
      </header>

      {/* Answers List */}
      <main className="ss-answers-container">
        {loading ? (
          <Loader />
        ) : answers.length === 0 ? (
          <div className="ss-answers-empty">
            <BookmarkSimple size={48} weight="duotone" className="ss-empty-icon" />
            <h3>No Answers Yet</h3>
            <p>You haven't answered any questions for this mood yet.</p>
            <button
              className="ss-action-btn"
              onClick={() => navigate(`/questions?mood=${moodId}`)}
            >
              💬 Answer Today's Question
            </button>
          </div>
        ) : (
          <div className="ss-answers-list">
            {answers.map((ans, idx) => (
              <div key={ans.id || idx} className="ss-answer-card">
                <div className="ss-answer-card__meta">
                  <span className="ss-question-num">Question #{idx + 1}</span>
                  <span className="ss-answer-date">
                    {ans.createdAt || ans.answered_for_date ? new Date(ans.createdAt || ans.answered_for_date).toLocaleDateString() : "Recently"}
                  </span>
                </div>

                <h3 className="ss-question-text">
                  {ans.question?.title || ans.Question?.title || ans.question_text || ans.questionText || "Daily Question Prompt"}
                </h3>

                <div className="ss-answer-content">
                  <p>{ans.content || ans.answer_text}</p>
                  {ans.media && ans.media.length > 0 && (
                    <div className="ss-answer-media">
                      {ans.media.map((item, mIdx) => (
                        <div key={item.id || mIdx} className="ss-media-preview">
                          {item.media_type === "image" ? (
                            <img src={item.media_url} alt="Answer attachment" />
                          ) : (
                            <a href={item.media_url} target="_blank" rel="noopener noreferrer">View Media</a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="ss-answer-card__footer">
                  <span className="ss-status-badge">
                    <Eye size={16} weight="bold" /> Shared with partner
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <SSBottomNav activeTab="home" />
    </div>
  );
};

const MyAnswersPage = () => (
  <ThemeProvider>
    <MyAnswersPageContent />
  </ThemeProvider>
);

export default MyAnswersPage;
