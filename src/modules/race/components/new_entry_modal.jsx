import Background from "../../../components/ui/background";
import Image from "../../../components/ui/image";
import Modal from "../../../components/ui/modal";
import { useTransactions } from "../../../hooks/payment/use_transactions";

const NewEntryModal = ({ isOpen, setIsOpen, gameEntry }) => {
  const { handleEntry } = useTransactions();

  const getNewEntry = () => {
    handleEntry();
    // setIsOpen(false);
  };

  if (!isOpen) return;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="h-[360px] flex flex-col items-center gap-y-3"
      title="new entry"
    >
      <p className="uppercase text-label-xl">buy new entry</p>
      <p className="text-center text-label-lg">
        Get{" "}
        <span className="text-center text-success text-label-lg">
          8 more lives
        </span>{" "}
        and another chance to boost your score!
      </p>
      <div className=" flex flex-col gap-y-2 p-4 bg-secondary rounded-[8px] border-[3px] border-secondary-border w-full">
        <div className="flex items-center gap-x-2">
          <div className=" flex items-center justify-center rounded-full w-[26px] h-[26px] border-[3px] border-secondary-border bg-primary-border">
            <Image src="/new_design/icons/check.webp" className="h-[14px]" />
          </div>
          <p className=" text-label-md">Ads Free</p>
        </div>
        <div className="flex items-center gap-x-2">
          <div className=" flex items-center justify-center rounded-full w-[26px] h-[26px] border-[3px] border-secondary-border bg-primary-border">
            <Image src="/new_design/icons/check.webp" className="h-[14px]" />
          </div>
          <p className=" text-label-md">No Need to buy many SIM cards</p>
        </div>
        <div className="flex items-center gap-x-2">
          <div className=" flex items-center justify-center rounded-full w-[26px] h-[26px] border-[3px] border-secondary-border bg-primary-border">
            <Image src="/new_design/icons/check.webp" className="h-[14px]" />
          </div>
          <p className=" text-label-md">Multiple entry in one account</p>
        </div>
        <div className="flex items-center gap-x-2">
          <div className=" flex-shrink-0 flex items-center justify-center rounded-full w-[26px] h-[26px] border-[3px] border-secondary-border bg-primary-border">
            <Image src="/new_design/icons/check.webp" className="h-[14px]" />
          </div>
          <p className=" text-label-md">
            Airdrop Points{" "}
            <span className=" text-airdrop text-label-md">+100K</span> rewarded
            for each entry.
          </p>
        </div>
        <button
          className="tertiary_bg w-full h-[45px] flex items-center gap-x-2 ps-2 relative mt-2"
          onClick={getNewEntry}
        >
          <Image src="/new_design/icons/stars.webp" className="h-[27px]" />
          <div className="flex flex-col items-start gap-y-0">
            <p className="uppercase text-label text-label-sm">get new entry</p>
            <div className="flex items-end gap-x-1">
              <p className="uppercase text-secondary text-label-xl">
                {Number(gameEntry.discount) > 0
                  ? Number(gameEntry.entry_fee) *
                    (Number(gameEntry.discount) / 100)
                  : gameEntry?.entry_fee}{" "}
                Stars
              </p>
              <div className="relative">
                <p className="uppercase text-label-sm text-secondary">
                  {gameEntry.entry_fee} stars
                </p>
                <Image
                  src="/new_design/components_base/strike.webp"
                  className="absolute h-[10px] top-[0px]"
                />
              </div>
            </div>
          </div>
          {Number(gameEntry.discount) && (
            <Background
              bgUrl="/new_design/components_base/corner_ribbon.webp"
              className=" w-[40px] h-[30px] absolute right-[0px] top-[-2px]"
            >
              <div className="relative">
                <p className="uppercase absolute text-label-xs rotate-[37deg] top-[7px] right-0">
                  {gameEntry.discount}% off
                </p>
              </div>
            </Background>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default NewEntryModal;
