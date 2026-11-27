/** Curated Jerusalem museums and museum-like cultural experiences.
 *  Visitor information checked with official operators in November 2026.
 *  Coordinates cross-checked against documented public location data. */
export type JerusalemMuseumArea = "west" | "old" | "central" | "south";
export type JerusalemMuseumEntry = {
  id: string; name: string; area: JerusalemMuseumArea; neighbourhood: string; address: string;
  mapLocation: {lat: number;lon: number}; theme: string; bestFor: string; duration: string;
  priceNis?: number; admission: string; openingDays: string; booking: string;
  intro: string; highlights: string[]; tip: string; url: string; ticketUrl?: string;
  featured?: boolean; closureNote?: string; highlightsForFamilies?: string;
};
export const jerusalemMuseumAreas: {id:JerusalemMuseumArea;name:string;intro:string}[] = [
  {
    "id": "west",
    "name": "Museum Row & western Jerusalem",
    "intro": "The Israel Museum, Bible Lands Museum and Science Museum are in the broader Givat Ram area, while Yad Vashem sits farther west on Mount of Remembrance. Allow time for travel between the museums."
  },
  {
    "id": "old",
    "name": "Old City & Mamilla",
    "intro": "The Tower of David is just inside Jaffa Gate, the Time Elevator is nearby in Mamilla, and Rockefeller stands outside the northern Old City walls. Check Rockefeller access before planning to enter."
  },
  {
    "id": "central",
    "name": "City center, Nahalat Shiva & Musrara",
    "intro": "Several smaller heritage museums and multimedia attractions are within walking distance of Hillel Street and Nahalat Shiva. Museum on the Seam is farther north."
  },
  {
    "id": "south",
    "name": "Talbiya & the Hinnom Valley",
    "intro": "The Museum for Islamic Art and Menachem Begin Heritage Center are south of the city center. Allow enough time for each museum and the journey between them."
  }
];
export const jerusalemMuseums: JerusalemMuseumEntry[] = [
  {
    "id": "israel",
    "name": "The Israel Museum, Jerusalem",
    "area": "west",
    "neighbourhood": "Museum Row · Givat Ram",
    "address": "11 Ruppin Boulevard, Jerusalem",
    "mapLocation": {
      "lat": 31.7725,
      "lon": 35.2042
    },
    "theme": "Art & archaeology",
    "bestFor": "Dead Sea Scrolls, archaeology and world art",
    "duration": "3–4 hours or longer",
    "priceNis": 62,
    "admission": "Adult ₪62; students ₪45; children 5–18 ₪31 (free on Tuesdays and Saturdays)",
    "openingDays": "Mon, Wed, Thu & Sat 10:00–16:00; Tue 16:00–20:00; Fri 10:00–14:00; closed Sun",
    "booking": "General admission; check special exhibitions and dates",
    "intro": "Jerusalem's flagship art and archaeology museum brings together the Shrine of the Book, the Second Temple model, Jewish Art and Life galleries and international collections on a sprawling campus.",
    "highlights": [
      "Shrine of the Book and Second Temple Jerusalem model",
      "Archaeology Wing and Jewish Art and Life"
    ],
    "tip": "Choose a few wings ahead of time; the Shrine of the Book and the model alone deserve an unhurried visit.",
    "url": "https://www.imj.org.il/en",
    "ticketUrl": "https://www.imj.org.il/en/node/1249261",
    "featured": true
  },
  {
    "id": "bible",
    "name": "Bible Lands Museum Jerusalem",
    "area": "west",
    "neighbourhood": "Museum Row · Givat Ram",
    "address": "21 Shmuel Stefan Wise Street, Jerusalem",
    "mapLocation": {
      "lat": 31.774905,
      "lon": 35.202444
    },
    "theme": "Ancient civilizations",
    "bestFor": "Ancient Near East, archaeology and history",
    "duration": "1.5–2 hours",
    "priceNis": 44,
    "admission": "Adult ₪44; children 5–18 and students ₪22",
    "openingDays": "Sun–Tue & Thu 10:00–17:00; Wed until 21:00; Fri until 14:00; check selected Saturdays",
    "booking": "Regular entry; free scheduled guided tours are included",
    "intro": "A focused collection of objects from Egypt, Mesopotamia, Persia and the surrounding ancient world provides context for biblical texts and the cultures of the region.",
    "highlights": [
      "Ancient Near Eastern artifacts and inscriptions",
      "Scheduled guided tours and changing exhibitions"
    ],
    "tip": "The museum stands close to the Israel Museum. Choose one as your main visit, or combine both only if you have plenty of time.",
    "url": "https://www.blmj.org/en/visit/",
    "ticketUrl": "https://web.attractinet.co.il/blmj/index.jsp?jumpTo=Purches&lang=en&packageId=1"
  },
  {
    "id": "science",
    "name": "Bloomfield Science Museum",
    "area": "west",
    "neighbourhood": "Museum Row · Givat Ram",
    "address": "3 Museum Boulevard, Jerusalem",
    "mapLocation": {
      "lat": 31.778395,
      "lon": 35.20037
    },
    "theme": "Hands-on science",
    "bestFor": "Families, children and interactive exhibits",
    "duration": "2–3 hours",
    "priceNis": 65,
    "admission": "Regular admission ₪65; family ticket options are available",
    "openingDays": "Programme-based; usually Sun–Thu and Sat, with holiday variations",
    "booking": "Advance online ticket reservation required",
    "intro": "A playful, hands-on museum where children and adults can experiment with scientific ideas, engineering, technology and changing workshops.",
    "highlights": [
      "Interactive science experiments and demonstrations",
      "Family workshops and temporary exhibits"
    ],
    "tip": "Reserve before travelling and check which demonstrations or workshops suit your children's ages.",
    "url": "https://mada.org.il/en/plan-your-visit",
    "ticketUrl": "https://mada.smarticket.co.il/en/",
    "featured": true,
    "highlightsForFamilies": "Many activities work especially well for school-age children; age guidance depends on each workshop."
  },
  {
    "id": "yad",
    "name": "Yad Vashem – Holocaust History Museum",
    "area": "west",
    "neighbourhood": "Mount of Remembrance · western Jerusalem",
    "address": "Mount of Remembrance, Jerusalem",
    "mapLocation": {
      "lat": 31.774207,
      "lon": 35.176565
    },
    "theme": "Holocaust remembrance",
    "bestFor": "Historical testimony, remembrance and reflection",
    "duration": "2–3 hours",
    "priceNis": 0,
    "admission": "Free entry to the museum and memorial campus",
    "openingDays": "Sun–Thu and Friday mornings; closed Sat and Jewish holidays",
    "booking": "Reserve a free museum entry slot online; walk-ins depend on availability",
    "intro": "Israel's Holocaust remembrance center combines the Holocaust History Museum with monuments, archives, survivor testimony and contemplative spaces across its campus.",
    "highlights": [
      "Holocaust History Museum and Hall of Names",
      "Children's Memorial and the Avenue of the Righteous"
    ],
    "tip": "Give this visit its own time and pace. The Holocaust History Museum admits visitors aged 10 and over; younger children can visit suitable campus spaces.",
    "url": "https://www.yadvashem.org/",
    "ticketUrl": "https://online-reservations.yadvashem.org/en/reservations/specificActivity/104",
    "featured": true,
    "highlightsForFamilies": "The Holocaust History Museum is for ages 10+; some memorial spaces can be visited separately."
  },
  {
    "id": "tower",
    "name": "Tower of David Jerusalem Museum",
    "area": "old",
    "neighbourhood": "Jaffa Gate · Old City",
    "address": "Tower of David Citadel, Jaffa Gate, Jerusalem",
    "mapLocation": {
      "lat": 31.7767,
      "lon": 35.2277
    },
    "theme": "Jerusalem history",
    "bestFor": "City history, citadel architecture and panoramic views",
    "duration": "2–3 hours",
    "priceNis": 55,
    "admission": "Adult ₪55; ages 5–18 ₪35; night experience requires a separate ticket",
    "openingDays": "Sun–Sat with seasonal and event-based hours; confirm your date",
    "booking": "Daytime museum admission and night shows are sold separately",
    "intro": "A historic citadel at Jaffa Gate has been renewed as a museum explaining Jerusalem's layered history with multimedia galleries, archaeology and city views.",
    "highlights": [
      "Citadel galleries and Phasael Tower viewpoint",
      "Jerusalem history presented across centuries"
    ],
    "tip": "I would start here before exploring the Old City. Save the night spectacular for an evening with a confirmed show time.",
    "url": "https://www.tod.org.il/en/",
    "ticketUrl": "https://www.tod.org.il/en/event/entrance-to-the-tower-of-david/",
    "featured": true
  },
  {
    "id": "rockefeller",
    "name": "Rockefeller Archaeological Museum",
    "area": "old",
    "neighbourhood": "Sultan Suleiman Street · near Herod's Gate",
    "address": "27 Sultan Suleiman Street, Jerusalem",
    "mapLocation": {
      "lat": 31.7837,
      "lon": 35.2359655
    },
    "theme": "Archaeology & architecture",
    "bestFor": "Historic architecture and archaeological collections",
    "duration": "About 1 hour if a tour is arranged",
    "admission": "No regular walk-in admission; organised tours may be ticketed",
    "openingDays": "Closed to regular walk-in visitors; check prearranged tours",
    "booking": "Check Tower of David's programme for occasional booked tours",
    "intro": "One of Jerusalem's landmark archaeological buildings holds major regional collections, but general public access has been restricted. Guided access has occasionally been organised.",
    "highlights": [
      "Distinctive 1930s stone architecture",
      "Regional archaeological collections"
    ],
    "tip": "Visit the interior only if you've booked a guided tour. You can see the facade from Sultan Suleiman Street.",
    "url": "https://www.tod.org.il/en/tours-around-jerusalem/",
    "ticketUrl": "https://www.tod.org.il/en/event/treasures-of-the-rockefeller-in-en/",
    "closureNote": "Closed to regular walk-in visitors; check organised tours."
  },
  {
    "id": "time",
    "name": "Time Elevator Jerusalem",
    "area": "old",
    "neighbourhood": "Mamilla · near Jaffa Gate",
    "address": "6 Yitzhak Kariv Street, Mamilla, Jerusalem",
    "mapLocation": {
      "lat": 31.7774953,
      "lon": 35.2247751
    },
    "theme": "Multimedia attraction",
    "bestFor": "Families who enjoy immersive historical storytelling",
    "duration": "About 1 hour",
    "priceNis": 58,
    "admission": "Regular ticket ₪58; online price advertised at ₪49",
    "openingDays": "Show times vary; generally Sun–Fri, closed Sat",
    "booking": "Book a timed performance; arrange English audio by phone",
    "intro": "This indoor audiovisual show uses moving seats to take visitors through different periods of Jerusalem's history.",
    "highlights": [
      "Immersive film and moving-seat effects",
      "Visual storytelling about Jerusalem's history"
    ],
    "tip": "Suitable from age five, with content generally more engaging for older children. Confirm the film language and show time before travelling.",
    "url": "https://www.time-elevator.co.il/en/",
    "ticketUrl": "https://www.time-elevator.co.il/en/",
    "highlightsForFamilies": "Entry from age 5; the operator suggests the experience for children around age 9 and older."
  },
  {
    "id": "prison",
    "name": "Museum of the Underground Prisoners",
    "area": "central",
    "neighbourhood": "Russian Compound",
    "address": "1 Mish'ol HaGvura, Russian Compound, Jerusalem",
    "mapLocation": {
      "lat": 31.78191,
      "lon": 35.22407
    },
    "theme": "Modern Israeli history",
    "bestFor": "British Mandate prison history and underground movements",
    "duration": "60–90 minutes",
    "priceNis": 20,
    "admission": "Adult ₪20; youth, students and seniors ₪15",
    "openingDays": "Sun–Thu 09:00–17:00; Fri group visits by prior arrangement; closed Sat",
    "booking": "Arrange a guided visit for groups and special hours",
    "intro": "A restored British Mandate prison preserves original cells and tells the stories of the underground prisoners and the events surrounding the establishment of Israel.",
    "highlights": [
      "Original prison cells and escape story",
      "Historical displays about the Mandate period"
    ],
    "tip": "Pair the museum with a walk through the Russian Compound and city-center streets.",
    "url": "https://museums.mod.gov.il/sites/Jerusalem/AboutUs/Pages/About.aspx"
  },
  {
    "id": "friends",
    "name": "Friends of Zion Museum",
    "area": "central",
    "neighbourhood": "Nahalat Shiva · city center",
    "address": "20 Yosef Rivlin Street, Jerusalem",
    "mapLocation": {
      "lat": 31.780167,
      "lon": 35.220221
    },
    "theme": "Multimedia heritage",
    "bestFor": "Christian support for Zionism and modern history",
    "duration": "About 1 hour",
    "admission": "Guided experience; check current admission at booking",
    "openingDays": "Guided sessions Sun–Fri; closed Sat; check actual tour times",
    "booking": "Guided tour only; reserve your preferred language and slot",
    "intro": "The museum uses multimedia exhibits to present its account of non-Jewish supporters of Zionism and the founding of Israel.",
    "highlights": [
      "Guided multimedia storytelling",
      "Historical narratives through immersive displays"
    ],
    "tip": "Book a guided visit in your preferred language and arrive before the scheduled start.",
    "url": "https://fozmuseum.com/",
    "ticketUrl": "https://fozmuseum.com/online-reservation/"
  },
  {
    "id": "tolerance",
    "name": "Museum of Tolerance Jerusalem",
    "area": "central",
    "neighbourhood": "Hillel Street · city center",
    "address": "32 Hillel Street, Jerusalem",
    "mapLocation": {
      "lat": 31.779129,
      "lon": 35.220097
    },
    "theme": "Dialogue & exhibitions",
    "bestFor": "Contemporary society, photography and guided exhibitions",
    "duration": "Around 90 minutes",
    "priceNis": 50,
    "admission": "Guided English exhibition tour ₪35–50 depending on ticket type",
    "openingDays": "Guided tours on selected Sun–Fri dates; closed Sat",
    "booking": "Book a dated guided tour; exhibition age guidance may apply",
    "intro": "A contemporary exhibition and cultural center devoted to human dignity, dialogue and identity, with themed gallery tours and changing public programmes.",
    "highlights": [
      "Guided tours of current exhibitions",
      "Contemporary cultural and social themes"
    ],
    "tip": "Check the exhibitions included in your chosen ticket. One display is restricted to visitors aged 16 and older.",
    "url": "https://www.motj.org.il/en/",
    "ticketUrl": "https://tickets.motj.org.il/en/",
    "featured": true,
    "highlightsForFamilies": "Some exhibitions are restricted to ages 16+; check the exact tour."
  },
  {
    "id": "music",
    "name": "Hebrew Music Museum",
    "area": "central",
    "neighbourhood": "Nahalat Shiva · city center",
    "address": "10 Yoel Moshe Salomon Street, Jerusalem",
    "mapLocation": {
      "lat": 31.780637,
      "lon": 35.219772
    },
    "theme": "Music & culture",
    "bestFor": "Jewish musical traditions and interactive experiences",
    "duration": "60–90 minutes",
    "priceNis": 60,
    "admission": "Adult ₪60; child or senior ₪45; student ₪40",
    "openingDays": "Sun–Thu 10:00–19:00; Fri until 14:00; closed Sat",
    "booking": "Reserve guided or self-guided tours in advance",
    "intro": "Seven exhibition spaces introduce musical instruments and traditions from Jewish communities around the world, with sound, audiovisual tools and guided interpretation.",
    "highlights": [
      "Musical instruments and traditions from around the world",
      "Interactive guides and virtual-reality elements"
    ],
    "tip": "Ask about the guided option if you enjoy musical demonstrations. The tablet-based tour is available to visitors aged 10 and over.",
    "url": "https://hebrewmusicmuseum.com/about/",
    "ticketUrl": "https://hebrewmusicmuseum.com/buy-tickets/",
    "highlightsForFamilies": "Interactive elements make this appealing for families; tablet tours are designed for ages 10+."
  },
  {
    "id": "italian",
    "name": "Nahon Museum of Italian Jewish Art",
    "area": "central",
    "neighbourhood": "Hillel Street · city center",
    "address": "25 Hillel Street, Jerusalem",
    "mapLocation": {
      "lat": 31.780202,
      "lon": 35.218571
    },
    "theme": "Jewish art & heritage",
    "bestFor": "Italian Jewish culture, ritual art and history",
    "duration": "45–75 minutes",
    "priceNis": 30,
    "admission": "Adult ₪30; concession tickets available",
    "openingDays": "Sun, Tue & Thu 10:30–16:30; other days by arrangement",
    "booking": "Tickets online or at the museum; check group visits",
    "intro": "An intimate museum devoted to the art and traditions of Italian Jewish communities, with historic ritual objects and a carefully preserved synagogue setting.",
    "highlights": [
      "Italian Jewish ritual art and objects",
      "Distinctive historic synagogue interior"
    ],
    "tip": "A good smaller museum to combine with other central Jerusalem cultural stops on a weekday.",
    "url": "https://www.moija.org/en/tickets",
    "ticketUrl": "https://www.moija.org/en/tickets"
  },
  {
    "id": "seam",
    "name": "Museum on the Seam",
    "area": "central",
    "neighbourhood": "Musrara · seam-line area",
    "address": "4 Heil HaHandasa Street, Jerusalem",
    "mapLocation": {
      "lat": 31.786352,
      "lon": 35.226798
    },
    "theme": "Contemporary art",
    "bestFor": "Art, dialogue and Jerusalem's urban history",
    "duration": "60–90 minutes",
    "priceNis": 35,
    "admission": "Adult ₪35; students and seniors ₪30",
    "openingDays": "Mon & Wed 10:00–17:00; Thu 14:00–20:00; Fri 10:00–14:00",
    "booking": "Regular admission; arrange group visits in advance",
    "intro": "A contemporary-art museum in a building on the former division line between east and west Jerusalem, using exhibitions to explore society, borders and shared life.",
    "highlights": [
      "Changing contemporary art exhibitions",
      "Historic building on the former city division line"
    ],
    "tip": "Allow some time to see the building itself and consider combining the visit with nearby Musrara streets.",
    "url": "https://www.mots.org.il/en/visit",
    "ticketUrl": "https://www.mots.org.il/en/visit"
  },
  {
    "id": "islamic",
    "name": "Museum for Islamic Art",
    "area": "south",
    "neighbourhood": "Talbiya · HaPalmach Street",
    "address": "2 HaPalmach Street, Jerusalem",
    "mapLocation": {
      "lat": 31.768585,
      "lon": 35.213281
    },
    "theme": "Art & world cultures",
    "bestFor": "Islamic decorative art and historic timepieces",
    "duration": "1.5–2 hours",
    "priceNis": 44,
    "admission": "Adult ₪44; child ₪25; eligible concessions available",
    "openingDays": "Mon–Wed 10:00–15:00; Thu until 16:00; Fri & Sat 10:00–14:00",
    "booking": "General admission; reserve special exhibitions and activities",
    "intro": "A specialised collection of ceramics, manuscripts, jewellery and metalwork from across Islamic cultures, alongside the remarkable Sir David Salomons collection of watches and clocks.",
    "highlights": [
      "Decorative arts from across the Islamic world",
      "Sir David Salomons' historic clocks and watches"
    ],
    "tip": "Consider a relaxed visit followed by a walk in Talbiya or the German Colony.",
    "url": "https://www.islamicart.co.il/english/template/default.aspx?PageId=19",
    "ticketUrl": "https://islamicart.smarticket.co.il/"
  },
  {
    "id": "begin",
    "name": "Menachem Begin Heritage Center",
    "area": "south",
    "neighbourhood": "Near the Old City · Hinnom Valley",
    "address": "6 Nahon Street, Jerusalem",
    "mapLocation": {
      "lat": 31.769344,
      "lon": 35.225392
    },
    "theme": "Modern Israeli history",
    "bestFor": "Political history and multimedia storytelling",
    "duration": "75–90 minutes",
    "priceNis": 30,
    "admission": "Adult ₪30; senior, student and child ₪25",
    "openingDays": "Sun–Thu 09:00–16:30; Fri until 12:30; closed Sat",
    "booking": "Pre-book a guided multimedia museum tour",
    "intro": "A multimedia presentation traces Menachem Begin's life from Poland to his leadership in Israel and the peace agreement with Egypt, alongside the center's educational collections.",
    "highlights": [
      "Personal archives and multimedia biography",
      "Israel's modern political and diplomatic history"
    ],
    "tip": "Book a tour in your preferred language, then enjoy the views towards the Hinnom Valley afterwards.",
    "url": "https://www.begincenter.org.il/begins-heritage/museum/?lang=en",
    "ticketUrl": "https://begincenter.smarticket.co.il/en/",
    "featured": true
  }
];
export const jerusalemMuseumMapPoints = jerusalemMuseums.map(museum => ({
  id:museum.id,name:museum.name,area:museum.area,
  lat:museum.mapLocation.lat,lon:museum.mapLocation.lon,
  closed:museum.id==="rockefeller"
}));
export const jerusalemAdditionalMuseums = [
  {
    "name": "Ticho House",
    "place": "10 HaRav Agan Street, Jerusalem",
    "note": "A historic artist's house and changing gallery run by the Israel Museum. Verify its current exhibition and opening arrangements before visiting.",
    "url": "https://www.imj.org.il/en"
  },
  {
    "name": "Old Yishuv Court Museum",
    "place": "Jewish Quarter, Old City",
    "note": "A heritage museum focused on everyday Jewish life in the Old City in earlier centuries; check entry arrangements with the operator.",
    "url": "https://www.oyc.co.il/"
  }
];
