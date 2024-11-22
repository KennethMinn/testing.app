import { useCurrentProfile, usePrizePool } from "../../home/hooks/use_store";
import RaceHeader from "../components/race_header";
import { useGetGameEntry, useGetUserGameEntries } from "../hooks/use_data";
import Entries from "../components/entries";
import RaceInfo from "../components/race_info";
import RaceDetail from "../components/race_detail";
import Loading from "../../../components/ui/loading";
import CommonLayout from "../../../layout/common_layout";
import { useParams } from "react-router-dom";

const Race = () => {
  const { id } = useParams();
  const { prizePool } = usePrizePool();
  const { profile } = useCurrentProfile();
  const game_type = profile?.game_type;
  const game_profile_id = profile?.id;
  const { data: userGameEntries, isUserGameEntriesLoading } =
    useGetUserGameEntries({
      game_type,
      game_profile_id,
    });
  const { data: gameEntry, isLoading: isGameEntryLoading } = useGetGameEntry();

  if (isUserGameEntriesLoading || isGameEntryLoading) return <Loading />;

  const userGameEntry =
    userGameEntries?.find((item) => item.id === id) || userGameEntries?.[0];

  return (
    <CommonLayout>
      <CommonLayout.Header>
        <div className="flex justify-center flex-1">
          <RaceHeader profile={profile} prizePool={prizePool} />
        </div>
      </CommonLayout.Header>
      <Entries
        userGameEntry={userGameEntry}
        userGameEntries={userGameEntries}
        isLoading={false}
      />
      <RaceInfo userGameEntry={userGameEntry} />
      <RaceDetail userGameEntry={userGameEntry} gameEntry={gameEntry} />
    </CommonLayout>
  );
};

export default Race;
