import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, Hotel, Lightbulb, MapPin } from "lucide-react";
import { accommodationEditorial } from "@/data/accommodationEditorial";
import type { HotelStayDestination } from "@/data/content";
import { linksForPage } from "@/data/registry";
import { AreaMap } from "@/components/AreaMap";
import { GuideHeader, OnThisPage, FaqList, SourceList } from "@/components/Guide";
import { HomeContactForm } from "@/components/HomeContactForm";
import { StayTripLinks } from "@/components/StayTripLinks";
import { guideContactCopy } from "@/lib/guide-contact";
import { hotelBooking, resortHotel } from "@/components/StayGuideParts";
import { resortHotelPhoto } from "@/data/resortHotelPhotos";
import { hotelAffiliateUrl, hotelBrowseAffiliateUrl } from "@/lib/hotel-affiliate";
import { hotelGoogleMapsUrl } from "@/lib/hotel-google-maps";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import deadSeaValueImage from "@/assets/attractions-hub/region-dead-sea-masada-480.webp";
import deadSeaSpaImage from "@/assets/home/hero-refresh-dead-sea-salt-v4-medium.webp";

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

const deadSeaHotelNotes: Record<string, HotelEditorNote> = {
  "ds-kayma": {
    kind: "Luxury resort",
    summary: "An intimate, low-rise luxury stay with an infinity pool and direct access to the Dead Sea shore.",
    bestFor: "Couples and quieter upscale breaks",
    consider: "Guests must be aged 10 or older; the southern location is less convenient for shops.",
    beach: "Direct beach access",
  },
  "ds-herods": {
    kind: "Luxury spa",
    summary: "A full-service beachfront resort near Neve Zohar with the Vitalis Spa and a quieter setting.",
    bestFor: "Spa holidays and resort-focused stays",
    consider: "Check which spa facilities and treatments are included in your booking.",
    beach: "Serviced beach via a deck path",
  },
  "ds-milos": {
    kind: "Design resort",
    summary: "A Greek-inspired, low-rise Ein Bokek hotel with beach access and spa facilities.",
    bestFor: "Couples who enjoy distinctive design",
    consider: "Private pools and outdoor areas depend on the exact room category.",
    beach: "Beachfront access",
  },
  "ds-nevo": {
    kind: "Spa resort",
    summary: "A substantial Ein Bokek resort combining pools, the Esprit Spa and convenient beach services.",
    bestFor: "First visits and mixed-interest groups",
    consider: "Treatments and certain facilities may cost extra; check spa entry policies.",
    beach: "Beach beside the hotel",
  },
  "ds-oasis": {
    kind: "Wellness hotel",
    summary: "A spa-focused hotel in Ein Bokek with a Moroccan-inspired wellness complex and a short beach walk.",
    bestFor: "Visitors seeking an age-restricted spa atmosphere",
    consider: "The hotel lists entry from 16; check-in is from 18, with accompaniment rules for younger guests.",
    beach: "Short walk to the beach",
  },
  "ds-leonardo-club": {
    kind: "Family resort",
    summary: "An all-inclusive-style southern resort with a water park, children's activities and beach access.",
    bestFor: "Families who want meals and activities on site",
    consider: "Check the exact meal package and the water park's operating schedule.",
    beach: "Direct access to an adjacent beach",
  },
  "ds-vert": {
    kind: "Beachfront resort",
    summary: "A central Ein Bokek hotel with beach access, pools, a spa and family facilities.",
    bestFor: "Families who prefer an Ein Bokek base",
    consider: "Meal plans vary; children's activities and outdoor pools can be seasonal.",
    beach: "Adjacent beach access",
  },
  "ds-noga": {
    kind: "Practical resort",
    summary: "An Ein Bokek option with mineral-water pools and the Esprit Spa, a short walk from the shore.",
    bestFor: "Travelers comparing facilities and total cost",
    consider: "Spa entry is restricted to guests aged 16+; treatments are charged separately.",
    beach: "Short walk to the beach",
  },
  "ds-leonardo-plaza": {
    kind: "Family hotel",
    summary: "A self-contained southern hotel with family-room options and resort facilities.",
    bestFor: "Families comparing package value",
    consider: "Confirm the pathway or shuttle to the beach and its current timetable.",
    beach: "Pathway or shuttle to the beach",
  },
  "ds-ein-gedi": {
    kind: "Nature retreat",
    summary: "An inland hotel amid Ein Gedi's gardens, with the Synergy Spa and access to nearby nature outings.",
    bestFor: "Nature-focused visits and spa time",
    consider: "The hotel is not beside an operating bathing beach; plan beach time separately.",
    beach: "Travel required to an operating beach",
  },
  "ds-hi-ein-gedi": {
    kind: "Simple hostel",
    summary: "Straightforward accommodation near Ein Gedi Nature Reserve for independent travelers and groups.",
    bestFor: "Hikers, families and budget-minded visitors",
    consider: "No resort spa or nearby operating bathing beach; confirm room and reception details.",
    beach: "Travel required to an operating beach",
  },
};

