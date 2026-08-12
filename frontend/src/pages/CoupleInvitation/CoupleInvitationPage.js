import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import useCoupleInvitation from "../../hooks/useCoupleInvitation";
import authService from "../../services/auth.service";
import { setUser } from "../../store/slices/authSlice";

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

  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptingId, setAcceptingId] = useState(null);

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

      setFormData({
        email: "",
        message: "",
      });

      alert("Invitation sent successfully ❤️");
    } catch (error) {
      alert(error?.response?.data?.message || "Unable to send invitation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAccept = async (invitationId) => {
    if (acceptingId) return;
    setAcceptingId(invitationId);
    try {
      await acceptInvite(invitationId);
      const updatedUser = await authService.getProfile();
      dispatch(setUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Couple invitation accepted successfully! ❤️");
      navigate("/dashboard");
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to accept invitation.");
    } finally {
      setAcceptingId(null);
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

        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
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
                >
                  {acceptingId === item.id ? "Accepting..." : "Accept"}
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => rejectInvite(item.id)}
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
