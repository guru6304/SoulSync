import "./QuestionHeader.css";

const QuestionHeader = ({ mood = "romantic" }) => {
  const moodData = {
    romantic: {
      emoji: "❤️",
      title: "Today's Soul Card",
      subtitle:
        "Open your heart and create another beautiful memory together.",
    },

    happy: {
      emoji: "😊",
      title: "Today's Happy Moment",
      subtitle:
        "Share your happiness with your favorite person.",
    },

    funny: {
      emoji: "😂",
      title: "Today's Fun Card",
      subtitle:
        "Make each other laugh today.",
    },

    sad: {
      emoji: "💙",
      title: "Today's Comfort Card",
      subtitle:
        "Your words can heal someone's heart.",
    },

    angry: {
      emoji: "😤",
      title: "Today's Peace Card",
      subtitle:
        "Understanding begins with listening.",
    },

    missing_you: {
      emoji: "🥺",
      title: "Missing You",
      subtitle:
        "Distance disappears when hearts connect.",
    },

    celebration: {
      emoji: "🎉",
      title: "Celebrate Together",
      subtitle:
        "Every little achievement deserves love.",
    },

    sleepy: {
      emoji: "🌙",
      title: "Good Night Soul Card",
      subtitle:
        "End your day with warmth and gratitude.",
    },

    need_hug: {
      emoji: "🤗",
      title: "Virtual Hug",
      subtitle:
        "A few kind words can feel like a real hug.",
    },
  };

  const data = moodData[mood] || moodData.romantic;

  return (
    <header className="question-header">

      <div className="question-header__emoji">
        {data.emoji}
      </div>

      <h1 className="question-header__title">
        {data.title}
      </h1>

      <p className="question-header__subtitle">
        {data.subtitle}
      </p>

    </header>
  );
};

export default QuestionHeader;