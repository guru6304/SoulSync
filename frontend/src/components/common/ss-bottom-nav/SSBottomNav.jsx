import "./SSBottomNav.css";

import {

    House,

    Images,

    Heart,

    MessageCircle,

    CalendarDays,

} from "lucide-react";

import { NavLink } from "react-router-dom";

import useTheme from "../../../hooks/useTheme";

const menus = [

    {

        title: "Home",

        icon: House,

        path: "/",

    },

    {

        title: "Memories",

        icon: Images,

        path: "/memories",

    },

    {

        title: "Love",

        icon: Heart,

        path: "/questions",

    },

    {

        title: "Letters",

        icon: MessageCircle,

        path: "/letters",

    },

    {

        title: "Calendar",

        icon: CalendarDays,

        path: "/calendar",

    },

];

const SSBottomNav = () => {

    const { theme } = useTheme();

    return (

        <nav

            className="ss-bottom-nav"

            style={{

                background: theme.gradients.navbar,

                borderColor: theme.colors.border,

            }}

        >

            {

                menus.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink

                            key={item.title}

                            to={item.path}

                            className="ss-nav-item"

                        >

                            <Icon size={22} />

                            <span>{item.title}</span>

                        </NavLink>

                    );

                })

            }

        </nav>

    );

};

export default SSBottomNav;