/**
 * Editorial snapshot for compact tour cards in the Jerusalem-to-Dead-Sea guide.
 *
 * This is NOT a live quote or inventory API. The individual product pages
 * below were checked on 2026-11-13. Prices are public, indicative USD "from"
 * values, not quotes for a selected departure; ratings and review counts
 * can also change. Keep vendor metadata separate from affiliate tracking URLs
 * so an approved Viator feed / GetYourGuide teaser integration can replace
 * this snapshot without rewriting the card layout.
 *
 * Booking links are resolved exclusively via affiliateConfig in registry.ts.
 */
export type DeadSeaTourCard = {
  id: string;
  provider: "Viator" | "GetYourGuide";
  title: string;
  subtitle: string;
  duration: string;
  fromUsd: number;
  rating: number;
  reviewCount: number;
  checkedAt: string;
  sourceUrl: string;
  photoId: "beach-mud" | "masada-palace" | "ein-gedi" | "salt-shore" | "sunrise" | "masada-ruins";
};

export const deadSeaTourCards: DeadSeaTourCard[] = [
  {
    id: "jslm-deadsea-beach-viator",
    provider: "Viator",
    title: "Dead Sea Chill Out",
    subtitle: "Beach-focused half-day trip from Jerusalem",
    duration: "6 hrs",
    fromUsd: 49,
    rating: 4.6,
    reviewCount: 13,
    checkedAt: "2026-11-13",
    sourceUrl: "https://www.viator.com/tours/Jerusalem/Dead-Sea-Chill-Out-Day-Trip-from-Jerusalem/d921-6540P70",
    photoId: "beach-mud",
  },
  {
    id: "jslm-deadsea-masada-viator",
    provider: "Viator",
    title: "Masada & Dead Sea",
    subtitle: "Fortress visit and beach time",
    duration: "9 hrs",
    fromUsd: 115,
    rating: 4.3,
    reviewCount: 783,
    checkedAt: "2026-11-13",
    sourceUrl: "https://www.viator.com/tours/Jerusalem/Masada-and-the-Dead-Sea-Day-Trip-from-Jerusalem/d921-5209MASDSJ",
    photoId: "masada-palace",
  },
  {
    id: "jslm-deadsea-masada-eingedi-viator",
    provider: "Viator",
    title: "Masada, Ein Gedi & Dead Sea",
    subtitle: "Three highlights in one day",
    duration: "10 hrs",
    fromUsd: 108,
    rating: 4.4,
    reviewCount: 133,
    checkedAt: "2026-11-13",
    sourceUrl: "https://www.viator.com/tours/Jerusalem/Masada-Ein-Gedi-and-Dead-Sea-Tour-from-Jerusalem/d921-6540P7",
    photoId: "ein-gedi",
  },
  {
    id: "jslm-deadsea-masada-gyg",
    provider: "GetYourGuide",
    title: "Masada & Dead Sea Full-Day Tour",
    subtitle: "Guided fortress visit, cable car and beach",
    duration: "10 hrs",
    fromUsd: 111,
    rating: 4.4,
    reviewCount: 823,
    checkedAt: "2026-11-13",
    sourceUrl: "https://www.getyourguide.com/jerusalem-l97/masada-the-dead-sea-full-day-tour-from-jerusalem-t21495/",
    photoId: "salt-shore",
  },
  {
    id: "jslm-deadsea-sunrise-gyg",
    provider: "GetYourGuide",
    title: "Masada Sunrise, Ein Gedi & Dead Sea",
    subtitle: "Early Snake Path hike and Dead Sea stop",
    duration: "10 hrs",
    fromUsd: 114,
    rating: 4.6,
    reviewCount: 247,
    checkedAt: "2026-11-13",
    sourceUrl: "https://www.getyourguide.com/jerusalem-l97/from-jerusalem-masada-at-sunrise-ein-gedi-dead-sea-tour-t23458/",
    photoId: "sunrise",
  },
  {
    id: "jslm-deadsea-qumran-viator",
    provider: "Viator",
    title: "Masada, Qumran & Dead Sea",
    subtitle: "Dead Sea Scrolls site, mountain fortress and beach",
    duration: "8 hrs",
    fromUsd: 110,
    rating: 3.7,
    reviewCount: 11,
    checkedAt: "2026-11-13",
    sourceUrl: "https://www.viator.com/tours/Jerusalem/Tour-of-Masada-Dead-Sea-From-Jerusalem/d921-6803P3",
    photoId: "masada-ruins",
  },
];
