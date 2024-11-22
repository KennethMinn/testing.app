import { useLocation } from "react-router-dom";
import { useGetWinnerHistoryList } from "../hooks/use_data";
import { formatDateToMonth } from "../../../utils";
import Loading from "../../../components/ui/loading";
import LeaderBoard from "../components/leader_board";
import CommonLayout from "../../../layout/common_layout";

const WinnerList = () => {
  const { state } = useLocation();
  const { data: winnerList, isLoading } = useGetWinnerHistoryList({
    gameDate: state.gameDate,
    gameType: state.gameType,
  });


  return (
    <CommonLayout>
      <CommonLayout.Header>
        <div className="flex justify-center flex-1">
          <div className="flex flex-col items-center gap-y-1">
            <p className="uppercase text-heading-lg">
              {formatDateToMonth(state.gameDate)}
            </p>
            <p className="uppercase text-label-lg">Winner List</p>
          </div>
        </div>
      </CommonLayout.Header>
      {isLoading ? <Loading /> : <LeaderBoard leaderboard={winnerList} />}
    </CommonLayout>
  );
};

export default WinnerList;
