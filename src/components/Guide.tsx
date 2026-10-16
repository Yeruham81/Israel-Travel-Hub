import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ExtLink } from "@/components/Layout";
import { getSource, formatCheckDate, INFO_CHECK_DATE, type ProviderLink } from "@/data/registry";
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

/** Local in-page contents: horizontal chip bar, visually distinct from the global rail. */
export function OnThisPage({ sections, sticky = true }: { sections: readonly (readonly [string, string])[]; sticky?: boolean }) {
  return (
    <nav aria-label="On this page" className={`${sticky ? "sticky top-[57px] z-30" : ""} mt-6 border-y bg-background/95 backdrop-blur`}>
      <div className="flex items-center gap-3 overflow-x-auto px-4 py-2 text-sm whitespace-nowrap">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">On this page</span>
        <ul className="flex gap-2">
          {sections.map(([id, label]) => <li key={id}><a href={`#${id}`} className="chip inline-block">{label}</a></li>)}
        </ul>
      </div>
    </nav>
  );
}

export function GuideHeader({ crumbs, eyebrow, title, intro, image }: { crumbs: UiCrumb[]; eyebrow: string; title: string; intro: ReactNode; image?: { src: string; alt: string } }) {
  return (
    <header className="mx-auto max-w-5xl px-4 pt-6">
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow mt-6">{eyebrow}</p>
      <h1 className="mt-3 max-w-4xl text-4xl leading-[1.1] md:text-5xl">{title}</h1>
      <div className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{intro}</div>
      <p className="mt-3 text-sm text-muted-foreground">Source facts checked {formatCheckDate(INFO_CHECK_DATE)} (page facts only, not live availability) · <Link to="/about/" className="underline">How we compare</Link></p>
      {image && <img src={image.src} alt={image.alt} width={1600} height={900} className="mt-8 aspect-[21/9] w-full rounded-2xl object-cover" />}
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

export function SourceList({ ids }: { ids: string[] }) {
  return (
    <section id="sources" aria-labelledby="sources-h" className="mt-14">
      <h2 id="sources-h" className="text-3xl">Sources</h2>
      <p className="mt-2 text-sm text-muted-foreground">“Checked” dates refer to the facts on these pages only. Provider prices, availability and inventory were not verified.</p>
      <ul className="mt-4 space-y-3">
        {ids.map(getSource).map((s) => (
          <li key={s.id} className="rounded-xl border bg-card p-4 text-sm">
            <ExtLink href={s.url} className="font-semibold text-primary">{s.publisher}: {s.title}</ExtLink>
            <p className="mt-1 text-muted-foreground">{s.note}</p>
            <p className="mt-1 text-xs">{s.checkedAt ? `Checked ${formatCheckDate(s.checkedAt)}` : "Linked for reference"}</p>
          </li>
        ))}
      </ul>
    </section>
  );
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
        <a
          href={l.url}
          target="_blank"
          rel={relFor(l.isAffiliate)}
          onClick={() => recordOutboundClick({ pageId, productId: l.id, offerId: l.id })}
          className="btn btn-primary"
        >
          {l.ctaLabel} <span aria-hidden>↗</span><span className="sr-only"> (opens in a new tab)</span>
        </a>
        <p className="text-xs text-muted-foreground">{modeNote[l.mode]}{l.reentryNote ? ` ${l.reentryNote}` : ""}</p>
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

export function RelatedLinks({ title = "Plan the rest of your trip", items }: { title?: string; items: { label: string; to: LinkProps["to"]; note?: string }[] }) {
  return (
    <section aria-label={title} className="mt-14">
      <h2 className="text-3xl">{title}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i.label}>
            <Link to={i.to} className="block h-full rounded-xl border bg-card p-4 hover:border-primary">
              <span className="font-medium">{i.label} →</span>
              {i.note && <span className="mt-1 block text-sm text-muted-foreground">{i.note}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function EndCta({ title, links, pageId }: { title: string; links: ProviderLink[]; pageId: string }) {
  return (
    <section className="mt-14 rounded-2xl bg-navy p-8 text-navy-foreground">
      <h2 className="text-3xl">{title}</h2>
      <p className="mt-2 opacity-85">Confirm the price and details on the provider's own site before paying.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {links.map((l) => (
          <a key={l.id} href={l.url} target="_blank" rel={relFor(l.isAffiliate)} onClick={() => recordOutboundClick({ pageId, productId: l.id, offerId: l.id })} className="btn btn-light">
            {l.providerName}: {l.ctaLabel.replace(/ on .+$/, "")} <span aria-hidden>↗</span><span className="sr-only"> (opens in a new tab)</span>
          </a>
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
    </header>
  );
}
