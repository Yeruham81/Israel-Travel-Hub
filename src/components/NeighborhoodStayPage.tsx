import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { cityStayGuides, neighborhoodGuidesForCity, type NeighborhoodStayGuide } from "@/data/content";
import { areaDecisionNotes } from "@/data/localEditorialInsights";
import { getSource, hotelsForArea, INFO_CHECK_DATE, linksForPage } from "@/data/registry";
import { StayHotelCard } from "@/components/StayHotelCard";
import { telAvivHotelPhotos } from "@/data/telAvivHotelPhotos";
import { jerusalemHotelPhotos } from "@/data/jerusalemHotelPhotos";
import { hotelTileCopy } from "@/components/TelAvivHotelBrowser";
import { jerusalemHotelTileCopy } from "@/components/JerusalemHotelBrowser";
import { AreaMap, AreaPhotoCredit } from "@/components/AreaMap";
import { GuideHeader, OnThisPage, Section, Checklist, FaqList, ProviderSection, RelatedLinks, SourceList } from "@/components/Guide";

const sections = [["overview", "The area"], ["highlights", "Nearby sights"], ["location", "Map & arrival"], ["book", "Hotel picks"], ["checklist", "Booking tips"], ["faq", "FAQ"], ["sources", "Sources"]] as const;

export function NeighborhoodStayPage({ area }: { area: NeighborhoodStayGuide }) {
  const city = cityStayGuides[area.cityId];
  const localInsight = areaDecisionNotes[area.id];
  const hotels = hotelsForArea(area.id, area.cityId);
  const bookings = linksForPage(`stay-area-${area.id}`);
  const otherAreas = neighborhoodGuidesForCity(area.cityId).filter((other) => other.id !== area.id);
  const pageId = `stay-area-${area.id}`;
  const airportGuide = city.related.find((item) => item.label.startsWith("Ben Gurion Airport"));
  const photos = area.cityId === "jerusalem" ? jerusalemHotelPhotos : telAvivHotelPhotos;
  const areaIndex = neighborhoodGuidesForCity(area.cityId).findIndex((item) => item.id === area.id);
  const cityPhotoList = Object.values(photos);
  // Additional cards use varied licensed generic photos from the existing city illustration pool.
  // The original two keep their own city-catalog illustration. Neither is a property photo.
  const photoFor = (hotelId: string, index: number) =>
    photos[hotelId] || cityPhotoList[(areaIndex * 2 + index) % cityPhotoList.length]!;
  const shortCopy = area.cityId === "jerusalem" ? jerusalemHotelTileCopy : hotelTileCopy;

  return (
    <main className="pb-8">
      <GuideHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Accommodation", to: "/hotels/" }, { name: city.city, to: city.path as LinkProps["to"] }, { name: area.shortName, to: area.path as LinkProps["to"] }]}
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

        <section id="book" aria-labelledby="book-h" className="mt-14 scroll-mt-32">
          <h2 id="book-h" className="text-3xl">My top picks in {area.name}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Compare four different places to stay in this area. Use Expedia to check rooms, total prices and availability for your dates.
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2" data-testid="neighborhood-hotel-grid">
            {hotels.map((hotel, index) => (
              <StayHotelCard key={hotel.id} tile hotel={hotel}
                booking={bookings.find((booking) => booking.id === `hotel-${hotel.id}-expedia`)}
                editorial={shortCopy[hotel.id] ? { summary: shortCopy[hotel.id]!.description, bestFor: shortCopy[hotel.id]!.bestFor, watch: hotel.watch } : undefined}
                photo={photoFor(hotel.id, index)}
                fallbackPhoto={area.photo}
                pageId={pageId} />
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            I may earn a commission from some existing Expedia booking links at no extra cost to you; new hotel links are direct, non-affiliate Expedia links until they are updated.
          </p>
          <details className="mt-3 rounded-xl border bg-card p-3 text-xs text-muted-foreground" data-testid="neighborhood-hotel-photo-credits">
            <summary className="cursor-pointer font-semibold text-foreground">Illustrative photo credits & licenses</summary>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {hotels.map((hotel, index) => {
                const image = photoFor(hotel.id, index);
                return <li key={hotel.id}><span className="font-medium text-foreground">{hotel.name}: </span>
                  {image.sourceUrl ? <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{image.credit}<span className="sr-only"> (opens in a new tab)</span></a> : image.credit}
                  {image.licenseUrl && <> · <a href={image.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">License<span className="sr-only"> (opens in a new tab)</span></a></>}
                </li>;
              })}
            </ul>
          </details>
        </section>
        <Section id="checklist" title="Before you book" className="scroll-mt-32">
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Checklist title="For this area" items={area.bookingTips} />
            <Checklist title={`For any ${city.city} stay`} items={["Confirm the final total including taxes, fees and extras", "Read cancellation and payment conditions for your exact room offer", "Ask about Shabbat check-in, meals and transport if relevant", "Check recent room-specific feedback and accessibility requirements"]} />
          </div>
        </Section>
        <ProviderSection id="more-hotels" title={`See more options in ${area.shortName}`} intro="Want a different room style or budget? Browse other properties, and check each one's exact map location before booking." links={linksForPage(`stay-area-${area.id}-browse`)} pageId={pageId} />
        <FaqList faqs={area.faqs} />
        <SourceList ids={[...city.sourceIds, ...hotels.map((hotel) => hotel.sourceId)]} />
        <section aria-labelledby="other-areas-h" className="mt-14">
          <h2 id="other-areas-h" className="text-3xl">Still choosing your area?</h2>
          <p className="mt-2 text-muted-foreground">Compare a different side of {city.city} before you decide.</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">{otherAreas.map((other) => <li key={other.id}><Link to={other.path as LinkProps["to"]} className="group flex h-full items-center justify-between gap-3 rounded-xl border bg-card p-4 hover:border-primary"><div><h3 className="text-xl">{other.shortName}</h3><p className="mt-1 text-xs text-muted-foreground">{other.bestFor}</p></div><ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden /></Link></li>)}</ul>
        </section>
        <RelatedLinks items={city.related} />
        <AreaPhotoCredit areas={[area]} />
      </article>
    </main>
  );
}
