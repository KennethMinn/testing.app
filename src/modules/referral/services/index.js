import { axiosInstance } from "../../../lib/axios/axios_instance";

export const getReferralLists = async() => {
    const res = await axiosInstance.get('/getUserReferralList');
    return res.data;
} 

