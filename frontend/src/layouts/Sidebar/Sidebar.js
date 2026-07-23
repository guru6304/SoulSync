import { NavLink } from "react-router-dom";
import {
    House,
    Images,
    Envelope,
    ChatCircle,
    User,
} from "@phosphor-icons/react";

import "./Sidebar.css";

const menuItems = [
    {
        title: "Dashboard",
        icon: House,
        path: "/dashboard",
    },
    {
        title: "Memories",
        icon: Images,
        path: "/memories",
    },
    {
        title: "Letters",
        icon: Envelope,
        path: "/letters",
    },
    {
        title: "Questions",
        icon: ChatCircle,
        path: "/questions",
    },
    {
        title: "Profile",
        icon: User,
        path: "/profile",
    },
];

const Sidebar = () => {

    return (

        <aside className="ss-sidebar">

            <nav className="ss-sidebar__nav">

                {

                    menuItems.map((item) => {

                        const Icon = item.icon;

                        return (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `ss-sidebar__item ${
                                        isActive
                                            ? "ss-sidebar__item--active"
                                            : ""
                                    }`
                                }
                            >

                                <Icon size={22} />

                                <span>{item.title}</span>

                            </NavLink>

                        );

                    })

                }

            </nav>

        </aside>

    );

};

export default Sidebar;