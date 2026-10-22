import { Link, type LinkProps } from "@tanstack/react-router";
import { guideDirectory } from "@/data/travelGuides";
import type { ReactNode } from "react";
import { ExtLink } from "@/components/Layout";
import { publicSources, formatCheckDate, INFO_CHECK_DATE, type ProviderLink } from "@/data/registry";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { modeNote, relationshipLabel } from "@/lib/booking";
import { recordOutboundClick, relFor } from "@/lib/outbound";

export type UiCrumb = { name: string; to: LinkProps["to"] };

export function Breadcrumbs({ items }: { items: UiCrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap gap-1">
        {items.map((c, i) =>
          i === items.length - 1 ? (
            <li key={c.name} aria-current="page" className="text-foreground">{c.name}</li>
          ) : (
            <li key={c.name}><Link to={c.to} className="hover:text-primary">{c.name}</Link> /</li>
          ),
        )}
      </ol>
    </nav>
  );
}

/** Wrapping in-page links stay in the document flow so a long list cannot cover sections. */
/** Compact, fully wrapping jump links; truncation preserves the full title for accessibility. */
export function OnThisPage({ sections, sticky = false }: { sections: readonly (readonly [string, string])[]; sticky?: boolean }) {
  return (
    <nav aria-label="On this page" className={`${sticky ? "sticky top-[57px] z-30" : ""} mt-4 min-w-0 border-y bg-background/95 backdrop-blur`}>
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 px-1 py-2">
        <span className="mr-1 shrink-0 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">On this page</span>
        <ul className="flex min-w-0 max-w-full flex-wrap items-center gap-1">
          {sections.map(([id, label]) => <li key={id} className="min-w-0 max-w-full">
            <a href={`#${id}`} title={label} aria-label={label} className="block max-w-[155px] truncate rounded-md border border-border bg-secondary/60 px-2 py-1 text-[11px] font-medium leading-tight text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary sm:max-w-[195px]">{label}</a>
          </li>)}
        </ul>
      </div>
    </nav>
  );
}

export function GuideHeader({ crumbs, eyebrow, title, intro, image, checkedAt = INFO_CHECK_DATE }: { crumbs: UiCrumb[]; eyebrow: string; title: string; intro: ReactNode; image?: { src: string; alt: string }; checkedAt?: string }) {
  return (
    <header className="mx-auto max-w-5xl px-4 pt-6">
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow mt-6">{eyebrow}</p>
      <h1 className="mt-3 max-w-4xl text-4xl leading-[1.1] md:text-5xl">{title}</h1>
      <div className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{intro}</div>
      <PageUpdated date={checkedAt} />
      {image && <img src={image.src} alt={image.alt} width={1600} height={900} className="mt-8 aspect-[21/9] w-full rounded-2xl object-cover" />}
      <AuthorCard />
    </header>
  );
}

export function Section({ id, title, children, className = "" }: { id: string; title: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`mt-14 ${className}`}>
      <h2 id={`${id}-h`} className="text-3xl">{title}</h2>
      <div className="prose-guide">{children}</div>
    </section>
  );
}

export function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="font-serif text-lg">{title}</h3>
      <ul className="mt-2 space-y-1 text-sm">
        {items.map((i) => <li key={i}>✓ {i}</li>)}
      </ul>
    </div>
  );
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section id="faq" aria-labelledby="faq-h" className="mt-14">
      <h2 id="faq-h" className="text-3xl">Frequently asked questions</h2>
      <div className="mt-4 divide-y rounded-2xl border bg-card">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5">
            <summary className="flex cursor-pointer list-none justify-between gap-4 font-semibold">{f.q}<span aria-hidden className="text-primary transition-transform group-open:rotate-45">+</span></summary>
            <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function SourceList({ ids, intro = "“Checked” dates refer to the facts on these pages only. Provider prices, availability and inventory were not verified." }: { ids: string[]; intro?: string }) {
  const sources = publicSources(ids);
  if (!sources.length) return null;
  return (
    <SourcesDisclosure>
      <p className="mt-2 text-sm text-muted-foreground">{intro}</p>
      <ul className="mt-4 space-y-3">
        {sources.map((s) => (
          <li key={s.id} className="rounded-xl border bg-card p-4 text-sm">
            <ExtLink href={s.url} className="font-semibold text-primary">{s.publisher}: {s.title}</ExtLink>
            <p className="mt-1 text-muted-foreground">{s.note}</p>
            <p className="mt-1 text-xs">{s.checkedAt ? `Checked ${formatCheckDate(s.checkedAt)}` : "Linked for reference"}</p>
          </li>
        ))}
      </ul>
    </SourcesDisclosure>
  );
}

