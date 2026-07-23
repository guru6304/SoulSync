import "./StatsGrid.css";

import StatCard from "../StatCard";

const StatsGrid = ({ stats }) => {

    if (!stats) {

        return null;

    }

    return (

        <div className="ss-stats-grid">

            <StatCard
                title="Memories"
                value={stats.memoryCount}
            />

            <StatCard
                title="Photos"
                value={stats.photoCount}
            />

            <StatCard
                title="Videos"
                value={stats.videoCount}
            />

            <StatCard
                title="Questions"
                value={stats.questionAnswered}
            />

        </div>

    );

};

export default StatsGrid;