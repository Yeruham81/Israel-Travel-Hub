/** Curated museum visits; visitor links are official operator pages, not affiliate offers. */
export type MuseumArea = "central" | "north" | "south" | "jaffa";
export type MuseumEntry = {
  id: string; name: string; area: MuseumArea; neighbourhood: string; address: string;
  theme: string; bestFor: string; duration: string; admission: string; booking: string;
  intro: string; highlights: string[]; tip: string; url: string; ticketUrl?: string;
  image?: { src: string; alt: string; credit?: string };
  featured?: boolean;
  closureNote?: string;
};

export const museumAreas: { id: MuseumArea; name: string; intro: string }[] = [
  { id: "central", name: "City centre & Bialik Square", intro: "Art and small heritage buildings are spread across the centre. The Bialik Square museums form the most convenient walking cluster; allow a separate journey to the main Tel Aviv Museum of Art." },
  { id: "north", name: "Ramat Aviv & Tel Aviv University", intro: "The university and northern museums offer some of the city's largest collections. Choose one major museum or two carefully timed visits; these are not all next door to one another." },
  { id: "south", name: "Neve Tzedek & the southern seafront", intro: "A smaller artist museum and a separate military-history museum can complement a walk towards the waterfront, with different entrances and booking arrangements." },
  { id: "jaffa", name: "Old Jaffa", intro: "Historic stone lanes, a striking artist-house museum and specialist guided visits. Allow time for steep streets and the walk between venues." },
];

