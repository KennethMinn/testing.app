import { useGetLeaderBoard } from "../hooks/use_data";
import Image from "../../../components/ui/image";
import { useProfiles } from "../../home/hooks/use_store";
import { useState } from "react";
import { formatNumber } from "../../../utils";
import PrizeType from "../components/prize_type";
import PrizeHeader from "../components/prize_header";
import Loading from "../../../components/ui/loading";
import LeaderBoard from "../components/leader_board";
// import { leaderboard } from "../../../constants";
import CommonLayout from "../../../layout/common_layout";

const Prize = () => {
  const { profiles } = useProfiles();
  const gameTypes = profiles?.map((profile) => profile.game_type);
  const [gameType, setGameType] = useState(gameTypes[0]);
  const currentProfile = profiles.find(
    (profile) => profile.game_type.toUpperCase() === gameType.toUpperCase()
  );
  // const isLoading = false;

  const { data: leaderboard, isLoading } = useGetLeaderBoard({
    gameDate: "20241002",
    gameType: gameType.toUpperCase(),
  });

  console.log(leaderboard);

  const creditScorePrizePool = formatNumber(
    Number(currentProfile?.prize_pool[0]?.amount)
  );

  const airdropPrizePool = formatNumber(
    Number(
      currentProfile?.prize_pool[0]?.prize_lines.reduce(
        (pv, cv) => pv + cv.airdrop_point,
        0
      )
    )
  );

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
        <p className="uppercase text-heading-lg">prize</p>
        <Image
          src="/new_design/icons/prize_info_icon.webp"
          className="h-[30px]"
        />
      </CommonLayout.Header>
      <PrizeType handleChangeType={handleChangeType} gameType={gameType} />
      <PrizeHeader
        airdropPrizePool={airdropPrizePool}
        creditScorePrizePool={creditScorePrizePool}
      />
      {isLoading ? <Loading /> : <LeaderBoard leaderboard={leaderboard} />}
    </CommonLayout>
  );
};

export default Prize;
