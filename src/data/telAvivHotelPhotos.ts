/**
 * Hotel catalogue visuals: 16 DISTINCT editorial illustrations for 16 Tel Aviv hotels.
 * These are not photographs of the named properties. Unsplash Standard License permits
 * commercial use; direct CDN photos are credited with source pages and photographer.
 * Each URL was matched to an explicitly free photo page in October 2026.
 * The 3 local Tel Aviv photographs are separate from the 8 area-card image assets.
 * No hotel name or property amenities are inferred from the illustrations.
 */
import heroTelAviv from "@/assets/home/hero-tel-aviv.webp";
import telAvivCoast from "@/assets/home/tel-aviv-coast.webp";
import beachesTelAviv from "@/assets/guides/2026-10/beaches-in-tel-aviv.webp";

export type HotelIllustration = {
  src: string;
  alt: string;
  label: string;
  credit: string;
  sourceUrl?: string;
  licenseUrl?: string;
};

const unsplash = (imageId: string, photoId: string, alt: string, photographer: string, sourceSlug: string): HotelIllustration => ({
  src: "https://images.unsplash.com/" + imageId + "?auto=format&fit=crop&w=900&h=562&q=76",
  alt,
  label: "Illustrative hotel photograph",
  credit: "Photo: " + photographer + " / Unsplash",
  sourceUrl: "https://unsplash.com/photos/" + sourceSlug + "-" + photoId,
  licenseUrl: "https://unsplash.com/license",
});

/** Keyed to checked property IDs from the existing registry, not area IDs. */
export const telAvivHotelPhotos: Record<string, HotelIllustration> = {
  "tlv-carlton": {
    src: heroTelAviv,
    alt: "Tel Aviv's Mediterranean promenade and beachfront",
    label: "Tel Aviv city photograph",
    credit: "FLASHPACKER TRAVELGUIDE · CC BY-SA 2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tel_Aviv_Tayelet-Strand-Promenade_Beach_(34257299744).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  "tlv-embassy": unsplash("photo-1702255489644-392758161f1f", "T6WRDVQBn8M", "Comfortable hotel room with a bed, armchair and curtains", "Wes Hicks", "a-hotel-room-with-a-bed-chair-and-window"),
  "tlv-backstage": unsplash("photo-1775324537644-ec90f40d7d35", "hWWrF-XyQWk", "Modern hotel lounge with seating and natural light", "Timofey Radkevich", "modern-hotel-lobby-with-contemporary-furniture-and-natural-light"),
  "tlv-cinema": unsplash("photo-1668260592478-a6513b0a690e", "8hGJaAJyzIg", "Hotel bedroom with a television and wooden wall panel", "Jenevy Vergara", "a-hotel-room-with-a-tv-and-a-bed"),
  "tlv-port-tower": {
    src: telAvivCoast,
    alt: "Tel Aviv's coastline photographed from Jaffa",
    label: "Tel Aviv city photograph",
    credit: "Ariel Manor · CC BY 2.5",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:PikiWiki_Israel_58105_jaffa_-_old_city.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/2.5/",
  },
  "tlv-melody": unsplash("photo-1743410976099-6114097db9ba", "7sASTzCacdA", "Light-filled modern hotel bedroom with blue textiles", "niraj golhar", "a-comfortable-hotel-room-with-a-bed"),
  "tlv-elkonin": unsplash("photo-1749829235925-2158ae75902d", "0Kkv20z795A", "Elegant hotel lobby with timber wall panels and lounge seating", "Giu Vicente", "elegant-wooden-paneled-hotel-lobby-with-inviting-seating"),
  "tlv-ruby": unsplash("photo-1762117360848-be7490786979", "1b6fWdOEMM8", "Warmly lit hotel room with a bed, curtains and television", "Alef Morais", "a-hotel-room-with-a-bed-and-television"),
  "tlv-the-jaffa": unsplash("photo-1646991761123-d83ce47c30c9", "NNvFZeMbm84", "Contemporary hotel lobby with ceiling lights and comfortable seating", "Lazar Gugleta", "a-hotel-lobby-with-couches-chairs-and-a-chandelier"),
  "tlv-market-house": {
    src: beachesTelAviv,
    alt: "Tel Aviv beach and seafront along the Mediterranean",
    label: "Tel Aviv city photograph",
    credit: "Photograph reused from the publisher's Tel Aviv beach guide",
  },
  "tlv-albi-florentin": unsplash("photo-1772476361154-e894ba10d757", "mNdhu5gl_P4", "Minimal hotel bedroom with pale timber headboard and white bedding", "Meklay YOTKHAMSAY", "a-neatly-made-bed-in-a-modern-hotel-room"),
  "tlv-florentin-house": unsplash("photo-1655287330904-8c03daa84d14", "CRIoFQtIsc4", "Hotel bedroom with a writing desk and contemporary furniture", "Takafumi Yamashita", "a-bedroom-with-a-bed-and-desk-in-a-hotel-room"),
  "tlv-poli-house": unsplash("photo-1560662105-57f8ad6ae2d1", "FPS7a7XQZ0w", "Contemporary hotel reception area with sofas and communal seating", "Tim Photoguy", "empty-hotel-lobby"),
  "tlv-assemblage": unsplash("photo-1777063659923-bc2427062a4e", "PwlsQn-RyRU", "Refined hospitality lounge with armchairs and warm lamps", "Franco Debartolo", "elegant-lounge-area-with-plush-seating-and-ambient-lighting"),
  "tlv-the-norman": unsplash("photo-1695093360120-490f21ca62a7", "YSSmyqup2Pk", "Stylish hotel foyer with armchairs and decorative lighting", "Erik Mclean", "a-hotel-lobby-with-chairs-tables-and-a-fountain"),
  "tlv-65-rothschild": unsplash("photo-1777426204090-8ab42d6fdc7c", "ygpQbNFSoBI", "Modern hotel-style building with palm trees and a pool", "set.sj", "modern-hotel-building-with-balconies-and-swimming-pool"),
};
