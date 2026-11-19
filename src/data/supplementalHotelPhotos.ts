/**
 * One unique locally stored illustrative neighborhood image for each of the
 * 34 supplemental Jerusalem / Tel Aviv hotels (18 + 16).
 * These are surrounding-area editorial illustrations, NOT representations
 * of the named hotel's actual rooms, building, or facilities.
 * Source photos come from the publisher's connected photo library.
 */
import type { HotelIllustration } from "@/data/telAvivHotelPhotos";
import jerusalemNight from "@/assets/travel-blog-hub/jerusalem-night-443d64981d-420.webp";
import downtownStreet from "@/assets/travel-blog-hub/downtown-944eb9d46b-420.webp";
import mahaneMarket from "@/assets/travel-blog-hub/mahane-yehuda-c53a05ac52-420.webp";
import foodMarkets from "@/assets/tours-hub/food-markets.webp";
import germanColonyStreet from "@/assets/travel-blog-hub/colony-35429f7d31-420.webp";
import marketBakery from "@/assets/guides/2026-10/food-7.webp";

const jerusalemScene = (src: string, alt: string): HotelIllustration => ({
  src, alt, label: "Illustrative Jerusalem neighborhood photograph",
  credit: "Photograph from the local Jerusalem image library",
});


const scene = (id: string, ext: "webp" | "jpg", alt: string): HotelIllustration => ({
  src: `/images/hotel-cards/${id}.${ext}`,
  alt,
  label: "Illustrative neighborhood photograph",
  credit: "Photo from the publisher's reference image library",
});

export const supplementalHotelPhotos: Record<string, HotelIllustration> = {
  "jlm-ibis": jerusalemScene(downtownStreet, "Downtown Jerusalem streets and stone buildings near Jaffa Road"),
  "jlm-ibis-styles": jerusalemScene("/images/hotel-cards/jlm-ibis-styles.webp", "Historic stone shopping passage in Jerusalem"),
  "jlm-paamonim": jerusalemScene(jerusalemNight, "Jerusalem skyline illuminated after dark"),
  "jlm-eldan": jerusalemScene("/images/attractions/old-jerusalem-tower-of-david.webp", "Tower of David by Jaffa Gate, a landmark near King David Street"),
  "jlm-christ-church": jerusalemScene("/images/attractions/old-jerusalem-holy-sepulchre.webp", "Historic Church of the Holy Sepulchre inside Jerusalem's Old City"),
  "jlm-brown-machne": jerusalemScene(marketBakery, "Freshly baked sesame pastries at a local market bakery"),
  "jlm-national-hotel": jerusalemScene("/images/attractions/old-jerusalem-via-dolorosa.webp", "Historic stone market lanes in Jerusalem's northern Old City"),
  "jlm-dan-boutique": jerusalemScene("/images/jerusalem/mount-zion/mount-zion-hillside.webp", "Mount Zion hillside near the First Station and southern Jerusalem"),
  "jlm-david-citadel": scene("jlm-david-citadel", "webp", "Mamilla and Old City surroundings in Jerusalem"),
  "jlm-waldorf": scene("jlm-waldorf", "webp", "Mamilla pedestrian area in central Jerusalem"),
  "jlm-hashimi": scene("jlm-hashimi", "webp", "Old City market lanes in Jerusalem"),
  "jlm-saladin": scene("jlm-saladin", "webp", "Via Dolorosa and its historic Old City surroundings"),
  "jlm-agripas": jerusalemScene(mahaneMarket, "Mahane Yehuda Market in central Jerusalem"),
  "jlm-villa-albi": jerusalemScene(foodMarkets, "Colorful market stalls and food in Jerusalem"),
  "jlm-holy-land": scene("jlm-holy-land", "webp", "Jerusalem Old City illuminated after dark"),
  "jlm-st-george": scene("jlm-st-george", "webp", "East Jerusalem residential streets"),
  "jlm-templer-inn": jerusalemScene(germanColonyStreet, "Street scene in Jerusalem's German Colony"),
  "jlm-little-house-baka": scene("jlm-little-house-baka", "webp", "Illustrative Jerusalem city view near southern neighborhoods"),

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
  "tlv-rothschild22": scene("tlv-rothschild22", "webp", "Illustrative Tel Aviv streets and urban cycling"),
  "tlv-rothschild71": scene("tlv-rothschild71", "webp", "Modern Tel Aviv architecture and city culture"),
};
