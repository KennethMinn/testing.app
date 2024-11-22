import { axiosInstance } from "../../../lib/axios/axios_instance";


export const getTaskList = async() => {
    const res = await axiosInstance.get("/getSocialGiveaways");
    return res.data;
} 