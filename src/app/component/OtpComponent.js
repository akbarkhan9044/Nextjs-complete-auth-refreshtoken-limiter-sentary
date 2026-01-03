import React from 'react'
import { sendOtp } from '../actions/send-otp'
import { auth } from '../config/auth';
import { getOTPForValidation } from '../lib/data';
export default async function OtpComponent() {
    const session=await auth();
    const otp=await sendOtp();
    const forValidation =await getOTPForValidation(session.userinfo.email)
    console.log(otp,forValidation);
  return (
    <div>
      
    </div>
  )
}




