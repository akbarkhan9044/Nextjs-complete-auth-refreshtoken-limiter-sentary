"use client"
import React, { useState } from 'react';
import { Github, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import styles from "@/styles/Login.module.css";
import Link from 'next/link';
import SocialLogin from '../component/SocialLogin';
import { credentialLogin } from '../actions/login';
import { useRouter } from 'next/navigation';
const Login = () => {
const router=useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
 let data=new FormData(e.target);
 data=Object.fromEntries(data);




 const res=await credentialLogin(data);

 if(!!res.error){
    console.log(res.error);
 }else{
 router.push("/");

 }

   }catch(error){
    console.log(error);
    setIsLoading(false);
   }
  };

  return (
    <div className={styles.container}>
      {/* Background Ambient Glows */}
      <div className={`${styles.glow} ${styles.glow1}`}></div>
      <div className={`${styles.glow} ${styles.glow2}`}></div>

      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoBox}>
            <ShieldCheck size={28} color="white" strokeWidth={2.5} />
          </div>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Enter your details to access your account</p>
        </div>
    <SocialLogin/>
        <div className={styles.divider}>
          <span>OR CONTINUE WITH EMAIL</span>
        </div>

        {/* Form Section */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.fieldIcon} />
              <input 
                type="email" 
                id='email'
                name='email'
                placeholder="name@company.com" 
                className={styles.input}
                required 
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label className={styles.label}>Password</label>
              <a href="#" className={styles.forgotLink}>Forgot password?</a>
            </div>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.fieldIcon} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                name='password'
                id='password'
                className={styles.input}
                required
              />
              <button 
                type="button" 
                className={styles.togglePass}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              <>
                Sign In <ArrowRight size={18} className={styles.arrow} />
              </>
            )}
          </button>
        </form>

        <p className={styles.footerText}>
          Don't have an account? <Link href="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;