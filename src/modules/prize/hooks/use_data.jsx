import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/react_query";
import {
  getLeaderBoard,
  getWinnerHistory,
  getWinnerHistoryList,
} from "../services";

export const useGetLeaderBoard = ({ gameDate, gameType }) =>
  useQuery({
    queryKey: [QUERY_KEYS.LEADER_BOARD, gameDate, gameType],
    queryFn: () => getLeaderBoard({ gameDate, gameType }),
  });

export const useGetWinnerHistory = ({ gameType }) =>
  useQuery({
    queryKey: [QUERY_KEYS.WINNER_HISTORY, gameType],
    queryFn: () => getWinnerHistory({ gameType }),
  });

export const useGetWinnerHistoryList = ({ gameDate, gameType }) =>
  useQuery({
    queryKey: [QUERY_KEYS.WINNER_HISTORY_LIST, gameDate, gameType],
    queryFn: () => getWinnerHistoryList({ gameDate, gameType }),
  });
