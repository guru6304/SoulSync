import "./SoulCard.css";

const PartnerTypingStatus = ({
  isTyping,
  partnerName,
}) => {
  if (!isTyping) return null;

  return (
    <div className="partner-typing">

      <div className="typing-dots">

        <span />
        <span />
        <span />

      </div>

      <p>

        {partnerName} is writing something...

      </p>

    </div>
  );
};

export default PartnerTypingStatus;