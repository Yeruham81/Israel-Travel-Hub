import { useState } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, MapPin, Check, Compass } from "lucide-react";
import { type CityStayGuide, type NeighborhoodStayGuide, type StayPreference, preferenceLabels } from "@/data/content";
import { areaArrivalSignals } from "@/data/localEditorialInsights";
import { INFO_CHECK_DATE, linksForPage, publicSources } from "@/data/registry";
import { GuideHeader, OnThisPage, Section, Checklist, ProviderSection, FaqList, SourceList } from "@/components/Guide";
import { AreaPhotoCredit } from "@/components/AreaMap";
import { TelAvivHotelBrowser } from "@/components/TelAvivHotelBrowser";
import { JerusalemHotelBrowser } from "@/components/JerusalemHotelBrowser";
import { CityStayPlanning } from "@/components/CityStayPlanning";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import { JerusalemClusterLinks } from "@/components/JerusalemClusterLinks";

export const quickPickPhotos: Record<string, { src: string; alt: string; sourceFilename: string }> = {
  downtown: { src: "/images/city-stays/jerusalem-downtown.webp", alt: "Ben Yehuda pedestrian street in central Jerusalem", sourceFilename: "Jerusalem_Ben_Yehuda_Pedestrian_Mall.jpg.webp" },
  mamilla: { src: "/images/city-stays/jerusalem-mamilla.webp", alt: "Shops along Mamilla's pedestrian promenade in Jerusalem", sourceFilename: "mamilla_pedestrian_mall_jerusalem.jpg.webp" },
  "german-colony": { src: "/images/city-stays/jerusalem-german-colony.webp", alt: "Emek Refaim street in Jerusalem's German Colony", sourceFilename: "emek_refaim_street_jerusalem.webp" },
  "telaviv-beachfront": { src: "/images/city-stays/tel-aviv-beachfront.webp", alt: "Gordon Beach on Tel Aviv's Mediterranean waterfront", sourceFilename: "gordon_beach_tel_aviv_israel_1.jpg.webp" },
  "telaviv-dizengoff": { src: "/images/city-stays/tel-aviv-dizengoff.webp", alt: "Dizengoff Square in central Tel Aviv", sourceFilename: "dizengoff_square_tel_aviv.webp" },
  "telaviv-jaffa": { src: "/images/city-stays/tel-aviv-jaffa.webp", alt: "Jaffa's lively flea market", sourceFilename: "flea_market_in_jaffa1.jpg.webp" },
};

const sections = [["overview", "Start here"], ["areas", "Explore areas"], ["compare", "Compare areas"], ["checklist", "Booking tips"], ["book", "Find hotels"], ["planning", "Trip planning"], ["faq", "FAQ"], ["sources", "Sources"]] as const;

