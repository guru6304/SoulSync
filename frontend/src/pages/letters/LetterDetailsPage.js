import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";

import useLetters from "../../hooks/useLetters";

import { ArrowLeft, PencilSimple } from "@phosphor-icons/react";

import { Button, Card } from "../../components/common/ui";

import "./LetterDetailsPage.css";


const LetterDetailsPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const {

    currentLetter,

    getLetter,

} = useLetters();

useEffect(() => {

    getLetter(id);

}, [id, getLetter]);

if (!currentLetter) {

    return <p>Loading...</p>;

}

    return (

        <section className="ss-letter-details">

            <div className="ss-letter-details__header">

                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={18} />
                    Back
                </Button>

                <Button
                    onClick={() => navigate(`/letters/${id}/edit`)}
                >
                    <PencilSimple size={18} />
                    Edit
                </Button>

            </div>

            <Card className="ss-letter-paper">

                <span className="ss-letter-badge">
                    {currentLetter.mood}
                </span>

                <h1>
                    {currentLetter.title}
                </h1>

                <small>
                    {currentLetter.createdAt}
                </small>

                <div className="ss-letter-content">
                    {(currentLetter.content || "")
                        .split("\n")
                        .map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                </div>

            </Card>

        </section>

    );

};

export default LetterDetailsPage;