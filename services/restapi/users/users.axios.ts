import { User } from "@/global/interfaces/users.interface";
import axios from "axios";
import { axiosInstance } from "../axiosConfig";
const baseEndpoint = '/users';

export const sendOtpMessage = async (phoneNumber: string) => {
  try {
    console.log("baseEndpoint", `${process.env.EXPO_PUBLIC_API_URL}${baseEndpoint}/verify/otp-sms`);
    const res = await axiosInstance.post(`${baseEndpoint}/verify/otp-sms`, { phone: phoneNumber });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error message:", error.message);
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
      throw error;
    }
    throw error as Error;
  }
};

export const verifyOtpCode = async (code: string, phone: string) => {
  try {
    console.log("baseEndpoint", `${process.env.EXPO_PUBLIC_API_URL}${baseEndpoint}/verify/otp-verify`);
    const res = await axiosInstance.post(`${baseEndpoint}/login/phone`, { code, phone });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error message:", error.message);
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
      throw error;
    }
    throw error as Error;
  }
};

export const updateUser = async (data: Partial<User>) => {
  try {
    const res = await axiosInstance.patch(`${baseEndpoint}/${data.id}`, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error message:", error.message);
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
      throw error;
    }
    throw error as Error;
  }
};
