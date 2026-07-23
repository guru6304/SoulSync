import './MoodCard.css';

const MoodCard = ({ mood }) => {

    return (

        <div className="mood-card">

            <div className="mood-icon">

                {mood.emoji}

            </div>

            <h3>

                {mood.title}

            </h3>

            <p>

                {mood.subtitle}

            </p>

        </div>

    );

};

export default MoodCard;