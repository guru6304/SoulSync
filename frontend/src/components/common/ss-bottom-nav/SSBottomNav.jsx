import React from "react";
import { NavLink } from "react-router-dom";
import { House, Images, TrendingUp, MessageCircle } from "lucide-react";
import { useTheme } from "../../../theme/ThemeProvider";
import "./SSBottomNav.css";

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
    title: "Timeline",
    icon: TrendingUp,
    path: "/timeline",
  },
  {
    title: "Letters",
    icon: MessageCircle,
    path: "/letters",
  },
];

const SSBottomNav = () => {
  const themeContext = useTheme();

  const navBackground = themeContext?.gradient || "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)";

  return (
    <nav className="ss-bottom-nav">
      <div
        className="ss-nav-container"
        style={{
          background: navBackground,
        }}
      >
        {menus.map((item) => {
          const Icon = item.icon;
          const destination = item.title === "Home"
            ? `/moods/${themeContext?.id || "romantic"}`
            : item.path;

          return (
            <NavLink
              key={item.title}
              to={destination}
              className={({ isActive }) =>
                `ss-nav-item ${isActive ? "ss-nav-item--active" : ""}`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      background: "rgba(255, 255, 255, 0.22)",
                      color: "#FFFFFF",
                      boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.25)",
                    }
                  : {
                      color: "rgba(255, 255, 255, 0.85)",
                    }
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default SSBottomNav;
