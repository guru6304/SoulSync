import { createContext, useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { moodThemes } from "./moodThemes";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const { moodId } = useParams();

  const theme = useMemo(() => {
    return moodThemes[moodId] || moodThemes.romantic;
  }, [moodId]);

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