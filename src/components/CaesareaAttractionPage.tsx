import { ConsentIframe } from "@/components/ConsentIframe";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Footprints } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { caesareaSite } from "@/data/caesareaSite";
import theaterPhoto from "@/assets/home/caesarea-theatre.webp";
import coastPanorama from "@/assets/home/hero-refresh-caesarea-coast-v4-large.webp";
import akkoPhoto from "@/assets/shore-excursions/akko-port.jpg";
import haifaPhoto from "@/assets/haifa/panorama.webp";

const visit = caesareaSite.visit;
const sources = caesareaSite.sources;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const mapEmbed = "https://maps.google.com/maps?q=Caesarea%20National%20Park%2C%20Israel&hl=en&z=14&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Caesarea%20National%20Park%2C%20Israel&hl=en";
const drivingDirections = "https://www.google.com/maps/dir/?api=1&destination=Caesarea%20National%20Park%2C%20Israel&travelmode=driving";
const aqueductDirections = "https://www.google.com/maps/dir/?api=1&destination=Caesarea%20Aqueduct%20Beach%2C%20Israel&travelmode=driving";

export const caesareaDestinationContent: AttractionDestinationContent = {
  path: "/attractions/caesarea/",
  placeName: "Caesarea",
  title: caesareaSite.title,
  region: caesareaSite.region,
  updatedAt: caesareaSite.updatedAt,
  hero: caesareaSite.hero,
  intro: caesareaSite.intro,
  historyTitle: "From Herod's port to the Crusader city",
  visitorTitle: "Tickets, opening hours and visitor information",
  visitorNavLabel: "Tickets & hours",
  relatedTitle: "More places along the Mediterranean coast",
  contactIntroduction: "Tell me your date, pickup point, group size and the coastal stops you would like to make. I can arrange a private transfer or day trip with a driver to Caesarea and nearby sites.",
  facts: [
    { icon: "location", label: "Location", value: "Mediterranean coast", note: "Between Tel Aviv and Haifa" },
    { icon: "duration", label: "Time needed", value: "2–3 hours", note: "Plus time for the aqueduct or a harbor meal" },
    { icon: "admission", label: "Admission", value: visit.adult + " adult", note: visit.child + " child · ages 5–18" },
    { icon: "hours", label: "Park hours", value: "From 08:00", note: "Seasonal closing; entry stops one hour before" },
    { icon: "highlights", label: "Don't miss", value: "Theater & harbor", note: "Hippodrome, ancient port and Crusader walls" },
    { icon: "access", label: "Accessibility", value: "Partial / varied", note: "Several accessible areas; uneven ruins elsewhere" },
  ],
  glanceNote: <>The <strong>aqueduct by the beach</strong> is a separate stop from the main national-park circuit. Allow time to travel between them.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight
        title="The Roman theater overlooking the sea"
        image={{ src: theaterPhoto, alt: "Tiered stone seating and stage area of the Roman theater at Caesarea" }}
      >
        <p>Start with Caesarea's restored Roman theater, where the Mediterranean is almost part of the scenery. It was built in Herod's time and still serves as a venue for performances.</p>
        <p>Walk up into the seating for a view of the stage and coastline. This is a good place to picture the scale of the port city before moving on to the excavations.</p>
      </AttractionHighlight>
      <AttractionHighlight title="The hippodrome and promontory palace">
        <p>The long arena beside the sea hosted horse and chariot races in Roman times. Nearby, the remains of the promontory palace stretch out towards the waves, showing how closely royal life and the coastline were linked.</p>
        <p>Allow time to walk the sea-facing route between these remains rather than viewing everything from the entrance.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The ancient harbor and Crusader walls"
        image={{ src: "/images/attractions/caesarea-crusader-arches.svg", alt: "Historic stone arches within the Crusader quarter at Caesarea" }}
      >
        <p>Herod built one of the ancient Mediterranean's ambitious artificial harbors here. Later rulers reshaped the city, leaving Crusader walls, gates and stone-lined streets around today's harbor area.</p>
        <p>I recommend walking through the northern harbor quarter and taking time to see both the sea and the fortifications. Cafés and restaurants make this a pleasant place for a break.</p>
      </AttractionHighlight>
      <AttractionHighlight title="The harbor visitors' center in Herod's vaults">
        <p>The visitors' center occupies restored Roman vaults near the harbor, with archaeology, multimedia displays and the story of Caesarea's construction and maritime trade. The presentation takes roughly half an hour.</p>
        <p>It is included with the full national-park admission ticket. The center has its own opening hours and a last-entry cutoff, so plan to visit before leaving the northern part of the park. <a href={sources.visitorFaq} target="_blank" rel="noopener noreferrer" className={inlineLink}>Check the visitor-center information</a>.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The aqueduct on the beach"
        image={{ src: "/images/attractions/caesarea-aqueduct-arches.svg", alt: "Roman aqueduct arches beside the sandy beach at Caesarea" }}
      >
        <p>North of the main archaeological circuit, the aqueduct's long row of stone arches once carried fresh water into Roman Caesarea. Today it stands beside the beach and is especially striking against the sea.</p>
        <p>Visit the aqueduct as a separate nearby stop, preferably by car or with a driver. It is not the same entrance as the theater or harbor, and beach access and swimming conditions should be checked separately. <a href={aqueductDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Directions to the aqueduct</a>.</p>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>Caesarea National Park is managed by the Israel Nature and Parks Authority. Its archaeological areas operate on seasonal hours; the harbor precinct can remain active later, while the harbor visitors' center follows its own schedule.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="caesarea-hours-tickets">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">National park opening hours</h3>
          <p className="mt-3 text-sm font-semibold">April–October</p>
          <dl className="mt-1 space-y-1 text-sm leading-relaxed sm:text-base">
            <div><dt className="inline">Sunday–Thursday & Saturday: </dt><dd className="inline font-semibold">{visit.summerRegular}</dd></div>
            <div><dt className="inline">Fridays and other holiday eves: </dt><dd className="inline font-semibold">{visit.summerFriday}</dd></div>
          </dl>
          <p className="mt-3 text-sm font-semibold">November–March</p>
          <dl className="mt-1 space-y-1 text-sm leading-relaxed sm:text-base">
            <div><dt className="inline">Sunday–Thursday & Saturday: </dt><dd className="inline font-semibold">{visit.winterRegular}</dd></div>
            <div><dt className="inline">Fridays and other holiday eves: </dt><dd className="inline font-semibold">{visit.winterFriday}</dd></div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>Rosh Hashanah, Passover and Yom Kippur eves:</strong> {visit.specialHolidayEves}. <strong>Last park entry is one hour before closing.</strong> Check the <a href={sources.park} target="_blank" rel="noopener noreferrer" className={inlineLink}>official daily information</a> for changes on your visit date.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Admission prices</h3>
          <dl className="mt-3 space-y-2 text-sm leading-relaxed sm:text-base">
            <div className="flex items-start justify-between gap-3"><dt>Adult</dt><dd className="shrink-0 font-semibold" dir="ltr">{visit.adult}</dd></div>
            <div className="flex items-start justify-between gap-3"><dt>Child, ages 5–18</dt><dd className="shrink-0 font-semibold" dir="ltr">{visit.child}</dd></div>
            <div className="flex items-start justify-between gap-3"><dt>Student</dt><dd className="shrink-0 font-semibold" dir="ltr">{visit.student}</dd></div>
            <div className="flex items-start justify-between gap-3"><dt>Active-duty soldier</dt><dd className="shrink-0 font-semibold" dir="ltr">{visit.soldier}</dd></div>
            <div className="flex items-start justify-between gap-3"><dt>Adult in a group ({visit.groupThreshold} people)</dt><dd className="shrink-0 font-semibold" dir="ltr">{visit.groupAdult}</dd></div>
            <div className="flex items-start justify-between gap-3"><dt>Child in a group ({visit.groupThreshold} people)</dt><dd className="shrink-0 font-semibold" dir="ltr">{visit.groupChild}</dd></div>
            <div className="flex items-start justify-between gap-3"><dt>Israeli senior citizen</dt><dd className="shrink-0 font-semibold" dir="ltr">{visit.israeliSenior}</dd></div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">Children under 5 enter free; group rates apply to groups of more than 30 people. Matmon members receive admission under their membership terms.</p>
          <div className="mt-3 border-t pt-3">
            <div className="flex items-start justify-between gap-3 text-sm leading-relaxed sm:text-base">
              <span><strong>Harbor only</strong> (without the theater, hippodrome or visitors' center)</span>
              <strong className="shrink-0" dir="ltr">{visit.harborOnly}</strong>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Choose the full national park ticket to explore the entire archaeological route. <a href={sources.harborPrices} target="_blank" rel="noopener noreferrer" className={inlineLink}>Harbor-only ticket details</a>.</p>
          </div>
          <a href={sources.park} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Official tickets and visit reservation <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </article>
      </div>
      <AttractionPracticalTip>
        <strong>Plan the hours for the park, not just the harbor.</strong> The harbor area remains lively after the archaeological park closes, but that does not extend the last entry time for the paid ruins. The visitors' center normally opens at 08:30 and stops entry 30 minutes before its published closing time. <a href={sources.harborHours} target="_blank" rel="noopener noreferrer" className={inlineLink}>See harbor and visitor-center hours</a>.
      </AttractionPracticalTip>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="caesarea-visitor-essentials">
        <h3 className="font-serif text-xl font-semibold">Useful things to know before visiting</h3>
        <ul className="mt-3 grid list-disc gap-x-6 gap-y-2 pl-5 text-sm leading-relaxed sm:grid-cols-2 sm:text-base">
          <li><strong>Sun and walking:</strong> The ruins are exposed. Bring water, a hat and comfortable shoes for ancient stone paths.</li>
          <li><strong>Accessibility:</strong> Accessible routes cover sections including the theater, hippodrome, promenade, ancient city and visitors' center; some archaeological ground is uneven.</li>
          <li><strong>Facilities and parking:</strong> Parking, restrooms and restaurants are available. Harbor parking may become chargeable after the national park closes; check the signs if you are staying for dinner.</li>
          <li><strong>Displays:</strong> The “Caesarea Experience” near the theater is currently listed as not open; the harbor visitors' center is a different exhibition.</li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed">For accessibility arrangements or temporary closures, consult the <a href={sources.park} target="_blank" rel="noopener noreferrer" className={inlineLink}>official park page</a> or call <a href={"tel:" + visit.parkPhoneHref} className={inlineLink} dir="ltr">{visit.parkPhone}</a>.</p>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>Caesarea National Park lies on the Mediterranean coast, between Tel Aviv and Haifa, west of Or Akiva. The two main visitor access areas are by the southern Roman theater and the northern Crusader harbor gate.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By car or private driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Follow signs for Caesarea National Park from the coastal road. For the theater start at the southern entrance; for the harbor visitors' center, use the northern entrance. <Link to="/car-rental/" className={inlineLink}>A rental car</Link> or <a href="#contact" className={inlineLink}>private driver</a> also makes it easier to include the separate aqueduct stop.</p>
            <a href={drivingDirections} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Driving directions <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By train and bus</h3></div>
            <p className="mt-2 text-sm leading-relaxed">There is no train stop at the park itself. Use Caesarea–Pardes Hanna or Binyamina station as a starting point and check a connecting bus or taxi. Verify the final stop, walking route and return trip in the <a href="https://bus.gov.il/en/home" target="_blank" rel="noopener noreferrer" className={inlineLink}>public transport planner</a>.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">Walking inside the park</h3></div>
            <p className="mt-2 text-sm leading-relaxed">A coastal walking route links the theater, hippodrome and harbor. If you enter at one end and leave at the other, allow time to return to your parked car or arrange collection at the opposite gate.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="caesarea-location-map">
          <h3 className="text-sm font-semibold">Where is Caesarea?</h3>
          <ConsentIframe title="Google Maps location of Caesarea National Park and its archaeological ruins" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56" />
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">View larger map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">A relaxed visit: 2–3 hours</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>Start at the <strong>Roman theater</strong> and enjoy the coastal view from the seats.</li>
          <li>Continue along the <strong>hippodrome and promontory palace</strong> towards the harbor.</li>
          <li>Explore the <strong>Crusader quarter and harbor visitors' center</strong>, then take a break by the water.</li>
        </ol>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">Allow another 20–30 minutes for the aqueduct, excluding travel between the two locations. You can also reverse the route if you start at the northern gate. <a href={aqueductDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Navigate to the aqueduct separately</a>.</p>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">Combine Caesarea with a coastal day trip</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">I recommend choosing two or three main stops for a full day, depending on your departure city and travel time.</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li><strong>Heading north:</strong> Continue to <Link to="/attractions/haifa/" className={inlineLink}>Haifa</Link> for the Bahá'í Gardens viewpoints and German Colony.</li>
          <li><strong>History-focused coast:</strong> Pair Caesarea with <Link to="/attractions/akko-acre/" className={inlineLink}>Old Akko</Link> if you have a full day and an early start.</li>
          <li><strong>Heading south:</strong> Combine the ruins with <Link to="/attractions/jaffa/" className={inlineLink}>Old Jaffa</Link> for another historic harbor setting.</li>
        </ul>
      </div>
      <figure className="overflow-hidden rounded-xl border bg-card" data-testid="caesarea-coastal-panorama">
        <img src={coastPanorama} alt="Wide aerial panorama of Caesarea's ancient harbor, archaeological park and Mediterranean shoreline" width={1200} height={675} loading="lazy" decoding="async" className="h-52 w-full object-cover object-center sm:h-64 lg:h-72" />
        <figcaption className="px-3 py-2 text-xs text-muted-foreground">Caesarea's ancient harbor and coastline, seen from above.</figcaption>
      </figure>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>Herod the Great developed Caesarea as a major port city in the late first century BCE, naming it for Augustus Caesar. Its artificial harbor, theater, public buildings and streets helped make it an important Roman administrative and commercial center.</p>
      <p>Caesarea later became a leading city in the Roman and Byzantine periods, with diverse Jewish, Christian and other communities. The city changed hands again in medieval times, and the Crusaders strengthened its walls and fortifications.</p>
      <p>The park brings those periods together: the harbor and theater recall Herod's city, while the Crusader gates and walls show how the Mediterranean settlement was reshaped centuries later.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Several northern coastal excursions combine Caesarea with Haifa and Akko. Check whether your chosen tour includes national-park admission, how long it spends among the ruins and where the pickup is.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/caesarea-haifa-acre/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="caesarea-northern-tours-card">
          <img src={akkoPhoto} alt="Stone harbor in Old Akko on a northern coastal tour" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Explore northern coastal tours</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Compare excursions visiting Caesarea, Haifa and Akko.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="caesarea-private-driver-card">
          <img src={haifaPhoto} alt="Haifa coast and city skyline on a private coastal journey" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Plan a private coastal trip</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Tell me your departure city and the places you'd like to see.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "How much does Caesarea National Park cost?", a: "Full park admission costs ₪46 for an adult and ₪27 for a child aged 5–18. Students and adults in groups of more than 30 pay ₪39; children in qualifying groups and Israeli senior citizens pay ₪23. Harbor-only admission costs ₪18 and excludes the theater, hippodrome and visitors' center." },
    { q: "What are the opening hours?", a: "The park opens at 08:00. April–October it closes at 17:00 (16:00 on Fridays and other holiday eves); November–March at 16:00 (15:00 on Fridays and other holiday eves). On Rosh Hashanah, Passover and Yom Kippur eves, it closes at 13:00. Last park entry is one hour before closing." },
    { q: "Do I need to reserve a visit?", a: "Regular independent visits to the national park generally do not require advance reservation, although entry may depend on capacity. For the harbor visitors' center, groups of more than 10 should reserve a time; without reservations, entry is first-come, first-served and subject to available space." },
    { q: "How long should I spend at Caesarea?", a: "Allow 2–3 hours for the theater, hippodrome, ancient harbor and visitors' center. Add more time for a meal or the separate aqueduct stop." },
    { q: "Is the aqueduct part of the park walk?", a: "The aqueduct beside the beach is a separate nearby stop, away from the main theater-to-harbor archaeological route." },
    { q: "Is the harbor open after the national park closes?", a: "The harbor precinct may remain open into the evening, but entry to the archaeological park follows its own earlier opening and closing times." },
    { q: "Is Caesarea accessible for wheelchair users?", a: "Several areas are accessible, including sections of the theater, hippodrome, promenade and harbor visitors' center. Ancient paths can be uneven; check the official accessibility information for your route." },
    { q: "Which other places combine well with Caesarea?", a: "Haifa is a natural next stop if you're heading north; Old Akko suits a longer coastal day, while Old Jaffa is an option when returning south." },
  ],
  nearby: [
    { label: "Old Akko", to: "/attractions/akko-acre/", note: "Crusader halls, lively markets and a historic working harbor farther north." },
    { label: "Haifa", to: "/attractions/haifa/", note: "The Bahá'í Gardens viewpoints and German Colony on the northern coast." },
    { label: "Old Jaffa", to: "/attractions/jaffa/", note: "A second historic harbor, stone lanes and markets to the south." },
    { label: "Rosh Hanikra", to: "/attractions/rosh-hanikra/", note: "Sea grottoes and dramatic cliffs on a longer northern coastal route." },
    { label: "Tel Megiddo", to: "/attractions/tel-megiddo/", note: "Archaeology and views over the Jezreel Valley on an inland detour." },
    { label: "Basilica of the Annunciation", to: "/attractions/basilica-of-the-annunciation/", note: "Nazareth's landmark church on a wider northern Israel itinerary." },
  ],
  planningLinks: [
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Compare trains, buses and private transport.", icon: "transport" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", description: "Weather and season-by-season travel advice.", icon: "seasons" },
    { label: "7-day Israel itinerary", to: "/travel-blog/israel-itinerary-7-days/", description: "Build a balanced coast and Galilee route.", icon: "itinerary" },
    { label: "10-day Israel itinerary", to: "/travel-blog/israel-itinerary-10-days/", description: "Plan more time for the northern coast.", icon: "itinerary" },
    { label: "Haifa visitor guide", to: "/attractions/haifa/", description: "Explore the Carmel and northern shore.", icon: "region" },
    { label: "Ben Gurion Airport arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/", description: "Plan your onward journey after landing.", icon: "arrival" },
  ],
  sources: [
    { label: "Israel Nature and Parks Authority — Caesarea National Park", url: sources.park, note: "Current park hours, ticket prices, accessibility and reservation information." },
    { label: "Israel Nature and Parks Authority — admission price list", url: sources.prices, note: "General entry categories, child age rules and group admission conditions." },
    { label: "Caesarea Harbor — admission prices", url: sources.harborPrices, note: "Reduced-price harbor-only ticket and other admission arrangements." },
    { label: "Caesarea Harbor — opening hours", url: sources.harborHours, note: "Differences between national park, harbor and visitors' center schedules." },
    { label: "Caesarea Harbor — visitors' center", url: sources.visitorCenter, note: "Exhibition inside Herod's vaults and visitor-center arrangements." },
    { label: "Caesarea Harbor — visitors' center FAQ", url: sources.visitorFaq, note: "Visitor-center access, visit duration and practical information." },
    { label: "Caesarea Harbor — the port and old city", url: sources.harborSites, note: "Archaeological history and key locations around the harbor." },
  ],
};

export function CaesareaAttractionPage() {
  return <AttractionDestinationPage content={caesareaDestinationContent} />;
}
