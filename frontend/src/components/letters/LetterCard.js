import { useNavigate } from "react-router-dom";

import {
    CalendarBlank,
    Heart,
    ArrowRight,
} from "@phosphor-icons/react";

import { Button, Card } from "../common/ui";

import "./LetterCard.css";

const LetterCard = ({ letter }) => {

    const navigate = useNavigate();

    return (

        <Card
            className="ss-letter-card"
            onClick={() => navigate(`/letters/${letter.id}`)}
        >

            <div className="ss-letter-card__top">

                <div className="ss-letter-card__icon">

                    <Heart
                        size={28}
                        weight="fill"
                    />

                </div>

                <span>

                    {letter.mood}

                </span>

            </div>

            <h3>

                {letter.title}

            </h3>

            <p>

                {letter.preview}

            </p>

            <div className="ss-letter-card__footer">

                <div>

                    <CalendarBlank
                        size={16}
                    />

                    {letter.createdAt}

                </div>

                <ArrowRight
                    size={20}
                    weight="bold"
                />

            </div>

        </Card>

    );

};

export default LetterCard;