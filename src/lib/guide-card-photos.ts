import { travelGuides, type GuideDirectoryEntry } from "@/data/travelGuides";
import { airportJourneyGuides, type AirportJourneyId } from "@/data/airportJourneyGuides";
import { photoIdentity } from "@/lib/photo-uniqueness";
import { itineraries, type ItineraryId } from "@/data/israelItineraries";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import telAvivDizengoff from "@/assets/tel-aviv/dizengoff.webp";
import haifaBotanica from "@/assets/haifa/botanica.webp";

/** Editorially verified local alternatives when two guides share a cover image. */
const guideCardAlternatives: Record<string, { src: string; alt: string }[]> = {
  arrival: [{ src: "/images/guides/airport-taxi-sign.webp", alt: "Airport taxi entrance sign at Ben Gurion Airport" }],
  airportTaxis: [{ src: "/images/guides/airport-taxi-sign.webp", alt: "Taxi wayfinding sign at Ben Gurion Airport" }],
  uber: [{ src: "/images/guides/taxi-in-tel-aviv.webp", alt: "Licensed white taxis with yellow roof signs in Tel Aviv" }],
  taxiFares: [{ src: "/images/guides/taxi-in-tel-aviv.webp", alt: "Licensed white taxis in Tel Aviv" }],
  telAviv: [{ src: telAvivDizengoff, alt: "Dizengoff area streets in central Tel Aviv, useful for exploring the city" }],
  "stay-haifa": [{ src: haifaBotanica, alt: "Boutique hotel in Haifa, illustrating accommodation options in the city" }],
};

/**
 * Choose one relevant local photograph for every card, not just the first
 * available photograph for each card in isolation. A naive greedy selection can
 * exhaust a shared hero even when an earlier card has an alternative. The
 * augmenting-path assignment below preserves unique image identities and
 * reallocates those earlier covers to make room for later guides.
 */
export function uniqueGuideCardPhotos<T extends { guide: GuideDirectoryEntry }>(
  entries: T[],
  reservedPhotos: string[] = [],
): Array<T & { cardPhoto?: { src: string; alt: string } }> {
  const reserved = new Set(reservedPhotos.filter(Boolean).map(photoIdentity));
  const options = entries.map(({ guide }) => {
    const article = travelGuides[guide.id as keyof typeof travelGuides];
    const journeyId = guide.id.startsWith("airport-journey-")
      ? guide.id.replace("airport-journey-", "") as AirportJourneyId
      : undefined;
    const journey = journeyId ? airportJourneyGuides[journeyId] : undefined;
    const itineraryId = guide.id.startsWith("israel-itinerary-")
      ? guide.id.replace("israel-itinerary-", "") as ItineraryId
      : undefined;
    const itinerary = itineraryId ? itineraries[itineraryId] : undefined;
    const candidates = [
      guide.photo,
      ...(article?.sections.flatMap(section => [
        section.photo,
        ...(section.subsections || []).map(subsection => subsection.photo),
      ]) || []),
      journey?.photos?.station,
      journey?.photos?.onward,
      ...(itinerary?.daysPlan.map(day => migrationPhotos[day.image]) || []),
      ...(guideCardAlternatives[guide.id] || []),
    ];
    const seen = new Set<string>();
    return candidates.filter((photo): photo is { src: string; alt: string } => {
      if (!photo?.src) return false;
      const key = photoIdentity(photo.src);
      if (reserved.has(key) || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  });

  const ownerByPhoto = new Map<string, number>();
  const match = (index: number, visited: Set<string>): boolean => {
    for (const photo of options[index] || []) {
      const key = photoIdentity(photo.src);
      if (visited.has(key)) continue;
      visited.add(key);
      const previousOwner = ownerByPhoto.get(key);
      if (previousOwner === undefined || match(previousOwner, visited)) {
        ownerByPhoto.set(key, index);
        return true;
      }
    }
    return false;
  };
  entries.forEach((_, index) => { match(index, new Set()); });
  const selected: Array<{ src: string; alt: string } | undefined> = Array(entries.length).fill(undefined);
  for (const [key, index] of ownerByPhoto) selected[index] = options[index]?.find(photo => photoIdentity(photo.src) === key);
  return entries.map((entry, index) => {
    const cardPhoto = selected[index];
    return { ...entry, ...(cardPhoto ? { cardPhoto } : {}) };
  });
}

