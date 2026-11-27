import type { LinkProps } from "@tanstack/react-router";
import { travelGuidePaths } from "@/data/travel-guide-paths";

export type NavItem = { label: string; to: LinkProps["to"] };
export type SidebarNavItem =
  | (NavItem & {
      children?: NavItem[];
      childrenLabel?: string;
      toggleLabel?: string;
      alwaysExpanded?: boolean;
      toggleOnly?: boolean;
    })
  | { label: string; href: string }
  | { label: string; headingOnly: true; children: NavItem[]; childrenLabel?: string };
export type NavGroup = { title: string; items: SidebarNavItem[] };

export const airportTransferNav = {
  label: "Airport transfers",
  to: "/airport-transfers/" as const,
  childrenLabel: "Airport transfer destinations",
  alwaysExpanded: true,
  children: [
    { label: "To Jerusalem", to: "/airport-transfers/jerusalem/" },
    { label: "To Tel Aviv & Jaffa", to: "/airport-transfers/tel-aviv/" },
    { label: "To Haifa", to: "/airport-transfers/haifa/" },
    { label: "To Ein Bokek at the Dead Sea", to: "/airport-transfers/ein-bokek/" },
    { label: "To other destinations", to: "/airport-transfers/" },
  ],
} satisfies SidebarNavItem;

/** Six primary links: shared by desktop header and footer, in homepage order. */
export const serviceNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Airport transfers", to: "/airport-transfers/" },
  { label: "Tours & day trips", to: "/tours/" },
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
  esim: { label: "Best eSIM for Israel", to: travelGuidePaths.esim },
  arrival: { label: "Ben Gurion Airport arrival tips", to: travelGuidePaths.arrival },
} satisfies Record<string, SidebarNavItem>;

export const utilityNav: NavItem[] = [{ label: "Home", to: "/" }];

export const footerNav: NavItem[] = [{ label: "About me", to: "/about-me/" }];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", to: "/privacy-policy/" },
  { label: "Terms of Use", to: "/terms-of-use/" },
];

