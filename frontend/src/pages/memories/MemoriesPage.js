import { Plus, Images, ArrowLeft } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useMemories from "../../hooks/useMemories";
import MemoryCard from "../../components/memories/MemoryCard";
import SSBottomNav from "../../components/common/ss-bottom-nav/SSBottomNav";
import ThemeProvider, { useTheme } from "../../theme/ThemeProvider";

import "./MemoriesPage.css";

const MemoriesPageContent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);

  const coupleId = user?.active_couple?.id || user?.active_couple || null;

  const { memories, loading, error, getMemories } = useMemories();

  useEffect(() => {
    if (coupleId) {
      getMemories(coupleId);
    }
  }, [coupleId, getMemories]);

  const memoryList = Array.isArray(memories) ? memories : [];

  return (
    <div className="ss-memories-page-wrapper">
      <header
        className="ss-memories-header-banner"
        style={{
          background: theme?.gradient || "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)",
        }}
      >
        <button className="ss-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} weight="bold" />
        </button>

        <div className="ss-memories-banner__inner">
          <h1>
            <Images size={32} weight="fill" />
            Memories 📷
          </h1>
          <p>Every picture tells our story together.</p>
        </div>

        <button
          className="ss-add-memory-btn"
          onClick={() => navigate("/memories/create")}
        >
          <Plus size={18} weight="bold" /> Add Memory
        </button>
      </header>

      <main className="ss-memories-container">
        {!coupleId ? (
          <div className="ss-memories-empty">
            <Images size={48} weight="duotone" />
            <h3>Connect With Your Partner</h3>
            <p>Send an invitation to start building your memory album together.</p>
            <button
              className="ss-add-memory-btn"
              onClick={() => navigate("/couple-invitation")}
            >
              ❤️ Invite Partner
            </button>
          </div>
        ) : loading ? (
          <div className="ss-memories-loading">
            <p>Loading your memories...</p>
          </div>
        ) : error ? (
          <div className="ss-memories-empty">
            <Images size={48} weight="duotone" />
            <h3>Unable to Load Memories</h3>
            <p>{typeof error === "string" ? error : "Something went wrong while fetching memories."}</p>
            <button
              className="ss-add-memory-btn"
              onClick={() => getMemories(coupleId)}
            >
              🔄 Try Again
            </button>
          </div>
        ) : memoryList.length === 0 ? (
          <div className="ss-memories-empty">
            <Images size={48} weight="duotone" />
            <h3>No Memories Yet</h3>
            <p>Create your first beautiful memory together.</p>
            <button
              className="ss-add-memory-btn"
              onClick={() => navigate("/memories/create")}
            >
              + Add Memory
            </button>
          </div>
        ) : (
          <div className="ss-memories-grid">
            {memoryList.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        )}
      </main>

      <SSBottomNav activeTab="memories" />
    </div>
  );
};

const MemoriesPage = () => (
  <ThemeProvider>
    <MemoriesPageContent />
  </ThemeProvider>
);

export default MemoriesPage;
