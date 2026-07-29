import "./SoulCard.css";

const hearts = Array.from({ length: 18 }, (_, index) => index);

const FloatingHearts = () => {
  return (
    <div className="floating-hearts">
      {hearts.map((heart) => (
        <span
          key={heart}
          className="floating-heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 5}s`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;