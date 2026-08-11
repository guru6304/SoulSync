import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  User,
  Envelope,
  Heart,
  PaperPlaneTilt,
  CheckCircle,
  XCircle,
  Sparkle,
  ArrowLeft,
  UsersThree,
} from "@phosphor-icons/react";

import SSBottomNav from "../../components/common/ss-bottom-nav/SSBottomNav";
import useCoupleInvitation from "../../hooks/useCoupleInvitation";
import "./ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const activeCouple = user?.active_couple;
  const partner = activeCouple?.members?.find((m) => m.id !== user?.id);

  const {
    pendingInvitations,
    loading: inviteLoading,
    getPendingInvitations,
    invitePartner,
    acceptInvite,
    rejectInvite,
  } = useCoupleInvitation();

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    getPendingInvitations();
  }, [getPendingInvitations]);

  const handleSendInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    try {
      setStatusMsg({ type: "info", text: "Sending invitation..." });
      await invitePartner({
        receiver_email: inviteEmail.trim(),
        message: inviteMessage.trim() || undefined,
      });
      setStatusMsg({ type: "success", text: "Invitation sent successfully! 💌" });
      setInviteEmail("");
      setInviteMessage("");
      getPendingInvitations();
    } catch (err) {
      setStatusMsg({
        type: "error",
        text: err?.response?.data?.message || "Failed to send invitation.",
      });
    }
  };

  const handleAccept = async (id) => {
    try {
      await acceptInvite(id);
      setStatusMsg({ type: "success", text: "Invitation accepted! You're now connected ❤️" });
      window.location.reload();
    } catch (err) {
      setStatusMsg({ type: "error", text: err?.response?.data?.message || "Failed to accept." });
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectInvite(id);
      setStatusMsg({ type: "info", text: "Invitation declined." });
    } catch (err) {
      setStatusMsg({ type: "error", text: err?.response?.data?.message || "Failed to decline." });
    }
  };

  return (
    <div className="ss-profile-page">
      {/* Header */}
      <header className="ss-profile-header">
        <button className="ss-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} weight="bold" />
        </button>

        <div className="ss-profile-header__title">
          <h2>My Profile 👤</h2>
          <p>Manage your account & relationship connection</p>
        </div>
      </header>

      <main className="ss-profile-container">
        {statusMsg && (
          <div className={`ss-status-alert ss-status-alert--${statusMsg.type}`}>
            {statusMsg.text}
          </div>
        )}

        <div className="ss-profile-grid">
          {/* User Details Card */}
          <section className="ss-profile-card">
            <div className="ss-card-header">
              <User size={24} weight="bold" className="ss-icon--accent" />
              <h3>Personal Info</h3>
            </div>

            <div className="ss-user-avatar-wrapper">
              <div className="ss-avatar">
                {user?.first_name ? user.first_name[0].toUpperCase() : "U"}
              </div>
              <div className="ss-user-name">
                <h4>{user?.first_name} {user?.last_name}</h4>
                <p>@{user?.username || "soulsync_user"}</p>
              </div>
            </div>

            <div className="ss-info-list">
              <div className="ss-info-item">
                <Envelope size={18} />
                <span>{user?.email}</span>
              </div>
              <div className="ss-info-item">
                <Sparkle size={18} />
                <span>Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : "2026"}</span>
              </div>
            </div>
          </section>

          {/* Partner & Connection Card */}
          <section className="ss-profile-card">
            <div className="ss-card-header">
              <Heart size={24} weight="fill" className="ss-icon--pink" />
              <h3>Your Partner</h3>
            </div>

            {partner ? (
              <div className="ss-partner-connected">
                <div className="ss-partner-badge">❤️ Connected</div>
                <div className="ss-user-avatar-wrapper">
                  <div className="ss-avatar ss-avatar--partner">
                    {partner.first_name ? partner.first_name[0].toUpperCase() : "P"}
                  </div>
                  <div className="ss-user-name">
                    <h4>{partner.first_name} {partner.last_name}</h4>
                    <p>{partner.email}</p>
                  </div>
                </div>
                <p className="ss-partner-subtext">
                  Your Soul Sync is connected. Share daily cards, love letters, and memories together.
                </p>
              </div>
            ) : (
              <div className="ss-partner-waiting">
                <UsersThree size={40} weight="duotone" className="ss-icon--muted" />
                <h4>Your Soul Sync is waiting for someone special</h4>
                <p>Invite your partner to connect your accounts and share private memories.</p>
              </div>
            )}
          </section>
        </div>

        {/* Invite Partner Form Section */}
        {!partner && (
          <section className="ss-profile-card ss-invite-section">
            <div className="ss-card-header">
              <PaperPlaneTilt size={24} weight="bold" className="ss-icon--accent" />
              <h3>💌 Invite My Partner</h3>
            </div>

            <form onSubmit={handleSendInvite} className="ss-invite-form">
              <div className="ss-form-group">
                <label>Partner Email Address</label>
                <input
                  type="email"
                  placeholder="partner@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
              </div>

              <div className="ss-form-group">
                <label>Personal Message (Optional)</label>
                <textarea
                  rows="3"
                  placeholder="❤️ Join me on Soul Sync so we can share our memories..."
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="ss-invite-submit-btn" disabled={inviteLoading}>
                <PaperPlaneTilt size={18} weight="bold" />
                <span>Send Invitation</span>
              </button>
            </form>
          </section>
        )}

        {/* Pending Invitations Section */}
        {pendingInvitations && pendingInvitations.length > 0 && (
          <section className="ss-profile-card ss-pending-invites">
            <div className="ss-card-header">
              <Envelope size={24} weight="bold" className="ss-icon--accent" />
              <h3>Pending Invitations</h3>
            </div>

            <div className="ss-invites-list">
              {pendingInvitations.map((item) => (
                <div key={item.id} className="ss-invite-item">
                  <div className="ss-invite-info">
                    <p className="ss-sender-email">From: {item.sender?.email || "Partner"}</p>
                    {item.message && <p className="ss-invite-msg">"{item.message}"</p>}
                  </div>

                  <div className="ss-invite-actions">
                    <button className="ss-btn-accept" onClick={() => handleAccept(item.id)}>
                      <CheckCircle size={18} weight="bold" /> Accept
                    </button>
                    <button className="ss-btn-decline" onClick={() => handleReject(item.id)}>
                      <XCircle size={18} weight="bold" /> Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <SSBottomNav activeTab="profile" />
    </div>
  );
};

export default ProfilePage;