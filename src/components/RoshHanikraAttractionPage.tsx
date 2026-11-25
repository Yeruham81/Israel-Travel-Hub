import { ConsentIframe } from "@/components/ConsentIframe";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Footprints } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { roshHanikraSite } from "@/data/roshHanikraSite";
import haifaPhoto from "@/assets/haifa/panorama.webp";
import akkoPhoto from "@/assets/shore-excursions/akko-port.jpg";

const inlineLink = "font-semibold text-primary underline underline-offset-4";
const mapEmbed = "https://maps.google.com/maps?q=Rosh%20Hanikra%20Grottoes%2C%20Israel&hl=en&z=14&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Rosh%20Hanikra%20Grottoes%2C%20Israel&hl=en";
const drivingDirections = "https://www.google.com/maps/dir/?api=1&destination=Rosh%20Hanikra%20Grottoes%2C%20Israel&travelmode=driving";

export const roshHanikraDestinationContent: AttractionDestinationContent = {
  path: "/attractions/rosh-hanikra/",
  placeName: "Rosh Hanikra",
  title: roshHanikraSite.title,
  region: roshHanikraSite.region,
  updatedAt: roshHanikraSite.updatedAt,
  hero: roshHanikraSite.hero,
  intro: roshHanikraSite.intro,
  visitorTitle: "Tickets, seasonal hours and visitor information",
  visitorNavLabel: "Tickets & hours",
  historyTitle: "The sea caves and the old coastal railway",
  relatedTitle: "More stops for a northern Israel journey",
  contactIntroduction: "Tell me your travel date, pickup point, passengers and the coastal stops you would like to include. I can arrange a private day trip with a driver to Rosh Hanikra and the Western Galilee.",
  facts: [
    { icon: "location", label: "Location", value: "Northern Mediterranean coast", note: "End of Route 4, near the Lebanese border" },
    { icon: "duration", label: "Time needed", value: "60–90 minutes", note: "Cable car, grottoes and viewpoint; excluding travel" },
    { icon: "admission", label: "Entry", value: "₪47 adult", note: "Reduced admission ₪39; child with disability ₪29" },
    { icon: "hours", label: "Open daily", value: "Last entry 16:00 / 18:00", note: "Autumn–winter / summer; closes one hour later" },
    { icon: "highlights", label: "Main experience", value: "Cable car & grottoes", note: "Sea caves, historic tunnel and coastal views" },
    { icon: "access", label: "Accessibility", value: "Partly accessible", note: "The full grotto route has narrow passages and steps" },
  ],
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight
        title="The cable car down the white cliffs"
        image={{ src: "/images/attractions/rosh-hanikra-cable-car.webp", alt: "Red cable car beside the white chalk cliffs and surf at Rosh Hanikra" }}
      >
        <p>The visit begins with the cable car, which descends the cliff from the upper station towards the Mediterranean. The short ride gives you a close look at the striking contrast between the white rock and the blue sea.</p>
        <p>The cable car is part of the regular admission experience. Strong winds or operational restrictions may affect it, so check the <a href={roshHanikraSite.sources.info} target="_blank" rel="noopener noreferrer" className={inlineLink}>official visitor information</a> before setting out.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The turquoise sea grottoes"
        image={{ src: "/images/attractions/rosh-hanikra-blue-grotto.webp", alt: "Bright turquoise sea inside a naturally carved rock grotto at Rosh Hanikra" }}
      >
        <p>Inside the grottoes, waves enter narrow openings in the rock, and the changing light turns the water shades of blue and green. The sound and movement of the sea are part of what makes this a memorable visit.</p>
        <p>Walk at your own pace along the marked grotto route. Look for the natural formation known as <strong>Elephant's Foot</strong> and the textures cut into the chalk cliffs. Some sections have steps, low light and damp ground.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The railway tunnel and audiovisual presentation"
        image={{ src: "/images/attractions/rosh-hanikra-railway-tunnel.webp", alt: "Illuminated rock-cut tunnel at the Rosh Hanikra visitor site" }}
      >
        <p>Near the grottoes, the old railway tunnel recalls the line built through the headland during the Second World War to link Haifa with Beirut and Tripoli. Today the visitor experience includes an audiovisual presentation telling the story of the cliffs, caves and railway.</p>
              </AttractionHighlight>
      <AttractionHighlight
        title="The chalk headland above the Mediterranean"
        image={{ src: "/images/attractions/rosh-hanikra-cliffs.webp", alt: "White limestone and chalk cliffs at Rosh Hanikra rising directly from the Mediterranean Sea" }}
      >
        <p>The pale headland is a landmark of the northern coast. From the designated viewpoints, take in the layers of rock and deep-blue water, then look south along the Western Galilee coastline towards Achziv and Nahariya.</p>
        <p>Stay within the visitor areas and observe any posted border or security instructions; the location is immediately beside Israel's northern frontier.</p>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>A regular ticket includes the cable car, the self-guided grotto walk and the audiovisual presentation.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="rosh-hanikra-visitor-hours">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Seasonal visiting hours</h3>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">The site is open <strong>every day of the week</strong>. Last cable-car entry is at <strong>{roshHanikraSite.visit.lastCableAutumnWinter} in autumn and winter</strong> and <strong>{roshHanikraSite.visit.lastCableSummer} in summer</strong>. The site closes <strong>{roshHanikraSite.visit.closesAfterLastEntry}</strong> after the last entry.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">Daily hours are published on the <a href="https://www.rosh-hanikra.com/tq/en/" target="_blank" rel="noopener noreferrer" className={inlineLink}>official homepage</a> and may change on holidays or because of weather. Check them before your visit.</p>
          <a href={roshHanikraSite.sources.info} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Additional visitor information <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Tickets and contact</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed sm:text-base" aria-label="Admission prices">
            <li className="flex items-start justify-between gap-3"><span>Adult</span><strong className="shrink-0" dir="ltr">₪47</strong></li>
            <li className="flex items-start justify-between gap-3"><span>Child aged 3–17, soldier, senior citizen or visitor with a disability</span><strong className="shrink-0" dir="ltr">₪39</strong></li>
            <li className="flex items-start justify-between gap-3"><span>Child with a disability</span><strong className="shrink-0" dir="ltr">₪29</strong></li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">Child tickets are required from age 3. Admission includes the cable car, grotto walk and film. <a href={roshHanikraSite.sources.tickets} target="_blank" rel="noopener noreferrer" className={inlineLink}>Buy tickets on the official site</a>.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">The operator also offers a <a href={roshHanikraSite.sources.comboAkko} target="_blank" rel="noopener noreferrer" className={inlineLink}>combined ticket with Old Akko</a>. Akko entry can be used separately within seven days of purchase; Rosh Hanikra admission is for the selected visit day.</p>
          <p className="mt-3 text-sm"><strong>Visitor service: </strong><a href={"tel:" + roshHanikraSite.visit.customerServiceHref} dir="ltr" className={inlineLink}>{roshHanikraSite.visit.customerService}</a></p>
          <p className="mt-1 text-sm text-muted-foreground">Sunday–Thursday, 09:00–16:00</p>
        </article>
      </div>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="rosh-hanikra-visitor-essentials">
        <h3 className="font-serif text-xl font-semibold">Useful things to know before visiting</h3>
        <ul className="mt-3 grid list-disc gap-x-6 gap-y-2 pl-5 text-sm leading-relaxed sm:grid-cols-2 sm:text-base">
          <li><strong>Shoes:</strong> Wear comfortable shoes with grip for damp cave paths, steps and uneven areas.</li>
          <li><strong>Accessibility:</strong> A roughly 100-metre accessible bridge leads to the cable car. Wheelchair users can reach the first grotto and part of the second, but the remaining cave route is narrow and includes stairs. The film and toilets are accessible.</li>
          <li><strong>Clothing:</strong> The caves can feel cooler and wetter than the parking area, especially on windy days. A light layer is useful.</li>
          <li><strong>Swimming:</strong> The grottoes are not a swimming beach. Enjoy the water from the designated visitor paths.</li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed">For particular mobility requirements, contact the operator in advance and consult the <a href={roshHanikraSite.sources.accessibility} target="_blank" rel="noopener noreferrer" className={inlineLink}>official accessibility statement</a>.</p>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>Rosh Hanikra is at the <strong>northern end of Route 4</strong>, around 10 km north of Nahariya, beside the border with Lebanon. The visitor entrance and parking are at the upper cable-car station.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By car or private driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Follow Route 4 north of Nahariya to the signed Rosh Hanikra grottoes entrance. Parking is provided at the site; on busy days, leave time to find a space and join the cable-car queue. For a longer coastal route, <Link to="/car-rental/" className={inlineLink}>renting a car</Link> or <a href="#contact" className={inlineLink}>arranging a private driver</a> makes multiple stops easier.</p>
            <a href={drivingDirections} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Driving directions to the entrance <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By public transport</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Take a train to <strong>Nahariya</strong> and check the onward bus connection. Use the <a href="https://bus.gov.il/en/home" target="_blank" rel="noopener noreferrer" className={inlineLink}>official public transport planner</a> to check the current bus connection, walking distance to the upper station and return services.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">Walking through the site</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Use the cable car to reach the lower visitor area, then follow the signed cave path and return to the upper station. The grotto route has damp surfaces and uneven sections. Ask the staff about the accessible route if you cannot manage stairs.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="rosh-hanikra-location-map">
          <h3 className="text-sm font-semibold">Where is Rosh Hanikra?</h3>
          <ConsentIframe title="Google Maps location of the Rosh Hanikra grottoes and cable car" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56" />
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">View larger map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">A relaxed visit to Rosh Hanikra</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">Allow approximately <strong>60–90 minutes</strong> at the site, or longer if there is a cable-car queue or you prefer to take your time with the film and viewpoints.</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>Begin at the <strong>upper viewpoint</strong> and enjoy the view along the coast.</li>
          <li>Ride the <strong>cable car</strong> down the white cliff and follow the marked <strong>sea-grotto route</strong>.</li>
          <li>Watch the <strong>audiovisual presentation</strong> if available, then return to the upper station.</li>
        </ol>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">Combine Rosh Hanikra with the Western Galilee</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">For a full day, I recommend choosing a manageable two or three stops along the coast rather than spending most of your time in transit.</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li><strong>Classic Western Galilee day:</strong> Combine Rosh Hanikra and Achziv Beach with <Link to="/attractions/akko-acre/" className={inlineLink}>Old Akko</Link>, its markets, harbour and Crusader history.</li>
          <li><strong>Nearby coastal stop:</strong> Enjoy Nahariya and its seafront for a shorter, relaxed route.</li><li><strong>Continue towards Haifa:</strong> Explore the <Link to="/attractions/haifa/" className={inlineLink}>Bahá’í Gardens viewpoints and German Colony</Link> if you are heading south.</li>
        </ul>
      </div>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>The headland is formed from ancient marine sediments. Over time, waves and water worked into cracks in the pale rock, gradually creating the grottoes and passages visitors can see today. Changing light and sea conditions give the caves a different character from one visit to the next.</p>
      <p>During the Second World War, military engineers carved railway tunnels through the cliffs for the <strong>Haifa–Beirut–Tripoli railway</strong>. The line connected ports and military routes along the eastern Mediterranean; the connection across the border was interrupted in the events surrounding 1948.</p>
      <p>The historic rail tunnel and the modern grottoes walkway are different features of the headland. The visitor film explains part of this story, while the surrounding rock reveals a much older geological history.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>A northern coastal tour can include Rosh Hanikra, Akko and Haifa. Check whether your chosen route actually stops at the grottoes, whether admission is included and whether the cable car is operating on the date.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/caesarea-haifa-acre/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="rosh-hanikra-tours-card">
          <img src={akkoPhoto} alt="Harbour in Old Akko on a northern Israel coastal tour" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Explore northern coastal tours</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Compare Akko and Haifa itineraries; check which ones also visit Rosh Hanikra.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="rosh-hanikra-private-driver-card">
          <img src={haifaPhoto} alt="Panoramic view of Haifa and the Mediterranean coastline on a private driving route" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Plan a private coastal trip</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Tell me where you'll start and which stops you'd most like to see.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "Is Rosh Hanikra open for visits?", a: "Yes. The site is open daily, subject to changes for holidays, weather or temporary restrictions. Check the operator's latest opening hours before travelling." },
    { q: "What does the Rosh Hanikra ticket include?", a: "The standard entry experience includes the cable car, the self-guided grotto walk and an audiovisual presentation. Admission is ₪47 for adults, ₪39 for children under 18, soldiers, senior citizens and visitors with disabilities, and ₪29 for children with disabilities." },
    { q: "What are the opening hours?", a: "The site is open daily. Last cable-car entry is at 16:00 in autumn and winter and 18:00 in summer; the site closes one hour later. Check the official homepage for daily hours and changes due to holidays or weather." },
    { q: "How much time do I need?", a: "Allow about 60–90 minutes for the viewpoints, cable car, grotto walk and film, plus any queueing time." },
    { q: "Is Rosh Hanikra wheelchair accessible?", a: "Partly. There is an accessible bridge and cable-car access, and visitors using wheelchairs can reach the first grotto and part of the second. The remaining cave path has narrow passages and steps." },
    { q: "Can I visit the caves without taking the cable car?", a: "The regular ticket includes the cable car to the lower visitor area. Contact the site directly to discuss any alternative access arrangements required for your visit." },
    { q: "Is swimming permitted inside the grottoes?", a: "No. This is a visitor walking route through sea caves, not a designated bathing beach." },
    { q: "What else can I visit nearby?", a: "Achziv Beach, Nahariya and Old Akko make good nearby stops. Haifa is an option if you are travelling farther south." },
  ],
  nearby: [
    { label: "Old Akko", to: "/attractions/akko-acre/", note: "Harbour, markets and Crusader-era heritage south along the coast." },
    { label: "Haifa", to: "/attractions/haifa/", note: "Bahá'í Gardens viewpoints, the German Colony and the port." },
    { label: "Caesarea National Park", to: "/attractions/caesarea/", note: "A longer coastal drive to Roman ruins and the ancient harbour." },
    { label: "Basilica of the Annunciation", to: "/attractions/basilica-of-the-annunciation/", note: "Nazareth's landmark church on a wider northern Israel route." },
    { label: "Mount Precipice", to: "/attractions/mount-precipice/", note: "A Jezreel Valley panorama near Nazareth, farther inland." },
    { label: "Tel Megiddo", to: "/attractions/tel-megiddo/", note: "Ancient city remains and water system on a longer inland journey." },
  ],
  planningLinks: [
    { label: "Haifa visitor guide", to: "/attractions/haifa/", description: "See the Carmel, the gardens and the coast.", icon: "region" },
    { label: "7-day Israel itinerary", to: "/travel-blog/israel-itinerary-7-days/", description: "Build a balanced route through northern Israel.", icon: "itinerary" },
    { label: "10-day Israel itinerary", to: "/travel-blog/israel-itinerary-10-days/", description: "Allow more time for the Western Galilee.", icon: "itinerary" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", description: "Plan for weather and seasonal visiting hours.", icon: "seasons" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Compare trains, buses and private driving.", icon: "transport" },
    { label: "Ben Gurion Airport arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/", description: "Arrange your onward journey from the airport.", icon: "arrival" },
  ],
  sources: [
    { label: "Rosh Hanikra — official visitor information centre", url: roshHanikraSite.sources.info, note: "Current seasonal hours, local access, ticket conditions, parking and contact." },
    { label: "Rosh Hanikra — official tickets and entry experience", url: roshHanikraSite.sources.tickets, note: "Ticket booking, cable car, grottoes and audiovisual presentation." },
    { label: "Rosh Hanikra — official accessibility statement", url: roshHanikraSite.sources.accessibility, note: "Accessible bridge, cable car, partial grotto access and visitor facilities." },
    { label: "Rosh Hanikra and Old Akko — combined ticket", url: roshHanikraSite.sources.comboAkko, note: "Operator's combined coastal sightseeing option." },
    { label: "History of the Haifa–Beirut railway", url: roshHanikraSite.sources.railway, note: "Background on the railway tunnels and their wartime construction." },
  ],
};

export function RoshHanikraAttractionPage() {
  return <AttractionDestinationPage content={roshHanikraDestinationContent} />;
}
