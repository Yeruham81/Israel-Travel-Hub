/** Curated Haifa museum visitor guide. Official operator information checked in November 2026.
 * The historical guide's Bahá'í Gardens and sculpture gardens are not classified as museums.
 * Appointment-only/unverified collections are not advertised as regularly open.
 */
export type HaifaMuseumArea = "downtown" | "hadar" | "carmel" | "coast";
export type HaifaMuseumEntry = {
  id: string; name: string; area: HaifaMuseumArea; neighbourhood: string; address: string;
  theme: string; bestFor: string; duration: string; admission: string; openingDays: string; booking: string;
  intro: string; highlights: string[]; tip: string; url: string; ticketUrl?: string;
  featured?: boolean; closureNote?: string; priceNis?: number; highlightsForFamilies?: string;
};
export const haifaMuseumAreas: {id: HaifaMuseumArea; name: string; intro: string}[] = [
  {
    id: "downtown", name: "Downtown, Wadi Nisnas & German Colony",
    intro: "The City Museum and Haifa Museum of Art suit a lower-city cultural outing. The Railway Museum is farther east at historic Haifa East station; check the route before combining all three."
  },
  {
    id: "hadar", name: "Hadar: science & artists' houses",
    intro: "MadaTech makes a substantial family visit in the historic Technion building. Hermann Struck's former home is a smaller art-history stop elsewhere in Hadar, with its own opening schedule."
  },
  {
    id: "carmel", name: "Carmel Centre & University of Haifa",
    intro: "Tikotin and Mané-Katz are in the Carmel Centre area, but Mané-Katz is currently closed for renovation. The Hecht Museum is at the university, farther uphill: allow a separate bus, taxi or car journey."
  },
  {
    id: "coast", name: "Bat Galim & the western waterfront",
    intro: "The National Maritime Museum and the Clandestine Immigration and Naval Museum are near each other on Allenby Road. They are different museums, run by different operators, with separate tickets."
  }
];
export const haifaMuseums: HaifaMuseumEntry[] = [
  {
    id: "art", name: "Haifa Museum of Art", area: "downtown", neighbourhood: "Wadi Nisnas / Lower City",
    address: "26 Shabtai Levi Street, Haifa", theme: "Contemporary art", bestFor: "Changing art exhibitions and Israeli culture",
    duration: "1–2 hours", priceNis: 40,
    admission: "Adult ₪40 on the municipal price list; concessions and combined passes vary.",
    openingDays: "Sun, Tue–Wed, Sat 10:00–16:00; Thu 10:00–18:00; Fri 10:00–14:00. Mon closed.",
    booking: "General visits usually do not require booking; check current exhibitions.",
    intro: "Haifa's principal contemporary-art museum presents changing Israeli and international exhibitions in a historic building at the meeting point of Hadar and Wadi Nisnas. The displays vary, so I would check what's on before choosing a visit.",
    highlights: ["Rotating contemporary exhibitions, including photography, video and installation art.", "A good cultural stop to combine with Wadi Nisnas and the lower-city streets."],
    tip: "Look at the current exhibition programme first. This museum is about changing displays, so one visit can feel very different from another.",
    url: "https://www.hma.org.il/eng", featured: true
  },
  {
    id: "city", name: "Haifa City Museum", area: "downtown", neighbourhood: "German Colony",
    address: "11 Ben Gurion Avenue, Haifa", theme: "City history", bestFor: "Haifa's communities, urban history and the German Colony",
    duration: "45–90 minutes", priceNis: 30,
    admission: "Adult ₪30 on the municipal price list; check exhibition and ticket availability.",
    openingDays: "Usually Sun, Tue–Wed, Sat 10:00–16:00; Thu 10:00–18:00; Fri 10:00–14:00. Mon closed, but may close for exhibition installation.",
    booking: "Check that an exhibition is open before travelling; temporary changeovers can close the building.",
    intro: "The City Museum occupies a restored Templer-era building in the German Colony. Its exhibitions explore Haifa's different communities and evolving urban identity rather than following a single permanent chronological display.",
    highlights: ["Changing exhibitions about the city's architecture, people and social history.", "A convenient pairing with Ben Gurion Avenue and views towards the Bahá'í terraces."],
    tip: "Make this part of a German Colony walk; the museum sometimes closes between exhibitions, so check the day's programme before setting out.",
    url: "https://www.hcm.org.il/eng", featured: false
  },
  {
    id: "railway", name: "Israel Railway Museum", area: "downtown", neighbourhood: "Haifa East / Wadi Salib",
    address: "HaKatar Street (historic Haifa East station), Haifa", theme: "Railway heritage",
    bestFor: "Historic locomotives, rolling stock and transport history", duration: "1–1.5 hours",
    admission: "Check the current Israel Railways museum tariff and concession rates.",
    openingDays: "Usually Sun–Thu during daytime hours; closed on weekends. Confirm the live museum timetable.",
    booking: "Confirm opening, last admission and any group requirements with Israel Railways.",
    intro: "Inside the historic Haifa East station complex, the Railway Museum traces rail travel from Ottoman and British Mandate lines to the modern railway system. Its surviving locomotives and carriages are the main draw.",
    highlights: ["Historic engines, passenger carriages and railway equipment.", "The story of the old Jezreel Valley Railway and Haifa East station."],
    highlightsForFamilies: "Families interested in trains often enjoy this more than a conventional history gallery.",
    tip: "The museum entrance is not at Haifa Merkaz HaShmona station. Use the museum's own arrival directions and leave extra time to reach Haifa East.",
    url: "https://rail.co.il/?lan=en&page=museum", ticketUrl: "https://rail.co.il/?lan=en&page=museum-hours", featured: true
  },
  {
    id: "madatech", name: "MadaTech – Israel National Museum of Science", area: "hadar",
    neighbourhood: "Hadar HaCarmel", address: "25 Shmaryahu Levin Street, Haifa",
    theme: "Hands-on science", bestFor: "Families, experiments and interactive discovery", duration: "2.5–4 hours",
    admission: "Admission varies by date and eligibility; children under 5 enter free with an advance-issued ticket.",
    openingDays: "Changes by date, season and school holidays; use the official live opening calendar.",
    booking: "Book a dated admission ticket online in advance to secure your preferred visit.",
    intro: "MadaTech fills the historic Technion campus with interactive exhibitions, science demonstrations and outdoor installations. It is one of the strongest choices for families, but also rewarding for adults who enjoy science.",
    highlights: ["Hands-on science and technology experiences across several exhibition areas.", "The outdoor science park and programmes that change throughout the year."],
    highlightsForFamilies: "Plan around a three-hour visit, allow more time with younger children, and bring spare clothes if the water activities are operating.",
    tip: "I would make MadaTech the main event rather than squeeze it between several other museums. The outdoor science garden is especially useful when the weather is good.",
    url: "https://www.madatech.org.il/en/", ticketUrl: "https://tickets.madatech.org.il/en/", featured: true
  },
  {
    id: "struck", name: "Hermann Struck Museum", area: "hadar", neighbourhood: "Hadar HaCarmel",
    address: "23 Arlozorov Street, Haifa", theme: "Printmaking & artists' house",
    bestFor: "Historic interiors, prints and intimate exhibitions", duration: "45–75 minutes", priceNis: 0,
    admission: "Free general admission according to Haifa Museums; check separately for workshops or special activities.",
    openingDays: "Usually Sun, Tue–Wed 10:00–16:00; Thu 10:00–18:00; Fri 10:00–14:00. Mon and Sat closed.",
    booking: "Check the exhibition programme and access arrangements.",
    intro: "Housed in artist Hermann Struck's former home, this smaller museum introduces his printmaking work, personal objects and the artistic world of the early twentieth century. Exhibitions also explore the printmaking medium.",
    highlights: ["The artist's historic home, furnishings and studio atmosphere.", "Printmaking exhibitions and original works connected with Struck's career."],
    tip: "This is a compact specialist visit, best for art lovers. Check the current exhibition before making a special trip up to Hadar.",
    url: "https://www.shm.org.il/eng"
  },
  {
    id: "tikotin", name: "Tikotin Museum of Japanese Art", area: "carmel",
    neighbourhood: "Carmel Centre", address: "89 HaNassi Avenue, Haifa",
    theme: "Japanese art", bestFor: "Japanese prints, crafts and quieter exhibitions", duration: "1–1.5 hours", priceNis: 40,
    admission: "Adult ₪40 on the municipal price list; discounts and combined tickets vary.",
    openingDays: "Sun, Tue–Wed, Sat 10:00–16:00; Thu 10:00–18:00; Fri 10:00–14:00. Mon closed.",
    booking: "General visits usually do not require booking; check workshops and special events separately.",
    intro: "A dedicated museum of Japanese art on the Carmel ridge, Tikotin shows prints, ceramics, textiles and other works through changing exhibitions. It offers a different cultural experience from Haifa's history and maritime collections.",
    highlights: ["Japanese prints, decorative arts and thoughtfully curated temporary displays.", "Japanese cultural events and workshops on selected dates."],
    tip: "Pair it with a Carmel Centre walk and a viewpoint rather than rushing downhill to the port. Check if a special workshop is scheduled during your stay.",
    url: "https://www.tmja.org.il/eng", featured: true
  },
  {
    id: "mane-katz", name: "Mané-Katz Museum", area: "carmel", neighbourhood: "Carmel Centre",
    address: "89 Yefe Nof Street, Haifa", theme: "Artist's home & Jewish art",
    bestFor: "École de Paris painting and personal collections", duration: "45–75 minutes when open",
    admission: "Closed for renovation; admission will need reconfirmation when it reopens.",
    openingDays: "Closed for renovation according to Haifa Museums.",
    booking: "Do not plan an interior visit until the operator announces reopening.",
    intro: "The museum is dedicated to the painter Mané-Katz and the collection he left to Haifa. Works from the collection may be shown elsewhere while the historic museum undergoes renovation.",
    highlights: ["Mané-Katz paintings and works relating to the School of Paris.", "Jewish ceremonial objects and the artist's personal collection when the museum reopens."],
    tip: "For now, treat the building as a possible exterior landmark only. The official Haifa Museums site is the best place to follow reopening notices.",
    url: "https://www.mkm.org.il/eng", closureNote: "Closed for renovation — interior visits unavailable"
  },
  {
    id: "hecht", name: "Hecht Museum", area: "carmel", neighbourhood: "University of Haifa, Mount Carmel",
    address: "199 Abba Hushi Avenue, University of Haifa, Haifa",
    theme: "Archaeology & art", bestFor: "Ancient Israel, maritime archaeology and art",
    duration: "1.5–2 hours", priceNis: 0,
    admission: "Free general admission; a specialist heritage wing may have separate arrangements.",
    openingDays: "Usually Sun, Mon, Wed–Thu 10:00–16:00; Tue to 19:00; Fri 10:00–13:00; Sat 10:00–14:00. Check campus updates.",
    booking: "General entry is free; confirm access to particular galleries and groups in advance.",
    intro: "The Reuben and Edith Hecht Museum is inside the University of Haifa campus. Archaeological finds, ancient crafts, the Ma'agan Michael shipwreck and art galleries make it a rewarding stop for visitors interested in the region's long history.",
    highlights: ["Archaeology from the Canaanite period onwards and displays of ancient daily life.", "The ancient Ma'agan Michael ship exhibition and art collections."],
    tip: "Allow time for the journey to the university high above the centre. It is worth visiting, but it is not a short walk from Tikotin or the German Colony.",
    url: "https://mushecht.haifa.ac.il/", featured: true
  },
  {
    id: "maritime", name: "National Maritime Museum", area: "coast",
    neighbourhood: "Western Haifa / Bat Galim", address: "198 Allenby Road, Haifa",
    theme: "Maritime archaeology", bestFor: "Ships, ancient trade and Mediterranean seafaring",
    duration: "1–1.5 hours", priceNis: 40,
    admission: "Adult ₪40 on the municipal price list; combined Haifa Museums tickets may apply.",
    openingDays: "Sun, Tue–Wed, Sat 10:00–16:00; Thu 10:00–18:00; Fri 10:00–14:00. Mon closed.",
    booking: "General visitors can normally buy admission; check exhibition availability.",
    intro: "The National Maritime Museum explores navigation, ancient maritime trade and archaeology through ship models, finds from the sea and historical artefacts. It is a separate institution from the neighbouring immigration and naval museum.",
    highlights: ["Ancient maritime archaeology, ship models and historic navigational objects.", "Exhibitions explaining sea routes and Mediterranean civilisations."],
    tip: "This is the better first choice for ancient seafaring and archaeology. The naval museum nearby focuses on immigration and military history and requires its own ticket.",
    url: "https://www.nmm.org.il/eng", featured: true
  },
  {
    id: "naval", name: "Clandestine Immigration and Naval Museum", area: "coast",
    neighbourhood: "Western Haifa / Bat Galim", address: "204 Allenby Road, Haifa",
    theme: "Immigration & naval history", bestFor: "Historic ships, migration and Israel's navy",
    duration: "1.5–2 hours", priceNis: 20,
    admission: "Adult ₪20 according to the Ministry of Defense; reduced rates available.",
    openingDays: "Sun–Thu 09:00–16:00; Fri and Sat closed.",
    booking: "Contact the museum in advance for tours and current vessel-access arrangements.",
    intro: "This Ministry of Defense museum tells the story of clandestine Jewish immigration under the British Mandate and the development of Israel's navy. The ships and submarines are major attractions, though access to interiors can vary.",
    highlights: ["Immigration-era stories, photographs and historic vessels.", "Naval exhibits and the opportunity to explore large preserved ships where access is permitted."],
    highlightsForFamilies: "Ship visits can be memorable, but stairs and confined interiors may limit accessibility.",
    tip: "The museum entrance is reached via the Ma'ale HaDakar steps from Allenby Road. Verify ship access, particularly if travelling with small children or anyone with limited mobility.",
    url: "https://museums.mod.gov.il/sites/Haapala/Pages/default.aspx", featured: false
  }
];
export const haifaMuseumMapPoints = haifaMuseums.map(museum => ({
  id: museum.id, name: museum.name, address: museum.address,
  closed: Boolean(museum.closureNote), area: museum.area
}));
export const haifaAdditionalMuseums = [
  {
    name: "Israeli Personal Computer Museum",
    place: "Haifa Bay area",
    note: "Appeared in the original guide, but I could not verify regular public opening or ticket arrangements. Contact the operator and confirm the current address before making a special visit.",
    url: "https://www.google.com/maps/search/?api=1&query=Israeli+Personal+Computer+Museum+Haifa"
  },
  {
    name: "Bahá'í Gardens & Sculpture Garden",
    place: "Mount Carmel and central Haifa",
    note: "Excellent cultural or outdoor stops, but they are not museums. Use my Haifa attraction guide for the correct routes, permitted viewpoints and practical access information.",
    url: "https://www.ganbahai.org.il/"
  }
];
