import { useEffect, useState } from "react";

import useCoupleInvitation from "../../hooks/useCoupleInvitation";

const CoupleInvitationPage = () => {
  const {
    pendingInvitations,

    loading,

    getPendingInvitations,

    invitePartner,

    acceptInvite,

    rejectInvite,
  } = useCoupleInvitation();

  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  useEffect(() => {
    getPendingInvitations();
  }, []);

  const handleInvite = async (e) => {
    e.preventDefault();

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

        <button className="btn btn-primary" type="submit">
          Send Invitation
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
              <h6>{item.sender?.email}</h6>

              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={() => acceptInvite(item.id)}
                >
                  Accept
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
