import { useTheme } from "../../../theme/ThemeProvider";

import "./MoodBackground.css";

const MoodBackground = () => {

  const theme = useTheme();

  return (
    <div
      className="mood-background"
      style={{
        background: "var(--page-gradient)"
      }}
    >

      <div className="background-overlay" />

    </div>
  );

};

export default MoodBackground;