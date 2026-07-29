

import LoveQuote from "../../components/dashboard/LoveQuote";
import LetterPreview from "../../components/dashboard/LetterPreview";
import MemoryPreview from "../../components/dashboard/MemoryPreview";
import MusicPreview from "../../components/dashboard/MusicPreview";
import TodayQuestion from "../../components/dashboard/TodayQuestion";

import "./SadLayout.css";

const SadLayout = () => {
  return (
    <div className="sad-layout">

      

      <LoveQuote />

      <div className="sad-grid">

        <MemoryPreview />

        <LetterPreview />

      </div>

      <MusicPreview />

      <TodayQuestion />

    </div>
  );
};

export default SadLayout;