"use client";

import {
  LazyHomeClosingAI,
  LazyOnboardingTour,
  LazyScrollToTop,
  LazyClosingFolderButton,
  LazyCookieConsent,
} from "@/components/lazy";

/**
 * Client-side overlays that are never visible on first paint.
 * Loaded lazily with ssr: false to keep them out of the initial
 * server-rendered HTML and the main JS bundle.
 */
export default function LayoutOverlays() {
  return (
    <>
      <LazyScrollToTop />
      <LazyHomeClosingAI />
      <LazyClosingFolderButton />
      <LazyOnboardingTour />
      <LazyCookieConsent />
    </>
  );
}
