

import TogetherCard from "../../components/dashboard/TogetherCard";
import TimelinePreview from "../../components/dashboard/TimelinePreview";
import MemoryPreview from "../../components/dashboard/MemoryPreview";
import LoveQuote from "../../components/dashboard/LoveQuote";
import UpcomingEvents from "../../components/dashboard/UpcomingEvents";

import "./CelebrationLayout.css";

const CelebrationLayout = () => {
    return (
        <div className="celebration-layout">

            <div className="celebration-grid">

                <TogetherCard />

                <UpcomingEvents />

                <MemoryPreview />

                <TimelinePreview />

                <LoveQuote />

            </div>

        </div>
    );
};

export default CelebrationLayout;