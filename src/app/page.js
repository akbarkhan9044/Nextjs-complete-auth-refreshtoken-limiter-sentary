import React,{Suspense} from 'react'
import Login from './login/page'
import { auth } from './config/auth'
import Logout from './component/Logout';
import FakeProduct from './component/FakeProduct';
import styles from "@/styles/Product.module.css";
import UserStatus from './component/UserStatus';

export default async function Langing() {   

  return (
    <div>

    <Suspense fallback="Loading">
    <FakeProduct/>
    </Suspense>
     <Logout/>
    </div>
  )
}
