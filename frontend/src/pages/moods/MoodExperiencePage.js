import { useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "@phosphor-icons/react";

import { Button } from "../../components/common/ui";

import { MOODS } from "../../constants/moods";

import useMoods from "../../hooks/useMoods";

import "./MoodExperiencePage.css";

const MoodExperiencePage = () => {
  const { moodId } = useParams();

  const navigate = useNavigate();

  const { saveMood } = useMoods();

  const [note, setNote] = useState("");

  const [saving, setSaving] = useState(false);

  const mood = useMemo(
    () => MOODS.find((item) => item.id === moodId),

    [moodId],
  );

  if (!mood) {
    return <h2>Mood not found.</h2>;
  }

  const handleSave = async () => {
    try {
      setSaving(true);

      await saveMood({
        mood_type: mood.id,

        note,
      });

      navigate("/moods");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="ss-mood-experience">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
        Back
      </Button>

      <div className="ss-mood-hero">
        <div className="ss-mood-emoji">{mood.emoji}</div>

        <h1>{mood.title}</h1>

        <p>Tell your partner how you feel.</p>
      </div>

      <textarea
        className="ss-mood-note"
        placeholder="Write something from your heart..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <Button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Mood"}
      </Button>
    </section>
  );
};

export default MoodExperiencePage;
