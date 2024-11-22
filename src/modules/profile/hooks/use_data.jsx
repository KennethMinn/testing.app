import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  limitCreditScore,
  resendOTP,
  transferCreditScore,
  verifyOTP,
} from "../services";
import { QUERY_KEYS } from "../../../lib/react_query";

export const useTransferCreditScore = () => {
  return useMutation({
    mutationFn: (data) => transferCreditScore(data),
  });
};

export const useVerify = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => verifyOTP(data),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.POINTS]);
    },
  });
};

export const useResend = () => {
  return useMutation({
    mutationFn: (data) => resendOTP(data),
  });
};

export const useLimitCreditScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => limitCreditScore(data),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.POINTS]);
    },
  });
};
