import { useEffect, useState } from "react";
import Image from "../../../components/ui/image";
import Background from "../../../components/ui/background";
import NewEntryModal from "./new_entry_modal";
import NoLiveModal from "./no_life_modal";
import { useNoLiveModalStore } from "../hooks/use_store";

const NewEntryButton = ({ gameEntry, userGameEntry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNoLifeModalOpen, setIsNoLifeModalOpen] = useState(false);
  const { ids, setIds } = useNoLiveModalStore();

  useEffect(() => {
    if (
      userGameEntry &&
      userGameEntry.life === 0 &&
      !ids.includes(userGameEntry?.id)
    ) {
      setIsNoLifeModalOpen(true);
    }
  }, [ids, userGameEntry]);

  if (!gameEntry) return;

  return (
    <>
      <NoLiveModal
        setIsNewEntryModalOpen={setIsOpen}
        isOpen={isNoLifeModalOpen}
        setIsOpen={setIsNoLifeModalOpen}
        setIds={setIds}
        userGameEntry={userGameEntry}
      />
      <NewEntryModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        gameEntry={gameEntry}
      />
      <button
        className="tertiary_bg w-[50%] h-[45px] flex items-center gap-x-2 ps-2 relative"
        onClick={() => setIsOpen(true)}
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
    </>
  );
};

export default NewEntryButton;
