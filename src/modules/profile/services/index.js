import { axiosInstance } from "../../../lib/axios/axios_instance";

export const transferCreditScore = async (data) => {
  const res = await axiosInstance.post("/transferCreditScore", data);
  return res.data;
};

export const verifyOTP = async (data) => {
  const res = await axiosInstance.post("/verifyOTPToTransferCreditScore", data);
  return res.data;
};

export const resendOTP = async (data) => {
  const res = await axiosInstance.post("/resendOTPToTransferCreditScore", data);
  return res.data;
};

export const limitCreditScore = async (data) => {
  const res = await axiosInstance.post("/limitCreditScore", data);
  return res.data;
};
