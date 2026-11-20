import { useState } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Lightbulb } from "lucide-react";
import {
  type CityStayGuide, type NeighborhoodStayGuide, type StayPreference, preferenceLabels,
} from "@/data/content";
import { areaArrivalSignals } from "@/data/localEditorialInsights";
import { INFO_CHECK_DATE } from "@/data/registry";
import { GuideHeader, OnThisPage, FaqList, SourceList } from "@/components/Guide";
import { StayBookingChecklist } from "@/components/StayBookingChecklist";
import { TelAvivHotelBrowser } from "@/components/TelAvivHotelBrowser";
import { StayTripLinks } from "@/components/StayTripLinks";
import { HomeContactForm } from "@/components/HomeContactForm";
import { guideContactCopy } from "@/lib/guide-contact";
import { CityHotelPhotoCredits } from "@/components/CityHotelPhotoCredits";
import { AreaPhotoCredit } from "@/components/AreaMap";
import telavivHeroPhoto from "@/assets/home/hero-refresh-tel-aviv-coastline-v2-medium.webp";
import telavivAreaGuidePhoto from "@/assets/guides/2026-11/where-to-stay-tel-aviv-drive.webp";

const pageSections = [
  ["book", "Hotels"], ["areas", "Neighborhoods"], ["compare", "Compare areas"], ["area-guide", "Where to stay"],
  ["checklist", "Booking tips"], ["faq", "FAQ"], ["explore", "Local guides"],
  ["trip-planning", "Trip planning"], ["contact", "Contact me"],
] as const;

const neighborhoodCta: Record<string, string> = {
  "telaviv-beachfront": "Discover beachfront hotels",
  "telaviv-dizengoff": "Browse Dizengoff hotels",
  "telaviv-old-north": "Explore Old North stays",
  "telaviv-neve-tzedek": "Discover Neve Tzedek hotels",
  "telaviv-jaffa": "Browse Jaffa hotels",
  "telaviv-florentin": "Explore Florentin stays",
  "telaviv-kerem": "Find Kerem HaTeimanim hotels",
  "telaviv-rothschild": "Browse Rothschild hotels",
};

