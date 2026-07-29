import { useTheme } from "../../../theme/ThemeProvider";

import "./MoodHero.css";

const MoodHero = () => {
  const theme = useTheme();

  return (
    <section className="mood-hero">

      <div className="hero-content">

        <span className="hero-emoji">
          {theme.emoji}
        </span>

        <h1>{theme.title}</h1>

        <p>{theme.quote}</p>

      </div>

    </section>
  );
};

export default MoodHero;