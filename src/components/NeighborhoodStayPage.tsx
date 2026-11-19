import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Lightbulb, MapPin } from "lucide-react";
import { cityStayGuides, neighborhoodGuidesForCity, type NeighborhoodStayGuide } from "@/data/content";
import { areaDecisionNotes } from "@/data/localEditorialInsights";
import { hotelsForArea, INFO_CHECK_DATE, linksForPage } from "@/data/registry";
import { cityHotelPhoto } from "@/data/cityHotelCatalog";
import { JerusalemHotelTile } from "@/components/JerusalemHotelBrowser";
import { JerusalemNeighborhoodGuideCallout } from "@/components/JerusalemNeighborhoodGuideCallout";
import { TelAvivHotelTile } from "@/components/TelAvivHotelBrowser";
import { AreaMap, AreaPhotoCredit } from "@/components/AreaMap";
import { GuideHeader, OnThisPage, Section, Checklist, FaqList, SourceList } from "@/components/Guide";
import { StayTripLinks } from "@/components/StayTripLinks";
import { HomeContactForm } from "@/components/HomeContactForm";
import { guideContactCopy } from "@/lib/guide-contact";
import { hotelBrowseAffiliateUrl } from "@/lib/hotel-affiliate";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import jerusalemAreaGuidePhoto from "@/assets/home/jerusalem-old-city-tile.webp";
import { jerusalemStayCardPhotos } from "@/data/jerusalemStayCardPhotos";
import telAvivAreaGuidePhoto from "@/assets/home/tel-aviv-coast.webp";

const sections = [
  ["book", "Hotels"], ["overview", "The area"], ["highlights", "Nearby sights"],
  ["location", "Map & arrival"], ["checklist", "Booking tips"], ["other-areas", "More areas"],
  ["faq", "FAQ"], ["explore", "Local guides"], ["trip-planning", "Trip planning"],
  ["contact", "Contact me"],
] as const;

const downtownSections = [
  ["book", "Hotels"], ["overview", "The area"], ["area-guide", "Neighborhood guide"],
  ["highlights", "Nearby sights"], ["location", "Getting around"], ["checklist", "Booking tips"],
  ["other-areas", "More areas"], ["faq", "FAQ"], ["explore", "Local guides"],
  ["trip-planning", "Trip planning"], ["contact", "Contact me"],
] as const;

const highlightGuides: Record<string, Record<string, { to: string; label: string }>> = {
  downtown: {
    "Ben Yehuda & Nahalat Shiva": { to: "/travel-blog/shopping-in-jerusalem/", label: "Shopping in Jerusalem" },
    "Jaffa Gate & the Old City": { to: "/attractions/old-city-jerusalem/", label: "Explore the Old City" },
  },
  mamilla: {
    "Mamilla Avenue": { to: "/travel-blog/shopping-in-jerusalem/", label: "Shopping in Jerusalem" },
    "Jaffa Gate & Tower of David": { to: "/attractions/old-city-jerusalem/", label: "Explore the Old City" },
  },
  "old-city": {
    "Christian & Armenian quarters": { to: "/travel-blog/churches-in-jerusalem/", label: "Churches in Jerusalem" },
    "Jewish Quarter": { to: "/attractions/old-city-jerusalem/", label: "Explore the Old City" },
  },
  "mahane-yehuda": {
    "Mahane Yehuda Market": { to: "/travel-blog/shopping-in-jerusalem/", label: "Market & shopping guide" },
  },
  "east-jerusalem": {
    "Damascus Gate": { to: "/attractions/old-city-jerusalem/", label: "Explore the Old City" },
    "Garden Tomb & Nablus Road": { to: "/travel-blog/churches-in-jerusalem/", label: "Churches in Jerusalem" },
  },
  "german-colony": {
    "First Station area & Train Track Park": { to: "/travel-blog/jerusalem-travel-guide/", label: "Jerusalem travel guide" },
  },
};

