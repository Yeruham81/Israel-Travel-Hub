import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { OWNER_BASE } from "@/data/registry";
import { relFor } from "@/lib/outbound";

export function ExtLink({ href, children, className, guide }: { href: string; children: ReactNode; className?: string; guide?: boolean }) {
  return (
    <a href={href} target="_blank" rel={relFor(false)} className={className}>
      {children}
      {guide && <span className="ml-1 text-xs font-normal opacity-80">(existing guide ↗)</span>}
      {!guide && <span aria-hidden> ↗</span>}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Israel Taxi & Travel home">
      <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-navy font-serif text-base italic text-navy-foreground">i</span>
      <span className="font-serif text-xl leading-none">
        Israel Taxi <span className="italic text-primary">&amp;</span> Travel
      </span>
    </Link>
  );
}

const nav = [
  { label: "Transfers", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" as const },
  { label: "Tours", href: `${OWNER_BASE}/private-day-trips/` },
  { label: "Hotels", href: "/#hotels" },
  { label: "Car Rental", href: "/#car-rental" },
  { label: "Destinations", href: "/#destinations" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Wordmark />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {nav.map((n) => (
              <li key={n.label}>
                {"to" in n ? (
                  <Link to={n.to} className="hover:text-primary">{n.label}</Link>
                ) : n.href.startsWith("http") ? (
                  <a href={n.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{n.label} <span aria-hidden>↗</span></a>
                ) : (
                  <a href={n.href} className="hover:text-primary">{n.label}</a>
                )}
              </li>
            ))}
            <li><Link to="/about/" className="text-muted-foreground hover:text-primary">About</Link></li>
          </ul>
        </nav>
        <details className="relative md:hidden">
          <summary className="chip cursor-pointer list-none">Menu</summary>
          <ul className="absolute right-0 mt-2 w-56 rounded-xl border bg-card p-2 text-sm shadow-lg">
            {nav.map((n) => (
              <li key={n.label}>
                {"to" in n ? (
                  <Link to={n.to} className="block rounded px-3 py-2 hover:bg-muted">{n.label}</Link>
                ) : (
                  <a href={n.href} {...(n.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="block rounded px-3 py-2 hover:bg-muted">{n.label}</a>
                )}
              </li>
            ))}
            <li><Link to="/about/" className="block rounded px-3 py-2 hover:bg-muted">About & methodology</Link></li>
          </ul>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl">Israel Taxi &amp; Travel</p>
          <p className="mt-3 text-sm opacity-80">Independent local guidance for international visitors planning travel in Israel.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Guides</p>
          <ul className="mt-3 space-y-2 opacity-90">
            <li><Link to="/travel-blog/ben-gurion-airport-to-jerusalem/">Airport to Jerusalem</Link></li>
            <li><ExtLink href={`${OWNER_BASE}/travel-blog/getting-around-israel/`}>Getting around Israel</ExtLink></li>
            <li><ExtLink href={`${OWNER_BASE}/travel-blog/jerusalem-travel-guide/`}>Jerusalem travel guide</ExtLink></li>
            <li><Link to="/about/">About &amp; comparison methodology</Link></li>
          </ul>
        </div>
        <div className="text-sm opacity-90">
          <p className="font-semibold">Disclosure</p>
          <p className="mt-3">Some links on this site may earn us a commission at no extra cost to you. Only links from configured affiliate partners are labeled “Sponsored link”. Our editorial selection is explained on the <Link to="/about/" className="underline">methodology page</Link>.</p>
        </div>
      </div>
    </footer>
  );
}
