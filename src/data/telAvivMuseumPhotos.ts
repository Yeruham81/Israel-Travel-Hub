import muzaPhoto from "@/assets/guides/2026-10/eretz-israel-museum.webp";

/**
 * One local, accurately labelled image per museum card.
 * Original library WebP photos were retrieved from the site's connected image archive.
 * Four venues without verified local photographs use explicitly captioned original
 * architectural illustrations, never another venue's photo.
 */
export type TelAvivMuseumPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit?: "contain";
  illustrative?: boolean;
};

export const telAvivMuseumPhotos: Record<string, TelAvivMuseumPhoto> = {
  art: { src: "/images/tel-aviv-attractions/tel-aviv-museum-of-art.webp", alt: "Modern exterior of the Tel Aviv Museum of Art", width: 738, height: 492 },
  city: { src: "/images/tel-aviv-museums/city.webp", alt: "Tel Aviv–Yafo City Museum in the historic municipal building on Bialik Square", width: 684, height: 417 },
  rubin: { src: "/images/tel-aviv-museums/rubin.svg", alt: "Original architectural illustration of a Tel Aviv artist house, not a photograph of Rubin Museum", width: 900, height: 600, illustrative: true },
  liebling: { src: "/images/tel-aviv-museums/liebling.svg", alt: "Original architectural illustration of White City modernist buildings, not a photograph of Liebling Haus", width: 900, height: 600, illustrative: true },
  bialik: { src: "/images/tel-aviv-museums/bialik.svg", alt: "Original architectural illustration of a historic Tel Aviv home, not a photograph of Bialik House", width: 900, height: 600, illustrative: true },
  bauhaus: { src: "/images/tel-aviv-museums/bauhaus.svg", alt: "Original architectural illustration of modernist design, not a photograph of Bauhaus Center Tel Aviv", width: 900, height: 600, illustrative: true },
  anu: { src: "/images/tel-aviv-museums/anu.webp", alt: "ANU Museum of the Jewish People at Tel Aviv University", width: 669, height: 436 },
  steinhardt: { src: "/images/tel-aviv-museums/steinhardt.webp", alt: "Contemporary angular exterior of the Steinhardt Museum of Natural History", width: 692, height: 389 },
  muza: { src: muzaPhoto, alt: "MUZA, the Eretz Israel Museum campus in Ramat Aviv", width: 755, height: 503 },
  palmach: { src: "/images/tel-aviv-museums/palmach.webp", alt: "Stone-clad geometric exterior of the Palmach Museum in Tel Aviv", width: 700, height: 395 },
  rabin: { src: "/images/tel-aviv-museums/rabin.webp", alt: "Yitzhak Rabin Center museum complex in northern Tel Aviv", width: 738, height: 415 },
  gutman: { src: "/images/tel-aviv-museums/gutman.webp", alt: "Historical building housing the Nahum Gutman Museum of Art in Neve Tzedek", width: 755, height: 566 },
  "etzel-1948": { src: "/images/tel-aviv-museums/etzel-1948.webp", alt: "Etzel Museum – 1948 seaside building by Charles Clore Park", width: 717, height: 388 },
  ilana: { src: "/images/attractions/jaffa-ilana-goor-museum.webp", alt: "Historic stone exterior of the Ilana Goor Museum in Old Jaffa", width: 755, height: 503 },
  independence: { src: "/images/tel-aviv-museums/independence.webp", alt: "Historic Independence Hall interior on Rothschild Boulevard, before restoration", width: 726, height: 485 },
};
