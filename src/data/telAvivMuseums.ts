/** Curated museum visits; visitor links are official operator pages, not affiliate offers. */
export type MuseumArea = "central" | "north" | "south" | "jaffa";
export type MuseumEntry = {
  id: string; name: string; area: MuseumArea; neighbourhood: string; address: string;
  theme: string; bestFor: string; duration: string; admission: string; booking: string;
  intro: string; highlights: string[]; tip: string; url: string; ticketUrl?: string;
  image?: { src: string; alt: string; credit?: string };
  featured?: boolean;
  closureNote?: string;
  priceNis?: number;
  mapLocation?: { lat: number; lon: number };
  openingDays?: string;
  highlightsForFamilies?: string;
};

export const museumAreas: { id: MuseumArea; name: string; intro: string }[] = [
  { id: "central", name: "City centre & Bialik Square", intro: "Art and small heritage buildings are spread across the centre. The Bialik Square museums form the most convenient walking cluster; allow a separate journey to the main Tel Aviv Museum of Art." },
  { id: "north", name: "Ramat Aviv & Tel Aviv University", intro: "The university and northern museums offer some of the city's largest collections. Choose one major museum or two carefully timed visits, allowing travel time between them." },
  { id: "south", name: "Neve Tzedek & the southern seafront", intro: "A smaller artist museum and a separate military-history museum can complement a walk towards the waterfront, with different entrances and booking arrangements." },
  { id: "jaffa", name: "Old Jaffa", intro: "Historic stone lanes, a striking artist-house museum and specialist guided visits. Allow time for steep streets and the walk between venues." },
];

