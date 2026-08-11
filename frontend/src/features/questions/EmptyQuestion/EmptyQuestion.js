import { useNavigate } from "react-router-dom";
import "./EmptyQuestion.css";

const EmptyQuestion = ({ onRefresh, error, mood = "romantic" }) => {
    const navigate = useNavigate();

    return (
        <div className="empty-question">
            <div className="empty-question__emoji">
                {error ? "💗" : "✨"}
            </div>

            <h2 className="empty-question__title">
                {error ? "Unable to load today's Soul Card." : "No Soul Card Yet"}
            </h2>

            <p className="empty-question__description">
                {error
                    ? typeof error === "string" ? error : "Something interrupted the connection. Please try again."
                    : "There's no question waiting for you right now."}
            </p>

            <div className="empty-question__actions" style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                <button
                    type="button"
                    className="empty-question__button"
                    onClick={onRefresh}
                >
                    Try Again 🔄
                </button>

                <button
                    type="button"
                    className="empty-question__button empty-question__button--secondary"
                    onClick={() => navigate(`/moods/${mood}`)}
                    style={{ background: "rgba(255,255,255,0.2)", color: "inherit", border: "1px solid currentColor" }}
                >
                    Back to Mood
                </button>
            </div>
        </div>
    );
};

export default EmptyQuestion;
