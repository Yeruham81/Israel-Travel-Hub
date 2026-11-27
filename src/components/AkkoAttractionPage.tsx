import { ConsentIframe } from "@/components/ConsentIframe";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Clock3, Footprints, Ticket } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { akkoSite } from "@/data/akkoSite";
import { AkkoAttractionsMap } from "@/components/AkkoAttractionsMap";
import { ExternalTourCard } from "@/components/TourCatalog";
import { tourProducts } from "@/data/registry";

const official = akkoSite.official;
const info = akkoSite.visitor;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const drivingDirections = "https://www.google.com/maps/dir/?api=1&destination=Old%20Akko%20Visitors%20Center%2C%20Weizmann%201%2C%20Akko%2C%20Israel&travelmode=driving";
const walkingMap = "https://www.akko.org.il/wp-content/uploads/2021/12/old-akko-eng.-map.pdf";
const mapRoute = (origin: string, waypoints: string[], destination: string) => "https://www.google.com/maps/dir/?api=1&travelmode=walking&origin=" + encodeURIComponent(origin) + "&destination=" + encodeURIComponent(destination) + "&waypoints=" + encodeURIComponent(waypoints.join("|"));
const shortWalk = mapRoute("Old Akko Visitors Center Weizmann 1 Acre Israel",["Knights Halls Acre Israel","Old Akko Market Israel","Templars Tunnel Asher 37 Akko Israel"],"Akko Fishing Port Israel");
const fullWalk = mapRoute("Old Akko Visitors Center Weizmann 1 Acre Israel",["Knights Halls Acre Israel","Al Basha Turkish Bath Acre Israel","Al Jazzar Mosque Acre Israel","Old Akko Market Israel","Ramchal Synagogue Acre Israel"],"Akko Fishing Port Israel");
const gentleWalk = mapRoute("Old Akko Visitors Center Acre Israel",["Old Akko Market Israel"],"Akko Fishing Port Israel");
const featuredAkkoTours = ["north-coast-small-group", "caesarea-haifa-akko", "coast-coach-tel-aviv"].map(id => tourProducts.find(tour => tour.id === id)!);
const images = {
  knights: "/images/attractions/akko-knights-halls.webp",
  tunnel: "/images/attractions/akko-templar-tunnel.webp",
  bath: "/images/attractions/akko-turkish-bath.webp",
  mosque: "/images/attractions/akko-al-jazzar-mosque.webp",
  market: "/images/attractions/akko-market.webp",
  harbour: "/images/attractions/akko-fishing-harbour.webp",
  museum: "/images/attractions/akko-treasures-museum.webp",
  ramchal: "/images/attractions/akko-ramchal-synagogue.webp",
} as const;

