import React from "react";
import { Sparkle } from "@phosphor-icons/react";
import { LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MoodCard from "../../components/moods/MoodCard";
import { MOODS } from "../../constants/moods";
import "./MoodsPage.css";

const MoodsPage = () => {
  const navigate = useNavigate();

  return (
    <section className="ss-moods-page">
      <div className="ss-moods-page__container">
        <div className="ss-moods-page__hero">
          <div className="ss-moods-page__badge"><Sparkle size={18} weight="fill" /><span>For My Love</span></div>
          <h1>Hey Beautiful! <span aria-hidden="true">💗</span></h1>
          <h2>How is your heart today?</h2>
          <p>Choose your mood and let&apos;s make your day a little better, together <span aria-hidden="true">❤️</span></p>
        </div>
        <div className="ss-moods-grid">{MOODS.map((mood) => <MoodCard key={mood.id} mood={mood} />)}</div>
        <button className="ss-moods-dashboard" onClick={() => navigate("/dashboard")}><LayoutDashboard size={18} /> Dashboard</button>
      </div>
    </section>
  );
};

export default MoodsPage;
