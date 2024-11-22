import { formatNumber } from "../../../utils";
import Image from "../../../components/ui/image";

const ReferralDetails = ({ friendList }) => {
  return (
    <>
      <div>
        {friendList && friendList.length > 0 ? (
          friendList.map((friend) => (
            <div
              key={friend.id}
              className="w-full flex flex-row mt-3 task_detail items-center justify-between gap-[16px] p-[18px] sm:h-[50px]"
            >
              <div className="flex items-center gap-[16px] ">
                <Image
                  src="\new_design\icons\profile_photo.webp"
                  className="w-[30px] h-[30px]"
                />
              </div>
              <div className="text-[18px] text-[#FFF]">{friend.name}</div>
              <div className="flex items-center gap-[3px] text-caption text-airdrop">
                <Image
                  src="\new_design\icons\airdrop_coin.webp"
                  className="w-[20px] h-[20px]"
                />
                {formatNumber(Number(friend.airDropPoints))}
              </div>
            </div>
          ))
        ) : (
          <div className=" relative h-[100vh] w-[100%]">
            <p className="absolute top-[20%] left-[20%] text-[#F3EDF780] text-[16px]">
              You haven’t invited anyone yet.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ReferralDetails;
