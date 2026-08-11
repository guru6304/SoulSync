import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PaperPlaneRight, Heart } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import MessageCard from "../../components/saySomething/MessageCard";
import useSaySomething from "../../hooks/useSaySomething";
import ThemeProvider from "../../theme/ThemeProvider";
import "./SaySomethingPage.css";

const SaySomethingContent = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const coupleId = user?.active_couple?.id || user?.active_couple || null;

  const { timeline, loading, error, getTimeline, sendMessage } = useSaySomething();

  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (coupleId) {
      getTimeline(coupleId);
    }
  }, [coupleId, getTimeline]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || submitting) return;

    setSubmitting(true);
    try {
      await sendMessage({
        couple_id: coupleId,
        message,
      });
      setMessage("");
      getTimeline(coupleId);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  /* STATE A: PARTNER NOT CONNECTED */
  if (!coupleId) {
    return (
      <div className="ss-say-page-wrapper">
        <div className="ss-say-disconnected-card">
          <div className="ss-say-heart-icon">💗</div>
          <h1>Connect With Your Partner</h1>
          <p>
            You haven't connected with your partner yet. Send an invitation to start sharing messages,
            memories, and moments together.
          </p>

          <button
            type="button"
            className="ss-say-invite-btn"
            onClick={() => navigate("/couple-invitation")}
          >
            <Heart size={20} weight="fill" />
            <span>Invite Partner ❤️</span>
          </button>
        </div>
      </div>
    );
  }

  /* STATE B: PARTNER CONNECTED */
  return (
    <div className="ss-say-page-wrapper">
      <div className="ss-say-page-container">
        {/* Top Header */}
        <div className="ss-say-top-nav">
          <button
            type="button"
            className="ss-say-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} weight="bold" />
            <span>Back</span>
          </button>

          <div className="ss-say-connected-pill">
            <Heart size={16} weight="fill" className="ss-pill-heart" />
            <span>Connected with Partner</span>
          </div>
        </div>

        {/* Composer Card */}
        <div className="ss-say-composer-card">
          <div className="ss-say-composer-header">
            <h1>💬 Say Something</h1>
            <p>Share what's on your mind and write a heartfelt note to your love.</p>
          </div>

          <form onSubmit={handleSubmit} className="ss-say-composer-form">
            <textarea
              rows={6}
              value={message}
              maxLength={1000}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write something from your heart..."
              className="ss-say-glass-textarea"
            />

            <div className="ss-say-composer-footer">
              <span className="ss-say-counter">{message.length} / 1000</span>

              <button
                type="submit"
                className="ss-say-submit-btn"
                disabled={submitting || !message.trim()}
              >
                {submitting ? (
                  "Sharing..."
                ) : (
                  <>
                    <PaperPlaneRight size={18} weight="fill" />
                    <span>Share With My Love 💌</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Timeline Messages List */}
        <div className="ss-say-timeline-section">
          <h2 className="ss-say-timeline-title">Recent Thoughts & Moments</h2>

          {loading && <p className="ss-say-status-text">Loading shared messages...</p>}
          {error && <p className="ss-say-status-error">{error}</p>}

          {!loading && timeline?.length === 0 && (
            <div className="ss-say-empty-timeline">
              <p>No messages shared yet. Write your very first thought above! ✨</p>
            </div>
          )}

          {!loading &&
            timeline?.map((item) => (
              <MessageCard key={item.id} message={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

const SaySomethingPage = () => (
  <ThemeProvider>
    <SaySomethingContent />
  </ThemeProvider>
);

export default SaySomethingPage;