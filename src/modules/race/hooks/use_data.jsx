import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/react_query";
import { getGameEntries, getUserGameEntries } from "../services";

export const useGetUserGameEntries = (query) =>
  useQuery({
    staleTime: 0,
    queryKey: [
      QUERY_KEYS.USER_GAME_ENTRIES,
      query.game_type,
      query.game_profile_id,
    ],
    queryFn: () => getUserGameEntries(query),
  });

export const useGetGameEntry = () =>
  useQuery({
    queryKey: [QUERY_KEYS.GAME_ENTRY],
    queryFn: getGameEntries,
    select: (data) => data.find((item) => Number(item.entry_fee) > 0),
  });
