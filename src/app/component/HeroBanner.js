import styles from "@/styles/HeroBanner.module.css";

import { doLogOut } from "../actions/login";
const HeroBanner = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>
        Mid-Season Madness Sale
      </h1>
      <button className={styles.button}>
        Logout
      </button>
    </div>
  );
};

export default HeroBanner;