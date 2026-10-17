import type { LinkProps } from "@tanstack/react-router";
import { OWNER_BASE } from "@/data/registry";

export type NavItem = { label: string; to: LinkProps["to"] };
export type SidebarNavItem = NavItem | { label: string; href: string };
export type NavGroup = { title: string; items: SidebarNavItem[] };

export const serviceNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Accommodation", to: "/hotels/" },
  { label: "Transfers", to: "/transfers/" },
  { label: "Tours & day trips", to: "/tours/" },
  { label: "Shore excursions", to: "/shore-excursions/" },
  { label: "Attractions", to: "/attractions/" },
  { label: "Tickets & admission", to: "/tickets/" },
  { label: "Car rental", to: "/car-rental/" },
  { label: "Destinations", to: "/destinations/" },
];

/** The seven service domains (no Home/Destinations) — used by the header. */
export const serviceDomains: NavItem[] = serviceNav.filter((n) => n.to !== "/" && n.to !== "/destinations/");

export const hotelNav: NavItem[] = [
  { label: "Hotels in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
  { label: "Hotels in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
  { label: "Hotels in Tiberias", to: "/travel-blog/best-hotels-in-tiberias/" },
  { label: "Hotels in Haifa", to: "/travel-blog/best-hotels-in-haifa/" },
  { label: "Dead Sea hotels", to: "/travel-blog/best-dead-sea-hotels/" },
];

/** Existing publisher guides stay on their verified URLs until migrated. */
const travelTips = {
  gettingAround: { label: "Getting around Israel", href: `${OWNER_BASE}/travel-blog/getting-around-israel/` },
  uber: { label: "Is there Uber in Israel?", href: `${OWNER_BASE}/travel-blog/uber-in-israel/` },
  esim: { label: "Choosing an eSIM for Israel", href: `${OWNER_BASE}/travel-blog/best-esim-for-israel/` },
  arrival: { label: "Ben Gurion arrival tips", href: `${OWNER_BASE}/travel-blog/ben-gurion-airport-arrival-tips/` },
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
      { label: "Airport transfers", to: "/transfers/ben-gurion-airport/" },
      { label: "Private transfers", to: "/transfers/" },
      { label: "Car rental", to: "/car-rental/" },
    ],
  },
  {
    title: "Tours & Trips",
    items: [
      { label: "Tours & day trips", to: "/tours/" },
      { label: "Bethlehem tours", to: "/tours/bethlehem-from-jerusalem/" },
      { label: "Shore excursions", to: "/shore-excursions/" },
      { label: "From Ashdod Port", to: "/ashdod-shore-excursions/" },
      { label: "From Haifa Port", to: "/haifa-shore-excursions/" },
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
      { label: "Destinations & city guides", to: "/destinations/" },
      travelTips.gettingAround,
      travelTips.uber,
      travelTips.esim,
      travelTips.arrival,
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
