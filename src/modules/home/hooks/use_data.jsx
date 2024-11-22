import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/react_query/index";
import { getSmashGameProfiles } from "../services";

export const useGetSmashGameProfiles = () =>
  useQuery({
    queryKey: [QUERY_KEYS.PROFILES],
    queryFn: getSmashGameProfiles,
  });
