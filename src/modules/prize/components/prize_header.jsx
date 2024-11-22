import Coins from "../../../components/ui/coins";
import Image from "../../../components/ui/image";
import useHashNavigate from "../../../hooks/use_hash_navigate";

const PrizeHeader = ({ creditScorePrizePool, airdropPrizePool }) => {
  const navigate = useHashNavigate();

  const navigateWinnerHistory = () => {
    navigate("/winner-history");
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-y-1">
        <p className=" text-heading-sm">total prizepool:</p>
        <Coins
          creditCoin={creditScorePrizePool}
          airdropCoin={airdropPrizePool}
          coinSize={20}
          fontSize="xl"
        />
      </div>
      <button
        className="tertiary_bg px-2 h-[40px] flex items-center justify-center gap-x-2 text-secondary"
        onClick={navigateWinnerHistory}
      >
        <Image src="/new_design/icons/history_icon.webp" className="h-[20px]" />
        <p className="uppercase text-nowrap text-secondary">WINNER HISTORY</p>
      </button>
    </div>
  );
};

export default PrizeHeader;
