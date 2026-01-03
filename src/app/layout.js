import React from 'react'
import HeroBanner from './component/HeroBanner'

export default function Mainlayout({children}) {
  return (
    <html lang='en'>
      <body>
    <HeroBanner/>
        <main>{children}</main>
      </body>
    </html>
  )
}
