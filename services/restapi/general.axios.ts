import { axiosInstance } from "./axiosConfig";

export const retrieveGeneral = async (url: string) => {
  try {
    const finalUrl = url.startsWith("/") ? url : `/${url}`;
    const res = await axiosInstance.get(finalUrl);
    return res.data;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      throw error;
    }
    throw error;
  }
};
  