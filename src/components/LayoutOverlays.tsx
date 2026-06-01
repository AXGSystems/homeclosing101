"use client";

import { usePathname } from "next/navigation";
import {
  LazyHomeClosingAI,
  LazyOnboardingTour,
  LazyScrollToTop,
  LazyClosingFolderButton,
  LazyCookieConsent,
} from "@/components/lazy";
import { ModuleGate } from "@/components/Gate";

/**
 * Client-side overlays that are never visible on first paint.
 * Loaded lazily with ssr: false to keep them out of the initial
 * server-rendered HTML and the main JS bundle. Each is gated by its
 * module key so the Control Center can switch it off.
 *
 * None of this public-site chrome renders on /admin — the onboarding tour
 * is a full-screen overlay that would otherwise intercept every click in
 * the admin Control Center.
 */
export default function LayoutOverlays() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <>
      <ModuleGate name="ScrollToTop"><LazyScrollToTop /></ModuleGate>
      <ModuleGate name="HomeClosingAI"><LazyHomeClosingAI /></ModuleGate>
      <ModuleGate name="ClosingFolderButton"><LazyClosingFolderButton /></ModuleGate>
      <ModuleGate name="OnboardingTour"><LazyOnboardingTour /></ModuleGate>
      {/* Cookie consent is a compliance element — always rendered (not gated). */}
      <LazyCookieConsent />
    </>
  );
}
