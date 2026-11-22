import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { yardenitSite } from "@/data/yardenitSite";
import galileePhoto from "@/assets/home/hero-galilee-sm.webp";

const inlineLink = "font-semibold text-primary underline underline-offset-4";
const mapEmbed = "https://maps.google.com/maps?q=Yardenit%20Baptismal%20Site%2C%20Kibbutz%20Kinneret%2C%20Israel&hl=en&z=15&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Yardenit%20Baptismal%20Site%2C%20Kibbutz%20Kinneret%2C%20Israel&hl=en";
const drivingDirections = "https://www.google.com/maps/dir/?api=1&destination=Yardenit%20Baptismal%20Site%2C%20Kibbutz%20Kinneret%2C%20Israel&travelmode=driving";

export const yardenitDestinationContent: AttractionDestinationContent = {
  path: "/attractions/yardenit/",
  placeName: "Yardenit",
  title: yardenitSite.title,
  region: yardenitSite.region,
  updatedAt: yardenitSite.updatedAt,
  hero: yardenitSite.hero,
  intro: yardenitSite.intro,
  visitorTitle: "Opening hours, baptism arrangements and facilities",
  visitorNavLabel: "Hours & baptism",
  historyTitle: "Yardenit and the Jordan River baptism tradition",
  relatedTitle: "Explore more around the Sea of Galilee",
  contactIntroduction: "Tell me your travel date, starting point, group size and the Galilee places you would like to visit. I'll be happy to help arrange a private driver for your day.",
  facts: [
    { icon: "location", label: "Location", value: "Southern Sea of Galilee", note: "Near Kibbutz Kinneret" },
    { icon: "duration", label: "Time needed", value: "30–60 minutes", note: "For a riverside visit; allow longer for baptism" },
    { icon: "admission", label: "Admission", value: "Free entry", note: "Robes and some facilities cost extra" },
    { icon: "hours", label: "Visitor hours", value: "Confirm with Yardenit", note: "Baptism ends before site closing" },
    { icon: "highlights", label: "Baptism clothing", value: "White robe required", note: "Rent or buy one at the site" },
    { icon: "access", label: "Getting there", value: "Car, bus or tour", note: "Check the final connection" },
  ],
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight
        title="The baptism pools and Jordan River"
        image={{ src: "/images/attractions/jordan-river-baptism.webp", alt: "Pilgrims in white robes taking part in a group baptism at the Jordan River in Yardenit" }}
      >
        <p>Paths and terraces lead to designated places where visitors enter the Jordan River for baptism. Even if you are not taking part in a ceremony, the greenery and water make this a pleasant place to pause.</p>
        <p>The pools have handrails, and the site provides facilities for groups arriving to worship together.</p>
      </AttractionHighlight>
      <AttractionHighlight title="The Wall of New Life">
        <p>Look for the Wall of New Life, a collection of hand-painted ceramic panels displaying the Gospel account of Jesus’ baptism (Mark 1:9–11) in more than 80 languages and dialects. Created by Armenian artist Hagop Anteassian, the panels celebrate the many communities that come to Yardenit.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Gardens and quiet places for prayer">
        <p>The landscaped riverbank has places to gather, reflect and enjoy the natural setting. I recommend leaving a little unhurried time here, especially if your group is combining Yardenit with several other Galilee stops.</p>
        <p>If a baptism is taking place, give participants privacy and ask before photographing anyone.</p>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>Entry to Yardenit is free, and the site does not charge for the baptism ceremony itself. You pay separately for a white robe and certain visitor facilities.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="yardenit-hours-baptism">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Opening hours and contact</h3>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">Before travelling, confirm the current opening hours and latest time for baptism directly with Yardenit. Its published pages show different timetables, and baptism normally finishes before the site closes.</p>
          <p className="mt-3 text-sm"><strong>Phone: </strong><a href={"tel:" + yardenitSite.phoneHref} className={inlineLink} dir="ltr">{yardenitSite.phone}</a></p>
          <p className="mt-1 text-sm"><strong>Email: </strong><a href={"mailto:" + yardenitSite.email} className={inlineLink}>{yardenitSite.email}</a></p>
          <a href={yardenitSite.sources.contact} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Official contact details <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Arranging a baptism</h3>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">Bring your own pastor or priest, or ask Yardenit for local clergy contacts. Agree the ceremony time, language and any requirements with your minister.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">A special white baptism robe is required and can be rented or purchased on site. Other clothing may be worn underneath; swimwear alone is not permitted in the baptism water.</p>
          <a href={yardenitSite.sources.faq} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Official baptism questions and answers <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </article>
      </div>
      <AttractionPracticalTip>
        <strong>Planning a ceremony?</strong> Allow time to change, prepare and gather your group before your agreed baptism time. If more than 40 people are coming, notify Yardenit in advance.
      </AttractionPracticalTip>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="yardenit-visitor-essentials">
        <h3 className="font-serif text-xl font-semibold">Useful things to know before visiting</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>If you’re being baptized:</strong> Bring a towel, dry clothes for afterwards, a bag for wet items and drinking water. Changing rooms and showers are available at the site.</p>
        <ul className="mt-3 grid list-disc gap-x-6 gap-y-2 pl-5 text-sm leading-relaxed sm:grid-cols-2 sm:text-base">
          <li><strong>Facilities:</strong> Toilets, a gift shop and food and drink options are available.</li>
          <li><strong>Accessibility:</strong> The operator describes ramps and handrails for accessing the baptism areas. Ask about the best route for your particular needs.</li>
          <li><strong>Groups:</strong> The official FAQ says groups of up to 40 can visit without advance coordination. A planned ceremony still needs its own arrangements.</li>
          <li><strong>Respectful visits:</strong> Keep the baptism area peaceful, respect worshippers and use only designated water-entry areas.</li>
        </ul>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>Yardenit stands close to <strong>Kibbutz Kinneret</strong>, where the Jordan River leaves the Sea of Galilee at its southern end. It is south of Tiberias, away from the churches around the northern shore.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By car or with a driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">From Tiberias, follow Route 90 south towards Kibbutz Kinneret and the Jordan River outlet. Set your navigation to Yardenit Baptismal Site rather than a general location in the kibbutz.</p>
            <a href={drivingDirections} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">Driving directions to Yardenit</a>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By public transport</h3></div>
            <p className="mt-2 text-sm leading-relaxed">From Tiberias, look for buses serving <strong>Beit Yerach Regional School (בית ספר אזורי בית ירח, stop 57066)</strong>, a short walk from Yardenit. Check your route, the walk from the stop and the return departure using the <a href="https://bus.gov.il/en/home" target="_blank" rel="noopener noreferrer" className={inlineLink}>official public transport planner</a>. For several Galilee stops in one day, consider <Link to="/car-rental/" className={inlineLink}>renting a car</Link>, comparing <Link to="/tours/nazareth-sea-of-galilee/" className={inlineLink}>Galilee tours</Link>, or <a href="#contact" className={inlineLink}>arranging a private driver</a>.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="yardenit-location-map">
          <h3 className="text-sm font-semibold">Where is Yardenit?</h3>
          <iframe title="Google Maps location of Yardenit Baptismal Site by Kibbutz Kinneret" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56" />
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">View larger map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">A short riverside visit</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">Allow about 30–60 minutes to walk down to the river, see the baptism areas and Wall of New Life, and spend a little time in the gardens. A ceremony will take longer, depending on your group and arrangements.</p>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">Combine Yardenit with the Sea of Galilee</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">For a full-day trip, I recommend choosing three to five sites in the Galilee, depending on your starting point and the time spent at each. If you have a scheduled baptism, keep the rest of your day lighter.</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li><strong>Along the lake:</strong> Spend time in <Link to="/attractions/sea-of-galilee/" className={inlineLink}>Tiberias and the southern lakeshore</Link>.</li>
          <li><strong>Northern shore:</strong> Continue to <Link to="/attractions/magdala/" className={inlineLink}>Magdala</Link>, <Link to="/attractions/tabgha/" className={inlineLink}>Tabgha</Link>, <Link to="/attractions/capernaum/" className={inlineLink}>Capernaum</Link> or the <Link to="/attractions/mount-of-beatitudes/" className={inlineLink}>Mount of Beatitudes</Link>.</li>
          <li><strong>Wider Galilee:</strong> Add <Link to="/attractions/basilica-of-the-annunciation/" className={inlineLink}>Nazareth</Link> if it suits your route and visiting hours.</li>
        </ul>
      </div>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>Christian pilgrims visit the Jordan River because the Gospels describe Jesus being baptized by John the Baptist. Yardenit was established in <strong>1981 by Kibbutz Kinneret, with support from Israel’s Ministry of Tourism</strong>, to provide a designated place for baptism in the river near the Sea of Galilee.</p>
      <p>The traditional location associated with Jesus' baptism is much farther south, near Jericho. That site is known as <Link to="/attractions/qasr-el-yahud/" className={inlineLink}>Qasr el-Yahud</Link>. Yardenit offers a different setting and visitor experience, so the choice depends on your journey and the ceremony you hope to arrange.</p>
      <p>For a fuller explanation of both sites, read my <Link to="/travel-blog/baptism-in-the-jordan-river/" className={inlineLink}>guide to baptism in the Jordan River</Link>.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Some guided Galilee tours stop at Yardenit, while others focus on the northern churches and archaeological sites. Check the stops before booking, especially if you want time for a baptism rather than a short sightseeing visit.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/nazareth-sea-of-galilee/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src="/images/attractions/sea-of-galilee.webp" alt="Sea of Galilee landscape on a guided northern Israel tour" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Explore guided Galilee tours</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Compare itineraries and look for an included Yardenit stop.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src={galileePhoto} alt="Hills and shore of the Sea of Galilee on a private day trip" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Travel with a private driver</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Arrange transport around your group's baptism time and other Galilee stops.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "Is entry to Yardenit free?", a: "Yes. Entry and the baptism ceremony itself are free; white robes and some facilities cost extra." },
    { q: "Do I need to book a baptism in advance?", a: "Arrange your minister and ceremony details ahead of time. Groups of up to 40 may visit without general coordination; larger groups should contact Yardenit." },
    { q: "Is there a priest at Yardenit?", a: "There is no resident priest; Yardenit can provide local clergy contacts on request." },
    { q: "What should I wear for a baptism?", a: "Wear the required white baptism robe over suitable clothing. Entering the water in swimwear alone is not permitted." },
    { q: "What are Yardenit's opening hours?", a: "Hours listed on the operator's pages differ. Contact Yardenit to confirm access and the last baptism time for your chosen date." },
    { q: "Is Yardenit where Jesus was baptized?", a: "Yardenit is a modern baptism site near the Sea of Galilee. The traditional location associated with Jesus' baptism is Qasr el-Yahud on the lower Jordan, near Jericho." },
    { q: "Can I get to Yardenit from Tiberias?", a: "Yes. Yardenit is south of Tiberias near Kibbutz Kinneret. Travel by car, arranged driver or suitable local bus, checking the final walking approach." },
  ],
  nearby: [
    { label: "Magdala", to: "/attractions/magdala/", note: "Explore first-century archaeology and the Duc In Altum chapels." },
    { label: "Tabgha", to: "/attractions/tabgha/", note: "Visit the churches and ancient loaves-and-fishes mosaic." },
    { label: "Capernaum", to: "/attractions/capernaum/", note: "Discover the ancient lakeside village and synagogue." },
    { label: "Mount of Beatitudes", to: "/attractions/mount-of-beatitudes/", note: "Enjoy the church and gardens overlooking the lake." },
    { label: "Basilica of the Annunciation", to: "/attractions/basilica-of-the-annunciation/", note: "Visit Nazareth's major Christian pilgrimage church." },
    { label: "Mount Tabor", to: "/attractions/mount-tabor/", note: "A hilltop Transfiguration sanctuary on a wider Galilee trip." },
  ],
  planningLinks: [
    { label: "Baptism in the Jordan River", to: "/travel-blog/baptism-in-the-jordan-river/", description: "Understand Yardenit and Qasr el-Yahud.", icon: "region" },
    { label: "Sea of Galilee guide", to: "/attractions/sea-of-galilee/", description: "Discover Tiberias and lakeside sights.", icon: "region" },
    { label: "7-day Israel itinerary", to: "/travel-blog/israel-itinerary-7-days/", description: "Include a northern Israel visit.", icon: "itinerary" },
    { label: "10-day Israel itinerary", to: "/travel-blog/israel-itinerary-10-days/", description: "Take more time around the Galilee.", icon: "itinerary" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Compare driving, buses and tours.", icon: "transport" },
    { label: "Ben Gurion Airport arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/", description: "Plan your first day in Israel.", icon: "arrival" },
  ],
  sources: [
    { label: "Yardenit — baptism and visitor facilities", url: yardenitSite.sources.baptism, note: "Free entry, white robes, designated pools, accessibility features and facilities." },
    { label: "Yardenit — official questions and answers", url: yardenitSite.sources.faq, note: "Clergy, groups, baptism clothing, fees and the site’s 1981 founding." },
    { label: "Yardenit — Wall of New Life", url: yardenitSite.sources.wall, note: "Hand-painted panels displaying Mark’s account of the baptism in many languages." },
    { label: "Yardenit — about the site", url: yardenitSite.sources.about, note: "Jordan River setting and site background." },
    { label: "Yardenit — contact and visiting arrangements", url: yardenitSite.sources.contact, note: "Phone, email and visitor information; confirm hours directly." },
  ],
};

export function YardenitAttractionPage() {
  return <AttractionDestinationPage content={yardenitDestinationContent} />;
}
