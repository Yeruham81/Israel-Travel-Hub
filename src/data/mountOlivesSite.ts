/** Checked against the Christian Information Center's September 2026 listing and
 * City of David's Mount of Olives visitor guidance. Each compound has its own rules. */
export const mountOlivesSite = {
  title: "Mount of Olives, Jerusalem: Viewpoint, Churches & Visitor Guide",
  description:
    "Explore the Mount of Olives in Jerusalem: Seven Arches viewpoint, Gethsemane, historic churches, opening hours and downhill walking routes.",
  updatedAt: "2026-11-22",
  region: "Jerusalem",
  hero: {
    src: "/images/attractions/mount-of-olives.webp",
    alt: "Panoramic view across Jerusalem's Old City from the Mount of Olives",
  },
  intro:
    "The Mount of Olives rises opposite Jerusalem’s Old City, with a panoramic lookout above the historic Jewish cemetery and churches along the hillside. I recommend starting at the Seven Arches viewpoint, then walking downhill towards Dominus Flevit and Gethsemane if the slope suits you. You can continue towards Lion’s Gate or arrange a pickup at the foot of the hill.",
  official: {
    churchHours: "https://www.cicts.org/our-services/",
    cemetery: "https://cityofdavid.org.il/en/sites/mount-of-olives-eng/",
    cemeteryGraves: "https://harhazeitim.com/en/homepage/",
    graveLocator:
      "https://cityofdavid.org.il/en/the-mapping-system-at-the-mount-of-olives-cemetery-eng/",
    trailGuide: "https://www.enjoyjerusalem.org/explore/paths-and-trails/path/280",
    transit: "https://bus.gov.il/en/home",
    moovit:
      "https://moovitapp.com/index/en/public_transit-Monte_de_los_Olivos-Israel-site_61262338-1",
    jerusalemWalk: "https://cityofdavid.org.il/en/the-jerusalem-trail/",
  },
  hours: [
    {
      name: "Seven Arches panoramic lookout",
      time: "Open-air terrace; no fixed public ticketing hours",
      admission: "Free",
      note: "Access can change for local events",
    },
    {
      name: "Pater Noster Church",
      time: "Current temporary hours: Tue & Thu 09:00–12:00",
      admission: "₪12; students ₪10",
      note: "The standard schedule also lists Sat 08:00–12:00; confirm Saturday access before visiting",
    },
    {
      name: "Chapel of the Ascension",
      time: "Generally 08:00–17:00",
      admission: "₪10",
      note: "Separate compound near Pater Noster",
    },
    {
      name: "Dominus Flevit",
      time: "Mon–Thu & Sat 08:30–17:00; Fri & Sun 08:30–11:50 and 14:00–17:00",
      admission: "Check on arrival",
      note: "Separate hillside entrance",
    },
    {
      name: "Church of St Mary Magdalene",
      time: "Tue, Thu & Sat 10:00–12:00",
      admission: "Check on arrival",
      note: "Short visiting window; separate entrance",
    },
    {
      name: "Church of All Nations (Gethsemane)",
      time: "Daily 07:30–18:00 Apr–Sep; 07:30–17:00 Oct–Mar",
      admission: "Generally free",
      note: "Last entry about 10 minutes before closing; grotto hours differ",
    },
    {
      name: "Tomb of the Virgin Mary",
      time: "Generally 08:00–18:00",
      admission: "Check on arrival",
      note: "Long staircase to the underground church",
    },
    {
      name: "Mount of Olives Jewish cemetery",
      time: "Access varies by cemetery section and purpose",
      admission: "No general sightseeing ticket",
      note: "Active burial grounds; the information center is temporarily closed",
    },
  ],
} as const;
