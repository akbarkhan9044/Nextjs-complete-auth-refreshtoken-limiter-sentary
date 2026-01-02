"use client"
import React, { useState } from 'react';
import { Github, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, Lock, User } from 'lucide-react';
import Link from 'next/link';
import styles from "@/styles/Login.module.css";
import { useRouter } from 'next/navigation';
const Register = () => {
const  router=useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleRegister = async (e) => {
    e.preventDefault(); // Stop the URL from changing
    setIsLoading(true);

    try {
      // Get data safely
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      // Verify the URL exists
      const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
      if (!apiDomain) {
        throw new Error("API Domain is not defined in environment variables");
      }

      const response = await fetch(`${apiDomain}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) { // Check for status 200-299
        router.push("/login");
      } else {
        const err = await response.json();
        alert(err.message || "Registration failed"); // Simple feedback
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("A connection error occurred. Check the console.");
    } finally {
      setIsLoading(false); // Stop the spinner even if it fails
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
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join UniBee and start managing your SaaS</p>
        </div>

        {/* Social Register Section */}
        <div className={styles.socialGrid}>
          <button className={styles.socialBtn}>
            <Github size={18} />
            <span>GitHub</span>
          </button>
          <button className={styles.socialBtn}>
            <span className={styles.googleIcon}>G</span>
            <span>Google</span>
          </button>
        </div>

        <div className={styles.divider}>
          <span>OR REGISTER WITH EMAIL</span>
        </div>

        {/* Form Section */}
        <form className={styles.form} onSubmit={handleRegister}>
          {/* Full Name Field */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Full Name</label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.fieldIcon} />
              <input 
                type="text" 
                name='name'
                id='name'
                placeholder="John Doe" 
                className={styles.input}
                required 
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.fieldIcon} />
              <input 
                type="email" 
                name='email'
                id='email'
                placeholder="name@company.com" 
                className={styles.input}
                required 
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.fieldIcon} />
              <input 
              name='password'
              id='password'
                type={showPassword ? "text" : "password"} 
                placeholder="Create a strong password" 
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
                Create Account <ArrowRight size={18} className={styles.arrow} />
              </>
            )}
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;