import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

import useLetters from "../../hooks/useLetters";

import { Button } from "../../components/common/ui";
import LetterEditor from "../../components/letters/LetterEditor";

import "./WriteLetterPage.css";

const WriteLetterPage = () => {

    const navigate = useNavigate();

const {

    addLetter,

} = useLetters();

const handleSubmit = async (values) => {

    await addLetter(values);

    navigate("/letters");

};

    return (

        <section className="ss-write-letter">

            <div className="ss-write-letter__header">

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

                <div>

                    <h1>

                        Write Love Letter ❤️

                    </h1>

                    <p>

                        Some words become memories forever.

                    </p>

                </div>

            </div>

            <LetterEditor
                onSubmit={handleSubmit}
            />

        </section>

    );

};

export default WriteLetterPage;