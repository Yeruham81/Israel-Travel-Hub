import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Lightbulb, MapPin } from "lucide-react";
import { cityStayGuides, neighborhoodGuidesForCity, type NeighborhoodStayGuide } from "@/data/content";
import { areaDecisionNotes } from "@/data/localEditorialInsights";
import { hotelsForArea, INFO_CHECK_DATE, linksForPage } from "@/data/registry";
import { cityHotelPhoto, hotelsInCityCatalog } from "@/data/cityHotelCatalog";
import { JerusalemHotelTile } from "@/components/JerusalemHotelBrowser";
import { JerusalemNeighborhoodGuideCallout } from "@/components/JerusalemNeighborhoodGuideCallout";
import { TelAvivNeighborhoodGuideCallout } from "@/components/TelAvivNeighborhoodGuideCallout";
import { TelAvivHotelTile } from "@/components/TelAvivHotelBrowser";
import { AreaMap, AreaPhotoCredit } from "@/components/AreaMap";
import { GuideHeader, OnThisPage, Section, FaqList, SourceList } from "@/components/Guide";
import { StayBookingChecklist } from "@/components/StayBookingChecklist";
import { StayTripLinks } from "@/components/StayTripLinks";
import { HomeContactForm } from "@/components/HomeContactForm";
import { neighborhoodTripContactCopy } from "@/lib/guide-contact";
import { hotelBrowseAffiliateUrl } from "@/lib/hotel-affiliate";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import jerusalemAreaGuidePhoto from "@/assets/home/jerusalem-old-city-tile.webp";
import telAvivAreaGuidePhoto from "@/assets/home/tel-aviv-coast.webp";

