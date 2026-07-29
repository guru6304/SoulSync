

import MemoryPreview from "../../components/dashboard/MemoryPreview";
import MoodPreview from "../../components/dashboard/MoodPreview";
import TogetherCard from "../../components/dashboard/TogetherCard";
import LoveQuote from "../../components/dashboard/LoveQuote";

import "./HappyLayout.css";

const HappyLayout = () => {
  return (
    <div className="happy-layout">


      <div className="happy-grid">

        <TogetherCard />

        <MoodPreview />

        <MemoryPreview />

        <LoveQuote />

      </div>

    </div>
  );
};

export default HappyLayout;