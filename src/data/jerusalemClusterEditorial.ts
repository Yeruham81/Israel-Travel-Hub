import type { TravelGuide, GuideSection } from "@/data/travelGuides";
import type { TravelGuideId } from "@/data/registry";
import type { Attraction, AttractionId } from "@/data/attractionGuideTypes";
import { travelGuidePaths } from "@/data/registry";

/**
 * 2026 Jerusalem editorial refresh.  Supplements the existing material rather
 * than replacing historically useful guide sections or changing URLs.
 * The old WordPress pages were reviewed for subjects lost in the migration.
 * Dynamic fares, hours, admissions, site closures and live tour inventory are
 * never sourced from old articles.
 */
type Upgrade = {
  title?: string;
  description?: string;
  intro?: string;
  answer?: string;
  sections: GuideSection[];
  related?: TravelGuideId[];
  services?: TravelGuide["services"];
  reading?: TravelGuide["reading"];
};
const articles: Partial<Record<TravelGuideId, Upgrade>> = {
  jerusalem: {
    title: "Jerusalem Travel Guide: What to See, Where to Stay & How to Plan",
    description: "Plan a trip to Jerusalem: Old City walking routes, Mount of Olives, museums, churches, Mahane Yehuda, where to stay, transport and day trips.",
    intro: "Jerusalem is easiest to explore in clusters rather than as one long list of landmarks. I suggest choosing an Old City gate for your first day, setting aside a separate half-day for the Mount of Olives or a museum, and keeping space for the markets and neighbourhoods that give the city its everyday character.",
    answer: "For a first visit, plan two to three days if possible. Give the Old City its own focused day; add the Mount of Olives or Mount Zion according to your interests, then choose between museums, Mahane Yehuda and another neighbourhood. With a single day, concentrate on one walk and one nearby addition. Hotel location, religious-site access, Shabbat services and your actual departure point matter more than fitting every landmark into one itinerary.",
    sections: [
      {
        id: "jerusalem-route-one-day",
        title: "If you only have one day in Jerusalem",
        paragraphs: [
          "Begin at Jaffa Gate, where the Tower of David stands close to the Old City entrance. Follow a manageable route through one or two quarters, allowing enough time for the Western Wall or the Church of the Holy Sepulchre rather than expecting to see every site. Choose the gate and route that suit your mobility and interests.",
          "The Old City walking guide explains which gates serve which areas and where stairways make shortcuts less practical. If you prefer a guided introduction, compare the departure city, guiding language, exact sites and walking requirements on the Jerusalem tours page. A private car takes you between road-accessible stops; it cannot drive through most historic lanes.",
        ],
        inlineLinks: [
          { text: "Old City walking guide", to: "/travel-blog/old-city-jerusalem/" },
          { text: "Jerusalem tours", to: "/tours/jerusalem/" },
        ],
      },
      {
        id: "jerusalem-route-two-days",
        title: "A slower two- or three-day route",
        paragraphs: [
          "On the second day, choose the Mount of Olives if viewpoints and Christian pilgrimage sites are a priority, or the Israel Museum and Yad Vashem if museums and history are central to the trip. These locations are not one short, level walking loop; add a taxi or public-transport leg as needed.",
          "For another afternoon, browse Mahane Yehuda and the downtown streets. Combine Mamilla with a Jaffa Gate visit, or visit the German Colony on a quieter evening. My shopping guide separates food markets, Old City crafts and modern shopping streets, so you can choose a stop that actually fits your interests.",
          "Staying overnight near the Old City has a different arrival and luggage experience from staying near Jaffa Road or Mahane Yehuda. The neighbourhood-by-neighbourhood hotel guide explains these trade-offs and includes links to the relevant accommodation areas.",
        ],
        inlineLinks: [
          { text: "Mount of Olives", to: "/travel-blog/mount-of-olives/" },
          { text: "shopping guide", to: travelGuidePaths.jerusalemShopping },
          { text: "neighbourhood-by-neighbourhood hotel guide", to: "/travel-blog/where-to-stay-in-jerusalem/" },
        ],
      },
      {
        id: "jerusalem-arrival-local-transport",
        title: "Arriving in Jerusalem and moving between the sights",
        paragraphs: [
          "The airport railway reaches Jerusalem–Yitzhak Navon near the central bus station, not Jaffa Gate or an Old City hotel. Before booking accommodation, check the final light-rail, taxi or walking leg with your luggage. For the complete comparison, use my Ben Gurion Airport to Jerusalem guide; the airport transfer service is a separate booking option for a direct pickup.",
          "The Old City is predominantly explored on foot. For a Mount of Olives visit, a vehicle to an upper lookout followed by a downhill walk can save a strenuous climb. A day based around museums may involve different transit connections. Regular public transport changes significantly for Shabbat and Jewish holidays, so check the actual service day.",
        ],
        inlineLinks: [
          { text: "Ben Gurion Airport to Jerusalem guide", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/" },
          { text: "airport transfer service", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
        ],
      },
    ],
    related: ["jerusalemChurches", "jerusalemShopping", "jerusalemDayTrips", "jerusalemDeadSea", "bethlehem"],
    services: [
      { label: "Jerusalem walking and guided tours", to: "/tours/jerusalem/", note: "Check the advertised starting city and guiding inclusions" },
      { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/", note: "Neighbourhood and hotel advice" },
      { label: "Airport to Jerusalem: all transport options", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/" },
      { label: "Airport to Jerusalem: request a private transfer", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
      { label: "Day trips from Jerusalem", to: travelGuidePaths.jerusalemDayTrips },
    ],
  },
  jerusalemChurches: {
    title: "Churches in Jerusalem: A Practical Guide by Area",
    description: "Choose Jerusalem churches by the Old City, Mount of Olives, Mount Zion or Ein Karem. Plan Christian sites, walking routes, access and guided visits.",
    sections: [
      {
        id: "more-old-city-churches",
        title: "Other churches and chapels worth considering inside the Old City",
        paragraphs: [
          "Beyond the Church of the Holy Sepulchre and the Via Dolorosa, St Anne's near the Pools of Bethesda offers Crusader architecture and a very different atmosphere. The Lutheran Church of the Redeemer has a bell tower and historic church space; visits to each part can have different conditions. Along the Via Dolorosa, the Flagellation complex and smaller chapels follow their own worship schedules.",
          "The Armenian Cathedral of St James is an important part of the Armenian Quarter's religious life, not a walk-in museum. Entry can be restricted to specific worship periods. If you are visiting primarily for the four quarters and gates rather than a pilgrimage, start with the Old City guide and choose the churches that fit your walking route.",
        ],
        inlineLinks: [{ text: "Old City guide", to: "/travel-blog/old-city-jerusalem/" }],
      },
      {
        id: "christian-tradition-context",
        title: "Understand tradition, history and site access",
        paragraphs: [
          "A church's association with a biblical event is a matter of religious tradition and sometimes differs from what archaeology can establish. State this distinction when comparing sites: the Cenacle, Dormition Abbey and St Peter in Gallicantu tell related but separate stories on Mount Zion. The Mount Zion guide explains the short walk between them and the visitor limitations.",
          "On the Mount of Olives, the Church of All Nations and Garden of Gethsemane lie near the foot of the hill, while Dominus Flevit, Pater Noster and the Church of the Ascension require more climbing. Use the Mount of Olives guide for access, downhill route planning and suitable vehicle pickup points. Ein Karem, with the Church of the Visitation and St John the Baptist, is a separate neighbourhood journey.",
        ],
        inlineLinks: [
          { text: "Mount Zion guide", to: "/travel-blog/mount-zion/" },
          { text: "Mount of Olives guide", to: "/travel-blog/mount-of-olives/" },
        ],
      },
      {
        id: "church-tour-options",
        title: "Self-guided, guided or private transport?",
        paragraphs: [
          "A self-guided Old City church walk suits visitors comfortable with navigation, queues and independent historical reading. A licensed guide can explain differences in Christian traditions and arrange a route around agreed priorities. In any tour listing, read which churches are actually included, whether entrances are possible, and whether the operator provides a licensed guide.",
          "My Jerusalem tours directory includes guided experiences offered by different operators; my private-driver service is transport rather than automatic guiding. For visitors arriving by cruise ship, a Jerusalem outing from Ashdod needs a realistic disembarkation and return buffer before committing to a long pilgrimage route.",
        ],
        inlineLinks: [
          { text: "Jerusalem tours", to: "/tours/jerusalem/" },
          { text: "private-driver service", to: "/private-driver/" },
          { text: "outings from Ashdod", to: "/ashdod-shore-excursions/" },
        ],
      },
    ],
    related: ["jerusalem", "jerusalemDayTrips", "bethlehem"],
  },
  jerusalemShopping: {
    title: "Shopping in Jerusalem: Markets, Crafts, Malls & Local Streets",
    description: "Jerusalem shopping guide: Mahane Yehuda Market, Old City souks, Mamilla, Cardo, Ben Yehuda, Malha, Emek Refaim, craft shops and practical advice.",
    sections: [
      {
        id: "artists-colony",
        title: "Hutzot Hayotzer artists' workshops and craft shopping",
        paragraphs: [
          "Hutzot Hayotzer, the artists' colony by the Old City walls, has long been associated with pottery, metalwork, painting and local craft studios. It is not interchangeable with the Old City souvenir market: come here if you want to look closely at the maker and the object, rather than simply purchase a memento.",
          "Individual workshops and cultural events are not open on one shared timetable. Before making a special trip, confirm the specific studio or fair. The seasonal arts-and-crafts festival is a separate event with its own dates and admission, so check the Jerusalem events calendar rather than assuming a workshop is running.",
        ],
        inlineLinks: [{ text: "Jerusalem events calendar", to: travelGuidePaths.calendar }],
      },
      {
        id: "bezalel-independent-design",
        title: "Bezalel Street, independent designers and temporary fairs",
        paragraphs: [
          "The Bezalel Street area, downtown studios and occasional arts fairs can be good for handmade jewellery, prints and contemporary design. The old WordPress guide described a recurring Friday fair, but its precise location and current operation require verification; do not plan around a past schedule without an organiser's current announcement.",
          "For an easy city-centre browse, combine Ben Yehuda's pedestrian streets with shops on Jaffa Road. If shopping is secondary to sightseeing, Mamilla is a logical stop before or after Jaffa Gate, whereas Mahane Yehuda is a more food-focused experience.",
        ],
      },
      {
        id: "shopping-cardo-and-first-station",
        title: "The Cardo and the First Station: two very different stops",
        paragraphs: [
          "The Cardo in the Jewish Quarter is an archaeological street with small shops and galleries. Combine it with the Jewish Quarter and Western Wall rather than visiting as a standalone modern shopping centre. For crafts and religious gifts, ask about provenance, materials, packaging and how delicate purchases will travel.",
          "The First Station is a restored railway complex for restaurants, events and occasional small businesses; it is not a substitute for a large indoor mall. Emek Refaim nearby has a slower neighbourhood shopping-and-café feel. Each venue's Friday and Saturday schedule varies independently.",
        ],
        inlineLinks: [{ text: "Jewish Quarter", to: "/travel-blog/old-city-jerusalem/" }],
      },
      {
        id: "shopping-weekend-and-purchases",
        title: "Payment, bargaining, opening days and getting purchases home",
        paragraphs: [
          "Ask the price and currency before buying. Fixed-price shops and branded stores are different from stalls where negotiation may be welcome; there is no reliable percentage by which every market price should be reduced. Check return policies, tax receipts, materials and authenticity for more expensive pieces.",
          "Many shops close early on Friday or for Shabbat, while restaurants, fairs and some venues may have different arrangements. For groceries at Mahane Yehuda, arrive earlier rather than assuming the evening dining scene means produce stalls are open. Use a taxi or light rail for bulky bags instead of planning a long walk across Jerusalem.",
        ],
      },
      {
        id: "shopping-market-tours",
        title: "Food walks and market tours",
        paragraphs: [
          "If you want to taste local food rather than shop for it, choose a focused Mahane Yehuda food walk and check whether tastings, guide language and dietary requests are included. The food-and-market tours directory lists experiences from independent providers. For neighbourhood context, my guide to Mahane Yehuda and Nachlaot hotels explains what it is like to stay beside the market.",
        ],
        inlineLinks: [
          { text: "food-and-market tours", to: "/tours/food-market-tours/" },
          { text: "Mahane Yehuda and Nachlaot hotels", to: "/jerusalem/mahane-yehuda-nachlaot-hotels/" },
        ],
      },
    ],
    related: ["jerusalem", "food", "calendar"],
    services: [
      { label: "Food and market tours", to: "/tours/food-market-tours/" },
      { label: "Explore the Old City", to: "/travel-blog/old-city-jerusalem/" },
      { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { label: "German Colony and Baka hotels", to: "/jerusalem/german-colony-baka-hotels/" },
    ],
  },
  jerusalemDayTrips: {
    title: "Day Trips from Jerusalem: Compare Routes, Transport & Tours",
    description: "Choose day trips from Jerusalem to Masada, the Dead Sea, Bethlehem, Tel Aviv, Caesarea or the Galilee with realistic travel plans and links to tours.",
    sections: [
      {
        id: "departure-city-matters",
        title: "Check where the advertised tour actually starts",
        paragraphs: [
          "A tour sold as a day trip to Jerusalem is not necessarily a tour departing from Jerusalem. Compare the stated pickup city and meeting point before reserving: a package travelling from Tel Aviv can include a long transfer that you do not need when already staying in Jerusalem.",
          "The Dead Sea and Masada have dedicated tours with different access, guiding and beach inclusions. For the independent journey, check the Jerusalem to the Dead Sea guide instead. For Bethlehem, verify crossing arrangements and transport permissions before treating it as a routine local taxi ride.",
        ],
        inlineLinks: [
          { text: "Dead Sea and Masada", to: "/tours/masada-dead-sea/" },
          { text: "Jerusalem to the Dead Sea guide", to: travelGuidePaths.jerusalemDeadSea },
          { text: "Bethlehem", to: travelGuidePaths.bethlehem },
        ],
      },
      {
        id: "day-trip-booking-checks",
        title: "How to compare prices, tickets and guides fairly",
        paragraphs: [
          "Look for the same inclusions across offers: pickup and drop-off, guiding, group size, required entrance tickets, optional stops, lunch, waiting and cancellation conditions. External tour prices are the provider's responsibility and may change with date, currency, group size or options. This guide does not display a live price or promise a particular departure.",
          "My private-driver service can handle flexible transport for sites reached by car, while licensed guiding and admissions are separate. If arriving at Ashdod Port, cruise return times and port pickup rules change the route; choose the shore-excursion page rather than an ordinary Jerusalem hotel departure.",
        ],
        inlineLinks: [
          { text: "private-driver service", to: "/private-driver/" },
          { text: "shore-excursion page", to: "/ashdod-shore-excursions/" },
        ],
      },
    ],
    related: ["jerusalem", "jerusalemDeadSea", "bethlehem", "telAvivDayTrips"],
    services: [
      { label: "Masada and Dead Sea tour choices", to: "/tours/masada-dead-sea/" },
      { label: "Jerusalem walking tours", to: "/tours/jerusalem/" },
      { label: "Bethlehem, Jericho and Jordan River tours", to: "/tours/bethlehem-jericho-jordan-river/" },
      { label: "Tel Aviv and Jaffa tours", to: "/tours/tel-aviv-jaffa/" },
      { label: "Caesarea, Haifa and Acre tours", to: "/tours/caesarea-haifa-acre/" },
    ],
  },
  bethlehem: {
    sections: [
      {
        id: "bethlehem-before-you-book",
        title: "Bethlehem tickets, local visits and the correct return route",
        paragraphs: [
          "The Church of the Nativity, Manger Square, Milk Grotto and Shepherds' Field do not all require the same visit time or transport. Decide on two or three priorities, then check whether your guide or local driver includes them. The church's worship and restoration arrangements can affect access to individual areas. Confirm up-to-date information before travel.",
          "A Jerusalem to Bethlehem transport guide answers how to get there and back; a guided tour is a different product. Compare independent tour offers on the Bethlehem, Jericho and Jordan River page, and check the departure city, site list, group format, documents and return before paying.",
        ],
        inlineLinks: [{ text: "Bethlehem, Jericho and Jordan River page", to: "/tours/bethlehem-jericho-jordan-river/" }],
      },
    ],
    related: ["jerusalem", "jerusalemChurches", "jerusalemDayTrips"],
  },
  jerusalemDeadSea: {
    sections: [
      {
        id: "choose-the-right-ticket",
        title: "A beach visit, an archaeological park and a nature reserve need different plans",
        paragraphs: [
          "Floating at Ein Bokek is not the same experience as entering Masada National Park or hiking an open route at Ein Gedi. Check beach access, shower facilities, national-park reservations and the permitted trail before committing to a combined day. The Masada guide covers the cable car and park entrances, while the Masada and Dead Sea tours directory lets you compare organised products.",
          "If you travel independently, pay particular attention to the last return bus and to the walking distance between the stop and your actual destination. Guided transport or a private driver may be practical when combining several stops, but clarify whether park admission and licensed guiding are included.",
        ],
        inlineLinks: [
          { text: "Masada guide", to: "/travel-blog/masada/" },
          { text: "Masada and Dead Sea tours", to: "/tours/masada-dead-sea/" },
        ],
      },
    ],
    related: ["jerusalem", "jerusalemDayTrips", "bethlehem"],
  },
};

export function applyJerusalemGuideEditorial(guides: Record<TravelGuideId, TravelGuide>) {
  for (const id of Object.keys(articles) as TravelGuideId[]) {
    const changes = articles[id];
    if (!changes) continue;
    const guide = guides[id];
    if (!guide) throw new Error("Jerusalem editorial guide missing: " + id);
    if (changes.title) guide.title = changes.title;
    if (changes.description) guide.description = changes.description;
    if (changes.intro) guide.intro = changes.intro;
    if (changes.answer) guide.answer = changes.answer;
    guide.sections = [...guide.sections, ...changes.sections.filter(section => !guide.sections.some(existing => existing.id === section.id))];
    if (changes.related) guide.related = [...new Set([...guide.related, ...changes.related])].filter(other => other !== id);
    if (changes.services) guide.services = [...changes.services, ...guide.services.filter(service => !changes.services?.some(added => added.to === service.to))];
    if (changes.reading) guide.reading = [...(guide.reading || []), ...changes.reading];
    guide.updatedAt = "2026-10-24";
  }
}

export const jerusalemAttractionUpdates: Partial<Record<AttractionId, Partial<Attraction>>> = {
  "old-city-jerusalem": {
    title: "Jerusalem Old City: Quarters, Gates, Sights & Walking Routes",
    description: "Visit Jerusalem's Old City: Jewish, Christian, Muslim and Armenian Quarters, the Western Wall, Holy Sepulchre, gates, walking routes and access tips.",
    highlights: [
      { name: "The four quarters: choose your focus", description: "The Jewish, Christian, Muslim and Armenian Quarters each have distinctive places of worship, streets and history. Walking routes do not follow neat dividing lines, and a single visit rarely covers everything in depth.", tip: "Begin with the quarter most relevant to your interests; allow time for the lanes between sights." },
      { name: "Western Wall and the Jewish Quarter", description: "The Western Wall is an active prayer site. Nearby lanes lead to the Cardo, historic synagogues and archaeological remains. Access and visitor conduct may change around prayers and holidays.", tip: "Dung Gate is a useful approach for the Western Wall; use the entry suitable for your mobility and security arrangements." },
      { name: "Holy Sepulchre and the Christian Quarter", description: "The church contains several traditions and places associated with Jesus' crucifixion and resurrection. Services and pilgrims take priority, and some chapels have queues independent of the main church entrance.", tip: "If your focus is churches rather than all four quarters, use the churches of Jerusalem guide for a pilgrimage-oriented route." },
      { name: "Muslim Quarter, Via Dolorosa and markets", description: "The busy streets from Damascus Gate contain shops, religious institutions and the traditional Stations of the Cross route. Temple Mount/Haram al-Sharif access is separately controlled, and cannot be assumed on a general Old City walk.", tip: "Keep market browsing flexible and confirm separately any planned access to religious compounds." },
      { name: "Armenian Quarter, Mount Zion and the city gates", description: "A route from Jaffa Gate through the Armenian Quarter can continue toward Zion Gate and the principal Mount Zion sites outside the walls. Museum admission at the citadel and ramparts access are separate decisions.", tip: "Combine nearby places once, rather than repeatedly retracing the route between gates." },
    ],
    arrival: [
      "Jaffa Gate is a convenient approach for the Tower of David, Christian and Armenian Quarters. Dung Gate commonly works for the Western Wall; Damascus Gate is closer to many Muslim Quarter streets.",
      "Jerusalem–Yitzhak Navon railway station is not an Old City entrance. Continue by local transport to an appropriate gate.",
      "Most lanes are pedestrian-only with slopes, steps and uneven stones. Check the accessible route and the nearest legal vehicle drop-off for your specific site or accommodation.",
    ],
    planning: [
      "Allow half a day for one or two focused areas, or more for multiple quarters and museum or church interiors.",
      "Dress and conduct standards differ at working prayer sites; follow posted instructions, security checks and photography requests.",
      "Do not count on entry to the Temple Mount/Haram al-Sharif without checking current access restrictions and the rules for your visit.",
      "Check worship services, Shabbat, religious holidays and any locally announced closures for the date you intend to visit.",
    ],
    official: [
      { label: "Tower of David Jerusalem Museum", url: "https://www.tod.org.il/en/" },
      { label: "Jerusalem tourism visitor information", url: "https://www.itraveljerusalem.com/en" },
      { label: "Christian Information Center", url: "https://www.cicts.org/" },
    ],
  },
  "museums-in-jerusalem": {
    title: "Best Museums in Jerusalem: What to See & Which to Choose",
    description: "Compare Jerusalem museums: Israel Museum, Yad Vashem, Tower of David, Bible Lands, Rockefeller, Islamic Art, Science Museum and specialist collections.",
    intro: "Jerusalem's museums are too varied for a single ranking. The Israel Museum suits art and archaeology, Yad Vashem requires dedicated time for Holocaust remembrance, and Tower of David connects the city's history to its walls. Choose by subject, location and how much time you can give a visit.",
    takeaway: "For a first museum afternoon, choose one major institution rather than racing between three. Group the Israel Museum, Bible Lands Museum and Science Museum near Givat Ram; pair Tower of David with Jaffa Gate; allow a separate reflective visit to Yad Vashem. Check the institution's own ticket and visitor information.",
    duration: "Two to four hours at a major institution; shorter for selected specialist museums",
    highlights: [
      { name: "Israel Museum", description: "The Shrine of the Book, Second Temple Jerusalem model, archaeology, Jewish Art and Life, fine art and sculpture garden make this an expansive visit.", tip: "Pick a small number of collections rather than expecting to see everything in one visit." },
      { name: "Yad Vashem", description: "The Holocaust History Museum, Hall of Names and memorials form a place of remembrance rather than a general entertainment attraction.", tip: "Check advance reservation requirements, age guidance and accessibility; allow time afterward." },
      { name: "Tower of David Jerusalem Museum", description: "A restored citadel beside Jaffa Gate with galleries on Jerusalem's history, archaeology and viewpoints. Evening experiences and private tours are booked separately.", tip: "Combine it with a manageable Old City route, and confirm which galleries and experiences your ticket includes." },
      { name: "Bible Lands Museum Jerusalem", description: "Civilisations of the ancient Near East, material culture and stories that help place biblical texts in a historical context.", tip: "Close to the Israel Museum; decide if two cultural institutions fit your available energy and time." },
      { name: "Rockefeller Archaeological Museum", description: "Collections of archaeology and regional history in a distinctive building near the Old City's northeastern side.", tip: "Verify public access and current exhibitions before travelling specially." },
      { name: "Museum for Islamic Art", description: "Decorative arts, manuscripts, design and changing exhibitions exploring Islamic civilisation and related collections.", tip: "Check the current programme and separate admission details." },
      { name: "Bloomfield Science Museum", description: "Interactive exhibits suitable for families and visitors interested in science and technology.", tip: "Check the intended age range, workshops and holiday programmes." },
      { name: "Museum of the Underground Prisoners", description: "A museum in a former prison in the Russian Compound examining the British Mandate period and underground movements.", tip: "A focused historical visit; check whether visits require booking." },
      { name: "Menachem Begin Heritage Center", description: "An institution examining Begin's life and modern Israeli history, with exhibitions and events.", tip: "Check tour language and advance reservation arrangements." },
      { name: "Friends of Zion Museum", description: "Multimedia exhibitions on individuals and communities connected to Zionism and Israel.", tip: "Confirm current tour format, language and reservation requirements." },
      { name: "Museum of Tolerance Jerusalem", description: "An institution presenting exhibitions and events on coexistence, dialogue and society.", tip: "Confirm what is currently open to the public; events and general visiting are different." },
      { name: "Time Elevator Jerusalem", description: "A multimedia introduction to Jerusalem's history, distinct from an object-based museum.", tip: "Check current operating status and programme independently before making it part of an itinerary." },
    ],
    official: [
      { label: "The Israel Museum", url: "https://www.imj.org.il/en" },
      { label: "Yad Vashem", url: "https://www.yadvashem.org/" },
      { label: "Tower of David Jerusalem Museum", url: "https://www.tod.org.il/en/" },
      { label: "Bible Lands Museum", url: "https://www.blmj.org/en" },
      { label: "Jerusalem tourism information", url: "https://www.itraveljerusalem.com/en" },
    ],
    faqs: [
      { q: "Which museum should I visit first?", a: "Tower of David suits a short introduction to Jerusalem near Jaffa Gate; the Israel Museum is better for a broad art-and-archaeology afternoon. Yad Vashem is a separate remembrance visit." },
      { q: "Do all Jerusalem museums use one ticket?", a: "No. Each institution manages its own admission, temporary exhibitions, tours and any advance reservation." },
      { q: "Can I visit Yad Vashem and the Old City in the same morning?", a: "They are in different parts of Jerusalem. Give Yad Vashem the time it deserves and leave enough travel and security-screening time." },
    ],
  },
  "mount-of-olives": {
    title: "Mount of Olives Jerusalem: Viewpoints, Churches & Visiting Route",
    description: "Plan Mount of Olives viewpoints, Gethsemane, Dominus Flevit, Pater Noster, Jewish cemetery and a downhill route to the Old City.",
    image: { src: "/images/attractions/mount-of-olives.webp", alt: "Mount of Olives hillside and Jerusalem views" },
    highlights: [
      { name: "Panoramic lookout on the ridge", description: "An elevated view towards the Old City walls and domes is a strong starting point for a first visit. Different viewpoints have different access and vehicle stopping points.", tip: "Arrange an upper-ridge arrival and decide where to finish the downhill walk." },
      { name: "Church of Pater Noster and Ascension traditions", description: "Christian pilgrimage sites around the upper ridge are associated with the Lord's Prayer and the Ascension. Opening and ticket arrangements differ by compound.", tip: "Do not assume a general hilltop stop includes entry to either compound." },
      { name: "Dominus Flevit Church", description: "The church recalls the Gospel tradition of Jesus weeping over Jerusalem and has a view towards the Old City.", tip: "Steep approaches and steps can make this unsuitable for some mobility needs." },
      { name: "Garden of Gethsemane and Church of All Nations", description: "At the lower slope, a garden and basilica form one of the major Christian pilgrimage settings. These are active places of worship.", tip: "Check religious services and visiting windows before arrival." },
      { name: "Jewish cemetery and nearby sacred sites", description: "The historic cemetery reflects centuries of Jewish burial tradition; the hillside also has Christian monasteries and chapels with their own arrangements.", tip: "Respect mourners and avoid treating burial areas as shortcuts or photo backdrops." },
    ],
  },
  "mount-zion": {
    title: "Mount Zion Jerusalem: Last Supper Room, David's Tomb & Churches",
    description: "Explore Mount Zion outside Zion Gate: the Cenacle, traditional David's Tomb, Dormition Abbey and St Peter in Gallicantu with practical visiting tips.",
    highlights: [
      { name: "The Cenacle (traditional Last Supper Room)", description: "An upper chamber of the historic building is traditionally linked to the Last Supper, with medieval and later architectural layers.", tip: "Verify access separately; the space's historical association should not be confused with proof of the original room." },
      { name: "David's Tomb", description: "A traditional tomb site below the Cenacle, used as a place of Jewish prayer. Its identification is religious tradition rather than a definitive archaeological conclusion.", tip: "Observe clothing and prayer-space requirements and avoid intrusive photography." },
      { name: "Dormition Abbey", description: "A striking Benedictine church associated with Christian tradition about the Dormition of Mary, with a church and crypt.", tip: "Current church and crypt access should be checked with the institution." },
      { name: "St Peter in Gallicantu", description: "A church on the eastern slope connected by tradition with Peter's denial of Jesus. It has separate visitor arrangements and a steep approach.", tip: "Allow time for steps and views; do not presume it is part of a Cenacle visit." },
      { name: "Zion Gate and the Armenian Quarter", description: "Mount Zion's position beside Zion Gate makes it a natural extension of an Old City walk through the Armenian Quarter.", tip: "A route via the gate is generally more efficient than returning to Jaffa Gate between stops." },
    ],
  },
};
