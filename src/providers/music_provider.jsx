import { useEffect } from "react";
import { useRaceSound } from "../hooks/use_race_sound";
import { useMusic } from "../hooks/use_store";

const MusicProvider = ({ children }) => {
  const { isMusicOn } = useMusic();
  const { manualPlay, manualStop } = useRaceSound();

  useEffect(() => {
    if (isMusicOn) {
      manualPlay();
    } else {
      manualStop();
    }
  }, [isMusicOn]);

  return children;
};

export default MusicProvider;
