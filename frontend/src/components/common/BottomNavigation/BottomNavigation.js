import { NavLink } from "react-router-dom";
import {
    House,
    Images,
    Envelope,
    ChatCircle,
    User,
} from "@phosphor-icons/react";

import "./BottomNavigation.css";

const navigationItems = [
    {
        label: "Home",
        path: "/dashboard",
        icon: House,
    },
    {
        label: "Memories",
        path: "/memories",
        icon: Images,
    },
    {
        label: "Letters",
        path: "/letters",
        icon: Envelope,
    },
    {
        label: "Questions",
        path: "/questions",
        icon: ChatCircle,
    },
    {
        label: "Profile",
        path: "/profile",
        icon: User,
    },
];

const BottomNavigation = () => {

    return (

        <nav className="ss-bottom-nav">

            {

                navigationItems.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `ss-bottom-nav__item ${
                                    isActive
                                        ? "ss-bottom-nav__item--active"
                                        : ""
                                }`
                            }
                        >

                            <Icon size={22} weight="fill" />

                            <span>

                                {item.label}

                            </span>

                        </NavLink>

                    );

                })

            }

        </nav>

    );

};

export default BottomNavigation;