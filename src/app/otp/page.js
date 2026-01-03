import React, { Suspense } from 'react'
import OtpComponent from '../component/OtpComponent'

export default async function Otp() {
  
  return (
    <div>
      <Suspense>
        <OtpComponent/>
      </Suspense>
    </div>
  )
}
