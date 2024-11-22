import Background from "../../../components/ui/background";
import Image from "../../../components/ui/image";
import { formatNumber } from "../../../utils";
import LeftAmount from "./left_amount";

const RecentReward = ({ isAirdropping, isLoading, creditScore }) => {
  return (
    <>
      <div className="px-4">
        <div className="relative ">
          <div className="bg-secondary w-[140px] flex items-center justify-center rounded-t-[10px] h-[35px] absolute top-[-30px] left-[20px] uppercase whitespace-nowrap text-label-lg">
            Recent reward
          </div>
          <div className=" bg-secondary border-[3px] border-secondary-border w-full h-[75px] rounded-[8px] flex items-center justify-between px-4">
            <Background
              bgUrl="/new_design/navigation/usdt.webp"
              className=" sm:h-[26px] md:h-[35px] w-[70px] md:w-[100px] flex items-center justify-center ps-7 text-label-md"
            >
              {isLoading ? "..." : formatNumber(Number(creditScore))}
            </Background>
            <LeftAmount />
          </div>
          <div className="w-full flex items-center gap-x-2 justify-center bg-secondary-border absolute rounded-b-[8px] bottom-[-26px] h-[35px]">
            <Image
              src="/new_design/icons/history_icon.webp"
              className=" h-[23px]"
            />
            <p className="uppercase text-label-xl">transaction history</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentReward;
