import { useState } from "react";

import {
    CalendarBlank,
    MapPin,
    Tag,
    Heart,
    NotePencil,
} from "@phosphor-icons/react";

import { Card, Button, Input } from "../../common/ui";

import MemoryUpload from "../MemoryUpload";

import "./MemoryForm.css";

const moods = [
    "Romantic ❤️",
    "Happy 😊",
    "Funny 😂",
    "Travel ✈️",
    "Adventure 🏔️",
    "Celebration 🎉",
    "Missing You 🥺",
    "Special 💕",
];

const MemoryForm = ({ onSubmit }) => {

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        mood: "",
        tags: "",
        images: [],
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleImages = (images) => {

        setForm((prev) => ({
            ...prev,
            images,
        }));

    };

    const submitHandler = (e) => {

        e.preventDefault();

        onSubmit(form);

    };

    return (

        <Card className="ss-memory-form">

            <form onSubmit={submitHandler}>

                <div className="ss-form-grid">

                    <Input
                        label="Memory Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Our First Date ❤️"
                        icon={<Heart />}
                    />

                    <Input
                        type="date"
                        label="Memory Date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        icon={<CalendarBlank />}
                    />

                    <Input
                        label="Location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Hyderabad"
                        icon={<MapPin />}
                    />

                    <Input
                        label="Tags"
                        name="tags"
                        value={form.tags}
                        onChange={handleChange}
                        placeholder="date,love,trip"
                        icon={<Tag />}
                    />

                </div>

                <div className="ss-textarea">

                    <label>

                        <NotePencil
                            size={18}
                            weight="fill"
                        />

                        Description

                    </label>

                    <textarea
                        rows={6}
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Tell the beautiful story behind this memory..."
                    />

                </div>

                <div className="ss-memory-moods">

                    <label>

                        Mood

                    </label>

                    <div className="ss-memory-moods__list">

                        {

                            moods.map((mood) => (

                                <button
                                    type="button"
                                    key={mood}
                                    className={
                                        form.mood === mood
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setForm({
                                            ...form,
                                            mood,
                                        })
                                    }
                                >

                                    {mood}

                                </button>

                            ))

                        }

                    </div>

                </div>

                <MemoryUpload
                    value={form.images}
                    onChange={handleImages}
                />

                <div className="ss-memory-form__footer">

                    <Button type="submit">

                        Save Memory

                    </Button>

                </div>

            </form>

        </Card>

    );

};

export default MemoryForm;