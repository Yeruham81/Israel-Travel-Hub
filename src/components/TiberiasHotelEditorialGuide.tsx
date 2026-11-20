import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, Hotel, Lightbulb, MapPin } from "lucide-react";
import { accommodationEditorial } from "@/data/accommodationEditorial";
import type { HotelStayDestination } from "@/data/content";
import { linksForPage } from "@/data/registry";
import { AreaMap } from "@/components/AreaMap";
import { GuideHeader, OnThisPage, FaqList, SourceList } from "@/components/Guide";
import { HomeContactForm } from "@/components/HomeContactForm";
import { StayBookingChecklist } from "@/components/StayBookingChecklist";
import { StayTripLinks } from "@/components/StayTripLinks";
import { guideContactCopy } from "@/lib/guide-contact";
import { hotelBooking, resortHotel } from "@/components/StayGuideParts";
import { resortHotelPhoto } from "@/data/resortHotelPhotos";
import { hotelAffiliateUrl, hotelBrowseAffiliateUrl } from "@/lib/hotel-affiliate";
import { hotelGoogleMapsUrl } from "@/lib/hotel-google-maps";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import tiberiasLuxuryPhoto from "@/assets/tiberias/sunrise.webp";
import tiberiasCentralPhoto from "@/assets/travel-blog-hub/waterfront-441b1003dd-420.webp";
import tiberiasBudgetPhoto from "@/assets/home/hotel-room.webp";

