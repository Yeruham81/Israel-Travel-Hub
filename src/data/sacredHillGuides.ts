import mountZion from "@/assets/guides/mount-zion.jpg";
import type { Attraction } from "@/data/attractionGuideTypes";

export type SacredHillId = "mount-zion" | "mount-of-olives";

type Stop = {
  name: string;
  description: string;
  visit: string;
  link?: { label: string; url: string };
};
type WalkingRoute = {
  name: string;
  time: string;
  bestFor: string;
  steps: string[];
  note: string;
};
type PracticalNote = { title: string; text: string };
export type SacredHillEditorial = {
  eyebrow: string;
  snapshot: { label: string; value: string }[];
  routeIntro: string;
  routes: WalkingRoute[];
  stopIntro: string;
  stops: Stop[];
  transportIntro: string;
  transport: PracticalNote[];
  practical: PracticalNote[];
  historyTitle: string;
  history: string[];
  hotelNote: string;
  relatedHotel: { text: string; to: string };
};

export const sacredHillOverrides: Record<SacredHillId, Partial<Attraction>> = {
  "mount-zion": {
    title: "Mount Zion, Jerusalem: What to See & How to Visit",
    description: "Plan a Mount Zion visit in Jerusalem: Last Supper Room, David's Tomb, Dormition Abbey, St Peter in Gallicantu, Zion Gate, walking route and access advice.",
    intro: "Mount Zion is immediately south of Jerusalem's Old City walls, beside Zion Gate. The traditional Room of the Last Supper and David's Tomb are in the same building; Dormition Abbey stands a few minutes away, and St Peter in Gallicantu is lower down the eastern slope. You can see the central sites on foot without crossing the whole city.",
    takeaway: "For a short visit, enter from Zion Gate and see Dormition Abbey, the Cenacle and David's Tomb. Add St Peter in Gallicantu and the Catholic cemetery if you have more time. Check access before setting out: the sites are administered separately and do not share one opening schedule.",
    duration: "About 1–2 hours for the central sites; 2–3 hours with Gallicantu and the cemetery",
    image: { src: mountZion, alt: "Dormition Abbey on Mount Zion near Jerusalem Old City" },
    official: [
      { label: "Holy-site opening hours — Christian Information Center", url: "https://www.cicts.org/en/updated-opening-hours-holy-places-tourist-sites-holy-land" },
      { label: "Window to Mount Zion — heritage and access", url: "https://www.mountzion.org.il/" },
      { label: "Dormition Abbey — monastery", url: "https://www.dormitio.net/" },
    ],
    faqs: [
      { q: "Where is Mount Zion in Jerusalem?", a: "The visitor sites are immediately outside the southern Old City wall, beside Zion Gate. They are not on the same hill as the Mount of Olives, which lies east of the Old City." },
      { q: "Is Mount Zion inside the Old City?", a: "The places most visitors call Mount Zion are outside the present Ottoman walls. You can walk through Zion Gate into the Armenian Quarter and on toward the Jewish Quarter." },
      { q: "Where is the Room of the Last Supper?", a: "The Cenacle is upstairs in the historic complex above the traditional David's Tomb. Christian tradition identifies it with the Last Supper and Pentecost; the surviving room is mainly medieval, not a preserved first-century dining room." },
      { q: "Is King David really buried on Mount Zion?", a: "David's Tomb is a long-venerated traditional location and an active Jewish prayer site. The burial identification is not established archaeologically; biblical Jerusalem's earlier City of David lies on a different ridge." },
      { q: "How long should I allow to visit Mount Zion?", a: "About one to two hours allows a focused visit to the Cenacle, David's Tomb and Dormition Abbey, depending on access. Add approximately another hour for St Peter in Gallicantu and the Catholic cemetery." },
      { q: "Do I need tickets or a guide for Mount Zion?", a: "You can walk through the area independently. The Cenacle and David's Tomb have generally been free to enter, while other compounds may have separate entry or visitor arrangements. A guide is optional; compare the actual stops and guiding services offered." },
      { q: "Can a taxi take me directly to the Last Supper Room?", a: "A car can approach road-accessible points near Mount Zion but cannot take you through every courtyard or pedestrian passage. Arrange a precise drop-off and pickup, especially if you are combining the hill with Old City sightseeing." },
    ],
  },
  "mount-of-olives": {
    title: "Mount of Olives, Jerusalem: Viewpoint & Walking Guide",
    description: "Visit Jerusalem's Mount of Olives: panoramic lookout, Palm Sunday road, Pater Noster, Dominus Flevit, Gethsemane, churches and downhill walking route.",
    intro: "The Mount of Olives faces Jerusalem's Old City across the Kidron Valley. Most visitors come for the famous skyline view, but the hillside also holds the Jewish cemetery and several sites linked to Jesus' final days. The viewpoint is high above Gethsemane: visiting both is easiest if you arrange your route before you arrive.",
    takeaway: "For the classic panorama, head to the public lookout near the Seven Arches Hotel. If you want the Christian sites as well, start on the upper slope and walk downhill toward Dominus Flevit and Gethsemane. The ascent back is steep; agree on a lower pickup or continue on foot toward Lion's Gate.",
    duration: "20–40 minutes for the viewpoint; 2–3 hours for a selective downhill walk; longer for additional church interiors",
    image: { src: "/images/attractions/mount-of-olives.webp", alt: "The Mount of Olives hillside facing the Old City of Jerusalem" },
    official: [
      { label: "Holy-site opening hours — Christian Information Center", url: "https://www.cicts.org/en/updated-opening-hours-holy-places-tourist-sites-holy-land" },
      { label: "Christian pilgrimage information — Custody of the Holy Land", url: "https://www.custodia.org/en" },
      { label: "Jerusalem tourism visitor information", url: "https://www.itraveljerusalem.com/en" },
    ],
    faqs: [
      { q: "Where is the best view from the Mount of Olives?", a: "The classic public panorama is the terrace by the Seven Arches Hotel on the upper ridge, looking west over the Jewish cemetery toward the Old City and Temple Mount/Haram al-Sharif." },
      { q: "How do I get from the Old City to the Mount of Olives?", a: "You can walk from Lion's Gate toward Gethsemane and climb the hill, but the route is steep. A taxi or pre-arranged vehicle to the upper viewpoint followed by a downhill walk is usually easier. Check current public bus routes locally rather than relying on old route numbers." },
      { q: "Can I walk down from the viewpoint to Gethsemane?", a: "Yes. The hillside route passes religious sites including Dominus Flevit and reaches Gethsemane near the foot of the hill. Expect a sharp gradient, uneven surfaces and sections without much shade." },
      { q: "How long does it take to visit the Mount of Olives?", a: "The view alone can take less than an hour. Allow roughly two to three hours for a downhill walk with selected church stops; add time if you plan to enter Pater Noster, the Chapel of the Ascension or other compounds." },
      { q: "Is the Mount of Olives free to visit?", a: "There is generally no admission charge for the public viewpoint or ordinary streets. Some churches and compounds charge a separate fee and have restricted visiting windows; check current details before travelling." },
      { q: "Is the Mount of Olives accessible for wheelchair users?", a: "The public lookout can be a more practical objective than the steep pilgrimage path, but kerbs, paving and vehicle access still require checking. The full downhill church route is not a reliably step-free itinerary." },
      { q: "Can I visit the Jewish cemetery?", a: "It is an active and sacred burial place, not a pedestrian shortcut. Access arrangements for specific sections and graves differ; follow the site's guidance and respect funerals and mourners." },
      { q: "Should I book transport or a guided tour?", a: "Choose transport if you mainly need a convenient drop-off and pickup. Choose a guided experience if historical or biblical interpretation is important, and confirm that a licensed guide, the desired churches and their entries are included." },
    ],
  },
};

