/** Editorially reviewed Bethlehem product pages, not live availability or prices.
 * Add approved product-specific Travelpayouts links in affiliateConfig only after
 * their destination has been checked; never label an ordinary supplier URL as sponsored.
 */
export type BethlehemTourCard = {
  id: string;
  provider: "GetYourGuide" | "Viator";
  title: string;
  format: string;
  duration: string;
  description: string;
  photoId: "nativity-interior" | "bethlehem" | "jordan-river";
  publicUrl: string;
  checkedAt: string;
};
export const bethlehemTourCards: BethlehemTourCard[] = [
  {
    id: "jslm-bethlehem-halfday-gyg",
    provider: "GetYourGuide",
    title: "Bethlehem Half-Day Guided Tour",
    format: "Small-group guided visit",
    duration: "About 4 hours",
    description: "A Bethlehem-focused visit to the Church of the Nativity, Manger Square, Milk Grotto and Shepherds' Field. Jerusalem meeting point; verify inclusions and worship access.",
    photoId: "nativity-interior",
    publicUrl: "https://www.getyourguide.com/en-gb/jerusalem-l97/from-jerusalem-half-day-bethlehem-guided-tour-t213663/",
    checkedAt: "2026-11-13",
  },
  {
    id: "jslm-bethlehem-private-viator",
    provider: "Viator",
    title: "Bethlehem Private Half-Day Tour",
    format: "Private guided visit",
    duration: "About 3–5 hours",
    description: "Private Bethlehem sightseeing with Jerusalem hotel pickup offered on the selected option. Confirm driver handover, vehicle permissions, stops and return.",
    photoId: "bethlehem",
    publicUrl: "https://www.viator.com/tours/Jerusalem/Bethlehem-Half-Day-Private-Tour-Free-Hotel-Pick-up-and-Drop-Off-from-Tel-Aviv/d921-115730P7",
    checkedAt: "2026-11-13",
  },
  {
    id: "jslm-bethlehem-jericho-viator",
    provider: "Viator",
    title: "Bethlehem & Jericho Full-Day Tour",
    format: "Shared full-day excursion",
    duration: "About 8–11 hours",
    description: "A longer combination of Bethlehem and Jericho, with less time for Nativity sites. Confirm the selected Jerusalem departure, river stop, admission and return.",
    photoId: "jordan-river",
    publicUrl: "https://www.viator.com/tours/Jerusalem/Bethlehem-and-Jericho-Full-Day-Tour-from-Jerusalem-and-Tel-Aviv/d921-115730P10",
    checkedAt: "2026-11-13",
  },
];
