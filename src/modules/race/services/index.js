import { axiosInstance } from "../../../lib/axios/axios_instance";
import { getQuery } from "../../../utils";

export const getUserGameEntries = async (query) => {
  const res = await axiosInstance.get(`/getUserGameEntries${getQuery(query)}`);
  return res.data.data;
};

export const getGameEntries = async () => {
  const res = await axiosInstance.get("/getGameEntries");
  return res.data.data;
};