/**
 * Category-first accommodation editorial, sharing the structure and UI patterns
 * of the Jerusalem and Tel Aviv travel-blog guides without duplicating the
 * /accommodation destination catalogue or category guides.
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

type HotelEditorNote = {
  kind: string;
  summary: string;
  bestFor: string;
  consider: string;
  beach: string;
};

const tiberiasHotelNotes: Record<string, HotelEditorNote> = {
  "tib-u-boutique": {
    kind: "Lakefront boutique",
    summary: "A contemporary lakeside hotel with a private beach area, seasonal outdoor pool and spa.",
    bestFor: "Couples and families seeking an upscale lakeside stay",
    consider: "Check the season's beach and pool arrangements and the exact room view.",
    beach: "Private lakeside beach area; seasonal",
  },
  "tib-galei-kinneret": {
    kind: "Luxury lake resort",
    summary: "A stylish southern-waterfront hotel with landscaped grounds, a private beach, pool and spa.",
    bestFor: "Couples, spa breaks and older families",
    consider: "Guests must be aged 12 or older; beach facilities are seasonal.",
    beach: "Private beach; seasonal access",
  },
  "tib-scots": {
    kind: "Historic retreat",
    summary: "Restored basalt-stone buildings and tranquil gardens beside the central waterfront.",
    bestFor: "Couples who enjoy history and peaceful surroundings",
    consider: "The usual age policy is 16+, with specified holiday and summer exceptions.",
    beach: "Waterfront gardens; swimming arrangements separate",
  },
  "tib-gai-beach": {
    kind: "Family water park",
    summary: "A southern-lakeshore resort with a swimming beach and a water park featuring pools and slides.",
    bestFor: "Families planning full days of swimming and activities",
    consider: "Check water-park operating dates, separate-swimming sessions and slide restrictions.",
    beach: "Swimming beach at the resort; seasonal",
  },
  "tib-leonardo-club": {
    kind: "Family activity hotel",
    summary: "A central family hotel with seasonal water slides, children's clubs and entertainment.",
    bestFor: "Families seeking meals and activities close to town",
    consider: "Confirm whether your booking is full board or all-inclusive; the advertised package can change.",
    beach: "Short trip to a public swimming beach",
  },
  "tib-caesar": {
    kind: "Promenade hotel",
    summary: "A full-service waterfront hotel with an outdoor pool and a spa with thermal mineral water.",
    bestFor: "First visits, couples and families exploring Tiberias on foot",
    consider: "The thermal mineral pool is restricted to guests aged 18 or over.",
    beach: "On the promenade; swimming beach arrangements separate",
  },
  "tib-sofia": {
    kind: "City spa hotel",
    summary: "A historic-style hotel above the lower waterfront with a spa and selected lake-view rooms.",
    bestFor: "Couples who enjoy city views and a quieter base",
    consider: "The return from the promenade involves an uphill walk.",
    beach: "Downhill walk to the lakefront",
  },
  "tib-emily": {
    kind: "Small city hotel",
    summary: "A smaller hotel near downtown, with bed-and-breakfast accommodation and a convenient town base.",
    bestFor: "Travelers exploring the Galilee between hotel stays",
    consider: "Arrange additional meals ahead and check parking or pool arrangements if needed.",
    beach: "Near the waterfront; check swimming access",
  },
  "tib-tiberia": {
    kind: "Small central hotel",
    summary: "A simple private-room hotel in Tiberias' historic center, handy for town sightseeing.",
    bestFor: "Independent visitors who prefer a conventional hotel room",
    consider: "Confirm reception hours, stairs or lift access and room facilities.",
    beach: "Central town base; walk to the lakefront",
  },
  "tib-hostel": {
    kind: "Independent hostel",
    summary: "A central hostel with shared facilities and a choice of private or dormitory rooms.",
    bestFor: "Solo visitors, budget-conscious groups and public-transport users",
    consider: "Choose the exact room and bathroom type and check late-arrival arrangements.",
    beach: "Walk to the waterfront and public beaches",
  },
};

const bookingTips = [
  { title: "Choose the walking route", text: "Check the hotel's elevation and the return from the promenade, especially with luggage or a stroller." },
  { title: "Check where you can swim", text: "Private beaches, designated swimming areas and pools have their own seasonal operating schedules." },
  { title: "Compare room views", text: "Choose an explicitly described lake-view room if sunrise over the Sea of Galilee matters to you." },
  { title: "Check children's facilities", text: "Water parks, slides, kids' clubs and pools can run on limited dates and carry age or height rules." },
  { title: "Confirm the meal plan", text: "Compare breakfast, half board, full board and all-inclusive inclusions for the exact stay dates." },
  { title: "Consider spa access", text: "Minimum guest ages, thermal-pool access and treatment charges vary between properties." },
  { title: "Plan Galilee sightseeing", text: "Sites around the lake are spread out; coordinate a car, tour or private driver in advance." },
  { title: "Check arrival details", text: "Confirm parking, the exact entrance and hotel services on weekends and Jewish holidays." },
] as const;

const groupCaptions: Record<string, { title: string; eyebrow: string; advice: string }> = {
  luxury: {
    title: "Luxury & romantic stays",
    eyebrow: "Lakeside retreats, spa and heritage",
    advice: "U Boutique offers a contemporary lakeside setting, Galei Kinneret combines spa and beach facilities, and The Scots Hotel brings history and gardens to the central waterfront.",
  },
  family: {
    title: "Family & water park hotels",
    eyebrow: "Pools, water slides and family activities",
    advice: "Gai Beach suits families spending time at the water park and beach. Leonardo Club offers clubs, entertainment and a central location with meals.",
  },
  central: {
    title: "Central & convenient hotels",
    eyebrow: "Promenade walks and easy sightseeing",
    advice: "Caesar Premier is beside the promenade, Sofia sits on higher streets with lake views, and Emily's offers a smaller base near the center.",
  },
  budget: {
    title: "Budget & independent stays",
    eyebrow: "Simple accommodation in town",
    advice: "Tiberia Hotel suits visitors seeking a private hotel room; Tiberias Hostel offers shared facilities and a choice of private and dormitory accommodation.",
  },
};

const groupPlanningTips: Record<string, { title: string; points: readonly [string, string] }> = {
  family: {
    title: "Planning a family holiday?",
    points: [
      "Check the water-park calendar, slide height limits and hours for kids' activities.",
      "Enter the ages of all children and compare meals and drinks included in the room offer.",
    ],
  },
  budget: {
    title: "Making the most of your budget",
    points: [
      "Compare private rooms and hostel beds for the same dates and number of travelers.",
      "Allow for breakfast, parking and transport between your hotel and the places you want to visit.",
    ],
  },
};

const hotelFacilityNotices: Record<string, string> = {
  "tib-galei-kinneret": "The private beach closed on October 4, 2026 for the season. It is expected to reopen for the next swimming season.",
  "tib-scots": "The seasonal outdoor pool is closed from November 1, 2026 to April 1, 2027.",
  "tib-leonardo-club": "The water slides are closed for the winter season. The hotel currently advertises full board instead of all-inclusive.",
};

const browseLabels: Record<string, string> = {
  luxury: "Browse more luxury hotels",
  family: "Browse more family hotels",
  central: "Browse more hotels in central Tiberias",
  budget: "Browse more budget-friendly stays",
};

const sourceIntro = "Official hotel websites and regional travel resources, with check dates below.";

function HotelCard({ id, pageId }: { id: string; pageId: string }) {
  const hotel = resortHotel(id);
  const info = tiberiasHotelNotes[id];
  const photo = resortHotelPhoto(id);
  const booking = hotelBooking(id);
  if (!info) return null;

  return <li id={"hotel-" + id} className="flex h-full min-w-0 scroll-mt-32 flex-col overflow-hidden rounded-xl border bg-card shadow-sm" data-testid="tiberias-editorial-hotel-card">
    <figure className="overflow-hidden bg-muted">
      <img src={photo.src} alt={photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
    </figure>
    <div className="flex flex-1 flex-col p-4 sm:p-5">
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        <Hotel className="h-4 w-4 shrink-0 text-primary" aria-hidden /> {info.kind}
      </p>
      <h4 className="mt-2 text-lg font-bold leading-snug sm:text-xl">{hotel.name}</h4>
      <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden /> {hotel.resortFacts.location}
      </p>
      <a
        href={hotelGoogleMapsUrl(hotel)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={"View location of " + hotel.name + " on Google Maps (opens in a new tab)"}
        className="mt-1.5 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-primary underline underline-offset-2 hover:text-primary/80"
        data-testid="tiberias-hotel-map-link"
      >
        View location on Google Maps <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </a>
      <p className="mt-3 text-sm leading-relaxed">{info.summary}</p>
      <p className="mt-3 text-sm leading-relaxed"><strong>Best for:</strong> {info.bestFor}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Lake access:</strong> {info.beach}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Keep in mind:</strong> {info.consider}</p>
      {hotelFacilityNotices[id] && <p className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-xs leading-relaxed text-foreground dark:border-amber-900/60 dark:bg-amber-950/20" data-testid="tiberias-hotel-facility-notice">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden />
        <span>{hotelFacilityNotices[id]}</span>
      </p>}
      {booking ? <a
        href={hotelAffiliateUrl(booking, pageId, hotel.id)}
        target="_blank"
        rel={relFor(booking.isAffiliate)}
        onClick={() => recordOutboundClick({ pageId, productId: hotel.id, offerId: booking.id })}
        aria-label={"Check rooms and rates for " + hotel.name + " on Expedia (opens in a new tab)"}
        className="group mt-auto flex min-h-11 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2.5 text-center text-sm font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        data-testid="tiberias-editorial-hotel-link"
      >
        Check rooms & rates <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
      </a> : <Link to="/accommodation/tiberias/" className="mt-auto flex min-h-11 items-center justify-center gap-2 rounded-lg border p-3 text-sm font-semibold text-primary">Explore Tiberias hotels <ArrowRight className="h-4 w-4" aria-hidden /></Link>}
    </div>
  </li>;
}

export function TiberiasHotelEditorialGuide({ guide }: { guide: HotelStayDestination }) {
  const info = accommodationEditorial.tiberias;
  const pageId = "guide-best-hotels-in-tiberias";
  const primaryGroups = guide.groups;
  const allHotelIds = guide.groups.flatMap(group => group.hotelIds);
  const sourceIds = [...new Set([...guide.sourceIds, ...allHotelIds.map(id => resortHotel(id).sourceId)])];
  const browseLink = linksForPage("stay-tiberias-browse")[0];

  return <main className="pb-10" data-testid="tiberias-style-editorial">
    <GuideHeader
      crumbs={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/travel-blog/" }, { name: info.title, to: info.path as LinkProps["to"] }]}
      eyebrow="Travel guide · Tiberias"
      title={info.title}
      intro={info.intro}
      image={guide.photo}
      checkedAt={guide.reviewedAt}
    />
    <OnThisPage sections={sections} />
    <article className="mx-auto max-w-5xl px-4">
      <section id="choose" className="mt-10 scroll-mt-32" aria-labelledby="choose-h">
        <p className="eyebrow">Choose your Tiberias stay</p>
        <h2 id="choose-h" className="mt-2 text-3xl">Which Tiberias hotel suits you?</h2>
        <p className="mt-4 max-w-4xl leading-relaxed">I recommend choosing a hotel around the kind of holiday you want: a luxurious lakeside break, family activities, a convenient central base or simple accommodation for exploring the Galilee.</p>
        <div className="mt-6 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 lg:grid-cols-3" data-testid="tiberias-category-grid">
          {primaryGroups.map(group => {
            const content = groupCaptions[group.id];
            const photo = group.id === "luxury"
              ? { src: tiberiasLuxuryPhoto, alt: "Sunrise across the Sea of Galilee" }
              : group.id === "family"
                ? { src: "/images/home/accommodation-tiberias-galilee-ai.webp", alt: "Illustrative lakeshore resort hotels in Tiberias" }
                : group.id === "central"
                  ? { src: tiberiasCentralPhoto, alt: "Tiberias town and shoreline from a hilltop viewpoint" }
                  : { src: tiberiasBudgetPhoto, alt: "Bright and comfortable hotel room" };
            return <a key={group.id} href={"#group-" + group.id} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md" data-testid="tiberias-category-card">
              <img src={photo.src} alt={photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
              <span className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
                <span className="break-words text-sm font-bold leading-snug sm:text-lg">{content?.title ?? group.title}</span>
                <span className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{content?.eyebrow ?? group.intro}</span>
                <span className="mt-3 inline-flex flex-wrap items-center gap-1 text-xs font-semibold text-primary sm:text-sm">See hotels <ArrowRight className="h-4 w-4 shrink-0" aria-hidden /></span>
              </span>
            </a>;
          })}
        </div>
        <aside className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed dark:border-amber-900/50 dark:bg-amber-950/20">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <p>If you are exploring the Galilee by day, I suggest a hotel near the central promenade or bus station. For relaxing by the lake, compare private beach access and the exact hotel location.</p>
        </aside>
      </section>

      <section id="compare" className="mt-14 scroll-mt-32" aria-labelledby="compare-h">
        <h2 id="compare-h" className="text-3xl">Tiberias hotels at a glance</h2>
        <div className="mt-5 overflow-x-auto rounded-2xl border bg-card" role="region" tabIndex={0} aria-label="Compare 10 Tiberias hotel recommendations">
          <table className="w-full min-w-[700px] text-left text-sm" data-testid="tiberias-hotel-comparison">
            <caption className="sr-only">Recommended Tiberias hotels, main appeal, location and lake access</caption>
            <thead className="bg-secondary"><tr>
              <th scope="col" className="px-4 py-3 font-semibold">Hotel</th>
              <th scope="col" className="px-4 py-3 font-semibold">Best for</th>
              <th scope="col" className="px-4 py-3 font-semibold">Location</th>
              <th scope="col" className="px-4 py-3 font-semibold">Lake access</th>
            </tr></thead>
            <tbody className="divide-y">
              {allHotelIds.map(id => {
                const hotel = resortHotel(id);
                const note = tiberiasHotelNotes[id];
                return <tr key={id} data-testid="tiberias-comparison-row">
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
          {guide.groups.map(group => {
            const copy = groupCaptions[group.id];
            const categoryBrowse = linksForPage(group.browsePageId ?? ("stay-tiberias-" + group.id + "-browse"))[0];
            return <section key={group.id} id={"group-" + group.id} className="scroll-mt-32 py-9 sm:py-11" aria-labelledby={"group-" + group.id + "-h"} data-testid="tiberias-hotel-group">
              <p className="eyebrow">{copy?.eyebrow}</p>
              <h3 id={"group-" + group.id + "-h"} className="mt-2 text-2xl font-semibold sm:text-3xl">{copy?.title ?? group.title}</h3>
              <p className="mt-3 max-w-4xl leading-relaxed">{copy?.advice ?? group.intro}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="tiberias-hotel-grid">
                {group.hotelIds.map(id => <HotelCard key={id} id={id} pageId={pageId} />)}
                {group.hotelIds.length === 2 && groupPlanningTips[group.id] && <li className="min-w-0 sm:col-span-2 lg:col-span-1" data-testid="tiberias-category-tip">
                  <aside className="flex h-full flex-col rounded-xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/50 dark:bg-amber-950/20" aria-label={groupPlanningTips[group.id]!.title}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                      <Lightbulb className="h-5 w-5" aria-hidden />
                    </span>
                    <h4 className="mt-4 text-lg font-semibold leading-snug">{groupPlanningTips[group.id]!.title}</h4>
                    <ul className="mt-4 space-y-4 text-sm leading-relaxed">
                      {groupPlanningTips[group.id]!.points.map(point => <li key={point} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden />
                        <span>{point}</span>
                      </li>)}
                    </ul>
                  </aside>
                </li>}
              </ul>
              {categoryBrowse && <div className="mt-6 flex justify-center">
                <a href={hotelBrowseAffiliateUrl(categoryBrowse, pageId)} target="_blank" rel={relFor(categoryBrowse.isAffiliate)}
                  onClick={() => recordOutboundClick({ pageId, productId: categoryBrowse.id, offerId: categoryBrowse.id })}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  data-testid="tiberias-category-browse-link">
                  {browseLabels[group.id] ?? `Browse more ${group.id} hotels`} <ArrowUpRight className="h-4 w-4" aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>}
            </section>;
          })}
        </div>
        {browseLink && <div className="mt-3 flex flex-col items-start gap-3 rounded-2xl border bg-secondary/30 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div><h3 className="text-lg font-semibold">Looking for more Tiberias hotels?</h3></div>
          <a href={hotelBrowseAffiliateUrl(browseLink, pageId)} target="_blank" rel={relFor(browseLink.isAffiliate)}
            onClick={() => recordOutboundClick({ pageId, productId: browseLink.id, offerId: browseLink.id })}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-card px-4 py-2 text-sm font-semibold text-primary">
            Browse more Tiberias hotels <ArrowUpRight className="h-4 w-4" aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>}
      </section>

      <section id="location" className="mt-14 scroll-mt-32" aria-labelledby="location-h">
        <h2 id="location-h" className="text-3xl">Where are the hotels?</h2>
        <p className="mt-3 leading-relaxed">Hotels range from the lower town and promenade to hillside streets and lakeside properties at the north and south edges. Consider the elevation as well as walking distance when choosing your base.</p>
        <div className="mt-5"><AreaMap area={{ name: "Tiberias and the Sea of Galilee waterfront", map: guide.map }} provider="google" googleZoom={13} /></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {guide.locations.map(location => <article key={location.name} className="rounded-xl border bg-card p-4 sm:p-5">
            <MapPin className="h-5 w-5 text-primary" aria-hidden />
            <h3 className="mt-3 font-semibold">{location.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{location.text}</p>
          </article>)}
        </div>
        <div className="mt-5 space-y-3">
          <p className="leading-relaxed">{guide.arrival[0]}</p>
          <p className="leading-relaxed">For outings around the Sea of Galilee, a car, organized tour or booked driver makes it easy to visit <Link to="/attractions/magdala/" className="font-semibold text-primary underline underline-offset-2">Magdala</Link>, <Link to="/attractions/capernaum/" className="font-semibold text-primary underline underline-offset-2">Capernaum</Link>, <Link to="/attractions/tabgha/" className="font-semibold text-primary underline underline-offset-2">Tabgha</Link> and the <Link to="/attractions/mount-of-beatitudes/" className="font-semibold text-primary underline underline-offset-2">Mount of Beatitudes</Link> in one day. My <Link to="/travel-blog/sea-of-galilee/" className="font-semibold text-primary underline underline-offset-2">Sea of Galilee guide</Link> has more ideas for your visit.</p>
        </div>
      </section>

      <section id="tips" className="mt-14 scroll-mt-32" aria-labelledby="tips-h">
        <h2 id="tips-h" className="text-3xl">What to check before booking</h2>
        <StayBookingChecklist testId="tiberias-booking-checklist" groups={[
          { title: "Location & arrival", items: bookingTips.slice(0, Math.ceil(bookingTips.length / 2)) },
          { title: "Room & booking conditions", items: bookingTips.slice(Math.ceil(bookingTips.length / 2)) },
        ]} />
        <aside className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed dark:border-amber-900/50 dark:bg-amber-950/20">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <p>Weekends and holidays are busy around the lake. My <Link to="/travel-blog/calendar-of-events/" className="font-semibold text-primary underline underline-offset-2">Israel calendar of events</Link> can help you plan the dates, hotel meals and arrival arrangements.</p>
        </aside>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Compare the full room price, included meals and cancellation conditions before booking.</p>
      </section>

      <FaqList faqs={guide.faqs} />
      <StayTripLinks region={guide.id} currentPath={info.path} presentation="guide" />
      <HomeContactForm guide={{
        ...guideContactCopy(info.title, "accommodation", guide.name),
        heading: "Need private transport to Tiberias?",
        introduction: "I'm Moshe Barak. I arrange private transfers to Tiberias and day trips around the Sea of Galilee. Send me your pickup location, travel date, destinations and group details, and I'll reply personally.",
        placeholder: "Pickup location, Tiberias hotel, travel date, passengers and luggage…",
      }} />
      <SourceList ids={sourceIds} intro={sourceIntro} compact />
    </article>
  </main>;
}
