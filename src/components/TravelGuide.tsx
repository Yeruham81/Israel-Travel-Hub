import { Link } from "@tanstack/react-router";
import { Breadcrumbs, Checklist, FaqList, OnThisPage, ProviderCard, RelatedLinks, SourceList } from "@/components/Guide";
import { guideTopics, travelGuides, type GuideDirectoryEntry, type GuidePhoto, type GuideTopicId, type TravelGuide } from "@/data/travelGuides";
import { publicSources, isPublisherUrl, linksForPage, travelGuidePaths, TRAVEL_GUIDE_CHECK_DATE, type TravelGuideId } from "@/data/registry";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";

function sourcesFor(guide: TravelGuide) { return [...new Set([...guide.sourceIds, ...guide.sections.flatMap((section) => section.sourceIds || [])])]; }

export function travelGuideMeta(id: TravelGuideId) {
  const guide = travelGuides[id];
  const path = travelGuidePaths[id];
  const meta = pageMeta({ title: guide.title, description: guide.description, path, type: "article", crumbs: [{ name: "Home", path: "/" }, { name: "Travel guides", path: "/guides/" }, { name: guide.title, path }], image: guide.photo.src, imageAlt: guide.photo.alt });
  const imageUrl = new URL(guide.photo.src, CANONICAL_ORIGIN).href;
  return { ...meta, scripts: [...meta.scripts, jsonLd(
    { "@context": "https://schema.org", "@type": "Article", "@id": `${CANONICAL_ORIGIN}${path}#article`, headline: guide.title, description: guide.description, mainEntityOfPage: `${CANONICAL_ORIGIN}${path}`, inLanguage: "en", dateModified: TRAVEL_GUIDE_CHECK_DATE,
      author: authorLd(), publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      about: guide.topics.map((topic) => guideTopics.find((item) => item.id === topic)!.label), citation: publicSources(sourcesFor(guide)).map((source) => source.url), image: imageUrl,
    })] };
}

export function GuideTags({ topics }: { topics: GuideTopicId[] }) {
  return <ul className="flex flex-wrap gap-2" aria-label="Guide topics">{topics.map((id) => <li key={id}><Link to="/guides/" search={{ topic: id }} className="inline-block rounded-full border bg-background px-3 py-1 text-xs font-medium text-primary hover:bg-secondary">{guideTopics.find((topic) => topic.id === id)!.label}</Link></li>)}</ul>;
}

export function GuidePhotoCredit({ photo }: { photo: GuidePhoto }) {
  if (!hasPublicPhotoCredit(photo)) return null;
  const sourceUrl = !isPublisherUrl(photo.sourceUrl) ? photo.sourceUrl : undefined;
  return <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{sourceUrl ? <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">{photo.credit || "Photo source"}<span className="sr-only"> (opens in a new tab)</span></a> : photo.credit}{photo.licenseUrl && <> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline">Licence<span className="sr-only"> (opens in a new tab)</span></a></>}</p>;
}

function SectionReferences({ ids }: { ids: string[] }) {
  const sources = publicSources(ids);
  if (!sources.length) return null;
  return <p className="mt-4 text-xs text-muted-foreground">References: {sources.map((source, index) => <span key={source.id}>{index > 0 && " · "}<a href={source.url} target="_blank" rel="noopener noreferrer" className="underline">{source.publisher}<span className="sr-only"> (opens in a new tab)</span></a></span>)}</p>;
}

