import { useNavigate } from "react-router-dom";

import {
    Images,
    Envelope,
    ChatCircle,
    Smiley,
} from "@phosphor-icons/react";

import { Card } from "../../common/ui";

import "./QuickActions.css";

const actions = [
    {
        title: "Add Memory",
        subtitle: "Capture today's moment",
        icon: Images,
        route: "/memories/new",
    },
    {
        title: "Write Letter",
        subtitle: "Express your feelings",
        icon: Envelope,
        route: "/letters/new",
    },
    {
        title: "Daily Question",
        subtitle: "Grow together",
        icon: ChatCircle,
        route: "/questions/today",
    },
    {
        title: "Update Mood",
        subtitle: "Share your feelings",
        icon: Smiley,
        route: "/moods",
    },
];

const QuickActions = () => {

    const navigate = useNavigate();

    return (

        <section className="ss-quick-actions">

            {

                actions.map((action) => {

                    const Icon = action.icon;

                    return (

                        <Card
                            key={action.title}
                            className="ss-quick-actions__card"
                            onClick={() => navigate(action.route)}
                        >

                            <div className="ss-quick-actions__icon">

                                <Icon
                                    size={32}
                                    weight="fill"
                                />

                            </div>

                            <h4>

                                {action.title}

                            </h4>

                            <p>

                                {action.subtitle}

                            </p>

                        </Card>

                    );

                })

            }

        </section>

    );

};

export default QuickActions;