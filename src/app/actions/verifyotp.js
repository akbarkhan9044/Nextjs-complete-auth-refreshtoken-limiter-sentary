"use server"
import { redirect } from "next/navigation";
import { connectDatabase } from "../config/db"
import OTP from "../model/OtoModel";
import { auth } from "../config/auth";
export async function verifyOtp(email,otp){
    const session=await auth();
    try{
        await connectDatabase();
        const checkOtpForTheUser=await OTP.findOne({email:session.userinfo.email});
        if(checkOtpForTheUser === otp){
          redirect("/");
        }else{
            throw new Error("Unable to veriify otp")
        }
    }catch(error){
      return error;
    }
}