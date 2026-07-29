import ThemeProvider from "../../theme/ThemeProvider";
import { useTheme } from "../../theme/ThemeProvider";
import MoodBackground from "../../components/moods/MoodBackground/MoodBackground";
import MoodAnimation from "../../components/moods/MoodAnimation/MoodAnimation";
import MoodActions from "../../components/moods/MoodActions/MoodActions";

import AppHeader from "../../components/common/AppHeader/AppHeader";
import MoodHeader from "../../components/moods/MoodHeader/MoodHeader";

import { moodLayouts } from "../../theme/layouts";

import "./MoodThemePage.css";

const MoodContent = () => {
  const theme = useTheme();

  const Layout = moodLayouts[theme.id];

  if (!Layout) {
    return <div>Mood Layout Not Found</div>;
  }

  return <Layout />;
};

const MoodThemePage = () => (
  <ThemeProvider>

<MoodBackground />

<MoodAnimation />

<MoodHeader />

<MoodActions />

<MoodContent />

</ThemeProvider>
);

export default MoodThemePage;
