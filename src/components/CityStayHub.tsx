import { useState } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, MapPin, Check, Compass } from "lucide-react";
import { type CityStayGuide, type NeighborhoodStayGuide, type StayPreference, preferenceLabels } from "@/data/content";
import { INFO_CHECK_DATE, hotelsForArea, linksForPage } from "@/data/registry";
import { GuideHeader, OnThisPage, Section, Checklist, ProviderSection, FaqList, RelatedLinks, SourceList } from "@/components/Guide";
import { AreaMap, AreaPhotoCredit } from "@/components/AreaMap";

const sections = [["overview", "Start here"], ["areas", "Explore areas"], ["compare", "Compare areas"], ["checklist", "Booking tips"], ["book", "Find hotels"], ["faq", "FAQ"], ["sources", "Sources"]] as const;

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
      <OnThisPage sections={sections} />
      <article className="mx-auto max-w-5xl px-4">
        <Section id="overview" title="A neighborhood for the way you travel" className="scroll-mt-32">
          <p>{g.areaIntro || g.overview.join(" ")}</p>
        </Section>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {quickPicks.map(({ area, label, description }) => area && (
            <li key={label}>
              <Link to={area.path as LinkProps["to"]} className="group flex h-full flex-col rounded-2xl border bg-card p-5 transition-colors hover:border-primary">
                <p className="eyebrow">{label}</p>
                <h3 className="mt-2 text-xl">{area.shortName}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore the area <ArrowRight className="h-4 w-4" aria-hidden /></span>
              </Link>
            </li>
          ))}
        </ul>

        <section id="areas" aria-labelledby="areas-h" className="mt-14 scroll-mt-32">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow">Get to know the city</p><h2 id="areas-h" className="mt-2 text-3xl md:text-4xl">Explore {g.city}, area by area</h2></div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-xs font-semibold"><Compass className="h-4 w-4" aria-hidden /> {areas.length} area guides</span>
          </div>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">Start with the atmosphere, nearby sights and practical tradeoffs. Open an area guide for the full picture and our hotel shortlist. Map pins mark reference points within each area.</p>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Choose areas by travel style">
            <button type="button" className="chip" aria-pressed={preference === null} onClick={() => setPreference(null)}>All areas</button>
            {preferences.map((pref) => <button key={pref} type="button" className="chip" aria-pressed={preference === pref} onClick={() => setPreference(preference === pref ? null : pref)}>{preferenceLabels[pref]}</button>)}
          </div>
          <p className="mt-3 text-xs text-muted-foreground" role="status" aria-live="polite">{visibleAreas.length} {visibleAreas.length === 1 ? "area" : "areas"}{preference ? ` for ${preferenceLabels[preference].toLowerCase()}` : " to explore"}</p>
          <div className="mt-5 space-y-6">
            {visibleAreas.map((area) => (
              <section key={area.id} aria-labelledby={`${area.id}-title`} className="overflow-hidden rounded-3xl border bg-card" data-testid="neighborhood-card">
                <div className="grid md:grid-cols-[0.9fr_1.4fr]">
                  <Link to={area.path as LinkProps["to"]} tabIndex={-1} aria-hidden="true" className="group relative block overflow-hidden bg-muted">
                    <img src={area.photo.src} alt={area.photo.alt} width={755} height={503} loading="lazy" decoding="async" className="h-52 w-full object-cover transition-transform duration-500 motion-reduce:transition-none md:h-full md:min-h-80 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-card/95 px-3 py-1.5 text-xs font-semibold">{String(areas.indexOf(area) + 1).padStart(2, "0")} / {String(areas.length).padStart(2, "0")}</span>
                  </Link>
                  <div className="p-5 sm:p-6">
                    <Link to={area.path as LinkProps["to"]} className="group block rounded-lg">
                      <p className="eyebrow">{area.bestFor}</p>
                      <h3 id={`${area.id}-title`} className="mt-2 text-3xl group-hover:text-primary">{area.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.summary}</p>
                    </Link>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide"><MapPin className="h-3.5 w-3.5" aria-hidden /> Nearby & noteworthy</p>
                        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">{area.highlights.slice(0, 2).map((highlight) => <li key={highlight.name}>{highlight.name}</li>)}</ul>
                        <p className="mt-3 text-xs font-medium">{area.priceLevel}</p>
                      </div>
                      <AreaMap area={area} compact />
                    </div>
                    <p className="mt-4 rounded-xl bg-secondary/70 px-3 py-2 text-xs leading-relaxed"><span className="font-semibold">Keep in mind:</span> {area.watch}</p>
                    <Link to={area.path as LinkProps["to"]} className="mt-4 inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline" aria-label={`Read the ${area.name} guide and hotel recommendations`}>
                      Area guide & {hotelsForArea(area.id, g.id).length} hotel picks <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section id="compare" aria-labelledby="compare-h" className="mt-14 scroll-mt-32">
          <h2 id="compare-h" className="text-3xl">Compare {areas.length === 6 ? "the six" : `all ${areas.length}`} areas</h2>
          <p className="mt-2 text-sm text-muted-foreground">These are relative accommodation styles, not live room rates. The exact hotel and street matter as much as the area name.</p>
          <div className="mt-5 overflow-x-auto rounded-2xl border bg-card" role="region" aria-label={`${g.city} area comparison`} tabIndex={0}>
            <table className="w-full min-w-[620px] text-left text-sm">
              <caption className="sr-only">{g.city} neighborhoods, travel styles, accommodation levels and main tradeoffs</caption>
              <thead className="bg-secondary"><tr>{["Area", "Best for", "Accommodation", "Keep in mind"].map((label) => <th scope="col" key={label} className="px-4 py-3 font-semibold">{label}</th>)}</tr></thead>
              <tbody className="divide-y">{areas.map((area) => <tr key={area.id}><th scope="row" className="px-4 py-4 font-semibold"><Link to={area.path as LinkProps["to"]} className="text-primary underline underline-offset-2">{area.shortName}</Link></th><td className="px-4 py-4">{area.bestFor}</td><td className="px-4 py-4">{area.priceLevel}</td><td className="max-w-64 px-4 py-4 text-muted-foreground">{area.watch}</td></tr>)}</tbody>
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
        <div className="mt-8 rounded-xl border bg-secondary/60 p-4 text-sm leading-relaxed">
          <span className="font-semibold">Booking links:</span> We may earn a commission from links marked “Sponsored link”, at no extra cost to you. Hotel picks are editorial starting points; enter your dates and confirm the property, room and total on the booking site.
        </div>
        <ProviderSection title={`Already know your dates? Browse ${g.city} stays`} intro="For neighborhood-specific recommendations, open an area guide above. You can also browse the wider city here." links={linksForPage(`stay-${g.id}`)} pageId={`stay-${g.id}`} />
        <FaqList faqs={g.faqs} />
        <SourceList ids={g.sourceIds} />
        <RelatedLinks items={g.related} />
        <AreaPhotoCredit areas={areas} />
      </article>
    </main>
  );
}
