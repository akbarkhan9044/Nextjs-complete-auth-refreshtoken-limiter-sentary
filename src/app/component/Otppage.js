'use client';

import { useState, useRef } from 'react';
import styles from "@/styles/Otp.module.css";
import { verifyOtp } from '../actions/verifyotp';
export default function OtpInput() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").slice(0, 6).split("");
    if (data.every(char => !isNaN(char))) {
      const newOtp = [...otp];
      data.forEach((char, index) => {
        newOtp[index] = char;
        if (inputRefs.current[index]) inputRefs.current[index].value = char;
      });
      setOtp(newOtp);
      // Focus the last filled input or the next empty one
      const nextIndex = data.length < 6 ? data.length : 5;
      inputRefs.current[nextIndex].focus();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await verifyOtp(otp.join(""));
      console.log("Response:", result);
    } catch (error) {
      console.error("Failed to send:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            ref={(el) => (inputRefs.current[index] = el)}
            value={data}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            className={styles.input}
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || otp.includes("")}
        className={styles.button}
      >
        {loading ? "Processing..." : "Verify OTP"}
      </button>
    </div>
  );
}