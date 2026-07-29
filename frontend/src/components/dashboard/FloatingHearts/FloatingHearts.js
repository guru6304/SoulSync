import React from "react";
import "./FloatingHearts.css";

const HEARTS = [
    { id: 1, icon: "❤️", className: "heart-1" },
    { id: 2, icon: "💕", className: "heart-2" },
    { id: 3, icon: "💖", className: "heart-3" },
    { id: 4, icon: "💗", className: "heart-4" },
    { id: 5, icon: "💞", className: "heart-5" },
    { id: 6, icon: "💘", className: "heart-6" },
    { id: 7, icon: "💝", className: "heart-7" },
    { id: 8, icon: "💓", className: "heart-8" }
];

const FloatingHearts = () => {
    return (
        <div className="floating-hearts">
            {HEARTS.map((heart) => (
                <span
                    key={heart.id}
                    className={`floating-heart ${heart.className}`}
                >
                    {heart.icon}
                </span>
            ))}
        </div>
    );
};

export default FloatingHearts;