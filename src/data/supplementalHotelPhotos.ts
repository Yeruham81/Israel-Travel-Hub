/**
 * One unique locally stored illustrative neighborhood image for each of the
 * 28 supplemental Jerusalem / Tel Aviv hotels (12 + 16).
 * These are surrounding-area editorial illustrations, NOT representations
 * of the named hotel's actual rooms, building, or facilities.
 * Source photos come from the publisher's connected photo library.
 */
import type { HotelIllustration } from "@/data/telAvivHotelPhotos";

const scene = (id: string, ext: "webp" | "jpg", alt: string): HotelIllustration => ({
  src: `/images/hotel-cards/${id}.${ext}`,
  alt,
  label: "Illustrative neighborhood photograph",
  credit: "Photo from the publisher's reference image library",
});

export const supplementalHotelPhotos: Record<string, HotelIllustration> = {
  "jlm-ibis": scene("jlm-ibis", "webp", "Illustrative cityscape of Jerusalem"),
  "jlm-ibis-styles": scene("jlm-ibis-styles", "webp", "Illustrative Jerusalem downtown shops and street scene"),
  "jlm-david-citadel": scene("jlm-david-citadel", "webp", "Mamilla and Old City surroundings in Jerusalem"),
  "jlm-waldorf": scene("jlm-waldorf", "webp", "Mamilla pedestrian area in central Jerusalem"),
  "jlm-hashimi": scene("jlm-hashimi", "webp", "Old City market lanes in Jerusalem"),
  "jlm-saladin": scene("jlm-saladin", "webp", "Via Dolorosa and its historic Old City surroundings"),
  "jlm-agripas": scene("jlm-agripas", "webp", "Mahane Yehuda market produce and stalls in Jerusalem"),
  "jlm-villa-albi": scene("jlm-villa-albi", "webp", "Illustrative Jerusalem market and arts scene"),
  "jlm-holy-land": scene("jlm-holy-land", "webp", "Jerusalem Old City illuminated after dark"),
  "jlm-st-george": scene("jlm-st-george", "webp", "East Jerusalem residential streets"),
  "jlm-templer-inn": scene("jlm-templer-inn", "webp", "Panoramic view of Jerusalem"),
  "jlm-little-house-baka": scene("jlm-little-house-baka", "webp", "Jerusalem First Station shops and restaurants near Baka"),

  "tlv-dan": scene("tlv-dan", "webp", "Tel Aviv Mediterranean promenade and beachfront"),
  "tlv-royal-beach": scene("tlv-royal-beach", "webp", "Tel Aviv coastline viewed from Jaffa"),
  "tlv-center-chic": scene("tlv-center-chic", "webp", "Dizengoff Street in central Tel Aviv"),
  "tlv-dizengoff-garden": scene("tlv-dizengoff-garden", "webp", "Illustrative central Tel Aviv city view"),
  "tlv-shalom": scene("tlv-shalom", "webp", "Old North area of Tel Aviv"),
  "tlv-tal": scene("tlv-tal", "webp", "Tel Aviv Port waterfront surroundings"),
  "tlv-trieste": scene("tlv-trieste", "webp", "Historic Neve Tzedek neighborhood in Tel Aviv"),
  "tlv-vera": scene("tlv-vera", "webp", "Rothschild Boulevard and city architecture in Tel Aviv"),
  "tlv-setai": scene("tlv-setai", "webp", "Old Jaffa harbor by the Mediterranean Sea"),
  "tlv-margosa": scene("tlv-margosa", "webp", "Historic Jaffa clock tower and square"),
  "tlv-levinski-market": scene("tlv-levinski-market", "webp", "Culinary stalls in south Tel Aviv and Jaffa"),
  "tlv-mulan": scene("tlv-mulan", "webp", "Tel Aviv skyline and urban neighborhoods"),
  "tlv-carmel-beach-house": scene("tlv-carmel-beach-house", "jpg", "HaCarmel Market in Tel Aviv"),
  "tlv-fabric": scene("tlv-fabric", "webp", "Illustrative image of Carmel Market and its surroundings"),
  "tlv-rothschild22": scene("tlv-rothschild22", "webp", "Illustrative Tel Aviv city skyline"),
  "tlv-rothschild71": scene("tlv-rothschild71", "webp", "Modern Tel Aviv architecture and city culture"),
};
