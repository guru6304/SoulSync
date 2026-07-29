import { useNavigate } from "react-router-dom";

import {
    CalendarBlank,
    MapPin,
    HeartStraight,
} from "@phosphor-icons/react";

import { Card } from "../../common/ui";

import "./MemoryCard.css";

const MemoryCard = ({ memory }) => {

    const navigate = useNavigate();

    return (

        <Card
            className="ss-memory-card"
            onClick={() => navigate(`/memories/${memory.id}`)}
        >

            <div className="ss-memory-card__image">

                <img
                    src={memory.image}
                    alt={memory.title}
                />

                <div className="ss-memory-card__overlay">

                    <HeartStraight
                        size={28}
                        weight="fill"
                    />

                </div>

            </div>

            <div className="ss-memory-card__body">

                <h3>

                    {memory.title}

                </h3>

                <div className="ss-memory-card__meta">

                    <span>

                        <CalendarBlank
                            size={16}
                        />

                        {memory.date}

                    </span>

                    <span>

                        <MapPin
                            size={16}
                        />

                        {memory.location}

                    </span>

                </div>

            </div>

        </Card>

    );

};

export default MemoryCard;