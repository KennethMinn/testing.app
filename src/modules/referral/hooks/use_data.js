import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/react_query";
import { getReferralLists } from "../services";

export const useGetReferralLists = () => 
    useQuery({
        queryKey: [QUERY_KEYS.REFERRAL_LIST],
        queryFn: getReferralLists,
    })