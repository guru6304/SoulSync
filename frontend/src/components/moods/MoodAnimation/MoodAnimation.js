import { useTheme } from "../../../theme/ThemeProvider";

import "./MoodAnimation.css";

const animationMap = {
  romantic: "❤️",
  happy: "😊",
  sad: "💧",
  angry: "⚡",
  funny: "😂",
  missing_you: "🥀",
  sleepy: "⭐",
  celebration: "🎉",
  need_hug: "🤗",
};

const MoodAnimation = () => {
  const theme = useTheme();

  const particle = animationMap[theme.id] || "❤️";

  return (
    <div className="mood-animation">

      {Array.from({ length: 25 }).map((_, index) => (
        <span
          key={index}
          className="floating-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
          }}
        >
          {particle}
        </span>
      ))}

    </div>
  );
};

export default MoodAnimation;