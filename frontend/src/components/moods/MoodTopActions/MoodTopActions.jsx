import { useNavigate } from "react-router-dom";

import {
    ChartPie,
    Smiley,
} from "@phosphor-icons/react";

import "./MoodTopActions.css";

const MoodTopActions = () => {

    const navigate = useNavigate();

    return (

        <div className="ss-mood-top-actions">

            <button
                className="ss-mood-top-btn"
                onClick={() => navigate("/dashboard")}
            >

                <ChartPie
                    size={22}
                    weight="fill"
                />

                <span>

                    Dashboard

                </span>

            </button>

            <button
                className="ss-mood-top-btn"
                onClick={() => navigate("/moods")}
            >

                <Smiley
                    size={22}
                    weight="fill"
                />

                <span>

                    Change Mood

                </span>

            </button>

        </div>

    );

};

export default MoodTopActions;