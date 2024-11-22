import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../lib/react_query";
import { axiosInstance } from "../lib/axios/axios_instance";

export const useGetPoints = () =>
  useQuery({
    staleTime: 0,
    queryKey: [QUERY_KEYS.POINTS],
    queryFn: async () => {
      const res = await axiosInstance.get("/getPointData");
      return res.data.data;
    },
    select: (data) => data.point,
  });
