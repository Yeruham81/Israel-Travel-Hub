import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { cityStayGuides, neighborhoodGuidesForCity, type NeighborhoodStayGuide } from "@/data/content";
import { areaDecisionNotes } from "@/data/localEditorialInsights";
import { hotelsForArea, INFO_CHECK_DATE, linksForPage } from "@/data/registry";
import { StayHotelCard } from "@/components/StayHotelCard";
import { cityHotelPhoto } from "@/data/cityHotelCatalog";
import { hotelTileCopy } from "@/components/TelAvivHotelBrowser";
import { JerusalemHotelTile, jerusalemHotelTileCopy } from "@/components/JerusalemHotelBrowser";
import { AreaMap, AreaPhotoCredit } from "@/components/AreaMap";
import { GuideHeader, OnThisPage, Section, Checklist, FaqList, ProviderSection, SourceList } from "@/components/Guide";
import { StayTripLinks } from "@/components/StayTripLinks";
import { HomeContactForm } from "@/components/HomeContactForm";
import { guideContactCopy } from "@/lib/guide-contact";
import { hotelBrowseAffiliateUrl } from "@/lib/hotel-affiliate";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import jerusalemAreaGuidePhoto from "@/assets/home/jerusalem-old-city-tile.webp";

const sections = [["overview", "The area"], ["highlights", "Nearby sights"], ["location", "Map & arrival"], ["book", "Hotel picks"], ["checklist", "Booking tips"], ["other-areas", "More areas"], ["faq", "FAQ"], ["explore", "Local guides"], ["trip-planning", "Trip planning"], ["contact", "Contact me"], ["sources", "Sources"]] as const;

