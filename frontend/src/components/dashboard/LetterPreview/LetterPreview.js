import React from "react";
import PropTypes from "prop-types";
import "./LetterPreview.css";
import { useNavigate } from "react-router-dom";

const LetterPreview = ({
    letters = [],
    onViewAll,
}) => {
    const navigate = useNavigate();
    const recentLetters = letters.slice(0, 3);

    return (
        <div className="letter-preview">

            <div className="letter-preview__header">

                <div>
                    <h2>💌 Love Letters</h2>
                    <span>Words that stay forever</span>
                </div>

                <button
    className="letter-preview__btn"
    onClick={onViewAll}
>
    View All
</button>

            </div>

            {
                recentLetters.length ? (

                    <div className="letter-preview__list">

                        {
                            recentLetters.map((letter) => (

                                <div
                                    key={letter.id}
                                    className="letter-card"
                                >

                                    <div className="letter-card__icon">
                                        💌
                                    </div>

                                    <div className="letter-card__content">

                                        <h3>{letter.title}</h3>

                                        <p>
                                            {letter.content.length > 110
                                                ? `${letter.content.substring(0,110)}...`
                                                : letter.content}
                                        </p>

                                        <span>
                                            {letter.createdAt}
                                        </span>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                ) : (

                    <div className="letter-preview__empty">

                        <span>💖</span>

                        <h3>No Letters Yet</h3>

                        <p>
                            Write your first love letter today.
                        </p>

                    </div>

                )
            }

        </div>
    );
};

LetterPreview.propTypes = {
    letters: PropTypes.array,
    onViewAll: PropTypes.func,
};

LetterPreview.defaultProps = {
    letters: [],
    onViewAll: () => {},
};

export default LetterPreview;