import React from 'react'
import { sendOtp } from '../actions/send-otp'
import { auth } from '../config/auth';
import { getOTPForValidation } from '../lib/data';
import OtpInput from './Otppage';
export default async function OtpComponent() {
    const session=await auth();
    const otp=await sendOtp();
    console.log("OTP",otp);
    //const forValidation =await getOTPForValidation(session.userinfo.email)
    //console.log(otp,forValidation);
  return (
    <div>
        <OtpInput/>
    </div>
  )
}




