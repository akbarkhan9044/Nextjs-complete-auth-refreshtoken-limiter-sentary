"use server"
import { Resend } from "resend";
import { Logger } from "../lib/logger";
import { generateOTP } from "../lib/otp"
import { connectDatabase } from "../config/db";
import OTP from "../model/OtoModel";
import { auth } from "../config/auth";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendOtp(){
    const session=await auth();
    await connectDatabase();
    const otp=await generateOTP();
    await OTP.deleteMany({email:session.userinfo.email});

    await OTP.create({email:session.userinfo.email,otp:otp});


    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'akbarkhan904412@gmail.com',
        subject: 'Your Verification Code',
        html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
      });
    Logger.debug("Otp has been sent",{opt:otp});
    return {message:"Successfully sent"};
}