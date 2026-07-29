import { useMemo } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    Heart,
    Image,
    MusicNotes,
    ChatCircleText,
    Gift,
    PencilSimple,
} from "@phosphor-icons/react";

import { Card, Button } from "../../components/common/ui";

import { MOODS } from "../../constants/moods";

import "./MoodDetailsPage.css";

const moodConfig = {
    happy: {
        title: "Keep Smiling 😊",
        subtitle:
            "Your happiness makes every moment brighter.",
    },
    romantic: {
        title: "Love is in the Air ❤️",
        subtitle:
            "Express everything your heart wants to say.",
    },
    sad: {
        title: "You're Not Alone 🤍",
        subtitle:
            "Your partner is always here for you.",
    },
    angry: {
        title: "Take a Deep Breath ❤️",
        subtitle:
            "Every misunderstanding can be solved with love.",
    },
    funny: {
        title: "Let's Laugh 😂",
        subtitle:
            "A smile shared together lasts forever.",
    },
    "missing-me": {
        title: "Distance Can't Separate Hearts 🥺",
        subtitle:
            "Tell your partner how much you miss them.",
    },
    sleepy: {
        title: "Sweet Dreams 😴",
        subtitle:
            "Relax and end the day with love.",
    },
    celebration: {
        title: "Celebrate Together 🎉",
        subtitle:
            "Every achievement deserves a celebration.",
    },
    "need-a-hug": {
        title: "Sending a Big Hug 🤗",
        subtitle:
            "Sometimes a hug heals everything.",
    },
};

const actions = [
    {
        icon: Heart,
        title: "Write a Letter",
        description: "Express your feelings.",
        path: "/letters/new",
    },
    {
        icon: Image,
        title: "Add Memory",
        description: "Save this beautiful moment.",
        path: "/memories/new",
    },
    {
        icon: MusicNotes,
        title: "Music",
        description: "Listen together.",
        path: "/music",
    },
    {
        icon: ChatCircleText,
        title: "Today's Question",
        description: "Start a lovely conversation.",
        path: "/questions",
    },
    {
        icon: Gift,
        title: "Surprise",
        description: "Do something special.",
        path: "/surprise",
    },
    {
        icon: PencilSimple,
        title: "Say Something",
        description: "Share your thoughts.",
        path: "/say-something",
    },
];

const MoodDetailsPage = () => {

    const navigate = useNavigate();

    const { moodId } = useParams();

    const mood = useMemo(
        () => MOODS.find((item) => item.id === moodId),
        [moodId]
    );

    const config = moodConfig[moodId];

    if (!mood) {

        return <h2>Mood not found.</h2>;

    }

    return (

        <section className="ss-mood-details">

            <Button
                variant="ghost"
                onClick={() => navigate(-1)}
            >

                <ArrowLeft size={18} />

                Back

            </Button>

            <div className="ss-mood-banner">

                <div className="ss-mood-banner__emoji">

                    {mood.emoji}

                </div>

                <h1>

                    {config.title}

                </h1>

                <p>

                    {config.subtitle}

                </p>

            </div>

            <div className="ss-mood-actions">

                {

                    actions.map((action) => {

                        const Icon = action.icon;

                        return (

                            <Card
                                key={action.title}
                                className="ss-mood-action"
                                onClick={() =>
                                    navigate(action.path)
                                }
                            >

                                <Icon
                                    size={32}
                                    weight="fill"
                                />

                                <h3>

                                    {action.title}

                                </h3>

                                <p>

                                    {action.description}

                                </p>

                            </Card>

                        );

                    })

                }

            </div>

        </section>

    );

};

export default MoodDetailsPage;