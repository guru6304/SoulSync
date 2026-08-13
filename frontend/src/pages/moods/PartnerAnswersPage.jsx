import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Lock, UsersThree } from "@phosphor-icons/react";

import ThemeProvider, { useTheme } from "../../theme/ThemeProvider";
import SSBottomNav from "../../components/common/ss-bottom-nav/SSBottomNav";
import answerService from "../../services/answer.service";
import Loader from "../../components/common/ui/Loader";

import "./AnswersPages.css";

const PartnerAnswersPageContent = () => {
  const navigate = useNavigate();
  const { moodId = "romantic" } = useParams();
  const theme = useTheme();

  const [partnerAnswers, setPartnerAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartnerAnswers = async () => {
      try {
        setLoading(true);
        const res = await answerService.getPartnerAnswers(moodId);
        const fetchedData = res?.data?.data || res?.data || res || [];
        setPartnerAnswers(Array.isArray(fetchedData) ? fetchedData : []);
      } catch (err) {
        console.error("Error fetching partner answers:", err);
        setPartnerAnswers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerAnswers();
  }, [moodId]);

  return (
    <div className="ss-answers-page">
      {/* Header */}
      <header
        className="ss-answers-header"
        style={{
          background: theme?.gradient || "linear-gradient(135deg, #9C27B0, #BA68C8)",
        }}
      >
        <button className="ss-back-btn" onClick={() => navigate(`/moods/${moodId}`)}>
          <ArrowLeft size={22} weight="bold" />
        </button>

        <div className="ss-answers-header__content">
          <h2>Partner's Answers 💜</h2>
          <p>Discover your partner's heart.</p>
        </div>
      </header>

      {/* Answers List */}
      <main className="ss-answers-container">
        {loading ? (
          <Loader />
        ) : partnerAnswers.length === 0 ? (
          <div className="ss-answers-empty">
            <UsersThree size={48} weight="duotone" className="ss-empty-icon" />
            <h3>Nothing from your partner yet</h3>
            <p>When they share something from their heart, it will appear here.</p>
            <button
              className="ss-action-btn"
              onClick={() => navigate(`/questions?mood=${moodId}`)}
            >
              💬 Answer Today's Question
            </button>
          </div>
        ) : (
          <div className="ss-answers-list">
            {partnerAnswers.map((ans, idx) => {
              const partnerName = ans.user?.first_name ? `${ans.user.first_name}` : "Partner";
              const isLocked = ans.isLocked;
              return (
                <div
                  key={ans.id || idx}
                  className={`ss-answer-card ${isLocked ? "ss-answer-card--locked" : ""}`}
                >
                  <div className="ss-answer-card__meta">
                    <span className="ss-question-num">{partnerName}'s Response #{idx + 1}</span>
                    {isLocked ? (
                      <span className="ss-lock-badge">
                        <Lock size={16} weight="bold" /> Locked
                      </span>
                    ) : (
                      <span className="ss-answer-date">
                        {ans.createdAt || ans.answered_for_date ? new Date(ans.createdAt || ans.answered_for_date).toLocaleDateString() : "Recently"}
                      </span>
                    )}
                  </div>

                  <h3 className="ss-question-text">
                    {ans.question?.title || ans.Question?.title || ans.question_text || ans.questionText || "Daily Question Prompt"}
                  </h3>

                  <div className="ss-answer-content">
                    {isLocked ? (
                      <p className="ss-locked-text">
                        🔒 Answer your question to unlock your partner's response.
                      </p>
                    ) : (
                      <>
                        <p>{ans.content || ans.answer_text}</p>
                        {ans.media && ans.media.length > 0 && (
                          <div className="ss-answer-media">
                            {ans.media.map((item, mIdx) => (
                              <div key={item.id || mIdx} className="ss-media-preview">
                                {item.media_type === "image" ? (
                                  <img src={item.file_url} alt="Partner attachment" />
                                ) : (
                                  <a href={item.file_url} target="_blank" rel="noopener noreferrer">View Media</a>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <SSBottomNav activeTab="home" />
    </div>
  );
};

const PartnerAnswersPage = () => (
  <ThemeProvider>
    <PartnerAnswersPageContent />
  </ThemeProvider>
);

export default PartnerAnswersPage;
