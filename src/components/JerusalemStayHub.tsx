import { useState } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  type CityStayGuide, type NeighborhoodStayGuide, type StayPreference, preferenceLabels,
} from "@/data/content";
import { areaArrivalSignals } from "@/data/localEditorialInsights";
import { linksForPage } from "@/data/registry";
import { GuideHeader, OnThisPage, Checklist, FaqList, SourceList } from "@/components/Guide";
import { JerusalemHotelBrowser } from "@/components/JerusalemHotelBrowser";
import { StayTripLinks } from "@/components/StayTripLinks";
import { HomeContactForm } from "@/components/HomeContactForm";
import { guideContactCopy } from "@/lib/guide-contact";
import { CityHotelPhotoCredits } from "@/components/CityHotelPhotoCredits";
import { AreaPhotoCredit } from "@/components/AreaMap";
import { hotelBrowseAffiliateUrl } from "@/lib/hotel-affiliate";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import jerusalemHeroPhoto from "@/assets/home/hero-refresh-jerusalem-jaffa-gate-v4-medium.webp";

const pageSections = [
  ["book", "Hotels"], ["areas", "Neighborhoods"], ["compare", "Compare areas"],
  ["checklist", "Booking tips"], ["faq", "FAQ"], ["explore", "Local guides"],
  ["trip-planning", "Trip planning"], ["contact", "Contact me"],
] as const;

