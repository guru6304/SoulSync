import React from "react";
import PropTypes from "prop-types";
import "./QuickActions.css";

const QuickActions = ({
    actions = [],
}) => {

    return (
        <div className="quick-actions">

            <div className="quick-actions__header">
                <h2>⚡ Quick Actions</h2>
                <span>Everything in one place</span>
            </div>

            <div className="quick-actions__grid">

                {
                    actions.map((action) => (

                        <button
                            key={action.id}
                            className="quick-action-card"
                            onClick={action.onClick}
                        >

                            <div className="quick-action-card__icon">
                                {action.icon}
                            </div>

                            <h4>
                                {action.title}
                            </h4>

                        </button>

                    ))
                }

            </div>

        </div>
    );
};

QuickActions.propTypes = {
    actions: PropTypes.array,
};

QuickActions.defaultProps = {
    actions: [],
};

export default QuickActions;