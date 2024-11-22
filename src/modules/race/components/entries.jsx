import { useState } from "react";
import Background from "../../../components/ui/background";
import Image from "../../../components/ui/image";
import Modal from "../../../components/ui/modal";
import { useCurrentProfile } from "../../home/hooks/use_store";
import EntryCard from "./entry_card";
import Loading from "../../../components/ui/loading";
import useHashNavigate from "../../../hooks/use_hash_navigate";

const Entries = ({ userGameEntry, userGameEntries, isLoading }) => {
  const navigate = useHashNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useCurrentProfile();

  const handleEnterEntry = (entry) => {
    setIsOpen(false);
    navigate(`/race/${entry.id}`);
  };

  return (
    <>
      <Modal
        className=" h-[400px]"
        isOpen={isOpen}
        title="entry list"
        label={profile?.game_type}
        onClose={() => setIsOpen(false)}
      >
        {isLoading ? (
          <div className="items-center justify-center h-full ">
            <Loading />
          </div>
        ) : (
          <div className="h-full overflow-y-auto ">
            <div className="flex flex-col gap-y-3">
              {userGameEntries?.map((item, i) => (
                <EntryCard
                  key={i}
                  item={item}
                  onClick={() => handleEnterEntry(item)}
                />
              ))}
            </div>
          </div>
        )}
      </Modal>
      <Background
        onClick={() => setIsOpen(true)}
        bgUrl="/new_design/components_base/entry_dropdown.webp"
        className="flex items-center justify-center w-[160px] h-[50px]"
      >
        <div className="flex items-center gap-x-2">
          <p className=" text-label-lg">{userGameEntry?.name}</p>
          <Image
            src="/new_design/icons/entry_down_arrow.webp"
            className="h-[15px]"
          />
        </div>
      </Background>
    </>
  );
};

export default Entries;
