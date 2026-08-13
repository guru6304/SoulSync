import { useMemo, useState, useCallback } from "react";
import { ArrowRight, Eye } from "@phosphor-icons/react";
import QuestionAnswer from "../QuestionAnswer/QuestionAnswer";

import SoulCardHeader from "./SoulCardHeader";
import SoulCardProgress from "./SoulCardProgress";
import SoulCardContent from "./SoulCardContent";

import FloatingHearts from "./FloatingHearts";
import MoodBackground from "./MoodBackground";
import CardFlipAnimation from "./CardFlipAnimation";
import PartnerTypingStatus from "./PartnerTypingStatus";
import { useToast } from "../../../context/ToastContext";

const SoulCard = ({
  question,
  progress,
  mood = "romantic",
  initialAnswer = "",
  loading = false,
  partnerName = "",
  partnerTyping = false,
  onSave,
  onContinue,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleSave = async (answer, media = null) => {
    try {
      await onSave?.(answer, media);
      setSubmitted(true);
      showSuccess("Answer saved ❤️");
    } catch (err) {
      showError(err, "Unable to save answer. Please try again.");
    }
  };

  const handleNext = useCallback(() => {
    setSubmitted(false);
    onContinue?.();
  }, [onContinue]);

  const successCard = useMemo(
    () => (
      <div className="ss-question-success-container">
        <div className="ss-success-emoji">💕</div>

        <h2>Answer Saved! ❤️</h2>

        <p className="ss-success-subtitle">
          <Eye size={20} style={{ verticalAlign: "middle", marginRight: "6px" }} />
          Your answer has been saved and your partner can now view your response.
        </p>

        <button
          className="ss-primary-submit-btn"
          onClick={handleNext}
        >
          <span>Continue Questions</span>
          <ArrowRight size={20} weight="bold" />
        </button>
      </div>
    ),
    [handleNext]
  );

  return (
    <MoodBackground mood={mood}>
      <FloatingHearts />

      <div className="ss-question-atmosphere-page">
        <div className="ss-question-atmosphere-inner">
          <SoulCardHeader mood={mood} />

          <PartnerTypingStatus
            isTyping={partnerTyping}
            partnerName={partnerName}
          />

          <SoulCardProgress progress={progress} />

          <CardFlipAnimation
            flipped={submitted}
            front={
              <div className="ss-question-presentation">
                <SoulCardContent question={question} />

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
        </div>
      </div>
    </MoodBackground>
  );
};

export default SoulCard;