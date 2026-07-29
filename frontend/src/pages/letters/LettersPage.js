import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import useLetters from "../../hooks/useLetters";

import { Plus, Envelope } from "@phosphor-icons/react";

import { Button } from "../../components/common/ui";
import LetterCard from "../../components/letters/LetterCard";

import "./LettersPage.css";

const LettersPage = () => {

    const navigate = useNavigate();

    const {

        letters,

        loading,

        getLetters,

    } = useLetters();

    useEffect(() => {

        getLetters();

    }, []);

  return (
    <section className="ss-letters-page">
      <header className="ss-letters-page__header">
        <div>
          <h1>
            <Envelope size={34} weight="fill" />
            Love Letters
          </h1>

          <p>Every letter keeps love alive.</p>
        </div>

        <Button onClick={() => navigate("/letters/new")}>
          <Plus size={18} weight="bold" />
          Write Letter
        </Button>
      </header>

      <section className="ss-letters-grid">
        {loading ? (
          <p>Loading letters...</p>
        ) : (
          letters.map((letter) => (
            <LetterCard key={letter.id} letter={letter} />
          ))
        )}
      </section>
    </section>
  );
};

export default LettersPage;
