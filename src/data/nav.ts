import type { LinkProps } from "@tanstack/react-router";

export type NavItem = { label: string; to: LinkProps["to"] };

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
];

export const shortcutNav: NavItem[] = [
  { label: "Airport → Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
  { label: "Airport → Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
  { label: "Bethlehem tours", to: "/tours/bethlehem-from-jerusalem/" },
  { label: "Shore trips from Ashdod Port", to: "/ashdod-shore-excursions/" },
  { label: "Shore trips from Haifa Port", to: "/haifa-shore-excursions/" },
  { label: "Masada tickets & visit", to: "/travel-blog/masada/" },
  { label: "Caesarea visit", to: "/attractions/caesarea/" },
];

export const allNavGroups = [
  { title: "Services", items: serviceNav },
  { title: "Popular hotels", items: hotelNav },
  { title: "Shortcuts", items: shortcutNav },
  { title: "About", items: [{ label: "About & methodology", to: "/about/" }] as NavItem[] },
];
