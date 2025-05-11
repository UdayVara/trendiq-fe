import axiosInstance from "@/lib/axios";

export const getUser = async () => {
    try {
        const res = await axiosInstance.get("/get-user-details");
        if (res.data.statusCode == 200) {
            return {success:true,data:res.data?.data || {},message:res.data.message}
        } else {
            return {success:false,data:{},message:res.data.message}
        }
    } catch (error:any) {
        
        return {success:false,data:{},message:error?.message || "Something went wrong"}
    }
}

export const updatePassword = async(data:{password:string,newPassword:string}) => {
    try {
        const res = await axiosInstance.post("/update-password",data);
        if (res.data.statusCode == 201) {
            return {success:true,message:res.data.message}
        } else {
            return {success:false,data:{},message:res.data.message}
        }
    } catch (error:any) {
        
        return {success:false,data:{},message:error?.message || "Something went wrong"}
    }
}