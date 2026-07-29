import { Heart } from "@phosphor-icons/react";

import MoodCard from "../../components/moods/MoodCard";

import { MOODS } from "../../constants/moods";

import useMoods from "../../hooks/useMoods";

import "./MoodsPage.css";

const MoodsPage = () => {


  return (
    <section className="ss-moods-page">
      <div className="ss-moods-page__hero">
        <div className="ss-moods-page__icon">
          <Heart size={34} weight="fill" />
        </div>

        <h1>Welcome ❤️</h1>

        <p>Hey Love, how are you feeling today?</p>
      </div>

      <div className="ss-moods-grid">
        {MOODS.map((mood) => (
          <MoodCard key={mood.id} mood={mood} />
        ))}
      </div>
    </section>
  );
};

export default MoodsPage;
