import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CarFront, MapPinned, Ticket, TrainFront } from "lucide-react";
import { AttractionDestinationPage, AttractionHighlight, type AttractionDestinationContent } from "@/components/AttractionDestinationPage";
import capernaumPhoto from "@/assets/guides/capernaum.jpg";

const visitSources = {
  franciscan: "https://www.cicts.org/our-services/",
  archaeology: "https://www.custodia.org/en/sanctuaries/capernaum/",
  orthodox: "https://capernaum.info/opening-hours-and-contacts/",
  park: "https://en.parks.org.il/reserve-park/kfar-nahum-capernaum-national-park/",
};

const page: AttractionDestinationContent = {
  path: "/attractions/capernaum/",
  placeName: "Capernaum",
  title: "Capernaum (Kfar Nahum): Visitor Guide",
  region: "Sea of Galilee",
  updatedAt: "2026-11-15",
  hero: {
    src: capernaumPhoto,
    alt: "Basalt village remains and part of the ancient limestone synagogue at Capernaum, beside the Sea of Galilee",
  },
  intro: "On the northwestern shore of the Sea of Galilee, Capernaum preserves the remains of a Jewish village closely associated with Jesus' ministry. Explore its monumental synagogue, the site traditionally identified as Peter's house, and the lakeside setting—while planning around several separately managed visitor areas.",
  facts: [
    { label: "Location", value: "Northwestern Sea of Galilee", note: "Near Route 87, east of Route 90" },
    { label: "Suggested visit", value: "60–90 minutes", note: "For the Franciscan archaeological site" },
    { label: "Admission", value: "₪10", note: "Published fee at the Franciscan site" },
    { label: "Published hours", value: "08:00–12:00 / 14:00–17:00", note: "Last entry 11:40 / 16:30" },
    { label: "Main sights", value: "Synagogue & Peter's house", note: "Within the Franciscan site" },
    { label: "Other areas", value: "Separate access", note: "Orthodox monastery and national park" },
  ],
  glanceNote: <>The archaeological site, Greek Orthodox monastery and national park visitor area have <strong>different operators, entrances and visiting rules</strong>. Hours and the ₪10 fee above apply to the Franciscan site only. Check holiday exceptions before travelling.</>,
  highlightContent: (
    <div className="mt-5 space-y-4">
      <AttractionHighlight
        title="The ancient synagogue"
        image={{
          src: "/images/attractions/capernaum-synagogue.webp",
          alt: "Visitors beside the white limestone walls and columns of Capernaum's ancient synagogue",
        }}
        note="The imposing limestone synagogue visible today is generally dated to the fifth century, not the time of Jesus."
      >
        <p>The white limestone façade, columns and carved stonework contrast with the darker basalt used in the surrounding village. This is the best-known archaeological landmark at Capernaum, and the surviving architecture gives a vivid impression of a substantial late-antique synagogue.</p>
        <p>Excavations revealed earlier structures beneath it. Those remains are important when considering the New Testament references to teaching in a synagogue at Capernaum, but the building standing above ground should not be described as the actual first-century structure.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The site traditionally identified as Peter's house"
        image={{
          src: "/images/attractions/capernaum-peters-house.webp",
          alt: "Excavated basalt rooms below the elevated modern church marking the traditional site of Peter's house",
        }}
        note="The identification with Peter's home comes from Christian tradition and archaeological interpretation; it cannot be established as a personal address with certainty."
      >
        <p>Close to the synagogue, excavated domestic rooms are associated by Christian tradition with the house of the apostle Peter. Archaeologists identified changes in the use of the complex over time, including phases of Christian veneration and a later Byzantine octagonal church.</p>
        <p>A striking modern memorial church, inaugurated in 1990, stands above the excavated area. The architecture allows visitors to look towards the earlier remains without walking on the most sensitive archaeological layers.</p>
      </AttractionHighlight>
      <AttractionHighlight title="The basalt houses of the ancient village">
        <p>The low stone foundations between the main monuments are easy to overlook. They reveal a residential settlement of rooms and courtyards built with local basalt, a useful contrast with the more elaborate limestone synagogue.</p>
        <p>Give these remains a few minutes rather than rushing between the religious landmarks. They help explain the everyday setting of the village and the people who lived beside the lake.</p>
      </AttractionHighlight>
      <AttractionHighlight title="The Greek Orthodox Monastery of the Twelve Apostles" note="This is a separate religious compound. Its official website asks visitors to arrange entry by phone in advance.">
        <p>Nearby, the Greek Orthodox monastery is known for its distinctive red-domed church, dedicated to the Holy Apostles Peter and Paul. It offers a different architectural and devotional experience from the Franciscan archaeological compound.</p>
        <p>Do not assume that admission to the archaeological site gives access to the monastery, or that the monastery is open whenever the ruins are open. Arrange your visit directly with the monastery if this stop matters to your itinerary.</p>
      </AttractionHighlight>
      <AttractionHighlight title="The national park visitor area and lakeshore">
        <p>The Israel Nature and Parks Authority manages a separate national park area and lakeside visitor terminal. It includes a waterfront setting and information about Capernaum, but it is <strong>not</strong> the same entrance as the Franciscan ruins.</p>
        <p>The park authority says the marine-terminal entrance is free of charge without advance booking. The park's own opening times and rules apply there, and entering the lake is prohibited in the national park.</p>
      </AttractionHighlight>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-5">
      <div>
        <h3 className="font-serif text-xl font-semibold">From a lakeside village to a pilgrimage site</h3>
        <p className="mt-2 leading-relaxed">Kfar Nahum means “village of Nahum” in Hebrew. The settlement developed on the northern shore of the Sea of Galilee and is remembered as a Jewish community during the Roman period. Its surviving walls and courtyards speak to ordinary village life, while the synagogue demonstrates the area's later religious and architectural development.</p>
        <p className="mt-3 leading-relaxed">The New Testament repeatedly places Jesus in Capernaum. The town is associated with his teaching and healing ministry, including accounts of activity in a synagogue and at Peter's home (for example, Mark 1:21–31). These texts explain the site's importance to Christian pilgrims; archaeology and religious tradition should nevertheless be distinguished when identifying particular buildings.</p>
      </div>
      <div className="grid gap-4 rounded-xl border bg-secondary/20 p-4 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] sm:items-start sm:p-5">
        <div>
          <h3 className="font-serif text-xl font-semibold">What the excavations tell us</h3>
          <p className="mt-2 leading-relaxed">The monumental white synagogue is generally assigned to the fifth century, with evidence of earlier buildings beneath it. Excavation around the traditional House of Peter revealed successive phases of adaptation and worship, including a Byzantine church built over the earlier room.</p>
          <p className="mt-3 leading-relaxed">The photograph alongside this section shows visitors looking down into the preserved remains from inside the modern memorial—one way the site communicates those layers of history.</p>
        </div>
        <img src="/images/attractions/capernaum-peter-memorial-interior.webp" alt="Visitors viewing the preserved archaeological remains through the floor of the modern Peter memorial church in Capernaum" width={640} height={480} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-lg object-cover" />
      </div>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-5">
      <p>The main reason to check details carefully is that <strong>“Capernaum” refers to more than one visitor entrance</strong>. Use the operator of the exact site you plan to enter—not a generic opening-hours listing for the whole area.</p>
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm" data-testid="capernaum-visitor-table">
          <thead className="bg-secondary/70">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold">Site</th>
              <th scope="col" className="px-4 py-3 font-bold">Admission and visiting rules</th>
              <th scope="col" className="px-4 py-3 font-bold">Official information</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <th scope="row" className="px-4 py-3 align-top font-semibold">Franciscan archaeological compound</th>
              <td className="px-4 py-3 align-top">Published entrance fee: <strong>₪10</strong>. Hours: <strong>08:00–12:00</strong> (last entry 11:40) and <strong>14:00–17:00</strong> (last entry 16:30). Holiday exceptions and closures apply.</td>
              <td className="px-4 py-3 align-top"><a href={visitSources.franciscan} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">Christian Information Center</a></td>
            </tr>
            <tr>
              <th scope="row" className="px-4 py-3 align-top font-semibold">Greek Orthodox monastery</th>
              <td className="px-4 py-3 align-top">Visit <strong>by prior phone arrangement</strong> with the superior. Confirm timing and any other conditions directly.</td>
              <td className="px-4 py-3 align-top"><a href={visitSources.orthodox} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">Monastery visitor information</a></td>
            </tr>
            <tr>
              <th scope="row" className="px-4 py-3 align-top font-semibold">National park / marine terminal</th>
              <td className="px-4 py-3 align-top">The <strong>marine-terminal entrance</strong> is listed as free without prior booking. The national park has separate, seasonally variable opening hours.</td>
              <td className="px-4 py-3 align-top"><a href={visitSources.park} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">Israel Nature and Parks Authority</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground"><strong>Holiday exception:</strong> The Christian Information Center lists closures of the Franciscan site on Christmas Day, New Year's Day, Easter Sunday and Yom Kippur, as well as shorter hours on some other Christian holiday dates. Always recheck its current listing.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold">Clothing, weather and walking</h3>
          <p className="mt-2 text-sm leading-relaxed">Dress respectfully near churches and sacred spaces. Wear comfortable shoes for uneven stone surfaces and take drinking water, a hat and sun protection. Exposed ruins can be hot in summer.</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold">Parking and accessibility</h3>
          <p className="mt-2 text-sm leading-relaxed">Choose the correct entrance before setting out. The park authority describes accessible paths and facilities at its own visitor area, but this does not guarantee the same accessibility inside either church-managed compound. Contact the relevant operator for specific mobility needs.</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed"><strong>For the Greek Orthodox monastery:</strong> Its official page gives <a href="tel:+972532840991" className="font-semibold text-primary underline underline-offset-4">+972 53 284 0991</a> for arranging a visit. The listed contact is for the monastery, not for the Franciscan site.</p>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>Capernaum lies on the northern shore of the Sea of Galilee, east of the Capernaum (Kfar Nahum) junction on Route 90. The park authority directs drivers east along <strong>Route 87 for about 4 km</strong> from the junction. There are several nearby compounds, so navigate to the exact entrance you intend to visit.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By car or private driver</h3></div>
          <p className="mt-2 text-sm leading-relaxed">Approach via Route 90 and turn onto Route 87, or use the eastern approach via Route 92 where appropriate. A vehicle is convenient if you want to include Tabgha and the Mount of Beatitudes on the same outing. Set your destination to the Franciscan archaeological site, monastery or national park entrance—not simply “Kfar Nahum.”</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><TrainFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By public transport</h3></div>
          <p className="mt-2 text-sm leading-relaxed">Bus options around the northern lake can be limited and may involve a long walk. <strong>Kfar Nahum Junction is not beside the archaeological entrance:</strong> the road distance east to the Capernaum site is about 4 km. Check the actual stop, pedestrian route and return service before relying on a bus; do not assume a short walk from the junction.</p>
        </article>
      </div>
      <p className="text-sm leading-relaxed">Tiberias is a practical starting point for exploring the northwestern shore. Longer journeys from Tel Aviv or Jerusalem usually require setting aside a substantial part of the day for driving as well as sightseeing. For other transport options, read my <Link to="/travel-blog/sea-of-galilee/" className="font-semibold text-primary underline underline-offset-4">Sea of Galilee visitor guide</Link>.</p>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">Option 1: Capernaum only · 60–90 minutes</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>Begin at the white limestone synagogue and take time to examine its columns and carved details.</li>
          <li>Continue to the traditional House of Peter and look towards the excavated rooms beneath the modern memorial.</li>
          <li>Walk among the remaining basalt village foundations, then allow a few minutes to enjoy the lakeside setting.</li>
        </ol>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">Option 2: A half-day around the northern lake</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>Visit the Franciscan archaeological compound at Capernaum.</li>
          <li>Continue to <Link to="/attractions/tabgha/" className="font-semibold text-primary underline underline-offset-4">Tabgha</Link> for its lakeside churches and mosaics.</li>
          <li>Include the <Link to="/attractions/mount-of-beatitudes/" className="font-semibold text-primary underline underline-offset-4">Mount of Beatitudes</Link> for its church and views across the Sea of Galilee.</li>
        </ol>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">An Orthodox monastery visit can be added only if arranged in advance. Allow time for the drives between entrances, opening hours and any services taking place; this is a suggested sequence, not a fixed timetable.</p>
      </div>
      <p><strong>Prefer to walk?</strong> The park authority describes a roughly 3.5 km lakeside promenade connecting the Capernaum visitor area with Tabgha. Check the condition of the path, heat and access before choosing it over transport; walking between all religious sites is not necessarily the simplest option.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Many Nazareth and Sea of Galilee day tours advertise a stop in Capernaum, sometimes paired with Tabgha, the Mount of Beatitudes or Yardenit. Stops, guided time, departure cities and entrance fees vary: <strong>do not assume every Galilee tour includes Capernaum</strong> just because it visits the lake.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/nazareth-sea-of-galilee/" className="group flex flex-col justify-between rounded-xl border bg-card p-5 transition-colors hover:border-primary/60 focus-visible:outline-2 focus-visible:outline-primary">
          <div>
            <div className="flex items-center gap-2"><MapPinned className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-serif text-lg font-semibold">Compare guided Galilee tours</h3></div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Browse tour options and check the actual stop list, departure point, duration, admission and current booking price with each provider.</p>
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
        </Link>
        <Link to="/private-driver/" className="group flex flex-col justify-between rounded-xl border bg-card p-5 transition-colors hover:border-primary/60 focus-visible:outline-2 focus-visible:outline-primary">
          <div>
            <div className="flex items-center gap-2"><Ticket className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-serif text-lg font-semibold">Arrange a private driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">I can arrange a vehicle and agree the pickup, stops and return plan with you. Licensed guiding and site admission are separate from a driver-only transport quote.</p>
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Private driver options <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
        </Link>
      </div>
    </div>
  ),
  faqs: [
    { q: "Are Capernaum and Kfar Nahum the same place?", a: "Yes. Kfar Nahum is the Hebrew name of Capernaum, the ancient lakeside settlement on the Sea of Galilee. Different nearby visitor areas still have separate entrances." },
    { q: "Is Capernaum free to visit?", a: "Not all of it. The Franciscan archaeological compound publishes a ₪10 entrance fee. The Israel Nature and Parks Authority says entrance to its marine-terminal visitor area is free without prior booking. The Greek Orthodox monastery has separate visiting arrangements." },
    { q: "Is the ancient synagogue from Jesus' lifetime?", a: "The imposing white limestone synagogue standing today is generally dated to the fifth century. Excavations revealed earlier remains beneath it, but visitors should not confuse the visible building with the synagogue described in first-century Gospel accounts." },
    { q: "Can I visit the Greek Orthodox monastery without arranging it?", a: "The monastery's official information asks visitors to arrange a visit by phone with the superior. It is not covered by the Franciscan archaeological entrance." },
    { q: "How much time should I allow?", a: "About 60–90 minutes is a sensible starting point for the main Franciscan archaeological site. Allow additional time if you also want the separate Orthodox monastery, national park area or nearby churches." },
    { q: "Can I walk to Capernaum from the Kfar Nahum Junction bus stop?", a: "Do not assume it is a short walk. The park authority places Capernaum about 4 km along Route 87 from the junction. Check the exact bus stop, footpath and return departure before deciding to rely on public transport." },
    { q: "Is Capernaum open on religious holidays?", a: "Not necessarily. The Christian Information Center publishes specific closures and shortened hours for the Franciscan site on certain Christian and Jewish dates. The Orthodox monastery and national park have their own arrangements, so verify each entrance separately." },
    { q: "Is the visit accessible for someone with limited mobility?", a: "Conditions differ among the ruins, religious compounds and national park facilities. The park authority describes accessible paths at its visitor area, but that does not establish accessibility throughout the archaeological ruins. Contact the operator of the specific entrance about step-free access and surfaces." },
  ],
  nearby: [
    { label: "Tabgha", to: "/attractions/tabgha/", note: "Lakeside churches, the multiplication mosaic and the Primacy of Peter tradition." },
    { label: "Mount of Beatitudes", to: "/attractions/mount-of-beatitudes/", note: "A hilltop sanctuary and views across the northern Sea of Galilee." },
    { label: "Magdala", to: "/attractions/magdala/", note: "Archaeology and pilgrimage on the western shore of the lake." },
    { label: "Yardenit", to: "/attractions/yardenit/", note: "A separate Jordan River baptism site farther south, near the lake's outlet." },
  ],
  sources: [
    { label: "Christian Information Center — Capernaum entrance and opening hours", url: visitSources.franciscan, note: "Franciscan compound: published entrance fee, last-admission times and holiday exceptions." },
    { label: "Custody of the Holy Land — Capernaum archaeology and history", url: visitSources.archaeology, note: "Historical background, excavation history, synagogue dating and traditional Peter's house." },
    { label: "Greek Orthodox Monastery of the Twelve Apostles — visitor arrangements", url: visitSources.orthodox, note: "Official advance-contact requirement and monastery details." },
    { label: "Israel Nature and Parks Authority — Kfar Nahum National Park", url: visitSources.park, note: "Separate visitor area, marine terminal, accessibility information, navigation and park rules." },
  ],
};

export function CapernaumAttractionPage() {
  return <AttractionDestinationPage content={page} />;
}

export { page as capernaumDestinationContent };
