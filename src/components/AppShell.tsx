"use client";

import { usePathname } from "next/navigation";
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

/**
 * AppShell — renders the full public-site chrome (header, footer, sponsors,
 * AI assistant, providers, analytics) ONLY on real content pages.
 *
 * On the SSO gate pages (/login, /auth/*) — the only routes an unauthenticated
 * visitor can reach — it renders the page BARE: no AI/DASH chat orb, no nav that
 * lists the site's routes, no sponsors, no analytics. This is what keeps the
 * locked-down site from leaking any tool or branding through the login screen.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const bare = pathname === "/login" || pathname.startsWith("/auth");

  if (bare) return <>{children}</>;

  return (
    <SiteConfigProvider>
      <AnalyticsProvider>
        <AchievementProvider>
          <ClosingFolderProvider>
            <RouteScrollToTop />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-alta-navy focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
            >
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
              <span style={{ fontSize: "11px", fontWeight: 400, color: "#6b7280" }}>| An ALTA Educational Initiative</span>
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
  );
}
