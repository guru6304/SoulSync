import React from "react";
import PropTypes from "prop-types";
import "./TogetherCard.css";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

const getNextAnniversary = (date) => {
    if (!date) return "--";

    const today = new Date();
    const anniversary = new Date(date);

    anniversary.setFullYear(today.getFullYear());

    if (anniversary < today) {
        anniversary.setFullYear(today.getFullYear() + 1);
    }

    return anniversary.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

const TogetherCard = ({
    togetherSince,
    totalDays = 0,
    totalMonths = 0,
    totalYears = 0,
}) => {
    const navigate = useNavigate();
    return (
        <div className="together-card">

            <div className="together-card__header">
                <h2>💕 Together Journey</h2>
                <span>Forever Starts Here</span>
            </div>

            <div className="together-card__stats">

                <div className="journey-box">
                    <h3>{totalYears}</h3>
                    <span>Years</span>
                </div>

                <div className="journey-box">
                    <h3>{totalMonths}</h3>
                    <span>Months</span>
                </div>

                <div className="journey-box">
                    <h3>{totalDays}</h3>
                    <span>Days</span>
                </div>

            </div>

            <div className="journey-details">

                <div className="journey-item">
                    <span>❤️ Together Since</span>
                    <strong>{formatDate(togetherSince)}</strong>
                </div>
                <button
    className="together-card__btn"
    onClick={() => navigate("/profile")}
>
    View Profile
</button>
                <div className="journey-item">
                    <span>🎉 Next Anniversary</span>
                    <strong>{getNextAnniversary(togetherSince)}</strong>
                </div>

            </div>

        </div>
    );
};

TogetherCard.propTypes = {
    togetherSince: PropTypes.string,
    totalDays: PropTypes.number,
    totalMonths: PropTypes.number,
    totalYears: PropTypes.number,
};

export default TogetherCard;