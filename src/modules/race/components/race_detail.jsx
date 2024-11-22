import Background from "../../../components/ui/background";
import Image from "../../../components/ui/image";
import useHashNavigate from "../../../hooks/use_hash_navigate";
import { useCurrentProfile } from "../../home/hooks/use_store";
import EndTimeCountdown from "./end_time_countdown";
import NewEntryButton from "./new_entry_button";
import { t } from "i18next";

const RaceDetail = ({ userGameEntry, gameEntry }) => {
  const { profile } = useCurrentProfile();
  const index = profile.game_type.toLowerCase() === "solo" ? 1 : 2;
  const navigate = useHashNavigate();
  const noLife = userGameEntry?.life < 1;

  const navigateGame = (isFunMode) => {
    if (noLife) return;

    if (isFunMode) {
      navigate("/game", {
        state: { userGameEntry, isFunMode },
      });
    } else {
      navigate("/game", {
        state: { userGameEntry },
      });
    }
  };

  if (!userGameEntry || !gameEntry) return;

  return (
    <div className="relative flex justify-center w-full mt-5">
      <Image
        src={`/new_design/character/race${index}_monster.webp`}
        className=" sm:h-[230px] md:h-[300px]"
      />
      <div className="flex flex-col items-center gap-y-2 absolute sm:top-[150px] md:top-[200px] w-full">
        <div className="flex items-center gap-x-1 text-label-lg">
          {t('race_starts')}: <EndTimeCountdown />
        </div>
        <div className=" flex items-center justify-center gap-x-1 life_background w-[120px] h-[20px]">
          <Image
            src="/new_design/icons/heart.webp"
            className=" w-[14px] h-[12px]"
          />
          <p className=" text-label-lg">
            {userGameEntry.life}/{userGameEntry.lives_per_day}
          </p>
        </div>
        <Background
          bgUrl="/new_design/components_base/play_btn.webp"
          className={`w-[153px] h-[50px] mt-1 flex items-center gap-x-2 justify-center ${
            noLife && "opacity-60"
          }`}
          onClick={() => navigateGame(false)}
        >
          <p className="uppercase text-heading-lg text-secondary">Play</p>
          <Image src="/new_design/icons/heart.webp" className="h-[20px]" />
          <p className="uppercase text-heading-lg text-secondary"> -1</p>
        </Background>
        <div className="flex items-center justify-center w-full mt-1 gap-x-3">
          <button
            className="tertiary_bg w-[50%] h-[45px] flex items-center gap-x-2 ps-2"
            onClick={() => navigateGame(true)}
          >
            <Image src="/new_design/icons/funmode.webp" className=" h-[27px]" />
            <div className="flex flex-col items-start gap-y-0">
              <p className="uppercase text-label text-label-sm">{t('no_point')}</p>
              <p className="uppercase text-secondary text-label-xl">Fun mode</p>
            </div>
          </button>
          <NewEntryButton gameEntry={gameEntry} userGameEntry={userGameEntry} />
        </div>
      </div>
    </div>
  );
};

export default RaceDetail;
