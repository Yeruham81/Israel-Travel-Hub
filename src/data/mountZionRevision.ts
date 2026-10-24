import mountZionPhoto from "@/assets/guides/mount-zion.jpg";
import type { Attraction } from "@/data/attractionGuideTypes";
import type { SacredHillEditorial } from "@/data/sacredHillGuides";

/**
 * Mount Zion visitor-focused edition. All photos are already committed local
 * assets; an unverified photo is never substituted for a specific sacred site.
 */
export const mountZionAttractionUpdate: Partial<Attraction> = {
  title: "Mount Zion, Jerusalem: Last Supper Room, David's Tomb & Visitor Guide",
  description: "Visit Mount Zion in Jerusalem: the Last Supper Room, David's Tomb, Dormition Abbey, St Peter in Gallicantu, Zion Gate, bus 38 and walks from the Old City.",
  intro: "Mount Zion sits immediately outside Jerusalem's Old City walls, just beyond Zion Gate. Within a short walk are the traditional Room of the Last Supper, David's Tomb and Dormition Abbey. St Peter in Gallicantu and the Catholic cemetery lie a little farther down the hill. It's an easy addition to an Old City visit, with several important Christian and Jewish places in one neighbourhood.",
  takeaway: "If you have an hour or two, walk out through Zion Gate, see Dormition Abbey and visit the Upper Room and David's Tomb in the adjoining complex. With another hour, explore St Peter in Gallicantu or pay your respects at Oskar Schindler's grave. On Sundays, make the abbey an afternoon stop and plan Gallicantu for another day.",
  duration: "About 1–2 hours for the central sites; 2½–3 hours with additional stops",
  image: { src: mountZionPhoto, alt: "Dormition Abbey on Mount Zion just south of Jerusalem's Old City walls" },
  official: [
    { label: "Christian Information Center — current holy-site opening hours", url: "https://www.cicts.org/en/updated-opening-hours-holy-places-tourist-sites-holy-land" },
    { label: "Dormition Abbey — church visiting and worship", url: "https://dormitio.net/abtei/gottesdienst-oeffnungszeiten/" },
    { label: "Window to Mount Zion — local heritage map and site details", url: "https://www.mountzion.org.il/" },
    { label: "City of David — Zion Gate access and public transport", url: "https://cityofdavid.org.il/en/the-jewish-quarter-to-the-city-of-david-a-journey-of-longing/" },
  ],
  faqs: [
    { q: "Where is Mount Zion in Jerusalem?", a: "The main visitor sites are just outside the southern Old City wall, beside Zion Gate. Enter the Armenian Quarter or Jewish Quarter through Zion Gate to continue an Old City walk." },
    { q: "Is Mount Zion inside the Old City?", a: "Dormition Abbey, David's Tomb and the Room of the Last Supper are outside the present-day Old City walls, only a few minutes' walk from Zion Gate." },
    { q: "Where is the Room of the Last Supper?", a: "The Cenacle, or Upper Room, is reached by stairs in the same historic complex as the traditional David's Tomb. The room is cherished as the traditional setting of the Last Supper and is also associated with Pentecost." },
    { q: "Can I visit David's Tomb and the Upper Room together?", a: "Yes. They share a historic complex: David's Tomb is on the lower level and the Upper Room is above it. Visit the two separately, respecting the prayer areas and different access arrangements." },
    { q: "How much time should I spend on Mount Zion?", a: "Allow around one to two hours for Zion Gate, the Upper Room, David's Tomb and Dormition Abbey. Add another hour or more for Gallicantu, the Catholic cemetery or a relaxed visit to the churches." },
    { q: "Which buses go to Mount Zion?", a: "Bus 38 follows a circular route with stops at Har Tsiyon/Ma'ale HaShalom and Zion Gate/Habad. Bus 2 also serves the Zion Gate/Habad stop. Check the direction and current departure time in a journey planner before travelling." },
    { q: "Are the Mount Zion sites open on Sundays?", a: "The outdoor streets and Zion Gate can be visited on Sundays. Dormition Abbey generally opens to sightseers later in the day, while St Peter in Gallicantu is normally closed to visitors on Sundays. The Upper Room and David's Tomb follow separate schedules." },
    { q: "Is there an entrance fee to Mount Zion?", a: "There is no ticket for walking around Mount Zion. The Upper Room and David's Tomb are generally free to enter. Some other sites, including St Peter in Gallicantu and the Chamber of the Holocaust, have their own admission arrangements." },
    { q: "Can I combine Mount Zion with Jerusalem's Old City?", a: "Yes. The simplest walk links the Armenian or Jewish Quarter with Zion Gate and the three central Mount Zion sites. Alternatively, visit Mount Zion first, then enter the Old City through Zion Gate for the rest of your sightseeing." },
    { q: "How accessible is Mount Zion?", a: "The main streets near Zion Gate are comparatively compact, though paving and building entrances vary. The Upper Room requires stairs, and the walk to Gallicantu and the Catholic cemetery has slopes or steps. For limited mobility, arrange a vehicle stop and check individual site access." },
  ],
};

