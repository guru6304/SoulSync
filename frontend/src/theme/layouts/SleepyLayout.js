

import LoveQuote from "../../components/dashboard/LoveQuote";
import MusicPreview from "../../components/dashboard/MusicPreview";
import TimelinePreview from "../../components/dashboard/TimelinePreview";
import TogetherCard from "../../components/dashboard/TogetherCard";

import "./SleepyLayout.css";

const SleepyLayout = () => {
  return (
    <div className="sleepy-layout">

      <div className="sleepy-grid">

        <TogetherCard />

        <LoveQuote />

        <MusicPreview />

        <TimelinePreview />

      </div>

    </div>
  );
};

export default SleepyLayout;