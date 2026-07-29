import { useEffect, useRef } from "react";

const SoulMusicPlayer = ({ src, autoPlay = true }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current || !autoPlay) return;

    audioRef.current
      .play()
      .catch(() => {});
  }, [autoPlay]);

  return (
    <audio
      ref={audioRef}
      src={src}
      loop
    />
  );
};

export default SoulMusicPlayer;