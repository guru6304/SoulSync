import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    ArrowRight,
} from "@phosphor-icons/react";

import { Card } from "../../common/ui";

import "./MoodCard.css";

const descriptions = {
    happy: "Share your happiness together.",
    romantic: "Express your deepest love.",
    sad: "Let your partner comfort you.",
    angry: "Resolve feelings with love.",
    funny: "Laugh together today.",
    "missing_you": "Tell your partner you miss them.",
    sleepy: "Time to relax together.",
    celebration: "Celebrate special moments.",
    "need_hug": "Sometimes a hug says everything.",
};

const gradients = {
    happy: "linear-gradient(135deg,#FFE082,#FFD54F)",
    romantic: "linear-gradient(135deg,#FF8A80,#F06292)",
    sad: "linear-gradient(135deg,#90CAF9,#64B5F6)",
    angry: "linear-gradient(135deg,#EF5350,#E53935)",
    funny: "linear-gradient(135deg,#A5D6A7,#66BB6A)",
    "missing_you": "linear-gradient(135deg,#B39DDB,#9575CD)",
    sleepy: "linear-gradient(135deg,#B3E5FC,#81D4FA)",
    celebration: "linear-gradient(135deg,#FFD180,#FFB74D)",
    "need_hug": "linear-gradient(135deg,#F8BBD0,#F48FB1)",
};

const MoodCard = ({
    mood,
}) => {


const navigate = useNavigate();

const { isAuthenticated } = useSelector(
    (state) => state.auth
);

    return (

        <Card
            className="ss-mood-card"
            onClick={() => {

    if (!isAuthenticated) {
        localStorage.setItem("pendingSelectedMood", mood.id);
        navigate("/login", {
            state: {
                selectedMood: mood.id,
            },
        });
        return;
    }

    localStorage.setItem("activeMood", mood.id);
    navigate(`/moods/${mood.id}`);
}}

        >

            <div
                className="ss-mood-card__emoji"
                style={{
                    background: gradients[mood.id],
                }}
            >

                {mood.emoji}

            </div>

            <h3>

                {mood.title}

            </h3>

            <p>

                {descriptions[mood.id]}

            </p>

            <div className="ss-mood-card__footer">

                <span>

                    Open Mood

                </span>

                <ArrowRight
                    size={20}
                    weight="bold"
                />

            </div>

        </Card>

    );

};

export default MoodCard;