import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import styles from "../styles/booking.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TapPackages – Smart Transport Booking",
  description: "Instant transport pricing and provider matching",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Google Maps / Places */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&v=beta&loading=async`}
          strategy="afterInteractive"
        />

        {/* ===== Header / Brand Bar ===== */}
        <header className={styles.brandHeader}>
          <div className={styles.brandInner}>
            <img
              src="/tplogo.png"
              alt="TapPackages"
              className={styles.brandLogo}
            />
            <span className={styles.brandName}></span>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
