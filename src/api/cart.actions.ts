import axiosInstance from "@/lib/axios";

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
      data: res.data?.data || [],
      addresses:res.data?.addresses || [],
      message: res.data.message,
      cartSummary:res.data?.cartSummary || null
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
