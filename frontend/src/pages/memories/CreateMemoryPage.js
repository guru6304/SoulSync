import { ArrowLeft } from "@phosphor-icons/react";
import useMemories from "../../hooks/useMemories";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/common/ui";
import MemoryForm from "../../components/memories/MemoryForm";

import "./CreateMemoryPage.css";

const CreateMemoryPage = () => {

    const navigate = useNavigate();

const {

    addMemory,

} = useMemories();

const handleSubmit = async (values) => {

    await addMemory(values);

    navigate("/memories");

};

    return (

        <section className="ss-create-memory">

            <div className="ss-create-memory__header">

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

                    <h1>Create Memory</h1>

                    <p>

                        Save one more beautiful moment forever ❤️

                    </p>

                </div>

            </div>

            <MemoryForm
                onSubmit={handleSubmit}
            />

        </section>

    );

};

export default CreateMemoryPage;