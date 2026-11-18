import mountZionHero from "@/assets/guides/mount-zion.jpg";

/** Responsible-operator visiting information checked November 2026. */
export const mountZionSite = {
  title: "Mount Zion, Jerusalem: Last Supper Room, Abbey & Visitor Guide",
  description: "Plan a Mount Zion visit near Jerusalem's Old City: Cenacle, David's Tomb, Dormition Abbey, St Peter in Gallicantu, Schindler's grave, hours, entry and walking directions.",
  updatedAt: "2026-11-18",
  region: "Jerusalem",
  hero: { src: mountZionHero, alt: "Dormition Abbey on Mount Zion beside Jerusalem's Old City" },
  intro: "Just outside Jerusalem’s Old City walls by Zion Gate, Mount Zion brings together Christian pilgrimage sites, Jewish tradition and more recent history. The Upper Room, David’s Tomb and Dormition Abbey are close enough for a short walk. If you have more time, continue down to St Peter in Gallicantu or visit Oskar Schindler’s grave in the separate Catholic cemetery.",
  official: {
    cicHours: "https://www.cicts.org/our-services/",
    dormition: "https://dormitio.net/oeffnungszeiten/",
    dormitionServices: "https://dormitio.net/abtei/gottesdienst-oeffnungszeiten/",
    gallicantu: "https://www.stpeter-gallicantu.org/Practical-Information.html?lang=en",
    mountZionHeritage: "https://www.mountzion.org.il/",
    catholicCemetery: "https://www.graves.mountzion.org.il/the-catholic-cemetery/",
    holocaustChamber: "https://martefhashoa.org/",
    busPlanner: "https://bus.gov.il/en/home",
  },
  hours: [
    { name: "Room of the Last Supper (Cenacle)", time: "Daily 08:00–18:00; closed on Yom Kippur", admission: "Usually free", note: "Upper floor; stair access and worship arrangements" },
    { name: "David’s Tomb", time: "Prayer site with its own visiting and worship arrangements", admission: "Usually free", note: "Lower level; separate prayer areas" },
    { name: "Dormition Abbey", time: "Mon–Sat 09:00–17:00; Sunday 11:30–17:00", admission: "Generally free", note: "Church services and holidays can affect visits" },
    { name: "St Peter in Gallicantu", time: "Mon–Sat 08:30–17:00; closed Sunday, 25 Dec and 1 Jan", admission: "Check at entrance", note: "The sanctuary reports an accessible site" },
    { name: "Zion Gate", time: "Public pedestrian access subject to local conditions", admission: "Free", note: "Connects the Armenian and Jewish Quarters with Mount Zion" },
    { name: "Oskar Schindler’s grave", time: "Catholic cemetery; confirm gate access before descending", admission: "No general admission ticket listed", note: "Separate entrance on the southern slope" },
    { name: "Chamber of the Holocaust (Martef HaShoa)", time: "Sun–Thu 09:00–14:00; generally closed Fri, Sat and Jewish holidays", admission: "Confirm with museum", note: "Groups should arrange visits in advance" },
  ],
} as const;
