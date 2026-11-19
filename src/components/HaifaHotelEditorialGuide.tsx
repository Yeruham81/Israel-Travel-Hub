import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, Hotel, Lightbulb, MapPin } from "lucide-react";
import type { HotelStayDestination } from "@/data/content";
import { AreaMap } from "@/components/AreaMap";
import { GuideHeader, OnThisPage, FaqList, SourceList } from "@/components/Guide";
import { HomeContactForm } from "@/components/HomeContactForm";
import { StayTripLinks } from "@/components/StayTripLinks";
import { guideContactCopy } from "@/lib/guide-contact";
import { resortHotel, hotelBooking } from "@/components/StayGuideParts";
import { linksForPage } from "@/data/registry";
import { resortHotelPhoto } from "@/data/resortHotelPhotos";
import { hotelAffiliateUrl, hotelBrowseAffiliateUrl } from "@/lib/hotel-affiliate";
import { hotelGoogleMapsUrl } from "@/lib/hotel-google-maps";
import { recordOutboundClick, relFor } from "@/lib/outbound";

/** The Haifa accommodation page uses the same category-first editorial pattern
 * as the Tiberias and Dead Sea comparisons. Keep hotel imagery assigned by
 * resortHotelPhotos until the separate image-review pass.
 */
const sections = [
  ["choose", "Choose your stay"],
  ["compare", "At a glance"],
  ["hotels", "Recommended hotels"],
  ["location", "Map & arrival"],
  ["tips", "Booking tips"],
  ["faq", "FAQ"],
  ["explore", "Related guides"],
  ["trip-planning", "Trip planning"],
  ["contact", "Contact me"],
] as const;

type HotelNote = { kind: string; summary: string; bestFor: string; consider: string; beach: string };
const hotelNotes: Record<string, HotelNote> = {
  "haifa-botanica": {
    kind: "Design hotel",
    summary: "Contemporary design, a spa and a seasonal rooftop plunge pool beside the lower Bahá'í Gardens.",
    bestFor: "Couples and guests aged 16+ seeking a stylish German Colony stay",
    consider: "Confirm the 16+ guest rule, spa extras and rooftop plunge-pool season.",
    beach: "Travel required for a swimming beach",
  },
  "haifa-dan-carmel": {
    kind: "Luxury hotel",
    summary: "An established Carmel hotel near the Louis Promenade, with gardens, outdoor pools and bay views.",
    bestFor: "Couples and families who prefer an upscale Carmel base",
    consider: "Room capacity, pool schedules and executive-area age rules vary; confirm the exact offer.",
    beach: "Hilltop setting; travel to the beach",
  },
  "haifa-schumacher": {
    kind: "Heritage boutique",
    summary: "A restored Templer building and modern wing with a garden and rooftop terrace in the German Colony.",
    bestFor: "Adults seeking historic architecture and a smaller hotel",
    consider: "Adults-only policy; check your room's building, steps and breakfast arrangements.",
    beach: "City location; travel to the beach",
  },
  "haifa-colony": {
    kind: "Historic boutique",
    summary: "A preserved hotel on Ben Gurion Boulevard, close to restaurants and the lower Bahá'í Gardens.",
    bestFor: "Visitors who want to walk around the German Colony",
    consider: "Compare room outlook, boulevard noise, parking and breakfast inclusion.",
    beach: "City location; travel to the beach",
  },
  "haifa-crowne-plaza": {
    kind: "Carmel family hotel",
    summary: "A Carmel Center hotel with a heated indoor pool, near viewpoints and city restaurants.",
    bestFor: "Families wanting a hilltop base and an indoor swimming option",
    consider: "Confirm child access to the pool, room occupancy and health-club rules.",
    beach: "Separate trip to the shore",
  },
  "haifa-leonardo-plaza": {
    kind: "Beachfront hotel",
    summary: "A southern-seafront hotel with beach access, swimming pools and date-dependent children's activities.",
    bestFor: "Families whose holiday centers on the beach and promenade",
    consider: "Check the actual suite layout, pool arrangements and children's club dates.",
    beach: "Beach access from the pool area",
  },
  "haifa-golden-crown": {
    kind: "Lower-city hotel",
    summary: "A modern hotel near the German Colony and downtown, convenient for urban sightseeing and dining.",
    bestFor: "Visitors prioritizing a lower-city base",
    consider: "Check parking, room outlook and the route to your train station or cruise terminal.",
    beach: "Urban location; not a swimming beach",
  },
  "haifa-nof": {
    kind: "Carmel city hotel",
    summary: "A Carmel Center hotel overlooking Haifa Bay, also known on some booking sites as Haifa Bay View.",
    bestFor: "Travelers comparing a Carmel address and bay outlook",
    consider: "Verify 101 Hanassi Avenue if the provider uses the former Haifa Bay View name.",
    beach: "Hilltop view; separate beach journey",
  },
  "haifa-port-inn": {
    kind: "Independent guesthouse",
    summary: "Smaller accommodation on Derech Yafo for exploring downtown and the lower city.",
    bestFor: "Independent visitors who prefer a straightforward town base",
    consider: "Confirm current room and bathroom arrangements, reception and late arrival directly.",
    beach: "Downtown; travel to a swimming beach",
  },
  "haifa-loui-talpiot": {
    kind: "Market-area hotel",
    summary: "A small stay beside Talpiot Market in Hadar, with kitchenette options and shared rooftop areas.",
    bestFor: "Food and market enthusiasts and self-catering travelers",
    consider: "Check kitchen equipment, steps, event noise and travel between Hadar and the Carmel.",
    beach: "Hadar location; separate beach journey",
  },
};

