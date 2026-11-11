import { travelGuides, type GuideDirectoryEntry } from "@/data/travelGuides";
import { airportJourneyGuides, type AirportJourneyId } from "@/data/airportJourneyGuides";
import { photoIdentity } from "@/lib/photo-uniqueness";

/**
 * Use different photos inside one recommendation grid, including when image
 * paths are alternate sizes/formats of the same underlying photograph.
 * Prefer another relevant photo from that guide; never use a different subject
 * merely to fill an image slot. If no distinct photo exists, keep a text card.
 */
export function uniqueGuideCardPhotos<T extends { guide: GuideDirectoryEntry }>(
  entries: T[],
  reservedPhotos: string[] = [],
): Array<T & { cardPhoto?: { src: string; alt: string } }> {
  const used = new Set(reservedPhotos.filter(Boolean).map(photoIdentity));
  return entries.map(entry => {
    const article = travelGuides[entry.guide.id as keyof typeof travelGuides];
    const journeyId = entry.guide.id.startsWith("airport-journey-")
      ? entry.guide.id.replace("airport-journey-", "") as AirportJourneyId
      : undefined;
    const journey = journeyId ? airportJourneyGuides[journeyId] : undefined;
    const candidates = [
      entry.guide.photo,
      ...(article?.sections.map(section => section.photo) || []),
      journey?.photos?.station,
      journey?.photos?.onward,
    ];
    const cardPhoto = candidates.find(photo => photo?.src && !used.has(photoIdentity(photo.src)));
    if (cardPhoto) used.add(photoIdentity(cardPhoto.src));
    return { ...entry, ...(cardPhoto ? { cardPhoto } : {}) };
  });
}

