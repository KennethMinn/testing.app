import Background from "../../../components/ui/background";
import Coins from "../../../components/ui/coins";
import Image from "../../../components/ui/image";
import useHashNavigate from "../../../hooks/use_hash_navigate";
import { formatNumber } from "../../../utils";
import { useCurrentProfile, usePrizePool } from "../hooks/use_store";
import PrizePool from "./prize_pool_info";

const Profile = ({ item, index }) => {
  const navigate = useHashNavigate();
  const { setPrizePool } = usePrizePool();
  const { setProfile } = useCurrentProfile();

  const creditScorePrizePool = formatNumber(
    Number(item?.prize_pool[0]?.amount)
  );

  const airdropPrizePool = formatNumber(
    Number(
      item?.prize_pool[0]?.prize_lines.reduce(
        (pv, cv) => pv + cv.airdrop_point,
        0
      )
    )
  );

  const navigateRace = () => {
    setPrizePool({ creditScorePrizePool, airdropPrizePool });
    navigate("/race/id");
    setProfile(item);
  };

  return (
    <Background
      bgUrl={`/new_design/components_base/race${index + 1}_frame.webp`}
      className="h-[190px] w-full relative"
    >
      <div className="flex flex-col gap-y-1 h-[66px] w-[100%] justify-center absolute top-[14px] ps-10">
        <div className="flex items-center gap-x-2">
          <Image
            src={`/new_design/icons/race${index + 1}_label_icon.webp`}
            className="w-[20px] h-[20px]"
          />
          <p className=" text-label-xl">{item.name}</p>
        </div>
        <Coins
          creditCoin={creditScorePrizePool}
          airdropCoin={airdropPrizePool}
        />
      </div>
      <PrizePool item={item} />
      <button
        onClick={navigateRace}
        className={`race_${
          index + 1
        }_btn w-[29%] h-[36px] text-label-xl text-secondary absolute bottom-[-13px] left-1/2 transform -translate-x-1/2`}
      >
        Enter
      </button>
    </Background>
  );
};

export default Profile;
