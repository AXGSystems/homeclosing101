"use client";

import dynamic from "next/dynamic";

/* ──────────────────────────────────────────────────────────────
   Lazy-loaded client components — deferred from the initial JS
   bundle with ssr: false so they only load in the browser after
   the page shell renders.  Each component listed here is either
   below the fold or an overlay / modal that is never visible on
   first paint.
   ────────────────────────────────────────────────────────────── */

// Page-level heavy expandable components
export const LazyExpandableTimeline = dynamic(
  () => import("@/components/ExpandableTimeline"),
  { ssr: false }
);

export const LazyExpandableInspectionAreas = dynamic(
  () => import("@/components/ExpandableInspectionAreas"),
  { ssr: false }
);

export const LazyExpandableInspectionTiles = dynamic(
  () => import("@/components/ExpandableInspectionTiles"),
  { ssr: false }
);

export const LazyLoanComparisonChart = dynamic(
  () => import("@/components/LoanComparisonChart"),
  { ssr: false }
);

// Layout-level overlay components (never visible on first paint)
export const LazyHomeClosingAI = dynamic(
  () => import("@/components/HomeClosingAI"),
  { ssr: false }
);

export const LazyOnboardingTour = dynamic(
  () => import("@/components/OnboardingTour"),
  { ssr: false }
);

export const LazyScrollToTop = dynamic(
  () => import("@/components/ScrollToTop"),
  { ssr: false }
);

export const LazyClosingFolderButton = dynamic(
  () => import("@/components/ClosingFolderButton"),
  { ssr: false }
);
