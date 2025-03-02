
import { getUserClient } from "@/actions/auth.actions";
import { auth } from "@/auth";
import axios from "axios";


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/user` 
  : "https://trendiq-backend.onrender.com/api/v1/user",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let access_token: string = '';
    const isServer = typeof window === 'undefined'
    if (isServer) {
      const userObj = await auth();
      const user = userObj?.user
      if (user) {
        access_token = user?.token  || ''
      }
    } else {
      if(typeof localStorage !== 'undefined'){
        const user = await getUserClient()
        access_token = user?.user?.token || ''
      }
    }
    console.log(access_token)
    if (access_token) {
      if (!config.headers["authorization"]) {
        config.headers.authorization = `Bearer ${access_token}`;
      } else {
        config.headers.authorization = `Bearer ${access_token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async function (error) {
    console.log('axios error:', error);
    console.log("Axios Response : ",error.response.data)
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default axiosInstance;
