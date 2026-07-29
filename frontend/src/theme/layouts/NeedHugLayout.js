

import LoveQuote from "../../components/dashboard/LoveQuote";
import MemoryPreview from "../../components/dashboard/MemoryPreview";
import LetterPreview from "../../components/dashboard/LetterPreview";
import MusicPreview from "../../components/dashboard/MusicPreview";
import TodayQuestion from "../../components/dashboard/TodayQuestion";

import "./NeedHugLayout.css";

const NeedHugLayout = () => {
    return (
        <div className="need-hug-layout">

            

            <LoveQuote />

            <div className="need-hug-grid">

                <TodayQuestion />

                <LetterPreview />

                <MemoryPreview />

                <MusicPreview />

            </div>

        </div>
    );
};

export default NeedHugLayout;