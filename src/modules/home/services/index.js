import { axiosInstance } from "../../../lib/axios/axios_instance";

export const getSmashGameProfiles = async () => {
  const res = await axiosInstance.get("/getSmashGameProfiles");
  return res.data.data;
};