export function NeighborhoodStayPage({ area }: { area: NeighborhoodStayGuide }) {
  const city = cityStayGuides[area.cityId];
  const isJerusalem = area.cityId === "jerusalem";
  const isDowntown = isJerusalem && area.id === "downtown";
  const localInsight = areaDecisionNotes[area.id];
  const hotels = hotelsForArea(area.id, area.cityId);
  const otherAreas = neighborhoodGuidesForCity(area.cityId).filter((other) => other.id !== area.id);
  const pageId = `stay-area-${area.id}`;
  const airportGuide = city.related.find((item) => item.label.startsWith("Ben Gurion Airport"));
  const browseOffers = linksForPage(`stay-area-${area.id}-browse`);

  const hotelSection = (
    <section id="book" aria-labelledby="book-h" className="mt-8 scroll-mt-32">
      <h2 id="book-h" className="text-2xl font-semibold sm:text-3xl">Hotels in {area.shortName}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Explore my selected hotels in {area.shortName}, then check room offers and booking terms for your dates.
      </p>
      {isDowntown ? (
        <div className="mt-5" data-testid="downtown-hotels-with-map">
          <ul className="grid min-w-0 auto-rows-fr items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3" data-testid="neighborhood-hotel-grid">
            {hotels.map((hotel) => <JerusalemHotelTile key={hotel.id} hotel={hotel} pageId={pageId} showArea={false} stacked />)}
            <li className="flex min-h-0 min-w-0 flex-col" data-testid="downtown-hotel-map">
              <AreaMap area={area} provider="google" compact stretch />
            </li>
          </ul>
        </div>
      ) : (
        <ul className="mt-5 grid gap-4 lg:grid-cols-2" data-testid="neighborhood-hotel-grid">
          {hotels.map((hotel) => isJerusalem
            ? <JerusalemHotelTile key={hotel.id} hotel={hotel} pageId={pageId} showArea={false} />
            : <TelAvivHotelTile key={hotel.id} hotel={hotel} pageId={pageId} showArea={false} />)}
        </ul>
      )}
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Hotel stays are provided by independent properties and booked through external booking websites.
        Prices, availability, room details and booking conditions may change. Before booking, check the
        hotel address, exact room offer, total price and cancellation terms directly with the booking provider.
      </p>
      {isDowntown && browseOffers.map((booking) => (
        <div className="mt-6 flex justify-center" key={booking.id}>
          <a
            href={hotelBrowseAffiliateUrl(booking, pageId)}
            target="_blank"
            rel={relFor(booking.isAffiliate)}
            onClick={() => recordOutboundClick({ pageId, productId: booking.id, offerId: booking.id })}
            data-testid="downtown-area-browse-expedia"
            className="btn btn-primary inline-flex min-h-11 items-center justify-center gap-2 px-6 py-2.5 text-center"
          >
            Browse more Downtown hotels <ArrowRight className="h-4 w-4" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      ))}
    </section>
  );

    const moreSection = (
    <section id="more-hotels" aria-label={`More hotels in ${area.shortName}`} className="mt-5 scroll-mt-32 rounded-2xl border bg-secondary/25 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-xl">
          <h3 className="text-lg font-semibold">Looking for another hotel in {area.shortName}?</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Explore more options and check the exact location, room details and cancellation conditions for your dates.</p>
        </div>
        {browseOffers.map((booking) => (
          <a key={booking.id} href={hotelBrowseAffiliateUrl(booking, pageId)} target="_blank" rel={relFor(booking.isAffiliate)}
            onClick={() => recordOutboundClick({ pageId, productId: booking.id, offerId: booking.id })}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-card px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            Browse more {area.shortName} hotels <ArrowRight className="h-4 w-4" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
    </section>
  );

  const overviewSection = (
        <Section id="overview" title={`What is it like to stay in ${area.name}?`} className="scroll-mt-32">
          {area.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {localInsight && <aside className="mt-6 rounded-2xl border bg-secondary/30 p-4 sm:p-5">
            <h3 className="text-lg font-semibold">{localInsight.heading}</h3>
            <p className="mt-2 text-sm leading-relaxed">{localInsight.choose}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{localInsight.compare}</p>
          </aside>}
          {!isDowntown && <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Still comparing locations? <Link to={(isJerusalem ? "/travel-blog/where-to-stay-in-jerusalem/" : "/travel-blog/where-to-stay-in-tel-aviv/") as LinkProps["to"]} className="font-semibold text-primary underline underline-offset-4">Read my guide to where to stay in {city.city}</Link> for a broader look at the city’s neighborhoods.
          </p>}
        </Section>
  );

  const highlightsSection = (
        <Section id="highlights" title="Nearby sights & local character" className="scroll-mt-32">
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {area.highlights.map((highlight) => {
              const relatedGuide = highlightGuides[area.id]?.[highlight.name];
              return <div key={highlight.name} className="flex h-full flex-col rounded-2xl border bg-card p-4 sm:p-5">
                <MapPin className="h-5 w-5 text-primary" aria-hidden />
                <h3 className="mt-3 text-lg font-semibold">{highlight.name}</h3>
                <p className="mt-2 flex-1 text-sm! leading-relaxed text-muted-foreground">{highlight.text}</p>
                {relatedGuide && <Link to={relatedGuide.to as LinkProps["to"]} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">
                  {relatedGuide.label} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>}
              </div>;
            })}
          </div>
        </Section>
  );

  const locationSection = (
    <Section id="location" title={isDowntown ? "Getting around Downtown Jerusalem" : "Map, getting around & arriving with luggage"} className="scroll-mt-32">
      {!isDowntown && <>
        <div className="mt-5"><AreaMap area={area} provider="google" /></div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          The map shows the neighborhood's location. Check your hotel's exact address before booking.
        </p>
      </>}
      {area.gettingAround.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {localInsight && <aside className="mt-5 flex items-start gap-3 rounded-xl border border-amber-300/60 bg-amber-50/70 p-4 text-sm text-foreground dark:border-amber-600/40 dark:bg-amber-950/20">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
        <p className="leading-relaxed"><strong>Arriving with luggage:</strong> {localInsight.arrival}</p>
      </aside>}
      {!isDowntown && <div className="mt-5"><Checklist title="Make your arrival easier" items={area.arrivalTips} /></div>}
      {!isDowntown && airportGuide && <p><Link to={airportGuide.to}>Planning an airport arrival? Compare the options from Ben Gurion Airport to {city.city}.</Link></p>}
    </Section>
  );

    const checklistSection = (
    <Section id="checklist" title="Before you book" className="scroll-mt-32">
      {isDowntown ? (
        <>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
            A central address is convenient, but your hotel entrance, room location and arrival time can make a real difference.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {([
              { title: "Location & arrival", items: [
                area.arrivalTips[0],
                area.arrivalTips[1],
                "Confirm check-in arrangements for your arrival day, especially on Shabbat",
                "Check lift and step-free access if you need them",
              ] },
              { title: "Room & booking conditions", items: [
                area.arrivalTips[2],
                ...area.bookingTips,
                "Review the total price, taxes and cancellation terms for your room",
              ] },
            ]).map((group) => <div key={group.title} className="rounded-2xl border bg-secondary/20 p-4 sm:p-5">
              <h3 className="text-base font-semibold">{group.title}</h3>
              <ul className="mt-3 space-y-3">
                {group.items.map((tip) => <li key={tip} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                    <Check className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{tip}</span>
                </li>)}
              </ul>
            </div>)}
          </div>
        </>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Checklist title="For this area" items={area.bookingTips} />
          <Checklist title={`For any ${city.city} stay`} items={["Confirm the final total including taxes, fees and extras", "Read cancellation and payment conditions for your exact room offer", "Ask about Shabbat check-in, meals and transport if relevant", "Check recent room-specific feedback and accessibility requirements"]} />
        </div>
      )}
    </Section>
  );

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
      <OnThisPage sections={isDowntown ? downtownSections : sections} />
      <article className="mx-auto max-w-5xl px-4">
        <Link to={city.path as LinkProps["to"]} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="h-4 w-4" aria-hidden /> Compare all {city.city} areas</Link>
        <dl className="mt-5 grid gap-3 rounded-2xl border bg-card p-4 sm:grid-cols-3 sm:gap-4 sm:p-5">
          <div><dt className="eyebrow">Best for</dt><dd className="mt-2 text-sm font-medium">{area.bestFor}</dd></div>
          <div><dt className="eyebrow">Stay options</dt><dd className="mt-2 text-sm font-medium">{area.priceLevel}</dd></div>
          <div><dt className="eyebrow">Keep in mind</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.watch}</dd></div>
        </dl>
        {hotelSection}
        {!isDowntown && moreSection}
        {overviewSection}
        {isDowntown && <JerusalemNeighborhoodGuideCallout />}
        {highlightsSection}
        {locationSection}
        {checklistSection}
        <section id="other-areas" aria-labelledby="other-areas-h" className="mt-14 scroll-mt-32">
          <h2 id="other-areas-h" className="text-3xl">Explore Other Areas to Stay</h2>
          <p className="mt-2 text-muted-foreground">Compare a different side of {city.city} before you decide.</p>
          <ul className={`mt-5 grid gap-4 sm:grid-cols-2 ${isJerusalem ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>{otherAreas.map((other) => <li key={other.id} className="min-w-0">
            <Link to={other.path as LinkProps["to"]} className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card hover:border-primary">
              <img src={isJerusalem ? (jerusalemStayCardPhotos[other.id]?.src ?? other.photo.src) : other.photo.src} alt={isJerusalem ? (jerusalemStayCardPhotos[other.id]?.alt ?? other.photo.alt) : other.photo.alt} width={600} height={375} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
              <span className="flex flex-1 items-center justify-between gap-3 p-4">
                <span><span className="block text-xl font-semibold">{other.shortName}</span><span className="mt-1 block text-xs text-muted-foreground">{other.bestFor}</span></span>
                <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              </span>
            </Link>
          </li>)}
            {<li className="min-w-0">
              <Link to={city.path as LinkProps["to"]} className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card hover:border-primary">
                <img src={isJerusalem ? jerusalemAreaGuidePhoto : telAvivAreaGuidePhoto} alt={isJerusalem ? "Jerusalem Old City skyline and surrounding neighborhoods" : "Tel Aviv coastline and neighborhoods"} width={600} height={375} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
                <span className="flex flex-1 items-center justify-between gap-3 p-4">
                  <span><span className="block text-xl font-semibold">All {city.city} neighborhoods</span><span className="mt-1 block text-xs text-muted-foreground">Compare areas and hotel choices across the city</span></span>
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
