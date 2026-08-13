import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import useCoupleInvitation from "../../hooks/useCoupleInvitation";
import authService from "../../services/auth.service";
import { setUser } from "../../store/slices/authSlice";
import { useToast } from "../../context/ToastContext";

const CoupleInvitationPage = () => {
  const {
    pendingInvitations,
    loading,
    getPendingInvitations,
    invitePartner,
    acceptInvite,
    rejectInvite,
  } = useCoupleInvitation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptingId, setAcceptingId] = useState(null);

  // Ref-based lock prevents double-accept even on rapid double-click
  // (React state updates are async — the ref is synchronous)
  const acceptingRef = useRef(false);

  useEffect(() => {
    getPendingInvitations();
  }, [getPendingInvitations]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await invitePartner({
        receiver_email: formData.email,
        message: formData.message,
      });

      setFormData({ email: "", message: "" });
      showSuccess("Invitation sent successfully ❤️");
    } catch (error) {
      showError(error, "Unable to send invitation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAccept = async (invitationId) => {
    // Synchronous ref guard — blocks any second call even before React re-renders
    if (acceptingRef.current) return;
    acceptingRef.current = true;
    setAcceptingId(invitationId);

    try {
      await acceptInvite(invitationId);

      // Refresh user profile to get updated active_couple
      const updatedUser = await authService.getProfile();
      dispatch(setUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));

      showSuccess("Couple invitation accepted! ❤️ Your journey begins now.");
      navigate("/dashboard");
    } catch (error) {
      const msg = error?.response?.data?.message || "";

      // If first request succeeded but a race condition produced a duplicate,
      // treat "already accepted" as success and redirect instead of showing an error.
      if (
        msg.toLowerCase().includes("already accepted") ||
        msg.toLowerCase().includes("already belong")
      ) {
        showSuccess("You are already connected with your partner ❤️");
        navigate("/dashboard");
        return;
      }

      showError(error, "Unable to accept invitation. Please try again.");
    } finally {
      acceptingRef.current = false;
      setAcceptingId(null);
    }
  };

  const handleReject = async (invitationId) => {
    try {
      await rejectInvite(invitationId);
      showSuccess("Invitation rejected.");
    } catch (error) {
      showError(error, "Unable to reject invitation. Please try again.");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Couple Invitation ❤️</h2>

      <form onSubmit={handleInvite}>
        <div className="mb-3">
          <label className="form-label">Partner Email</label>

          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            placeholder="partner@email.com"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Message (Optional)</label>

          <textarea
            className="form-control"
            rows="4"
            maxLength="500"
            value={formData.message}
            onChange={(e) =>
              setFormData({
                ...formData,
                message: e.target.value,
              })
            }
            placeholder="❤️ Join me on Soul Sync"
          />
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Invitation"}
        </button>
      </form>

      <hr />

      <h4>Pending Invitations</h4>

      {loading ? (
        <p>Loading...</p>
      ) : pendingInvitations.length === 0 ? (
        <p>No Pending Invitations</p>
      ) : (
        pendingInvitations.map((item) => (
          <div key={item.id} className="card mb-3">
            <div className="card-body">
              <h6>{item.sender?.email || item.sender_id}</h6>

              <div>
                <button
                  className="btn btn-success me-2"
                  disabled={acceptingId === item.id}
                  onClick={() => handleAccept(item.id)}
                  id={`accept-invitation-${item.id}`}
                >
                  {acceptingId === item.id ? "Accepting..." : "Accept"}
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleReject(item.id)}
                  id={`reject-invitation-${item.id}`}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CoupleInvitationPage;
