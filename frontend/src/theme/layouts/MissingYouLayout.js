

import MemoryPreview from "../../components/dashboard/MemoryPreview";
import LetterPreview from "../../components/dashboard/LetterPreview";
import TimelinePreview from "../../components/dashboard/TimelinePreview";
import LoveQuote from "../../components/dashboard/LoveQuote";
import MusicPreview from "../../components/dashboard/MusicPreview";

import "./MissingYouLayout.css";

const MissingYouLayout = () => {
  return (
    <div className="missing-layout">

      

      <LoveQuote />

      <div className="missing-grid">

        <TimelinePreview />

        <MemoryPreview />

        <LetterPreview />

        <MusicPreview />

      </div>

    </div>
  );
};

export default MissingYouLayout;