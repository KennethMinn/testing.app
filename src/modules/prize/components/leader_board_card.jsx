import Background from "../../../components/ui/background";
import Coins from "../../../components/ui/coins";
import { formatNumber } from "../../../utils";

const LeaderBoardCard = ({ item, theme }) => {
  return (
    <div
      className={`h-[60px]  bg-gradient-${theme} grid grid-cols-12 items-center px-2 ${
        !item.is_valid && "opacity-60"
      }`}
    >
      {item.rank > 3 ? (
        <div className="flex items-center justify-center col-span-2 w-[40px]">
          <p className=" text-label-lg">{item.rank}</p>
        </div>
      ) : (
        <Background
          bgUrl={`/new_design/icons/${item.rank}_badge_base_icon.webp`}
          className=" w-[40px] h-[36px] flex items-center justify-center text-label-lg col-span-2"
        >
          {item.rank}
        </Background>
      )}

      <div className="flex flex-col items-start col-span-5 gap-y-2">
        <p className=" text-label-xl">{item.user_name}</p>
        <div className=" w-[50px] h-[18px] bg-secondary rounded-[123px] flex items-center justify-center text-label-md">
          {item.total}
        </div>
      </div>
      <div className="flex items-center justify-end col-span-5">
        {item.is_valid ? (
          <Coins
            creditCoin={formatNumber(Number(item.credit_score))}
            airdropCoin={formatNumber(Number(item.airdrop_point))}
            coinSize={18}
            fontSize="xl"
          />
        ) : (
          <p className="text-label-xl text-error">Invalid</p>
        )}
      </div>
    </div>
  );
};

export default LeaderBoardCard;
