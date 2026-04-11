import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import AltaDisclaimer from "@/components/AltaDisclaimer";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";
import HomeClosingAI from "@/components/HomeClosingAI";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HomeClosing101 | Find. Buy. Protect.",
    template: "%s | HomeClosing101",
  },
  description:
    "An educational initiative of the American Land Title Association helping homebuyers understand the closing process and protect their property investment.",
  keywords: [
    "home closing",
    "title insurance",
    "real estate closing",
    "property rights",
    "ALTA",
    "homebuyer education",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-alta-navy">
        {/* Sticky header block: ticker + nav locked together */}
        <div className="sticky top-0 z-50">
          <NewsTicker />
          <Header />
        </div>
        <main className="flex-1 pb-14">{children}</main>
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <AltaDisclaimer />
          <Footer />
        </div>
        <HomeClosingAI />
      </body>
    </html>
  );
}
