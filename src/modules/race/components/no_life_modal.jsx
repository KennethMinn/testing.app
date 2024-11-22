import Background from "../../../components/ui/background";
import Coins from "../../../components/ui/coins";
import Modal from "../../../components/ui/modal";
import { formatNumber } from "../../../utils";

const NoLiveModal = ({
  isOpen,
  setIsOpen,
  setIsNewEntryModalOpen,
  setIds,
  userGameEntry,
}) => {
  if (!isOpen) return;

  const handleClose = () => {
    setIsOpen(false);
    setIds(userGameEntry.id);
    setIsNewEntryModalOpen(true);
  };

  return (
    <Modal
      withoutClose
      isOpen={isOpen}
      title="congrats!"
      className="flex flex-col gap-y-3"
    >
      <div className=" bg-secondary border-[3px] border-secondary-border rounded-[8px] flex items-center justify-around h-[55px]">
        <div className="flex flex-col items-center gap-y-[2px]">
          <p className="uppercase text-label-md">my rank</p>
          <p className="uppercase text-heading-md">{userGameEntry.rank}</p>
        </div>
        <div className=" border-r-[2px] border-primary h-[30px] w-[1px] border-dotted " />
        <div className="flex flex-col items-center gap-y-[2px]">
          <p className="uppercase text-label-md">my prize</p>
          <Coins
            creditCoin={formatNumber(Number(userGameEntry.credit_score))}
            airdropCoin={formatNumber(Number(userGameEntry.airdrop_point))}
          />
        </div>
      </div>
      <Background
        onClick={handleClose}
        bgUrl="/new_design/components_base/win_more_rewards_btn.webp"
        className="flex items-center justify-center uppercase text-secondary text-label-xl w-full h-[50px] mx-auto"
      >
        Win more Rewards?
      </Background>
      <p className="text-center opacity-60 text-label-md">
        Race is ongoing. Your final rank and reward may change when race ends.
      </p>
    </Modal>
  );
};

export default NoLiveModal;
