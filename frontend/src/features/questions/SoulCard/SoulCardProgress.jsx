import "./SoulCard.css";

const SoulCardProgress = ({ progress }) => {

  const answered =
    progress?.answered || 0;

  const total =
    progress?.total || 0;

  const percentage =
    total
      ? (answered / total) * 100
      : 0;

  return (

    <div className="soul-progress">

      <div className="soul-progress__top">

        <span>

          Today's Journey ❤️

        </span>

        <span>

          {answered}/{total}

        </span>

      </div>

      <div className="soul-progress__bar">

        <div
          className="soul-progress__fill"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>

  );

};

export default SoulCardProgress;