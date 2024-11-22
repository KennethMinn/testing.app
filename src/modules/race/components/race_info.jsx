import { useTranslation } from "react-i18next";
import Coins from "../../../components/ui/coins";
import { formatNumber } from "../../../utils";
import { useGetGameEntry } from "../hooks/use_data";
import { t } from "i18next";

const RaceInfo = ({ userGameEntry }) => {
  const { t } = useTranslation();
  if (!useGetGameEntry) return;
  return (
    <div className="flex items-center w-full justify-evenly">
      <div className="flex flex-col items-center gap-y-[1px]">
        <p className="uppercase text-label-lg">{t("my_rank")}</p>
        <p className="uppercase text-heading-xl">{userGameEntry?.rank}</p>
      </div>
      <div className=" border-r-[2px] border-primary h-[45px] w-[1px] border-dotted " />
      <div className="flex flex-col items-center gap-y-[1px]">
        <p className="uppercase text-label-lg">my prize</p>
        <Coins
          creditCoin={formatNumber(Number(userGameEntry?.credit_score))}
          airdropCoin={formatNumber(Number(userGameEntry?.airdrop_point))}
        />
      </div>
      <div className=" border-r-[2px] border-primary h-[45px] w-[1px] border-dotted" />
      <div className="flex flex-col items-center gap-y-[1px]">
        <p className="uppercase text-label-lg">my points</p>
        <p className="uppercase text-heading-xl">{userGameEntry?.points}</p>
      </div>
    </div>
  );
};

export default RaceInfo;
