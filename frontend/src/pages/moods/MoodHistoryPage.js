import { useEffect } from "react";

import {
    ArrowLeft,
} from "@phosphor-icons/react";

import { useNavigate } from "react-router-dom";

import useMoods from "../../hooks/useMoods";

import { Button } from "../../components/common/ui";

import { MOODS } from "../../constants/moods";

import "./MoodHistoryPage.css";

const MoodHistoryPage = () => {

    const navigate = useNavigate();

    const {

        history,

        loading,

        getMoodHistory,

    } = useMoods();

    useEffect(() => {

        getMoodHistory();

    }, []);

    const getMood = (type) => {

        return MOODS.find(

            (mood) => mood.id === type

        );

    };

    return (

        <section className="ss-mood-history">

            <Button
                variant="ghost"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft size={18} />
                Back
            </Button>

            <h1>

                Mood History

            </h1>

            {loading && (

                <p>Loading...</p>

            )}

            {!loading && history.length === 0 && (

                <p>

                    No moods recorded yet.

                </p>

            )}

            {history.map((item) => {

                const mood = getMood(

                    item.mood_type

                );

                return (

                    <div
                        key={item.id}
                        className="ss-history-card"
                    >

                        <div>

                            <span>

                                {mood?.emoji}

                            </span>

                            <strong>

                                {mood?.title}

                            </strong>

                        </div>

                        <small>

                            {item.mood_date}

                        </small>

                        {item.note && (

                            <p>

                                {item.note}

                            </p>

                        )}

                    </div>

                );

            })}

        </section>

    );

};

export default MoodHistoryPage;