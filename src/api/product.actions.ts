
import axiosInstance from "@/lib/axios";

export const getProducts = async (page = 1,search?:string,gender?:string,category?:string) => {
  try {
   
    const res = await axiosInstance.get(`/product?page=${page}&size=50&search=${search}&gender=${gender != "all" ? gender : ""}&categoryId=${category != "all" ? category : ""}`);
    console.debug("response",res)
    if (res.data.statusCode == 200) {
      return { success: true, data: res.data?.data || [], message: res.data.message };
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

export const getTrendingProducts = async () => {
  try {
    const res = await axiosInstance.get("/product/trending/home");
    console.log("response",res)
    if (res.data.statusCode == 200) {
      return { success: true, data: res.data?.data || [], message: res.data.message };
    } else {
      return {
        success: false,
        message: res.data.message || "Internal Server Error",
        data:[]
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal Server Error",
      data:[]
    };
  }
};


