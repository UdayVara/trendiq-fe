"use client"
import { getUserClient } from "@/actions/auth.actions";
import axiosInstance from "@/lib/axios";
import { Banner } from "@/types/banner";
import { Product, SearchedProduct } from "@/types/product";
import { Wishlist } from "@/types/wishlist";

export const getProducts = async (page = 1,pageSize?:number,search?:string | null,gender?:string,category?:string) => {
  try {
    const user = await getUserClient()
    const res = await axiosInstance.get(`/product?page=${page}&size=${pageSize}&search=${search}&gender=${gender != "all" ? gender : ""}&categoryId=${category != "all" ? category : ""}${user?.user?.email? `&userEmail=${user?.user?.email}` : ""}`);
    if (res.data.statusCode == 200) {
      return { success: true, data: res.data?.data as Product[] || [], message: res.data.message,wishlist:res.data.wishlist as Wishlist[] || [],totalCount:res.data.totalCount };
    } else {
      return {
        success: false,
        message: res.data.message || "Internal Server Error",
        data:[],
        wishlist:[],totalCount:0
      };
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message || "Internal Server Error",
      data:[],
      wishlist:[],totalCount:0
    };
  }
};

export const getTrendingProducts = async (gender:"male"|"female") => {
  try {
    const res = await axiosInstance.get("/product/trending/home?gender="+gender);
    if (res.data.statusCode == 200) {
      return { success: true, data: res?.data?.data as Product[] || [], message: res.data.message,banner:res?.data?.banner as Banner[] || [] };
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
      return { success: true, data: res.data?.data as SearchedProduct[] || [], message: res.data.message};
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

export const getSingleProudct = async(id:string,email?:string | undefined | null) =>{
  try {
    const res = await axiosInstance.get(`/product/${id}?email=${email || null}`);
    if (res.data.statusCode == 200) {
      return { success: true, data: res.data?.data as any || {}, message: res.data.message};
    } else {
      return {
        success: false,
        message: res.data.message || "Internal Server Error",
        data:{}
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal Server Error",
      data:{}
    };
  }
}