export function JerusalemStayHub({ g, areas }: { g: CityStayGuide; areas: NeighborhoodStayGuide[] }) {
  const [preference, setPreference] = useState<StayPreference | null>(null);
  const preferences = [...new Set(areas.flatMap((area) => area.suits))];
  const visibleAreas = preference ? areas.filter((area) => area.suits.includes(preference)) : areas;

  return (
    <main className="pb-10" data-testid="jerusalem-stay-hub">
      <GuideHeader
        crumbs={[
          { name: "Home", to: "/" },
          { name: "Accommodation", to: "/accommodation/" },
          { name: "Jerusalem", to: g.path as LinkProps["to"] },
        ]}
        eyebrow="Accommodation · Jerusalem"
        title={g.title}
        intro={g.intro}
        checkedAt={g.reviewedAt}
        image={{ src: jerusalemHeroPhoto, alt: "Jaffa Gate and Jerusalem Old City walls" }}
      />
      <OnThisPage sections={pageSections} />
      <article className="mx-auto max-w-5xl px-4">
        <JerusalemHotelBrowser />

        <div id="more-hotels" className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-secondary/35 p-4 sm:p-6">
          <div className="max-w-xl">
            <h3 className="text-lg font-semibold">Looking for another Jerusalem hotel?</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Explore more places to stay and check prices, availability and cancellation options for your dates.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {linksForPage("stay-jerusalem").map((booking) => (
              <a
                key={booking.id}
                href={hotelBrowseAffiliateUrl(booking, "stay-jerusalem")}
                target="_blank" rel={relFor(booking.isAffiliate)}
                onClick={() => recordOutboundClick({ pageId: "stay-jerusalem", productId: booking.id, offerId: booking.id })}
                className="btn btn-primary inline-flex min-h-11 items-center justify-center gap-2"
              >
                Browse more on {booking.providerName} <ArrowRight className="h-4 w-4" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>

        <section id="areas" aria-labelledby="areas-h" className="mt-12 scroll-mt-28">
          <h2 id="areas-h" className="text-2xl font-semibold sm:text-3xl">Choose your Jerusalem neighborhood</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
            {g.areaIntro}
          </p>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Choose areas by travel style">
            <button
              type="button" className="chip" aria-pressed={preference === null}
              onClick={() => setPreference(null)}
            >All areas</button>
            {preferences.map((pref) => <button
              key={pref} type="button" className="chip" aria-pressed={preference === pref}
              onClick={() => setPreference(preference === pref ? null : pref)}
            >{preferenceLabels[pref]}</button>)}
          </div>
          <p className="mt-3 text-xs text-muted-foreground" role="status" aria-live="polite">
            {visibleAreas.length} {visibleAreas.length === 1 ? "area" : "areas"}
            {preference ? " for " + preferenceLabels[preference].toLowerCase() : " to explore"}
          </p>
          <ul className="mt-4 grid gap-4 lg:grid-cols-2">
            {visibleAreas.map((area) => <li
              key={area.id} data-testid="neighborhood-card"
              className="grid min-w-0 grid-cols-[110px_minmax(0,1fr)] overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/50 sm:grid-cols-[155px_minmax(0,1fr)]"
            >
              <Link to={area.path as LinkProps["to"]} tabIndex={-1} aria-hidden="true" className="block overflow-hidden bg-muted">
                <img
                  src={area.photo.src} alt={area.photo.alt}
                  width={755} height={503} loading="lazy" decoding="async"
                  className="aspect-[16/10] h-full w-full object-cover"
                />
              </Link>
              <div className="flex min-w-0 flex-col p-3.5 sm:p-4">
                <p className="text-xs font-medium text-muted-foreground">{area.bestFor}</p>
                <h3 className="mt-1 text-base font-semibold leading-snug sm:text-lg">
                  <Link to={area.path as LinkProps["to"]} className="hover:text-primary">{area.name}</Link>
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{area.summary}</p>
                <Link
                  to={area.path as LinkProps["to"]}
                  className="mt-3 inline-flex w-fit min-h-8 items-center gap-1 text-xs font-semibold text-primary underline underline-offset-4 sm:text-sm"
                  aria-label={"Explore " + area.name + ": area guide and hotel recommendations"}
                >
                  Explore Area & Hotels <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </li>)}
          </ul>
        </section>

        <section id="compare" aria-labelledby="compare-h" className="mt-12 scroll-mt-28">
          <h2 id="compare-h" className="text-2xl font-semibold sm:text-3xl">Compare areas in Jerusalem</h2>
          <p className="mt-2 text-sm text-muted-foreground">A quick guide to location and access before choosing a room.</p>
          <details className="mt-4 overflow-hidden rounded-2xl border bg-card">
            <summary className="cursor-pointer px-5 py-4 font-semibold text-primary">View neighborhood comparison</summary>
            <div className="overflow-x-auto border-t" role="region" aria-label="Jerusalem neighborhood comparison" tabIndex={0}>
              <table className="w-full min-w-[680px] text-left text-sm">
                <caption className="sr-only">Jerusalem neighborhoods, ideal guests, arrival considerations and tradeoffs</caption>
                <thead className="bg-secondary">
                  <tr>
                    {["Area", "Best for", "Arriving with bags", "Keep in mind"].map((label) => <th key={label} scope="col" className="px-4 py-3 font-semibold">{label}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {areas.map((area) => <tr key={area.id}>
                    <th scope="row" className="px-4 py-3 font-semibold">
                      <Link to={area.path as LinkProps["to"]} className="text-primary underline underline-offset-2">{area.shortName}</Link>
                    </th>
                    <td className="px-4 py-3">{area.bestFor}</td>
                    <td className="max-w-60 px-4 py-3">{areaArrivalSignals[area.id] || area.arrivalTips[0]}</td>
                    <td className="max-w-60 px-4 py-3 text-muted-foreground">{area.watch}</td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </details>
        </section>

        <section id="checklist" aria-labelledby="checklist-h" className="mt-12 scroll-mt-28">
          <h2 id="checklist-h" className="text-2xl font-semibold sm:text-3xl">Before you book</h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
            Check the exact hotel entrance and walking route, especially near the Old City, and compare the final price and cancellation terms.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Checklist title="Location & arrival" items={g.checklist.slice(0, 4)} />
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-serif text-lg">Room & booking conditions</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {["Confirm bed setup and guest occupancy", "Check the total price, taxes and breakfast", "Review cancellation and payment terms", "Verify parking and step-free access where needed"].map((tip) =>
                  <li key={tip} className="flex gap-2"><span className="text-primary" aria-hidden>✓</span>{tip}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <FaqList faqs={g.faqs} compact />
        <StayTripLinks region="jerusalem" currentPath={g.path} />
        <HomeContactForm guide={guideContactCopy(g.title, "accommodation", g.city)} />
        <SourceList ids={g.sourceIds} />
        <AreaPhotoCredit areas={areas} />
        <CityHotelPhotoCredits city="jerusalem" />
      </article>
    </main>
  );
}
