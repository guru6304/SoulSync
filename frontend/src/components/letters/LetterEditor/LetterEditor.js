import { useMemo, useState } from "react";

import { Heart, FloppyDisk, Eye, PencilSimple } from "@phosphor-icons/react";

import { Card, Button, Input } from "../../common/ui";

import "./LetterEditor.css";

const moods = [
  "Romantic ❤️",
  "Happy 😊",
  "Missing You 🥺",
  "Thank You 🙏",
  "Sorry 💙",
  "Anniversary 🎉",
  "Forever 💕",
  "Special ✨",
];

const LetterEditor = ({
  onSubmit,
  initialValues = {
    title: "",
    mood: "",
    content: "",
  },
  submitLabel = "Save Letter",
}) => {
  const [form, setForm] = useState(initialValues);

  const words = useMemo(() => {
    return form.content.trim().split(/\s+/).filter(Boolean).length;
  }, [form.content]);

  const readingTime = Math.max(1, Math.ceil(words / 200));

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    onSubmit?.(form);
  };

  return (
    <form className="ss-letter-editor" onSubmit={submitHandler}>
      <div className="ss-letter-editor__left">
        <Card>
          <Input
            label="Letter Title"
            name="title"
            value={form.title}
            onChange={changeHandler}
            placeholder="My Forever Love ❤️"
            icon={<Heart />}
          />

          <div className="ss-letter-editor__section">
            <label>
              <PencilSimple size={18} weight="fill" />
              Letter
            </label>

            <textarea
              rows={18}
              name="content"
              value={form.content}
              onChange={changeHandler}
              placeholder="Start writing from your heart..."
            />
          </div>
        </Card>
      </div>

      <div className="ss-letter-editor__right">
        <Card>
          <div className="ss-letter-editor__section">
            <label>Mood</label>

            <div className="ss-mood-list">
              {moods.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  className={form.mood === mood ? "active" : ""}
                  onClick={() =>
                    setForm({
                      ...form,
                      mood,
                    })
                  }
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div className="ss-letter-stats">
            <div>
              <strong>{words}</strong>

              <span>Words</span>
            </div>

            <div>
              <strong>{form.content.length}</strong>

              <span>Characters</span>
            </div>

            <div>
              <strong>{readingTime} min</strong>

              <span>Read</span>
            </div>
          </div>

          <Button type="submit">
            <FloppyDisk size={18} weight="fill" />

            {submitLabel}
          </Button>
        </Card>

        <Card>
          <div className="ss-preview-header">
            <Eye size={18} weight="fill" />
            Live Preview
          </div>

          <article className="ss-letter-preview">
            <h2>{form.title || "Untitled Letter"}</h2>

            {(form.content || "Your heartfelt words will appear here...")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line || <>&nbsp;</>}</p>
              ))}
          </article>
        </Card>
      </div>
    </form>
  );
};

export default LetterEditor;
