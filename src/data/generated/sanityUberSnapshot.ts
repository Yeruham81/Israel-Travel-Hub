/**
 * Committed fallback: no Sanity snapshot is selected by default.
 * An explicit build-time snapshot replaces this file only in the CI workspace.
 * This avoids API calls in visitors' browsers and protects all existing pages.
 */
import type { TravelGuide } from "@/data/travelGuides";
import type { SourceReference } from "@/data/registry";

export const sanityUberGuide: TravelGuide | null = null;
export const sanityUberSources: SourceReference[] = [];
