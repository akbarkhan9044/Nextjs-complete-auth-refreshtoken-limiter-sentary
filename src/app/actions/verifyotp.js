"use server"
import { redirect } from "next/navigation";
import { connectDatabase } from "../config/db"
import OTP from "../model/OtoModel";
import { auth } from "../config/auth";
export async function verifyOtp(otp){
    const session=await auth();
    let isSuccess=false;
    try{
        await connectDatabase();
        const checkOtpForTheUser=await OTP.findOne({email:session.userinfo.email});
        console.log("Getting otp for verfication",checkOtpForTheUser);
        if(checkOtpForTheUser.otp === otp){
            console.log("Equal");
            isSuccess=true;
    
        }else{
            console.log("Not Equal");
            throw new Error("Unable to veriify otp")
        }
    }catch(error){
      return error;
    }
    if(isSuccess){
        redirect("/");
    }
}