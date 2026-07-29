import { Plus, Images } from "@phosphor-icons/react";

import { useEffect } from "react";

import useMemories from "../../hooks/useMemories";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import MemoryCard from "../../components/memories/MemoryCard";
import { Button } from "../../components/common/ui";

import "./MemoriesPage.css";

const MemoriesPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

const coupleId = user?.active_couple?.id || user?.active_couple || null;

  const {
    memories,

    loading,

    getMemories,
  } = useMemories();

useEffect(() => {
    if (coupleId) {
        getMemories(coupleId);
    }
}, [coupleId]);

  return (
    <section className="ss-memories-page">
      <header className="ss-memories-page__header">
        <div>
          <h1>
            <Images size={34} weight="fill" />
            Memories
          </h1>

          <p>Every picture tells our story.</p>
        </div>

        <Button onClick={() => navigate("/memories/create")}>
          <Plus size={18} weight="bold" />
          Add Memory
        </Button>
      </header>

      <section className="ss-memories-grid">
        {loading ? (
          <p>Loading memories...</p>
        ) : (
          memories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))
        )}
      </section>
    </section>
  );
};

export default MemoriesPage;
