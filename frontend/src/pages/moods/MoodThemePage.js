import ThemeProvider from "../../theme/ThemeProvider";
import UnifiedMoodHome from "../../components/moods/UnifiedMoodHome/UnifiedMoodHome";

import "./MoodThemePage.css";

const MoodThemePage = () => (
  <ThemeProvider>
    <UnifiedMoodHome />
  </ThemeProvider>
);

export default MoodThemePage;
