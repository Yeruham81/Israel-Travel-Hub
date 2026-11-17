import mountBeatitudesHero from "@/assets/guides/mount-of-beatitudes.jpg";

/** Shared visitor details for the Church of the Beatitudes, its directory entry and SEO. */
export const mountBeatitudesSite = {
  title: "Mount of Beatitudes: Church, Gardens and Sea of Galilee Views",
  description: "Plan your visit to the Mount of Beatitudes: octagonal church, gardens, Sea of Galilee views, opening hours, parking fees and nearby sites.",
  region: "Sea of Galilee" as const,
  intro: "The Mount of Beatitudes overlooks the northwestern Sea of Galilee, where Christian tradition places Jesus' Sermon on the Mount. Visit the beautiful octagonal church, wander through its peaceful gardens and enjoy sweeping views over the lake.",
  hero: { src: mountBeatitudesHero, alt: "Octagonal Church of the Beatitudes and its landscaped gardens above the Sea of Galilee" },
  updatedAt: "2026-11-17",
  visit: {
    morning: "08:00–11:30",
    afternoon: "14:00–16:30",
    closureNote: "Closed at Easter, Christmas and the Feast of the Beatitudes",
    parkingCar: "₪30",
    parkingVan: "₪60",
    parkingBus: "₪100",
    phone: "04-6711200",
    phoneHref: "+97246711200",
    prayerPhone: "04-6711223",
    prayerPhoneHref: "+97246711223",
  },
  sources: {
    hoursAndParking: "https://www.cicts.org/our-services/#:~:text=Mount%20of%20Beatitudes",
    churchAbout: "https://beatitudes.church/aboutcontact-us/",
    visitAndGroups: "https://beatitudes.church/plan-your-visit/",
    jesusTrail: "https://jesustrail.com/about-the-jesus-trail/",
  },
};
