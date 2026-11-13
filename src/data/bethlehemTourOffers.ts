/**
 * Editorial snapshot for Bethlehem tour cards within the Jerusalem-to-Bethlehem guide.
 * Public "from" prices, ratings and review counts are indicative, NOT live inventory.
 * Sourced from the six exact provider product pages on 2026-11-13.
 * Two group and two private listings are distributed by the same operator
 * (Elijah Tours & Travel); treat these as booking-channel alternatives.
 * Tracking URLs are configured separately in affiliateConfig.
 */
export type BethlehemTourCard = {
  id: string;
  provider: "GetYourGuide" | "Viator";
  title: string;
  subtitle: string;
  duration: string;
  fromUsd: number;
  priceUnit: "person" | "group-up-to-four";
  rating: number;
  reviewCount: number;
  checkedAt: string;
  sourceUrl: string;
  photoId: "nativity-interior" | "catholic-grottos" | "jordan-river" | "manger-square" | "bethlehem" | "milk-grotto";
};
export const bethlehemTourCards: BethlehemTourCard[] = [
  {
    id: "jslm-bethlehem-halfday-viator",
    provider: "Viator",
    title: "Bethlehem Half-Day Guided Tour",
    subtitle: "Nativity Church, Manger Square, Milk Grotto & Shepherds' Field",
    duration: "3–5 hrs",
    fromUsd: 70,
    priceUnit: "person",
    rating: 4.9,
    reviewCount: 254,
    checkedAt: "2026-11-13",
    sourceUrl: "https://www.viator.com/tours/Jerusalem/Bethlehem-Half-Day-Tour/d921-115730P1",
    photoId: "nativity-interior",
  },
  {
    id: "jslm-bethlehem-halfday-gyg",
    provider: "GetYourGuide",
    title: "Bethlehem Half-Day Guided Tour",
    subtitle: "A guided visit to Bethlehem’s principal Nativity sites",
    duration: "4 hrs",
    fromUsd: 75,
    priceUnit: "person",
    rating: 4.8,
    reviewCount: 611,
    checkedAt: "2026-11-13",
    sourceUrl: "https://www.getyourguide.com/jerusalem-l97/from-jerusalem-half-day-bethlehem-guided-tour-t213663/",
    photoId: "catholic-grottos",
  },
  {
    id: "jslm-bethlehem-jericho-viator",
    provider: "Viator",
    title: "Bethlehem, Jericho & Jordan River",
    subtitle: "Guided Bethlehem visit and independent Jericho stops",
    duration: "8–11 hrs",
    fromUsd: 105,
    priceUnit: "person",
    rating: 4.7,
    reviewCount: 135,
    checkedAt: "2026-11-13",
    sourceUrl: "https://www.viator.com/tours/Jerusalem/Bethlehem-and-Jericho-Full-Day-Tour-from-Jerusalem-and-Tel-Aviv/d921-115730P10",
    photoId: "jordan-river",
  },
  {
    id: "jslm-bethlehem-jerusalem-gyg",
    provider: "GetYourGuide",
    title: "Jerusalem & Bethlehem Full-Day Tour",
    subtitle: "Jerusalem Old City highlights and Bethlehem's Nativity sites",
    duration: "10 hrs",
    fromUsd: 106,
    priceUnit: "person",
    rating: 4.3,
    reviewCount: 68,
    checkedAt: "2026-11-13",
    sourceUrl: "https://www.getyourguide.com/jerusalem-l97/full-day-tour-of-the-holy-land-from-jerusalem-t22125/",
    photoId: "manger-square",
  },
  {
    id: "jslm-bethlehem-private-gyg",
    provider: "GetYourGuide",
    title: "Private Bethlehem Half-Day Tour",
    subtitle: "Flexible tour with confirmed Jerusalem hotel pickup",
    duration: "3–5 hrs",
    fromUsd: 300,
    priceUnit: "group-up-to-four",
    rating: 5.0,
    reviewCount: 23,
    checkedAt: "2026-11-13",
    sourceUrl: "https://www.getyourguide.com/jerusalem-l97/from-jerusalemtel-aviv-bethlehem-half-day-private-tour-t419447/",
    photoId: "bethlehem",
  },
  {
    id: "jslm-bethlehem-private-viator",
    provider: "Viator",
    title: "Private Bethlehem Half-Day Tour",
    subtitle: "Jerusalem hotel transfers and local Bethlehem guide",
    duration: "3–5 hrs",
    fromUsd: 350,
    priceUnit: "group-up-to-four",
    rating: 5.0,
    reviewCount: 55,
    checkedAt: "2026-11-13",
    sourceUrl: "https://www.viator.com/tours/Jerusalem/Bethlehem-Half-Day-Private-Tour-Free-Hotel-Pick-up-and-Drop-Off-from-Tel-Aviv/d921-115730P7",
    photoId: "milk-grotto",
  },
];
