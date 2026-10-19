import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap"
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
  display: "swap"
});

export const metadata = {
  title: "Izabayo Samuel — Full-Stack Developer And Forex Trader from Rwanda",
  description:
    "Portfolio of Izabayo Samuel, a full-stack developer from Rwanda building with React, Vue and Next.js — with an AI assistant you can ask anything.",
  keywords: [
    "Izabayo Samuel",
    "Full-Stack Developer",
    "Forex Trader",
    "Rwanda",
    "React",
    "Vue",
    "Next.js",
    "portfolio"
  ],
  authors: [{ name: "Izabayo Samuel" }],
  openGraph: {
    title: "Izabayo Samuel — Full-Stack Developer from Rwanda And Forex Trader",
    description:
      "Full-Stack developer from Rwanda 🇷🇼. React, Vue, Next.js. Ask my AI anything.",
    type: "website"
  }
};

export const viewport = {
  themeColor: "#06090f",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${firaCode.variable}`}>
      <body>{children}</body>
    </html>
  );
}