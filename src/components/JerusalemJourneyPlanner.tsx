import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Bus, CarFront, MapPinned, Route, Users } from "lucide-react";
import { affiliateConfig, tourBookingOffers, tourProducts } from "@/data/registry";
import { recordOutboundClick, relFor } from "@/lib/outbound";

/** Dedicated decision aids for the Jerusalem departures; only provider-approved URLs
 * configured in affiliateConfig count as referral links. The supplier URLs below are
 * deliberately ordinary, individually identified product pages.
 */
export type JerusalemJourneyId = "bethlehem" | "jerusalemDeadSea";
const isJourney = (id: string): id is JerusalemJourneyId => id === "bethlehem" || id === "jerusalemDeadSea";

const routes = {
  bethlehem: {
    heading: "Choose how to reach Bethlehem",
    hint: "The bus, a taxi to the checkpoint and a through-arranged tour are not interchangeable. Check the last part of the journey and the way back.",
    methods: [
      { id: "buses", icon: Bus, name: "Public bus", benefit: "For independent travellers", detail: "South Buses 231 and 234 take different routes. Confirm where you leave the bus and how you reach Manger Square." },
      { id: "tours", icon: Users, name: "Organised tour", benefit: "For a managed itinerary", detail: "Ask which Bethlehem sites are included, where you meet and how the operator handles the journey across the boundary." },
      { id: "private-taxi", icon: CarFront, name: "Private arrangement", benefit: "For a tailored visit", detail: "Check the driver's permissions and insurance on every leg. A taxi to the crossing is not a taxi through to Bethlehem." },
      { id: "documents-car", icon: Route, name: "Taxi + crossing", benefit: "For an individually planned trip", detail: "Allow time to cross and arrange the onward ride and Jerusalem return before setting out." },
    ],
    detailsTitle: "Getting to Bethlehem independently",
    details: [
      { title: "Bus 231", tag: "Beit Jala route", description: "Board the East Jerusalem service near the Prophets Terminal / Damascus Gate area. Check the 231 stops and whether you need a local ride from the Bethlehem–Beit Jala area to Manger Square.", href: "https://south-buses.com/lines-and-stations/?lang=en", link: "Check the operator's stops" },
      { title: "Bus 234", tag: "Checkpoint 300 approach", description: "The route serves the Rachel's Tomb / Checkpoint 300 approach. A bus ticket does not cover the crossing or the onward journey to central Bethlehem.", href: "https://www.cicts.org/en/east-jerusalem-bus-lines", link: "Check bus station directions" },
      { title: "Walk and local transport", tag: "After the crossing", description: "Do not assume a bus stops beside the Church of the Nativity. Confirm the actual exit, a local taxi or onward connection, and the return route before leaving Jerusalem.", href: "https://www.google.com/maps/search/?api=1&query=Church+of+the+Nativity+Bethlehem", link: "Find the Nativity Church on a map" },
    ],
    footnote: "The East Jerusalem Arab bus station is outside Damascus Gate, but boarding bays and routes can change. South Buses lists 231 for Beit Jala and 234 for Bethlehem. No live schedule or fixed fare is displayed here.",
    resourceHeading: "Official checks before a Bethlehem visit",
    resources: [
      { name: "South Buses: 231 / 234", url: "https://south-buses.com/lines-and-stations/?lang=en" },
      { name: "East Jerusalem bus station directions", url: "https://www.cicts.org/en/east-jerusalem-bus-lines" },
      { name: "Church of the Nativity restoration notice", url: "https://www.custodia.org/en/news/the-custos-of-the-holy-land-and-the-greek-orthodox-patriarch-visit-the-restoration-works-at-the-basilica-of-the-nativity/" },
    ],
  },
  jerusalemDeadSea: {
    heading: "First, choose your Dead Sea destination",
    hint: "Ein Bokek is a beach and hotel district; Masada is a national park; Ein Gedi is a nature reserve. The right bus stop, driving time and useful time on site differ.",
    methods: [
      { id: "bus", icon: Bus, name: "Public bus", benefit: "For a single, served destination", detail: "Egged 486 serves the Dead Sea corridor. Also check 444 and its reservation terms; the return journey may limit your day." },
      { id: "tours", icon: Users, name: "Organised excursion", benefit: "For Masada and beach combinations", detail: "Check the starting city, amount of beach time, guide service, park tickets and actual return point." },
      { id: "private", icon: CarFront, name: "Private driver", benefit: "For a flexible stop schedule", detail: "Agree the beach or attraction entrance, waiting time, guiding exclusions and total price before departure." },
      { id: "driving", icon: Route, name: "Rental car", benefit: "For an independent itinerary", detail: "Usually via Route 1 and Route 90; check permits, road notices, parking, heat and possible flash-flood closures." },
    ],
    detailsTitle: "Which stop do you actually need?",
    details: [
      { title: "Ein Bokek", tag: "Beach and hotels", description: "Choose the hotel district's public beach if your priority is floating, showers and a straightforward beach day. The central beach has free public facilities; parking and hotel services may cost extra.", href: "https://www.deadsea.co.il/attractions/ein-bokek-central-beach/?lang=en", link: "Check public beach facilities" },
      { title: "Masada", tag: "National park", description: "Allow time for admission, the cable car or the permitted trail. The east-side visitor entrance is a different destination from a Dead Sea hotel.", href: "https://en.parks.org.il/reserve-park/masada-national-park/", link: "Check Masada access" },
      { title: "Ein Gedi", tag: "Nature reserve", description: "It is not a substitute for a bathing beach. Flood damage and restoration have changed which trails can be visited; reserve and choose a specific open route.", href: "https://en.parks.org.il/reserve-park/en-gedi-nature-reserve/", link: "Check trail status" },
      { title: "Northern Dead Sea", tag: "Separate beach facilities", description: "The northern shore has privately managed bathing sites and different road stops. Confirm the facility's operating status and ticket arrangements before buying transport.", href: "https://www.google.com/maps/search/?api=1&query=Kalia+Beach+Dead+Sea", link: "Locate the northern shore" },
    ],
    footnote: "The route through the Dead Sea corridor uses different stops for each destination. Check the live Egged timetable, including the last usable Jerusalem-bound departure, rather than copying a timetable or fare from an older guide.",
    resourceHeading: "Check the journey and site access",
    resources: [
      { name: "Egged: timetables and ticketing", url: "https://www.egged.co.il/en" },
      { name: "Egged: seat-reservation routes (444)", url: "https://www.egged.co.il/information-for-passengers/tickets-information" },
      { name: "Ein Bokek central public beach", url: "https://www.deadsea.co.il/attractions/ein-bokek-central-beach/?lang=en" },
      { name: "Ein Gedi Nature Reserve updates", url: "https://en.parks.org.il/reserve-park/en-gedi-nature-reserve/" },
    ],
  },
} as const;

