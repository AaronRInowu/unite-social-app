import { User } from "@/global/interfaces/users.interface";
import { sendOtpMessage, verifyOtpCode } from "@/services/restapi/users/users.axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface SendOtpParams {
  phone: string;
  filters?: Record<string, string | number>;
  search?: string;
}

interface VerifyOtpParams extends SendOtpParams {
  code: string;
}

export interface IAuthResponse {
  message?: string;
  token?: string;
  accessToken?: string;
  refreshToken?: string | null;
  user?: User;
  data?: unknown;
  [key: string]: unknown;
}

export const useSendOtpMessage = (
  options?: UseMutationOptions<IAuthResponse, Error, SendOtpParams>
) => {
  const mutationKey = ["sendOtpMessage"];
  const mutationFn = async (params: SendOtpParams) => {
    const data = await sendOtpMessage(params.phone);
    return data as IAuthResponse;
  };

  return useMutation<IAuthResponse, Error, SendOtpParams>({
    mutationFn,
    mutationKey,
    ...options,
  });
};

export const useVerifyOtp = (
  options?: UseMutationOptions<IAuthResponse, Error, VerifyOtpParams>
) => {
  const mutationKey = ["verifyOtp"];
  const mutationFn = async (params: VerifyOtpParams) => {
    const data = await verifyOtpCode(params.code, params.phone);
    return data as IAuthResponse;
  };

  return useMutation<IAuthResponse, Error, VerifyOtpParams>({
    mutationFn,
    mutationKey,
    ...options,
  });
};
