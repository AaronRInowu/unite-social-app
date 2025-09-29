import { axiosInstance } from "./axiosConfig";

export const retrieveGeneral = async (url: string) => {
  try {
    const finalUrl = url.startsWith("/") ? url : `/${url}`;
    console.log(process.env.EXPO_PUBLIC_API_URL);
    console.log(finalUrl);
    const res = await axiosInstance.get(finalUrl);
    return res;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw error;
  }
};