export const museums: MuseumEntry[] = [
  {
    id: "art", mapLocation: { lat: 32.07768, lon: 34.78687 }, name: "Tel Aviv Museum of Art", area: "central", neighbourhood: "Civic Center", address: "27 Shaul HaMelech Boulevard, Tel Aviv",
    theme: "Art", bestFor: "First-time visitors & art lovers", duration: "2–3 hours",
    openingDays: "Mon–Sat (closed Sun); late evenings Tue & Thu",
    priceNis: 55,
    admission: "Adult ₪55; under 18 free", booking: "Check current exhibitions; last entry 1 hour before closing",
    highlightsForFamilies: "Under-18s enter free (regular museum admission).",
    intro: "My first choice for a substantial art visit. Israeli and international modern and contemporary collections sit alongside ambitious temporary exhibitions in distinctive modern buildings.",
    highlights: ["Israeli and international collections", "Herta and Paul Amir Building and architecture", "Changing exhibitions and sculpture"],
    tip: "Review the exhibitions before travelling. The Eyal Ofer Pavilion (formerly Helena Rubinstein Pavilion) is a separate venue at 6 Tarsat Boulevard; check its own exhibition and ticket arrangements.",
    url: "https://www.tamuseum.org.il/en/visit/", featured: true,
    ticketUrl: "https://tickets.tamuseum.org.il/en/Admission_Ticket___Tel_Aviv_Museum_of_Art",

  },
  {
    id: "city", mapLocation: { lat: 32.0735, lon: 34.77107 }, name: "Tel Aviv–Yafo City Museum", area: "central", neighbourhood: "Bialik Square", address: "27 Bialik Street, Tel Aviv",
    theme: "City history", bestFor: "Local stories & urban history", duration: "60–90 minutes",
    openingDays: "Mon–Sat (closed Sun); Fri until 14:00, Sat until 16:00",
    priceNis: 40,
    admission: "Adult ₪40; under 6 free; family ticket ₪85", booking: "Tickets sold online only",
    intro: "An engaging introduction to the city through the experiences and memories of its residents, historic objects and changing exhibitions. Its location makes it easy to build a small museum walk around Bialik Square.",
    highlights: ["Local stories and multimedia", "Historic municipal building", "Easy pairing with artist-house museums"],
    tip: "Combine it with Rubin Museum, Bialik House or Liebling Haus nearby. Check the Bialik Square combined ticket before buying multiple admissions.",
    url: "https://taycm.org.il/en/info-en/", featured: true,
    ticketUrl: "https://tlv-citymuseum.smarticket.co.il/",
  },
  {
    id: "rubin", mapLocation: { lat: 32.07208, lon: 34.7707 }, name: "Rubin Museum", area: "central", neighbourhood: "Bialik Square", address: "14 Bialik Street, Tel Aviv",
    theme: "Artist house", bestFor: "Israeli painting & intimate museums", duration: "45–75 minutes",
    openingDays: "Mon–Sat (closed Sun); Saturday 11:00–14:00",
    priceNis: 40,
    admission: "Adult ₪40; under 18 free with adult", booking: "Check exhibitions; groups should arrange tours",
    highlightsForFamilies: "Free under-18 entry with an accompanying adult.",
    intro: "The former home of painter Reuven Rubin brings his work and the early cultural life of Tel Aviv into a domestic setting. A rewarding contrast with the main art museum.",
    highlights: ["Works by Reuven Rubin", "Historic artist's home", "Short central-city visit"],
    tip: "It is only a short walk from the City Museum; check which rooms and displays are open.",
    url: "https://rubinmuseum.org.il/en/company/visit/main/",
  },
  {
    id: "liebling", mapLocation: { lat: 32.07341, lon: 34.77044 }, name: "Liebling Haus – White City Center", area: "central", neighbourhood: "White City / Bialik area", address: "29 Idelson Street, Tel Aviv",
    theme: "Architecture", bestFor: "Bauhaus & White City architecture", duration: "45–90 minutes",
    openingDays: "Daily; opening hours vary for events",
    priceNis: 0,
    admission: "General admission free; special programmes may cost extra", booking: "Check programme and guided-tour dates",
    intro: "Set inside a restored International Style building, this cultural centre introduces the architecture and urban history that shaped Tel Aviv's UNESCO-listed White City.",
    highlights: ["Modernist residential architecture", "Multidisciplinary exhibitions", "Architecture walks and talks"],
    tip: "An excellent addition to a Bialik Square afternoon; book a specialist English tour separately if one is available.",
    url: "https://www.lieblinghaus.org/whoarewe-en", featured: true,
    ticketUrl: "https://www.lieblinghaus.org/tours-en",
  },
  {
    id: "bialik", mapLocation: { lat: 32.07292, lon: 34.77096 }, name: "Bialik House", area: "central", neighbourhood: "Bialik Square", address: "22 Bialik Street, Tel Aviv",
    theme: "Literature & heritage", bestFor: "Literature & early Tel Aviv", duration: "45–60 minutes",
    openingDays: "Mon, Wed 09:00–17:00; Tue, Thu 09:00–19:00; Fri, Sat 10:00–14:00; closed Sun",
    priceNis: 35,
    admission: "Adult ₪35; under 6 free; Bialik Square combo ₪75", booking: "Digital tickets; check combined-pass eligibility",
    intro: "The home of Hebrew poet Haim Nahman Bialik offers a close look at a major literary figure and the decorative interiors of early Tel Aviv.",
    highlights: ["Restored interiors", "Literary and archive collections", "Historic Bialik Square"],
    tip: "A Bialik Square combined ticket is listed at ₪75; ask the operator which institutions it covers before purchasing.",
    url: "https://www.bialikmuseum.org.il/pages?pageid=14",
    ticketUrl: "https://tlv-bialik.smarticket.co.il/",
  },
  {
    id: "bauhaus", mapLocation: { lat: 32.07656, lon: 34.77437 }, name: "Bauhaus Center Tel Aviv", area: "central", neighbourhood: "Dizengoff Square", address: "77 Dizengoff Street, Tel Aviv",
    theme: "Architecture centre", bestFor: "Architecture tours & design", duration: "30–60 minutes, longer with a tour",
    openingDays: "Sun–Fri (closed Sat); check holiday schedule",
    priceNis: 0,
    admission: "Gallery entry free; self-guided audio tour ₪90; guided tours priced separately", booking: "Check dates for guided White City tours or choose the self-guided audio walk",
    intro: "A gallery, bookshop and starting point for guided and self-guided White City architecture walks.",
    highlights: ["Design exhibitions", "Bauhaus and International Style context", "Guided walks and self-guided audio tours"],
    tip: "Check with the centre in advance that your chosen guided walk or self-guided activity is running on your visit date.",
    url: "https://bauhaus-center.com/", ticketUrl: "https://bauhaus-center.com/tel-aviv-white-city-tours/",
  },
  {
    id: "anu", mapLocation: { lat: 32.11397, lon: 34.80536 }, name: "ANU – Museum of the Jewish People", area: "north", neighbourhood: "Tel Aviv University", address: "Klausner Street, Tel Aviv University campus",
    theme: "Jewish culture", bestFor: "Jewish history, identity & families", duration: "2–3 hours",
    openingDays: "Daily, normally 10:00–17:00 (Fri until 14:00); exceptional closures",
    priceNis: 54,
    admission: "Adult ₪54; under 5 free", booking: "Heroes gallery: Sat timed visits, book ahead (ages 6–12)",
    highlightsForFamilies: "Heroes gallery: ages 6–12, Saturday sessions of 90 minutes, advance booking required.",
    intro: "An extensive, multimedia exploration of Jewish communities, creativity, identity and life around the world. It rewards visitors who want time to engage with the stories.",
    highlights: ["Global Jewish culture and heritage", "Interactive displays", "Heroes gallery for children"],
    tip: "The Heroes gallery is designed for ages 6–12, with 90-minute Saturday slots requiring advance booking. The museum lists exceptional closure dates, including 30 November and 27 December 2026.",
    url: "https://anumuseum.org.il/plan-your-visit/", featured: true,
    ticketUrl: "https://tickets.anumuseum.org.il/en/",
  },
  {
    id: "steinhardt", mapLocation: { lat: 32.11376, lon: 34.80788 }, name: "Steinhardt Museum of Natural History", area: "north", neighbourhood: "Tel Aviv University", address: "12 Klausner Street, Tel Aviv",
    theme: "Natural history", bestFor: "Families & wildlife enthusiasts", duration: "1.5–2.5 hours",
    openingDays: "Mon–Sat (closed Sun outside holiday-season schedules)",
    priceNis: 52,
    admission: "Adult ₪52; under 5 free (free ticket still required)", booking: "Online tickets only; last entry 2 hours before closing",
    highlightsForFamilies: "Family ticket for four: ₪168; free under-5 ticket must still be reserved.",
    intro: "A modern natural-history museum exploring biodiversity, evolution and the living world through specimens and interpretive displays, especially appealing to curious children and adults.",
    highlights: ["Animals and biodiversity", "Regional habitats and ecology", "Family-friendly exhibition spaces"],
    tip: "Reserve a museum time online and check the day-specific timetable. ANU is a separate institution with separate admission.",
    url: "https://smnh.tau.ac.il/en/",
    ticketUrl: "https://smnh.tau.ac.il/en/buy-tickets/",
  },
  {
    id: "muza", mapLocation: { lat: 32.10255, lon: 34.79577 }, name: "MUZA – Eretz Israel Museum", area: "north", neighbourhood: "Ramat Aviv", address: "2 Haim Levanon Street, Tel Aviv",
    theme: "Archaeology & culture", bestFor: "Archaeology, crafts & open-air exhibits", duration: "2–3 hours",
    openingDays: "Mon–Sat (closed Sun); Thu evening opening",
    priceNis: 58,
    admission: "Adult ₪58; under 18 free for regular museum entry", booking: "Exhibitions and activities may need separate tickets",
    highlightsForFamilies: "MUZA Park and selected grounds are free to enter during opening hours; exhibitions and events are separate.",
    intro: "A leafy multi-pavilion museum campus with archaeology, historical craft, photography and changing displays. The grounds are a real part of the experience.",
    highlights: ["Archaeological and material-culture collections", "Outdoor heritage spaces", "Changing exhibitions"],
    tip: "The Lasky Planetarium is a separate attraction within MUZA and may require a separate ticket. Check the museum for reopening news.",
    closureNote: "Planetarium closed as of November 2026.",
    url: "https://www.eretzmuseum.org.il/en/visit/",
    ticketUrl: "https://www.eretzmuseum.org.il/tickets/",

  },
  {
    id: "palmach", mapLocation: { lat: 32.10449, lon: 34.79921 }, name: "Palmach Museum", area: "north", neighbourhood: "Ramat Aviv", address: "10 Haim Levanon Street, Tel Aviv",
    theme: "Modern Israeli history", bestFor: "Immersive heritage experiences", duration: "About 90 minutes",
    openingDays: "Sun & Tue–Thu 09:00–17:00; Mon 09:00–15:00; Fri 09:00–11:00 (closed Sat)",
    priceNis: 30,
    admission: "Adult ₪30; ages 6–18 ₪20", booking: "Advance booking by phone or WhatsApp: 03-5459800 (ages 6+)",
    intro: "An immersive, guided group experience follows young Palmach recruits through the period leading to Israel's independence. This is a structured timed presentation, not a self-guided gallery.",
    highlights: ["90-minute immersive tour", "Palmach story and history", "Multi-language audio options"],
    tip: "Ask about English-language translation headphones when arranging your timed visit.",
    url: "https://palmach.org.il/en/museum/visit/",
    ticketUrl: "https://palmach.org.il/en/museum/visit/",
  },
  {
    id: "rabin", mapLocation: { lat: 32.10264, lon: 34.79962 }, name: "Yitzhak Rabin Center – Israeli Museum", area: "north", neighbourhood: "Northern Tel Aviv", address: "8 Haim Levanon Street, Tel Aviv",
    theme: "Israeli history", bestFor: "20th-century history & society", duration: "1.5–2 hours",
    openingDays: "Sun–Thu (closed Fri, Sat & holiday eves)",
    admission: "Check current museum ticket price", booking: "Reserve ahead; ticket office closes 90 minutes before closing",
    intro: "The Israeli Museum presents the history of the state and society alongside key chapters of Yitzhak Rabin's life and career.",
    highlights: ["Modern Israeli history", "Rabin's life in context", "Panoramic setting above the Yarkon area"],
    tip: "A good alternative to the Palmach Museum for visitors wanting a broader historical sweep; check which parts of the exhibition are available.",
    url: "https://www.rabincenter.org.il/en/visitor-information-of-the-israel-museum/",
    ticketUrl: "https://www.rabincenter.org.il/tickets/",
  },
  {
    id: "gutman", mapLocation: { lat: 32.06101, lon: 34.76652 }, name: "Nahum Gutman Museum of Art", area: "south", neighbourhood: "Neve Tzedek", address: "21 Shimon Rokach Street, Tel Aviv",
    theme: "Israeli art", bestFor: "Art & a Neve Tzedek stroll", duration: "45–75 minutes",
    openingDays: "Mon–Sat (closed Sun); Fri until 14:00",
    priceNis: 40,
    admission: "Adult ₪40; under 18 free", booking: "Check current exhibitions; online tickets available",
    highlightsForFamilies: "Children under 18 enter free.",
    intro: "A small museum devoted to the painter, illustrator and author Nahum Gutman. Its Neve Tzedek setting makes it particularly enjoyable as part of a neighbourhood walk.",
    highlights: ["Works by Nahum Gutman", "Israeli art and illustration", "Historic Neve Tzedek setting"],
    tip: "Spend time exploring Neve Tzedek afterwards; allow extra walking time if you continue to Jaffa.",
    url: "https://www.gutmanmuseum.co.il/en/useful-info/",
    ticketUrl: "https://www.gutmanmuseum.co.il/en/product/entry-tickets/",
  },
  {
    id: "etzel-1948", mapLocation: { lat: 32.05933, lon: 34.7587 }, name: "Etzel Museum – 1948", area: "south", neighbourhood: "Charles Clore Park / Jaffa seafront", address: "2 Nahum Goldmann Street, Charles Clore Park, Tel Aviv-Yafo",
    theme: "Military history", bestFor: "1948 history & heritage", duration: "45–75 minutes",
    openingDays: "Public visiting days: confirm with Ministry of Defense",
    admission: "Check admission directly with museum operator", booking: "Check current entry and guided visits",
    intro: "This waterfront site focuses on the Etzel underground organisation and the 1948 fighting in the Jaffa area. It is distinct from the Etzel Museum in the Jabotinsky House on King George Street.",
    highlights: ["History of the 1948 Jaffa campaign", "Seafront historic setting", "Separate Ministry of Defense museum"],
    tip: "Do not confuse this museum with the Etzel Museum at 38 King George Street. Check visitor entry and English information with the operator before setting out.",
    url: "https://museums.mod.gov.il/sites/Tashach/Events/Pages/default.aspx",
  },
  {
    id: "ilana", mapLocation: { lat: 32.0533, lon: 34.75136 }, name: "Ilana Goor Museum", area: "jaffa", neighbourhood: "Old Jaffa", address: "4 Mazal Dagim Street, Old Jaffa",
    theme: "Art & sculpture", bestFor: "Art, sculpture & historic interiors", duration: "60–90 minutes",
    openingDays: "Daily; Fri until 14:00",
    priceNis: 45,
    admission: "Adult ₪45; ages 5–17 ₪20", booking: "Regular admission; book private tours separately",
    intro: "A singular collection of sculpture, furniture and works by international artists housed in an evocative historic building overlooking the Mediterranean.",
    highlights: ["Ilana Goor's art and eclectic collection", "Atmospheric historic building", "Old Jaffa setting"],
    tip: "Allow enough time for the staircases and streets around the building and pair it with the Jaffa lanes and port.",
    url: "https://www.ilanagoormuseum.org/en/visiting/",
    ticketUrl: "https://www.ilanagoormuseum.org/en/product/tickets/",
  },
  {
    id: "independence", mapLocation: { lat: 32.06274, lon: 34.77093 }, name: "Independence Hall", area: "central", neighbourhood: "Rothschild Boulevard", address: "16 Rothschild Boulevard, Tel Aviv",
    theme: "Independence heritage", bestFor: "Israel's founding history", duration: "45–60 minutes once reopened",
    openingDays: "Closed until further notice (restoration)",
    admission: "Not available while closed for restoration", booking: "Interior visits unavailable until reopening",
    intro: "The historic residence of Meir Dizengoff is where David Ben-Gurion proclaimed the establishment of the State of Israel on 14 May 1948. The site is undergoing restoration and is closed until further notice.",
    highlights: ["Site of Israel's 1948 declaration", "Early Tel Aviv history", "Historic Rothschild Boulevard setting"],
    tip: "You can include the building in a Rothschild Boulevard heritage walk; check for a reopening announcement before planning an interior visit.",
    closureNote: "Closed until further notice for restoration.",
    url: "https://shimur.org/sites/independence-hall/?lang=en",
  },
];

/** Coordinates are from OpenStreetMap venue points, checked against official addresses. */
export const museumMapPoints = museums.map(museum => ({
  id: museum.id, name: museum.name, area: museum.area,
  lat: museum.mapLocation!.lat, lon: museum.mapLocation!.lon,
  closed: museum.id === "independence",
}));

export const additionalMuseums = [
  { name: "Etzel Museum – Jabotinsky House", place: "38 King George Street, central Tel Aviv", note: "A separate museum focused on the organisation's earlier history; verify visiting hours with the Ministry of Defense.", url: "https://museums.mod.gov.il/sites/Etzel/aboutus/Pages/About.aspx" },
  { name: "Uri Geller Museum", place: "Old Jaffa", note: "A specialist private or group guided visit, not a regular walk-in museum. Contact the operator before planning it.", url: "https://www.urigellermuseum.com/" },
];
