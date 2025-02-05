import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import axiosInstance from "./lib/axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, email, password, isSignup } = credentials as {
          email: string;
          password: string;
          isSignup: string;
          username: string;
        };
        try {
          if (isSignup == "true") {
            // signup code
            const res = await axiosInstance.post(`/signup`, {
              username,
              email,
              password,
            });
            if (res.data.statusCode === 201) {
              return {
                username: res.data.user.username,
                email: res.data.user.email,
                token: res.data.token,
                image: "",
                id: res.data.user.id,
              };
            } else {
              throw new Error(res.data.message || "Something went wrong");
            }
          } else {
            const res = await axiosInstance.post(`/signin`, {
              email,
              password,
            });
            if (res.data.statusCode === 201) {
              return {
                username: res.data.user.username,
                email: res.data.user.email,
                token: res.data.token,
                image: "",
                id: res.data.user.id,
              };
            } else {
              throw new Error(res.data.message || "Something went wrong");
            }
          }
        } catch (error: any) {
          console.log("Auth Error",error);
          throw new Error(error.message || "Something went wrong");
        }
      },
    }),
  ],
  trustHost: true,
  callbacks: {
    jwt(params) {
      if(params.user){
        params.token.user = params.user

      }

      return params.token
    },
    session(params:any) {
      if(params.token.user){
        params.session.user = params.token.user 
      }

      return params.session
    },
  }
});