const groupCopy: Record<string, { title: string; eyebrow: string; advice: string }> = {
  luxury: {
    title: "Luxury & romantic stays",
    eyebrow: "German Colony design or Carmel views",
    advice: "Choose Botanica for a design-led, age-restricted German Colony stay or Dan Carmel for a larger hilltop hotel with pools and family facilities.",
  },
  boutique: {
    title: "Boutique & heritage hotels",
    eyebrow: "Historic architecture and neighborhood life",
    advice: "The Schumacher offers an adults-only boutique experience, while The Colony Hotel puts you on Ben Gurion Boulevard near restaurants and the lower gardens.",
  },
  family: {
    title: "Family & beach hotels",
    eyebrow: "Pools, space and the daily journey",
    advice: "Compare Crowne Plaza's indoor pool and Carmel location with Leonardo Plaza's beachfront setting and seasonal children's facilities.",
  },
  "mid-range": {
    title: "Practical city hotels",
    eyebrow: "Downtown access or a Carmel outlook",
    advice: "Golden Crown suits a lower-city base, while Nof offers a Carmel address and bay views. Check overall value for your actual dates.",
  },
  budget: {
    title: "Independent & budget-minded stays",
    eyebrow: "Simple rooms and local character",
    advice: "Port Inn and Loui Talpiot offer different lower-city and Hadar settings. Compare private facilities, arrival arrangements and room totals rather than assuming fixed budget prices.",
  },
};

const groupTips: Record<string, { title: string; points: readonly [string, string] }> = {
  luxury: {
    title: "Choose your Haifa luxury base",
    points: [
      "Decide whether you want German Colony restaurants nearby or a hotel high on the Carmel.",
      "Confirm the exact guest ages, room outlook and seasonal pool arrangements.",
    ],
  },
  boutique: {
    title: "Make a heritage stay comfortable",
    points: [
      "Check whether your room is in the historic building or a newer wing, and whether stairs are involved.",
      "Compare noise, parking and breakfast arrangements along the German Colony streets.",
    ],
  },
  family: {
    title: "Plan swimming days with children",
    points: [
      "Check pool entry ages, children's club dates and whether the beach is beside the hotel.",
      "Book the room layout and number of beds that suit your entire family.",
    ],
  },
  "mid-range": {
    title: "Compare daily travel, not just rates",
    points: [
      "Include the climb between downtown and the Carmel in your transport plan.",
      "If you book Nof under the Haifa Bay View name, confirm the address.",
    ],
  },
  budget: {
    title: "Check the practical details",
    points: [
      "Compare private bathrooms, kitchen facilities, reception hours and luggage arrangements.",
      "Allow for transport and possible steps when planning a stay in Hadar.",
    ],
  },
};

/** Verified public Expedia destination pages. These are direct links until the
 * Travelpayouts account supplies short links for Haifa city/category searches.
 * Never reuse a particular hotel's tracked link for a destination search.
 */
