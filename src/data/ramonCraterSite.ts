import ramonPanorama from "@/assets/negev/ramon-panorama.webp";

/** Verified visitor facts for Makhtesh Ramon, separate from free crater viewpoints. */
export const ramonCraterSite = {
  title: "Ramon Crater (Makhtesh Ramon): Viewpoints, Visitor Center & Trails",
  description:
    "Explore Ramon Crater and Mitzpe Ramon: free rim viewpoints, visitor center tickets and hours, Colored Crater Road, HaMinsara, hikes, accessibility and stargazing.",
  region: "Negev Desert" as const,
  updatedAt: "2026-11-18",
  intro:
    "Ramon Crater is one of the Negev's most extraordinary landscapes, with vast desert cliffs, coloured rock layers and trails that reveal millions of years of geology. I recommend starting at the rim in Mitzpe Ramon, then choosing whether to visit the indoor visitor center, drive into the makhtesh or explore one of its marked walks.",
  hero: {
    src: ramonPanorama,
    alt: "Panoramic view across the layered desert cliffs and wide basin of Makhtesh Ramon",
  },
  visit: {
    adult: "₪31",
    child: "₪16",
    student: "₪26",
    adultGroup: "₪26",
    childGroup: "₪14",
    activeReservist: "₪23",
    soldier: "₪16",
    israeliSenior: "₪16",
    summerRegular: "08:00–17:00",
    summerFriday: "08:00–16:00",
    winterRegular: "08:00–16:00",
    winterFriday: "08:00–15:00",
    holidayEves: "08:00–13:00",
    phone: "08-6588691",
    email: "mm.ramon@npa.org.il",
  },
  sources: {
    center:
      "https://en.parks.org.il/reserve-park/makhtesh-ramon-nature-reserve-and-visitors-center/",
    prices: "https://www.parks.org.il/article/price/",
    colors: "https://www.parks.org.il/reserve-park/ramon/",
    minsara: "https://www.parks.org.il/trip/negev-3/",
    ardon: "https://www.parks.org.il/trip/ardon/",
    haiRamon: "https://en.parks.org.il/reserve-park/chay-ramon/",
    darkSky: "https://darksky.org/places/ramon-crater-nature-reserve-dark-sky-park/",
  },
} as const;
