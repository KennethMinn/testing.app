import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios/axios_instance";
import { useAuth } from "./use_auth";

export const useLoginWithTg = () => {
  const { setAuth } = useAuth();
  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/logInWithTelegram", data);
      return res.data.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setAuth({
        id: data.user.name,
        username: data.user.telegram_account.username,
        referralLink: data.user.referral_link,
        code: data.user.user_code,
      });
    },
  });
};
