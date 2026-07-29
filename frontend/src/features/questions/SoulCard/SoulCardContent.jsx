import "./SoulCard.css";

const SoulCardContent = ({ question }) => {

  if (!question) return null;

  return (

    <div className="soul-content">

      <h1>

        {question.title}

      </h1>

      <p>

        {question.description}

      </p>

    </div>

  );

};

export default SoulCardContent;