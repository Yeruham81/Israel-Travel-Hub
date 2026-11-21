import { tourCategories, tourCategoryPaths } from "@/data/tours";
import { attractionHubRegions } from "@/data/attractionsHub";
import type { LinkProps } from "@tanstack/react-router";
import { airportTransferRates, airportTransferRoutes, travelGuidePaths } from "@/data/registry";

export type NavItem = { label: string; to: LinkProps["to"] };
export type SidebarNavItem =
  | (NavItem & { children?: NavItem[]; childrenLabel?: string; toggleLabel?: string; alwaysExpanded?: boolean; toggleOnly?: boolean })
  | { label: string; href: string }
  | { label: string; headingOnly: true; children: NavItem[]; childrenLabel?: string };
export type NavGroup = { title: string; items: SidebarNavItem[] };

export const airportTransferNav = {
  label: "Airport transfers", to: "/airport-transfers/" as const,
  childrenLabel: "Airport transfer destinations", alwaysExpanded: true,
  children: [
    ...airportTransferRoutes.map((route) => ({
      label: route.id === "dead-sea" ? "To Ein Bokek at the Dead Sea" : `To ${airportTransferRates.find((rate) => rate.id === route.id)!.destination}`,
      to: route.path,
    })),
    { label: "To other destinations", to: "/airport-transfers/" },
  ],
} satisfies SidebarNavItem;

/** Six primary links: shared by desktop header and footer, in homepage order. */
export const serviceNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Airport transfers", to: "/airport-transfers/" },
  { label: "Tours & Day Trips", to: "/tours/" },
  { label: "Shore excursions", to: "/shore-excursions/" },
  { label: "Accommodation", to: "/accommodation/" },
  { label: "Attractions", to: "/attractions/" },
  { label: "Travel guides", to: "/travel-blog/" },
];

/** Desktop top navigation: exactly the six primary sections. */
export const serviceDomains: NavItem[] = serviceNav.filter((n) => n.to !== "/");

export const hotelNav: NavItem[] = [
  { label: "Hotels in Jerusalem", to: "/accommodation/jerusalem/" },
  { label: "Hotels in Tel Aviv", to: "/accommodation/tel-aviv/" },
  { label: "Hotels in Tiberias", to: "/accommodation/tiberias/" },
  { label: "Hotels in Haifa", to: "/accommodation/haifa/" },
  { label: "Dead Sea hotels", to: "/accommodation/dead-sea/" },
];

/** Migrated practical guides resolve inside this portal. */
const travelTips = {
  gettingAround: { label: "Getting around Israel", to: travelGuidePaths.israel },
  uber: { label: "Is there Uber in Israel?", to: travelGuidePaths.uber },
  esim: { label: "Choosing an eSIM for Israel", to: travelGuidePaths.esim },
  arrival: { label: "Ben Gurion arrival tips", to: travelGuidePaths.arrival },
} satisfies Record<string, SidebarNavItem>;

export const utilityNav: NavItem[] = [
  { label: "Home", to: "/" },
];

