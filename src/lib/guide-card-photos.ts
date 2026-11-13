import { travelGuides, type GuideDirectoryEntry } from "@/data/travelGuides";
import { airportJourneyGuides, type AirportJourneyId } from "@/data/airportJourneyGuides";
import { photoIdentity } from "@/lib/photo-uniqueness";
import { itineraries, type ItineraryId } from "@/data/israelItineraries";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import telAvivDizengoff from "@/assets/tel-aviv/dizengoff.webp";
import haifaBotanica from "@/assets/haifa/botanica.webp";
import jerusalemMamilla from "@/assets/jerusalem/mamilla.webp";
import telAvivRothschild from "@/assets/tel-aviv/rothschild.webp";
import tiberiasWaterfront from "@/assets/tiberias/waterfront.webp";
import haifaPort from "@/assets/home/haifa-port.webp";
import roadTrip from "@/assets/home/road-trip.webp";
import jerusalemDowntown from "@/assets/jerusalem/downtown.webp";
import tiberiasSunrise from "@/assets/tiberias/sunrise.webp";
import deadSeaSunbeds from "@/assets/dead-sea/sunbeds.webp";
import caesareaHero from "@/assets/home/hero-caesarea.webp";
import jerusalemNavon from "@/assets/airport-journeys/jerusalem-navon-platform.webp";
import airportArrival from "@/assets/airport-transfers/airport.webp";
import jerusalemGermanColony from "@/assets/jerusalem/german-colony.webp";
import telAvivNorth from "@/assets/tel-aviv/old-north.webp";
import tiberiasHeritage from "@/assets/tiberias/heritage.webp";
import deadSeaPool from "@/assets/dead-sea/pool.webp";
import masadaCableCar from "@/assets/home/masada-cable-car.webp";
import airportDriver from "@/assets/airport-transfers/moshe.webp";
import israeliTaxiCabs from "@/assets/guides/taxi-cabs-israel.webp";
import israeliTaxiRoofSign from "@/assets/guides/israeli-taxi-roof-sign.webp";

/** Editorially verified local alternatives when two guides share a cover image. */
const guideCardAlternatives: Record<string, { src: string; alt: string }[]> = {
  arrival: [{ src: "/images/guides/airport-taxi-sign.webp", alt: "Airport taxi entrance sign at Ben Gurion Airport" }],
  airportTaxis: [{ src: "/images/guides/airport-taxi-sign.webp", alt: "Taxi wayfinding sign at Ben Gurion Airport" }, { src: airportArrival, alt: "Ben Gurion Airport pickup and transport area" }, { src: airportDriver, alt: "Airport transportation driver, illustrating an arranged vehicle pickup" }],
  uber: [
    { src: israeliTaxiRoofSign, alt: "Illuminated Hebrew taxi roof sign on an Israeli cab" },
    { src: "/images/guides/taxi-in-tel-aviv.webp", alt: "Licensed white taxis with yellow roof signs in Tel Aviv" },
  ],
  taxiFares: [
    { src: israeliTaxiCabs, alt: "A line of licensed white taxis on an Israeli city street" },
    { src: "/images/guides/taxi-in-tel-aviv.webp", alt: "Licensed taxis waiting in Tel Aviv" },
  ],
  shabbat: [
    { src: "/images/hotels/jerusalem-night.webp", alt: "Jerusalem city lights after dark, illustrating Shabbat evening travel" },
    { src: airportArrival, alt: "Ben Gurion Airport exterior and pickup area" },
  ],
  telAviv: [{ src: telAvivDizengoff, alt: "Dizengoff area streets in central Tel Aviv, useful for exploring the city" }],
  "stay-haifa": [{ src: haifaBotanica, alt: "Boutique hotel in Haifa, illustrating accommodation options in the city" }],
  "attraction-old-city-jerusalem": [{ src: jerusalemMamilla, alt: "Mamilla district at the approach to Jerusalem's Old City" }],
  "attraction-attractions-in-tel-aviv": [{ src: telAvivRothschild, alt: "Rothschild Boulevard, an area for exploring Tel Aviv's city attractions" }],
  "attraction-sea-of-galilee": [{ src: tiberiasWaterfront, alt: "Tiberias waterfront on the Sea of Galilee" }],
  "attraction-haifa": [{ src: haifaPort, alt: "Haifa port and waterfront district" }],
  travelTips: [{ src: roadTrip, alt: "Road trip through Israel, illustrating practical trip planning" }],
  calendar: [{ src: jerusalemDowntown, alt: "Downtown Jerusalem, a setting for local events and city activities" }],
  yardenit: [{ src: tiberiasSunrise, alt: "Sunrise over the Sea of Galilee near the southern Jordan River region" }],
  deadSea: [{ src: deadSeaSunbeds, alt: "Sun loungers along the Dead Sea hotel coast" }],
  topTen: [{ src: caesareaHero, alt: "Ancient coastal ruins at Caesarea, one of Israel's visitor attractions" }],
  israel: [{ src: jerusalemNavon, alt: "Train platform at Jerusalem Yitzhak Navon station for travel in Israel" }],

  "stay-jerusalem": [{ src: jerusalemGermanColony, alt: "German Colony neighborhood, a Jerusalem accommodation area" }],
  "stay-telaviv": [{ src: telAvivNorth, alt: "Old North neighborhood of Tel Aviv with nearby accommodation" }],
  "stay-tiberias": [{ src: tiberiasHeritage, alt: "Tiberias historic center near hotel districts" }],
  "stay-deadsea": [{ src: deadSeaPool, alt: "Resort pool in the Dead Sea hotel region" }],
  masada: [{ src: masadaCableCar, alt: "Cable car at Masada overlooking the desert region" }],
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
    const valid = candidates.filter((photo): photo is { src: string; alt: string } => {
      if (!photo?.src) return false;
      const key = photoIdentity(photo.src);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    // Avoid reusing the page hero when another genuine image is available.
    // But displaying the guide's real cover is better than a blank card when
    // it is the only option. Matching still prevents repeats between cards.
    return [...valid.filter(photo => !reserved.has(photoIdentity(photo.src))),
      ...valid.filter(photo => reserved.has(photoIdentity(photo.src)))];
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

