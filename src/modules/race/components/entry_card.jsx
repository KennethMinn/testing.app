import Coins from "../../../components/ui/coins";
import Image from "../../../components/ui/image";
import { formatNumber } from "../../../utils";

const EntryCard = ({ item, ...props }) => {
  return (
    <div
      className=" border-[3px] border-secondary-border bg-secondary rounded-[8px] h-[64px] flex items-center px-2"
      {...props}
    >
      <div className="flex flex-col w-full gap-y-[5px]">
        <div className="flex items-center justify-between">
          <p className=" text-label-lg">{item.name}</p>
          <p className="uppercase text-label-lg">rank : {item.rank}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className=" w-[50px] h-[16px] bg-gradient-primary rounded-[123px] flex items-center justify-center text-label-md">
            {item.points}
          </div>
          <Coins
            creditCoin={formatNumber(Number(item.credit_score))}
            airdropCoin={formatNumber(Number(item.airdrop_point))}
          />
          <div className="flex items-center gap-x-1">
            <Image className=" h-[12px]" src="/new_design/icons/heart.webp" />
            <p className=" text-label-md">
              {item.life}/{item.lives_per_day}
            </p>
            <Image
              className=" h-[12px]"
              src="/new_design/icons/right_arrow_icon.webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;
