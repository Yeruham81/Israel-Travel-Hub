import type { SacredHillId } from "@/data/sacredHillGuides";

/** Visitor planning summary, checked against the Christian Information Center's published schedule.
 * This is a dated reference, not a live entry guarantee; the managing sites may change access.
 * No invented coordinates, live bus departures or pedestrian travel times are included.
 */
export type SiteVisitFact = {
  site: string;
  hours: string;
  admission: string;
  source: string;
  sourceUrl: string;
  mapQuery: string;
};

type DayPlan = {
  title: string;
  summary: string;
  steps: string[];
  caution?: string;
};

type WalkLink = {
  label: string;
  from: string;
  to: string;
  detail: string;
};

export type SacredHillPlanning = {
  facts: SiteVisitFact[];
  days: DayPlan[];
  walks: WalkLink[];
  accessNote: string;
};

const cic = "https://www.cicts.org/en/updated-opening-hours-holy-places-tourist-sites-holy-land";
const dormition = "https://dormitio.net/abtei/gottesdienst-oeffnungszeiten/";
const gallicantu = "https://www.stpeter-gallicantu.org/?lang=en";
const museum = "https://martefhashoa.org/";
const visit = (site: string, hours: string, admission: string, mapQuery: string, sourceUrl = cic, source = "Opening hours") =>
  ({ site, hours, admission, source, sourceUrl, mapQuery }) satisfies SiteVisitFact;

