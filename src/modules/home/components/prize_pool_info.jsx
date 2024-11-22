import { useState } from "react";
import Image from "../../../components/ui/image";
import Modal from "../../../components/ui/modal";
import { formatNumber } from "../../../utils";

const PrizePool = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const prizeLines = item.prize_pool?.[0]?.prize_lines || [];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className=" h-[450px]"
        label={item.game_type}
        title={item.name}
      >
        <div className=" bg-secondary p-[12px] h-full overflow-y-auto border-secondary-border rounded-[8px] border-[3px]">
          <div className="grid grid-cols-12">
            <p className="col-span-6 uppercase text-label-md">Position</p>
            <p className="col-span-6 uppercase text-label-md">Prize</p>
          </div>
          <div className=" bg-secondary-border h-[1px] w-full mt-3" />
          <div className="flex flex-col mt-2 gap-y-2">
            {prizeLines?.map((prizeItem, i) => (
              <div
                key={i}
                className="grid grid-cols-12 border-b-[1px] border-secondary-border last:border-b-0 h-[35px] pb-1"
              >
                <div className="flex items-center col-span-6 gap-x-2 b">
                  <Image
                    src={`/new_design/icons/${
                      i > 3 ? 4 : i + 1
                    }_badge_star_icon.webp`}
                    className=" h-[25px]"
                  />
                  <p className=" text-label-md">
                    {prizeItem.from_rank === prizeItem.to_rank
                      ? prizeItem.from_rank
                      : `${prizeItem.from_rank} - ${prizeItem.to_rank}`}
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="flex items-center col-span-6 gap-x-1">
                    <Image
                      src="/new_design/icons/m_coin.webp"
                      className=" w-[15px] h-[15px]"
                    />
                    <p className=" text-legend text-label-md w-[60px]">
                      {formatNumber(Number(prizeItem.prize))}
                    </p>
                    <Image
                      src="/new_design/icons/airdrop_coin.webp"
                      className=" w-[15px] h-[15px]"
                    />
                    <p className=" text-airdrop text-label-md">
                      {formatNumber(Number(prizeItem.airdrop_point))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
      <Image
        onClick={() => setIsOpen(true)}
        className="absolute h-[24px] right-[5px] top-[-6px]"
        src="/new_design/icons/race_info.webp"
      />
    </>
  );
};

export default PrizePool;
