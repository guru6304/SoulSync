import "./Greeting.css";

const Greeting = ({ user }) => {

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 18) {
        greeting = "Good Afternoon";
    }

    return (
        <div className="ss-greeting">

            <h2>
                {greeting},{" "}
                <span>
                    {user?.fullName || "Soul"}
                </span>
                ❤️
            </h2>

            <p>
                Hope you and your partner create another beautiful memory today.
            </p>

        </div>
    );

};

export default Greeting;