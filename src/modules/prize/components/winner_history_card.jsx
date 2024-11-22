import Image from "../../../components/ui/image";
import useHashNavigate from "../../../hooks/use_hash_navigate";
import { formatDateToMonth } from "../../../utils";

const WinnerHistoryCard = ({ item }) => {
  const navigate = useHashNavigate();

  const navigateWinnerList = () => {
    navigate("/winner-list", {
      state: { gameDate: item.date, gameType: item.game_type },
    });
  };

  return (
    <div
      className={`border-[3px] border-primary-border bg-gradient-primary h-[55px] w-full rounded-[6px] flex items-center gap-x-3 px-2 ${
        !item.is_processed && "opacity-60"
      } `}
      onClick={navigateWinnerList}
    >
      <Image src="/new_design/icons/winner_icon.webp" className=" h-[28px]" />
      <p className=" text-label-xl">
        {formatDateToMonth(item.date)} Winner List
      </p>
      <div className="flex justify-end flex-1">
        <Image
          src="/new_design/icons/right_arrow_icon.webp"
          className=" h-[20px]"
        />
      </div>
    </div>
  );
};

export default WinnerHistoryCard;
