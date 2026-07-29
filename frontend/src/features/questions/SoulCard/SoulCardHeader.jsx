import "./SoulCard.css";

const moodConfig = {
  romantic: {
    emoji: "❤️",
    title: "Today's Soul Card",
    subtitle: "Open your heart."
  },

  happy: {
    emoji: "😊",
    title: "Share Happiness",
    subtitle: "Happiness grows when shared."
  },

  funny: {
    emoji: "😂",
    title: "Smile Together",
    subtitle: "Let's make each other laugh."
  },

  sad: {
    emoji: "💙",
    title: "You Are Not Alone",
    subtitle: "Share what's inside your heart."
  },

  angry: {
    emoji: "😤",
    title: "Take One Step Together",
    subtitle: "Understanding starts with listening."
  },

  missing_you: {
    emoji: "🥺",
    title: "Missing You",
    subtitle: "Distance can't separate hearts."
  },

  celebration: {
    emoji: "🎉",
    title: "Celebrate Love",
    subtitle: "Every moment deserves celebration."
  },

  sleepy: {
    emoji: "🌙",
    title: "Good Night",
    subtitle: "End today with love."
  },

  need_hug: {
    emoji: "🤗",
    title: "Virtual Hug",
    subtitle: "A hug through words."
  },
};

const SoulCardHeader = ({ mood }) => {

  const data =
    moodConfig[mood] ||
    moodConfig.romantic;

  return (

    <div className="soul-header">

      <div className="soul-header__emoji">

        {data.emoji}

      </div>

      <h2>

        {data.title}

      </h2>

      <p>

        {data.subtitle}

      </p>

    </div>

  );

};

export default SoulCardHeader;