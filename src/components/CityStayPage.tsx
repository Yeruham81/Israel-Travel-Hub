import { useState } from "react";
import type { CityStayGuide, StayPreference } from "@/data/content";
import { preferenceLabels, neighborhoodGuidesForCity } from "@/data/content";
import { CityStayHub } from "@/components/CityStayHub";
import { linksForPage } from "@/data/registry";
import { type UiCrumb, Checklist, EndCta, FaqList, GuideHeader, OnThisPage, ProviderSection, RelatedLinks, Section, SourceList } from "@/components/Guide";

const sections = [
  ["overview", "Overview"],
  ["areas", "Areas"],
  ["checklist", "Booking checklist"],
  ["book", "Find a place to stay"],
  ["faq", "FAQ"],
  ["sources", "Sources"],
] as const;

export function CityStayPage({ g }: { g: CityStayGuide }) {
  const areas = neighborhoodGuidesForCity(g.id);
  return areas.length ? <CityStayHub g={g} areas={areas} /> : <SimpleCityStayPage g={g} />;
}

function SimpleCityStayPage({ g }: { g: CityStayGuide }) {
  const [pref, setPref] = useState<StayPreference | null>(null);
  const prefs = Array.from(new Set(g.areas.flatMap((a) => a.suits)));
  const links = linksForPage(`stay-${g.id}`);
  const pageId = `stay-${g.id}`;
  return (
    <main>
      <GuideHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Accommodation", to: "/accommodation/" }, { name: g.city, to: g.path as UiCrumb["to"] }]}
        eyebrow={`Accommodation · ${g.city}`}
        title={g.title}
        intro={g.intro}
      />
      <OnThisPage sections={sections} />
      <article className="mx-auto max-w-5xl px-4">
        <Section id="overview" title={`Choosing where to stay in ${g.city}`}>
          {g.overview.map((p) => <p key={p}>{p}</p>)}
        </Section>

        <section id="areas" aria-labelledby="areas-h" className="mt-14">
          <h2 id="areas-h" className="text-3xl">Areas at a glance</h2>
          <p className="mt-2 text-muted-foreground">Pick what matters to you to highlight matching areas. This only highlights my guidance below — it doesn't search hotels.</p>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Highlight areas by preference">
            {prefs.map((p) => (
              <button key={p} type="button" className="chip" aria-pressed={pref === p} onClick={() => setPref(pref === p ? null : p)}>{preferenceLabels[p]}</button>
            ))}
          </div>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {g.areas.map((a) => {
              const match = !pref || a.suits.includes(pref);
              return (
                <li key={a.name} className={`rounded-2xl border bg-card p-5 transition-opacity ${match ? "" : "opacity-40"} ${pref && match ? "border-primary" : ""}`} data-match={match}>
                  <h3 className="text-xl">{a.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{a.text}</p>
                  <p className="mt-2 text-sm text-muted-foreground"><span className="font-medium text-foreground">Watch for:</span> {a.watch}</p>
                  <p className="mt-3 flex flex-wrap gap-1">{a.suits.map((s) => <span key={s} className="rounded-full bg-muted px-2 py-0.5 text-xs">{preferenceLabels[s]}</span>)}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="checklist" aria-labelledby="cl-h" className="mt-14">
          <h2 id="cl-h" className="text-3xl">Practical booking checklist</h2>
          <div className="mt-4"><Checklist title="Before you pay" items={g.checklist} /></div>
        </section>

        <ProviderSection
          title={`Find a place to stay in ${g.city}`}
          intro="I don't list specific properties yet. Use the area advice above, then compare current properties and prices for your dates on the provider's site."
          links={links}
          pageId={pageId}
        />

        <FaqList faqs={g.faqs} />
        <SourceList ids={g.sourceIds} />
        <RelatedLinks items={g.related} />
        <EndCta title={`Ready to compare ${g.city} stays?`} links={links} pageId={pageId} />
      </article>
    </main>
  );
}
