import { tourCategories, tourCategoryPaths } from "@/data/tours";
import type { LinkProps } from "@tanstack/react-router";
import { airportTransferRates, airportTransferRoutes, travelGuidePaths } from "@/data/registry";

export type NavItem = { label: string; to: LinkProps["to"] };
export type SidebarNavItem = (NavItem & { children?: NavItem[]; childrenLabel?: string; toggleLabel?: string; alwaysExpanded?: boolean }) | { label: string; href: string };
export type NavGroup = { title: string; items: SidebarNavItem[] };

export const airportTransferNav = {
  label: "Airport transfers", to: "/transfers/" as const,
  childrenLabel: "Airport transfer destinations", alwaysExpanded: true,
  children: [
    ...airportTransferRoutes.map((route) => ({
      label: route.id === "dead-sea" ? "To Ein Bokek at the Dead Sea" : `To ${airportTransferRates.find((rate) => rate.id === route.id)!.destination}`,
      to: route.path,
    })),
    { label: "To other destinations", to: "/transfers/" },
  ],
} satisfies SidebarNavItem;

/** Six primary links: shared by desktop header and footer, in homepage order. */
export const serviceNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Airport transfers", to: "/transfers/" },
  { label: "Tours & Day Trips", to: "/tours/" },
  { label: "Shore excursions", to: "/shore-excursions/" },
  { label: "Accommodation", to: "/hotels/" },
  { label: "Attractions", to: "/attractions/" },
  { label: "Travel guides", to: "/guides/" },
];

/** Desktop top navigation: exactly the six primary sections. */
export const serviceDomains: NavItem[] = serviceNav.filter((n) => n.to !== "/");

export const hotelNav: NavItem[] = [
  { label: "Hotels in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
  { label: "Hotels in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
  { label: "Hotels in Tiberias", to: "/travel-blog/best-hotels-in-tiberias/" },
  { label: "Hotels in Haifa", to: "/travel-blog/best-hotels-in-haifa/" },
  { label: "Dead Sea hotels", to: "/travel-blog/best-dead-sea-hotels/" },
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
        { label: "From Haifa Port", to: "/haifa-shore-excursions/" },
        { label: "From Ashdod Port", to: "/ashdod-shore-excursions/" },
      ] },
    ],
  },
  {
    title: "Accommodation",
    items: [{ label: "All accommodation", to: "/hotels/" }, ...hotelNav],
  },
  {
    title: "Attractions",
    items: [
      { label: "All attractions", to: "/attractions/" },
      { label: "Old City of Jerusalem", to: "/travel-blog/old-city-jerusalem/" },
      { label: "Jaffa", to: "/travel-blog/jaffa/" },
      { label: "Akko (Acre)", to: "/travel-blog/akko-acre/" },
      { label: "Caesarea", to: "/attractions/caesarea/" },
      { label: "Rosh Hanikra", to: "/travel-blog/rosh-hanikra/" },
      { label: "Sea of Galilee", to: "/travel-blog/sea-of-galilee/" },
      { label: "Tel Megiddo", to: travelGuidePaths.megiddo },
      { label: "Mitzpe Ramon & Ramon Crater", to: "/travel-blog/mitzpe-ramon-crater/" },
      { label: "Masada", to: "/travel-blog/masada/" },
      { label: "Ein Gedi", to: "/travel-blog/ein-gedi/" },
      { label: "The Dead Sea", to: travelGuidePaths.deadSea },
    ],
  },
  {
    title: "Religious sites",
    items: [
      { label: "Mount Zion", to: "/travel-blog/mount-zion/" },
      { label: "Mount of Olives", to: "/travel-blog/mount-of-olives/" },
      { label: "Basilica of the Annunciation", to: travelGuidePaths.annunciation },
      { label: "Mount Precipice", to: travelGuidePaths.precipice },
      { label: "Mount Tabor", to: "/travel-blog/mount-tabor/" },
      { label: "Magdala", to: travelGuidePaths.magdala },
      { label: "Capernaum", to: "/travel-blog/capernaum/" },
      { label: "Tabgha", to: "/travel-blog/tabgha/" },
      { label: "Mount of Beatitudes", to: "/travel-blog/mount-of-beatitudes/" },
      { label: "Yardenit", to: travelGuidePaths.yardenit },
      { label: "Qasr el-Yahud", to: travelGuidePaths.qasr },
    ],
  },
  {
    title: "Travel guides & tips",
    items: [
      { label: "All travel guides", to: "/guides/" },
      { label: "Israel itineraries", to: "/guides/", childrenLabel: "Trip lengths", alwaysExpanded: true, children: [
        { label: "Israel in 3 days", to: "/travel-blog/israel-itinerary-3-days/" },
        { label: "Israel in 5 days", to: "/travel-blog/israel-itinerary-5-days/" },
        { label: "Israel in 7 days", to: "/travel-blog/israel-itinerary-7-days/" },
        { label: "Israel in 10 days", to: "/travel-blog/israel-itinerary-10-days/" },
      ] },
      { label: "Airport to Jerusalem: all options", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/" },
      { label: "Airport to Tel Aviv: all options", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/" },
      { label: "Airport to Haifa: all options", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/" },
      { label: "Airport to Ein Bokek: all options", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/" },

      { label: "Israel travel tips", to: travelGuidePaths.travelTips },
      { label: "Best time to visit Israel", to: travelGuidePaths.bestTime },
      { label: "Holidays & events", to: travelGuidePaths.calendar },
      { label: "What to eat in Israel", to: travelGuidePaths.food },
      { label: "Top 10 Israel experiences", to: travelGuidePaths.topTen },
      { label: "Jerusalem travel guide", to: travelGuidePaths.jerusalem },
      { label: "Jerusalem to Bethlehem: travel options", to: travelGuidePaths.bethlehem },
      { label: "Jerusalem to the Dead Sea: travel options", to: travelGuidePaths.jerusalemDeadSea },
      travelTips.gettingAround,
      { label: "Getting around Tel Aviv", to: travelGuidePaths.telAviv },
      { label: "Taxis in Israel", to: travelGuidePaths.taxis },
      { label: "Airport sherut: current status", to: travelGuidePaths.sherut },
      travelTips.uber,
      travelTips.esim,
      travelTips.arrival,
    ],
  },
];