const bookingTips = [
  { title: "Check the real beach route", text: "A beachfront label may mean direct access, a short walk, a pathway or a hotel shuttle." },
  { title: "Separate hotel and spa age rules", text: "Minimum guest ages and spa or mineral-pool age restrictions are not always the same." },
  { title: "Compare pool types", text: "Freshwater, Dead Sea mineral-water and sulphur pools are different facilities, with different access rules." },
  { title: "Read the meal plan", text: "Confirm breakfast, half-board or all-inclusive details, including drinks and snacks where relevant." },
  { title: "Check family facilities", text: "Ask about the dates, hours and age limits for children's clubs, slides and outdoor pools." },
  { title: "Select the exact room", text: "Sea views, private pools, connecting rooms and accessible entrances depend on the room category." },
  { title: "Plan the arrival and return", text: "Confirm the hotel entrance, bus stop or transfer, especially on Friday evenings and Jewish holidays." },
  { title: "Compare the complete total", text: "Check taxes, spa extras, parking, cancellation deadlines and all guests before paying." },
] as const;

const groupCaptions: Record<string, { title: string; eyebrow: string; advice: string }> = {
  luxury: {
    title: "Luxury & romantic stays",
    eyebrow: "Private retreats and refined resorts",
    advice: "Kayma is the most intimate option, Herods emphasizes a full-service spa and southern beachfront setting, and Milos stands out for design in Ein Bokek.",
  },
  spa: {
    title: "Spa & wellness hotels",
    eyebrow: "Mineral pools, treatments and relaxation",
    advice: "Nevo suits a broader resort holiday; Oasis is more focused on a quieter, age-restricted spa experience. Compare entry rules and treatment charges before deciding.",
  },
  family: {
    title: "Family & all-inclusive hotels",
    eyebrow: "Activities, meals and beach days",
    advice: "Leonardo Club suits families seeking an activity-led package, while VERT offers a more conventional resort stay near the Ein Bokek promenade.",
  },
  value: {
    title: "Best-value stays",
    eyebrow: "Comfortable stays with practical facilities",
    advice: "Noga combines an Ein Bokek location with mineral-water pools. Leonardo Plaza offers family rooms and resort facilities in the southern hotel district.",
  },
  "ein-gedi": {
    title: "Staying near Ein Gedi",
    eyebrow: "Gardens, desert scenery and nature trails",
    advice: "Choose Ein Gedi Hotel for landscaped gardens and a spa, or HI Ein Gedi Hostel for simple accommodation close to nature outings. Plan beach bathing as a separate excursion.",
  },
};

/** Practical prompts that occupy the third column where a category has two hotels. */
const groupPlanningTips: Record<string, { title: string; points: readonly [string, string] }> = {
  spa: {
    title: "Make the most of your spa break",
    points: [
      "Reserve treatments ahead of your visit, especially for weekends and holiday periods.",
      "Check spa opening times and which mineral pools are included in your room rate.",
    ],
  },
  family: {
    title: "Plan a family-friendly stay",
    points: [
      "Check water-park opening dates, slide height limits and children's activity hours.",
      "Compare the meal and drink inclusions for adults and children in your chosen package.",
    ],
  },
  value: {
    title: "Find the best overall value",
    points: [
      "Compare hotels for the same dates, room size, meal plan and cancellation terms.",
      "Include parking, spa admission and any beach transport in the total cost.",
    ],
  },
  "ein-gedi": {
    title: "Plan your Ein Gedi outings",
    points: [
      "Check nature-reserve opening hours and trail conditions before your visit.",
      "Arrange transport to a designated Dead Sea bathing beach if you want time in the water.",
    ],
  },
};

