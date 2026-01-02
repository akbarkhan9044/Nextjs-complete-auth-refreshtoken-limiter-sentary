import styles from "@/styles/Login.module.css";
import { Github, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { doSocialLogin } from "../actions/login";

export default function SocialLogin() {
  return (
 
         <form
         action={doSocialLogin}
         className={styles.socialGrid}>
          <button
          type="submit"
          value="github"
         name="action"
          className={styles.socialBtn}>
            <Github size={18} />
            <span>GitHub</span>
          </button>
          <button
          type="submit"
          value="google"
          name="action"
          className={styles.socialBtn}>
            <span className={styles.googleIcon}>G</span>
            <span>Google</span>
          </button>
        </form>

  )
}
