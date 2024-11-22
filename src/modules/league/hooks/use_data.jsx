import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/react_query";
import { getAirdropLeagueMembers, getAirdropLeagues } from "../services";

export const useGetAirdropLeagues = () =>
  useQuery({
    queryKey: [QUERY_KEYS.AIRDROP_LEAGUES],
    queryFn: getAirdropLeagues,
  });

export const useGetAirdropLeagueMembers = ({ league_name }) =>
  useQuery({
    queryKey: [QUERY_KEYS.AIRDROP_LEAGUE_MEMBERS, league_name],
    queryFn: () => getAirdropLeagueMembers({ league_name }),
  });