function RegularExternal({ url, children, className = "" }: { url: string; children: React.ReactNode; className?: string }) {
  return <a href={url} target="_blank" rel="noopener noreferrer" className={className}>{children}<ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a>;
}

export function JerusalemJourneyOptions({ id }: { id: string }) {
  if (!isJourney(id)) return null;
  const route = routes[id];
  return <>
    <section id="journey-options" aria-labelledby="journey-options-h" className="mt-10 scroll-mt-28">
      <h2 id="journey-options-h" className="text-3xl">{route.heading}</h2>
      <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{route.hint}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-testid="journey-option-cards">
        {route.methods.map(({ id: sectionId, icon: Icon, name, benefit, detail }) => <a key={name} href={`#${sectionId}`} className="group flex flex-col rounded-2xl border bg-card p-4 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-primary">
          <Icon className="h-6 w-6 text-primary" aria-hidden />
          <h3 className="mt-3 text-lg font-semibold group-hover:text-primary">{name}</h3>
          <p className="mt-1 text-xs font-semibold text-primary">{benefit}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{detail}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read details <ArrowRight className="h-4 w-4" aria-hidden /></span>
        </a>)}
      </div>
    </section>
    <section id="journey-destinations" aria-labelledby="journey-destinations-h" className="mt-12 scroll-mt-28">
      <h2 id="journey-destinations-h" className="text-3xl">{route.detailsTitle}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2" data-testid="journey-stop-cards">
        {route.details.map((item) => <article key={item.title} className="rounded-2xl border bg-card p-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary"><MapPinned className="h-4 w-4" aria-hidden /> {item.tag}</span>
          <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          <RegularExternal url={item.href} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-4">{item.link}</RegularExternal>
        </article>)}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{route.footnote}</p>
    </section>
  </>;
}

const pickedTours = {
  bethlehem: ["jerusalem-bethlehem-private", "bethlehem-jericho-jordan"],
  jerusalemDeadSea: [] as string[],
};

