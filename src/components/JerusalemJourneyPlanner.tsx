import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, ExternalLink, Bus, CarFront, MapPinned, Route, Users } from "lucide-react";
import { affiliateConfig, tourBookingOffers, tourProducts } from "@/data/registry";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import masadaAerial from "@/assets/guides/dead-sea-excursions/masada-aerial.webp";
import einGediWaterfall from "@/assets/guides/dead-sea-excursions/ein-gedi-waterfall.webp";
import qumranCaves from "@/assets/guides/dead-sea-excursions/qumran-caves.webp";
import qasrAlYahud from "@/assets/guides/dead-sea-excursions/qasr-al-yahud.webp";

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
      { id: "documents-car", icon: Route, name: "Documents & access", benefit: "Check before travelling", detail: "Check your entry status, any checkpoint rules and the legal and insurance limits on a rental car." },
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
      { title: "Masada", tag: "Ancient fortress", description: "Explore Masada's ancient fortress and desert views. Take the cable car, or choose a hiking trail if it's open and suitable for the conditions.", href: "https://en.parks.org.il/reserve-park/masada-national-park/", link: "Plan a Masada visit" },
      { title: "Ein Gedi", tag: "Desert oasis", description: "Discover Ein Gedi's desert oasis, waterfalls, walking trails and wildlife. Check which trails are open before visiting.", href: "https://en.parks.org.il/reserve-park/en-gedi-nature-reserve/", link: "Plan an Ein Gedi visit" },
      { title: "Qumran", tag: "Dead Sea Scrolls", description: "Visit the archaeological remains near the caves associated with the Dead Sea Scrolls, north of Ein Gedi.", href: "https://en.parks.org.il/reserve-park/qumran-park", link: "Visit Qumran National Park" },
      { title: "Qasr al-Yahud", tag: "Jordan River baptism site", description: "Visit the historic baptism site at Qasr al-Yahud on the Jordan River. Allow time for the detour and check current entry and registration arrangements.", href: "https://en.parks.org.il/reserve-park/baptismal-site-on-the-jordan-river-qasr-al-yahud/", link: "Plan a Qasr al-Yahud visit" },
    ],
    footnote: "Check the correct bus stop for your destination and the last departure back to Jerusalem.",
    resourceHeading: "Check the journey and site access",
    resources: [
      { name: "Egged: timetables and ticketing", url: "https://www.egged.co.il/en" },
      { name: "Egged: seat-reservation routes (444)", url: "https://www.egged.co.il/information-for-passengers/tickets-information" },
      { name: "Ein Bokek central public beach", url: "https://www.deadsea.co.il/attractions/ein-bokek-central-beach/?lang=en" },
      { name: "Ein Gedi Nature Reserve updates", url: "https://en.parks.org.il/reserve-park/en-gedi-nature-reserve/" },
    ],
  },
} as const;

const deadSeaStopPhotos: Record<string, { src: string; alt: string }> = {
  Masada: { src: masadaAerial, alt: "Aerial photograph of the Masada fortress above the Dead Sea" },
  "Ein Gedi": { src: einGediWaterfall, alt: "Waterfall at Ein Gedi Nature Reserve" },
  Qumran: { src: qumranCaves, alt: "Rock formations and caves in the Qumran area" },
  "Qasr al-Yahud": { src: qasrAlYahud, alt: "Qasr al-Yahud baptismal site on the Jordan River" },
};

