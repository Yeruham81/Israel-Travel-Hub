import { ConsentIframe } from "@/components/ConsentIframe";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Footprints } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { annunciationSite } from "@/data/annunciationSite";
import nazarethPhoto from "@/assets/guides/2026-10/basilica-of-the-annunciation.webp";

const inlineLink = "font-semibold text-primary underline underline-offset-4";
const mapEmbed = "https://maps.google.com/maps?q=Basilica%20of%20the%20Annunciation%2C%20Nazareth%2C%20Israel&hl=en&z=16&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Basilica%20of%20the%20Annunciation%2C%20Nazareth%2C%20Israel&hl=en";
const drivingDirections = "https://www.google.com/maps/dir/?api=1&destination=Basilica%20of%20the%20Annunciation%2C%20Nazareth%2C%20Israel&travelmode=driving";

export const annunciationDestinationContent: AttractionDestinationContent = {
  path: "/attractions/basilica-of-the-annunciation/",
  placeName: "Basilica of the Annunciation",
  title: annunciationSite.title,
  region: annunciationSite.region,
  updatedAt: annunciationSite.updatedAt,
  hero: annunciationSite.hero,
  intro: annunciationSite.intro,
  visitorTitle: "Opening hours, admission and visiting information",
  visitorNavLabel: "Hours & visiting",
  historyTitle: "The Annunciation tradition and history of the basilica",
  relatedTitle: "Explore more around Nazareth and Lower Galilee",
  contactIntroduction: "Tell me your date, pickup point, group size and the places you want to see around Nazareth. I can arrange private transport or a day trip with a driver to the Basilica of the Annunciation and nearby sites.",
  facts: [
    { icon: "location", label: "Location", value: "Central Nazareth", note: "Catholic basilica near the old city" },
    { icon: "duration", label: "Time needed", value: "60–90 minutes", note: "Allow longer during worship services" },
    { icon: "admission", label: "Admission", value: "Free entry", note: "Church and main visitor areas" },
    { icon: "hours", label: "Visitor hours", value: annunciationSite.hours.generalVisitors, note: "Last entry " + annunciationSite.hours.lastEntry + "; check feast days" },
    { icon: "highlights", label: "What to see", value: "Two church levels", note: "Grotto, upper basilica and mosaics" },
    { icon: "access", label: "Accessibility", value: "Partly accessible", note: "Ask about the route between the levels" },
  ],
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight
        title="The Grotto of the Annunciation"
        image={{ src: "/images/attractions/annunciation-grotto.webp", alt: "Lower Basilica of the Annunciation with the ancient stone grotto and prayer area" }}
      >
        <p>The lower basilica is built around the grotto that Catholic tradition associates with Mary's home and the angel Gabriel's announcement in the Gospel of Luke. The grotto is the spiritual heart of the sanctuary, and its stone walls stand in contrast to the architecture above.</p>
        <p>Take a moment to look at the remains of earlier churches around the shrine. The grotto is a place of prayer. Keep your voice low and follow the attendants' instructions.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The upper basilica and its large mosaic"
        image={{ src: "/images/attractions/annunciation-upper-basilica.webp", alt: "Upper Basilica of the Annunciation with stained-glass windows and the colourful mosaic behind the altar" }}
      >
        <p>The upper basilica features striking modern architecture, stained-glass windows and a large mosaic above the altar. The two levels are visually linked by the opening beneath the dome.</p>
        <p>I recommend visiting both levels, from the quiet grotto below to the spacious, light-filled basilica above.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="Marian mosaics from around the world"
        image={{ src: "/images/attractions/annunciation-marian-mosaics.webp", alt: "Colourful international images of Mary displayed along the covered walkway at the Annunciation Basilica" }}
      >
        <p>The courtyard and covered walkways display images of Mary donated by Catholic communities around the world. The artworks vary in style, clothing and materials, reflecting artistic traditions from around the world.</p>
        <p>Look for the names of the contributing countries beneath the images. Each artwork reflects the artistic traditions of its country.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The distinctive dome"
        image={{ src: "/images/attractions/annunciation-dome.webp", alt: "Geometric concrete dome and stained-glass windows seen from inside the Basilica of the Annunciation" }}
      >
        <p>From inside the upper basilica, look up at the tall, lantern-like dome. Its geometric concrete structure and ring of windows draw light into the space directly above the grotto.</p>
        <p>Outside, the dome is one of Nazareth's most recognisable landmarks and is visible from several viewpoints around the city.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Archaeological remains and St. Joseph's Church">
        <p>The raised platform beside the basilica protects remains of the ancient village and connects the Annunciation sanctuary with the nearby <strong>Church of St. Joseph</strong>, another Franciscan church associated with the Holy Family.</p>
        <p>St. Joseph's Church has its own crypt and is well worth visiting while you're at the basilica.</p>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>The Catholic basilica is an active place of worship. Access to the upper church and lower grotto can differ during religious services. The <a href={annunciationSite.sources.cic} target="_blank" rel="noopener noreferrer" className={inlineLink}>Christian Information Center</a> publishes the regular visitor hours.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="annunciation-visitor-hours">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Opening hours and entry</h3>
          <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>Daily visitor hours:</strong> {annunciationSite.hours.generalVisitors} for the upper basilica and grotto, with <strong>last entry at {annunciationSite.hours.lastEntry}</strong>.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base"><strong>Sightseeing ends at 18:00.</strong> From <strong>{annunciationSite.hours.eveningPrayer}</strong>, the lower basilica is available for <strong>silent prayer only</strong>; the upper basilica is closed and these are not additional tourist visiting hours. Services and major celebrations may change access.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">The basilica closes at 15:00 on Holy Thursday and remains closed on Good Friday. Check the hours directly for Easter, Annunciation Day and any other special date.</p>
          <a href={annunciationSite.sources.cic} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Official visitor-hours listing <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Admission and contact</h3>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">Admission to the basilica is <strong>free</strong>. Groups planning a Mass, ceremony or guided religious activity should contact the sanctuary in advance.</p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">Would you like to attend Mass? Check the <a href={annunciationSite.sources.parish} target="_blank" rel="noopener noreferrer" className={inlineLink}>Nazareth parish's published Mass schedule</a> for the basilica, grotto and St. Joseph's Church; times may change for special celebrations.</p>
          <p className="mt-3 text-sm"><strong>Pilgrims' Office: </strong><a href={"tel:" + annunciationSite.pilgrimsOffice.href} dir="ltr" className={inlineLink}>{annunciationSite.pilgrimsOffice.phone}</a></p>
          <p className="mt-1 text-sm"><strong>Email: </strong><a href={"mailto:" + annunciationSite.pilgrimsOffice.email} className={inlineLink}>{annunciationSite.pilgrimsOffice.email}</a></p>
          <a href={annunciationSite.sources.custody} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Franciscan sanctuary information <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </article>
      </div>
      <AttractionPracticalTip>
        <strong>My planning tip:</strong> If there is a service in progress, visit the courtyard artwork first and return to the church when visitors are admitted. Keep at least an hour free for the grotto and the upper basilica.
      </AttractionPracticalTip>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="annunciation-visitor-essentials">
        <h3 className="font-serif text-xl font-semibold">Useful things to know before visiting</h3>
        <ul className="mt-3 grid list-disc gap-x-6 gap-y-2 pl-5 text-sm leading-relaxed sm:grid-cols-2 sm:text-base">
          <li><strong>Dress:</strong> Wear modest clothing that covers your shoulders and knees.</li>
          <li><strong>Photography:</strong> Follow posted rules, avoid flash when requested and give worshippers privacy during prayer.</li>
          <li><strong>Accessibility:</strong> The modern upper level is easier to access than some ancient sections. Ask staff about lifts, the grotto and the best step-free route for your needs.</li>
          <li><strong>Other spaces:</strong> St. Joseph's Church has separate visiting arrangements. The archaeological museum displays finds from earlier churches and can be <strong>visited on request</strong> through the Franciscan convent. See the <a href={annunciationSite.sources.custody} target="_blank" rel="noopener noreferrer" className={inlineLink}>sanctuary's visitor information</a>.</li>
        </ul>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>The basilica is near <strong>Al-Bishara Street</strong> in central Nazareth. Look for its entrance along <strong>Casa Nova Street</strong>, opposite the Franciscan Casa Nova guesthouse. For navigation, specify the <strong>Catholic Basilica of the Annunciation</strong> to avoid confusion with the Greek Orthodox Church of the Annunciation near Mary's Well.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By car or private driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">The old-city streets can be narrow and busy. If travelling with a driver, use <strong>Casa Nova Street</strong> as a landmark and arrange a suitable nearby drop-off. Drivers should use an authorised stopping place. Allow time for the final walk to the entrance.</p>
            <a href={drivingDirections} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Driving directions to the basilica <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By public transport</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Many buses serve the <strong>Nazareth Central Station / Paul VI Street</strong> area, within walking distance of the church. Check where your particular service stops, the walking approach and the return journey through the <a href="https://bus.gov.il/en/home" target="_blank" rel="noopener noreferrer" className={inlineLink}>official public transport planner</a>. For a wider Galilee day, you can also <Link to="/car-rental/" className={inlineLink}>rent a car</Link>, <Link to="/tours/nazareth-sea-of-galilee/" className={inlineLink}>compare Nazareth tours</Link> or <a href="#contact" className={inlineLink}>arrange a private driver</a>.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">On foot in Nazareth</h3></div>
            <p className="mt-2 text-sm leading-relaxed">The basilica is a good starting point for exploring Nazareth's old city and market on foot. St. Joseph's Church is in the same Franciscan complex, while the Greek Orthodox Annunciation church and Mary's Well are a separate walk through central Nazareth.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="annunciation-location-map">
          <h3 className="text-sm font-semibold">Where is the basilica?</h3>
          <ConsentIframe title="Google Maps location of the Catholic Basilica of the Annunciation in Nazareth" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56" />
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">View larger map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">A relaxed visit to the basilica</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">Allow about <strong>60–90 minutes</strong> for the basilica, with extra time if you plan to attend a service.</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>Begin at the <strong>lower basilica</strong> and view the Grotto of the Annunciation respectfully.</li>
          <li>Continue to the <strong>upper church</strong> for the monumental mosaic, stained glass and dome.</li>
          <li>Walk around the courtyard to see the <strong>international Marian artworks</strong>, then visit St. Joseph's Church if it is open.</li>
        </ol>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">Combine Nazareth with a day in Lower Galilee</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">For a full day, I recommend choosing three to five stops based on where you start and how long you would like to spend at each. These sites fit well into a Nazareth and Galilee itinerary:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li><strong>In Nazareth:</strong> Explore the old city, then visit <Link to="/attractions/mount-precipice/" className={inlineLink}>Mount Precipice</Link> for views over the Jezreel Valley.</li>
          <li><strong>Lower Galilee:</strong> Combine Nazareth with <Link to="/attractions/mount-tabor/" className={inlineLink}>Mount Tabor</Link> or the archaeology of <Link to="/attractions/tel-megiddo/" className={inlineLink}>Tel Megiddo</Link>.</li>
          <li><strong>On a longer northern route:</strong> Continue towards <Link to="/attractions/magdala/" className={inlineLink}>Magdala</Link>, <Link to="/attractions/yardenit/" className={inlineLink}>Yardenit</Link> or the <Link to="/attractions/sea-of-galilee/" className={inlineLink}>Sea of Galilee</Link>.</li>
        </ul>
      </div>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>According to Luke 1:26–38, the angel Gabriel announced to Mary in Nazareth that she would bear Jesus. Catholic tradition venerates the grotto beneath the basilica as the place of this event. The Gospel does not identify the precise cave; the association belongs to the Christian history of the site.</p>
      <p>The sanctuary stands above remains of earlier structures, including a Byzantine church and a larger Crusader church. Archaeological finds such as mosaics and inscriptions attest to centuries of Christian devotion in Nazareth, while the Grotto retains its particular religious significance.</p>
      <p>The Franciscans established a church here in the eighteenth century. The present basilica, designed by the Italian architect <strong>Giovanni Muzio</strong>, was completed in <strong>1969</strong>. Its two-level design preserves the ancient remains while creating a large modern church for the local community and pilgrims.</p>
      <p>Nazareth also has a separate Greek Orthodox tradition associated with the Church of St. Gabriel near Mary's Well. These two Annunciation sanctuaries are distinct places, each with its own history and visiting arrangements.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Many Nazareth and Galilee tours visit the Basilica of the Annunciation. Choose a tour that allows time for both the grotto and upper basilica, bearing in mind that access may change during services.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/nazareth-sea-of-galilee/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src="/images/attractions/mount-precipice-jezreel-view.webp" alt="View across the Jezreel Valley from Mount Precipice near Nazareth on a northern Israel tour" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Explore Nazareth and Galilee tours</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Compare guided itineraries, durations and included stops.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src={nazarethPhoto} alt="Dome of the Basilica of the Annunciation seen above Nazareth" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Visit with a private driver</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Plan a flexible route around your favourite Nazareth and Galilee stops.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "Is entry to the Basilica of the Annunciation free?", a: "Yes. General visitor entry is free. Religious group arrangements or guided experiences should be coordinated separately." },
    { q: "What are the basilica's opening hours?", a: "Regular sightseeing is 08:00–18:00 daily, with last entry at 17:45. The lower basilica's 18:00–21:00 access is for silent prayer, not sightseeing. Services and feast days may change hours." },
    { q: "How much time should I allow?", a: "About 60–90 minutes for the grotto, upper basilica and courtyard art. Allow more if you attend worship or explore nearby Nazareth sites." },
    { q: "Can visitors see the grotto?", a: "The grotto can be viewed from the lower sanctuary during normal visitor access. Follow any barriers or restrictions, particularly during services." },
    { q: "Can I visit St. Joseph's Church at the same time?", a: "It is next to the basilica within the Franciscan complex. Check its own access arrangements before entering." },
    { q: "Is the basilica accessible to wheelchair users?", a: "Much of the modern upper level is accessible, but the grotto and ancient areas are more challenging. Ask onsite staff about the best available route and lifts." },
    { q: "Is this the church near Mary's Well?", a: "No. This is the Catholic Basilica of the Annunciation. The Greek Orthodox Church of the Annunciation near Mary's Well is a different sanctuary." },
    { q: "Where can I arrange a Mass or group prayer?", a: "Contact the Franciscan Pilgrims' Office before your visit to coordinate a Mass, special ceremony or group prayer." },
  ],
  nearby: [
    { label: "Mount Precipice", to: "/attractions/mount-precipice/", note: "A panoramic stop over the Jezreel Valley just outside Nazareth." },
    { label: "Mount Tabor", to: "/attractions/mount-tabor/", note: "Explore the Church of the Transfiguration and hilltop views." },
    { label: "Tel Megiddo", to: "/attractions/tel-megiddo/", note: "Visit an ancient city and its remarkable water system." },
    { label: "Magdala", to: "/attractions/magdala/", note: "A first-century town and lakeside prayer complex." },
    { label: "Yardenit", to: "/attractions/yardenit/", note: "Jordan River baptism at the southern Sea of Galilee." },
    { label: "Mount of Beatitudes", to: "/attractions/mount-of-beatitudes/", note: "Gardens and a church overlooking the lake." },
  ],
  planningLinks: [
    { label: "Sea of Galilee travel guide", to: "/attractions/sea-of-galilee/", description: "Discover Tiberias and other holy sites.", icon: "region" },
    { label: "7-day Israel itinerary", to: "/travel-blog/israel-itinerary-7-days/", description: "Include Nazareth and northern Israel.", icon: "itinerary" },
    { label: "10-day Israel itinerary", to: "/travel-blog/israel-itinerary-10-days/", description: "Travel through Galilee at a gentler pace.", icon: "itinerary" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", description: "Plan for seasons and feast days.", icon: "seasons" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Compare buses, driving and tours.", icon: "transport" },
    { label: "Ben Gurion Airport arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/", description: "Plan your airport connections.", icon: "arrival" },
  ],
  sources: [
    { label: "Custody of the Holy Land — Basilica of the Annunciation", url: annunciationSite.sources.custody, note: "Architecture, grotto, church levels, Marian art and sanctuary information." },
    { label: "Christian Information Center — shrine visiting hours", url: annunciationSite.sources.cic, note: "Visitor hours, last entry, prayer times and special closures." },
    { label: "Franciscan Nazareth sanctuary visitor brochure", url: annunciationSite.sources.brochure, note: "Historic church phases, archaeology, visitor spaces and pilgrimage information." },
    { label: "Latin Patriarchate — Nazareth Parish", url: annunciationSite.sources.parish, note: "Parish contact information and scheduled Masses." },
  ],
};

export function AnnunciationAttractionPage() {
  return <AttractionDestinationPage content={annunciationDestinationContent} />;
}
