import type { TravelGuide, GuideSection } from "@/data/travelGuides";
import type { TravelGuideId } from "@/data/travel-guide-paths";
import { travelGuidePaths } from "@/data/travel-guide-paths";

/**
 * 2026 Jerusalem editorial refresh.  Supplements the existing material rather
 * than replacing historically useful guide sections or changing URLs.
 * Earlier editions of the guides were reviewed for subjects lost in the migration.
 * Dynamic fares, hours, admissions, site closures and live tour inventory are
 * never sourced from old articles.
 */
type Upgrade = {
  sections?: GuideSection[];
  related?: TravelGuideId[];
  services?: TravelGuide["services"];
  reading?: TravelGuide["reading"];
};
const articles: Partial<Record<TravelGuideId, Upgrade>> = {
  jerusalem: {
    sections: [
      {
        id: "jerusalem-route-one-day",
        title: "If you only have one day in Jerusalem",
        paragraphs: [
          "Begin at Jaffa Gate, where the Tower of David stands close to the Old City entrance. Follow a manageable route through one or two quarters, allowing enough time for the Western Wall or the Church of the Holy Sepulchre rather than expecting to see every site. Choose the gate and route that suit your mobility and interests.",
          "The Old City walking guide explains which gates serve which areas and where stairways make shortcuts less practical. If you prefer a guided introduction, compare the departure city, guiding language, exact sites and walking requirements on the Jerusalem tours page. A private car takes you between road-accessible stops; it cannot drive through most historic lanes.",
        ],
        inlineLinks: [
          { text: "Old City walking guide", to: "/attractions/old-city-jerusalem/" },
          { text: "Jerusalem tours", to: "/tours/jerusalem/" },
        ],
      },
      {
        id: "jerusalem-route-two-days",
        title: "A slower two- or three-day route",
        paragraphs: [
          "On the second day, choose the Mount of Olives if viewpoints and Christian pilgrimage sites are a priority, or the Israel Museum and Yad Vashem if museums and history are central to the trip. These locations are not one short, level walking loop; add a taxi or public-transport leg as needed.",
          "For another afternoon, browse Mahane Yehuda and the downtown streets. Combine Mamilla with a Jaffa Gate visit, or visit the German Colony on a quieter evening. My shopping guide separates food markets, Old City crafts and modern shopping streets, so you can choose a stop that actually fits your interests.",
          "Staying overnight near the Old City has a different arrival and luggage experience from staying near Jaffa Road or Mahane Yehuda. The neighborhood-by-neighborhood hotel guide explains these trade-offs and includes links to the relevant accommodation areas.",
        ],
        inlineLinks: [
          { text: "Mount of Olives", to: "/attractions/mount-of-olives/" },
          { text: "shopping guide", to: travelGuidePaths.jerusalemShopping },
          { text: "neighborhood-by-neighborhood hotel guide", to: "/travel-blog/where-to-stay-in-jerusalem/" },
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
          { text: "Ben Gurion Airport to Jerusalem guide", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
          { text: "airport transfer service", to: "/airport-transfers/jerusalem/" },
          { text: "Jewish holidays", to: "/travel-blog/calendar-of-events/" },
        ],
      },
    ],
    related: ["jerusalemChurches", "jerusalemShopping", "jerusalemDeadSea", "bethlehem"],
    services: [
      { label: "Jerusalem walking and guided tours", to: "/tours/jerusalem/", note: "Check the advertised starting city and guiding inclusions" },
      { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/", note: "Neighborhood and hotel advice" },
      { label: "Airport to Jerusalem: all transport options", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
      { label: "Airport to Jerusalem: request a private transfer", to: "/airport-transfers/jerusalem/" },
    ],
  },
  jerusalemChurches: {
    sections: [
      {
        id: "more-old-city-churches",
        title: "Other churches and chapels worth considering inside the Old City",
        paragraphs: [
          "Beyond the Church of the Holy Sepulchre and the Via Dolorosa, St Anne's near the Pools of Bethesda offers Crusader architecture and a very different atmosphere. The Lutheran Church of the Redeemer has a bell tower and historic church space; visits to each part can have different conditions. Along the Via Dolorosa, the Flagellation complex and smaller chapels follow their own worship schedules.",
          "The Armenian Cathedral of St James is an important part of the Armenian Quarter's religious life, not a walk-in museum. Entry can be restricted to specific worship periods. If you are visiting primarily for the four quarters and gates rather than a pilgrimage, start with the Old City guide and choose the churches that fit your walking route.",
        ],
        inlineLinks: [{ text: "Old City guide", to: "/attractions/old-city-jerusalem/" }],
      },
      {
        id: "christian-tradition-context",
        title: "Understand tradition, history and site access",
        photo: { src: "/images/jerusalem/church-of-all-nations.webp", alt: "Church of All Nations by Gethsemane on the Mount of Olives" },
        paragraphs: [
          "A church's association with a biblical event is a matter of religious tradition and sometimes differs from what archaeology can establish. State this distinction when comparing sites: the Cenacle, Dormition Abbey and St Peter in Gallicantu tell related but separate stories on Mount Zion. The Mount Zion guide explains the short walk between them and the visitor limitations.",
          "On the Mount of Olives, the Church of All Nations and Garden of Gethsemane lie near the foot of the hill, while Dominus Flevit, Pater Noster and the Church of the Ascension require more climbing. Use the Mount of Olives guide for access, downhill route planning and suitable vehicle pickup points. Ein Karem, with the Church of the Visitation and St John the Baptist, is a separate neighborhood journey.",
        ],
        inlineLinks: [
          { text: "Mount Zion guide", to: "/attractions/mount-zion/" },
          { text: "Mount of Olives guide", to: "/attractions/mount-of-olives/" },
        ],
      },
      {
        id: "church-tour-options",
        title: "Self-guided, guided or private transport?",
        paragraphs: [
          "You can explore the Old City's churches on your own, allowing time to find your way and wait in queues. A licensed guide can explain the different Christian traditions and tailor the walk to your interests. Before booking a tour, check which churches you can enter and whether a licensed guide is included.",
          "My Jerusalem tours directory includes guided tours from different operators. My private-driver service provides transport, with guiding arranged separately. If you're planning a Jerusalem outing from Ashdod, allow time to leave the ship and return before departure.",
        ],
        inlineLinks: [
          { text: "Jerusalem tours", to: "/tours/jerusalem/" },
          { text: "private-driver service", to: "/private-driver-in-israel/" },
          { text: "Jerusalem outing from Ashdod", to: "/shore-excursions/ashdod/" },
        ],
      },
    ],
    related: ["jerusalem", "bethlehem"],
  },
  jerusalemShopping: {
    related: ["jerusalem", "food", "calendar"],
    services: [
      { label: "Food and market tours", to: "/tours/food-market-tours/" },
      { label: "Explore the Old City", to: "/attractions/old-city-jerusalem/" },
      { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { label: "German Colony and Baka hotels", to: "/accommodation/jerusalem/german-colony-baka/" },
    ],
  },


};

export function applyJerusalemGuideEditorial(guides: Record<TravelGuideId, TravelGuide>) {
  for (const id of Object.keys(articles) as TravelGuideId[]) {
    const changes = articles[id];
    if (!changes) continue;
    const guide = guides[id];
    if (!guide) throw new Error("Jerusalem editorial guide missing: " + id);
    if (changes.sections) {
      guide.sections = [...guide.sections, ...changes.sections.filter(section => !guide.sections.some(existing => existing.id === section.id))];
    }
    if (changes.related) guide.related = [...new Set([...guide.related, ...changes.related])].filter(other => other !== id);
    if (changes.services) guide.services = [...changes.services, ...guide.services.filter(service => !changes.services?.some(added => added.to === service.to))];
    if (changes.reading) guide.reading = [...(guide.reading || []), ...changes.reading];
    if (id === "jerusalemChurches") {
      const einKarem = guide.sections.find(section => section.id === "ein-karem");
      if (einKarem && !einKarem.photo) einKarem.photo = { src: "/images/jerusalem/church-of-visitation.webp", alt: "Church of the Visitation in the hillside Ein Karem neighborhood" };
    }
    guide.updatedAt = id === "jerusalemShopping" ? "2026-11-20" : id === "jerusalemChurches" || id === "jerusalem" ? "2026-11-21" : "2026-10-24";
  }
}
