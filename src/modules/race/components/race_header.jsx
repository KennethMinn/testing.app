import Coins from "../../../components/ui/coins";
import Image from "../../../components/ui/image";

const RaceHeader = ({ profile, prizePool }) => {
  return (
    <div className="flex flex-col items-center gap-y-1">
      <div className="flex items-center gap-x-2">
        <Image
          src={`/new_design/icons/race1_label_icon.webp`}
          className=" w-[20px] h-[20px]"
        />
        <p className=" text-heading-md">{profile?.name}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <p className="uppercase text-label-lg ">total prizepool:</p>
        <Coins
          creditCoin={prizePool?.creditScorePrizePool}
          airdropCoin={prizePool?.airdropPrizePool}
        />
      </div>
    </div>
  );
};

export default RaceHeader;
