"use server"
import { auth, signIn, signOut } from "@/auth";

export const signinAction = async (values: {
  email: string;
  password: string;
}) => {
  try {
      await signIn("credentials", {
      ...values,
      username: "",
      isSignup: false,
      redirect: false,
    });

    return { success: true, message: "User Sign in successfully" };
  } catch (error: any) {
    return { success: false, message: error.cause.err.message || "Something went wrong" };
  }
};
export const signupAction = async (values: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
     await signIn("credentials", {
      ...values,
      isSignup: true,
      redirect: false,
    });

    return { success: true, message: "User Sign up successfully" };
  } catch (error: any) {
    console.log(error)
    return { success: false, message: error.cause.err.message || "Something went wrong" };
  }
};

export const signOutAction = async () => {

    try {
         await signOut({redirect: false})
        return {success:true,message:"Signed out successfully"}
    } catch (error : any) {
        return {success:false,message:error.message || "Something went wrong"}
    }
}

export const getUserClient = async () => {
  return await auth()
}
