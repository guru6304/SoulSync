import React from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import useMemories from "../../hooks/useMemories";
import { useNavigate } from "react-router-dom";
import MemoryForm from "../../components/memories/MemoryForm";
import ThemeProvider from "../../theme/ThemeProvider";
import "./CreateMemoryPage.css";

const CreateMemoryContent = () => {
  const navigate = useNavigate();
  const { addMemory } = useMemories();

  const handleSubmit = async (values) => {
    await addMemory(values);
    navigate("/memories");
  };

  return (
    <div className="ss-create-memory-page-wrapper">
      <div className="ss-create-memory-page-container">
        {/* Top Navigation */}
        <div className="ss-create-memory-top-nav">
          <button
            type="button"
            className="ss-memory-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} weight="bold" />
            <span>Back</span>
          </button>

          <div className="ss-create-memory-title-group">
            <h1>📸 Create a Memory</h1>
            <p>"Save one more beautiful moment forever. ❤️"</p>
          </div>
        </div>

        {/* Memory Form */}
        <MemoryForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

const CreateMemoryPage = () => (
  <ThemeProvider>
    <CreateMemoryContent />
  </ThemeProvider>
);

export default CreateMemoryPage;