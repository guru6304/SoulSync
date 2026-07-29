import React from "react";
import PropTypes from "prop-types";
import "./MoodPreview.css";
import { useNavigate } from "react-router-dom";
const MoodPreview = ({
    mood = "Romantic",
    emoji = "❤️",
    message = "Love is in the air.",
    onChangeMood,
}) => {
    const navigate = useNavigate();
    return (
        <div className="mood-preview">

            <div className="mood-preview__header">
                <div>
                    <h2>Current Mood</h2>
                    <span>Express your feelings</span>
                </div>
                

<button
    className="change-mood-btn"
    onClick={() => {
        if (onChangeMood) {
            onChangeMood();
        } else {
            navigate("/");
        }
    }}
>
    Change
</button>
            </div>

            <div className="mood-preview__body">

                <div className="mood-preview__emoji">
                    {emoji}
                </div>

                <div className="mood-preview__content">
                    <h3>{mood}</h3>
                    <p>{message}</p>
                </div>

            </div>

        </div>
    );
};

MoodPreview.propTypes = {
    mood: PropTypes.string,
    emoji: PropTypes.string,
    message: PropTypes.string,
    onChangeMood: PropTypes.func,
};

MoodPreview.defaultProps = {
    onChangeMood: () => {},
};

export default MoodPreview;