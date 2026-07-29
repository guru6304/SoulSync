import React from "react";
import PropTypes from "prop-types";
import "./DashboardGrid.css";

const DashboardGrid = ({
    left,
    right,
}) => {
    return (
        <div className="dashboard-grid">

            <div className="dashboard-grid__left">
                {left}
            </div>

            <div className="dashboard-grid__right">
                {right}
            </div>

        </div>
    );
};

DashboardGrid.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node,
};

export default DashboardGrid;