import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";

import { moodThemes } from "./moodThemes";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const { moodId } = useParams();
  const location = useLocation();

  const queryMood = new URLSearchParams(location.search).get("mood");

  const theme = useMemo(() => {
    const rawMood = moodId || queryMood || location.state?.mood || localStorage.getItem("activeMood") || "romantic";
    const key = rawMood.replace(/-/g, "_");
    return moodThemes[key] || moodThemes.romantic;
  }, [location.state?.mood, moodId, queryMood]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      theme.primary
    );

    document.documentElement.style.setProperty(
      "--secondary-color",
      theme.secondary
    );

    document.documentElement.style.setProperty(
      "--background-color",
      theme.background
    );

    document.documentElement.style.setProperty(
      "--card-color",
      theme.card
    );

    document.documentElement.style.setProperty(
      "--button-color",
      theme.button
    );

    document.documentElement.style.setProperty(
      "--page-gradient",
      theme.gradient
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
