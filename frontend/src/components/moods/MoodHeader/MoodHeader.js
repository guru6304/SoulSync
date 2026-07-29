import { useTheme } from "../../../theme/ThemeProvider";

import "./MoodHeader.css";

const MoodHeader = () => {
  const theme = useTheme();

  return (
    <div className="mood-header">

      <div className="mood-header__emoji">
        {theme.emoji}
      </div>

      <h1
        className="mood-header__title"
        style={{
          color: "var(--primary-color)",
        }}
      >
        {theme.title}
      </h1>

      <p className="mood-header__quote">
        {theme.quote}
      </p>

    </div>
  );
};

export default MoodHeader;