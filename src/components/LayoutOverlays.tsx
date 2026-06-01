"use client";

import {
  LazyHomeClosingAI,
  LazyOnboardingTour,
  LazyScrollToTop,
  LazyClosingFolderButton,
} from "@/components/lazy";
import { ModuleGate } from "@/components/Gate";

/**
 * Client-side overlays that are never visible on first paint.
 * Loaded lazily with ssr: false to keep them out of the initial
 * server-rendered HTML and the main JS bundle. Each is gated by its
 * module key so the Control Center can switch it off.
 */
export default function LayoutOverlays() {
  return (
    <>
      <ModuleGate name="ScrollToTop"><LazyScrollToTop /></ModuleGate>
      <ModuleGate name="HomeClosingAI"><LazyHomeClosingAI /></ModuleGate>
      <ModuleGate name="ClosingFolderButton"><LazyClosingFolderButton /></ModuleGate>
      <ModuleGate name="OnboardingTour"><LazyOnboardingTour /></ModuleGate>
    </>
  );
}
