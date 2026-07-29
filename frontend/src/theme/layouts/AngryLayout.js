import TodayQuestion from "../../components/dashboard/TodayQuestion";
import LetterPreview from "../../components/dashboard/LetterPreview";
import MemoryPreview from "../../components/dashboard/MemoryPreview";
import RecentActivity from "../../components/dashboard/RecentActivity";

import "./AngryLayout.css";

const AngryLayout = () => {
  return (
    <div className="angry-layout">
      
      <div className="angry-top">

        <TodayQuestion />

      </div>

      <div className="angry-grid">

        <RecentActivity />

        <LetterPreview />

        <MemoryPreview />

      </div>

    </div>
  );
};

export default AngryLayout;