const browseFallback: Record<string, { id: string; label: string; url: string }> = {
  luxury: {
    id: "hotels-haifa-luxury-direct",
    label: "Browse more luxury stays",
    url: "https://www.expedia.com/Haifa-Hotels-Luxury-Hotel.0-0-d1446-tLuxuryHotel.Travel-Guide-Filter-Hotels",
  },
  boutique: {
    id: "hotels-haifa-boutique-direct",
    label: "Browse more boutique hotels",
    url: "https://www.expedia.com/Haifa-Hotels-Boutique-Hotel.0-0-d1446-tBoutiqueHotel.Travel-Guide-Filter-Hotels",
  },
  family: {
    id: "hotels-haifa-family-direct",
    label: "Browse more family hotels",
    url: "https://www.expedia.com/Haifa-Hotels-Family-Hotel.0-0-d1446-tFamilyHotel.Travel-Guide-Filter-Hotels",
  },
  "mid-range": {
    id: "hotels-haifa-city-direct",
    label: "Browse more city hotels",
    url: "https://www.expedia.com/Haifa-Hotels.d1446.Travel-Guide-Hotels",
  },
  budget: {
    id: "hotels-haifa-budget-direct",
    label: "Browse more affordable stays",
    url: "https://www.expedia.com/Haifa-Hotels-Cheap-Hotels.0-0-d1446-tCheapHotels.Travel-Guide-Filter-Hotels",
  },
};

const haifaAllHotelsUrl = "https://www.expedia.com/Haifa-Hotels.d1446.Travel-Guide-Hotels";

const bookingTips = [
  { title: "Choose the right elevation", text: "A nearby point on the map may be up a steep slope. Check walks, steps and the Carmelit or bus connection." },
  { title: "Confirm your beach plan", text: "A view of Haifa Bay is not a beachfront location. For beach days, compare the southern seafront and its transport connections." },
  { title: "Match the room to your party", text: "Check all guest ages, bed arrangements, connecting rooms and any adults-only policy before paying." },
  { title: "Compare actual facilities", text: "Pools, plunge pools, spa treatments and children's activities can have different seasons or access rules." },
  { title: "Check transport and parking", text: "Confirm train station, parking charges and the exact drop-off point, particularly for a late arrival or cruise." },
  { title: "Review the total price", text: "Compare the same dates, guests, meals and cancellation terms, including any parking or spa extras." },
] as const;

