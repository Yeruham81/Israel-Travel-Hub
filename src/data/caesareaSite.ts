/** Shared visitor information for the upgraded Caesarea National Park attraction guide. */
export const caesareaSite = {
  title: "Caesarea National Park: Roman Ruins, Harbor & Visitor Guide",
  description:
    "Visit Caesarea National Park: Roman theater, hippodrome, ancient harbor, Crusader walls and aqueduct, with tickets, hours and practical access tips.",
  region: "Haifa & northern coast" as const,
  updatedAt: "2026-11-17",
  intro:
    "At Caesarea, Roman ruins stretch along the Mediterranean shore, from an ancient theater and chariot-racing arena to the harbor built by King Herod. I recommend allowing a few hours to explore the archaeological park on foot, with extra time for the harbor and its visitors' center.",
  hero: {
    src: "/images/attractions/caesarea-ruins-hero.svg",
    alt: "Ancient stone foundations and columns of Caesarea National Park overlooking the Mediterranean Sea",
  },
  visit: {
    summerRegular: "08:00–17:00",
    summerFriday: "08:00–16:00",
    winterRegular: "08:00–16:00",
    winterFriday: "08:00–15:00",
    specialHolidayEves: "08:00–13:00",
    finalEntryBeforeClosing: "1 hour",
    adult: "₪46",
    child: "₪27",
    groupAdult: "₪39",
    groupChild: "₪23",
    groupThreshold: "over 30",
    harborOnly: "₪18",
    student: "₪39",
    soldier: "₪27",
    israeliSenior: "₪23",
    parkPhone: "04-6267080",
    parkPhoneHref: "+97246267080",
  },
  sources: {
    park: "https://en.parks.org.il/reserve-park/caesarea-national-park/",
    prices: "https://www.parks.org.il/article/price/",
    harborPrices: "https://caesarea.com/en/rec-leisure/%D7%9E%D7%97%D7%99%D7%A8%D7%95%D7%9F/",
    harborHours:
      "https://caesarea.com/en/rec-leisure/%D7%A9%D7%A2%D7%95%D7%AA-%D7%A4%D7%A2%D7%99%D7%9C%D7%95%D7%AA/",
    visitorCenter:
      "https://caesarea.com/en/rec-leisure/%D7%9E%D7%A8%D7%9B%D7%96-%D7%94%D7%9E%D7%91%D7%A7%D7%A8%D7%99%D7%9D/",
    visitorFaq:
      "https://caesarea.com/en/rec-leisure/%D7%A9%D7%90%D7%9C%D7%95%D7%AA-%D7%95%D7%AA%D7%A9%D7%95%D7%91%D7%95%D7%AA/",
    harborSites: "https://caesarea.com/en/rec-leisure/the-caesarea-port-and-the-old-city/",
  },
};
