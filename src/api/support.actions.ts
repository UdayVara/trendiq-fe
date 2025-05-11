import axiosInstance from "@/lib/axios";

export const addSupportTicket = async(val:{subject:string,message:string}) =>  {
    try {
        const res = await axiosInstance.post("/support",val);
        if(res.data?.statusCode == 201){
            return {success:true,data:res.data?.data || {},message:res.data.message}
        }else{
            return {success:false,data:{},message:res.data.message}
        }
    } catch (error:any) {
        return {success:false,data:{},message:error?.message ||"Something went wrong"}
    }
}