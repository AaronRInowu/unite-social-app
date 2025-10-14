import { IbasePaginatedResponse } from "@/global/interfaces/general.interface";
import { axiosInstance } from "./axiosConfig";

export const retrieveGeneral = async <T>(url: string) => {
  try {
    const finalUrl = url.startsWith("/") ? url : `/${url}`;
    const res = await axiosInstance.get(finalUrl);
    return res.data as IbasePaginatedResponse<T>;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      throw error;
    }
    throw error;
  }
};