const hotelFacilityNotices: Record<string, string> = {
  "ds-herods": "As of November 2026, the spa Jacuzzi is temporarily out of service.",
  "ds-leonardo-club": "As of November 2026, the water park is temporarily closed. Ask the hotel about reopening before planning your stay.",
};

const browseLabels: Record<string, string> = {
  luxury: "Browse more luxury hotels",
  spa: "Browse more spa hotels",
  family: "Browse more family hotels",
  value: "Browse more affordable Dead Sea stays",
  "ein-gedi": "Browse more places to stay near Ein Gedi",
};

const sourceIntro = "Hotel websites and practical travel resources.";

function HotelCard({ id, pageId }: { id: string; pageId: string }) {
  const hotel = resortHotel(id);
  const info = deadSeaHotelNotes[id];
  const photo = resortHotelPhoto(id);
  const booking = hotelBooking(id);
  if (!info) return null;

  return <li id={"hotel-" + id} className="flex h-full min-w-0 scroll-mt-32 flex-col overflow-hidden rounded-xl border bg-card shadow-sm" data-testid="deadsea-editorial-hotel-card">
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
        data-testid="deadsea-hotel-map-link"
      >
        View location on Google Maps <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </a>
      <p className="mt-3 text-sm leading-relaxed">{info.summary}</p>
      <p className="mt-3 text-sm leading-relaxed"><strong>Best for:</strong> {info.bestFor}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Beach:</strong> {info.beach}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Keep in mind:</strong> {info.consider}</p>
      {hotelFacilityNotices[id] && <p className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-xs leading-relaxed text-foreground dark:border-amber-900/60 dark:bg-amber-950/20" data-testid="deadsea-hotel-facility-notice">
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
        data-testid="deadsea-editorial-hotel-link"
      >
        Check rooms & rates <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
      </a> : <Link to="/accommodation/dead-sea/" className="mt-auto flex min-h-11 items-center justify-center gap-2 rounded-lg border p-3 text-sm font-semibold text-primary">Explore Dead Sea hotels <ArrowRight className="h-4 w-4" aria-hidden /></Link>}
    </div>
  </li>;
}

