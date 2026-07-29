import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarBlank,
    MapPin,
    Heart,
    Tag,
} from "@phosphor-icons/react";

import useMemories from "../../hooks/useMemories";

import { Button, Card } from "../../components/common/ui";
import MemoryGallery from "../../components/memories/MemoryGallery";

import "./MemoryDetailsPage.css";

const MemoryDetailsPage = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const {

        currentMemory,

        getMemory,

    } = useMemories();

    useEffect(() => {

        getMemory(id);

    }, [id]);

    if (!currentMemory) {

        return <p>Loading...</p>;

    }

    return (

        <section className="ss-memory-details">

            <Button
                variant="ghost"
                onClick={() => navigate(-1)}
            >

                <ArrowLeft
                    size={18}
                    weight="bold"
                />

                Back

            </Button>

            <MemoryGallery
                images={currentMemory.images || []}
            />

            <Card>

                <div className="ss-memory-details__header">

                    <h1>

                        {currentMemory.title}

                    </h1>

                    <span>

                        <Heart
                            size={22}
                            weight="fill"
                        />

                        {currentMemory.mood}

                    </span>

                </div>

                <div className="ss-memory-meta">

                    <div>

                        <CalendarBlank
                            size={18}
                        />

                        {currentMemory.date}

                    </div>

                    <div>

                        <MapPin
                            size={18}
                        />

                        {currentMemory.location}

                    </div>

                </div>

                <p className="ss-memory-description">

                    {currentMemory.description}

                </p>

                <div className="ss-memory-tags">

                    {(currentMemory.tags || []).map((tag) => (

                        <span key={tag}>

                            <Tag size={14} />

                            {tag}

                        </span>

                    ))}

                </div>

            </Card>

        </section>

    );

};

export default MemoryDetailsPage;