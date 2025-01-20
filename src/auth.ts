import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
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
        console.log("Credentials", credentials);
        try {
          if (isSignup == "true") {
            // signup code
            const res = await axiosInstance.post("/auth/signup", {
              username,
              email,
              password,
            });
            console.log(res.data)
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
            const res = await axiosInstance.post("/auth/signin", {
              email,
              password,
            });
console.log(res,"res")
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
          throw new Error(error.message || "Something went wrong");
        }
      },
    }),
  ],
  secret: "dfsdfsdfsd",
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