export function TelAvivStayHub({ g, areas }: { g: CityStayGuide; areas: NeighborhoodStayGuide[] }) {
  const [preference, setPreference] = useState<StayPreference | null>(null);
  const preferences = [...new Set(areas.flatMap((area) => area.suits))];
  const visibleAreas = preference ? areas.filter((area) => area.suits.includes(preference)) : areas;

  return (
    <main className="pb-10" data-testid="telaviv-stay-hub">
      <GuideHeader
        crumbs={[
          { name: "Home", to: "/" },
          { name: "Accommodation", to: "/accommodation/" },
          { name: "Tel Aviv", to: g.path as LinkProps["to"] },
        ]}
        eyebrow="Accommodation · Tel Aviv"
        title={g.title}
        intro={g.intro}
        checkedAt={g.reviewedAt || INFO_CHECK_DATE}
        image={{ src: telavivHeroPhoto, alt: "Tel Aviv coastline and beachfront" }}
      />
      <OnThisPage sections={pageSections} />
      <article className="mx-auto max-w-5xl px-4">
        <TelAvivHotelBrowser />

        <section id="areas" aria-labelledby="areas-h" className="mt-12 scroll-mt-28">
          <h2 id="areas-h" className="text-2xl font-semibold sm:text-3xl">Choose your Tel Aviv neighborhood</h2>
          <p className="mt-3 w-full text-pretty leading-relaxed text-muted-foreground">
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
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visibleAreas.map((area) => <li key={area.id} data-testid="neighborhood-card" className="min-w-0">
              <Link
                to={area.path as LinkProps["to"]}
                aria-label={"Explore " + area.name + ": area guide and hotel recommendations"}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/50 hover:bg-secondary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="block min-w-0 overflow-hidden bg-muted">
                  <img
                    src={area.photo.src}
                    alt={area.photo.alt}
                    width={755} height={503} loading="lazy" decoding="async"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
                  />
                </span>
                <span className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-4">
                  <span className="text-xs font-medium text-muted-foreground">{area.bestFor}</span>
                  <h3 className="mt-1 text-base font-semibold leading-snug sm:text-lg">{area.name}</h3>
                  <span className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{area.summary}</span>
                  <span className="mt-auto inline-flex min-h-8 items-center gap-1 pt-3 text-xs font-semibold text-primary group-hover:underline sm:text-sm">
                    {neighborhoodCta[area.id] || "Explore hotels in this area"} <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </span>
              </Link>
            </li>)}
          </ul>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex gap-3 rounded-xl border border-amber-200/60 bg-amber-50/60 p-4 dark:border-amber-400/20 dark:bg-amber-500/5">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
              <p className="text-sm leading-relaxed"><strong>Check walking distances.</strong> Staying close to the beach does not necessarily put Rothschild, Jaffa or the railway stations within a short walk. Check your main stops on the map before choosing a hotel.</p>
            </div>
            <div className="flex gap-3 rounded-xl border border-amber-200/60 bg-amber-50/60 p-4 dark:border-amber-400/20 dark:bg-amber-500/5">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
              <p className="text-sm leading-relaxed"><strong>Plan weekend arrivals.</strong> Public transport is limited during Shabbat and some <Link to="/travel-blog/calendar-of-events/" className="font-semibold text-primary underline underline-offset-2">Jewish holidays</Link>. Check transfer options if you arrive on Friday evening or Saturday.</p>
            </div>
          </div>
        </section>

        <section id="compare" aria-labelledby="compare-h" className="mt-12 scroll-mt-28">
          <h2 id="compare-h" className="text-2xl font-semibold sm:text-3xl">Compare areas in Tel Aviv</h2>
          <p className="mt-2 text-sm text-muted-foreground">Compare each neighborhood’s advantages, arrival options and practical considerations to find the right base for your stay.</p>
          <div className="mt-4 overflow-hidden rounded-2xl border bg-card">
            <div className="overflow-x-auto" role="region" aria-label="Tel Aviv neighborhood comparison" tabIndex={0}>
              <table className="w-full min-w-[680px] text-left text-sm">
                <caption className="sr-only">Tel Aviv neighborhoods, ideal guests, arrival considerations and tradeoffs</caption>
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
          </div>
        </section>

        <section id="area-guide" aria-labelledby="area-guide-h" className="mt-8 scroll-mt-28">
          <div className="grid overflow-hidden rounded-2xl border bg-secondary/30 sm:grid-cols-[minmax(0,1fr)_230px]">
            <div className="min-w-0 p-5 sm:p-6">
              <p className="eyebrow inline-flex items-center gap-2"><BookOpen className="h-4 w-4" aria-hidden /> Neighborhood guide</p>
              <h2 id="area-guide-h" className="mt-2 text-xl font-semibold sm:text-2xl">
                Not sure where to base yourself in Tel Aviv?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                In my guide, I compare eight Tel Aviv neighborhoods, including their atmosphere, walking routes, public transport and access to the city’s major sights.
              </p>
              <Link
                to={"/travel-blog/where-to-stay-in-tel-aviv/" as LinkProps["to"]}
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/30 bg-card px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Compare neighborhoods <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <img src={telavivAreaGuidePhoto} alt="Tel Aviv urban streets and city neighborhoods" width={460} height={300} loading="lazy" decoding="async" className="aspect-[16/10] h-full w-full object-cover sm:aspect-auto" />
          </div>
        </section>

        <section id="checklist" aria-labelledby="checklist-h" className="mt-12 scroll-mt-28">
          <h2 id="checklist-h" className="text-2xl font-semibold sm:text-3xl">Before you book</h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
            Compare the exact street, distance to the beach, arrival arrangements, final price and cancellation terms for your room.
          </p>
          <StayBookingChecklist groups={[
            { title: "Location & arrival", items: g.checklist.slice(0, 4) },
            { title: "Room & booking conditions", items: [
              "Confirm bed setup and guest occupancy",
              "Check the total price, taxes and breakfast",
              "Review cancellation and payment terms",
              "Verify parking and step-free access where needed",
            ] },
          ]} />
        </section>

        <FaqList faqs={g.faqs} compact />
        <StayTripLinks region="telaviv" currentPath={g.path} />
        <HomeContactForm guide={guideContactCopy(g.title, "accommodation", g.city)} />
        <SourceList ids={g.sourceIds} />
        <AreaPhotoCredit areas={areas} />
        <CityHotelPhotoCredits city="telaviv" />
      </article>
    </main>
  );
}
