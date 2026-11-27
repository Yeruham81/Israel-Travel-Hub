import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, BookOpen, MapPin } from "lucide-react";
import { hotelCategoryGuides, type HotelStayDestination } from "@/data/content";
import { accommodationEditorial } from "@/data/accommodationEditorial";
import { linksForPage } from "@/data/registry";
import { AreaMap } from "@/components/AreaMap";
import {
  GuideHeader,
  OnThisPage,
  Section,
  Checklist,
  FaqList,
  ProviderSection,
  SourceList,
} from "@/components/Guide";
import { StayTripLinks } from "@/components/StayTripLinks";
import { HomeContactForm } from "@/components/HomeContactForm";
import { guideContactCopy } from "@/lib/guide-contact";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { ResortHotelBrowser } from "@/components/ResortHotelBrowser";
import { StayCategoryCard, StayPhotoCredits, resortHotel } from "@/components/StayGuideParts";

const sections = [
  ["book", "Find hotels"],
  ["categories", "Hotel styles"],
  ["location", "Locations & arrival"],
  ["guide", "Detailed hotel guide"],
  ["checklist", "Booking tips"],
  ["faq", "FAQ"],
  ["explore", "Local guides"],
  ["trip-planning", "Trip planning"],
  ["contact", "Contact me"],
  ["sources", "Sources"],
] as const;

/** Booking-first destination hubs. Detailed hotel comparisons stay in Travel Guides. */
export function HotelDestinationPage({ guide: g }: { guide: HotelStayDestination }) {
  const categories = hotelCategoryGuides.filter((guide) => guide.destinationId === g.id);
  const hotelIds = g.groups.flatMap((group) => group.hotelIds);
  const pageId = `stay-${g.id}`;
  const editorial = accommodationEditorial[g.id as "haifa" | "tiberias" | "deadsea"];
  const guidePhoto = guideHeroPhotoForPath(editorial.path);

  return (
    <main className="pb-8" data-testid="regional-accommodation-hub">
      <GuideHeader
        crumbs={[
          { name: "Home", to: "/" },
          { name: "Accommodation", to: "/accommodation/" },
          { name: g.name, to: g.path as LinkProps["to"] },
        ]}
        eyebrow={`Accommodation · ${g.name}`}
        title={g.title}
        intro={g.intro}
        image={g.photo}
        checkedAt={g.reviewedAt}
      />
      <OnThisPage sections={sections} />
      <article className="mx-auto max-w-5xl px-4">
        <ResortHotelBrowser guide={g} />

        <section id="categories" aria-labelledby="categories-h" className="mt-12 scroll-mt-28">
          <p className="eyebrow">Compare specific hotel styles</p>
          <h2 id="categories-h" className="mt-1 text-2xl font-semibold sm:text-3xl">
            Explore {g.name} hotel guides
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            These focused guides compare hotel facilities, guest policies and practical booking
            choices for different types of trips.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {categories.map((guide) => (
              <StayCategoryCard key={guide.id} guide={guide} />
            ))}
          </div>
        </section>

        <section id="location" aria-labelledby="location-h" className="mt-12 scroll-mt-28">
          <h2 id="location-h" className="text-2xl font-semibold sm:text-3xl">
            Hotel locations in {g.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Compare the main areas before opening a booking link. The location filters above also
            narrow my hotel shortlist.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {g.locations.map((location) => (
              <div key={location.name} className="rounded-xl border bg-card p-4">
                <MapPin className="h-4 w-4 text-primary" aria-hidden />
                <h3 className="mt-2 text-lg font-semibold">{location.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {location.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <AreaMap area={{ name: `${g.name} hotel region`, map: g.map }} provider="google" />
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            {g.arrival[0]}
          </p>
        </section>

        <section id="guide" aria-labelledby="guide-h" className="mt-12 scroll-mt-28">
          <div
            className={`grid overflow-hidden rounded-2xl border bg-secondary/30 ${guidePhoto ? "sm:grid-cols-[minmax(0,1fr)_230px]" : ""}`}
          >
            <div className="min-w-0 p-5 sm:p-6">
              <p className="eyebrow inline-flex items-center gap-2">
                <BookOpen className="h-4 w-4" aria-hidden /> Travel guide
              </p>
              <h2 id="guide-h" className="mt-2 text-xl font-semibold sm:text-2xl">
                Need help choosing a {g.name} hotel?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                In my detailed guide, I compare all {hotelIds.length} hotels by location, travel
                style, facilities and practical considerations.
              </p>
              <Link
                to={editorial.path as LinkProps["to"]}
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/30 bg-card px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-secondary"
                data-testid="regional-editorial-guide-link"
              >
                Read the full {g.name} hotel guide <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            {guidePhoto && (
              <img
                src={guidePhoto.src}
                alt={guidePhoto.alt}
                width={460}
                height={300}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] h-full w-full object-cover sm:aspect-auto"
              />
            )}
          </div>
        </section>

        <Section
          id="checklist"
          title={`Before you book your ${g.name} hotel`}
          className="scroll-mt-28"
        >
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Checklist title="Location, rooms & guest ages" items={g.checklist.slice(0, 3)} />
            <Checklist title="Facilities & the final total" items={g.checklist.slice(3)} />
          </div>
        </Section>
        <ProviderSection
          id="more-stays"
          title={`Browse more ${g.name} stays`}
          intro="Enter your dates and guests on the booking website to compare room options and the final total."
          links={linksForPage(`stay-${g.id}-browse`).filter((link) => link.isAffiliate)}
          pageId={pageId}
        />
        <FaqList faqs={g.faqs} />
        <StayTripLinks region={g.id} currentPath={g.path} />
        <HomeContactForm
          key={g.id}
          showTripadvisorBesidePortraitMobile
          guide={guideContactCopy(g.title, "accommodation", g.name)}
        />
        <SourceList
          ids={[...new Set([...g.sourceIds, ...hotelIds.map((id) => resortHotel(id).sourceId)])]}
        />
        <StayPhotoCredits photos={[g.photo, ...categories.map((guide) => guide.photo)]} />
      </article>
    </main>
  );
}
