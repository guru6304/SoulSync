import { useMemo, useState } from "react";
import QuestionAnswer from "../QuestionAnswer";

import SoulCardHeader from "./SoulCardHeader";
import SoulCardProgress from "./SoulCardProgress";
import SoulCardContent from "./SoulCardContent";

import SoulCardFooter from "./SoulCardFooter";
import FloatingHearts from "./FloatingHearts";
import MoodBackground from "./MoodBackground";
import CardFlipAnimation from "./CardFlipAnimation";
import PartnerTypingStatus from "./PartnerTypingStatus";

const SoulCard = ({
  question,
  progress,
  mood = "romantic",
  initialAnswer = "",
  loading = false,
  partnerName = "",
  partnerTyping = false,
  onSave,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const successCard = useMemo(
    () => (
      <div className="soul-success">

        <div className="soul-success__emoji">
          💕
        </div>

        <h2>
          Your heart has been shared
        </h2>

        <p>
          Your answer has been saved and will be available for your partner.
        </p>

      </div>
    ),
    []
  );

  const handleSave = async (answer) => {
    await onSave?.(answer);
    setSubmitted(true);
  };

  return (
    <MoodBackground mood={mood}>

      <FloatingHearts />

      <div className="soul-card-page">

        <SoulCardHeader mood={mood} />

        <PartnerTypingStatus
          isTyping={partnerTyping}
          partnerName={partnerName}
        />

        <SoulCardProgress
          progress={progress}
        />

        <CardFlipAnimation
          flipped={submitted}
          front={
            <div className="soul-card">

              <SoulCardContent
                question={question}
              />

              <QuestionAnswer
    question={question}
    initialValue={initialAnswer}
    loading={loading}
    onSave={handleSave}
/>

            </div>
          }
          back={successCard}
        />

        <SoulCardFooter />

      </div>

    </MoodBackground>
  );
};

export default SoulCard;