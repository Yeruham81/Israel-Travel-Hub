import type { GuideDirectoryEntry } from "@/data/travelGuides";
/**
 * Editorial cards use exactly the destination page's primary/hero image.
 * Never substitute a subsection image to conceal main-photo duplication.
 */
export function uniqueGuideCardPhotos<T extends { guide: GuideDirectoryEntry }>(
  entries: T[],
  _reservedPhotos: string[] = [],
): Array<T & { cardPhoto?: { src: string; alt: string } }> {
  return entries.map(entry => ({
    ...entry,
    ...(entry.guide.photo ? { cardPhoto: entry.guide.photo } : {}),
  }));
}
