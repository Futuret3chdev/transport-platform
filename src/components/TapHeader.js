"use client";

import Image from "next/image";
import styles from "../styles/booking.module.css";

export default function TapHeader() {
  return (
    <header className={styles.tapHeader}>
      {/* Left: Logo + Product */}
      <div className={styles.tapHeaderLeft}>
        <Image
          src="/tplogo.png"
          alt="Tap Packages"
          width={42}
          height={42}
          priority
        />
        <div className={styles.tapBrand}>
          <span className={styles.tapName}>TAP</span>
          <span className={styles.tapProduct}>Packages</span>
          <span className={styles.tapSub}>Business Logistics</span>
        </div>
      </div>

      {/* Center: TAP Switcher */}
      <nav className={styles.tapNav}>
        <button className={styles.tapNavItem}>Trips</button>
        <button className={styles.tapNavItem}>Actions</button>
        <button
          className={`${styles.tapNavItem} ${styles.tapNavActive}`}
        >
          Packages
        </button>
      </nav>

      {/* Right: Auth buttons */}
      <div className={styles.tapHeaderRight}>
        <button className={styles.tapLogin}>Sign in</button>
        <button className={styles.tapSignup}>Sign up</button>
      </div>
    </header>
  );
}
