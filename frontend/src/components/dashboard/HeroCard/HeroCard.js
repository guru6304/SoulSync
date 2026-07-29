import React from "react";
import PropTypes from "prop-types";
import "./HeroCard.css";

const HeroCard = ({
  userName = "Guru",
  partnerName = "Partner",
  quote = "Every love story is beautiful, but ours is my favorite.",
  togetherDays = 0,
  image = null,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <section className="hero-card">
      <div className="hero-card__overlay"></div>

      <div className="hero-card__content">
        <div className="hero-card__left">
          <span className="hero-card__badge">
            ❤️ Soul Sync
          </span>

          <h1 className="hero-card__title">
            Welcome Back,
            <span>{userName}</span>
          </h1>

          <p className="hero-card__quote">
            "{quote}"
          </p>

          <div className="hero-card__couple">
            <div className="hero-card__avatar">
              {userName.charAt(0)}
            </div>

            <div className="hero-card__heart">
              ❤️
            </div>

            <div className="hero-card__avatar secondary">
              {partnerName.charAt(0)}
            </div>
          </div>

          <h3 className="hero-card__names">
            {userName} & {partnerName}
          </h3>

          <p className="hero-card__days">
            Together for <strong>{togetherDays}</strong> beautiful days
          </p>

          <div className="hero-card__buttons">
            <button
              className="hero-btn hero-btn--primary"
              onClick={onPrimaryClick}
            >
              💕 Celebrate
            </button>

            <button
              className="hero-btn hero-btn--secondary"
              onClick={onSecondaryClick}
            >
              📸 Memories
            </button>
          </div>
        </div>

        <div className="hero-card__right">
          {image ? (
            <img
              src={image}
              alt="Couple"
              className="hero-card__image"
            />
          ) : (
            <div className="hero-card__placeholder">
              <div className="pulse-ring"></div>

              <div className="placeholder-heart">
                💖
              </div>

              <p>Your Beautiful Photo</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

HeroCard.propTypes = {
  userName: PropTypes.string,
  partnerName: PropTypes.string,
  quote: PropTypes.string,
  togetherDays: PropTypes.number,
  image: PropTypes.string,
  onPrimaryClick: PropTypes.func,
  onSecondaryClick: PropTypes.func,
};

HeroCard.defaultProps = {
  onPrimaryClick: () => {},
  onSecondaryClick: () => {},
};

export default HeroCard;