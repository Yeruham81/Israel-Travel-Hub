/**
 * Hotel catalogue illustrations use only photos stored in this project.
 * These are genuine Tel Aviv/Jaffa area views, not pictures of the named hotels.
 * Source and licence links remain outbound information, never image hotlinks.
 */
import heroTelAviv from "@/assets/home/hero-tel-aviv.webp";
import gordonBeach from "@/assets/home/tel-aviv-coast-card.webp";
import alternateBeachView from "@/assets/home/hero-refresh-tel-aviv-coastline-medium.webp";
import jaffaHarbor from "@/assets/home/hero-refresh-jaffa-port-v4-medium.webp";
import jaffaCard from "@/assets/attractions-hub/card-jaffa-420.webp";
import cityTaxi from "@/assets/travel-blog-hub/taxi-in-tel-aviv-44a5c4426c-420.webp";
import saronaStreet from "@/assets/home/hero-refresh-tel-aviv-sarona-medium.webp";

import telAvivCoast from "@/assets/home/tel-aviv-coast.webp";
import beachesTelAviv from "@/assets/guides/2026-10/beaches-in-tel-aviv.webp";
import kerem from "@/assets/tel-aviv/kerem-hateimanim.webp";

export type HotelIllustration = {
  src: string;
  alt: string;
  label: string;
  credit: string;
  sourceUrl?: string;
  licenseUrl?: string;
};

const district = (src: string, alt: string): HotelIllustration => ({
  src,
  alt,
  label: "Illustrative Tel Aviv area photograph",
  credit: "Photograph from the site's local Tel Aviv image collection",
});

export const telAvivHotelPhotos: Record<string, HotelIllustration> = {
  "tlv-carlton": {
    src: heroTelAviv,
    alt: "Tel Aviv's Mediterranean promenade and beachfront",
    label: "Tel Aviv city photograph",
    credit: "FLASHPACKER TRAVELGUIDE · CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Tel_Aviv_Tayelet-Strand-Promenade_Beach_(34257299744).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  "tlv-embassy": district(
    alternateBeachView,
    "Central Tel Aviv beachfront and Mediterranean coastal views",
  ),
  "tlv-backstage": district(
    "/images/city-stays/tel-aviv-dizengoff.webp",
    "Dizengoff Square in central Tel Aviv",
  ),
  "tlv-cinema": district(
    "/images/hotel-cards/tlv-cinema.webp",
    "Illustrative urban architecture and culture in central Tel Aviv",
  ),
  "tlv-port-tower": {
    src: telAvivCoast,
    alt: "Tel Aviv's coastline photographed from Jaffa",
    label: "Tel Aviv city photograph",
    credit: "Ariel Manor · CC BY 2.5",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:PikiWiki_Israel_58105_jaffa_-_old_city.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/2.5/",
  },
  "tlv-melody": district(gordonBeach, "Mediterranean coastline and northern Tel Aviv beaches"),
  "tlv-elkonin": district(jaffaHarbor, "Historic Jaffa waterfront south of Neve Tzedek"),
  "tlv-ruby": district(kerem, "Kerem HaTeimanim streets in Tel Aviv"),
  "tlv-the-jaffa": district(jaffaCard, "Historic Old Jaffa buildings and streets"),
  "tlv-market-house": {
    src: beachesTelAviv,
    alt: "Tel Aviv beach and seafront along the Mediterranean",
    label: "Tel Aviv city photograph",
    credit: "Photograph reused from the publisher's Tel Aviv beach guide",
  },
  "tlv-albi-florentin": district(cityTaxi, "Tel Aviv city streets and urban transport"),
  "tlv-florentin-house": district(
    "/images/city-stays/tel-aviv-jaffa.webp",
    "South Tel Aviv and Jaffa urban surroundings",
  ),
  "tlv-poli-house": district(
    "/images/attractions/tel-aviv-jaffa.webp",
    "Historic Jaffa waterfront and city",
  ),
  "tlv-assemblage": district(
    "/images/city-stays/tel-aviv-beachfront.webp",
    "Tel Aviv's Mediterranean beachfront district",
  ),
  "tlv-the-norman": district(
    saronaStreet,
    "Central Tel Aviv urban architecture and street scenery",
  ),
  "tlv-65-rothschild": district(
    "/images/hotel-cards/tlv-65-rothschild.webp",
    "Illustrative historical city architecture of Tel Aviv-Yafo",
  ),
};
