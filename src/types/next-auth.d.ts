// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      image: string;
      token: string;
      username:string;
      email:string;
      source: "web" | "google" | "app";
    } 
  }
}
