import Image from "../../../components/ui/image";
import Toggle from "../../../components/ui/toggle";
import {} from "../../../hooks/use_race_sound";
import { useMusic } from "../../../hooks/use_store";

const Audio = () => {
  const { isMusicOn, setIsMusicOn } = useMusic();

  const toggleMusic = () => {
    setIsMusicOn(!isMusicOn);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-5">
        <Image src="/new_design/icons/audio_icon.webp" className=" h-[24px]" />
        <p className={`text-label-xl ${!isMusicOn && "opacity-60"}`}>Audio</p>
      </div>
      <Toggle isToggled={isMusicOn} onToggle={toggleMusic} />
    </div>
  );
};

export default Audio;
