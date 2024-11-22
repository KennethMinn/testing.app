import { useEffect, useRef } from "react";
import { cdnURL } from "../constants";

export const useRaceSound = () => {
  const bgSoundRef = useRef(new Audio(cdnURL + "/sounds/MenuMusic.mp3"));
  const isMusicOn = true; //will be dynamic later

  useEffect(() => {
    const bgSound = bgSoundRef.current;
    bgSound.loop = true;
    bgSound.volume = isMusicOn ? 1 : 0;

    if (isMusicOn) {
      bgSound.play();
    } else {
      bgSound.pause();
    }

    return () => bgSound.pause(); // Cleanup on unmount or re-render
  }, [isMusicOn]);

  //   const togglePlayPause = () => setIsMusicOn(!isMusicOn); will use in profile later

  const manualPlay = () => {
    if (isMusicOn) {
      bgSoundRef.current.play();
    }
  };

  const manualStop = () => {
    bgSoundRef.current.pause();
  };

  return { isMusicOn, manualPlay, manualStop };
};
