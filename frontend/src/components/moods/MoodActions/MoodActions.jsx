import { useNavigate } from "react-router-dom";

import {
    NotePencil,
    Image,
    ChatCircleText,
} from "@phosphor-icons/react";

import "./MoodActions.css";

const actions = [
    {
        id: "letter",
        label: "Letter",
        icon: NotePencil,
        path: "/letters/write",
    },
    {
        id: "memory",
        label: "Memory",
        icon: Image,
        path: "/memories/create",
    },
    {
        id: "say",
        label: "Say",
        icon: ChatCircleText,
        path: "/say-something",
    },
];

const MoodActions = () => {

    const navigate = useNavigate();

    return (

        <div className="ss-mood-actions">

            {actions.map((action) => {

                const Icon = action.icon;

                return (

                    <button
                        key={action.id}
                        className="ss-mood-action-btn"
                        onClick={() => navigate(action.path)}
                        title={action.label}
                    >

                        <Icon
                            size={24}
                            weight="fill"
                        />

                    </button>

                );

            })}

        </div>

    );

};

export default MoodActions;