import { travelGuides, type GuideDirectoryEntry } from "@/data/travelGuides";
import { airportJourneyGuides, type AirportJourneyId } from "@/data/airportJourneyGuides";
import { photoIdentity } from "@/lib/photo-uniqueness";

/** Editorially verified local alternatives when two guides share a cover image. */
const guideCardAlternatives: Record<string, { src: string; alt: string }[]> = {
  arrival: [{ src: "/images/guides/airport-taxi-sign.webp", alt: "Airport taxi entrance sign at Ben Gurion Airport" }],
  airportTaxis: [{ src: "/images/guides/airport-taxi-sign.webp", alt: "Taxi wayfinding sign at Ben Gurion Airport" }],
  uber: [{ src: "/images/guides/taxi-in-tel-aviv.webp", alt: "Licensed white taxis with yellow roof signs in Tel Aviv" }],
  taxiFares: [{ src: "/images/guides/taxi-in-tel-aviv.webp", alt: "Licensed white taxis in Tel Aviv" }],
};

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
      ...(guideCardAlternatives[entry.guide.id] || []),
    ];
    const cardPhoto = candidates.find(photo => photo?.src && !used.has(photoIdentity(photo.src)));
    if (cardPhoto) used.add(photoIdentity(cardPhoto.src));
    return { ...entry, ...(cardPhoto ? { cardPhoto } : {}) };
  });
}

