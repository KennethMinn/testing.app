import { axiosInstance } from "../../../lib/axios/axios_instance";
import { getQuery } from "../../../utils";

export const getLeaderBoard = async ({ gameDate, gameType }) => {
  const query = getQuery({ gameDate, gameType });
  const res = await axiosInstance.get(`/getPreviousLeaderboardList${query}`);
  return res.data.data;
};

export const getWinnerHistory = async ({ gameType }) => {
  const res = await axiosInstance.get(`/getPreviousLeaderboard/${gameType}`);
  return res.data.data;
};

export const getWinnerHistoryList = async ({ gameDate, gameType }) => {
  const res = await axiosInstance.get(
    `/getPreviousLeaderboardList/${gameDate}/${gameType}`
  );
  return res.data.data;
};