export function JerusalemJourneyBooking({ id }: { id: string }) {
  if (!isJourney(id)) return null;
  const isBethlehem = id === "bethlehem";
  const productIds = pickedTours[id];
  const tours = productIds.map((productId) => {
    const product = tourProducts.find((tour) => tour.id === productId);
    const offer = tourBookingOffers.find((offer) => offer.productId === productId);
    if (!product || !offer) return null;
    const tracking = affiliateConfig[offer.id]?.trackingUrl;
    return { product, offer, url: tracking || offer.publicUrl, sponsored: Boolean(tracking) };
  }).filter((item): item is NonNullable<typeof item> => item !== null);
  return <section id="journey-booking" aria-labelledby="journey-booking-h" className="mt-12 scroll-mt-28">
    <h2 id="journey-booking-h" className="text-3xl">{isBethlehem ? "Bethlehem tours that start in Jerusalem" : "Dead Sea excursions and private transport"}</h2>
    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{isBethlehem
      ? "These are different itineraries, not interchangeable transfers to the Church of the Nativity. Confirm the crossing arrangements, site access and exact Jerusalem departure point."
      : "A private car and driver can be arranged for a Masada and Dead Sea day from Jerusalem. For group tours, choose a product that actually departs from Jerusalem."}</p>
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      {!isBethlehem && <article className="flex flex-col rounded-2xl border border-primary/25 bg-card p-5" data-testid="journey-owner-trip">
        <p className="text-xs font-semibold text-primary">Moshe Barak · private transport</p>
        <h3 className="mt-2 text-xl font-semibold">Masada & Dead Sea from Jerusalem</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">Private transport for up to four travellers. My published weekday starting rate is ₪2,100 per vehicle; guiding, admission, meals, parking and tips are extra. The final quote depends on your stops and date.</p>
        <Link to="/tours/masada-dead-sea/" className="btn btn-primary mt-4 flex w-fit items-center gap-2">See my private-day option <ArrowRight className="h-4 w-4" aria-hidden /></Link>
      </article>}
      {tours.map(({ product, offer, url, sponsored }) => <article key={offer.id} className="flex flex-col rounded-2xl border bg-card p-5" data-testid="journey-tour-card">
        <p className="text-xs font-semibold text-primary">{offer.partnerId === "viator" ? "Viator" : "GetYourGuide"} · {product.formatLabel}</p>
        <h3 className="mt-2 text-xl font-semibold">{product.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.summary} Check the itinerary, guide handovers and booking terms for your chosen date.</p>
        <RegularExternal url={url} className="btn btn-primary mt-4 inline-flex w-fit items-center gap-2" >
          <span onClick={undefined}>{`View on ${offer.partnerId === "viator" ? "Viator" : "GetYourGuide"}`}</span>
        </RegularExternal>
        {sponsored && <p className="mt-2 text-xs text-muted-foreground">Sponsored link; I may earn a commission at no extra cost to you.</p>}
      </article>)}
      <article className="flex flex-col rounded-2xl border bg-secondary/30 p-5">
        <p className="text-xs font-semibold text-primary">Other options</p>
        <h3 className="mt-2 text-xl font-semibold">{isBethlehem ? "More Bethlehem, Jericho & Jordan River tours" : "More Masada & Dead Sea tours"}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">Browse the tour catalogue and choose the departure city, actual stops and tour format before following a supplier link.</p>
        <Link to={isBethlehem ? "/tours/bethlehem-jericho-jordan-river/" : "/tours/masada-dead-sea/"} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">Compare tours <ArrowRight className="h-4 w-4" aria-hidden /></Link>
      </article>
    </div>
    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">The external tour links lead to individual supplier listings. They are not live price or availability quotes. The booking partner's final screen controls availability, inclusions and cancellation. I only use affiliate attribution when an approved tracking link is configured.</p>
  </section>;
}

export function JerusalemJourneyResources({ id }: { id: string }) {
  if (!isJourney(id)) return null;
  const route = routes[id];
  return <section aria-labelledby="journey-resources-h" className="mt-12">
    <h2 id="journey-resources-h" className="text-xl font-semibold">{route.resourceHeading}</h2>
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm">
      {route.resources.map((item) => <li key={item.url}><RegularExternal url={item.url} className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-2">{item.name}</RegularExternal></li>)}
    </ul>
  </section>;
}