export const akkoDestinationContent: AttractionDestinationContent = {
  path: "/attractions/akko-acre/",
  placeName: "Old Akko",
  title: akkoSite.title,
  heroTitle: "Old Akko (Acre): Attractions & Walking Guide",
  highlightsTitle: "What to see in Old Akko",
  region: akkoSite.region,
  updatedAt: akkoSite.updatedAt,
  hero: akkoSite.hero,
  intro: akkoSite.intro,
  itineraryBeforeHighlights: true,
  itineraryTitle: "Walking routes & map of Old Akko",
  visitorTitle: "Tickets, opening hours and accessibility",
  visitorNavLabel: "Tickets & hours",
  historyTitle: "Crusader and Ottoman heritage",
  relatedTitle: "Explore northern Israel",
  navigationSections: [
    ["visit-plan", "Walking routes & map"],
    ["highlights", "What to see"],
    ["visitor-info", "Tickets & hours"],
    ["getting-there", "Getting there"],
    ["food", "Food & markets"],
    ["practical", "Practical tips"],
    ["history", "History"],
    ["tours", "Guided tours"],
    ["faq", "Questions"],
    ["nearby", "Explore the north"],
    ["trip-planning", "Plan your trip"],
    ["contact", "Contact me"],
  ],
  contactIntroduction: "Tell me your travel date, pickup point, passenger count and the historic sites you want to see. I can arrange private transport or a day trip with a driver to Akko and nearby attractions.",
  facts: [
    { icon: "location", label: "Location", value: "Old Akko (Acre)", note: "Walled Mediterranean old town, north of Haifa" },
    { icon: "duration", label: "Time needed", value: "3–6 hours", note: "From a short walk to a full day of sightseeing" },
    { icon: "admission", label: "Combined ticket", value: info.comboAdult, note: "For the main heritage sites and museums" },
    { icon: "hours", label: "Main sites", value: "From 09:00", note: "Most close at 17:00; Friday at 16:00" },
    { icon: "highlights", label: "Don't miss", value: "Crusader & Ottoman", note: "Knights’ Halls, tunnel, market and harbour" },
    { icon: "access", label: "Getting around", value: "On foot", note: "Uneven lanes; some attractions have restrictions" },
  ],
  glanceNote: <>I recommend starting at the <a href={official.visitors} target="_blank" rel="noopener noreferrer" className={inlineLink}>Old Akko Visitors Center</a> (Weizmann Street 1), where you can pick up a walking map. The ticketed heritage sites are close together, and you can explore the market and harbour freely between visits.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight mobileImageFirst
        title="Knights’ Halls - the Hospitaller Fortress"
        image={{ src: images.knights, alt: "Stone arches and vaulted Crusader halls in the Hospitaller Fortress of Old Akko" }}
      >
        <p>I recommend starting here. Beneath the later Ottoman citadel lies an extensive Crusader complex of vaulted halls, columns and courtyards that brings the medieval port city to life.</p>
        <p>The self-guided visit includes an audio guide in several languages. Allow around an hour if you enjoy history and want to explore the rooms without rushing. <a href={official.knights} target="_blank" rel="noopener noreferrer" className={inlineLink}>Official Knights’ Halls information</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Included in the combined ticket</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst
        title="Templars’ Tunnel"
        image={{ src: images.tunnel, alt: "Illuminated medieval stone passage in the Templars’ Tunnel beneath Old Akko" }}
      >
        <p>Walk through the restored underground passage that links the Templars’ former stronghold with the harbour area. Afterwards, continue to the nearby market or waterfront.</p>
        <p><strong>Accessibility:</strong> The tunnel is temporarily inaccessible for wheelchair users. <a href={official.accessibility} target="_blank" rel="noopener noreferrer" className={inlineLink}>Check the latest notice</a> before visiting.</p>
        <p className="text-xs font-semibold text-muted-foreground">Included in the combined ticket</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst
        title="Al-Basha Turkish Bath"
        image={{ src: images.bath, alt: "Historic domed bathing chambers inside Al-Basha Turkish Bath in Old Akko" }}
      >
        <p>Explore the restored Ottoman bathhouse and learn how bathing traditions shaped daily life and social gatherings in Akko.</p>
        <p>I recommend visiting the bathhouse after exploring the Crusader sites. <a href={official.bath} target="_blank" rel="noopener noreferrer" className={inlineLink}>See the official Turkish Bath guide</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Included in the combined ticket</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst
        title="Al-Jazzar Mosque"
        image={{ src: images.mosque, alt: "Green dome, minaret and courtyard of Al-Jazzar Mosque in Old Akko" }}
      >
        <p>Built during the Ottoman period, Al-Jazzar Mosque is one of the most distinctive buildings in the old city, with a peaceful courtyard and a striking green dome.</p>
        <p>Visitors should dress respectfully and check access around prayer times. Admission is <strong>separate</strong> from the heritage-site ticket. <a href={official.mosque} target="_blank" rel="noopener noreferrer" className={inlineLink}>Learn about Akko’s historic mosques</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Separate admission</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst
        title="Old market, Turkish Bazaar and lanes"
        image={{ src: images.market, alt: "Traditional street market and shops in the narrow lanes of Old Akko" }}
      >
        <p>Akko's lively market is one of the best places to experience local life. Walk between spice shops, bakeries, small food stalls and stone passageways, and take time to enjoy the local atmosphere.</p>
        <p>I would leave time for a food stop between museum visits. <a href={official.market} target="_blank" rel="noopener noreferrer" className={inlineLink}>Old Akko market information</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Free entry</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst
        title="The fishing harbour, sea walls and waterfront"
        image={{ src: images.harbour, alt: "Fishing boats and historic stone waterfront buildings in the harbour of Old Akko" }}
      >
        <p>Finish the day by the fishing boats in the historic harbour, then explore the sea gate and city walls overlooking the Mediterranean.</p>
        <p>Look for the historic Khan al-Umdan nearby, a landmark caravanserai associated with the port. Check which historic buildings are open to visitors. <a href={official.harbour} target="_blank" rel="noopener noreferrer" className={inlineLink}>Port and marina history</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Free entry</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst
        title="Treasures in the Wall Museum"
        image={{ src: images.museum, alt: "Collection of antique metal padlocks on display at the Treasures in the Wall Museum in Old Akko" }}
      >
        <p>Housed inside part of the eastern city wall, this museum presents everyday life in earlier generations through old trades, household objects and recreated shops. It is especially rewarding if you enjoy local crafts and social history.</p>
        <p><a href={official.museum} target="_blank" rel="noopener noreferrer" className={inlineLink}>Official museum details</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Included in the combined ticket</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst
        title="Ramchal Synagogue and Jewish Heritage Center"
        image={{ src: images.ramchal, alt: "Historic Ramchal Synagogue in the heart of Old Akko" }}
      >
        <p>This small historic site tells the story of Rabbi Moshe Chaim Luzzatto (the Ramchal) and Akko's Jewish heritage during the Crusader and Ottoman periods.</p>
        <p>The synagogue and heritage center are <strong>closed on Saturdays and <Link to="/travel-blog/calendar-of-events/" className={inlineLink}>Jewish holidays</Link></strong>. <a href={official.ramchal} target="_blank" rel="noopener noreferrer" className={inlineLink}>Check the official visitor information</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Included in the combined ticket; check opening days</p>
      </AttractionHighlight>
      <AttractionPracticalTip>
        For a first visit, I would prioritise the Knights’ Halls, one or two other heritage sites from this guide, then spend some time in the market and along the harbour.
      </AttractionPracticalTip>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>The combined ticket is useful if you plan to enter several historic sites. The old market and waterfront can also be enjoyed without a heritage-site ticket.</p>
      <div className="grid gap-3 md:grid-cols-2" data-testid="akko-ticket-hours">
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Ticket className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">Combined heritage ticket</h3></div>
          <p className="mt-3 text-2xl font-bold text-primary">{info.comboAdult} <span className="text-sm font-normal text-muted-foreground">per person (published package price)</span></p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">Includes Knights’ Halls, Templars’ Tunnel, Turkish Bath, Treasures in the Wall, Okashi Art Museum and the Ramchal Synagogue and Jewish Heritage Center. Eligible discounts or special packages may differ.</p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>Not included:</strong> Al-Jazzar Mosque and the Underground Prisoners Museum charge separately. The old market and harbour are public spaces.</p>
          <a href={official.attractions} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">View official tickets and visitor information <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></a>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">Published opening hours</h3></div>
          <dl className="mt-3 space-y-2 text-sm sm:text-base">
            <div className="flex justify-between gap-3"><dt>Sunday–Thursday & Saturday</dt><dd className="shrink-0 font-semibold" dir="ltr">{info.regularHours}</dd></div>
            <div className="flex justify-between gap-3"><dt>Friday & holiday eves</dt><dd className="shrink-0 font-semibold" dir="ltr">{info.fridayHours}</dd></div>
            <div className="flex justify-between gap-3"><dt>Ticket office</dt><dd className="shrink-0 font-semibold">Closes 1 hour earlier</dd></div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">The Ramchal Synagogue and Heritage Center are closed on Saturdays and Jewish holidays. Festival dates, holidays and individual attractions may have different hours.</p>
          <a href={official.hours} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">Check current site-by-site hours <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></a>
        </article>
      </div>
      <div role="region" aria-label="Old Akko attraction hours and admission" tabIndex={0} className="max-w-full overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary" data-testid="akko-hours-admission-table">
        <table className="w-full min-w-[830px] border-collapse text-left text-sm">
          <caption className="sr-only">Old Akko attractions: published opening times, admission and visit planning</caption>
          <thead className="bg-secondary/60"><tr>{["Attraction", "Published hours", "Admission", "Planning notes"].map((label,index) => <th key={label} scope="col" className={index===0 ? "sticky left-0 z-10 border-b bg-secondary px-3 py-3 font-semibold" : "border-b px-3 py-3 font-semibold"}>{label}</th>)}</tr></thead>
          <tbody>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 font-semibold">Knights’ Halls</th><td className="px-3 py-3">Sun–Thu & Sat 09:00–17:00; Fri 09:00–16:00</td><td className="px-3 py-3">Combined ticket · ₪55 adult</td><td className="px-3 py-3">Allow around 60 minutes; some historic areas have steps · <a href={official.knights} target="_blank" rel="noopener noreferrer" className={inlineLink}>Official details</a></td></tr>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 font-semibold">Templars’ Tunnel</th><td className="px-3 py-3">Sun–Thu & Sat 09:00–17:00; Fri 09:00–16:00</td><td className="px-3 py-3">Combined ticket</td><td className="px-3 py-3">Short underground visit; temporary wheelchair restriction · <a href={official.accessibility} target="_blank" rel="noopener noreferrer" className={inlineLink}>Access updates</a></td></tr>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 font-semibold">Al-Basha Turkish Bath</th><td className="px-3 py-3">Sun–Thu & Sat 09:00–17:00; Fri 09:00–16:00</td><td className="px-3 py-3">Combined ticket</td><td className="px-3 py-3">Indoor historical presentation · <a href={official.bath} target="_blank" rel="noopener noreferrer" className={inlineLink}>Official details</a></td></tr>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 font-semibold">Al-Jazzar Mosque</th><td className="px-3 py-3">Visitor access around prayer times</td><td className="px-3 py-3">Separate admission</td><td className="px-3 py-3">Respect worship times and dress requirements · <a href={official.mosque} target="_blank" rel="noopener noreferrer" className={inlineLink}>Official details</a></td></tr>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 font-semibold">Old Market & Turkish Bazaar</th><td className="px-3 py-3">Individual stalls set their own hours</td><td className="px-3 py-3">Free to browse</td><td className="px-3 py-3">Food and shopping; busiest during daytime · <a href={official.market} target="_blank" rel="noopener noreferrer" className={inlineLink}>Market details</a></td></tr>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 font-semibold">Fishing harbour & sea walls</th><td className="px-3 py-3">Public outdoor waterfront</td><td className="px-3 py-3">Free</td><td className="px-3 py-3">Enjoy views and a meal · <a href={official.harbour} target="_blank" rel="noopener noreferrer" className={inlineLink}>Harbour details</a></td></tr>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 font-semibold">Treasures in the Wall</th><td className="px-3 py-3">Confirm museum opening with operator</td><td className="px-3 py-3">Combined ticket</td><td className="px-3 py-3">Ethnographic museum · <a href={official.museum} target="_blank" rel="noopener noreferrer" className={inlineLink}>Museum details</a></td></tr>
            <tr><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 font-semibold">Ramchal Synagogue & Heritage Center</th><td className="px-3 py-3">Sun–Thu 09:00–17:00; Fri 09:00–16:00; closed Sat & Jewish holidays</td><td className="px-3 py-3">Combined ticket</td><td className="px-3 py-3">Historic synagogue and small heritage center · <a href={official.ramchal} target="_blank" rel="noopener noreferrer" className={inlineLink}>Official details</a></td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm leading-relaxed">The managed sites generally close their ticket offices one hour before closing. For festival dates and <Link to="/travel-blog/calendar-of-events/" className={inlineLink}>Jewish holidays</Link>, check <a href={official.hours} target="_blank" rel="noopener noreferrer" className={inlineLink}>current site-by-site hours</a> before your visit.</p>
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="akko-booking">
        <h3 className="font-serif text-xl font-semibold">Where to buy tickets</h3>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">You can buy the combined ticket online in advance or at the Visitors Center ticket office and machines. Each heritage site has its own entrance; show your ticket when visiting the included attractions.</p>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">The Visitors Center is at <strong>{info.centerAddress}</strong>. <a href={official.visitors} target="_blank" rel="noopener noreferrer" className={inlineLink}>Visitor center details</a>.</p>
      </div>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="akko-accessibility">
        <h3 className="font-serif text-xl font-semibold">Accessibility and visitor facilities</h3>
        <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed sm:columns-2 sm:gap-x-6 sm:text-base [&>li]:mb-2 [&>li]:break-inside-avoid">
          <li><strong>Walking:</strong> Much of the old city is pedestrian-friendly, but historic stone paving, steps and narrow passages can be uneven.</li>
          <li><strong>Wheelchair access:</strong> Several managed sites have accessible entrances, lifts and ramps. Arrange a suitable sequence with the Visitors Center.</li>
          <li><strong>Knights’ Halls:</strong> Much of the complex is accessible; the Prisoners Hall and escape tunnel have restrictions.</li>
          <li><strong>Restrooms:</strong> Accessible toilets are listed at the Enchanted Garden and the Ramchal visitor center.</li>
          <li><strong>Alternative walk:</strong> Start with the <a href="#visit-plan" className={inlineLink}>market and waterfront route</a>, and confirm accessible street connections with the Visitors Center.</li>
          <li><strong>Religious sites:</strong> Dress respectfully and be mindful of services and prayer times.</li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed">For specific accessibility arrangements, consult the <a href={official.accessibility} target="_blank" rel="noopener noreferrer" className={inlineLink}>official access page</a> or contact the site team at <a href="tel:+97249956706" className={inlineLink} dir="ltr">{info.phone}</a>.</p>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>The historic sites are concentrated inside Old Akko. I recommend heading to the <strong>Visitors Center at Weizmann Street 1</strong>, then exploring the other attractions on foot. Individual lanes are much easier to navigate without a car.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]" data-testid="akko-transport">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">By train or bus</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Akko railway station is outside the old town. Continue by local bus, taxi or a longer walk to the walled city. Check services on your travel date, particularly for Friday afternoons, Shabbat and holidays, using the <a href="https://www.rail.co.il/" target="_blank" rel="noopener noreferrer" className={inlineLink}>rail operator</a> and <a href="https://bus.gov.il/en/home" target="_blank" rel="noopener noreferrer" className={inlineLink}>official public transport planner</a>.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">By car or private driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Use car parks near the Visitors Center and enjoy the historic lanes on foot. Nearby options include <strong>Moat Parking (free)</strong> and the <strong>Eucalyptus car park (paid parking)</strong>. For a private transfer or multi-stop day out, <a href="#contact" className={inlineLink}>contact me</a>.</p>
            <a href={drivingDirections} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">Directions to the Visitors Center <ArrowUpRight className="h-3.5 w-3.5"/></a>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary"/><h3 className="font-semibold">Walking between sites</h3></div>
            <p className="mt-2 text-sm leading-relaxed">The main highlights are close enough to combine in a half-day walking visit. Pick up the operator's map at the Visitors Center or open the <a href={walkingMap} target="_blank" rel="noopener noreferrer" className={inlineLink}>official Old Akko walking map</a> on your phone.</p>
          </article>
        </div>
        <aside className="rounded-xl border bg-card p-4" data-testid="akko-arrival-map">
          <h3 className="font-serif text-lg font-semibold">Arrival points on Google Maps</h3>
          <p className="mt-2 text-sm leading-relaxed">The Visitors Center on Weizmann Street is the easiest starting point for a heritage visit. Compare nearby parking and rail access using the map.</p>
          <ConsentIframe title="Google Maps overview of Old Akko Visitors Center and nearby car parks" src="https://maps.google.com/maps?q=Old%20Akko%20Visitors%20Center%20Weizmann%201%20Akko%20Israel&hl=en&z=15&t=m&output=embed" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-3 h-48 w-full rounded-lg border-0 sm:h-52"/>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            <li><a href={drivingDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Old Akko Visitors Center - Weizmann St 1</a></li>
            <li><a href="https://www.google.com/maps/dir/?api=1&destination=Moat%20Parking%20Old%20Akko%20Israel&travelmode=driving" target="_blank" rel="noopener noreferrer" className={inlineLink}>Moat car park - free parking</a></li>
            <li><a href="https://www.google.com/maps/dir/?api=1&destination=Eucalyptus%20Parking%20Akko%20Israel&travelmode=driving" target="_blank" rel="noopener noreferrer" className={inlineLink}>Eucalyptus car park - check local fees</a></li>
            <li><a href="https://www.google.com/maps/dir/?api=1&destination=Akko%20Train%20Station%20Israel" target="_blank" rel="noopener noreferrer" className={inlineLink}>Akko railway station</a></li>
          </ul>
          <a href={official.faq} target="_blank" rel="noopener noreferrer" className={"mt-3 inline-block text-sm " + inlineLink}>Official arrival and parking information</a>
        </aside>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <p>Old Akko is compact enough to explore on foot. Choose a route that matches your time and the heritage sites you want to enter.</p>
      <div className="grid gap-3 md:grid-cols-2" data-testid="akko-walking-routes">
        <article className="rounded-xl border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">Historic highlights - around 3 hours</h3></div>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
            <li>Start at <strong>Old Akko Visitors Center</strong> on Weizmann Street 1 and arrange your combined ticket.</li>
            <li>Explore the <strong>Knights’ Halls</strong> and Crusader vaults.</li>
            <li>Continue through the <strong>Old Market</strong> and surrounding lanes.</li>
            <li>Visit the <strong>Templars’ Tunnel</strong> using the entrance indicated on your ticket.</li>
            <li>Finish by the <strong>fishing harbour</strong> and sea walls.</li>
          </ol>
          <a href={shortWalk} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">Open short route in Google Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></a>
        </article>
        <article className="rounded-xl border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">A fuller historic visit - 5–6 hours</h3></div>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
            <li>Begin at the <strong>Visitors Center and Knights’ Halls</strong>.</li>
            <li>Explore the <strong>Al-Basha Turkish Bath</strong> and Ottoman heritage.</li>
            <li>Continue to <strong>Al-Jazzar Mosque</strong> when visitor access permits.</li>
            <li>Enjoy the <strong>Old Market</strong> and a food break.</li>
            <li>Choose <strong>Treasures in the Wall</strong> or the <strong>Ramchal Synagogue</strong> according to their opening hours.</li>
            <li>Walk towards the <strong>harbour</strong>; add the Templars’ Tunnel if time permits.</li>
          </ol>
          <a href={fullWalk} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">Open fuller route in Google Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></a>
        </article>
      </div>
      <AkkoAttractionsMap />
      <article className="rounded-xl border bg-secondary/20 p-4 sm:p-5" data-testid="akko-gentler-walk">
        <h3 className="font-serif text-xl font-semibold">A gentler option - market and waterfront</h3>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">Begin near the Visitors Center, browse the Old Market and continue towards the harbour. This outdoor route avoids several underground attractions and lets you stop for breaks. Expect uneven stone paving and some slopes; contact the <a href={official.accessibility} target="_blank" rel="noopener noreferrer" className={inlineLink}>site accessibility team</a> to arrange a suitable route.</p>
        <a href={gentleWalk} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">Open market and harbour route in Google Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></a>
      </article>
      <p>Use the <a href={official.oldCityRoute} target="_blank" rel="noopener noreferrer" className={inlineLink}>official classic route</a> or the <a href={walkingMap} target="_blank" rel="noopener noreferrer" className={inlineLink}>official Old Akko walking map (PDF)</a> for local entrances and street connections.</p>
      <AttractionPracticalTip>For a full day in the north, Akko combines well with <Link to="/attractions/rosh-hanikra/" className={inlineLink}>Rosh Hanikra</Link> or a separate stop in <Link to="/attractions/haifa/" className={inlineLink}>Haifa</Link>. Allow extra travel time between destinations.</AttractionPracticalTip>
    </div>
  ),
  foodContent: (
    <div className="mt-4 space-y-3" data-testid="akko-food-guide">
      <p>I like leaving time for a meal in Old Akko. The market lanes offer hummus, fresh pita, spices, pastries and Arabic sweets, while the streets nearer the harbour have fish restaurants and cafés overlooking the water.</p>
      <div className="grid gap-3 md:grid-cols-2">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-lg font-semibold">Market snacks and local flavours</h3>
          <p className="mt-2 text-sm leading-relaxed">Follow the market towards the port, stopping for hummus, falafel, fresh breads or baklava. Visit during daytime trading hours for the widest selection.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-lg font-semibold">Waterfront lunch or coffee</h3>
          <p className="mt-2 text-sm leading-relaxed">After visiting the historic sites, relax near the fishing harbour. Fish, seafood and Mediterranean dishes are popular, and each restaurant sets its own opening times.</p>
        </article>
      </div>
      <p>For more local food ideas, see my <Link to="/travel-blog/what-to-eat-in-israel/" className={inlineLink}>guide to what to eat in Israel</Link> and the <a href={official.market} target="_blank" rel="noopener noreferrer" className={inlineLink}>official Old Akko markets guide</a>.</p>
    </div>
  ),
  practicalContent: (
    <div className="mt-4 space-y-3" data-testid="akko-practical-tips">
      <AttractionPracticalTip><strong>Best starting point:</strong> Begin at the Visitors Center on Weizmann Street 1, where tickets and official walking maps are available.</AttractionPracticalTip>
      <AttractionPracticalTip><strong>Historic paving:</strong> Choose comfortable shoes with good grip for narrow stone lanes, steps and underground passages.</AttractionPracticalTip>
      <AttractionPracticalTip><strong>Ticket timing:</strong> Ticket offices close one hour before the sites close. Arrive earlier to allow enough time for your visit.</AttractionPracticalTip>
      <AttractionPracticalTip><strong>Religious holidays and worship:</strong> Plan the Ramchal visit for Sunday–Friday and check visitor access at Al-Jazzar Mosque around prayers.</AttractionPracticalTip>
      <AttractionPracticalTip><strong>Weather:</strong> Bring water and sun protection for the harbour and exposed sea walls, and use the indoor sites for breaks on warmer days.</AttractionPracticalTip>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>Old Akko is a UNESCO World Heritage Site whose streets preserve an unusual layering of history. The Crusaders developed it into an important Mediterranean port, while the Hospitaller and Templar orders left some of the underground monuments that can be visited today.</p>
      <p>Above those remains, the Ottoman city took shape with mosques, markets, bathhouses, khans and defensive walls. That mix of visible architecture and archaeological spaces is what makes a short walk through Akko so rewarding. <a href={official.unesco} target="_blank" rel="noopener noreferrer" className={inlineLink}>UNESCO World Heritage information</a>.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>These guided day trips include Old Akko alongside Caesarea, Haifa or northern-coast highlights. Compare departure cities, the time allocated to Akko and ticket inclusions when choosing a tour.</p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="akko-tour-cards">
        {featuredAkkoTours.map(tour => <ExternalTourCard key={tour.id} tour={tour} pageId="attractions-akko-acre" />)}
      </ul>
      <p className="text-sm leading-relaxed">See more options in my <Link to="/tours/caesarea-haifa-acre/" className={inlineLink}>northern coast tours</Link> guide. For a customized private transfer or a day with a driver, <a href="#contact" className={inlineLink}>contact me</a>.</p>
    </div>
  ),
  faqs: [
    { q: "Is Akko the same as Acre?", a: "Yes. Akko, Acre and Akka refer to the same Mediterranean port city. This guide concentrates on the historic Old City." },
    { q: "What should I see if I have only two hours?", a: "Choose the Knights’ Halls, then enjoy a short walk through the market or down to the harbour. Add a second ticketed site only if you have time." },
    { q: "Is Old Akko suitable for families with children?", a: "Yes. The underground halls, tunnel and harbour can be enjoyable for families. Wear comfortable shoes for the stone lanes, and allow time for breaks." },
    { q: "Are the historic attractions open on Saturdays?", a: "Most main heritage attractions are open on Saturday, but the Ramchal Synagogue and Heritage Center are closed on Saturdays and Jewish holidays. Check individual site notices and public transport options." },
    { q: "Can I visit Old Akko without a car?", a: "Yes. Take a train to Akko and continue by local bus, taxi or on foot. The main historic attractions are close enough to explore on foot." },
  ],
  nearby: [
    { label: "Rosh Hanikra", to: "/attractions/rosh-hanikra/", note: "Sea grottoes and coastal cliffs north of Akko." },
    { label: "Caesarea National Park", to: "/attractions/caesarea/", note: "Roman ruins and an ancient Mediterranean harbour." },
    { label: "Tel Megiddo", to: "/attractions/tel-megiddo/", note: "Ancient archaeological mound in the Jezreel Valley." },
    { label: "Basilica of the Annunciation", to: "/attractions/basilica-of-the-annunciation/", note: "A major religious and cultural landmark in Nazareth." },
    { label: "Mount Tabor", to: "/attractions/mount-tabor/", note: "Hilltop church and sweeping Galilee views." },
    { label: "Magdala", to: "/attractions/magdala/", note: "Archaeology and lakeside heritage on the Sea of Galilee." },
  ],
  planningLinks: [
    { label: "Haifa travel guide", to: "/attractions/haifa/", description: "Explore the gardens, coastline and viewpoints.", icon: "region" },
    { label: "Sea of Galilee travel guide", to: "/attractions/sea-of-galilee/", description: "Lakeside towns and historic sites.", icon: "region" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Rail, buses and road-trip planning.", icon: "transport" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", description: "Plan sightseeing around the seasons.", icon: "seasons" },
    { label: "5-day Israel itinerary", to: "/travel-blog/israel-itinerary-5-days/", description: "A practical route with coastal highlights.", icon: "itinerary" },
    { label: "Israel travel tips", to: "/travel-blog/israel-travel-tips/", description: "Useful advice before your visit.", icon: "region" },
  ],
  sources: [
    { label: "Old Akko - official attractions and ticket packages", url: official.attractions },
    { label: "Old Akko - published opening hours", url: official.hours },
    { label: "Old Akko - FAQ, ticket inclusions and arrival", url: official.faq },
    { label: "Old Akko - accessibility", url: official.accessibility },
    { label: "Old Akko - classic walking route", url: official.oldCityRoute },
    { label: "UNESCO - Old City of Acre", url: official.unesco },
  ],
  photoCredits: <p>
    <strong>Photographs:</strong>{" "}
    <a href="https://commons.wikimedia.org/wiki/File:108248_el_basha_hammam_in_acre_PikiWiki_Israel.jpg" target="_blank" rel="noopener noreferrer" className={inlineLink}>Zeev Stein / PikiWiki Israel (Turkish Bath)</a>{" - "}
    <a href="https://creativecommons.org/licenses/by/2.5/" target="_blank" rel="noopener noreferrer" className={inlineLink}>CC BY 2.5</a>;{" "}
    <a href="https://commons.wikimedia.org/wiki/File:The_market_in_Acre_(Akko)_(373226896).jpg" target="_blank" rel="noopener noreferrer" className={inlineLink}>Yaniv Ben-Arie (market)</a>{" - "}
    <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener noreferrer" className={inlineLink}>CC BY-SA 2.0</a>;{" "}
    <a href="https://commons.wikimedia.org/wiki/File:Antique_Padlocks_-_Treasures_in_the_Wall_Museum_-_Akko_(Acre)_-_Israel.jpg" target="_blank" rel="noopener noreferrer" className={inlineLink}>Adam Jones (museum collection)</a>{" - "}
    <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener noreferrer" className={inlineLink}>CC BY-SA 2.0</a>;{" "}
    <a href="https://commons.wikimedia.org/wiki/File:Acco_Ramhal_Synagogue_IMG_0281.JPG" target="_blank" rel="noopener noreferrer" className={inlineLink}>Deror Avi (Ramchal Synagogue)</a>{" - "}
    <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer" className={inlineLink}>CC BY-SA 3.0</a>.
    {" "}Images resized and converted to WebP. The image files retain their original Creative Commons licenses.
  </p>,
};

export function AkkoAttractionPage() {
  return <AttractionDestinationPage content={akkoDestinationContent} />;
}