export const footerNav: NavItem[] = [
  { label: "About Moshe Barak", to: "/about-moshe-barak/" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", to: "/privacy-policy/" },
  { label: "Terms of Use", to: "/terms-of-use/" },
];

/** Compact labels for individual attractions only. General guides do not belong in this sidebar. */
export const attractionSidebarGuideLabels: Record<string, string> = {
  "old-city-jerusalem": "Old City",
  "mount-of-olives": "Mount of Olives",
  "mount-zion": "Mount Zion",
  jaffa: "Old Jaffa",
  "akko-acre": "Akko (Acre)",
  haifa: "Haifa",
  caesarea: "Caesarea",
  "rosh-hanikra": "Rosh Hanikra",
  annunciation: "Annunciation",
  "mount-tabor": "Mount Tabor",
  precipice: "Mount Precipice",
  megiddo: "Tel Megiddo",
  "sea-of-galilee": "Sea of Galilee",
  capernaum: "Capernaum",
  tabgha: "Tabgha",
  "mount-of-beatitudes": "Mount of Beatitudes",
  magdala: "Magdala",
  yardenit: "Yardenit",
  "dead-sea": "Dead Sea",
  masada: "Masada",
  "ein-gedi": "Ein Gedi",
  qasr: "Qasr el-Yahud",
  "mitzpe-ramon-crater": "Ramon Crater",
  eilat: "Eilat",
};

export const attractionSidebarRegions: SidebarNavItem[] = attractionHubRegions.map((region) => ({
  label: region.navLabel ?? region.title,
  to: "/attractions/" as const, // The heading toggles; only "All attractions" navigates to this URL.
  toggleOnly: true,
  childrenLabel: `${region.title} attractions`,
  toggleLabel: `Toggle ${region.title} attractions`,
  children: region.cards.map((card) => ({
    label: attractionSidebarGuideLabels[card.id] ?? card.title,
    to: card.to,
  })),
}));

/** Shared desktop/mobile menu; labels use sentence case, retaining proper names. */
export const allNavGroups: NavGroup[] = [
  {
    title: "Transportation",
    items: [
      airportTransferNav,
      { label: "Private driver service", to: "/private-driver/" },
      { label: "Rent a car in Israel", to: "/car-rental/" },
    ],
  },
  {
    title: "Tours & trips",
    items: [
      { label: "Tours & day trips", to: "/tours/", childrenLabel: "Tour categories", alwaysExpanded: true, children: tourCategories.map(category => ({ label: category.shortTitle, to: tourCategoryPaths[category.id] })) },
      { label: "Shore excursions", to: "/shore-excursions/", childrenLabel: "Shore excursion ports", alwaysExpanded: true, children: [
        { label: "From Haifa Port", to: "/shore-excursions/haifa/" },
        { label: "From Ashdod Port", to: "/shore-excursions/ashdod/" },
      ] },
    ],
  },
  {
    title: "Accommodation",
    items: [{ label: "All accommodation", to: "/accommodation/" }, ...hotelNav],
  },
  {
    title: "Attractions",
    items: [
      { label: "All attractions", to: "/attractions/" },
      ...attractionSidebarRegions,
    ],
  },
  {
    title: "Travel guides",
    items: [
      { label: "All travel guides", to: "/travel-blog/" },
      { label: "Israel itineraries", headingOnly: true, childrenLabel: "Trip lengths", children: [
        { label: "Israel in 3 days", to: "/travel-blog/israel-itinerary-3-days/" },
        { label: "Israel in 5 days", to: "/travel-blog/israel-itinerary-5-days/" },
        { label: "Israel in 7 days", to: "/travel-blog/israel-itinerary-7-days/" },
        { label: "Israel in 10 days", to: "/travel-blog/israel-itinerary-10-days/" },
      ] },
      { label: "From Ben Gurion Airport", headingOnly: true, childrenLabel: "Ben Gurion Airport arrival guides", children: [
        { label: "How to get to Jerusalem", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/" },
        { label: "How to get to Tel Aviv", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/" },
        { label: "How to get to Haifa", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/" },
        { label: "How to get to Ein Bokek", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/" },
      ] },

      { label: "Where to stay guides", headingOnly: true, childrenLabel: "Accommodation planning guides", children: [
        { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
        { label: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
        { label: "Best hotels in Haifa", to: "/travel-blog/best-hotels-in-haifa/" },
        { label: "Best hotels in Tiberias", to: "/travel-blog/best-hotels-in-tiberias/" },
        { label: "Dead Sea best hotels", to: "/travel-blog/best-dead-sea-hotels/" },
      ] },
      { label: "Israel travel tips", to: travelGuidePaths.travelTips },
      { label: "Best time to visit Israel", to: travelGuidePaths.bestTime },
      { label: "Holidays & events", to: travelGuidePaths.calendar },
      { label: "What to eat in Israel", to: travelGuidePaths.food },
      { label: "Top 10 Israel experiences", to: travelGuidePaths.topTen },
      { label: "Jerusalem travel guide", to: travelGuidePaths.jerusalem },
      { label: "Christian tours in Israel", to: travelGuidePaths.christianTours },
      { label: "Israel tours for seniors", to: travelGuidePaths.seniorTours },
      { label: "How to get from Jerusalem to Bethlehem", to: travelGuidePaths.bethlehem },
      { label: "How to get from Jerusalem to the Dead Sea", to: travelGuidePaths.jerusalemDeadSea },
      travelTips.gettingAround,
      { label: "Getting around Tel Aviv", to: travelGuidePaths.telAviv },
      { label: "Taxis in Israel", to: travelGuidePaths.taxis },
      { label: "Sherut from Ben Gurion Airport", to: travelGuidePaths.sherut },
      travelTips.uber,
      travelTips.esim,
      travelTips.arrival,
    ],
  },
];