function ProviderAction({ link: l, pageId, className, children }: { link: ProviderLink; pageId: string; className: string; children: ReactNode }) {
  const internal = l.url.startsWith("/");
  return <a
    href={l.url}
    target={internal ? undefined : "_blank"}
    rel={internal ? undefined : relFor(l.isAffiliate)}
    onClick={internal ? undefined : () => recordOutboundClick({ pageId, productId: l.id, offerId: l.id })}
    className={className}
  >
    {children} <span aria-hidden>{internal ? "→" : "↗"}</span>
    {!internal && <span className="sr-only"> (opens in a new tab)</span>}
  </a>;
}

export function ProviderCard({ link: l, pageId }: { link: ProviderLink; pageId: string }) {
  return (
    <li className="rounded-2xl border bg-card p-5 md:p-6" data-testid="provider-card">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{relationshipLabel[l.relationship]} · {l.providerName}</p>
      <h3 className="mt-1 text-2xl">{l.title}</h3>
      {l.relationship === "publisher_operator" && <p className="mt-1 text-sm font-medium text-warning">Disclosure: operated by the publisher's local transport business.</p>}
      {l.isAffiliate && <p className="mt-1 text-xs font-semibold">Sponsored link</p>}
      <p className="mt-2 text-muted-foreground">{l.summary}</p>
      <p className="mt-3 text-sm"><span className="font-medium">Confirm on the offer:</span> {l.confirm.join(", ")}.</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <ProviderAction link={l} pageId={pageId} className="btn btn-primary">{l.ctaLabel}</ProviderAction>
        <p className="text-xs text-muted-foreground">{l.url.startsWith("/") ? "Review the service and send a quote request." : modeNote[l.mode]}{l.reentryNote ? ` ${l.reentryNote}` : ""}</p>
      </div>
    </li>
  );
}

export function ProviderSection({ id = "book", title, intro, links, pageId }: { id?: string; title: string; intro?: ReactNode; links: ProviderLink[]; pageId: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mt-14">
      <h2 id={`${id}-h`} className="text-3xl">{title}</h2>
      {intro && <p className="mt-2 max-w-3xl text-muted-foreground">{intro}</p>}
      <ul className="mt-5 space-y-4">{links.map((l) => <ProviderCard key={l.id} link={l} pageId={pageId} />)}</ul>
    </section>
  );
}

/**
 * Illustrate and describe only genuine, editorially selected guide links.
 * Guide cards are capped at six and kept in complete pairs on all devices.
 * Service/action links keep their own compact link-card presentation.
 */
export function RelatedLinks({ title = "Plan the rest of your trip", items, currentPath }: { title?: string; items: { label: string; to: LinkProps["to"]; note?: string }[]; currentPath?: string }) {
  const guideSection = /\bguides?\b/i.test(title);
  const normalized = (path: string) => path.replace(/\/+$/, "");
  const current = currentPath ? guideDirectory.find((guide) => normalized(String(guide.to)) === normalized(currentPath)) : undefined;
  const titleWords = new Set((current?.title.toLowerCase().match(/[a-z]{4,}/g) || []).map((w) => w.replace(/s$/, "")).filter((w) => !["israel", "travel", "guide", "with", "from", "your", "what", "about", "best"].includes(w)));
  const guideItems = guideSection
    ? items.flatMap((item, order) => {
        const guide = guideDirectory.find((candidate) => candidate.to === item.to && Boolean(candidate.photo));
        if (!guide || (current && guide.to === current.to)) return [];
        const strongTopics = guide.topics.filter((topic) => topic !== "tips" && current?.topics.includes(topic)).length;
        const words = new Set((guide.title.toLowerCase().match(/[a-z]{4,}/g) || []).map((w) => w.replace(/s$/, "")));
        const titleOverlap = [...titleWords].filter((word) => words.has(word)).length;
        // Avoid generic "tips" tag alone making off-topic eSIM/hotel pages appear in a taxi cluster.
        if (current && current.topics.some((topic) => topic !== "tips") && strongTopics === 0 && titleOverlap === 0) return [];
        return [{ item, guide, order, score: strongTopics * 3 + titleOverlap * 2 }];
      }).filter(({ guide }, index, all) => all.findIndex((entry) => entry.guide.to === guide.to) === index)
        .sort((a, b) => b.score - a.score || a.order - b.order).slice(0, 6)
    : [];
  // When an editorial list is odd, prefer a genuinely related additional guide.
  // If none qualifies, show the strongest complete pairs rather than inventing relevance.
  const supplemental = current && guideItems.length > 0 && guideItems.length % 2 === 1 && guideItems.length < 6
    ? guideDirectory
        .filter((candidate) => String(candidate.to).startsWith("/travel-blog/") && candidate.photo && candidate.to !== current.to && !guideItems.some((entry) => entry.guide.to === candidate.to))
        .map((candidate) => {
          const shared = candidate.topics.filter((topic) => topic !== "tips" && current.topics.includes(topic));
          const words = new Set((candidate.title.toLowerCase().match(/[a-z]{4,}/g) || []).map((word) => word.replace(/s$/, "")));
          const overlap = [...titleWords].filter((word) => words.has(word)).length;
          const specificTopic = shared.some((topic) => !["destinations", "attractions"].includes(topic));
          return { guide: candidate, score: shared.length * 3 + overlap * 2, relevant: specificTopic || overlap > 0 };
        })
        .filter((candidate) => candidate.relevant && candidate.score >= 3)
        .sort((a, b) => b.score - a.score)[0]
    : undefined;
  const completedGuides = supplemental
    ? [...guideItems, { item: { label: supplemental.guide.title, to: supplemental.guide.to, note: supplemental.guide.description }, guide: supplemental.guide, score: supplemental.score, order: items.length }]
    : guideItems;
  const pairedGuides = completedGuides.slice(0, completedGuides.length - (completedGuides.length % 2));
  if (guideSection && pairedGuides.length === 0) return null;
  if (!guideSection && items.length === 0) return null;

  return <section aria-label={title} className="mt-12">
    <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{title}</h2>
    {guideSection ? (
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {pairedGuides.map(({ item, guide }) => <li key={String(guide.to)} className="min-w-0">
          <Link to={guide.to} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <img src={guide.photo!.src} alt={guide.photo!.alt} loading="lazy" decoding="async" width={600} height={340} className="aspect-[16/9] w-full object-cover" />
            <span className="flex flex-1 flex-col p-4">
              <span className="text-base font-bold leading-snug text-foreground group-hover:text-primary">{item.label}</span>
              <span className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.note || guide.description}</span>
              <span className="mt-3 text-sm font-semibold text-primary">Read more</span>
            </span>
          </Link>
        </li>)}
      </ul>
    ) : (
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => <li key={String(item.to)}>
          <Link to={item.to} className="block h-full rounded-xl border bg-card p-4 hover:border-primary focus-visible:outline-2 focus-visible:outline-primary">
            <span className="font-medium">{item.label}</span>
            {item.note && <span className="mt-1 block text-sm text-muted-foreground">{item.note}</span>}
          </Link>
        </li>)}
      </ul>
    )}
  </section>;
}

