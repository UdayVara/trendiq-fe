import axiosInstance from "@/lib/axios";

export const getMyOrders = async () => {
    try {
        const res = await axiosInstance.get("/stripe/myorders");
        if (res.data.statusCode == 200) {
            return { success: true, data: res.data?.data || [], message: res.data.message };
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
}