/** Compact labels for individual attractions only. General guides do not belong in this sidebar. */
export const attractionSidebarGuideLabels: Record<string, string> = {
  "old-city-jerusalem": "Old City",
  "via-dolorosa": "Via Dolorosa",
  "mount-of-olives": "Mount of Olives",
  "mount-zion": "Mount Zion",
  jaffa: "Old Jaffa",
  "akko-acre": "Akko (Acre)",
  haifa: "Haifa",
  caesarea: "Caesarea",
  "rosh-hanikra": "Rosh Hanikra",
  annunciation: "Basilica of the Annunciation",
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

// Navigation is deliberately lightweight. A parity test verifies every menu
// label, order and destination against the complete editorial catalogs.
const attractionNavigation = [
  [
    "Jerusalem",
    "Jerusalem",
    [
      ["old-city-jerusalem", "old-city-jerusalem"],
      ["via-dolorosa", "via-dolorosa"],
      ["mount-of-olives", "mount-of-olives"],
      ["mount-zion", "mount-zion"],
    ],
  ],
  ["Tel Aviv & Jaffa", "Tel Aviv & Jaffa", [["jaffa", "jaffa"]]],
  [
    "Haifa & Coast",
    "Haifa & the Mediterranean coast",
    [
      ["haifa", "haifa"],
      ["akko-acre", "akko-acre"],
      ["caesarea", "caesarea"],
      ["rosh-hanikra", "rosh-hanikra"],
    ],
  ],
  [
    "Nazareth & Galilee",
    "Nazareth & Galilee",
    [
      ["annunciation", "basilica-of-the-annunciation"],
      ["mount-tabor", "mount-tabor"],
      ["precipice", "mount-precipice"],
      ["megiddo", "tel-megiddo"],
    ],
  ],
  [
    "Sea of Galilee & Jordan River",
    "Sea of Galilee & the Jordan River",
    [
      ["sea-of-galilee", "sea-of-galilee"],
      ["capernaum", "capernaum"],
      ["tabgha", "tabgha"],
      ["mount-of-beatitudes", "mount-of-beatitudes"],
      ["magdala", "magdala"],
      ["yardenit", "yardenit"],
    ],
  ],
  [
    "Dead Sea & Masada",
    "Dead Sea & Masada",
    [
      ["dead-sea", "dead-sea"],
      ["masada", "masada"],
      ["ein-gedi", "ein-gedi"],
      ["qasr", "qasr-el-yahud"],
    ],
  ],
  [
    "Negev & Eilat",
    "Negev Desert & Eilat",
    [
      ["mitzpe-ramon-crater", "mitzpe-ramon-crater"],
      ["eilat", "eilat"],
    ],
  ],
] as const;

export const attractionSidebarRegions: SidebarNavItem[] = attractionNavigation.map(
  ([label, title, cards]) => ({
    label,
    to: "/attractions/" as const,
    toggleOnly: true,
    childrenLabel: `${title} attractions`,
    toggleLabel: `Toggle ${label} attractions`,
    children: cards.map(([id, slug]) => ({
      label: attractionSidebarGuideLabels[id]!,
      to: `/attractions/${slug}/` as LinkProps["to"],
    })),
  }),
);

/** Shared desktop/mobile menu, with topic headings and their guide links. */
export const allNavGroups: NavGroup[] = [
  {
    title: "Transportation",
    items: [
      airportTransferNav,
      { label: "Private driver service", to: "/private-driver-in-israel/" },
      { label: "Rent a car in Israel", to: "/car-rental/" },
    ],
  },
  {
    title: "Tours & trips",
    items: [
      {
        label: "Tours & day trips",
        to: "/tours/",
        childrenLabel: "Tour categories",
        alwaysExpanded: true,
        children: [
          { label: "Jerusalem", to: "/tours/jerusalem/" },
          { label: "Tel Aviv & Jaffa", to: "/tours/tel-aviv-jaffa/" },
          { label: "Masada & the Dead Sea", to: "/tours/masada-dead-sea/" },
          {
            label: "Bethlehem, Jericho & Qasr al-Yahud",
            to: "/tours/bethlehem-jericho-jordan-river/",
          },
          { label: "Nazareth & Sea of Galilee", to: "/tours/nazareth-sea-of-galilee/" },
          { label: "Caesarea, Haifa & Acre", to: "/tours/caesarea-haifa-acre/" },
          { label: "Negev & Ramon Crater", to: "/tours/negev-desert-ramon-crater/" },
          { label: "Golan Heights", to: "/tours/golan-heights/" },
          { label: "Food & markets", to: "/tours/food-market-tours/" },
          { label: "Eilat & the Red Sea", to: "/tours/eilat-red-sea/" },
        ],
      },
      {
        label: "Shore excursions",
        to: "/shore-excursions/",
        childrenLabel: "Shore excursion ports",
        alwaysExpanded: true,
        children: [
          { label: "From Haifa Port", to: "/shore-excursions/haifa/" },
          { label: "From Ashdod Port", to: "/shore-excursions/ashdod/" },
        ],
      },
    ],
  },
  {
    title: "Accommodation",
    items: [{ label: "All accommodation", to: "/accommodation/" }, ...hotelNav],
  },
  {
    title: "Attractions",
    items: [{ label: "All attractions", to: "/attractions/" }, ...attractionSidebarRegions],
  },
  {
    title: "Travel guides",
    items: [
      { label: "All travel guides", to: "/travel-blog/" },
      {
        label: "From Ben Gurion Airport",
        headingOnly: true,
        childrenLabel: "Ben Gurion Airport arrival guides",
        children: [
          { label: "How to get to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
          { label: "How to get to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
          { label: "How to get to Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
          { label: "How to get to Ein Bokek", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
          { label: "Ben Gurion Airport taxis", to: travelGuidePaths.airportTaxis },
          { label: "Traveling from Ben Gurion Airport on Shabbat", to: travelGuidePaths.shabbat },
          { label: "Sherut from Ben Gurion Airport", to: travelGuidePaths.sherut },
          travelTips.arrival,
        ],
      },
      {
        label: "Getting Around",
        headingOnly: true,
        childrenLabel: "Getting around guides",
        children: [
          travelTips.gettingAround,
          { label: "Getting around Tel Aviv", to: travelGuidePaths.telAviv },
          { label: "How to get from Jerusalem to Bethlehem", to: travelGuidePaths.bethlehem },
          {
            label: "How to get from Jerusalem to the Dead Sea",
            to: travelGuidePaths.jerusalemDeadSea,
          },
          { label: "Taxis in Israel", to: travelGuidePaths.taxis },
          { label: "Taxi fares in Israel", to: travelGuidePaths.taxiFares },
          travelTips.uber,
        ],
      },
      {
        label: "Where to Stay Guides",
        headingOnly: true,
        childrenLabel: "Accommodation planning guides",
        children: [
          { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
          { label: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
          { label: "Best hotels in Haifa", to: "/travel-blog/best-hotels-in-haifa/" },
          { label: "Best hotels in Tiberias", to: "/travel-blog/best-hotels-in-tiberias/" },
          { label: "Best Dead Sea hotels", to: "/travel-blog/best-dead-sea-hotels/" },
        ],
      },
      {
        label: "Israel Itineraries",
        headingOnly: true,
        childrenLabel: "Trip lengths",
        children: [
          { label: "Israel in 3 days", to: "/travel-blog/israel-itinerary-3-days/" },
          { label: "Israel in 5 days", to: "/travel-blog/israel-itinerary-5-days/" },
          { label: "Israel in 7 days", to: "/travel-blog/israel-itinerary-7-days/" },
          { label: "Israel in 10 days", to: "/travel-blog/israel-itinerary-10-days/" },
        ],
      },
      {
        label: "Planning Your Trip",
        headingOnly: true,
        childrenLabel: "Trip planning guides",
        children: [
          { label: "Israel travel tips", to: travelGuidePaths.travelTips },
          { label: "Best time to visit Israel", to: travelGuidePaths.bestTime },
          { label: "Holidays & events", to: travelGuidePaths.calendar },
          travelTips.esim,
        ],
      },
      { label: "What to eat in Israel", to: travelGuidePaths.food },
      { label: "Top 10 Israel experiences", to: travelGuidePaths.topTen },
      { label: "Jerusalem travel guide", to: travelGuidePaths.jerusalem },
      { label: "Christian tours in Israel", to: travelGuidePaths.christianTours },
      { label: "Israel tours for seniors", to: travelGuidePaths.seniorTours },
    ],
  },
];