export function CityStayHub({ g, areas }: { g: CityStayGuide; areas: NeighborhoodStayGuide[] }) {
  const [preference, setPreference] = useState<StayPreference | null>(null);
  const preferences = [...new Set(areas.flatMap((area) => area.suits))];
  const visibleAreas = preference ? areas.filter((area) => area.suits.includes(preference)) : areas;
  const quickPicks = (g.quickPicks || []).map((pick) => ({ ...pick, area: areas.find((area) => area.id === pick.areaId) }));

  return (
    <main className="pb-8">
      <GuideHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Accommodation", to: "/hotels/" }, { name: g.city, to: g.path as LinkProps["to"] }]}
        eyebrow={`Where to stay · ${g.city}`}
        title={g.title}
        intro={g.intro}
        checkedAt={g.reviewedAt || INFO_CHECK_DATE}
      />
      <OnThisPage sections={publicSources(g.sourceIds).length ? sections : sections.filter(([id]) => id !== "sources")} />
      <article className="mx-auto max-w-5xl px-4">
        <Section id="overview" title={`Where should you stay in ${g.city}?`} className="scroll-mt-32">
          <p>{g.areaIntro || g.overview.join(" ")}</p>
          {g.areaIntro && g.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Section>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {quickPicks.map(({ area, label, description }) => area && (
            <li key={label} className="min-w-0">
              <Link to={area.path as LinkProps["to"]} className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {quickPickPhotos[area.id] && <img src={quickPickPhotos[area.id]!.src} alt={quickPickPhotos[area.id]!.alt} width={600} height={375} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />}
                <span className="flex flex-1 flex-col p-4">
                  <span className="eyebrow">{label}</span>
                  <span className="mt-2 text-lg font-semibold text-foreground">{area.shortName}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore this area <ArrowRight className="h-4 w-4" aria-hidden /></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <section id="areas" aria-labelledby="areas-h" className="mt-14 scroll-mt-32">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow">Get to know the city</p><h2 id="areas-h" className="mt-2 text-3xl md:text-4xl">Explore {g.city}, area by area</h2></div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-xs font-semibold"><Compass className="h-4 w-4" aria-hidden /> {areas.length} area guides</span>
          </div>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">Compare the character of each neighborhood, its main attractions and what to watch for when choosing a room. Each area guide has a larger map, arrival advice and a curated hotel shortlist.</p>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Choose areas by travel style">
            <button type="button" className="chip" aria-pressed={preference === null} onClick={() => setPreference(null)}>All areas</button>
            {preferences.map((pref) => <button key={pref} type="button" className="chip" aria-pressed={preference === pref} onClick={() => setPreference(preference === pref ? null : pref)}>{preferenceLabels[pref]}</button>)}
          </div>
          <p className="mt-3 text-xs text-muted-foreground" role="status" aria-live="polite">{visibleAreas.length} {visibleAreas.length === 1 ? "area" : "areas"}{preference ? ` for ${preferenceLabels[preference].toLowerCase()}` : " to explore"}</p>
          <div className="mt-5 space-y-5">
            {visibleAreas.map((area) => (
              <section key={area.id} aria-labelledby={`${area.id}-title`} className="overflow-hidden rounded-3xl border bg-card transition-colors hover:border-primary/50" data-testid="neighborhood-card">
                <div className="grid min-w-0 items-start lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]">
                  <div className="p-3 sm:p-4 lg:p-5">
                    <Link to={area.path as LinkProps["to"]} tabIndex={-1} aria-hidden="true" className="group block overflow-hidden rounded-2xl bg-muted">
                      <img src={area.photo.src} alt={area.photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]" />
                    </Link>
                  </div>
                  <div className="flex min-w-0 flex-col px-5 pb-5 sm:px-6 sm:pb-6 lg:py-6 lg:pl-0">
                    <p className="eyebrow">{area.bestFor}</p>
                    <h3 id={`${area.id}-title`} className="mt-2 text-2xl sm:text-3xl">
                      <Link to={area.path as LinkProps["to"]} className="hover:text-primary focus-visible:outline-2 focus-visible:outline-primary">{area.name}</Link>
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{area.summary}</p>
                    <div className="mt-4 flex flex-wrap items-start gap-2">
                      {area.highlights.slice(0, 2).map((highlight) => (
                        <span key={highlight.name} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden /> {highlight.name}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm"><span className="font-semibold">Stay style:</span> {area.priceLevel}</p>
                    <p className="mt-3 rounded-xl bg-secondary/70 px-4 py-3 text-sm leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">Keep in mind:</span> {area.watch}</p>
                    <Link to={area.path as LinkProps["to"]} className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg font-semibold text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-label={`Explore ${area.name}: area guide and hotel recommendations`}>
                      Explore Area & Hotels <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section id="compare" aria-labelledby="compare-h" className="mt-14 scroll-mt-32">
          <h2 id="compare-h" className="text-3xl">Compare areas in {g.city}</h2>
          <p className="mt-2 text-sm text-muted-foreground">These are relative accommodation styles, not live room rates. The exact hotel and street matter as much as the area name.</p>
          <div className="mt-5 overflow-x-auto rounded-2xl border bg-card" role="region" aria-label={`${g.city} area comparison`} tabIndex={0}>
            <table className="w-full min-w-[850px] text-left text-sm">
              <caption className="sr-only">{g.city} neighborhoods, travel styles, accommodation levels, arrival practicalities and main tradeoffs</caption>
              <thead className="bg-secondary"><tr>{["Area", "Best for", "Accommodation", "Arriving with bags", "Keep in mind"].map((label) => <th scope="col" key={label} className="px-4 py-3 font-semibold">{label}</th>)}</tr></thead>
              <tbody className="divide-y">{areas.map((area) => <tr key={area.id}><th scope="row" className="px-4 py-4 font-semibold"><Link to={area.path as LinkProps["to"]} className="text-primary underline underline-offset-2">{area.shortName}</Link></th><td className="px-4 py-4">{area.bestFor}</td><td className="px-4 py-4">{area.priceLevel}</td><td className="max-w-64 px-4 py-4">{areaArrivalSignals[area.id] || area.arrivalTips[0]}</td><td className="max-w-64 px-4 py-4 text-muted-foreground">{area.watch}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <Section id="checklist" title={`Before you choose your ${g.city} hotel`} className="scroll-mt-32">
          <p>Look beyond a neighborhood label. Check the actual walking route, street noise, vehicle access and arrival-day transport before comparing room rates.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Checklist title="Location & arrival" items={g.checklist.slice(0, 4)} />
            <div className="rounded-xl border bg-card p-5"><h3 className="text-lg">Room & booking conditions</h3><ul className="mt-2 space-y-2 text-sm">{["Compare the final total, taxes and fees for your dates", "Read the cancellation deadline and payment conditions", "Confirm the exact room, beds and occupancy", "Check current access, parking and any street works"].map((tip) => <li key={tip} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{tip}</li>)}</ul></div>
          </div>
        </Section>
        {g.id === "telaviv" || g.id === "jerusalem" ? (
          <>
            {g.id === "telaviv" ? <TelAvivHotelBrowser /> : <JerusalemHotelBrowser />}
            <div id="more-hotels" className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-2xl border bg-secondary/50 p-5 sm:p-6">
              <div className="max-w-xl">
                <h3 className="text-xl">Looking for even more {g.city} hotels?</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">My shortlist is a starting point. Compare more properties on the booking site, where you can select exact dates, guests, room types and cancellation conditions.</p>
              </div>
              <div className="flex flex-col gap-2">
                {linksForPage(`stay-${g.id}`).map((booking) => (
                  <a key={booking.id} href={booking.url} target="_blank" rel={relFor(booking.isAffiliate)}
                     onClick={() => recordOutboundClick({ pageId: `stay-${g.id}`, productId: booking.id, offerId: booking.id })}
                     className="btn btn-primary text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    Browse more on {booking.providerName} ↗
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
                <p className="text-xs text-muted-foreground">Sponsored booking link · Rates and inventory checked on the provider site.</p>
              </div>
            </div>
          </>
        ) : (
          <ProviderSection id="book" title={`Already know your dates? Browse ${g.city} stays`} intro="Open an area guide above for recommended properties, or browse a wider range of rooms on the provider's website." links={linksForPage(`stay-${g.id}`)} pageId={`stay-${g.id}`} />
        )}
        <section id="planning" className="scroll-mt-32"><CityStayPlanning city={g.id} /></section>
        {g.id === "jerusalem" && <JerusalemClusterLinks pageKey="stay-jerusalem" />}
        <FaqList faqs={g.faqs} />
        <SourceList ids={g.sourceIds} />
        <AreaPhotoCredit areas={areas} />
      </article>
    </main>
  );
}
