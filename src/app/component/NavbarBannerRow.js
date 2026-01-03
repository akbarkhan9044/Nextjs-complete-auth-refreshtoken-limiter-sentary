import styles from '@/styles/NavbarBanner.module.css';

// OPTION A: Compact Row (Recommended for Navbars)
export const NavbarBannerRow = () => {
  return (
    <div className={styles.containerRow}>
      <div className={styles.textCompact}>
        New Season Arrivals!
      </div>
      <button className={styles.buttonBlack}>
        Shop Now
      </button>
    </div>
  );
};

// OPTION B: Stacked Column (For taller navbars)
export const NavbarBannerCol = () => {
    return (
      <div className={styles.containerCol}>
        <div>
            <div className={styles.textStacked}>
              FLASH SALE
            </div>
            <div className={styles.subText}>
                Limited time offer ends soon.
            </div>
        </div>
        <button className={styles.buttonBlack} style={{width: '100%'}}>
          UNLOCK 20% OFF
        </button>
      </div>
    );
  };