export const sacredHillPlanning: Record<SacredHillId, SacredHillPlanning> = {
  "mount-zion": {
    facts: [
      visit("Room of the Last Supper (Cenacle)", "Daily 08:00–18:00; closed on Yom Kippur", "Free to visit", "Cenacle Upper Room Mount Zion Jerusalem"),
      visit("David's Tomb", "Generally 09:00–sunset", "Free to visit", "King David's Tomb Mount Zion Jerusalem"),
      visit("Dormition Abbey", "Mon–Sat 09:00–17:00; Sunday afternoon (confirm start)", "No general entrance ticket; services take precedence", "Dormition Abbey Jerusalem", dormition, "Abbey hours"),
      visit("St Peter in Gallicantu", "Mon–Sat 08:30–17:00; closed Sunday", "Check on arrival", "Saint Peter in Gallicantu Jerusalem", gallicantu, "Church information"),
      visit("Zion Gate", "Public street/gate; local access conditions apply", "Free", "Zion Gate Jerusalem"),
      visit("Oskar Schindler's grave", "Catholic cemetery 09:00–16:00", "No published ticket price", "Oskar Schindler grave Jerusalem"),
      visit("Chamber of the Holocaust", "Museum: verify today's visiting hours", "Confirm with museum", "Chamber of the Holocaust Mount Zion Jerusalem", museum, "Museum information"),
    ],
    days: [
      {
        title: "Monday–Saturday: central Mount Zion and Gallicantu",
        summary: "Choose a weekday or Saturday if the church of St Peter in Gallicantu is an important stop.",
        steps: [
          "Begin near Zion Gate with Dormition Abbey, the Upper Room and David's Tomb.",
          "Continue to St Peter in Gallicantu during its public visiting hours; the sanctuary and grounds deserve time of their own.",
          "If you want to visit the Catholic cemetery, check the gate hours and finish there, or return through Zion Gate to the Old City.",
        ],
        caution: "Saturday and Jewish holidays can affect prayer-site access at David's Tomb. Confirm with each site if you have a fixed schedule.",
      },
      {
        title: "Sunday: Mount Zion and the Old City",
        summary: "Plan your church interiors around Dormition Abbey's later Sunday opening. Gallicantu normally does not admit sightseeing visitors on Sundays.",
        steps: [
          "Enjoy the Armenian or Jewish Quarter first, then walk out through Zion Gate.",
          "See the Upper Room and David's Tomb, allowing for separate visitor and prayer arrangements.",
          "Visit Dormition Abbey in the afternoon, or finish the day with the neighbouring Old City sights.",
        ],
      },
    ],
    walks: [
      { label: "From Jaffa Gate to Zion Gate", from: "Jaffa Gate Jerusalem", to: "Zion Gate Jerusalem", detail: "An Old City approach through the Armenian Quarter; check the walking route and access on the map." },
      { label: "From Zion Gate to St Peter in Gallicantu", from: "Zion Gate Jerusalem", to: "Saint Peter in Gallicantu Jerusalem", detail: "An optional lower-hillside extension rather than part of the short central circuit." },
      { label: "From Zion Gate to the Western Wall", from: "Zion Gate Jerusalem", to: "Western Wall Jerusalem", detail: "Continue through the Jewish Quarter when combining Mount Zion with Old City sightseeing." },
    ],
    accessNote: "For a vehicle pickup, choose a road-accessible location near Mount Zion or Zion Gate, rather than expecting a car at a church door inside a pedestrian courtyard. Agree on the collection point before going on foot to Gallicantu or the cemetery.",
  },
  "mount-of-olives": {
    facts: [
      visit("Seven Arches panoramic viewpoint", "Open-air viewpoint; access may vary locally", "Free", "Seven Arches Hotel Mount of Olives Jerusalem"),
      visit("Pater Noster Church", "Tue, Thu & Sat 08:00–12:00 (temporary hours)", "12 ILS; students 10 ILS", "Pater Noster Church Jerusalem"),
      visit("Chapel of the Ascension", "Generally 08:00–17:00", "10 ILS", "Chapel of the Ascension Jerusalem"),
      visit("Dominus Flevit", "Mon–Thu & Sat 08:00–17:00; Fri & Sun split hours", "Check at entrance", "Dominus Flevit Church Jerusalem"),
      visit("Church of St Mary Magdalene", "Tue, Thu & Sat 10:00–12:00", "Check at entrance", "Church of Mary Magdalene Mount of Olives Jerusalem"),
      visit("Gethsemane & Church of All Nations", "07:30–18:00 Apr–Sep; 07:30–17:00 Oct–Mar", "No general entrance ticket", "Church of All Nations Gethsemane Jerusalem"),
      visit("Tomb of the Virgin Mary", "Generally 08:00–18:00", "Check at entrance", "Tomb of the Virgin Mary Jerusalem"),
      visit("Mount of Olives Jewish cemetery", "Varies by section and purpose of visit", "No single sightseeing ticket", "Mount of Olives Jewish Cemetery Jerusalem", "https://cityofdavid.org.il/en/sites/mount-of-olives-eng/", "Visitor information"),
    ],
    days: [
      {
        title: "Tuesday, Thursday or Saturday: the fuller church route",
        summary: "These are the best days to consider if Pater Noster and St Mary Magdalene are important to you.",
        steps: [
          "Start early at Pater Noster while the morning visiting window is open, and visit the nearby Chapel of the Ascension.",
          "Continue to the Seven Arches panorama and Dominus Flevit, then visit St Mary Magdalene while its 10:00–12:00 window is open.",
          "Finish at Gethsemane and the Church of All Nations, and cross towards Lion's Gate if you are continuing into the Old City.",
        ],
        caution: "The hillside contains distinct entrances and paths. Check your exact sequence before the day: the 10:00–12:00 St Mary Magdalene window is short.",
      },
      {
        title: "Other days: panorama, Dominus Flevit and Gethsemane",
        summary: "The main viewpoint and Gethsemane still make a rewarding visit without trying to enter every upper church.",
        steps: [
          "Begin at Seven Arches with the Jerusalem panorama.",
          "Follow the Palm Sunday road towards Dominus Flevit when open, then continue to the Church of All Nations and the Garden of Gethsemane.",
          "Add the nearby Tomb of Mary if you wish, or continue through Lion's Gate to the Old City.",
        ],
        caution: "On Friday and Sunday, Dominus Flevit has split morning and afternoon visiting hours; check the current schedule.",
      },
    ],
    walks: [
      { label: "From Seven Arches to Gethsemane", from: "Seven Arches Hotel Mount of Olives Jerusalem", to: "Church of All Nations Gethsemane Jerusalem", detail: "The traditional downhill Palm Sunday route with optional church detours; Google Maps may show a different pedestrian path." },
      { label: "From Gethsemane to Lion's Gate", from: "Church of All Nations Gethsemane Jerusalem", to: "Lions Gate Old City Jerusalem", detail: "The useful Old City connection after the lower churches." },
      { label: "From Pater Noster to the main viewpoint", from: "Pater Noster Church Jerusalem", to: "Seven Arches Hotel Mount of Olives Jerusalem", detail: "Upper-ridge connection before following the pilgrimage route downhill." },
    ],
    accessNote: "A vehicle can take you to the upper viewpoint, while the lower sites are near Gethsemane. If walking the hillside is not suitable for your party, consider separate drop-offs at these two areas instead of a continuous walk.",
  },
};
