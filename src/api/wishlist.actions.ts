import { getUserClient } from "@/actions/auth.actions";
import axiosInstance from "@/lib/axios";

export const getWishlist = async () => {
  try {
    const user = await getUserClient();
    if(!user?.user || !user){
        return {success:false,data:[],message:"Auth Required"}
    }
    const res = await axiosInstance.get("/wishlist");
    if (res.data.statusCode == 200) {
      return {
        success: true,
        data: res.data?.data || [],
        message: res.data.message,
      };
    } else {
      return {
        success: false,
        message: res.data.message || "Internal Server Error",
        data: [],
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};

export const createWishlist = async (productId: string) => {
  try {
    const res = await axiosInstance.post("/wishlist", { productId });
    if (res.data.statusCode == 201) {
      return {
        success: true,
        data: res.data?.data || [],
        message: res.data.message,
      };
    } else {
      return {
        success: false,
        message: res.data.message || "Internal Server Error",
        data: [],
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};
export const deleteWishlist = async (productId: string) => {
  try {
    const res = await axiosInstance.delete(`/wishlist/${productId}`);
    if (res.data.statusCode == 201) {
      return {
        success: true,
        data: res.data?.data || [],
        message: res.data.message,
      };
    } else {
      return {
        success: false,
        message: res.data.message || "Internal Server Error",
        data: [],
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};
