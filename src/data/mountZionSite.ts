import mountZionHero from "@/assets/guides/mount-zion.jpg";

/** Responsible-operator visiting information checked November 2026. */
export const mountZionSite = {
  title: "Mount Zion, Jerusalem: What to See & How to Visit",
  description:
    "Explore Mount Zion in Jerusalem: the Last Supper Room, David's Tomb, Dormition Abbey, seven places to visit, Google Maps, opening hours and walking routes.",
  updatedAt: "2026-11-22",
  region: "Jerusalem",
  hero: { src: mountZionHero, alt: "Dormition Abbey on Mount Zion beside Jerusalem's Old City" },
  intro:
    "Just outside Jerusalem’s Old City walls, Mount Zion brings together the Room of the Last Supper, the traditional Tomb of King David and Dormition Abbey, all a few minutes’ walk from Zion Gate. Follow a short circuit for the main landmarks, or allow more time for St Peter in Gallicantu, the Chamber of the Holocaust and Oskar Schindler’s grave.",
  official: {
    cicHours: "https://www.cicts.org/our-services/",
    dormition: "https://dormitio.net/abtei/gottesdienst-oeffnungszeiten/",
    dormitionServices: "https://dormitio.net/abtei/gottesdienst-oeffnungszeiten/",
    gallicantu: "https://www.stpeter-gallicantu.org/Practical-Information.html?lang=en",
    mountZionHeritage: "https://www.mountzion.org.il/",
    mountZionMap:
      "https://www.mountzion.org.il/wp-content/uploads/2019/12/Mount-Zion-map-english.pdf",
    catholicCemetery: "https://www.graves.mountzion.org.il/the-catholic-cemetery/",
    holocaustChamber: "https://martefhashoa.org/",
    busPlanner: "https://bus.gov.il/en/home",
  },
  hours: [
    {
      name: "Room of the Last Supper (Cenacle)",
      time: "Daily 08:00–18:00; Yom Kippur closure",
      admission: "Usually free",
      note: "Upstairs from David’s Tomb; staircase to the visitor entrance",
    },
    {
      name: "David’s Tomb",
      time: "Published visitor hours: daily 09:00–sunset",
      admission: "Free",
      note: "Prayer access and religious holidays may follow different arrangements",
    },
    {
      name: "Dormition Abbey",
      time: "Mon–Sat 09:00–17:00; Sunday 11:30–17:00",
      admission: "Generally free",
      note: "The abbey publishes its timetable and holiday notices on its official site",
    },
    {
      name: "St Peter in Gallicantu",
      time: "Mon–Sat 08:30–17:00; closed Sunday, 25 Dec and 1 Jan",
      admission: "Check at entrance",
      note: "The sanctuary reports accessible facilities; arrive via Hebron Road by car",
    },
    {
      name: "Zion Gate",
      time: "Public pedestrian access subject to local conditions",
      admission: "Free",
      note: "Connects the Armenian and Jewish Quarters with Mount Zion",
    },
    {
      name: "Oskar Schindler’s grave",
      time: "Catholic cemetery: daily 09:00–16:00",
      admission: "No general admission ticket listed",
      note: "Separate gate on the southern slope; if locked during hours, use the contact number posted on the gate",
    },
    {
      name: "Chamber of the Holocaust (Martef HaShoa)",
      time: "Sun–Thu 09:00–14:00; generally closed Fri, Sat and Jewish holidays",
      admission: "Confirm with museum",
      note: "Group visits by prior arrangement; museum may close on Jewish holidays",
    },
  ],
} as const;
