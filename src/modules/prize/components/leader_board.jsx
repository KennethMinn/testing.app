import LeaderBoardCard from "./leader_board_card";

const LeaderBoard = ({ leaderboard }) => {
  const topUserRanks = leaderboard.leaderboards.slice(0, 3);
  const restUsersRanks = leaderboard.leaderboards.slice(3);
  const myRanks = leaderboard.player_ranks;

  return (
    <div className="flex flex-col w-full gap-y-3">
      {topUserRanks?.map((item, i) => (
        <LeaderBoardCard item={item} key={i} theme="primary" />
      ))}
      {myRanks?.map((item, i) => (
        <LeaderBoardCard item={item} key={i} theme="focus" />
      ))}
      {restUsersRanks?.map((item, i) => (
        <LeaderBoardCard item={item} key={i} theme="primary" />
      ))}
    </div>
  );
};

export default LeaderBoard;