const sections = [
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

/** One nearby fifth selection per Tel Aviv neighborhood, using existing verified hotel records and property-specific Travelpayouts links. */
const telAvivNearbyHotelIds: Record<string, string> = {
  "telaviv-beachfront": "tlv-melody",
  "telaviv-dizengoff": "tlv-embassy",
  "telaviv-old-north": "tlv-carlton",
  "telaviv-neve-tzedek": "tlv-rothschild22",
  "telaviv-jaffa": "tlv-florentin-house",
  "telaviv-florentin": "tlv-elkonin",
  "telaviv-kerem": "tlv-royal-beach",
  "telaviv-rothschild": "tlv-vera",
};

export function NeighborhoodStayPage({ area }: { area: NeighborhoodStayGuide }) {
  const city = cityStayGuides[area.cityId];
  const isJerusalem = area.cityId === "jerusalem";
  const isDowntown = isJerusalem && area.id === "downtown";
  const jerusalemHotelHeadings: Record<string, string> = {
    downtown: "Selected hotels in Jerusalem's Downtown",
    mamilla: "Selected hotels in Mamilla & King David Street",
    "old-city": "Selected hotels in Jerusalem's Old City",
    "mahane-yehuda": "Selected hotels near Mahane Yehuda & Nachlaot",
    "east-jerusalem": "Selected hotels in East Jerusalem",
    "german-colony": "Selected hotels in German Colony & Baka",
  };
  const telAvivHotelHeadings: Record<string, string> = {
    "telaviv-beachfront": "Selected hotels by Tel Aviv's central beaches",
    "telaviv-dizengoff": "Selected hotels near Dizengoff Square & City Center",
    "telaviv-old-north": "Selected hotels in the Old North & Port area",
    "telaviv-neve-tzedek": "Selected hotels in and around Neve Tzedek",
    "telaviv-jaffa": "Selected hotels in Jaffa",
    "telaviv-florentin": "Selected hotels in Florentin",
    "telaviv-kerem": "Selected hotels near Kerem HaTeimanim & Carmel Market",
    "telaviv-rothschild": "Selected hotels along Rothschild Boulevard",
  };
  const arrivalIntroductions: Record<string, string> = {
    downtown: "A central address is convenient, but your hotel entrance, room location and arrival time can make a real difference.",
    mamilla: "The walk to Jaffa Gate, room outlook and entrance arrangements vary along King David Street.",
    "old-city": "Your nearest gate, luggage route and stairs matter as much as your room choice.",
    "mahane-yehuda": "Room location and the market's evening and early-morning activity can make a real difference.",
    "east-jerusalem": "Check your street address, the nearest Old City gate and arrangements for a late arrival.",
    "german-colony": "Confirm the walking distance to local sights, current road access and the room's street outlook.",
    "telaviv-beachfront": "The beach, hotel entrance and room outlook can be quite different even along the same stretch of HaYarkon Street.",
    "telaviv-dizengoff": "Dizengoff Street extends far beyond the square, so the precise hotel address and its vehicle access matter.",
    "telaviv-old-north": "A room by the port offers a different evening from one on a residential Old North side street.",
    "telaviv-neve-tzedek": "Historic lanes, surrounding main streets and converted buildings call for different luggage and access arrangements.",
    "telaviv-jaffa": "Choose between Old Jaffa's slopes and the busier flea-market streets before arranging your arrival.",
    "telaviv-florentin": "Late-night venues and self-check-in instructions can make the exact street and room especially important.",
    "telaviv-kerem": "A room within the Yemenite Quarter may feel different from one along the edges of Carmel Market.",
    "telaviv-rothschild": "The boulevard is long: your nearest junction, room orientation and hotel entrance deserve a close look.",
  };
  const localInsight = areaDecisionNotes[area.id];
  const areaHotels = hotelsForArea(area.id, area.cityId);
  const nearbyHotelId = !isJerusalem ? telAvivNearbyHotelIds[area.id] : undefined;
  const nearbyHotel = nearbyHotelId ? hotelsInCityCatalog("telaviv").find((hotel) => hotel.id === nearbyHotelId) : undefined;
  const hotels = nearbyHotel && !areaHotels.some((hotel) => hotel.id === nearbyHotel.id)
    ? [...areaHotels, nearbyHotel] : areaHotels;
  // Show every other neighborhood, followed by the full city catalog:
  // Jerusalem has 5 + 1 = 6 cards; Tel Aviv has 7 + 1 = 8 cards.
  const otherAreas = neighborhoodGuidesForCity(area.cityId).filter((other) => other.id !== area.id);
  const pageId = `stay-area-${area.id}`;
  const airportGuide = city.related.find((item) => item.label.startsWith("Ben Gurion Airport"));
  const browseOffers = linksForPage(`stay-area-${area.id}-browse`);

  const hotelSection = (
    <section id="book" aria-labelledby="book-h" className="mt-8 scroll-mt-32">
      <h2 id="book-h" className="text-2xl font-semibold sm:text-3xl">
        {isJerusalem ? jerusalemHotelHeadings[area.id] : telAvivHotelHeadings[area.id]}
      </h2>
      {nearbyHotel && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">My shortlist includes four stays in {area.shortName} and one nearby alternative in {neighborhoodGuidesForCity("telaviv").find((a) => a.id === nearbyHotel.areaId)?.shortName}. Check the exact address for your plans.</p>}
      <div className="mt-5" data-testid={isJerusalem ? "jerusalem-hotels-with-map" : "tel-aviv-hotels-with-map"}>
        <ul className="grid min-w-0 grid-cols-1 auto-rows-fr items-stretch gap-3 min-[360px]:grid-cols-2 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3" data-testid="neighborhood-hotel-grid">
          {hotels.map((hotel) => isJerusalem
            ? <JerusalemHotelTile key={hotel.id} hotel={hotel} pageId={pageId} showArea={false} stacked />
            : <TelAvivHotelTile key={hotel.id} hotel={hotel} pageId={pageId} showArea={false} showNearbyArea={hotel.id === nearbyHotel?.id} stacked />)}
          <li className="flex min-h-0 min-w-0 flex-col" data-testid={isJerusalem ? "jerusalem-hotel-map" : "tel-aviv-hotel-map"}>
            <AreaMap area={area} provider="google" compact stretch />
          </li>
        </ul>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Book your hotel directly through the booking website. Check room details and minimum stays, and ask the hotel about accessibility and facilities.
      </p>
      {browseOffers.map((booking) => (
        <div className="mt-6 flex justify-center" key={booking.id}>
          <a
            href={hotelBrowseAffiliateUrl(booking, pageId)}
            target="_blank"
            rel={relFor(booking.isAffiliate)}
            onClick={() => recordOutboundClick({ pageId, productId: booking.id, offerId: booking.id })}
            data-testid={isJerusalem ? "jerusalem-area-browse-expedia" : "tel-aviv-area-browse-expedia"}
            className="btn btn-primary inline-flex min-h-11 items-center justify-center gap-2 px-6 py-2.5 text-center"
          >
            Browse more {area.shortName} hotels <ArrowRight className="h-4 w-4" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      ))}
    </section>
  );

  const overviewSection = (
        <Section id="overview" title={`Choosing a hotel in ${area.shortName}`} className="scroll-mt-32">
          {/* The destination-wide Where to Stay article already covers overview paragraphs 1–2. */}
          {area.overview.slice(2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {localInsight && <aside className="mt-6 rounded-2xl border bg-secondary/30 p-4 sm:p-5">
            <h3 className="text-lg font-semibold">{localInsight.heading}</h3>
            <p className="mt-2 text-sm leading-relaxed">{localInsight.choose}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{localInsight.compare}</p>
          </aside>}

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
    <Section id="location" title={isDowntown ? "Getting around Downtown Jerusalem" : area.id === "old-city" ? "Getting around the Old City" : `Getting around ${area.shortName}`} className="scroll-mt-32">
      {area.gettingAround.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {localInsight && <aside className="mt-5 flex items-start gap-3 rounded-xl border border-amber-300/60 bg-amber-50/70 p-4 text-sm text-foreground dark:border-amber-600/40 dark:bg-amber-950/20">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
        <p className="leading-relaxed"><strong>Arriving with luggage:</strong> {localInsight.arrival}</p>
      </aside>}
      {!isJerusalem && airportGuide && <p><Link to={airportGuide.to}>Planning an airport arrival? Compare the options from Ben Gurion Airport to {city.city}.</Link></p>}
    </Section>
  );

  const checklistSection = (
    <Section id="checklist" title="Before you book" className="scroll-mt-32">
      <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
        {arrivalIntroductions[area.id]}
      </p>
      <StayBookingChecklist groups={[
        { title: "Location & arrival", items: isDowntown ? [
          ...area.arrivalTips.slice(0, 2),
          "Confirm check-in arrangements for your arrival day, especially on Shabbat",
          "Check lift and step-free access if you need them",
        ] : area.arrivalTips },
        { title: "Room & booking conditions", items: isDowntown ? [
          ...area.arrivalTips.slice(2, 3),
          ...area.bookingTips,
          "Review the total price, taxes and cancellation terms for your room",
        ] : [
          ...area.bookingTips,
          "Review the final price, payment conditions and cancellation policy for your room",
        ] },
      ]} />
    </Section>
  );

    return (
    <main className="pb-8">
      <GuideHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Accommodation", to: "/accommodation/" }, { name: city.city, to: city.path as LinkProps["to"] }, { name: area.shortName, to: area.path as LinkProps["to"] }]}
        eyebrow={`Hotels · ${city.city} · ${area.shortName}`}
        title={area.title}
        intro={area.summary}
        image={area.photo}
        checkedAt={city.reviewedAt || INFO_CHECK_DATE}
      />
      <OnThisPage sections={sections} />
      <article className="mx-auto max-w-5xl px-4">
        <Link to={city.path as LinkProps["to"]} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/30 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-secondary"><ArrowLeft className="h-4 w-4" aria-hidden /> Browse all {city.city} hotels</Link>
        <dl className="mt-5 grid gap-3 rounded-2xl border bg-card p-4 sm:grid-cols-3 sm:gap-4 sm:p-5">
          <div><dt className="eyebrow">Best for</dt><dd className="mt-2 text-sm font-medium">{area.bestFor}</dd></div>
          <div><dt className="eyebrow">Stay options</dt><dd className="mt-2 text-sm font-medium">{area.priceLevel}</dd></div>
          <div><dt className="eyebrow">Keep in mind</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.watch}</dd></div>
        </dl>
        {hotelSection}
        {overviewSection}
        {isJerusalem ? <JerusalemNeighborhoodGuideCallout /> : <TelAvivNeighborhoodGuideCallout />}
        {highlightsSection}
        {locationSection}
        {checklistSection}
        <section id="other-areas" aria-labelledby="other-areas-h" className="mt-12 scroll-mt-32">
          <h2 id="other-areas-h" className="text-2xl font-semibold sm:text-3xl">Explore other {city.city} neighborhoods</h2>
          <ul className={`mt-5 grid grid-cols-2 gap-3 sm:gap-4 ${isJerusalem ? "lg:grid-cols-3" : "lg:grid-cols-4"}`} data-testid="related-neighborhood-grid">
            {otherAreas.map((other) => <li key={other.id} className="min-w-0">
              <Link to={other.path as LinkProps["to"]} className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-secondary/20 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <div className="overflow-hidden bg-muted">
                  <img src={other.photo.src} alt={other.photo.alt} width={600} height={375} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.035]" />
                </div>
                <span className="flex flex-1 flex-col p-3 sm:p-4">
                  <span className="text-sm font-semibold leading-snug group-hover:text-primary sm:text-lg">{other.shortName}</span>
                  <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{other.bestFor}</span>
                </span>
              </Link>
            </li>)}
            <li className="min-w-0">
              <Link to={city.path as LinkProps["to"]} className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-secondary/20 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <div className="overflow-hidden bg-muted">
                  <img src={isJerusalem ? jerusalemAreaGuidePhoto : telAvivAreaGuidePhoto} alt={isJerusalem ? "Jerusalem Old City skyline and surrounding neighborhoods" : "Tel Aviv coastline and neighborhoods"} width={600} height={375} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.035]" />
                </div>
                <span className="flex flex-1 flex-col p-3 sm:p-4">
                  <span className="text-sm font-semibold leading-snug group-hover:text-primary sm:text-lg">All {city.city} hotels</span>
                  <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">Browse the complete city hotel selection</span>
                </span>
              </Link>
            </li>
          </ul>
        </section>
        <FaqList faqs={area.faqs} />
        <StayTripLinks region={area.cityId} currentPath={area.path} />
        <HomeContactForm key={area.id} showTripadvisorBesidePortraitMobile guide={neighborhoodTripContactCopy(isJerusalem ? "Jerusalem" : "Tel Aviv")} />
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
