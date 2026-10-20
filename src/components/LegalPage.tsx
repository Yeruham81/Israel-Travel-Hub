import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Breadcrumbs, OnThisPage } from "@/components/Guide";
import { airportTransferContact } from "@/data/registry";
import { pageMeta, SITE_NAME } from "@/lib/site";

export const LEGAL_UPDATED_AT = "2026-10-21";

export type LegalSection = { id: string; title: string; content: ReactNode };

export function legalPageMeta(title: string, path: string, description: string) {
  return pageMeta({ title: `${title} | ${SITE_NAME}`, description, path, crumbs: [{ name: "Home", path: "/" }, { name: title, path }] });
}

export function LegalPage({ title, path, intro, sections, otherDocument }: {
  title: string;
  path: LinkProps["to"];
  intro: ReactNode;
  sections: LegalSection[];
  otherDocument: { title: string; to: LinkProps["to"] };
}) {
  return <main className="mx-auto max-w-4xl px-4 pb-16 pt-6">
    <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: title, to: path }]} />
    <header className="pt-8">
      <p className="eyebrow">Website &amp; services</p>
      <h1 className="mt-3 text-4xl leading-tight md:text-5xl">{title}</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated: <time dateTime={LEGAL_UPDATED_AT}>21 October 2026</time></p>
      <div className="prose-guide mt-5 text-muted-foreground">{intro}</div>
    </header>
    <OnThisPage sections={sections.map(section => [section.id, section.title] as const)} />
    <article>
      {sections.map((section, index) => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-h`} className="mt-10 scroll-mt-24">
        <h2 id={`${section.id}-h`} className="text-2xl font-semibold">{index + 1}. {section.title}</h2>
        <div className="prose-guide mt-3">{section.content}</div>
      </section>)}
    </article>
    <aside className="mt-12 rounded-2xl border bg-secondary/50 p-6" aria-label="Legal documents and contact">
      <h2 className="text-xl font-semibold">Questions about this document?</h2>
      <p className="mt-3 leading-relaxed">Contact Moshe Barak at <a href={`mailto:${airportTransferContact.email}`} className="font-semibold text-primary underline">{airportTransferContact.email}</a>.</p>
      <p className="mt-3"><Link to={otherDocument.to} className="font-semibold text-primary underline">{otherDocument.title}</Link> · <Link to="/about-moshe-barak/" className="text-primary underline">About Moshe Barak</Link></p>
    </aside>
  </main>;
}
