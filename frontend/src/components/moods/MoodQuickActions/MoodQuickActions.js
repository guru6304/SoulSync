import { useNavigate } from "react-router-dom";

import "./MoodQuickActions.css";

const actions = [
  {
    title: "📸 Memories",
    path: "/memories",
  },
  {
    title: "💌 Letters",
    path: "/letters",
  },
  {
    title: "💬 Say Something",
    path: "/say-something",
  },
  {
    title: "❓ Questions",
    path: "/questions",
  },
  {
    title: "😊 Mood History",
    path: "/moods/history",
  },
  {
    title: "⚙ Dashboard",
    path: "/dashboard",
  },
];

const MoodQuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="quick-actions">

      {actions.map((action) => (
        <button
          key={action.title}
          className="quick-action-btn"
          onClick={() => navigate(action.path)}
        >
          {action.title}
        </button>
      ))}

    </div>
  );
};

export default MoodQuickActions;