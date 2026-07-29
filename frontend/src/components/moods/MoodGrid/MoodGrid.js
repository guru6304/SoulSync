import MoodCard from "../MoodCard/MoodCard";

import "./MoodGrid.css";

const menuItems = [
  {
    title: "Memories",
    icon: "📸",
    path: "/memories",
  },
  {
    title: "Letters",
    icon: "💌",
    path: "/letters",
  },
  {
    title: "Say Something",
    icon: "💬",
    path: "/say-something",
  },
  {
    title: "Questions",
    icon: "❓",
    path: "/questions",
  },
  {
    title: "Music",
    icon: "🎵",
    path: "/music",
  },
];

const MoodGrid = () => {
  return (
    <div className="mood-grid">
      {menuItems.map((item) => (
        <MoodCard
          key={item.title}
          title={item.title}
          icon={item.icon}
          path={item.path}
        />
      ))}
    </div>
  );
};

export default MoodGrid;