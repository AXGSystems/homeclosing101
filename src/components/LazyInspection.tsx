"use client";

import {
  LazyExpandableInspectionAreas,
  LazyExpandableInspectionTiles,
} from "@/components/lazy";

export function DeferredInspectionAreas() {
  return <LazyExpandableInspectionAreas />;
}

export function DeferredInspectionTiles() {
  return <LazyExpandableInspectionTiles />;
}