function HotelCard({ id, pageId }: { id: string; pageId: string }) {
  const hotel = resortHotel(id);
  const note = hotelNotes[id];
  const photo = resortHotelPhoto(id);
  const booking = hotelBooking(id);
  if (!note) return null;
  return <li id={"hotel-" + id} className="flex h-full min-w-0 scroll-mt-32 flex-col overflow-hidden rounded-xl border bg-card shadow-sm" data-testid="haifa-editorial-hotel-card">
    <figure className="overflow-hidden bg-muted">
      <img src={photo.src} alt={photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
    </figure>
    <div className="flex flex-1 flex-col p-4 sm:p-5">
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        <Hotel className="h-4 w-4 shrink-0 text-primary" aria-hidden /> {note.kind}
      </p>
      <h4 className="mt-2 text-lg font-bold leading-snug sm:text-xl">{hotel.name}</h4>
      <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden /> {hotel.resortFacts.location}
      </p>
      <a href={hotelGoogleMapsUrl(hotel)} target="_blank" rel="noopener noreferrer"
        aria-label={"View location of " + hotel.name + " on Google Maps (opens in a new tab)"}
        className="mt-1.5 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-primary underline underline-offset-2 hover:text-primary/80"
        data-testid="haifa-hotel-map-link">
        View location on Google Maps <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </a>
      <p className="mt-3 text-sm leading-relaxed">{note.summary}</p>
      <p className="mt-3 text-sm leading-relaxed"><strong>Best for:</strong> {note.bestFor}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Beach access:</strong> {note.beach}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Keep in mind:</strong> {note.consider}</p>
      {booking?.isAffiliate ? <a href={hotelAffiliateUrl(booking, pageId, hotel.id)}
        target="_blank" rel={relFor(booking.isAffiliate)}
        onClick={() => recordOutboundClick({ pageId, productId: hotel.id, offerId: booking.id })}
        aria-label={"Check rooms and rates for " + hotel.name + " on Expedia (opens in a new tab)"}
        className="group mt-auto flex min-h-11 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2.5 text-center text-sm font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        data-testid="haifa-editorial-hotel-link">
        Check rooms & rates <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
      </a> : <Link to="/accommodation/haifa/" className="mt-auto flex min-h-11 items-center justify-center gap-2 rounded-lg border p-3 text-center text-sm font-semibold text-primary">Explore Haifa hotels <ArrowRight className="h-4 w-4" aria-hidden /></Link>}
    </div>
  </li>;
}

export function HaifaHotelEditorialGuide({ guide }: { guide: HotelStayDestination }) {
  const pageId = "stay-haifa";
  const groups = guide.groups;
  const mainGroups = groups.filter(group => group.id !== "budget");
  const budgetGroup = groups.find(group => group.id === "budget");
  const allHotelIds = groups.flatMap(group => group.hotelIds);
  const sourceIds = [...new Set([...guide.sourceIds, ...allHotelIds.map(id => resortHotel(id).sourceId)])];
  const allHotelsAffiliate = linksForPage("stay-haifa-browse").find(link => link.isAffiliate && link.partnerId === "expedia");

  return <main className="pb-10" data-testid="haifa-style-editorial">
    <GuideHeader
      crumbs={[{ name: "Home", to: "/" }, { name: "Accommodation", to: "/accommodation/" }, { name: "Haifa", to: guide.path as LinkProps["to"] }]}
      eyebrow="Accommodation guide · Haifa"
      title={guide.title}
      intro={guide.intro}
      image={guide.photo}
      checkedAt={guide.reviewedAt}
    />
    <OnThisPage sections={sections} />
    <article className="mx-auto max-w-5xl px-4">
      <section id="choose" className="mt-10 scroll-mt-32" aria-labelledby="choose-h">
        <p className="eyebrow">Choose the location, then the hotel</p>
        <h2 id="choose-h" className="mt-2 text-3xl">Which Haifa stay suits you?</h2>
        <p className="mt-4 max-w-4xl leading-relaxed">I recommend starting with the neighborhood. The German Colony suits restaurants and historic streets, the Carmel is good for viewpoints and city hotels, and the southern waterfront makes beach time easier. Hadar and downtown offer other practical bases for exploring Haifa.</p>
        <div className="mt-6 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 lg:grid-cols-4" data-testid="haifa-category-grid">
          {mainGroups.map(group => {
            const copy = groupCopy[group.id];
            return <a key={group.id} href={"#group-" + group.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md" data-testid="haifa-category-card">
              <img src={group.photo.src} alt={group.photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
              <span className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
                <span className="break-words text-sm font-bold leading-snug sm:text-lg">{copy?.title ?? group.title}</span>
                <span className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{copy?.eyebrow ?? group.intro}</span>
                <span className="mt-3 inline-flex flex-wrap items-center gap-1 text-xs font-semibold text-primary sm:text-sm">See hotels <ArrowRight className="h-4 w-4 shrink-0" aria-hidden /></span>
              </span>
            </a>;
          })}
        </div>
        {budgetGroup && <a href="#group-budget" className="group mt-4 flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md sm:flex-row sm:items-center" data-testid="haifa-budget-spotlight">
          <span className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Another way to stay in Haifa</span>
            <strong className="mt-1 break-words text-base leading-snug sm:text-lg">Independent & budget-minded stays</strong>
            <span className="mt-2 text-sm leading-relaxed text-muted-foreground">Explore smaller places to stay in the lower city and around Talpiot Market.</span>
          </span>
          <span className="flex min-h-11 shrink-0 items-center gap-2 border-t px-4 py-3 text-sm font-semibold text-primary sm:border-l sm:border-t-0 sm:px-5">
            See hotels <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </span>
        </a>}
        <aside className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed dark:border-amber-900/50 dark:bg-amber-950/20">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <p>A room with a beautiful bay view can be high above the shore. Check the actual journey to the beach, the Bahá'í Gardens and your planned daily stops before deciding.</p>
        </aside>
      </section>

      <section id="compare" className="mt-14 scroll-mt-32" aria-labelledby="compare-h">
        <h2 id="compare-h" className="text-3xl">Haifa hotels at a glance</h2>
        <div className="mt-5 overflow-x-auto rounded-2xl border bg-card" role="region" tabIndex={0} aria-label="Compare 10 Haifa hotel recommendations">
          <table className="w-full min-w-[700px] text-left text-sm" data-testid="haifa-hotel-comparison">
            <caption className="sr-only">Recommended Haifa stays by main appeal, neighborhood and beach access</caption>
            <thead className="bg-secondary"><tr>
              <th scope="col" className="px-4 py-3 font-semibold">Hotel</th>
              <th scope="col" className="px-4 py-3 font-semibold">Best for</th>
              <th scope="col" className="px-4 py-3 font-semibold">Location</th>
              <th scope="col" className="px-4 py-3 font-semibold">Beach access</th>
            </tr></thead>
            <tbody className="divide-y">
              {allHotelIds.map(id => {
                const hotel = resortHotel(id);
                const note = hotelNotes[id];
                return <tr key={id} data-testid="haifa-comparison-row">
                  <th scope="row" className="min-w-44 px-4 py-4 align-top"><a href={"#hotel-" + id} className="font-semibold text-primary underline underline-offset-2">{hotel.name}</a></th>
                  <td className="px-4 py-4 align-top leading-relaxed">{note?.bestFor ?? hotel.bestFor}</td>
                  <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground">{hotel.resortFacts.location}</td>
                  <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground">{note?.beach ?? hotel.resortFacts.beach}</td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section id="hotels" className="mt-14 scroll-mt-32" aria-labelledby="hotels-h">
        <p className="eyebrow">My selected places to stay</p>
        <h2 id="hotels-h" className="mt-2 text-3xl">Recommended hotels by travel style</h2>
        <div className="mt-6 divide-y border-t">
          {groups.map(group => {
            const copy = groupCopy[group.id];
            const tip = groupTips[group.id];
            const browse = browseFallback[group.id];
            const affiliate = linksForPage("stay-haifa-" + group.id + "-browse").find(link => link.isAffiliate && link.partnerId === "expedia");
            const browseOfferId = affiliate?.id ?? browse?.id;
            return <section key={group.id} id={"group-" + group.id} className="scroll-mt-32 py-9 sm:py-11" aria-labelledby={"group-" + group.id + "-h"} data-testid="haifa-hotel-group">
              <p className="eyebrow">{copy?.eyebrow}</p>
              <h3 id={"group-" + group.id + "-h"} className="mt-2 text-2xl font-semibold sm:text-3xl">{copy?.title ?? group.title}</h3>
              <p className="mt-3 max-w-4xl leading-relaxed">{copy?.advice ?? group.intro}</p>
              {group.guidePath && <Link to={group.guidePath as LinkProps["to"]} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-2">
                {group.guideLabel ?? "Explore the detailed comparison"} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>}
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="haifa-hotel-grid">
                {group.hotelIds.map(id => <HotelCard key={id} id={id} pageId={pageId} />)}
                {tip && <li className="min-w-0 sm:col-span-2 lg:col-span-1" data-testid="haifa-category-tip">
                  <aside className="flex h-full flex-col rounded-xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/50 dark:bg-amber-950/20" aria-label={tip.title}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                      <Lightbulb className="h-5 w-5" aria-hidden />
                    </span>
                    <h4 className="mt-4 text-lg font-semibold leading-snug">{tip.title}</h4>
                    <ul className="mt-4 space-y-4 text-sm leading-relaxed">
                      {tip.points.map(point => <li key={point} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden />
                        <span>{point}</span>
                      </li>)}
                    </ul>
                  </aside>
                </li>}
              </ul>
              {browse && browseOfferId && <div className="mt-6 flex justify-center">
                <a href={affiliate ? hotelBrowseAffiliateUrl(affiliate, pageId) : browse.url}
                  target="_blank" rel={affiliate ? relFor(affiliate.isAffiliate) : "noopener noreferrer"}
                  onClick={() => recordOutboundClick({ pageId, productId: browseOfferId, offerId: browseOfferId })}
                  className="inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  data-testid="haifa-category-browse-link">
                  {browse.label} <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>}
            </section>;
          })}
        </div>
        <div className="mt-3 flex flex-col items-start gap-3 rounded-2xl border bg-secondary/30 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <h3 className="text-lg font-semibold">Looking for more hotels in Haifa?</h3>
          <a href={allHotelsAffiliate ? hotelBrowseAffiliateUrl(allHotelsAffiliate, pageId) : haifaAllHotelsUrl}
            target="_blank" rel={allHotelsAffiliate ? relFor(allHotelsAffiliate.isAffiliate) : "noopener noreferrer"}
            onClick={() => recordOutboundClick({ pageId, productId: allHotelsAffiliate?.id ?? "hotels-haifa-all-direct", offerId: allHotelsAffiliate?.id ?? "hotels-haifa-all-direct" })}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-card px-4 py-2 text-center text-sm font-semibold text-primary"
            data-testid="haifa-all-hotels-browse-link">
            Browse more Haifa hotels <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>

      <section id="location" className="mt-14 scroll-mt-32" aria-labelledby="location-h">
        <h2 id="location-h" className="text-3xl">Where are the hotels?</h2>
        <p className="mt-3 leading-relaxed">Haifa stretches from the port and German Colony up to the Carmel and along the southern beachfront. Use the map to orient yourself, and the individual hotel links above to find each entrance.</p>
        <div className="mt-5"><AreaMap area={{ name: "Haifa hotel areas", map: guide.map }} provider="google" googleZoom={12} /></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {guide.locations.map(location => <article key={location.name} className="rounded-xl border bg-card p-4 sm:p-5">
            <MapPin className="h-5 w-5 text-primary" aria-hidden />
            <h3 className="mt-3 font-semibold">{location.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{location.text}</p>
          </article>)}
        </div>
        <h3 className="mt-8 text-xl font-semibold">Getting to your hotel and around Haifa</h3>
        <p className="mt-3 leading-relaxed">If you arrive by train, choose the station and onward connection for your actual hotel. The <a href="https://www.carmelithaifa.com/carmelit-haifa/carmelit-haifa-about/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-2">Carmelit</a> connects the lower city with Carmel Center, but you may still need a bus, taxi or uphill walk for the final section. For airport arrivals, see my <Link to="/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/" className="font-semibold text-primary underline underline-offset-2">Ben Gurion Airport to Haifa guide</Link>.</p>
        <p className="mt-3 leading-relaxed">If you plan to visit the Bahá'í Gardens, check the entrance and visiting arrangements for the part you want to see. For shore excursions, confirm your cruise terminal and ship schedule rather than relying only on a hotel's distance from the port. You can combine Haifa with Acre, Caesarea or the Galilee by tour or private driver.</p>
      </section>

      <section id="tips" className="mt-14 scroll-mt-32" aria-labelledby="tips-h">
        <h2 id="tips-h" className="text-3xl">What to check before booking</h2>
        <ul className="mt-4 grid gap-x-6 rounded-2xl border bg-secondary/20 px-4 sm:grid-cols-2 sm:px-6" data-testid="haifa-booking-checklist">
          {bookingTips.map(tip => <li key={tip.title} className="flex items-start gap-3 border-b py-4 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
            <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <div><h3 className="font-semibold">{tip.title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tip.text}</p></div>
          </li>)}
        </ul>
        <aside className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed dark:border-amber-900/50 dark:bg-amber-950/20">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <p>Travel dates can affect hotel services and transport. My <Link to="/travel-blog/calendar-of-events/" className="font-semibold text-primary underline underline-offset-2">Israel calendar of events</Link> helps you plan around Jewish holidays and special dates.</p>
        </aside>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Hotels and booking websites are independent providers. Check the exact room, full price, guest policy and cancellation terms before confirming.</p>
      </section>

      <FaqList faqs={guide.faqs} />
      <StayTripLinks region={guide.id} currentPath={guide.path} presentation="guide" />
      <HomeContactForm guide={{
        ...guideContactCopy(guide.title, "accommodation", guide.name),
        heading: "Planning a visit to Haifa?",
        introduction: "Need an airport transfer, a private driver for a day or help planning your Haifa itinerary? Tell me your dates, pickup point and what you would like to see. I'll reply personally.",
        placeholder: "Your dates, pickup point, destinations, passengers and luggage…",
      }} />
      <SourceList ids={sourceIds} intro="Hotel websites and local travel resources, with check dates below." compact />
    </article>
  </main>;
}
