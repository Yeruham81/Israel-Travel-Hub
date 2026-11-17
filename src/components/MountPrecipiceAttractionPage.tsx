import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CarFront, BusFront, Footprints } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { mountPrecipiceSite } from "@/data/mountPrecipiceSite";
import { carRentalAffiliateUrl } from "@/lib/car-rental-affiliate";
import galileePhoto from "@/assets/home/hero-galilee-sm.webp";

const inlineLink = "font-semibold text-primary underline underline-offset-4";
const mapEmbed = "https://maps.google.com/maps?q=Mount%20Precipice%20Lookout%2C%20Nazareth%2C%20Israel&hl=en&z=15&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Mount%20Precipice%20Lookout%2C%20Nazareth%2C%20Israel&hl=en";
const drivingDirections = "https://www.google.com/maps/dir/?api=1&destination=Mount%20Precipice%20Lookout%2C%20Nazareth%2C%20Israel&travelmode=driving";

export const mountPrecipiceDestinationContent: AttractionDestinationContent = {
  path: "/attractions/mount-precipice/",
  placeName: "Mount Precipice",
  title: mountPrecipiceSite.title,
  region: mountPrecipiceSite.region,
  updatedAt: mountPrecipiceSite.updatedAt,
  hero: mountPrecipiceSite.hero,
  intro: mountPrecipiceSite.intro,
  visitorTitle: "Visiting the lookout: access, paths and practical tips",
  visitorNavLabel: "Visitor information",
  historyTitle: "Mount Precipice and its history",
  relatedTitle: "Explore more around Nazareth and Lower Galilee",
  contactIntroduction: "Tell me when you're visiting, where you'd like to start and which Nazareth or Galilee places interest you. I'll be happy to help plan a private day trip.",
  facts: [
    { icon: "location", label: "Location", value: "South of Nazareth", note: "Above the Jezreel Valley" },
    { icon: "duration", label: "Time needed", value: "30–45 minutes", note: "For the lookout; allow longer for walking" },
    { icon: "admission", label: "Admission", value: "Free", note: "Public open-air viewpoint" },
    { icon: "hours", label: "When to visit", value: "During daylight", note: "The exposed viewpoint is best enjoyed in good visibility" },
    { icon: "access", label: "Getting there", value: "Car or taxi", note: "Parking near the summit" },
    { icon: "highlights", label: "Main lookout", value: "Paved approach", note: "The longer Gospel Trail is a separate hike" },
  ],
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight title="Three Faiths Lookout">
        <p>From the hilltop parking area, follow the paved path to the Three Faiths Lookout. The plaza has a peaceful atmosphere and explanatory signs in English, Hebrew and Arabic. KKL-JNF describes an olive tree planted by Pope John Paul II as a symbol of peace.</p>
        <p>This is the easiest place to start your visit, especially if you have limited time before heading into Nazareth.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The wide Jezreel Valley panorama"
        image={{ src: "/images/attractions/mount-precipice-jezreel-view.webp", alt: "Broad view of the fields and hills of the Jezreel Valley from Mount Precipice south of Nazareth" }}
      >
        <p>Below the Nazareth Hills, the cultivated fields of the Jezreel Valley stretch towards Mount Gilboa and Givat HaMoreh. The view changes with the seasons, from green fields to golden summer colours.</p>
        <p>I recommend a clear morning or late afternoon for a more comfortable stop and softer light. Keep your distance from unfenced rock edges when taking photographs.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="Mount Tabor on the horizon"
        image={{ src: "/images/attractions/mount-precipice-mount-tabor-view.webp", alt: "Mount Tabor rising beyond the Nazareth area in a view taken from Mount Precipice" }}
      >
        <p>Look east towards the rounded outline of <Link to="/attractions/mount-tabor/" className={inlineLink}>Mount Tabor</Link>. Its distinctive shape is easy to recognise, and it makes a lovely landmark to point out from the overlook.</p>
        <p>If you're visiting both mountains, treat them as two separate stops with driving and visiting time between them.</p>
      </AttractionHighlight>
      <AttractionHighlight title="The Forester's House lookout and short ridge walk">
        <p>For a little more walking, follow the path east along the ridge. KKL-JNF describes another lookout about 300 metres from the main plaza, marked by the small stone building once used by local foresters.</p>
        <p>A short accessible path connects this lookout back to the parking area. The cliffside sections need more care than the paved approach to the main viewpoint.</p>
      </AttractionHighlight>
      <AttractionHighlight title="The start of the Gospel Trail">
        <p>Mount Precipice is also a starting point for the Gospel Trail, a much longer walk through Lower Galilee towards the Sea of Galilee. Trail markers feature stacked basalt stones with an anchor symbol.</p>
        <p>If you are only here for the lookout, enjoy the short hilltop paths. Follow the Gospel Trail further only if you have planned the hike, weather, water and return transport separately.</p>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>Mount Precipice is an open-air viewpoint rather than a church or ticketed archaeological park. The short walk from the parking area is suitable for a scenic stop during a Nazareth visit.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="mount-precipice-visitor-cards">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Entry, parking and a short visit</h3>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">There is no entry charge for the public lookout. Follow the brown road signs for Mount Precipice and park near the hilltop trailhead. The paved path leads to the Three Faiths Lookout.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">Allow about <strong>30–45 minutes</strong> for the viewpoint and photographs, or longer if you plan to walk along the ridge. A daylight visit is the most practical choice.</p>
          <a href={mountPrecipiceSite.sources.kkl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">KKL-JNF's official walking guide <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Paths and accessibility</h3>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">KKL-JNF describes the paved route from the car park to the Three Faiths Lookout as wheelchair accessible, with a short accessible connection from the Forester's House lookout back to the car park.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">The longer cliffside and Gospel Trail paths include uneven and exposed sections. Anyone with specific mobility requirements should check the current conditions before visiting.</p>
          <a href={mountPrecipiceSite.sources.kkl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">See the lookout and trail description <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </article>
      </div>
      <AttractionPracticalTip>
        <strong>My planning tip:</strong> Bring water and sun protection, especially in summer. The setting is open and the cliff edges are steep, so stay on the marked paths and use the designated viewpoints.
      </AttractionPracticalTip>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="mount-precipice-visitor-essentials">
        <h3 className="font-serif text-xl font-semibold">Useful things to know</h3>
        <ul className="mt-3 grid list-disc gap-x-6 gap-y-2 pl-5 text-sm leading-relaxed sm:grid-cols-2 sm:text-base">
          <li><strong>Weather:</strong> Visibility over the valley is clearer on some days than others; exposed areas can be windy.</li>
          <li><strong>Footwear:</strong> Comfortable walking shoes are enough for the paved lookout; choose sturdier shoes for unpaved trails.</li>
          <li><strong>Facilities:</strong> Take drinking water with you rather than assuming refreshments will be available at the lookout.</li>
          <li><strong>Walking further:</strong> The Gospel Trail leads away from the summit; it is a separate hike, not the short lookout circuit.</li>
        </ul>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>Mount Precipice (also called Mount Kedumim or Har HaKfitsa) is on the southern side of Nazareth, above the Jezreel Valley. The lookout has its own approach road and parking area, separate from the streets around the Basilica of the Annunciation.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By car or private driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Approach Nazareth via Route 60 and Route 75, then follow the brown signs marked Mount Precipice to the parking area near the summit. Set your navigation for the <strong>Mount Precipice lookout</strong>, rather than central Nazareth. The paved walk begins near the car park.</p>
            <a href={drivingDirections} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Driving directions to the lookout <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By public transport</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Buses serve Nazareth and nearby roads, but a city-centre stop does not necessarily leave you near the summit parking area. Check the final walking route and hills before relying on a bus; the <a href="https://bus.gov.il/en/home" target="_blank" rel="noopener noreferrer" className={inlineLink}>official public transport planner</a> can help. For several regional stops, consider <a href={carRentalAffiliateUrl("/attractions/mount-precipice/")} target="_blank" rel="sponsored noopener noreferrer" className={inlineLink}>renting a car</a>, <Link to="/tours/nazareth-sea-of-galilee/" className={inlineLink}>comparing guided tours</Link> or <a href="#contact" className={inlineLink}>arranging a private driver</a>.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">On foot</h3></div>
            <p className="mt-2 text-sm leading-relaxed">The easy option is the paved lookout path from the hilltop car park. The longer <strong>Gospel Trail</strong> descends from Mount Precipice towards the Kesullot Valley. It is a proper hike rather than a shortcut into the old city; check the trail route and arrange a pickup or return before setting out.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="mount-precipice-location-map">
          <h3 className="text-sm font-semibold">Where is Mount Precipice?</h3>
          <iframe title="Google Maps location of Mount Precipice lookout near Nazareth" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56" />
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">View larger map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">A short visit to the lookout</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">Park near the summit, walk up to the Three Faiths Lookout and enjoy the Jezreel Valley panorama. If you have a little extra time, continue east to the Forester's House viewpoint before returning to the parking area.</p>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">Combine Mount Precipice with Nazareth or Lower Galilee</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">For a full day, I suggest choosing three to five stops that suit your interests and starting point. A good Nazareth visit leaves enough time for the city itself, rather than rushing between viewpoints.</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li><strong>Nazareth:</strong> Visit the <Link to="/attractions/basilica-of-the-annunciation/" className={inlineLink}>Basilica of the Annunciation</Link>, then explore the old city at your own pace.</li>
          <li><strong>Lower Galilee:</strong> Add <Link to="/attractions/mount-tabor/" className={inlineLink}>Mount Tabor</Link> for its Church of the Transfiguration or <Link to="/attractions/tel-megiddo/" className={inlineLink}>Tel Megiddo</Link> for archaeology.</li>
          <li><strong>A wider northern day:</strong> Continue towards the <Link to="/travel-blog/sea-of-galilee/" className={inlineLink}>Sea of Galilee</Link>, perhaps visiting <Link to="/attractions/magdala/" className={inlineLink}>Magdala</Link> or <Link to="/attractions/yardenit/" className={inlineLink}>Yardenit</Link>.</li>
        </ul>
      </div>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>According to the Gospel of Luke (4:29–30), a crowd in Nazareth led Jesus towards a cliff after he spoke in the synagogue, intending to throw him down. The text says he passed through the crowd and went away. <strong>It does not identify this exact cliff</strong>; the association with Mount Precipice is a later Christian tradition.</p>
      <p>The mountain is also known as <em>Mount Kedumim</em> and <em>Jebel al-Qafzeh</em>. Its striking cliffs stand above the Jezreel Valley, and the slopes contain Qafzeh Cave, the site of important discoveries about early humans. The cave is protected and not open to visitors.</p>
      <p>The area has also been a modern pilgrimage gathering place. Pope Benedict XVI celebrated Mass here on 14 May 2009, and the amphitheatre on the hillside was built for that occasion. Today, the lookout offers both a place of reflection and a remarkable view of the Galilee landscape.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Mount Precipice is an easy scenic addition to a Nazareth day, but not every organised Galilee tour includes it. Look carefully at the itinerary and whether the lookout is an actual stop.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/nazareth-sea-of-galilee/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src="/images/attractions/nazareth-galilee.webp" alt="Religious artwork in Nazareth on a northern Israel sightseeing route" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Explore Nazareth and Galilee tours</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Compare tours and check whether Mount Precipice is included.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src={galileePhoto} alt="Hills of Galilee on a private sightseeing route" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Visit with a private driver</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Put together a route that suits your group's pace and interests.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "Is Mount Precipice free to visit?", a: "Yes. The hilltop lookout is a public open-air site with no entrance ticket." },
    { q: "How long does a Mount Precipice visit take?", a: "Allow 30–45 minutes for the main lookout and photographs, or longer if you continue to the Forester's House or take a walk along the ridge." },
    { q: "Can I drive to Mount Precipice?", a: "Yes. Follow the signs from Route 75 to the hilltop car park, then continue on foot along the paved path." },
    { q: "Can wheelchair users reach the lookout?", a: "KKL-JNF describes a wheelchair-accessible paved path to the Three Faiths Lookout. Conditions on the longer trails are different, so check your particular route." },
    { q: "Is this the exact cliff mentioned in the Gospel?", a: "Mount Precipice is traditionally associated with Luke 4:29–30, but the text does not identify the cliff precisely." },
    { q: "Can I enter Qafzeh Cave?", a: "No. The cave is a protected archaeological site and is not open to visitors." },
    { q: "Does the Gospel Trail return to the parking area?", a: "The full Gospel Trail continues away from the mountain towards the Kesullot Valley and beyond. Use the short hilltop paths for a return to the parking area." },
    { q: "What can I combine with Mount Precipice?", a: "Nazareth's Basilica of the Annunciation is a natural companion. Mount Tabor, Tel Megiddo or the Sea of Galilee can be added depending on your route and time." },
  ],
  nearby: [
    { label: "Basilica of the Annunciation", to: "/attractions/basilica-of-the-annunciation/", note: "Nazareth's landmark church and pilgrimage site." },
    { label: "Mount Tabor", to: "/attractions/mount-tabor/", note: "Visit the Church of the Transfiguration and enjoy summit views." },
    { label: "Tel Megiddo", to: "/attractions/tel-megiddo/", note: "Explore an archaeological park above the valley." },
    { label: "Magdala", to: "/attractions/magdala/", note: "Ancient town remains and modern chapels near the lake." },
    { label: "Yardenit", to: "/attractions/yardenit/", note: "Jordan River baptism at the southern Sea of Galilee." },
    { label: "Mount of Beatitudes", to: "/attractions/mount-of-beatitudes/", note: "Gardens and a hilltop church above the lake." },
  ],
  planningLinks: [
    { label: "Sea of Galilee guide", to: "/travel-blog/sea-of-galilee/", description: "Discover Tiberias and the northern holy sites.", icon: "region" },
    { label: "7-day Israel itinerary", to: "/travel-blog/israel-itinerary-7-days/", description: "Include Nazareth and Lower Galilee.", icon: "itinerary" },
    { label: "10-day Israel itinerary", to: "/travel-blog/israel-itinerary-10-days/", description: "Travel through Galilee with time to explore.", icon: "itinerary" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", description: "Prepare for weather and seasonal conditions.", icon: "seasons" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Compare driving, buses and organised travel.", icon: "transport" },
    { label: "Ben Gurion Airport arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/", description: "Plan your arrival and journey north.", icon: "arrival" },
  ],
  sources: [
    { label: "KKL-JNF — Mount of Precipice lookout and walking trails", url: mountPrecipiceSite.sources.kkl, note: "Parking approach, Three Faiths Lookout, paved paths, Forester's House and the Gospel Trail." },
    { label: "Jesus Trail — Mount Precipice", url: mountPrecipiceSite.sources.jesusTrail, note: "Christian tradition, panorama, prehistoric finds and the 2009 papal gathering." },
    { label: "Israel Ministry of Tourism — Nazareth", url: mountPrecipiceSite.sources.nazarethTourism, note: "Nazareth's religious history and Mount Precipice as part of a Galilee visit." },
  ],
};

export function MountPrecipiceAttractionPage() {
  return <AttractionDestinationPage content={mountPrecipiceDestinationContent} />;
}