function RegularExternal({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) {
  return <a href={url} target="_blank" rel="noopener noreferrer" className={className}>{children}<ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a>;
}

export function JerusalemJourneyOptions({ id }: { id: string }) {
  if (!isJourney(id)) return null;
  const route = routes[id];
  // The Dead Sea guide needs the four actual destinations, not a second set of
  // transport-option cards that repeats the article immediately below.
  if (id === "jerusalemDeadSea") return <section id="journey-destinations" aria-labelledby="journey-destinations-h" className="mt-9 scroll-mt-28">
    <h2 id="journey-destinations-h" className="text-2xl font-semibold">Add a stop to your Dead Sea day</h2>
    <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">If you have extra time, consider adding Masada, Ein Gedi, Qumran or Qasr al-Yahud. These attractions are spread across the Dead Sea region, so choose stops that fit your route and travel time. A car, driver or organised tour is usually easier than connecting buses.</p>
    <div className="mt-4 grid gap-3 sm:grid-cols-2" data-testid="journey-stop-cards">
      {route.details.map(item => {
        const photo = deadSeaStopPhotos[item.title];
        return <a
          key={item.title}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-w-0 overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          data-testid="deadsea-attraction-card"
        >
          {photo && <img src={photo.src} alt={photo.alt} width={180} height={180} loading="lazy" decoding="async" className="h-auto min-h-40 w-28 shrink-0 object-cover sm:w-32" />}
          <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-3.5">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">{item.tag}</span>
              <h3 className="mt-0.5 text-lg font-semibold text-foreground group-hover:text-primary">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{item.description}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">{item.link}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></span>
          </div>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>;
      })}
    </div>
  </section>;
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

/** Descriptive page-and-provider SubIDs for approved Travelpayouts tour links.
 * These are supplier catalogues, not guaranteed departures, prices or availability.
 */
const deadSeaPartnerOptions = [
  {
    id: "deadsea-jerusalem-viator",
    label: "Viator",
    title: "Browse Dead Sea day trips departing Jerusalem",
    description: "Compare published Jerusalem departures, group sizes and stops on Viator.",
    subId: "jslm_dead_sea_viator",
  },
  {
    id: "deadsea-jerusalem-getyourguide",
    label: "GetYourGuide",
    title: "Compare Dead Sea tours on GetYourGuide",
    description: "Browse Dead Sea and Masada outings and confirm your Jerusalem pickup before booking.",
    subId: "jslm_dead_sea_getyourguide",
  },
] as const;

function attributedDeadSeaTourLink(id: string): string | null {
  // The original short URL was created by the Travelpayouts API. The registry
  // adds a descriptive ?sub_id= override supported by Travelpayouts.
  const approved = affiliateConfig[id]?.trackingUrl;
  if (!approved) return null;
  const url = new URL(approved);
  if (url.protocol !== "https:" || !["viator.tpm.li", "getyourguide.tpm.li"].includes(url.hostname)) return null;
  return url.toString();
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
    <h2 id="journey-booking-h" className="text-3xl">{isBethlehem ? "Bethlehem tours that start in Jerusalem" : "Book a Dead Sea tour or private ride"}</h2>
    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{isBethlehem
      ? "These are different itineraries, not interchangeable transfers to the Church of the Nativity. Confirm the crossing arrangements, site access and exact Jerusalem departure point."
      : "A private car and driver can be arranged for a Masada and Dead Sea day from Jerusalem. For group tours, compare the Jerusalem departure and the full inclusions before choosing a supplier."}</p>
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
        <a href={url} target="_blank" rel={relFor(sponsored)}
           onClick={() => recordOutboundClick({ pageId: `journey-${id}`, productId: product.id, offerId: offer.id })}
           className="btn btn-primary mt-4 inline-flex w-fit items-center gap-2">
          View on {offer.partnerId === "viator" ? "Viator" : "GetYourGuide"} <ExternalLink className="h-4 w-4" aria-hidden />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </article>)}
      {!isBethlehem && deadSeaPartnerOptions.map(option => {
        const url = attributedDeadSeaTourLink(option.id);
        if (!url) return null;
        return <article key={option.id} className="flex flex-col rounded-2xl border bg-card p-5" data-testid="deadsea-affiliate-tour-card">
          <p className="text-xs font-semibold text-primary">{option.label} · independent operator listings</p>
          <h3 className="mt-2 text-xl font-semibold">{option.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{option.description} Check current departure city, dates, what's included and cancellation terms.</p>
          <a href={url} target="_blank" rel={relFor(true)}
             onClick={() => recordOutboundClick({ pageId: "jerusalem-to-the-dead-sea", productId: option.id, offerId: option.subId })}
             className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">
            Browse on {option.label} <ExternalLink className="h-4 w-4" aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </article>;
      })}
      {isBethlehem && <article className="flex flex-col rounded-2xl border bg-secondary/30 p-5">
        <p className="text-xs font-semibold text-primary">Other options</p>
        <h3 className="mt-2 text-xl font-semibold">{isBethlehem ? "More Bethlehem, Jericho & Jordan River tours" : "More Masada & Dead Sea tours"}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">Browse the tour catalogue and choose the departure city, actual stops and tour format before following a supplier link.</p>
        <Link to={isBethlehem ? "/tours/bethlehem-jericho-jordan-river/" : "/tours/masada-dead-sea/"} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">Compare tours <ArrowRight className="h-4 w-4" aria-hidden /></Link>
      </article>}
    </div>
    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{isBethlehem ? "The linked tours are individual supplier listings." : "The linked tour platforms open supplier catalogues, not guaranteed Jerusalem departures."} These are not live price or availability quotes. Check the final operator, itinerary, inclusions and cancellation terms before booking.</p>
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
