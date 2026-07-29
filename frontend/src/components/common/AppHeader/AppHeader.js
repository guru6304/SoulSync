import { useNavigate } from "react-router-dom";

import {
    House,
    Bell,
    UserCircle,
    Smiley
} from "@phosphor-icons/react";

import "./AppHeader.css";

const AppHeader = () => {

    const navigate = useNavigate();

    return (

        <header className="ss-app-header">

            <div
                className="ss-logo"
                onClick={() => navigate("/dashboard")}
            >
                Soul Sync ❤️
            </div>

            <div className="ss-header-actions">

                <button
                    onClick={() => navigate("/moods")}
                    title="Change Mood"
                >
                    <Smiley size={22} weight="fill" />
                </button>

                <button
                    onClick={() => navigate("/notifications")}
                    title="Notifications"
                >
                    <Bell size={22} weight="fill" />
                </button>

                <button
                    onClick={() => navigate("/profile")}
                    title="Profile"
                >
                    <UserCircle size={22} weight="fill" />
                </button>

                <button
                    onClick={() => navigate("/dashboard")}
                    title="Dashboard"
                >
                    <House size={22} weight="fill" />
                </button>

            </div>

        </header>

    );

};

export default AppHeader;