export function NeighborhoodStayPage({ area }: { area: NeighborhoodStayGuide }) {
  const city = cityStayGuides[area.cityId];
  const isJerusalem = area.cityId === "jerusalem";
  const localInsight = areaDecisionNotes[area.id];
  const hotels = hotelsForArea(area.id, area.cityId);
  const bookings = linksForPage(`stay-area-${area.id}`);
  const otherAreas = neighborhoodGuidesForCity(area.cityId).filter((other) => other.id !== area.id);
  const pageId = `stay-area-${area.id}`;
  const airportGuide = city.related.find((item) => item.label.startsWith("Ben Gurion Airport"));
  const shortCopy = isJerusalem ? jerusalemHotelTileCopy : hotelTileCopy;

  return (
    <main className="pb-8">
      <GuideHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Accommodation", to: "/accommodation/" }, { name: city.city, to: city.path as LinkProps["to"] }, { name: area.shortName, to: area.path as LinkProps["to"] }]}
        eyebrow={`${city.city} area guide · Where to stay`}
        title={area.title}
        intro={area.summary}
        image={area.photo}
        checkedAt={city.reviewedAt || INFO_CHECK_DATE}
      />
      <OnThisPage sections={sections} />
      <article className="mx-auto max-w-5xl px-4">
        <Link to={city.path as LinkProps["to"]} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="h-4 w-4" aria-hidden /> Compare all {city.city} areas</Link>
        <dl className="mt-6 grid gap-4 rounded-2xl border bg-card p-5 sm:grid-cols-3 sm:p-6">
          <div><dt className="eyebrow">Best for</dt><dd className="mt-2 text-sm font-medium">{area.bestFor}</dd></div>
          <div><dt className="eyebrow">Stay style</dt><dd className="mt-2 text-sm font-medium">{area.priceLevel}</dd></div>
          <div><dt className="eyebrow">The tradeoff</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.watch}</dd></div>
        </dl>
        <Section id="overview" title={`What is it like to stay in ${area.name}?`} className="scroll-mt-32">
          {area.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {localInsight && <aside className="mt-6 rounded-2xl border bg-secondary/40 p-5 sm:p-6">
            <h3 className="text-xl font-semibold">{localInsight.heading}</h3>
            <p className="mt-3 text-sm leading-relaxed"><strong>Why stay here:</strong> {localInsight.choose}</p>
            <p className="mt-2 text-sm leading-relaxed"><strong>Worth comparing:</strong> {localInsight.compare}</p>
            <p className="mt-2 text-sm leading-relaxed"><strong>Arriving with luggage:</strong> {localInsight.arrival}</p>
          </aside>}
          {isJerusalem && <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Still comparing locations? <Link to={"/travel-blog/where-to-stay-in-jerusalem/" as LinkProps["to"]} className="font-semibold text-primary underline underline-offset-4">Read my guide to where to stay in Jerusalem</Link> for a broader look at the city’s neighborhoods.
          </p>}
        </Section>
        <Section id="highlights" title="Nearby sights & local character" className="scroll-mt-32">
          <div className="mt-5 grid gap-4 sm:grid-cols-3">{area.highlights.map((highlight) => <div key={highlight.name} className="rounded-2xl border bg-card p-5"><MapPin className="h-5 w-5 text-primary" aria-hidden /><h3 className="mt-3 text-xl">{highlight.name}</h3><p className="mt-2 text-sm! text-muted-foreground">{highlight.text}</p></div>)}</div>
        </Section>
        <Section id="location" title="Map, getting around & arriving with luggage" className="scroll-mt-32">
          <div className="mt-5"><AreaMap area={area} /></div>
          {area.gettingAround.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="mt-5"><Checklist title="Make your arrival easier" items={area.arrivalTips} /></div>
          {airportGuide && <p><Link to={airportGuide.to}>Planning an airport arrival? Compare the options from Ben Gurion Airport to {city.city}.</Link></p>}
        </Section>

        <section id="book" aria-labelledby="book-h" className="mt-12 scroll-mt-32">
          <h2 id="book-h" className="text-2xl font-semibold sm:text-3xl">{isJerusalem ? `Hotels I recommend in ${area.shortName}` : `My top picks in ${area.name}`}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {isJerusalem
              ? "Compare four selected places to stay, then check room choices, total prices and booking terms for your dates on the booking platform."
              : "Compare four different places to stay in this area. Use Expedia to check rooms, total prices and availability for your dates."}
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2" data-testid="neighborhood-hotel-grid">
            {isJerusalem
              ? hotels.map((hotel) => <JerusalemHotelTile key={hotel.id} hotel={hotel} pageId={pageId} showArea={false} />)
              : hotels.map((hotel) => (
                <StayHotelCard key={hotel.id} tile hotel={hotel}
                  booking={bookings.find((booking) => booking.id === `hotel-${hotel.id}-expedia`)}
                  editorial={shortCopy[hotel.id] ? { summary: shortCopy[hotel.id]!.description, bestFor: shortCopy[hotel.id]!.bestFor, watch: hotel.watch } : undefined}
                  photo={cityHotelPhoto(hotel)}
                  fallbackPhoto={area.photo}
                  pageId={pageId} />
              ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {isJerusalem
              ? "Hotel links open a third-party booking platform. Check the room details, total price and booking conditions before confirming your reservation."
              : "Check hotel prices, availability and booking conditions for your dates directly on Expedia."}
          </p>
        </section>
        <Section id="checklist" title="Before you book" className="scroll-mt-32">
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Checklist title="For this area" items={area.bookingTips} />
            <Checklist title={`For any ${city.city} stay`} items={["Confirm the final total including taxes, fees and extras", "Read cancellation and payment conditions for your exact room offer", "Ask about Shabbat check-in, meals and transport if relevant", "Check recent room-specific feedback and accessibility requirements"]} />
          </div>
        </Section>
        {isJerusalem ? (
          <section id="more-hotels" aria-label={`More hotels in ${area.shortName}`} className="mt-8 scroll-mt-32 rounded-2xl border bg-secondary/35 p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="max-w-xl">
                <h3 className="text-lg font-semibold">Looking for another hotel in {area.shortName}?</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Explore more options and check the exact location, room details and cancellation conditions for your dates.</p>
              </div>
              {linksForPage(`stay-area-${area.id}-browse`).map((booking) => (
                <a key={booking.id} href={hotelBrowseAffiliateUrl(booking, pageId)} target="_blank" rel={relFor(booking.isAffiliate)}
                  onClick={() => recordOutboundClick({ pageId, productId: booking.id, offerId: booking.id })}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-card px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Browse more {area.shortName} hotels <ArrowRight className="h-4 w-4" aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </section>
        ) : <ProviderSection id="more-hotels" title={`See more options in ${area.shortName}`} intro="Want a different room style or budget? Browse other properties, and check each one's exact map location before booking." links={linksForPage(`stay-area-${area.id}-browse`)} pageId={pageId} />}
        <section id="other-areas" aria-labelledby="other-areas-h" className="mt-14 scroll-mt-32">
          <h2 id="other-areas-h" className="text-3xl">Explore Other Areas to Stay</h2>
          <p className="mt-2 text-muted-foreground">Compare a different side of {city.city} before you decide.</p>
          <ul className={`mt-5 grid gap-4 sm:grid-cols-2 ${isJerusalem ? "lg:grid-cols-3" : ""}`}>{otherAreas.map((other) => <li key={other.id} className="min-w-0">
            <Link to={other.path as LinkProps["to"]} className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card hover:border-primary">
              <img src={other.photo.src} alt={other.photo.alt} width={600} height={375} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
              <span className="flex flex-1 items-center justify-between gap-3 p-4">
                <span><span className="block text-xl font-semibold">{other.shortName}</span><span className="mt-1 block text-xs text-muted-foreground">{other.bestFor}</span></span>
                <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              </span>
            </Link>
          </li>)}
            {isJerusalem && <li className="min-w-0">
              <Link to={city.path as LinkProps["to"]} className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card hover:border-primary">
                <img src={jerusalemAreaGuidePhoto} alt="Jerusalem Old City skyline and surrounding neighborhoods" width={600} height={375} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
                <span className="flex flex-1 items-center justify-between gap-3 p-4">
                  <span><span className="block text-xl font-semibold">All Jerusalem neighborhoods</span><span className="mt-1 block text-xs text-muted-foreground">Compare areas and hotel choices across the city</span></span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                </span>
              </Link>
            </li>}</ul>
        </section>
        <FaqList faqs={area.faqs} />
        <StayTripLinks region={area.cityId} currentPath={area.path} />
        <HomeContactForm key={area.id} guide={guideContactCopy(area.title, "accommodation", `${area.shortName}, ${city.city}`)} />
        <AreaPhotoCredit areas={[area]} />
        <div className="mt-5"><details className="mt-3 rounded-xl border bg-card p-3 text-xs text-muted-foreground" data-testid="neighborhood-hotel-photo-credits">
            <summary className="cursor-pointer font-semibold text-foreground">Illustrative photo credits & licenses</summary>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {hotels.map((hotel) => {
                const image = cityHotelPhoto(hotel);
                return <li key={hotel.id}><span className="font-medium text-foreground">{hotel.name}: </span>
                  {image.sourceUrl ? <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{image.credit}<span className="sr-only"> (opens in a new tab)</span></a> : image.credit}
                  {image.licenseUrl && <> · <a href={image.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">License<span className="sr-only"> (opens in a new tab)</span></a></>}
                </li>;
              })}
            </ul>
          </details></div>
        <SourceList ids={[...city.sourceIds, ...hotels.map((hotel) => hotel.sourceId)]} />
      </article>
    </main>
  );
}
