import "./SoulCard.css";

const gradients = {
  romantic: "romantic-bg",
  happy: "happy-bg",
  funny: "funny-bg",
  sad: "sad-bg",
  angry: "angry-bg",
  missing_you: "missing-bg",
  celebration: "celebration-bg",
  sleepy: "sleepy-bg",
  need_hug: "hug-bg",
};

const MoodBackground = ({ mood, children }) => {
  return (
    <div
      className={`mood-background ${
        gradients[mood] || "romantic-bg"
      }`}
    >
      {children}
    </div>
  );
};

export default MoodBackground;