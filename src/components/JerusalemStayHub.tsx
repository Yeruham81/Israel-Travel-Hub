import { useState } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, Lightbulb } from "lucide-react";
import {
  type CityStayGuide, type NeighborhoodStayGuide, type StayPreference, preferenceLabels,
} from "@/data/content";
import { areaArrivalSignals } from "@/data/localEditorialInsights";
import { INFO_CHECK_DATE } from "@/data/registry";
import { GuideHeader, OnThisPage, FaqList, SourceList } from "@/components/Guide";
import { JerusalemHotelBrowser } from "@/components/JerusalemHotelBrowser";
import { StayTripLinks } from "@/components/StayTripLinks";
import { HomeContactForm } from "@/components/HomeContactForm";
import { guideContactCopy } from "@/lib/guide-contact";
import { CityHotelPhotoCredits } from "@/components/CityHotelPhotoCredits";
import { AreaPhotoCredit } from "@/components/AreaMap";
import jerusalemHeroPhoto from "@/assets/home/hero-refresh-jerusalem-jaffa-gate-v4-medium.webp";
import jerusalemAreaGuidePhoto from "@/assets/home/jerusalem-old-city-tile.webp";

const pageSections = [
  ["area-guide", "Where to stay"], ["book", "Hotels"], ["areas", "Neighborhoods"], ["compare", "Compare areas"],
  ["checklist", "Booking tips"], ["faq", "FAQ"], ["explore", "Local guides"],
  ["trip-planning", "Trip planning"], ["contact", "Contact me"],
] as const;

const neighborhoodCta: Record<string, string> = {
  downtown: "Discover Downtown hotels",
  mamilla: "Browse Mamilla hotels",
  "old-city": "Find an Old City stay",
  "mahane-yehuda": "Explore market-area hotels",
  "east-jerusalem": "Discover East Jerusalem stays",
  "german-colony": "Browse German Colony & Baka hotels",
};

export function JerusalemStayHub({ g, areas }: { g: CityStayGuide; areas: NeighborhoodStayGuide[] }) {
  const [preference, setPreference] = useState<StayPreference | null>(null);
  const preferences: StayPreference[] = ["first-visit", "car-free", "heritage", "luxury", "family", "quiet"];
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
        checkedAt={g.reviewedAt || INFO_CHECK_DATE}
        image={{ src: jerusalemHeroPhoto, alt: "Jaffa Gate and Jerusalem Old City walls" }}
      />
      <OnThisPage sections={pageSections} />
      <article className="mx-auto max-w-5xl px-4">
        <section id="area-guide" aria-labelledby="area-guide-h" className="mt-8 scroll-mt-28">
          <div className="grid overflow-hidden rounded-2xl border bg-secondary/30 sm:grid-cols-[minmax(0,1fr)_230px]">
            <div className="min-w-0 p-5 sm:p-6">
              <p className="eyebrow inline-flex items-center gap-2"><BookOpen className="h-4 w-4" aria-hidden /> Find your ideal base</p>
              <h2 id="area-guide-h" className="mt-2 text-xl font-semibold sm:text-2xl">
                Choosing your Jerusalem neighborhood?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Compare the atmosphere, walking distances and transport connections of six popular areas before deciding where to stay.
              </p>
              <Link
                to={"/travel-blog/where-to-stay-in-jerusalem/" as LinkProps["to"]}
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/30 bg-card px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Explore the neighborhood guide <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <img src={jerusalemAreaGuidePhoto} alt="Jerusalem Old City skyline and surrounding neighborhoods" width={460} height={300} loading="lazy" decoding="async" className="hidden h-full w-full object-cover sm:block" />
          </div>
        </section>

        <JerusalemHotelBrowser />

        <section id="areas" aria-labelledby="areas-h" className="mt-12 scroll-mt-28">
          <h2 id="areas-h" className="text-2xl font-semibold sm:text-3xl">Choose your Jerusalem neighborhood</h2>
          <p className="mt-3 w-full text-pretty leading-relaxed text-muted-foreground">
            {g.areaIntro}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex gap-3 rounded-xl border border-amber-200/60 bg-amber-50/60 p-4 dark:border-amber-400/20 dark:bg-amber-500/5">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
              <p className="text-sm leading-relaxed"><strong>Think about the last walk.</strong> Jerusalem is hilly, and the nearest taxi stop or light-rail station may still be uphill from your hotel.</p>
            </div>
            <div className="flex gap-3 rounded-xl border border-amber-200/60 bg-amber-50/60 p-4 dark:border-amber-400/20 dark:bg-amber-500/5">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
              <p className="text-sm leading-relaxed"><strong>Check your dates.</strong> Shabbat and <Link to="/travel-blog/israel-holidays/" className="font-semibold text-primary underline underline-offset-2">Jewish holidays</Link> can affect transport and dining in West Jerusalem; other neighborhoods may follow different schedules.</p>
            </div>
          </div>
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
            {visibleAreas.map((area) => <li key={area.id} data-testid="neighborhood-card" className="min-w-0">
              <Link
                to={area.path as LinkProps["to"]}
                aria-label={"Explore " + area.name + ": area guide and hotel recommendations"}
                className="group grid h-full min-w-0 grid-cols-[110px_minmax(0,1fr)] overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/50 hover:bg-secondary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:grid-cols-[155px_minmax(0,1fr)]"
              >
                <span className="block min-w-0 overflow-hidden bg-muted">
                  <img
                    src={area.photo.src} alt={area.photo.alt}
                    width={755} height={503} loading="lazy" decoding="async"
                    className="aspect-[16/10] h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
                  />
                </span>
                <span className="flex min-w-0 flex-col p-3.5 sm:p-4">
                  <span className="text-xs font-medium text-muted-foreground">{area.bestFor}</span>
                  <h3 className="mt-1 text-base font-semibold leading-snug sm:text-lg">{area.name}</h3>
                  <span className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{area.summary}</span>
                  <span className="mt-3 inline-flex min-h-8 items-center gap-1 text-xs font-semibold text-primary group-hover:underline sm:text-sm">
                    {neighborhoodCta[area.id] || "Explore hotels in this area"} <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </span>
              </Link>
            </li>)}
          </ul>
        </section>

        <section id="compare" aria-labelledby="compare-h" className="mt-12 scroll-mt-28">
          <h2 id="compare-h" className="text-2xl font-semibold sm:text-3xl">Compare areas in Jerusalem</h2>
          <p className="mt-2 text-sm text-muted-foreground">A quick guide to location and access before choosing a room.</p>
          <div className="mt-4 overflow-hidden rounded-2xl border bg-card">
            <div className="overflow-x-auto" role="region" aria-label="Jerusalem neighborhood comparison" tabIndex={0}>
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
          </div>
        </section>

        <section id="checklist" aria-labelledby="checklist-h" className="mt-12 scroll-mt-28">
          <h2 id="checklist-h" className="text-2xl font-semibold sm:text-3xl">Before you book</h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
            Check the exact hotel entrance and walking route, especially near the Old City, and compare the final price and cancellation terms.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {([
              { title: "Location & arrival", items: g.checklist.slice(0, 4) },
              { title: "Room & booking conditions", items: [
                "Confirm bed setup and guest occupancy",
                "Check the total price, taxes and breakfast",
                "Review cancellation and payment terms",
                "Verify parking and step-free access where needed",
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