export const mountZionEditorialUpdate: SacredHillEditorial = {
  eyebrow: "Jerusalem · Beside Zion Gate",
  snapshot: [
    { label: "Where to start", value: "Zion Gate, south of the Old City" },
    { label: "Allow", value: "1–2 hours; longer for Gallicantu or the cemetery" },
    { label: "Easy to combine", value: "Armenian and Jewish Quarters" },
    { label: "Public transport", value: "Bus 38; also bus 2 at Zion Gate" },
  ],
  routeIntro: "Mount Zion works best as part of a walking day in Jerusalem. The Upper Room, David's Tomb and Dormition Abbey are clustered close to Zion Gate, so you can see them without changing transport between stops. Pick the order that suits your Old City itinerary.",
  routes: [
    {
      name: "From the Old City to Mount Zion",
      time: "Around 1–2 hours on Mount Zion",
      bestFor: "First-time visitors and anyone already exploring the Old City",
      steps: [
        "Walk through the Armenian Quarter or Jewish Quarter and leave the Old City through Zion Gate. Take a moment to look at the historic gate and its marks from the 1948 fighting.",
        "Continue to Dormition Abbey to see its striking round basilica and, when accessible, the crypt associated with Mary's Dormition.",
        "Visit the Cenacle, traditionally remembered as the Room of the Last Supper, on the upper floor of the David's Tomb complex.",
        "Go downstairs to the traditional Tomb of King David, an active Jewish prayer site, then return toward Zion Gate or continue to your next Jerusalem stop.",
      ],
      note: "On Sundays, Dormition Abbey is more convenient after its late-morning opening. The Upper Room and David's Tomb have their own visiting arrangements.",
    },
    {
      name: "Mount Zion first, then the Old City",
      time: "About 2–3 hours including an additional site",
      bestFor: "A wider pilgrimage or heritage itinerary",
      steps: [
        "Start with the central Mount Zion circuit: Dormition Abbey, the Upper Room and David's Tomb, all within a short walk.",
        "Choose an additional stop: St Peter in Gallicantu for the Passion story, or the Catholic cemetery for Oskar Schindler's grave.",
        "Return to Zion Gate if you have visited the lower sites, or arrange a pickup at a suitable road-accessible point.",
        "Enter the Old City through Zion Gate and explore the Armenian and Jewish Quarters; you can continue toward the Western Wall or the Christian Quarter.",
      ],
      note: "The church and cemetery are separate additions in different parts of the slope. Treat them as optional branches, not as one continuous shortcut.",
    },
  ],
  stopIntro: "The places below are close on a map but feel quite different in person: a room associated with the Last Supper, an active Jewish prayer site, a Benedictine abbey and smaller memorial places. These are the details I would check while planning a visit.",
  stops: [
    {
      name: "Room of the Last Supper (Cenacle)",
      description: "The Upper Room is among the best-known Christian sites on Mount Zion. Pilgrims visit this vaulted chamber to remember Jesus' Last Supper with his disciples; the site is also associated with Pentecost. Its arches and stone details reflect the long history of worship here.",
      visit: "The entrance is upstairs in the David's Tomb complex. The Christian Information Center currently lists the Cenacle from 08:00 to 18:00, except on Yom Kippur. Use its latest schedule if your visit falls near a religious holiday.",
      tipLabel: "Finding the entrance",
    },
    {
      name: "David's Tomb",
      description: "Directly below the Upper Room is the traditional Tomb of King David. The site is a place of Jewish prayer and a meaningful stop for visitors interested in the many traditions that meet on Mount Zion.",
      visit: "The published visiting window generally runs from 09:00 until sunset. There are separate prayer sections, and men should bring a head covering. Allow a quiet few minutes, particularly when people are praying.",
      tipLabel: "A respectful visit",
    },
    {
      name: "Dormition Abbey",
      description: "The round basilica and its tall bell tower make Dormition Abbey the most recognisable building on Mount Zion. This Benedictine church commemorates Mary's Dormition, or falling asleep. Inside, look for the mosaics and the atmospheric crypt.",
      visit: "I would include both the main church and the crypt when they are open. The abbey lists visitor hours of 09:00–17:00 on weekdays and Saturdays, and 11:30–17:00 on Sundays, subject to special services.",
      tipLabel: "Don't miss",
      image: { src: mountZionPhoto, alt: "The round limestone basilica of Dormition Abbey on Mount Zion" },
      link: { label: "Dormition Abbey visiting hours", url: "https://dormitio.net/abtei/gottesdienst-oeffnungszeiten/" },
    },
    {
      name: "St Peter in Gallicantu",
      description: "St Peter in Gallicantu commemorates the tradition of Peter's denial of Jesus and the site associated with the house of High Priest Caiaphas. Inside and around the church are chapels, archaeological remains and views over the valley.",
      visit: "Allow at least half an hour for the church and grounds rather than a hurried photograph. The current holy-site schedule lists 08:30–17:00, Monday to Saturday, with Sunday closure.",
      tipLabel: "Allow extra time",
    },
    {
      name: "Zion Gate",
      description: "Zion Gate connects Mount Zion with the Armenian and Jewish Quarters of the Old City. Its stone entrance is one of Jerusalem's most memorable gates; marks left by the battles of 1948 can still be seen in the masonry.",
      visit: "It is the natural link between the hill and an Old City walk. If you want to visit the Western Wall afterwards, continue through the Jewish Quarter.",
      tipLabel: "Continue your walk",
    },
    {
      name: "Oskar Schindler's grave",
      description: "Oskar Schindler, honoured as Righteous Among the Nations for rescuing Jews during the Holocaust, is buried in Mount Zion's Catholic cemetery. Visitors often leave a small stone on his grave as a sign of remembrance.",
      visit: "The cemetery has its own gate and visitor hours. Check access before walking down from the central sites, and allow time to find the grave.",
      tipLabel: "Before going down",
    },
    {
      name: "The Chamber of the Holocaust",
      description: "This small memorial museum on Mount Zion remembers Jewish communities destroyed during the Holocaust. Its collection and atmosphere offer a different kind of visit from the religious landmarks nearby.",
      visit: "Opening arrangements and any admission fee are separate from those of David's Tomb. Consider it if you want to explore the hill's modern history, and check the Mount Zion heritage information first.",
      tipLabel: "An additional stop",
      link: { label: "Mount Zion heritage information", url: "https://www.mountzion.org.il/" },
    },
  ],
  transportIntro: "Zion Gate is the easiest landmark to use when arranging a drop-off or checking a bus. From there, the main sites are a short walk from one another.",
  transport: [
    {
      title: "Walking from the Old City",
      text: "From the Armenian or Jewish Quarter, follow signs to Zion Gate and walk outside the southern city wall. If you are near Jaffa Gate, you can cross through the Armenian Quarter to reach Zion Gate, or approach Mount Zion from the road outside the walls. Choose according to the sights you want to see along the way.",
    },
    {
      title: "Bus 38 and nearby stops",
      text: "Route 38 makes a loop through central Jerusalem, Mamilla and the Old City area. Useful stops include Har Tsiyon/Ma'ale HaShalom and Zion Gate/Habad; route 2 also serves Zion Gate/Habad. Be sure to choose the right stop and direction because route 38 is circular. Check departures on the day of your trip.",
      links: [
        { label: "Line 38 route and stops", url: "https://your-way.org.il/he/areas/%D7%9E%D7%A8%D7%9B%D7%96-%D7%94%D7%A2%D7%99%D7%A8/lines/29619/38" },
        { label: "Zion Gate stop timetable (Moovit)", url: "https://moovitapp.com/index/he/%D7%AA%D7%97%D7%91%D7%95%D7%A8%D7%94_%D7%A6%D7%99%D7%91%D7%95%D7%A8%D7%99%D7%AA-%D7%A9%D7%A2%D7%A8_%D7%A6%D7%99%D7%95%D7%9F_%D7%97%D7%91_%D7%93-Israel-stop_44975360-1" },
      ],
    },
    {
      title: "Taxi or private driver",
      text: "I can arrange a ride to a road-accessible point near Zion Gate or Mount Zion, with a pickup after your visit. If you plan to see Gallicantu or the Catholic cemetery as well, tell me beforehand so we can choose the most convenient meeting point.",
    },
  ],
  practical: [
    {
      title: "Choose the right day",
      text: "Sunday is fine for the main outdoor walk and many central sites. Dormition Abbey generally opens later for sightseeing that day, while Gallicantu is usually closed. Saturday and religious holidays may affect access to Jewish prayer areas.",
    },
    {
      title: "For church and prayer visits",
      text: "Cover shoulders and knees in the churches and bring a head covering for men entering David's Tomb. Services and prayer take priority; follow any notices about photographs.",
    },
    {
      title: "The central sites are close together",
      text: "Dormition Abbey and the Upper Room/David's Tomb complex are only a few minutes apart. The optional walk toward Gallicantu or the cemetery involves extra steps or a slope, so allow more time for those stops.",
    },
    {
      title: "If you're visiting with children",
      text: "The central route is short enough for many families, and Zion Gate makes an interesting starting point. For younger children, choose a small number of interiors rather than trying to fit in every museum and church.",
    },
  ],
  historyTitle: "Mount Zion in Jerusalem's religious traditions",
  history: [
    "The name Zion has long been associated with Jerusalem and its sacred history. Today, the hill known as Mount Zion is just outside Zion Gate, south of the Old City walls.",
    "For Christian pilgrims, the Upper Room recalls the Last Supper and Pentecost, Dormition Abbey honours Mary's final earthly days, and St Peter in Gallicantu recalls Peter's denial. Jewish visitors come to the traditional Tomb of King David, which remains a place of prayer. Together, these places give Mount Zion its distinctive character.",
    "The hill also preserves memories of more recent Jerusalem history, including the marks of the 1948 battles at Zion Gate and memorials connected with the Holocaust.",
  ],
  hotelNote: "Staying near Mamilla or Jaffa Gate makes it easier to explore Mount Zion and the Old City on foot; a hotel in central Jerusalem also works well if you plan to use public transport.",
  relatedHotel: { text: "Jerusalem accommodation guide", to: "/travel-blog/where-to-stay-in-jerusalem/" },
};