export function EndCta({ title, links, pageId }: { title: string; links: ProviderLink[]; pageId: string }) {
  return (
    <section className="mt-14 rounded-2xl bg-navy p-8 text-navy-foreground">
      <h2 className="text-3xl">{title}</h2>
      <p className="mt-2 opacity-85">Confirm the final price and arrangements with the provider before paying.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {links.map((l) => (
          <ProviderAction key={l.id} link={l} pageId={pageId} className="btn btn-light">
            {l.providerName}: {l.ctaLabel.replace(/ on .+$/, "")}
          </ProviderAction>
        ))}
      </div>
    </section>
  );
}

/** Hub card linking to an internal page. */
export function HubCard({ to, eyebrow, title, text, cta }: { to: LinkProps["to"]; eyebrow?: string; title: string; text: string; cta: string }) {
  return (
    <Link to={to} className="group flex h-full flex-col rounded-2xl border bg-card p-6 transition-colors hover:border-primary">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h3 className="mt-2 text-2xl">{title}</h3>
      <p className="mt-2 flex-1 text-muted-foreground">{text}</p>
      <span className="mt-4 font-semibold text-primary">{cta} →</span>
    </Link>
  );
}

export function HubHeader({ crumbs, eyebrow, title, intro }: { crumbs: UiCrumb[]; eyebrow: string; title: string; intro: ReactNode }) {
  return (
    <header className="mx-auto max-w-5xl px-4 pt-6">
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow mt-6">{eyebrow}</p>
      <h1 className="mt-3 max-w-4xl text-4xl leading-[1.1] md:text-5xl">{title}</h1>
      <div className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{intro}</div>
      <AuthorCard />
    </header>
  );
}
