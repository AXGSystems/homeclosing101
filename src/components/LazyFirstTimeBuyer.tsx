"use client";

import {
  LazyExpandableTimeline,
  LazyLoanComparisonChart,
} from "@/components/lazy";

export function DeferredTimeline() {
  return <LazyExpandableTimeline />;
}

export function DeferredLoanChart() {
  return <LazyLoanComparisonChart />;
}
