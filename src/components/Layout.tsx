import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Compass } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { OWNER_BASE } from "@/data/registry";
import { allNavGroups, serviceNav, hotelNav } from "@/data/nav";
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

/** Global navigation shared by the desktop rail and the mobile drawer. */
export function GlobalNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Explore Israel" className="text-sm">
      {allNavGroups.map((g) => (
        <div key={g.title} className="mb-6">
          <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{g.title}</p>
          <ul className="space-y-0.5">
            {g.items.map((i) => (
              <li key={i.label}>
                <Link
                  to={i.to}
                  onClick={onNavigate}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "bg-navy text-navy-foreground", "aria-current": "page" }}
                  inactiveProps={{ className: "hover:bg-muted" }}
                  className="block rounded-lg px-3 py-1.5 font-medium"
                >
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

const headerNav = serviceNav.slice(1, 7);

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-3">
        <Wordmark />
        <nav aria-label="Services" className="hidden xl:block">
          <ul className="flex items-center gap-5 text-sm font-medium">
            {headerNav.map((n) => (
              <li key={n.label}><Link to={n.to} className="hover:text-primary" activeProps={{ className: "text-primary" }}>{n.label}</Link></li>
            ))}
            <li><Link to="/about/" className="text-muted-foreground hover:text-primary">About</Link></li>
          </ul>
        </nav>
        <button type="button" onClick={() => setOpen(true)} className="btn btn-primary py-2 text-sm lg:hidden" aria-haspopup="dialog" aria-expanded={open}>
          <Compass className="h-4 w-4" aria-hidden /> Explore Israel
        </button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto">
            <SheetHeader className="mb-4 text-left">
              <SheetTitle className="font-serif text-2xl">Explore Israel</SheetTitle>
              <SheetDescription>Services, popular hotel cities and trip shortcuts.</SheetDescription>
            </SheetHeader>
            <GlobalNav onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function SiteSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r lg:block">
      <div className="sticky top-[57px] max-h-[calc(100vh-57px)] overflow-y-auto px-4 py-6">
        <GlobalNav />
      </div>
    </aside>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <p className="font-serif text-2xl">Israel Taxi &amp; Travel</p>
          <p className="mt-3 text-sm opacity-80">Independent local guidance for international visitors planning travel in Israel.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Services</p>
          <ul className="mt-3 space-y-2 opacity-90">
            {serviceNav.slice(1).map((n) => <li key={n.label}><Link to={n.to}>{n.label}</Link></li>)}
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Popular</p>
          <ul className="mt-3 space-y-2 opacity-90">
            {hotelNav.map((n) => <li key={n.label}><Link to={n.to}>{n.label}</Link></li>)}
            <li><Link to="/travel-blog/ben-gurion-airport-to-jerusalem/">Airport to Jerusalem</Link></li>
            <li><ExtLink href={`${OWNER_BASE}/travel-blog/getting-around-israel/`}>Getting around Israel (existing guide)</ExtLink></li>
            <li><Link to="/about/">About &amp; methodology</Link></li>
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
