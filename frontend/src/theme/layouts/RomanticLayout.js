

import MemoryPreview from "../../components/dashboard/MemoryPreview";
import LetterPreview from "../../components/dashboard/LetterPreview";
import MusicPreview from "../../components/dashboard/MusicPreview";
import TodayQuestion from "../../components/dashboard/TodayQuestion";

import "./RomanticLayout.css";

const RomanticLayout = () => {
  return (
    <div className="romantic-layout">


        
      <div className="romantic-grid">

        <MemoryPreview />

        <LetterPreview />

        <TodayQuestion />

        <MusicPreview />

      </div>

    </div>
  );
};

export default RomanticLayout;