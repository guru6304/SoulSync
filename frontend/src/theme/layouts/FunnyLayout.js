

import LoveQuote from "../../components/dashboard/LoveQuote";
import MoodPreview from "../../components/dashboard/MoodPreview";
import MemoryPreview from "../../components/dashboard/MemoryPreview";
import RecentActivity from "../../components/dashboard/RecentActivity";
import TodayQuestion from "../../components/dashboard/TodayQuestion";

import "./FunnyLayout.css";

const FunnyLayout = () => {
  return (
    <div className="funny-layout">

      <div className="funny-grid">

        <LoveQuote />

        <MoodPreview />

        <MemoryPreview />

        <RecentActivity />

        <TodayQuestion />

      </div>

    </div>
  );
};

export default FunnyLayout;