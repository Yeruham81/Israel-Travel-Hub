import type { LinkProps } from "@tanstack/react-router";
import { airportTransferRates, airportTransferRoutes, travelGuidePaths } from "@/data/registry";

export type NavItem = { label: string; to: LinkProps["to"] };
export type SidebarNavItem = (NavItem & { children?: NavItem[]; childrenLabel?: string; toggleLabel?: string }) | { label: string; href: string };
export type NavGroup = { title: string; items: SidebarNavItem[] };

export const airportTransferNav = {
  label: "Airport transfers", to: "/transfers/" as const,
  childrenLabel: "Airport transfer destinations", toggleLabel: "Choose an airport transfer destination",
  children: airportTransferRoutes.map((route) => ({ label: airportTransferRates.find((rate) => rate.id === route.id)!.destination, to: route.path })),
} satisfies SidebarNavItem;

export const serviceNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Accommodation", to: "/hotels/" },
  { label: "Airport transfers", to: "/transfers/" },
  { label: "Private driver", to: "/private-driver/" },
  { label: "Tours & day trips", to: "/tours/" },
  { label: "Shore excursions", to: "/shore-excursions/" },
  { label: "Attractions", to: "/attractions/" },
  { label: "Tickets & admission", to: "/tickets/" },
  { label: "Car rental", to: "/car-rental/" },
  { label: "Destinations", to: "/destinations/" },
];

/** Service domains (no Home/Destinations) — used by the header. */
export const serviceDomains: NavItem[] = serviceNav.filter((n) => n.to !== "/" && n.to !== "/destinations/");

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
  { label: "About", to: "/about/" },
];

/** One shared structure for the desktop sidebar and the mobile menu. */
export const allNavGroups: NavGroup[] = [
  {
    title: "Transportation",
    items: [
      airportTransferNav,
      { label: "Private driver", to: "/private-driver/" },
      { label: "Car rental", to: "/car-rental/" },
    ],
  },
  {
    title: "Tours & Trips",
    items: [
      { label: "Tours & day trips", to: "/tours/" },
      { label: "Bethlehem tours", to: "/tours/bethlehem-from-jerusalem/" },
      { label: "Shore excursions", to: "/shore-excursions/", childrenLabel: "Shore excursion ports", toggleLabel: "Choose a shore excursion port", children: [
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
      { label: "Attractions & places", to: "/attractions/" },
      { label: "Tickets & admission", to: "/tickets/" },
      { label: "Masada tickets & visit", to: "/travel-blog/masada/" },
      { label: "Caesarea visit", to: "/attractions/caesarea/" },
    ],
  },
  {
    title: "Travel Guides & Tips",
    items: [
      { label: "All travel guides", to: "/guides/" },
      { label: "Israel travel tips", to: travelGuidePaths.travelTips },
      { label: "Jerusalem travel guide", to: travelGuidePaths.jerusalem },
      travelTips.gettingAround,
      { label: "Getting around Tel Aviv", to: travelGuidePaths.telAviv },
      { label: "Taxis in Israel", to: travelGuidePaths.taxis },
      { label: "Airport sherut: current status", to: travelGuidePaths.sherut },
      travelTips.uber,
      travelTips.esim,
      travelTips.arrival,
      { label: "Destinations & city guides", to: "/destinations/" },
    ],
  },
  {
    title: "Popular Links",
    items: [
      { label: "Ben Gurion to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
      travelTips.uber,
      travelTips.esim,
      travelTips.arrival,
      { label: "Ben Gurion to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
    ],
  },
];