export function GuideCard({ guide, headingLevel = 2 }: { guide: GuideDirectoryEntry; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-card" data-testid="guide-directory-card">
    <Link to={guide.to} className="group flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary">
      {guide.photo && <img src={guide.photo.src} alt={guide.photo.alt} width={600} height={400} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />}
      <div className="flex flex-1 flex-col p-5"><Heading className="text-2xl leading-tight group-hover:text-primary">{guide.title}</Heading><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{guide.description}</p><span className="mt-4 text-sm font-semibold text-primary">Read the guide →</span></div>
    </Link>
    <div className="px-5 pb-5"><GuideTags topics={guide.topics} /></div>
  </article>;
}

export function TravelGuidePage({ id }: { id: TravelGuideId }) {
  const guide = travelGuides[id];
  const providers = guide.providerPageId ? linksForPage(guide.providerPageId) : [];
  return <main className="mx-auto max-w-5xl px-4 pb-8">
    <article>
      <header className="pt-6">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/guides/" }, { name: guide.title, to: travelGuidePaths[id] }]} />
        <div className="mt-6"><GuideTags topics={guide.topics} /></div>
        <div className="mt-5 grid items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div><h1 className="text-4xl leading-[1.1] md:text-5xl">{guide.title}</h1><p className="mt-4 text-lg leading-relaxed text-muted-foreground">{guide.intro}</p>
            <PageUpdated date={TRAVEL_GUIDE_CHECK_DATE} />
          </div>
          <figure><img src={guide.photo.src} alt={guide.photo.alt} width={900} height={600} fetchPriority="high" decoding="async" className="aspect-[3/2] w-full rounded-2xl object-cover" /><GuidePhotoCredit photo={guide.photo} /></figure>
        </div>
        <AuthorCard />
      </header>
      <section id="quick-answer" aria-labelledby="answer-h" className="mt-8 scroll-mt-24 rounded-2xl border border-primary/20 bg-secondary/60 p-5 sm:p-7">
        <h2 id="answer-h" className="text-2xl">Quick answer</h2><p className="mt-3 text-lg leading-relaxed">{guide.answer}</p>
        {guide.reviewNote && <p className="mt-4 border-t border-primary/20 pt-3 text-sm leading-relaxed text-muted-foreground">{guide.reviewNote}</p>}
      </section>
      {guide.nextSteps && <RelatedLinks title="Choose your next step" items={guide.nextSteps} />}
      <dl className="mt-5 grid gap-3 sm:grid-cols-3">{guide.facts.map((fact) => <div key={fact.label} className="rounded-xl border bg-card p-4"><dt className="text-xs font-semibold uppercase tracking-wide text-primary">{fact.label}</dt><dd className="mt-2 text-sm leading-relaxed">{fact.text}</dd></div>)}</dl>
      <OnThisPage sections={[["at-a-glance", "At a glance"], ...guide.sections.map((section) => [section.id, section.title] as const), ["checklist", "Checklist"], ["faq", "FAQ"], ["sources", "Sources"]]} />
      <section id="at-a-glance" aria-labelledby="comparison-h" className="mt-10 scroll-mt-24">
        <h2 id="comparison-h" className="text-3xl">{guide.comparison.caption}</h2>
        <div className="mt-5 max-w-full overflow-x-auto rounded-xl border"><table className="w-full min-w-[560px] text-left text-sm"><caption className="sr-only">{guide.comparison.caption}</caption><thead className="bg-secondary"><tr>{guide.comparison.headers.map((heading) => <th key={heading} scope="col" className="p-4 font-semibold">{heading}</th>)}</tr></thead><tbody className="divide-y">{guide.comparison.rows.map((row, index) => <tr key={index} className="bg-card">{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row" className="p-4 font-medium">{cell}</th> : <td key={cellIndex} className="p-4 leading-relaxed text-muted-foreground">{cell}</td>)}</tr>)}</tbody></table></div>
      </section>
      {guide.sections.map((section) => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-h`} className="mt-12 scroll-mt-24"><h2 id={`${section.id}-h`} className="text-3xl">{section.title}</h2>{section.photo && <figure className="mt-5 max-w-3xl"><img src={section.photo.src} alt={section.photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" /><GuidePhotoCredit photo={section.photo} /></figure>}<div className="mt-4 max-w-4xl space-y-4 leading-relaxed text-muted-foreground">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{section.bullets && <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}<SectionReferences ids={section.sourceIds || []} /></section>)}
      <section id="checklist" aria-label="Travel checklist" className="mt-12 scroll-mt-24"><Checklist title="Before you go" items={guide.checklist} /></section>
      {providers.length > 0 && <section id="provider-options" aria-labelledby="providers-h" className="mt-14"><h2 id="providers-h" className="text-3xl">Compare current eSIM plans</h2><p className="mt-3 leading-relaxed text-muted-foreground">These options are based on published product information, not an on-location speed test or a cheapest-price ranking. Links marked “Sponsored link” may earn us a commission at no extra cost to you. Select Israel and verify the exact package before paying.</p><ul className="mt-5 grid gap-4 md:grid-cols-2">{providers.map((link) => <ProviderCard key={link.id} link={link} pageId={guide.providerPageId!} />)}</ul></section>}
      <FaqList faqs={guide.faqs} />
      <SourceList ids={sourcesFor(guide)} />
      <RelatedLinks title="Related practical guides" items={guide.related.map((guideId) => ({ label: travelGuides[guideId].title, to: travelGuidePaths[guideId] }))} />
      <RelatedLinks title="Plan the next part of your trip" items={guide.services} />
      {guide.reading && <section aria-labelledby="reading-h" className="mt-12"><h2 id="reading-h" className="text-2xl">More on this topic</h2><ul className="mt-4 space-y-3">{guide.reading.map((reading) => <li key={reading.href} className="rounded-xl border p-4"><a href={reading.href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">{reading.label}<span className="sr-only"> (opens in a new tab)</span></a><p className="mt-1 text-sm text-muted-foreground">{reading.note}</p></li>)}</ul></section>}
      <div className="mt-12 rounded-2xl bg-navy p-6 text-navy-foreground"><h2 className="text-2xl">Explore more Israel travel guides</h2><p className="mt-2 opacity-85">Find practical advice by topic, from airport arrivals to places to stay and days out.</p><Link to="/guides/" className="btn btn-light mt-4">Browse all guides</Link></div>
    </article>
  </main>;
}
