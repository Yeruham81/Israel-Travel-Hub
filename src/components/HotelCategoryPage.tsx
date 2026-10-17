import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { hotelCategoryGuides, type HotelStayDestination, type HotelCategoryGuide } from "@/data/content";
import { linksForPage } from "@/data/registry";
import { GuideHeader, OnThisPage, Section, Checklist, FaqList, ProviderSection, SourceList, RelatedLinks } from "@/components/Guide";
import { StayHotelCard } from "@/components/StayHotelCard";
import { StayComparison, StayBookingDisclosure, StayPhotoCredits, resortHotel, hotelBooking } from "@/components/StayGuideParts";

export function HotelCategoryPage({ guide: g, destination }: { guide: HotelCategoryGuide; destination: HotelStayDestination }) {
  const pageId = `stay-${destination.id}-${g.id}`;
  const sections = [["overview", "How to choose"], ["compare", "Compare hotels"], ["details", g.id === "family" ? "Meals & rooms" : "Spa access"], ["book", "Hotel picks"], ["checklist", "Booking tips"], ["faq", "FAQ"], ["sources", "Sources"]] as const;
  const otherGuides = hotelCategoryGuides.filter((guide) => guide.destinationId === destination.id && guide.id !== g.id);
  return (
    <main className="pb-8">
      <GuideHeader crumbs={[{ name: "Home", to: "/" }, { name: "Accommodation", to: "/hotels/" }, { name: destination.name, to: destination.path as LinkProps["to"] }, { name: g.shortTitle, to: g.path as LinkProps["to"] }]} eyebrow={`${destination.name}, Israel · ${g.shortTitle}`} title={g.title} intro={g.summary} image={g.photo} checkedAt={destination.reviewedAt} />
      <OnThisPage sections={sections} />
      <article className="mx-auto max-w-5xl px-4">
        <Link to={destination.path as LinkProps["to"]} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="h-4 w-4" aria-hidden /> Compare all {destination.name} stays</Link>
        <Section id="overview" title={g.id === "family" ? "Choose for your children's ages and your travel plans" : "Choose the spa experience you want"} className="scroll-mt-32">{g.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="mt-5 grid gap-4 sm:grid-cols-2">{g.decisions.map((decision) => <div key={decision.title} className="rounded-2xl border bg-card p-5"><h3 className="text-xl">{decision.title}</h3><p className="mt-2 text-sm! leading-relaxed text-muted-foreground">{decision.text}</p></div>)}</div></Section>
        <Section id="compare" title={`Compare ${g.picks.length} ${destination.name} ${g.shortTitle.toLowerCase()}`} className="scroll-mt-32"><p>These are published property features and practical tradeoffs. Confirm current operation and your exact room offer for the travel dates; this table does not show live prices or available rooms.</p><StayComparison hotelIds={g.picks.map((pick) => pick.hotelId)} columns={g.comparison} caption={`${destination.name} ${g.shortTitle.toLowerCase()}: practical comparison`} /></Section>
        <Section id="details" title={g.detailTitle} className="scroll-mt-32">{g.details.map((detail) => <div key={detail.title} className="mt-6"><h3 className="text-2xl">{detail.title}</h3><p>{detail.text}</p></div>)}<p><Link to={destination.path as LinkProps["to"]} hash="location">See the map and compare Ein Bokek, the southern hotel district and Ein Gedi.</Link></p></Section>
        <section id="book" aria-labelledby="book-h" className="mt-14 scroll-mt-32"><p className="eyebrow">A shortlist for your trip</p><h2 id="book-h" className="mt-2 text-3xl">{g.shortTitle}: which stay suits you?</h2><StayBookingDisclosure /><ul className="mt-6 space-y-5">{g.picks.map((pick) => <StayHotelCard key={pick.hotelId} hotel={resortHotel(pick.hotelId)} booking={hotelBooking(pick.hotelId)} pageId={pageId} editorial={pick} />)}</ul></section>
        <Section id="checklist" title="Confirm before paying" className="scroll-mt-32"><div className="mt-5 grid gap-4 sm:grid-cols-2"><Checklist title={g.id === "family" ? "The room & children's facilities" : "Spa entry & guest ages"} items={g.checklist.slice(0, 3)} /><Checklist title="The total & the travel dates" items={g.checklist.slice(3)} /></div></Section>
        <ProviderSection id="more-stays" title={`Browse more ${g.shortTitle.toLowerCase()}`} intro="Explore other options, then check the country, property, room and package carefully on the booking site." links={linksForPage(`${pageId}-browse`)} pageId={pageId} />
        <FaqList faqs={g.faqs} />
        <SourceList ids={[...new Set(["owner-hotels-deadsea", ...g.sourceIds, ...g.picks.map((pick) => resortHotel(pick.hotelId).sourceId)])]} />
        <section aria-labelledby="other-stays-h" className="mt-14"><h2 id="other-stays-h" className="text-3xl">Explore another way to stay</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2"><li><Link to={destination.path as LinkProps["to"]} className="flex h-full items-center justify-between gap-3 rounded-xl border bg-card p-5 hover:border-primary"><span>All {destination.name} hotels & travel styles</span><ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden /></Link></li>{otherGuides.map((other) => <li key={other.id}><Link to={other.path as LinkProps["to"]} className="flex h-full items-center justify-between gap-3 rounded-xl border bg-card p-5 hover:border-primary"><span>{other.title}</span><ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden /></Link></li>)}</ul></section>
        <RelatedLinks items={destination.related} />
        <StayPhotoCredits photos={[g.photo]} />
      </article>
    </main>
  );
}
