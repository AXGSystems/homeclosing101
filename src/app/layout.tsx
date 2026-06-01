import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import AltaDisclaimer from "@/components/AltaDisclaimer";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";
import RouteScrollToTop from "@/components/RouteScrollToTop";
import ClosingFolderProvider from "@/components/ClosingFolderProvider";
import AchievementProvider from "@/components/AchievementSystem";
import LayoutOverlays from "@/components/LayoutOverlays";
import StickyBottomAd from "@/components/StickyBottomAd";
import SponsorFooterStrip from "@/components/SponsorFooterStrip";
import IndustryPartnersStrip from "@/components/IndustryPartnersStrip";
import AnalyticsProvider from "@/components/Analytics";
import FeedbackWidget from "@/components/FeedbackWidget";
import { SiteConfigProvider } from "@/components/SiteConfigProvider";
import RouteGuard from "@/components/RouteGuard";
import { ModuleGate, AdGate } from "@/components/Gate";
import "./globals.css";

/**
 * Pre-hydration gate script: runs before first paint, reads the cached
 * off-key list (or the previewed version's list when ?v= is present) and
 * injects a <style> hiding those units. Flash-free + hydration-safe — the
 * server always renders everything ON and CSS does the hiding.
 */
const GATE_BOOT_SCRIPT = `(function(){try{var off=[];var m=/[?&]v=(full|moderate|light|streamlined|education)/.exec(location.search);if(m){var by=JSON.parse(localStorage.getItem('hc101-cc-offbyver')||'{}');off=by[m[1]]||[];}else{off=JSON.parse(localStorage.getItem('hc101-cc-off')||'[]');}if(off&&off.length){var css=off.map(function(k){return '[data-gate="'+String(k).replace(/["\\\\]/g,'')+'"]{display:none!important}';}).join('');var s=document.createElement('style');s.id='hc-gate-style';s.textContent=css;document.head.appendChild(s);document.documentElement.setAttribute('data-hc-off',off.join(' '));}}catch(e){}})();`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <script dangerouslySetInnerHTML={{ __html: GATE_BOOT_SCRIPT }} />
        <SiteConfigProvider>
        <AnalyticsProvider>
        <AchievementProvider>
        <ClosingFolderProvider>
          <RouteScrollToTop />
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-alta-navy focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold">
            Skip to main content
          </a>
          {/* Sticky header block: ticker + nav locked together */}
          <div className="sticky top-0 z-50">
            <ModuleGate name="NewsTicker"><NewsTicker /></ModuleGate>
            <Header />
          </div>
          {/* Print-only header */}
          <div className="print-header hidden">
            <span>HomeClosing101</span>
            <span style={{ fontSize: '11px', fontWeight: 400, color: '#6b7280' }}>| An ALTA Educational Initiative</span>
          </div>
          <main id="main-content" className="flex-1 pb-16 sm:pb-14">
            <RouteGuard>{children}</RouteGuard>
          </main>
          {/* Print-only footer */}
          <div className="print-footer hidden">
            HomeClosing101 — An educational initiative of the American Land Title Association (ALTA) — homeclosing101.vercel.app
          </div>
          <ModuleGate name="IndustryPartnersStrip"><IndustryPartnersStrip /></ModuleGate>
          <ModuleGate name="SponsorFooterStrip"><SponsorFooterStrip /></ModuleGate>
          <AltaDisclaimer />
          <Footer />
          <LayoutOverlays />
          <ModuleGate name="FeedbackWidget"><FeedbackWidget /></ModuleGate>
          <AdGate name="StickyBottomAd"><StickyBottomAd /></AdGate>
        </ClosingFolderProvider>
        </AchievementProvider>
        </AnalyticsProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