export const sacredHillEditorial: Record<SacredHillId, SacredHillEditorial> = {
  "mount-zion": {
    eyebrow: "Jerusalem · South of Zion Gate",
    snapshot: [
      { label: "Start", value: "Zion Gate (south side of the Old City)" },
      { label: "Best for", value: "History, Christian pilgrimage and Jewish traditions" },
      { label: "Walking", value: "Compact central area; steps toward Gallicantu" },
      { label: "Entry", value: "Different rules for each site" },
    ],
    routeIntro: "The sites are close together, so there is little benefit in driving between them. The useful decision is whether to stay near Zion Gate or continue down the slope to Gallicantu and the cemetery.",
    routes: [
      { name: "The main Mount Zion sights", time: "About 1–2 hours", bestFor: "First visit or a stop during an Old City walk", steps: ["Arrive at Zion Gate and notice the historic gate and its 1948 battle scars.", "Walk to Dormition Abbey for the church and, if open, the crypt.", "Continue to the Cenacle (Upper Room) on the upper floor of the David's Tomb complex.", "Visit the traditional David's Tomb below, observing prayer-space rules.", "Return through Zion Gate to the Armenian or Jewish Quarter."], note: "This is a compact circuit, but individual interiors can close during services or religious observances." },
      { name: "A longer pilgrimage and history walk", time: "About 2–3 hours", bestFor: "Visitors interested in the Passion narrative and twentieth-century history", steps: ["Follow the central Mount Zion circuit.", "Walk down toward St Peter in Gallicantu for the church, archaeology and views over the valley.", "If you wish, continue to the Catholic cemetery containing Oskar Schindler's grave; confirm the gate is open.", "Finish near a suitable road-accessible pickup, or return to Zion Gate on foot."], note: "Gallicantu and the cemetery lie below the main area; allow for the uphill return if your driver is waiting near Zion Gate." },
    ],
    stopIntro: "Mount Zion's religious associations belong to different periods and traditions. The places below are worth visiting for what they are today without assuming every traditional identification is archaeologically certain.",
    stops: [
      { name: "Cenacle — Room of the Last Supper", description: "The vaulted upper chamber is revered by Christians as the traditional setting of the Last Supper and is also connected with Pentecost. The building has Crusader, Mamluk and Ottoman layers; it should not be presented as the original first-century room.", visit: "Usually visited without a ticket, subject to its own rules. As of the Christian Information Center's September 2026 schedule, the Cenacle was listed 08:00–18:00, closed on Yom Kippur. Check again for the day of your visit." },
      { name: "David's Tomb", description: "Beneath the Cenacle is a traditional tomb site associated with King David and used for Jewish prayer. Its status as the biblical king's burial site is a matter of tradition rather than confirmed archaeology.", visit: "Respect separate prayer areas and posted dress and photography rules. Access can differ from the upstairs Cenacle; do not rely on a single timetable for both." },
      { name: "Dormition Abbey", description: "The Benedictine church is associated with the Christian belief in Mary's Dormition. Its round stone tower and interior mosaics are striking, while the crypt has its own devotional focus.", visit: "The church and crypt may not be accessible during all services. The September 2026 holy-site list gives shorter Sunday visiting hours than weekdays." , link: { label: "Monastery website", url: "https://www.dormitio.net/" }},
      { name: "St Peter in Gallicantu", description: "On the eastern slope, this church commemorates the traditional site of Peter's denial of Jesus. The sanctuary, archaeological remains and stepped approach make it a more substantial visit than a quick photo stop.", visit: "Separate management and visiting arrangements; the September 2026 holy-site list reports closure to visitors on Sundays. Confirm on the current schedule." },
      { name: "Zion Gate", description: "One of the Old City's historic gates, it connects Mount Zion with the Armenian Quarter and Jewish Quarter. Visible damage recalls fighting around the gate in 1948.", visit: "A natural beginning or ending point, with pedestrian access subject to local security and street conditions." },
      { name: "Oskar Schindler's grave", description: "Schindler, whose rescue of Jews during the Holocaust became internationally known, was buried in the Catholic cemetery on Mount Zion. This is a small commemorative stop, not a conventional visitor attraction.", visit: "The cemetery has a separate gated entrance and published visiting hours. Check before descending, and behave respectfully among the graves." },
    ],
    transportIntro: "Mount Zion is easy to combine with the Old City, but it is not a drive-through sightseeing route.",
    transport: [
      { title: "On foot from the Old City", text: "From the Armenian Quarter or Jewish Quarter, head to Zion Gate and exit south. From Jaffa Gate, allow for the walk through the city, possible steps and your chosen route rather than assuming an exact door-to-door time." },
      { title: "By taxi or private driver", text: "Ask for a legal road-accessible Mount Zion or Zion Gate drop-off. If you plan to finish at Gallicantu or the cemetery, agree on the pickup point before setting out; vehicles cannot enter the courtyards or Old City pedestrian lanes." },
      { title: "By public transport", text: "Public transport can bring you to the surrounding streets, but routes, walk-in approaches and Shabbat service vary. Check the current trip with an up-to-date journey planner instead of relying on an old bus number." },
    ],
    practical: [
      { title: "Opening hours and worship", text: "The Cenacle, David's Tomb, Dormition Abbey, Gallicantu and the Catholic cemetery have different custodians. Christian and Jewish holidays can affect access even when nearby streets remain open." },
      { title: "Walking and clothing", text: "Wear shoes suited to polished stone and steps, and cover shoulders and knees at religious sites. The descent toward Gallicantu is more demanding than the central Mount Zion circuit." },
      { title: "Photography", text: "Some prayer areas do not allow photography or have restrictions during worship. Ask before taking photographs of worshippers or people at graves." },
      { title: "Combining with other sights", text: "A Zion Gate visit pairs naturally with the Armenian and Jewish Quarters. The Mount of Olives is across the city and valley; add a vehicle leg if you want to visit both without an exhausting walk." },
    ],
    historyTitle: "Why is this hill called Mount Zion?",
    history: [
      "The meaning and location of the name Zion changed over time. In early biblical references it is associated with the stronghold captured by David, generally identified with the City of David ridge southeast of today's Old City. Later, Zion became a name for Jerusalem and its sacred centre. The hill now called Mount Zion lies southwest of the Temple Mount, outside today's Old City wall.",
      "The Upper Room, David's Tomb and Dormition traditions developed around the current hill over centuries. This history helps explain why Jewish and Christian visitors may come to the same small area for different reasons.",
    ],
    hotelNote: "If Mount Zion is a priority, the Old City and areas near Jaffa Gate or King David Street can be convenient bases. Compare actual walking access to Zion Gate and the hotel entrance rather than choosing on a map alone.",
    relatedHotel: { text: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
  },
  "mount-of-olives": {
    eyebrow: "Jerusalem · East of the Old City",
    snapshot: [
      { label: "Start", value: "Upper lookout near the Seven Arches Hotel" },
      { label: "Best for", value: "Panorama, Gethsemane and Christian pilgrimage" },
      { label: "Walking", value: "Steep downhill paths; difficult uphill return" },
      { label: "Entry", value: "Viewpoint free; churches vary" },
    ],
    routeIntro: "The usual way to avoid climbing in the heat is to reach the upper ridge by vehicle and then work downhill. The summit's Pater Noster and Ascension sites are not the same stop as the lookout, so decide which you want before the descent.",
    routes: [
      { name: "The view and Gethsemane", time: "Roughly 1.5–2.5 hours with stops", bestFor: "Most first-time visitors", steps: ["Start at the public panoramic terrace near the Seven Arches Hotel.", "Follow the descending pilgrimage road toward Dominus Flevit; enter if open.", "Continue downhill toward the Garden of Gethsemane and the Church of All Nations.", "If there is time, visit the nearby traditional Tomb of the Virgin Mary.", "Finish at a prearranged lower pickup or walk toward Lion's Gate."], note: "The road is steep and exposed. From the viewpoint it is much easier to descend than to walk back up." },
      { name: "A fuller Christian pilgrimage", time: "About 3–4 hours or more", bestFor: "Visitors planning to see additional chapels and churches", steps: ["Begin on the upper ridge at Pater Noster and/or the Chapel of the Ascension if they are open.", "Move to the Seven Arches panorama and then descend toward Dominus Flevit.", "Consider St Mary Magdalene Church if its restricted opening window matches your day; do not assume it is a walk-in stop.", "Visit the Church of All Nations and Gethsemane.", "Finish at the Tomb of Mary or continue toward the Old City after checking the return route."], note: "The route is not one straight road through every site. Several compounds require detours, gates or separate admission, and some close at midday." },
    ],
    stopIntro: "The panorama is open-air, while many churches are separately managed sites with narrow visiting windows. Pick the interiors that matter to you rather than building the entire day around an assumed timetable.",
    stops: [
      { name: "Mount of Olives panoramic lookout", description: "From the upper ridge you look over a broad slope of Jewish graves toward the Temple Mount/Haram al-Sharif, the Old City walls and the Jerusalem skyline. The familiar viewpoint is near the Seven Arches Hotel, not down by Gethsemane.", visit: "An open-air, generally unticketed stop. Mornings are often more comfortable for the steep walk that follows; keep clear of traffic and tour-bus stopping areas." },
      { name: "Pater Noster (Eleona)", description: "The Carmelite church compound commemorates the tradition of Jesus teaching the Lord's Prayer. Versions of the prayer appear in many languages on ceramic panels.", visit: "Check before visiting: the Christian Information Center's September 2026 bulletin lists temporary morning-only hours on selected days and separate admission. This is not reliably an everyday stop." },
      { name: "Chapel of the Ascension", description: "A small historic chapel in the At-Tur area marks a traditional location of Jesus' Ascension. Other churches on the Mount of Olives also carry Ascension associations.", visit: "The walled site has a separate entrance and admission charge. Confirm opening and religious observances before travelling up specifically for it." },
      { name: "Dominus Flevit", description: "The tear-shaped Franciscan chapel recalls the Gospel account of Jesus lamenting over Jerusalem. Its position gives a closer view of the Old City from the middle of the slope.", visit: "Reached on the steep downhill route; opening times and services can interrupt visits. Footing may be slippery after rain." },
      { name: "Church of St Mary Magdalene", description: "The Russian Orthodox church with golden domes stands above Gethsemane. It is a memorable part of the hillside view but has its own entrance and limited public visiting times.", visit: "The September 2026 holy-site schedule lists only selected mornings. Treat entry as optional, not a guaranteed stop." },
      { name: "Garden of Gethsemane and Church of All Nations", description: "At the foot of the Mount of Olives, the garden and Basilica of the Agony commemorate Jesus' prayer before his arrest. The olive trees are old, but individual trees should not be claimed as proven witnesses of the biblical events.", visit: "The church is a place of worship. Confirm hours and service restrictions; the garden's accessible areas are limited and are not a park to wander freely." },
      { name: "Tomb of the Virgin Mary", description: "This traditional burial site of Mary is near Gethsemane and has a steep stairway down into a historic church. It belongs to different custodians from the Church of All Nations.", visit: "Worth considering if open and you can manage the stairs; it is not suitable for every mobility need." },
      { name: "Jewish cemetery on the Mount of Olives", description: "The extensive hillside cemetery has centuries of Jewish history and remains a place of burial and mourning. Visitors often see it from the lookout; specific graves and sections may require planned access.", visit: "Do not walk through burial plots as a shortcut or assume all gates are visitor entrances. Follow cemetery staff guidance and avoid interrupting funerals." },
    ],
    transportIntro: "The main planning challenge is elevation: Gethsemane is near the bottom of the slope, while the panorama and several churches are above it.",
    transport: [
      { title: "Taxi or arranged car to the top", text: "Give the driver the upper Mount of Olives viewpoint near the Seven Arches Hotel, or name Pater Noster first if that is your intended starting point. A drop-off near Gethsemane is not the same as a summit visit." },
      { title: "On foot from Lion's Gate", text: "From the Old City, walk out by Lion's Gate toward the Kidron Valley and Gethsemane. The viewpoint is substantially uphill from there. Allow for crossings, steep gradients and heat if you plan to climb." },
      { title: "Public buses and return pickup", text: "Routes and operators serving the eastern side of Jerusalem can change. Check a current public-transport journey planner. If you walk downhill, arrange a lower pickup before the tour rather than expecting a car to reach every church entrance." },
    ],
    practical: [
      { title: "Heat, gradients and mobility", text: "Carry water and sun protection and wear shoes with grip. The descent includes narrow and steep sections, and the full pilgrimage route is not reliably wheelchair accessible. Consider the panoramic stop alone if walking is difficult." },
      { title: "Church hours are not uniform", text: "Pater Noster and St Mary Magdalene may be unavailable when Gethsemane is open. Religious feasts, services and exceptional closures take precedence over published tourist hours." },
      { title: "Respect the cemetery", text: "The Jewish cemetery is a place of religious importance and active mourning. Photograph the skyline from public viewpoints, not through individual graves or funeral gatherings." },
      { title: "Do not confuse the ridges", text: "The Mount of Olives and Mount Zion are different hills on opposite sides of Jerusalem's Old City. Visiting both in one day is possible, but not as one short, level walking loop." },
    ],
    historyTitle: "Why does the Mount of Olives matter?",
    history: [
      "The ridge is important in Jewish tradition through prophecy, burial and expectations of resurrection. The cemetery's slopes and proximity to the ancient city make it a distinctive part of Jerusalem's religious landscape.",
      "In the Gospels the Mount of Olives is associated with Jesus' entry into Jerusalem, his teaching and his prayer at Gethsemane before his arrest. Different Christian traditions place the Ascension at particular sites on the ridge. Modern churches commemorate these beliefs; their present buildings are not physical proof that an event occurred at an exact spot.",
    ],
    hotelNote: "A room on the eastern ridge may have an exceptional view but is not automatically convenient for sightseeing elsewhere. If you plan several days in Jerusalem, compare Old City, Mamilla and downtown access before booking.",
    relatedHotel: { text: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
  },
};
