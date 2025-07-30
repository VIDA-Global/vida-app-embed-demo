import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import {
  APP_NAME,
  VIDA_BUTTON_SCRIPT_SRC,
} from "../config/constants.js";

// The Vida embed script is loaded globally here so that any page can use the
// `data-vida-button` attribute or embed the Vida app iframe.

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: APP_NAME,
  description: "Demo for embedding the Vida app",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script src={VIDA_BUTTON_SCRIPT_SRC} strategy="afterInteractive" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
