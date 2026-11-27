import telMegiddoHero from "@/assets/guides/2026-10/tel-megiddo.webp";

/** Facts shared by the Tel Megiddo visitor page and SEO registry. */
export const telMegiddoSite = {
  title: "Tel Megiddo National Park: Ancient City, Water System & Armageddon",
  description:
    "Visit Tel Megiddo National Park: Canaanite gates, ancient city layers, underground water system, opening hours, tickets and access in the Jezreel Valley.",
  region: "Jezreel Valley & Lower Galilee" as const,
  updatedAt: "2026-11-17",
  intro:
    "At Tel Megiddo, the remains of many ancient cities rise above the Jezreel Valley. I recommend taking time to follow the archaeological trail through the gates, temples and stables, then visiting the famous underground water system if its stairs and tunnel suit you. This guide will help you plan a comfortable visit and understand the site's Armageddon connection.",
  hero: {
    src: telMegiddoHero,
    alt: "Excavated stone foundations and palm trees above the Jezreel Valley at Tel Megiddo National Park",
  },
  prices: { adult: "₪31", child: "₪16" },
  hours: {
    summerRegular: "08:00–17:00",
    summerFriday: "08:00–16:00",
    winterRegular: "08:00–16:00",
    winterFriday: "08:00–15:00",
  },
  phone: "04-6590316",
  phoneHref: "+97246590316",
  email: "gl.megido@npa.org.il",
  sources: {
    park: "https://en.parks.org.il/reserve-park/tel-megiddo-armageddon-national-park/",
    reserve:
      "https://en.parks.org.il/%D7%94%D7%96%D7%9E%D7%A0%D7%95%D7%AA-%D7%9C%D7%90%D7%AA%D7%A8%D7%99%D7%9D/",
    unesco: "https://whc.unesco.org/en/list/1108/",
    water: "https://www.parks.org.il/article/megiddo-trip-talk-8/",
  },
};
