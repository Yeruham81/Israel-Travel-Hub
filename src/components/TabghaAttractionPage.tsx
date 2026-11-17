import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront } from "lucide-react";
import {
  AttractionContentImage, AttractionDestinationPage, AttractionHighlight,
  AttractionPracticalTip, type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { tabghaSite } from "@/data/tabghaSite";
import galileePhoto from "@/assets/home/hero-galilee-sm.webp";

const tabghaMapEmbed = "https://maps.google.com/maps?q=Tabgha%2C%20Sea%20of%20Galilee%2C%20Israel&hl=en&z=12&t=m&output=embed";
const tabghaMapLarger = "https://www.google.com/maps/search/?api=1&query=Tabgha%2C%20Israel&hl=en";
const multiplicationDirections = "https://www.google.com/maps/dir/?api=1&destination=Church%20of%20the%20Multiplication%2C%20Tabgha%2C%20Israel&travelmode=driving";
const primacyDirections = "https://www.google.com/maps/dir/?api=1&destination=Church%20of%20the%20Primacy%20of%20Peter%2C%20Tabgha%2C%20Israel&travelmode=driving";

const visitorAreas = [
  {
    name: "Church of the Multiplication",
    details: <>
      <p><strong>Monday–Saturday:</strong> {tabghaSite.multiplication.hours} (last entry {tabghaSite.multiplication.lastEntry}). <strong>Sunday:</strong> no regular sightseeing visits; the church is accessible to Mass participants only.</p>
      <p className="mt-1">The Benedictine church with the loaves-and-fishes mosaic. Individual visits are generally possible during visitor hours.</p>
    </>,
    phone: tabghaSite.multiplication.phone,
    phoneHref: tabghaSite.multiplication.phoneHref,
    source: "Official Benedictine hours",
    sourceUrl: tabghaSite.sources.multiplicationHours,
  },
  {
    name: "Church of the Primacy of Peter",
    details: <>
      <p><strong>Daily:</strong> {tabghaSite.primacy.hours}; last entry {tabghaSite.primacy.lastEntry}.</p>
      <p className="mt-1">Closed on Christmas Day, New Year's Day and Yom Kippur. On 24 and 31 December and Holy Week Thursday–Saturday, visits are 08:00–12:00 (last entry 11:40).</p>
    </>,
    phone: tabghaSite.primacy.phone,
    phoneHref: tabghaSite.primacy.phoneHref,
    source: "Primacy visitor hours (CIC)",
    sourceUrl: tabghaSite.sources.primacyHours,
  },
] as const;

const phoneLinkClass = "inline-block whitespace-nowrap font-semibold text-primary underline underline-offset-4";

export const tabghaDestinationContent: AttractionDestinationContent = {
  path: "/attractions/tabgha/",
  placeName: "Tabgha",
  title: tabghaSite.title,
  region: tabghaSite.region,
  updatedAt: tabghaSite.updatedAt,
  hero: tabghaSite.hero,
  intro: tabghaSite.intro,
  historyTitle: "Tabgha's history and Gospel traditions",
  relatedTitle: "Explore more around the Sea of Galilee",
  contactIntroduction: "Tell me when you’re visiting, where you’ll be starting from and which Galilee sites you’d love to see. I’ll be happy to help put together a private day trip for you.",
  facts: [
    { icon: "location", label: "Location", value: "Northwest Sea of Galilee", note: "Along Route 87, near Capernaum" },
    { icon: "duration", label: "Time needed", value: "About 1 hour", note: "For both churches at a relaxed pace" },
    { icon: "admission", label: "Admission", value: "No published fee", note: "For either church" },
    { icon: "hours", label: "Multiplication church", value: tabghaSite.multiplication.hours, note: "Monday–Saturday; Sunday worship only" },
    { icon: "hours", label: "Primacy church", value: tabghaSite.primacy.hours, note: "Daily; last entry " + tabghaSite.primacy.lastEntry },
    { icon: "access", label: "Getting there", value: "Car or organised tour", note: "Plan each church entrance" },
  ],
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight
        title="Church of the Multiplication of the Loaves and Fishes"
        image={{ src: "/images/attractions/tabgha-multiplication-church.webp", alt: "Stone exterior of the Church of the Multiplication at Tabgha, with palm trees in the courtyard" }}
      >
        <p>This peaceful Benedictine church commemorates the feeding of the five thousand. Its simple stone interior shelters remarkable Byzantine mosaics, while the courtyard provides a pleasant introduction to the site.</p>
        <p>I recommend making this your first stop if you are visiting both churches, as it closes earlier in the afternoon.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The loaves-and-fishes mosaic"
        image={{ src: "/images/attractions/tabgha-loaves-fishes-mosaic.webp", alt: "Ancient mosaic showing a bread basket between two fish near the altar of the Church of the Multiplication" }}
      >
        <p>Look down in front of the altar for the famous mosaic of two fish and a basket of bread. The basket contains four loaves, a detail that often catches visitors' attention.</p>
        <p>Take time to look at the surrounding floor as well: birds, plants and other nature motifs are among the church's most beautiful surviving mosaics.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="Church of the Primacy of Peter"
        image={{ src: "/images/attractions/tabgha-primacy-chapel.webp", alt: "Small dark-basalt Church of the Primacy of Peter at Tabgha beside the Sea of Galilee" }}
      >
        <p>A short distance away, this small Franciscan chapel stands beside the lake. It recalls the Gospel account of the risen Jesus sharing a meal with his disciples and speaking to Peter (John 21).</p>
        <p>Inside is the rock known as <em>Mensa Christi</em>, or “Table of Christ”. The lakeside setting makes this a lovely place to spend a few quiet moments.</p>
      </AttractionHighlight>
      <AttractionHighlight title="The gardens and shoreline">
        <p>Between the old stones, gardens and water's edge, Tabgha offers a gentler pace than many larger sightseeing stops. Enjoy the lake views and give people attending services or praying their space.</p>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>The two churches have their own entrances and visiting hours. These are the details I would use to plan a visit to both.</p>
      <div className="grid gap-3 md:hidden" data-testid="tabgha-mobile-hours">
        {visitorAreas.map(site => <article key={site.name} className="rounded-xl border bg-card p-4">
          <h3 className="text-base font-semibold">{site.name}</h3>
          <div className="mt-2 text-sm leading-relaxed">{site.details}</div>
          <div className="mt-3 text-sm">
            <span className="font-semibold">Phone: </span>
            <a href={"tel:" + site.phoneHref} dir="ltr" className={phoneLinkClass}>{site.phone}</a>
          </div>
          <a href={site.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">{site.source}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </article>)}
      </div>
      <div className="hidden overflow-x-auto rounded-xl border md:block">
        <table className="w-full border-collapse text-left text-sm" data-testid="tabgha-visitor-table">
          <thead className="bg-secondary/70"><tr>
            <th scope="col" className="w-[27%] px-4 py-3 font-bold">Church</th>
            <th scope="col" className="px-4 py-3 font-bold">Opening hours and visitor details</th>
            <th scope="col" className="w-[22%] px-4 py-3 font-bold">Contact</th>
          </tr></thead>
          <tbody className="divide-y">
            {visitorAreas.map(site => <tr key={site.name}>
              <th scope="row" className="px-4 py-3 align-top font-semibold">{site.name}</th>
              <td className="px-4 py-3 align-top leading-relaxed">{site.details}</td>
              <td className="px-4 py-3 align-top">
                <a href={"tel:" + site.phoneHref} dir="ltr" className={phoneLinkClass}>{site.phone}</a>
                <a href={site.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-xs font-semibold text-primary hover:underline">{site.source}</a>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <AttractionPracticalTip>
        <strong>Start with the Church of the Multiplication.</strong> Its last visitor admission is at 14:45; afterwards, continue to the Primacy chapel beside the lake. On Sundays, the Primacy chapel is the better choice for a sightseeing visit.
      </AttractionPracticalTip>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="tabgha-visitor-essentials">
        <h3 className="font-serif text-xl font-semibold">Useful things to know before visiting</h3>
        <ul className="mt-3 grid gap-x-6 gap-y-2 pl-5 text-sm leading-relaxed sm:grid-cols-2 sm:text-base list-disc">
          <li><strong>Entry:</strong> Neither church currently publishes an admission fee. Check with the church if you are arranging a special group visit.</li>
          <li><strong>Dress:</strong> Both are working places of worship. Cover shoulders and knees and be considerate during services.</li>
          <li><strong>Walking:</strong> The Primacy chapel leads towards uneven lakeshore rocks. Wear comfortable shoes and check accessibility needs with the church.</li>
          <li><strong>Facilities:</strong> Parking is available in the area. The Benedictine community also has a small monastery shop, normally open Monday–Saturday.</li>
        </ul>
      </div>
      <AttractionPracticalTip>
        <strong>Keep some time for the lake.</strong> After seeing the mosaic and the Primacy chapel, enjoy a quiet moment by the water before heading to Capernaum or the Mount of Beatitudes.
      </AttractionPracticalTip>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>Tabgha lies beside <strong>Route 87</strong> on the northwestern shore of the Sea of Galilee, close to <Link to="/attractions/capernaum/" className="font-semibold text-primary underline underline-offset-4">Capernaum</Link> and below the <Link to="/attractions/mount-of-beatitudes/" className="font-semibold text-primary underline underline-offset-4">Mount of Beatitudes</Link>.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By car or with a driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">From Tiberias, follow the lake's western side towards Route 87 and Tabgha. The two churches are close together but have separate entrances. Check the correct destination before driving.</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <a href={multiplicationDirections} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">Multiplication church directions</a>
              <a href={primacyDirections} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">Primacy chapel directions</a>
            </div>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By public transport</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Buses travel along Route 90 near Tabgha, but you will need to check the walking route from your stop to each church. Use the <a href="https://bus.gov.il/en/Geographic-Area" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">official public transport planner</a> for connections from Tiberias or elsewhere. A car or organised tour makes it easier to visit several Galilee sites in one day.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="tabgha-location-map">
          <h3 className="text-sm font-semibold">Where is Tabgha?</h3>
          <iframe title="Map of Tabgha on the northwestern shore of the Sea of Galilee" src={tabghaMapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56" />
          <a href={tabghaMapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">View larger map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">A short visit: about one hour</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>Start at the <strong>Church of the Multiplication</strong> to see the mosaic and surrounding Byzantine floor.</li>
          <li>Continue to the <strong>Church of the Primacy of Peter</strong> and its lakeside setting.</li>
          <li>Enjoy a little time by the water before continuing your journey.</li>
        </ul>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">A full-day Galilee and Sea of Galilee trip</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">You can plan a day trip from <strong>Tel Aviv</strong> or <strong>Jerusalem</strong>, or a shore excursion from <strong>Haifa Port</strong>. I recommend choosing three to five stops, including Tabgha, to match your available time.</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li><strong>Near Tabgha:</strong> <Link to="/attractions/capernaum/" className="font-semibold text-primary underline underline-offset-4">Capernaum</Link> and the <Link to="/attractions/mount-of-beatitudes/" className="font-semibold text-primary underline underline-offset-4">Mount of Beatitudes</Link>.</li>
          <li><strong>Along the lake:</strong> <Link to="/attractions/magdala/" className="font-semibold text-primary underline underline-offset-4">Magdala</Link>, <Link to="/travel-blog/sea-of-galilee/" className="font-semibold text-primary underline underline-offset-4">Tiberias and the Sea of Galilee</Link>, or <Link to="/attractions/yardenit/" className="font-semibold text-primary underline underline-offset-4">Yardenit</Link>.</li>
          <li><strong>Wider Galilee:</strong> <Link to="/attractions/basilica-of-the-annunciation/" className="font-semibold text-primary underline underline-offset-4">Nazareth's Basilica of the Annunciation</Link> or <Link to="/attractions/mount-tabor/" className="font-semibold text-primary underline underline-offset-4">Mount Tabor</Link>.</li>
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">Allow enough time for travel, church opening hours and your return journey, especially when coming from Haifa Port.</p>
      </div>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-4">
      <p>The name Tabgha comes from the Greek <em>Heptapegon</em>, meaning “seven springs”. Christian pilgrims have visited this stretch of shore since the early centuries, drawn by the Gospel stories remembered here.</p>
      <div className="grid gap-4 rounded-xl border bg-secondary/20 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,220px)] sm:items-start sm:p-5 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <h3 className="font-serif text-xl font-semibold">Ancient mosaics and today's churches</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
            <li><strong>Fifth century:</strong> A large Byzantine church was built here, leaving the mosaic floors you can still see.</li>
            <li><strong>Modern church:</strong> The current Church of the Multiplication was consecrated in 1982 and preserves those earlier mosaics.</li>
            <li><strong>Peter's Primacy:</strong> The lakeside chapel was built in 1933 over remains of an earlier church, keeping the tradition associated with John 21 alive.</li>
          </ul>
        </div>
        <AttractionContentImage src="/images/attractions/tabgha-primacy-interior.webp" alt="Interior of the Church of the Primacy of Peter, with dark basalt arches and the Mensa Christi rock before the altar" />
      </div>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Many guided Galilee itineraries combine Tabgha with Capernaum, the Mount of Beatitudes or Nazareth. Check the listed stops and departure point when choosing a tour.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/nazareth-sea-of-galilee/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="tabgha-galilee-tours-card">
          <img src="/images/attractions/sea-of-galilee.webp" alt="Sea of Galilee landscape representing regional guided tours" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Compare guided Galilee tours</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Explore guided visits around the Sea of Galilee and see which other stops are included.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="tabgha-private-driver-card">
          <img src={galileePhoto} alt="Green hills above the Sea of Galilee on a northern Israel day-trip route" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Explore with a private driver</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Message me to arrange a private day trip from Jerusalem or Tel Aviv, or a shore excursion from Haifa Port, with stops tailored to your group.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "What is Tabgha best known for?", a: "Its Church of the Multiplication, with the ancient loaves-and-fishes mosaic, and the nearby Church of the Primacy of Peter at the lakeshore." },
    { q: "Can I visit both churches in one trip?", a: "Yes. They are close to one another. Allow about an hour for the two churches and their surroundings, more if you plan to pray or travel with a group." },
    { q: "Is the Church of the Multiplication open on Sundays?", a: "There are no regular sightseeing visits on Sundays; access is reserved for Mass participants. Monday–Saturday visitor hours are 09:00–15:00 (last entry 14:45). The Church of the Primacy of Peter normally welcomes visitors on Sundays." },
    { q: "Is there an entry fee?", a: "Neither church currently lists a visitor admission fee. For group services or special arrangements, contact the responsible church." },
    { q: "Can I visit Tabgha without a car?", a: "It may be possible by bus, but services and the walk to the churches can make planning awkward. A car or organised Galilee tour is usually easier." },
    { q: "Is Tabgha the same as Capernaum?", a: "No. They are nearby places with different sights. Tabgha is known for two churches; Capernaum is known for its ancient synagogue and traditional House of Peter." },
    { q: "Can I visit with limited mobility?", a: "The churches have different entrances and surfaces, and parts of the shore are rocky. Ask the church about step-free access before travelling." },
  ],
  nearby: [
    { label: "Capernaum", to: "/attractions/capernaum/", note: "The ancient synagogue, basalt village and traditional House of Peter." },
    { label: "Mount of Beatitudes", to: "/attractions/mount-of-beatitudes/", note: "A hilltop sanctuary with gardens and views over the lake." },
    { label: "Magdala", to: "/attractions/magdala/", note: "First-century archaeology and the western shore of the Sea of Galilee." },
    { label: "Yardenit", to: "/attractions/yardenit/", note: "The Jordan River baptism site, useful for a longer Galilee day." },
    { label: "Basilica of the Annunciation", to: "/attractions/basilica-of-the-annunciation/", note: "Nazareth's main Christian pilgrimage landmark." },
    { label: "Mount Tabor", to: "/attractions/mount-tabor/", note: "The Church of the Transfiguration and Lower Galilee viewpoints." },
  ],
  planningLinks: [
    { label: "Sea of Galilee travel guide", to: "/travel-blog/sea-of-galilee/", description: "Explore the lakeshore and nearby towns.", icon: "region" },
    { label: "7-day Israel itinerary", to: "/travel-blog/israel-itinerary-7-days/", description: "Plan a balanced week.", icon: "itinerary" },
    { label: "10-day Israel itinerary", to: "/travel-blog/israel-itinerary-10-days/", description: "Allow more time for northern Israel.", icon: "itinerary" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", description: "Weather, seasons and holidays.", icon: "seasons" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Trains, buses, taxis and driving.", icon: "transport" },
    { label: "Ben Gurion Airport arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/", description: "Practical advice for your arrival.", icon: "arrival" },
  ],
  sources: [
    { label: "Benedictine Tabgha Priory — Church of the Multiplication opening hours", url: tabghaSite.sources.multiplicationHours, note: "Direct official visitor timetable, last entry and Sunday worship arrangements." },
    { label: "Christian Information Center — Primacy of Peter opening hours", url: tabghaSite.sources.primacyHours, note: "Franciscan shrine's published hours, holiday exceptions and phone number; linked to its entry in the official timetable." },
    { label: "Benedictine Tabgha Priory — Church of the Multiplication", url: tabghaSite.sources.benedictineHistory, note: "Fifth-century mosaics and construction history of the present church." },
    { label: "Benedictine Tabgha Priory — pilgrims and visitors", url: tabghaSite.sources.benedictineVisitors, note: "Visitor facilities, pilgrim arrangements and monastery shop." },
    { label: "Custody of the Holy Land — Tabgha", url: tabghaSite.sources.franciscan, note: "History and Gospel traditions of the Multiplication and Primacy shrines." },
  ],
};

export function TabghaAttractionPage() {
  return <AttractionDestinationPage content={tabghaDestinationContent} />;
}
