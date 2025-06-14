import axiosInstance from "@/lib/axios";
import { Address } from "@/types/address";
import { CartItem, CartSummary } from "@/types/cart";

export const getCart = async () => {
    try {
        
   
  const res = await axiosInstance.get("/cart",{
    headers: {
      'cache-Control': 'no-store', 
    },
  });

  if (res.data.statusCode == 200) {
    return {
      success: true,
      data: res.data?.data as CartItem[] || [],
      addresses:res.data?.addresses as Address[] || [],
      message: res.data.message ,
      cartSummary:res.data?.cartSummary as CartSummary || null
    };
  } else {
    return {
      success: false,
      message: res.data.message || "Internal Server Error",
      addresses:[],
      data: [],
      cartSummary:null
    };
  } } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Internal Server Error",
            data: [],
            addresses:[],
            cartSummary:null,
        }
  }
};


export const getCartCount = async() => {
    try {
        const res = await axiosInstance.get("/cart/count");
        if (res.data.statusCode == 200) {
            return { success: true, count: res.data?.count || 0, message: res.data.message };
        } else {
            return {
                success: false,
                message: res.data.message || "Internal Server Error",
                count: res.data?.count || 0
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Internal Server Error",
            count:  0
        };
    }
}
