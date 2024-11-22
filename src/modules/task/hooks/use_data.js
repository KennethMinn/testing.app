import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/react_query";
import { getTaskList } from "../services";

export const useGetTaskList = () => 
    useQuery({
        queryKey: [QUERY_KEYS.TASK_LIST],
        queryFn: getTaskList,
    });
