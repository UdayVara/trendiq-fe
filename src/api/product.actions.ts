"use client"
import { getUserClient } from "@/actions/auth.actions";
import axiosInstance from "@/lib/axios";

export const getProducts = async (page = 1,search?:string | null,gender?:string,category?:string) => {
  try {
    const user = await getUserClient()
    const res = await axiosInstance.get(`/product?page=${page}&size=50&search=${search}&gender=${gender != "all" ? gender : ""}&categoryId=${category != "all" ? category : ""}${user?.user?.email? `&userEmail=${user?.user?.email}` : ""}`);
    if (res.data.statusCode == 200) {
      return { success: true, data: res.data?.data || [], message: res.data.message,wishlist:res.data.wishlist || [] };
    } else {
      return {
        success: false,
        message: res.data.message || "Internal Server Error",
        data:[]
      };
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message || "Internal Server Error",
      data:[]
    };
  }
};

export const getTrendingProducts = async (gender:"male"|"female") => {
  try {
    const res = await axiosInstance.get("/product/trending/home?gender="+gender);
    if (res.data.statusCode == 200) {
      return { success: true, data: res.data?.data || [], message: res.data.message,banner:res?.data?.banner || [] };
    } else {
      return {
        success: false,
        message: res.data.message || "Internal Server Error",
        data:[],
        banner:[]
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal Server Error",
      data:[],
      banner:[]
    };
  }
};
export const getSearchProducts = async (gender:"male"|"female") => {
  try {
    const res = await axiosInstance.get("/product/home/search-products?gender="+gender);
    if (res.data.statusCode == 200) {
      return { success: true, data: res.data?.data || [], message: res.data.message};
    } else {
      return {
        success: false,
        message: res.data.message || "Internal Server Error",
        data:[],
        banner:[]
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal Server Error",
      data:[],
      banner:[]
    };
  }
};


