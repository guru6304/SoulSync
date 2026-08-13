import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash,
  Heart,
  CalendarBlank,
} from "@phosphor-icons/react";

import useTimeline from "../../hooks/useTimeline";
import TimelineModal from "../../components/timeline/TimelineModal";
import TimelineProfileSection from "../../components/timeline/TimelineProfileSection";
import SSBottomNav from "../../components/common/ss-bottom-nav/SSBottomNav";
import ThemeProvider, { useTheme } from "../../theme/ThemeProvider";
import { useToast } from "../../context/ToastContext";
import "./TimelinePage.css";

const TimelinePageContent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { showSuccess, showError } = useToast();

  const coupleId = user?.active_couple?.id || user?.active_couple || null;

  const {
    events,
    loading,
    error,
    fetchEvents,
    addEvent,
    editEvent,
    removeEvent,
  } = useTimeline();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedPromptType, setSelectedPromptType] = useState("custom");

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (coupleId) {
      fetchEvents();
    }
  }, [coupleId, fetchEvents]);

  const handleOpenAddModal = (type = "custom") => {
    setEditingEvent(null);
    setSelectedPromptType(type);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event) => {
    setEditingEvent(event);
    setSelectedPromptType(event.event_type || "custom");
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (editingEvent) {
        await editEvent(editingEvent.id, formData);
        showSuccess("Timeline event updated successfully ✨");
      } else {
        await addEvent(formData);
        showSuccess("Timeline event added successfully ❤️");
      }
    } catch (err) {
      showError(err, "Unable to save timeline event.");
      throw err;
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    try {
      await removeEvent(deletingId);
      showSuccess("Timeline event deleted.");
    } catch (err) {
      showError(err, "Unable to delete timeline event.");
    } finally {
      setDeletingId(null);
    }
  };

  const existingTypes = events.map((e) => e.event_type);

  /* STATE A: NO PARTNER CONNECTED */
  if (!coupleId) {
    return (
      <div className="ss-timeline-page-wrapper">
        <header
          className="ss-timeline-header-banner"
          style={{
            background: theme?.gradient || "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)",
          }}
        >
          <button className="ss-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={22} weight="bold" />
          </button>

          <div className="ss-timeline-banner__inner">
            <h1>Relationship Timeline 🗓️</h1>
            <p>Our journey together, step by step.</p>
          </div>
        </header>

        <main className="ss-timeline-container">
          <div className="ss-timeline-disconnected-card">
            <div className="ss-timeline-heart-icon">💗</div>
            <h3>Connect With Your Partner</h3>
            <p>
              Send an invitation to your partner to start recording your romantic milestones and building your love story timeline together.
            </p>
            <button
              type="button"
              className="ss-timeline-invite-btn"
              onClick={() => navigate("/couple-invitation")}
            >
              <Heart size={20} weight="fill" />
              <span>Invite Partner ❤️</span>
            </button>
          </div>
        </main>

        <SSBottomNav activeTab="timeline" />
      </div>
    );
  }

  /* STATE B: CONNECTED PARTNER */
  return (
    <div className="ss-timeline-page-wrapper">
      <header
        className="ss-timeline-header-banner"
        style={{
          background: theme?.gradient || "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)",
        }}
      >
        <button className="ss-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} weight="bold" />
        </button>

        <div className="ss-timeline-banner__inner">
          <h1>Relationship Timeline 🗓️</h1>
          <p>Our romantic journey together, step by step.</p>
        </div>

        <button
          className="ss-add-timeline-btn"
          onClick={() => handleOpenAddModal("custom")}
        >
          <Plus size={18} weight="bold" /> Add Event
        </button>
      </header>

      <main className="ss-timeline-container">
        {/* Milestone Quick Action Profile Section */}
        <TimelineProfileSection
          onSelectPrompt={(type) => handleOpenAddModal(type)}
          existingTypes={existingTypes}
        />

        {/* Timeline View */}
        {loading ? (
          <div className="ss-timeline-loading">
            <p>Loading your story timeline...</p>
          </div>
        ) : error ? (
          <div className="ss-timeline-error">
            <p>{typeof error === "string" ? error : "Unable to load timeline."}</p>
            <button className="ss-retry-btn" onClick={fetchEvents}>
              🔄 Retry
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="ss-timeline-empty-card">
            <div className="ss-empty-icon">📖</div>
            <h3>Our story hasn't started here yet</h3>
            <p>Add your first relationship milestone to begin your shared love story timeline!</p>
            <button
              className="ss-add-timeline-btn ss-add-timeline-btn--center"
              onClick={() => handleOpenAddModal("first_met")}
            >
              ❤️ Add Our First Milestone
            </button>
          </div>
        ) : (
          <div className="ss-chronological-timeline">
            <div className="ss-timeline-line"></div>

            {events.map((item, index) => {
              const formattedDate = item.event_date
                ? new Date(item.event_date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Special Date";

              return (
                <div key={item.id || index} className="ss-timeline-item">
                  <div className="ss-timeline-badge">{item.emoji || "❤️"}</div>

                  <div className="ss-timeline-card">
                    <div className="ss-timeline-card-header">
                      <span className="ss-timeline-date">
                        <CalendarBlank size={15} />
                        {formattedDate}
                      </span>

                      <div className="ss-timeline-card-actions">
                        <button
                          className="ss-action-icon-btn"
                          title="Edit event"
                          onClick={() => handleOpenEditModal(item)}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="ss-action-icon-btn ss-action-icon-btn--danger"
                          title="Delete event"
                          onClick={() => setDeletingId(item.id)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>

                    <h3 className="ss-timeline-title">{item.title}</h3>

                    {item.description && (
                      <p className="ss-timeline-description">{item.description}</p>
                    )}

                    {item.creator && (
                      <div className="ss-timeline-author">
                        <span>Added by {item.creator.first_name || "Partner"}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Add / Edit Event Modal */}
      <TimelineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialValues={editingEvent}
        defaultType={selectedPromptType}
      />

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="ss-timeline-modal-overlay" onClick={() => setDeletingId(null)}>
          <div className="ss-timeline-confirm-card" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Milestone? 🗑️</h3>
            <p>Are you sure you want to delete this timeline event? This action cannot be undone.</p>
            <div className="ss-confirm-actions">
              <button
                className="ss-confirm-cancel-btn"
                onClick={() => setDeletingId(null)}
              >
                Cancel
              </button>
              <button
                className="ss-confirm-delete-btn"
                onClick={handleDeleteConfirm}
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}

      <SSBottomNav activeTab="timeline" />
    </div>
  );
};

const TimelinePage = () => (
  <ThemeProvider>
    <TimelinePageContent />
  </ThemeProvider>
);

export default TimelinePage;
