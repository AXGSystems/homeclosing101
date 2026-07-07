import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppShell from "@/components/AppShell";
import "./globals.css";

/**
 * Pre-hydration gate script: runs before first paint, reads the cached
 * off-key list (or the previewed version's list when ?v= is present) and
 * injects a <style> hiding those units. Flash-free + hydration-safe — the
 * server always renders everything ON and CSS does the hiding.
 */
const GATE_BOOT_SCRIPT = `(function(){try{var off=[];var m=/[?&]v=(full|moderate|industry|light|streamlined|education)/.exec(location.search);if(m){var by=JSON.parse(localStorage.getItem('hc101-cc-offbyver')||'{}');off=by[m[1]]||[];}else{off=JSON.parse(localStorage.getItem('hc101-cc-off')||'[]');}if(off&&off.length){var css=off.map(function(k){return '[data-gate="'+String(k).replace(/["\\\\]/g,'')+'"]{display:none!important}';}).join('');var s=document.createElement('style');s.id='hc-gate-style';s.textContent=css;document.head.appendChild(s);document.documentElement.setAttribute('data-hc-off',off.join(' '));}}catch(e){}})();`;

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

// HC101 is a PRIVATE, ultra-admin-only environment. Metadata is intentionally
// BLANK/generic and hard-noindexed — no title, description, keywords, or OG data
// that could surface in Google or an AI search. Crawlers only ever reach /login.
export const metadata: Metadata = {
  title: "Private",
  description: "",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": 0,
      "max-image-preview": "none",
      "max-video-preview": 0,
    },
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
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
