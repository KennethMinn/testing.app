import { useState } from "react";
import { useProfiles } from "../../home/hooks/use_store";
import HistoryType from "../components/history_type";
import { useGetWinnerHistory } from "../hooks/use_data";
import Loading from "../../../components/ui/loading";
import WinnerHistoryCard from "../components/winner_history_card";
import CommonLayout from "../../../layout/common_layout";

const WinnerHistory = () => {
  const { profiles } = useProfiles();
  const gameTypes = profiles?.map((profile) => profile.game_type);
  const [gameType, setGameType] = useState(gameTypes[0]);
  const { data: winnerHistory, isLoading } = useGetWinnerHistory({ gameType });

  const handleChangeType = (direction) => {
    const currentIndex = gameTypes.indexOf(gameType);
    if (direction === "next") {
      const nextIndex = (currentIndex + 1) % gameTypes.length;
      setGameType(gameTypes[nextIndex]);
    } else if (direction === "prev") {
      const prevIndex =
        (currentIndex - 1 + gameTypes.length) % gameTypes.length;
      setGameType(gameTypes[prevIndex]);
    }
  };

  return (
    <CommonLayout>
      <CommonLayout.Header>
        <div className="flex justify-center flex-1">
          <p className="uppercase text-heading-lg">winner history</p>
        </div>
      </CommonLayout.Header>
      <HistoryType gameType={gameType} handleChangeType={handleChangeType} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full gap-y-3">
          {winnerHistory.map((item, i) => (
            <WinnerHistoryCard key={i} item={item} />
          ))}
        </div>
      )}
    </CommonLayout>
  );
};

export default WinnerHistory;
