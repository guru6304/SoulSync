import React from "react";
import "./DashboardBackground.css";

const DashboardBackground = ({ children }) => {
    return (
        <div className="dashboard-bg">
            <div className="bg-gradient bg-gradient-1"></div>
            <div className="bg-gradient bg-gradient-2"></div>
            <div className="bg-gradient bg-gradient-3"></div>

            <div className="bg-circle bg-circle-1"></div>
            <div className="bg-circle bg-circle-2"></div>
            <div className="bg-circle bg-circle-3"></div>
            <div className="bg-circle bg-circle-4"></div>

            <div className="dashboard-bg__content">
                {children}
            </div>
        </div>
    );
};

export default DashboardBackground;