export const museums: MuseumEntry[] = [
  {
    id: "art", name: "Tel Aviv Museum of Art", area: "central", neighbourhood: "Civic Center", address: "27 Shaul HaMelech Boulevard, Tel Aviv",
    theme: "Art", bestFor: "First-time visitors & art lovers", duration: "2–3 hours",
    admission: "Paid; current rates on official site", booking: "Check exhibitions and entrance notices",
    intro: "My first choice for a substantial art visit. Israeli and international modern and contemporary collections sit alongside ambitious temporary exhibitions in distinctive modern buildings.",
    highlights: ["Israeli and international collections", "Herta and Paul Amir Building and architecture", "Changing exhibitions and sculpture"],
    tip: "Review the exhibitions before travelling. The Eyal Ofer Pavilion (formerly Helena Rubinstein Pavilion) is at 6 Tarsat Boulevard, separate from the main entrance, and renovation notices may affect access.",
    url: "https://www.tamuseum.org.il/en/visit/", featured: true,

  },
  {
    id: "city", name: "Tel Aviv–Yafo City Museum", area: "central", neighbourhood: "Bialik Square", address: "27 Bialik Street, Tel Aviv",
    theme: "City history", bestFor: "Local stories & urban history", duration: "60–90 minutes",
    admission: "Paid; see official ticket page", booking: "Digital ticket purchase only",
    intro: "An engaging introduction to the city through the experiences and memories of its residents, historic objects and changing exhibitions. Its location makes it easy to build a small museum walk around Bialik Square.",
    highlights: ["Local stories and multimedia", "Historic municipal building", "Easy pairing with artist-house museums"],
    tip: "Combine it with Rubin Museum and Liebling Haus nearby, rather than trying to fit Old Jaffa into the same short walk.",
    url: "https://taycm.org.il/en/info-en/", featured: true,
  },
  {
    id: "rubin", name: "Rubin Museum", area: "central", neighbourhood: "Bialik Square", address: "14 Bialik Street, Tel Aviv",
    theme: "Artist house", bestFor: "Israeli painting & intimate museums", duration: "45–75 minutes",
    admission: "Paid; check current admission", booking: "Check visitor hours and exhibitions",
    intro: "The former home of painter Reuven Rubin brings his work and the early cultural life of Tel Aviv into a domestic setting. A rewarding contrast with the main art museum.",
    highlights: ["Works by Reuven Rubin", "Historic artist's home", "Short central-city visit"],
    tip: "It is only a short walk from the City Museum; check which rooms and displays are open.",
    url: "https://rubinmuseum.org.il/en/company/visit/main/",
  },
  {
    id: "liebling", name: "Liebling Haus – White City Center", area: "central", neighbourhood: "White City / Bialik area", address: "29 Idelson Street, Tel Aviv",
    theme: "Architecture", bestFor: "Bauhaus & White City architecture", duration: "45–90 minutes",
    admission: "Free general entry; activities may cost extra", booking: "Check tours and programme dates",
    intro: "Set inside a restored International Style building, this cultural centre introduces the architecture and urban history that shaped Tel Aviv's UNESCO-listed White City.",
    highlights: ["Modernist residential architecture", "Multidisciplinary exhibitions", "Architecture walks and talks"],
    tip: "An excellent addition to a Bialik Square afternoon; book a specialist English tour separately if one is available.",
    url: "https://www.lieblinghaus.org/whoarewe-en", featured: true,
  },
  {
    id: "bialik", name: "Bialik House", area: "central", neighbourhood: "Bialik Square", address: "22 Bialik Street, Tel Aviv",
    theme: "Literature & heritage", bestFor: "Literature & early Tel Aviv", duration: "45–60 minutes",
    admission: "Paid; current rates on official site", booking: "Tickets sold digitally",
    intro: "The home of Hebrew poet Haim Nahman Bialik offers a close look at a major literary figure and the decorative interiors of early Tel Aviv.",
    highlights: ["Restored interiors", "Literary and archive collections", "Historic Bialik Square"],
    tip: "A good alternative to a second art museum if you enjoy historic homes and Hebrew cultural history.",
    url: "https://www.bialikmuseum.org.il/pages?pageid=14",
  },
  {
    id: "bauhaus", name: "Bauhaus Center Tel Aviv", area: "central", neighbourhood: "Dizengoff Square", address: "77 Dizengoff Street, Tel Aviv",
    theme: "Architecture centre", bestFor: "Architecture tours & design", duration: "30–60 minutes, longer with a tour",
    admission: "Gallery entry free; guided tours paid", booking: "Book city walks separately",
    intro: "A gallery, bookshop and starting point for guided White City architecture walks, rather than a conventional large museum.",
    highlights: ["Design exhibitions", "Bauhaus and International Style context", "Guided city walks"],
    tip: "Consider this a companion stop for architecture enthusiasts, not a substitute for the major art museums.",
    url: "https://bauhaus-center.com/", ticketUrl: "https://bauhaus-center.com/tel-aviv-white-city-tours/",
  },
  {
    id: "anu", name: "ANU – Museum of the Jewish People", area: "north", neighbourhood: "Tel Aviv University", address: "Klausner Street, Tel Aviv University campus",
    theme: "Jewish culture", bestFor: "Jewish history, identity & families", duration: "2–3 hours",
    admission: "Paid; see official ticket options", booking: "Advance booking required for the Heroes gallery",
    intro: "An extensive, multimedia exploration of Jewish communities, creativity, identity and life around the world. It rewards visitors who want time to engage with the stories.",
    highlights: ["Global Jewish culture and heritage", "Interactive displays", "Heroes gallery for children"],
    tip: "The Heroes gallery is especially suitable for children aged 6–12 and needs a reserved time; do not confuse it with general admission.",
    url: "https://anumuseum.org.il/plan-your-visit/", featured: true,
  },
  {
    id: "steinhardt", name: "Steinhardt Museum of Natural History", area: "north", neighbourhood: "Tel Aviv University", address: "12 Klausner Street, Tel Aviv",
    theme: "Natural history", bestFor: "Families & wildlife enthusiasts", duration: "1.5–2.5 hours",
    admission: "Paid; see official booking page", booking: "Online ticket purchase only",
    intro: "A modern natural-history museum exploring biodiversity, evolution and the living world through specimens and interpretive displays, especially appealing to curious children and adults.",
    highlights: ["Animals and biodiversity", "Regional habitats and ecology", "Family-friendly exhibition spaces"],
    tip: "Reserve a museum time online and check the day-specific timetable. ANU is a separate institution with separate admission.",
    url: "https://smnh.tau.ac.il/en/buy-tickets/",
  },
  {
    id: "muza", name: "MUZA – Eretz Israel Museum", area: "north", neighbourhood: "Ramat Aviv", address: "2 Haim Levanon Street, Tel Aviv",
    theme: "Archaeology & culture", bestFor: "Archaeology, crafts & open-air exhibits", duration: "2–3 hours",
    admission: "Paid exhibitions; some outdoor areas accessible free", booking: "Check exhibitions and programme tickets",
    intro: "A leafy multi-pavilion museum campus with archaeology, historical craft, photography and changing displays. The grounds are a real part of the experience.",
    highlights: ["Archaeological and material-culture collections", "Outdoor heritage spaces", "Changing exhibitions"],
    tip: "The Lasky Planetarium is a separate attraction within MUZA and may require a separate ticket. Check the museum for reopening news.",
    closureNote: "Planetarium closed as of November 2026.",
    url: "https://www.eretzmuseum.org.il/en/visit/",

  },
  {
    id: "palmach", name: "Palmach Museum", area: "north", neighbourhood: "Ramat Aviv", address: "10 Haim Levanon Street, Tel Aviv",
    theme: "Modern Israeli history", bestFor: "Immersive heritage experiences", duration: "About 90 minutes",
    admission: "Paid; check official booking", booking: "Advance booking essential; ages 6+",
    intro: "An immersive, guided group experience follows young Palmach recruits through the period leading to Israel's independence. This is a structured timed presentation, not a self-guided gallery.",
    highlights: ["90-minute immersive tour", "Palmach story and history", "Multi-language audio options"],
    tip: "Reserve a session and verify English audio availability in advance; entry to the presentation is restricted to children aged six and above.",
    url: "https://palmach.org.il/en/museum/visit/",
  },
  {
    id: "rabin", name: "Yitzhak Rabin Center – Israeli Museum", area: "north", neighbourhood: "Northern Tel Aviv", address: "8 Haim Levanon Street, Tel Aviv",
    theme: "Israeli history", bestFor: "20th-century history & society", duration: "1.5–2 hours",
    admission: "Paid; see operator information", booking: "Check visiting arrangements and language",
    intro: "The Israeli Museum presents the history of the state and society alongside key chapters of Yitzhak Rabin's life and career.",
    highlights: ["Modern Israeli history", "Rabin's life in context", "Panoramic setting above the Yarkon area"],
    tip: "A good alternative to the Palmach Museum for visitors wanting a broader historical sweep; check which parts of the exhibition are available.",
    url: "https://www.rabincenter.org.il/en/visitor-information-of-the-israel-museum/",
  },
  {
    id: "gutman", name: "Nahum Gutman Museum of Art", area: "south", neighbourhood: "Neve Tzedek", address: "21 Shimon Rokach Street, Tel Aviv",
    theme: "Israeli art", bestFor: "Art & a Neve Tzedek stroll", duration: "45–75 minutes",
    admission: "Paid; see official tickets", booking: "Check the exhibition calendar",
    intro: "A small museum devoted to the painter, illustrator and author Nahum Gutman. Its Neve Tzedek setting makes it particularly enjoyable as part of a neighbourhood walk.",
    highlights: ["Works by Nahum Gutman", "Israeli art and illustration", "Historic Neve Tzedek setting"],
    tip: "Spend time exploring Neve Tzedek afterwards; allow extra walking time to Jaffa instead of treating it as the next door attraction.",
    url: "https://www.gutmanmuseum.co.il/en/useful-info/",
  },
  {
    id: "etzel-1948", name: "Etzel Museum – 1948", area: "south", neighbourhood: "Charles Clore Park / Jaffa seafront", address: "2 Nahum Goldmann Street, Charles Clore Park, Tel Aviv-Yafo",
    theme: "Military history", bestFor: "1948 history & heritage", duration: "45–75 minutes",
    admission: "Confirm with the Ministry of Defense", booking: "Verify public visiting sessions",
    intro: "This waterfront site focuses on the Etzel underground organisation and the 1948 fighting in the Jaffa area. It is distinct from the Etzel Museum in the Jabotinsky House on King George Street.",
    highlights: ["History of the 1948 Jaffa campaign", "Seafront historic setting", "Separate Ministry of Defense museum"],
    tip: "Do not confuse this museum with the Etzel Museum at 38 King George Street. Check visitor entry and English information with the operator before setting out.",
    url: "https://museums.mod.gov.il/sites/Tashach/Events/Pages/default.aspx",
  },
  {
    id: "ilana", name: "Ilana Goor Museum", area: "jaffa", neighbourhood: "Old Jaffa", address: "4 Mazal Dagim Street, Old Jaffa",
    theme: "Art & sculpture", bestFor: "Art, sculpture & historic interiors", duration: "60–90 minutes",
    admission: "Paid; current tickets online", booking: "Check visiting hours; guided tours separately",
    intro: "A singular collection of sculpture, furniture and works by international artists housed in an evocative historic building overlooking the Mediterranean.",
    highlights: ["Ilana Goor's art and eclectic collection", "Atmospheric historic building", "Old Jaffa setting"],
    tip: "Allow enough time for the staircases and streets around the building and pair it with the Jaffa lanes and port.",
    url: "https://www.ilanagoormuseum.org/en/visiting/",
  },
  {
    id: "independence", name: "Independence Hall", area: "central", neighbourhood: "Rothschild Boulevard", address: "16 Rothschild Boulevard, Tel Aviv",
    theme: "Independence heritage", bestFor: "Israel's founding history", duration: "45–60 minutes once reopened",
    admission: "Reopening and admission details to be announced", booking: "Interior visits unavailable while closed",
    intro: "The historic residence of Meir Dizengoff is where David Ben-Gurion proclaimed the establishment of the State of Israel on 14 May 1948. Its historic significance makes it an important part of Tel Aviv's museum story, even during restoration.",
    highlights: ["Site of Israel's 1948 declaration", "Early Tel Aviv history", "Historic Rothschild Boulevard setting"],
    tip: "You can include the building in a Rothschild Boulevard heritage walk, but do not plan an interior tour until the official operator confirms reopening.",
    closureNote: "Closed as of November 2026.",
    url: "https://shimur.org/sites/independence-hall/?lang=en",
  },
];

export const additionalMuseums = [
  { name: "Etzel Museum – Jabotinsky House", place: "38 King George Street, central Tel Aviv", note: "A separate museum focused on the organisation's earlier history; verify visiting hours with the Ministry of Defense.", url: "https://museums.mod.gov.il/sites/Etzel/aboutus/Pages/About.aspx" },
  { name: "Uri Geller Museum", place: "Old Jaffa", note: "A specialist private or group guided visit, not a regular walk-in museum. Contact the operator before planning it.", url: "https://www.urigellermuseum.com/" },
];
