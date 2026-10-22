import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { hotelCategoryGuides, type HotelStayDestination } from "@/data/content";
import { destinationBaseChoices } from "@/data/localEditorialInsights";
import { linksForPage } from "@/data/registry";
import { AreaMap } from "@/components/AreaMap";
import { GuideHeader, OnThisPage, Section, Checklist, FaqList, ProviderSection, SourceList, RelatedLinks } from "@/components/Guide";
import { StayHotelCard } from "@/components/StayHotelCard";
import { StayCategoryCard, StayComparison, StayBookingDisclosure, StayBrowseLink, StayPhotoCredits, resortHotel, hotelBooking } from "@/components/StayGuideParts";

const sections = [["overview", "Start here"], ["categories", "Choose your stay"], ["compare", "Compare stays"], ["location", "Map & arrival"], ["book", "Hotel picks"], ["checklist", "Booking tips"], ["faq", "FAQ"], ["sources", "Sources"]] as const;

export function HotelDestinationPage({ guide: g }: { guide: HotelStayDestination }) {
  const categories = hotelCategoryGuides.filter((guide) => guide.destinationId === g.id);
  const hotelIds = g.groups.flatMap((group) => group.hotelIds);
  const baseChoices = destinationBaseChoices[g.id] || [];
  const pageId = `stay-${g.id}`;
  return (
    <main className="pb-8">
      <GuideHeader crumbs={[{ name: "Home", to: "/" }, { name: "Accommodation", to: "/hotels/" }, { name: g.name, to: g.path as LinkProps["to"] }]} eyebrow={`Where to stay · ${g.name}, Israel`} title={g.title} intro={g.intro} image={g.photo} checkedAt={g.reviewedAt} />
      <OnThisPage sections={sections} />
      <article className="mx-auto max-w-5xl px-4">
        <Section id="overview" title="Choose the holiday, then the hotel" className="scroll-mt-32">{g.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{g.id === "deadsea" && <><h3 className="mt-6 text-xl">Ein Bokek, Neve Zohar or Ein Gedi?</h3>{g.locations.map((location) => <p key={location.name}><strong>{location.name}:</strong> {location.text}</p>)}<a href="#location" className="font-semibold text-primary underline">Check the map & arrival route</a></>}</Section>
        <section id="categories" aria-labelledby="categories-h" className="mt-14 scroll-mt-32">
          <p className="eyebrow">Two ways to go deeper</p><h2 id="categories-h" className="mt-2 text-3xl md:text-4xl">Find a stay that fits your party</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{g.categoryIntro}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">{categories.map((guide) => <StayCategoryCard key={guide.id} guide={guide} />)}</div>
          <nav aria-label={`Other ${g.name} hotel categories`} className="mt-5 flex flex-wrap gap-2">{g.groups.filter((group) => !group.guidePath).map((group) => <a key={group.id} href={`#${group.id}`} className="chip">{group.title}</a>)}</nav>
        </section>
        <Section id="compare" title={`Compare all ${hotelIds.length} places to stay`} className="scroll-mt-32">
          <p>{g.comparisonIntro}</p>
          <StayComparison hotelIds={hotelIds} columns={g.comparison} caption={`${g.name} hotels in Israel: practical comparison`} />
          <p className="text-sm! text-muted-foreground">Select a hotel name for its summary and booking link below. This is an editorial comparison, with no live room rates or availability.</p>
        </Section>
        <Section id="location" title="Where to stay: map & arrival" className="scroll-mt-32">
          <div className="mt-5"><AreaMap area={{ name: `${g.name} hotel region`, map: g.map }} /></div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">{g.locations.map((location) => <div key={location.name} className="rounded-2xl border bg-card p-5"><MapPin className="h-5 w-5 text-primary" aria-hidden /><h3 className="mt-3 text-xl">{location.name}</h3><p className="mt-2 text-sm! leading-relaxed text-muted-foreground">{location.text}</p></div>)}</div>
          {g.arrival.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {baseChoices.length > 0 && <div className="mt-7">
            <h3 className="text-xl font-semibold">Choose a base for the way you will travel</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">{baseChoices.map((choice) => <article key={choice.visitor} className="rounded-xl border bg-secondary/40 p-4">
              <p className="text-sm font-semibold">{choice.visitor}</p>
              <h4 className="mt-2 text-lg font-semibold text-primary">{choice.base}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{choice.reason}</p>
            </article>)}</div>
          </div>}
        </Section>
        <div id="book" className="mt-14 scroll-mt-32"><p className="eyebrow">Your accommodation shortlist</p><h2 className="mt-2 text-3xl">Hotels by travel style</h2><p className="mt-3 text-muted-foreground">Start with a category, compare the individual properties and check room options on the booking site.</p><StayBookingDisclosure /></div>
        {g.groups.map((group) => <section id={group.id} key={group.id} aria-labelledby={`${group.id}-h`} className="mt-14 scroll-mt-32" data-testid="stay-hotel-group">
          <div className="grid items-center gap-5 sm:grid-cols-[1.5fr_1fr]"><div><h2 id={`${group.id}-h`} className="text-3xl">{group.title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{group.intro}</p>{group.guidePath && <Link to={group.guidePath as LinkProps["to"]} className="mt-4 inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4">{group.guideLabel}<ArrowRight className="h-4 w-4" aria-hidden /></Link>}</div><img src={group.photo.src} alt={group.photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[16/9] w-full rounded-2xl object-cover" /></div>
          <ul className={`mt-6 grid gap-4 ${group.hotelIds.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>{group.hotelIds.map((id) => <StayHotelCard key={id} hotel={resortHotel(id)} booking={hotelBooking(id)} pageId={pageId} compact />)}</ul>
          {group.browsePageId && <StayBrowseLink link={linksForPage(group.browsePageId)[0]} pageId={pageId} />}
        </section>)}
        <Section id="checklist" title={`Before you book your ${g.name} stay`} className="scroll-mt-32"><div className="mt-5 grid gap-4 sm:grid-cols-2"><Checklist title="Location, rooms & guest ages" items={g.checklist.slice(0, 3)} /><Checklist title="Facilities & the final total" items={g.checklist.slice(3)} /></div></Section>
        <ProviderSection id="more-stays" title={`Browse more ${g.name} stays`} intro="Check the exact location, room offer and cancellation terms on the booking site. Enter your dates and all guests there; no booking is made on this page." links={linksForPage(`stay-${g.id}-browse`)} pageId={pageId} />
        <FaqList faqs={g.faqs} />
        <SourceList ids={[...new Set([...g.sourceIds, ...hotelIds.map((id) => resortHotel(id).sourceId)])]} />
        <RelatedLinks items={g.related} />
        <RelatedLinks title="Build a multi-day itinerary from this destination" items={g.id === "deadsea" ? [
          { label: "Three days: Jerusalem, Masada and Tel Aviv", to: "/travel-blog/israel-itinerary-3-days/" },
          { label: "Five days: include a Dead Sea excursion", to: "/travel-blog/israel-itinerary-5-days/" },
        ] : g.id === "tiberias" ? [
          { label: "Seven days: two nights in the Galilee", to: "/travel-blog/israel-itinerary-7-days/" },
          { label: "Ten days: an unhurried northern stay", to: "/travel-blog/israel-itinerary-10-days/" },
        ] : [
          { label: "Five days: Caesarea and Haifa coastal day", to: "/travel-blog/israel-itinerary-5-days/" },
          { label: "Ten days: Akko, Haifa and the coast", to: "/travel-blog/israel-itinerary-10-days/" },
        ]} />
        <StayPhotoCredits photos={[g.photo, ...g.groups.map((group) => group.photo)]} />
      </article>
    </main>
  );
}
