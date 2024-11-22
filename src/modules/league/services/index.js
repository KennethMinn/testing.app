import { axiosInstance } from "../../../lib/axios/axios_instance";
import { getQuery } from "../../../utils";

export const getAirdropLeagues = async () => {
  const res = await axiosInstance.get("/getAirdropLeagues");
  return res.data.data;
};

export const getAirdropLeagueMembers = async ({ league_name, limit = 100 }) => {
  const query = getQuery({ league_name, limit });
  const res = await axiosInstance.get(`/getAirdropLeagueMembers${query}`);
  return res.data.data;
};
