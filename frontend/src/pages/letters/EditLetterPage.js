import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "@phosphor-icons/react";

import { Button } from "../../components/common/ui";
import LetterEditor from "../../components/letters/LetterEditor";

import "./EditLetterPage.css";

const mockLetter = {
    title: "To My Forever ❤️",
    mood: "Romantic ❤️",
    tags: "love, forever",
    scheduleDate: "",
    content:
        "Every day with you makes my life brighter.\n\nThank you for being my best friend and my soulmate.",
};

const EditLetterPage = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const handleUpdate = (values) => {

        console.log("Update Letter", id, values);

    };

    return (

        <section className="ss-edit-letter">

            <div className="ss-edit-letter__header">

                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                >

                    <ArrowLeft size={18} />

                    Back

                </Button>

                <div>

                    <h1>Edit Letter</h1>

                    <p>

                        Update your heartfelt message.

                    </p>

                </div>

            </div>

            <LetterEditor

                initialValues={mockLetter}

                submitLabel="Update Letter"

                onSubmit={handleUpdate}

            />

        </section>

    );

};

export default EditLetterPage;