export function HotelStyleEditorialGuide({ guide }: { guide: HotelStayDestination }) {
  const info = accommodationEditorial.deadsea;
  const pageId = "guide-best-dead-sea-hotels";
  const primaryGroups = guide.groups.filter(group => group.id !== "ein-gedi");
  const einGediGroup = guide.groups.find(group => group.id === "ein-gedi");
  const allHotelIds = guide.groups.flatMap(group => group.hotelIds);
  const sourceIds = [...new Set([...guide.sourceIds, ...allHotelIds.map(id => resortHotel(id).sourceId)])];
  const browseLink = linksForPage("stay-deadsea-browse")[0];

  return <main className="pb-10" data-testid="deadsea-style-editorial">
    <GuideHeader
      crumbs={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/travel-blog/" }, { name: info.title, to: info.path as LinkProps["to"] }]}
      eyebrow="Travel guide · The Dead Sea"
      title={info.title}
      intro={info.intro}
      image={guide.photo}
      checkedAt={guide.reviewedAt}
    />
    <OnThisPage sections={sections} />
    <article className="mx-auto max-w-5xl px-4">
      <section id="choose" className="mt-10 scroll-mt-32" aria-labelledby="choose-h">
        <p className="eyebrow">Choose the holiday, then the hotel</p>
        <h2 id="choose-h" className="mt-2 text-3xl">Which Dead Sea stay suits you?</h2>
        <p className="mt-4 max-w-4xl leading-relaxed">I usually start by asking what matters most: time on an operating beach, a spa break, activities for children or a comfortable hotel at the right total price. The main resorts are in Ein Bokek and the southern hotel district; Ein Gedi is a different, nature-focused choice.</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" data-testid="deadsea-category-grid">
          {primaryGroups.map(group => {
            const content = groupCaptions[group.id];
            const photo = group.id === "value"
              ? { src: deadSeaValueImage, alt: "Visitor relaxing in the shallow turquoise waters of the Dead Sea" }
              : group.id === "family"
                ? { src: "/images/home/accommodation-dead-sea-ai.webp", alt: "Illustrative Dead Sea hotels along the shore below the desert cliffs" }
                : group.id === "spa"
                  ? { src: deadSeaSpaImage, alt: "Sunset over the mineral-rich Dead Sea shoreline" }
                  : group.photo;
            return <a key={group.id} href={"#group-" + group.id} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md" data-testid="deadsea-category-card">
              <img src={photo.src} alt={photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
              <span className="flex flex-1 flex-col p-3 sm:p-4">
                <span className="text-sm font-bold leading-snug sm:text-lg">{content?.title ?? group.title}</span>
                <span className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{content?.eyebrow ?? group.intro}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary sm:text-sm">Explore this category <ArrowRight className="h-4 w-4" aria-hidden /></span>
              </span>
            </a>;
          })}
        </div>
        {einGediGroup && <a href="#group-ein-gedi" className="group mt-4 flex overflow-hidden rounded-2xl border bg-card shadow-sm transition-colors hover:border-primary/60" data-testid="deadsea-ein-gedi-spotlight">
          <img src={einGediGroup.photo.src} alt={einGediGroup.photo.alt} width={320} height={200} loading="lazy" decoding="async" className="aspect-[4/3] w-28 shrink-0 object-cover sm:w-44" />
          <span className="flex flex-1 flex-col justify-center p-3 sm:p-5">
            <strong className="text-base sm:text-lg">Staying near Ein Gedi?</strong>
            <span className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">A peaceful base for visiting Ein Gedi Nature Reserve and enjoying the desert scenery.</span>
            <span className="mt-2 flex items-center gap-1 text-xs font-semibold text-primary sm:text-sm">See Ein Gedi stays <ArrowRight className="h-4 w-4" aria-hidden /></span>
          </span>
        </a>}
        <aside className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed dark:border-amber-900/50 dark:bg-amber-950/20">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <p>For a first Dead Sea visit, I recommend comparing beach access, mineral-water pools and the full room-and-meals package before choosing a hotel.</p>
        </aside>
      </section>

      <section id="compare" className="mt-14 scroll-mt-32" aria-labelledby="compare-h">
        <h2 id="compare-h" className="text-3xl">Dead Sea hotels at a glance</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">Compare the location, beach access and best features of 11 places to stay along the Israeli Dead Sea.</p>
        <div className="mt-5 overflow-x-auto rounded-2xl border bg-card" role="region" tabIndex={0} aria-label="Compare 11 Dead Sea hotel recommendations">
          <table className="w-full min-w-[700px] text-left text-sm" data-testid="deadsea-hotel-comparison">
            <caption className="sr-only">Recommended Dead Sea stays, main appeal, location and beach arrangement</caption>
            <thead className="bg-secondary"><tr>
              <th scope="col" className="px-4 py-3 font-semibold">Hotel</th>
              <th scope="col" className="px-4 py-3 font-semibold">Best for</th>
              <th scope="col" className="px-4 py-3 font-semibold">Location</th>
              <th scope="col" className="px-4 py-3 font-semibold">Beach arrangement</th>
            </tr></thead>
            <tbody className="divide-y">
              {allHotelIds.map(id => {
                const hotel = resortHotel(id);
                const note = deadSeaHotelNotes[id];
                return <tr key={id} data-testid="deadsea-comparison-row">
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
        <p className="mt-3 max-w-4xl leading-relaxed">I have selected 11 stays across five travel styles, from luxury resorts to simple accommodation near Ein Gedi.</p>
        <div className="mt-6 divide-y border-t">
          {guide.groups.map(group => {
            const copy = groupCaptions[group.id];
            const categoryBrowse = linksForPage(group.browsePageId ?? ("stay-deadsea-" + group.id + "-browse"))[0];
            return <section key={group.id} id={"group-" + group.id} className="scroll-mt-32 py-9 sm:py-11" aria-labelledby={"group-" + group.id + "-h"} data-testid="deadsea-hotel-group">
              <p className="eyebrow">{copy?.eyebrow}</p>
              <h3 id={"group-" + group.id + "-h"} className="mt-2 text-2xl font-semibold sm:text-3xl">{copy?.title ?? group.title}</h3>
              <p className="mt-3 max-w-4xl leading-relaxed">{copy?.advice ?? group.intro}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="deadsea-hotel-grid">
                {group.hotelIds.map(id => <HotelCard key={id} id={id} pageId={pageId} />)}
                {group.hotelIds.length === 2 && groupPlanningTips[group.id] && <li className="min-w-0 sm:col-span-2 lg:col-span-1" data-testid="deadsea-category-tip">
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
                  data-testid="deadsea-category-browse-link">
                  {browseLabels[group.id] ?? `Browse more ${group.id} hotels`} <ArrowUpRight className="h-4 w-4" aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>}
            </section>;
          })}
        </div>
        {browseLink && <div className="mt-3 flex flex-col items-start gap-3 rounded-2xl border bg-secondary/30 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div><h3 className="text-lg font-semibold">Looking for more Dead Sea hotels?</h3></div>
          <a href={hotelBrowseAffiliateUrl(browseLink, pageId)} target="_blank" rel={relFor(browseLink.isAffiliate)}
            onClick={() => recordOutboundClick({ pageId, productId: browseLink.id, offerId: browseLink.id })}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-card px-4 py-2 text-sm font-semibold text-primary">
            Browse more Dead Sea hotels <ArrowUpRight className="h-4 w-4" aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>}
      </section>

      <section id="location" className="mt-14 scroll-mt-32" aria-labelledby="location-h">
        <h2 id="location-h" className="text-3xl">Where are the hotels?</h2>
        <p className="mt-3 leading-relaxed">Most resort hotels are concentrated around Ein Bokek and the southern district near Neve Zohar. Ein Gedi is farther north and works better as a base for nature outings. Use the map for orientation, then check the precise hotel address before arranging transport.</p>
        <div className="mt-5"><AreaMap area={{ name: "Dead Sea hotel region", map: guide.map }} provider="google" googleZoom={9} /></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {guide.locations.map(location => <article key={location.name} className="rounded-xl border bg-card p-4 sm:p-5">
            <MapPin className="h-5 w-5 text-primary" aria-hidden />
            <h3 className="mt-3 font-semibold">{location.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{location.text}</p>
          </article>)}
        </div>
        <div className="mt-5 space-y-3">
          <p className="leading-relaxed">{guide.arrival[0]}</p>
          <p className="leading-relaxed">A car or a booked driver is useful for combining your stay with sites along Route 90, such as <Link to="/attractions/masada/" className="font-semibold text-primary underline underline-offset-2">Masada</Link>, <Link to="/attractions/ein-gedi/" className="font-semibold text-primary underline underline-offset-2">Ein Gedi Nature Reserve</Link> and <Link to="/attractions/qasr-el-yahud/" className="font-semibold text-primary underline underline-offset-2">Qasr el Yahud</Link>. My <Link to="/travel-blog/dead-sea-attractions/" className="font-semibold text-primary underline underline-offset-2">Dead Sea attractions guide</Link> covers more stops in the region. Check current transport services, attraction access and hotel check-in for your travel date, especially Friday evening, Saturday and holidays. Reserve child seats or accessible transport where needed.</p>
        </div>
      </section>

      <section id="tips" className="mt-14 scroll-mt-32" aria-labelledby="tips-h">
        <h2 id="tips-h" className="text-3xl">What to check before booking</h2>
        <ul className="mt-4 grid gap-x-6 rounded-2xl border bg-secondary/20 px-4 sm:grid-cols-2 sm:px-6" data-testid="deadsea-booking-checklist">
          {bookingTips.map(tip => <li key={tip.title} className="flex items-start gap-3 border-b py-4 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary"><Check className="h-4 w-4" aria-hidden /></span>
            <div><h3 className="font-semibold">{tip.title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tip.text}</p></div>
          </li>)}
        </ul>
        <aside className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed dark:border-amber-900/50 dark:bg-amber-950/20">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <p>Dates can change services and room packages. Check my <Link to="/travel-blog/calendar-of-events/" className="font-semibold text-primary underline underline-offset-2">Israel calendar of events</Link> for holidays, and reconfirm spa and beach facilities for the dates of your stay.</p>
        </aside>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Hotels and booking websites are independent providers. Review the exact room, address, full price and cancellation conditions before confirming.</p>
      </section>

      <FaqList faqs={guide.faqs} />
      <StayTripLinks region={guide.id} currentPath={info.path} presentation="guide" />
      <HomeContactForm guide={{
        ...guideContactCopy(info.title, "accommodation", guide.name),
        heading: "Planning a Dead Sea Vacation?",
        introduction: "Need a private transfer to your hotel in Ein Bokek? Send me your pickup location, date, number of passengers and luggage details, and I'll help arrange the journey.",
        placeholder: "Pickup location, Ein Bokek hotel, travel date, passengers and luggage…",
      }} />
      <SourceList ids={sourceIds} intro={sourceIntro} />
    </article>
  </main>;
}
