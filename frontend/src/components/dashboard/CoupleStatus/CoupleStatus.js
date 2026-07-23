import "./CoupleStatus.css";

const CoupleStatus = ({
    partner,
    hasCouple,
    pendingInvitation,
}) => {

    if (pendingInvitation) {

        return (

            <div className="ss-couple-status pending">

                <h4>Invitation Pending</h4>

                <p>
                    Waiting for your partner to accept your invitation.
                </p>

            </div>

        );

    }

    if (!hasCouple) {

        return (

            <div className="ss-couple-status">

                <h4>No Partner Connected</h4>

                <p>
                    Invite your partner to start your Soul Sync journey ❤️
                </p>

            </div>

        );

    }

    return (

        <div className="ss-couple-status">

            <h4>

                Connected with

                {" "}

                <strong>

                    {partner?.fullName || "Your Partner"}

                </strong>

                ❤️

            </h4>

        </div>

    );

};

export default CoupleStatus;