import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import AltaDisclaimer from "@/components/AltaDisclaimer";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";
import HomeClosingAI from "@/components/HomeClosingAI";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://homeclosing101.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    "closing costs",
    "first time homebuyer",
    "title search",
    "escrow",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "HomeClosing101",
    title: "HomeClosing101 | Find. Buy. Protect.",
    description:
      "An educational initiative of the American Land Title Association helping homebuyers understand the closing process and protect their property investment.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "HomeClosing101 - Your guide to the home closing process",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeClosing101 | Find. Buy. Protect.",
    description:
      "An educational initiative of the American Land Title Association helping homebuyers understand the closing process and protect their property investment.",
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-alta-navy focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold">
          Skip to main content
        </a>
        {/* Sticky header block: ticker + nav locked together */}
        <div className="sticky top-0 z-50">
          <NewsTicker />
          <Header />
        </div>
        {/* Print-only header */}
        <div className="print-header hidden">
          <span>HomeClosing101</span>
          <span style={{ fontSize: '11px', fontWeight: 400, color: '#6b7280' }}>| An ALTA Educational Initiative</span>
        </div>
        <main id="main-content" className="flex-1 pb-16 sm:pb-14">{children}</main>
        {/* Print-only footer */}
        <div className="print-footer hidden">
          HomeClosing101.org — An educational initiative of the American Land Title Association (ALTA) — homeclosing101.org
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <AltaDisclaimer />
          <Footer />
        </div>
        <ScrollToTop />
        <HomeClosingAI />
      </body>
    </html>
  );
}
