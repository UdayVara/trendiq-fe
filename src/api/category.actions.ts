import axiosInstance from "@/lib/axios";
import { Category } from "@/types/category";

export const getCategories = async (gender:string) => {
  try {
    const res = await axiosInstance.get(`/category?gender=${gender}`);
    if (res.data.statusCode == 200) {
      return {
        success: true,
        data: res.data?.data as Category[] || [],
        message: res.data.message,
      };
    } else {
      return { success: false, data: [], message: res.data.message };
    }
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error?.message || "Something went wrong",
    };
  }
};
