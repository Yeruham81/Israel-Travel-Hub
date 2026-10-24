/**
 * Hotel catalogue illustrations use only photos stored in this project.
 * These are genuine Tel Aviv/Jaffa area views, not pictures of the named hotels.
 * Source and licence links remain outbound information, never image hotlinks.
 */
import heroTelAviv from "@/assets/home/hero-tel-aviv.webp";
import heroTelAvivLarge from "@/assets/home/hero-tel-aviv-large.webp";
import telAvivCoast from "@/assets/home/tel-aviv-coast.webp";
import beachesTelAviv from "@/assets/guides/2026-10/beaches-in-tel-aviv.webp";
import beachfront from "@/assets/tel-aviv/beachfront.webp";
import dizengoff from "@/assets/tel-aviv/dizengoff.webp";
import florentin from "@/assets/tel-aviv/florentin.webp";
import jaffa from "@/assets/tel-aviv/jaffa.webp";
import kerem from "@/assets/tel-aviv/kerem-hateimanim.webp";
import neveTzedek from "@/assets/tel-aviv/neve-tzedek.webp";
import oldNorth from "@/assets/tel-aviv/old-north.webp";
import rothschild from "@/assets/tel-aviv/rothschild.webp";

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
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tel_Aviv_Tayelet-Strand-Promenade_Beach_(34257299744).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  "tlv-embassy": district(beachfront, "Tel Aviv's beachfront and Mediterranean promenade"),
  "tlv-backstage": district(dizengoff, "Dizengoff district streets in Tel Aviv"),
  "tlv-cinema": district("/images/city-stays/tel-aviv-dizengoff.webp", "Dizengoff neighbourhood in central Tel Aviv"),
  "tlv-port-tower": {
    src: telAvivCoast,
    alt: "Tel Aviv's coastline photographed from Jaffa",
    label: "Tel Aviv city photograph",
    credit: "Ariel Manor · CC BY 2.5",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:PikiWiki_Israel_58105_jaffa_-_old_city.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/2.5/",
  },
  "tlv-melody": district(oldNorth, "Streets and buildings of Tel Aviv's Old North"),
  "tlv-elkonin": district(neveTzedek, "Historic streets around Neve Tzedek, Tel Aviv"),
  "tlv-ruby": district(kerem, "Kerem HaTeimanim streets in Tel Aviv"),
  "tlv-the-jaffa": district(jaffa, "Historic Jaffa neighbourhood"),
  "tlv-market-house": {
    src: beachesTelAviv,
    alt: "Tel Aviv beach and seafront along the Mediterranean",
    label: "Tel Aviv city photograph",
    credit: "Photograph reused from the publisher's Tel Aviv beach guide",
  },
  "tlv-albi-florentin": district(florentin, "Florentin street scene in south Tel Aviv"),
  "tlv-florentin-house": district("/images/city-stays/tel-aviv-jaffa.webp", "South Tel Aviv and Jaffa urban surroundings"),
  "tlv-poli-house": district("/images/attractions/tel-aviv-jaffa.webp", "Historic Jaffa waterfront and city"),
  "tlv-assemblage": district("/images/city-stays/tel-aviv-beachfront.webp", "Tel Aviv's Mediterranean beachfront district"),
  "tlv-the-norman": district(rothschild, "Rothschild Boulevard and the surrounding Tel Aviv streets"),
  "tlv-65-rothschild": district(heroTelAvivLarge, "Tel Aviv skyline and coastal neighbourhoods"),
};
