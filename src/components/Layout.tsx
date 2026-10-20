import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useId, useState, type ReactNode } from "react";
import { ChevronDown, Compass } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { allNavGroups, serviceNav, serviceDomains, hotelNav, utilityNav, footerNav, type SidebarNavItem } from "@/data/nav";
import { relFor } from "@/lib/outbound";

export function ExtLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel={relFor(false)} className={className}>
      {children}
      <span aria-hidden> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Wordmark() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2" aria-label="Israel Taxi & Travel home">
      <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy font-serif text-sm italic text-navy-foreground sm:h-8 sm:w-8 sm:text-base">i</span>
      <span className="flex flex-col gap-1">
        <span className="whitespace-nowrap font-serif font-semibold text-[0.9rem] leading-none min-[375px]:text-base sm:text-xl">
          Israel Taxi <span className="italic text-primary">&amp;</span> Travel
        </span>
        <span data-testid="wordmark-byline" className="flex w-full items-center justify-center gap-1.5 whitespace-nowrap font-sans text-[0.72rem] font-bold leading-none tracking-[0.025em] text-primary sm:text-[0.85rem]">
          <span data-testid="custom-taxi-icon" aria-hidden="true" className="inline-block h-3.5 w-[18px] shrink-0 bg-primary sm:h-4 sm:w-5" style={{ mask: "url(/images/taxi-byline.png) center / contain no-repeat", WebkitMask: "url(/images/taxi-byline.png) center / contain no-repeat" }} />
          <span>Moshe Barak</span>
        </span>
      </span>
    </Link>
  );
}

function SidebarLink({ item, onNavigate }: { item: SidebarNavItem; onNavigate: (() => void) | undefined }) {
  const className = "block rounded-lg px-3 py-1.5 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  if ("href" in item) {
    return (
      <a href={item.href} target="_blank" rel={relFor(false)} onClick={onNavigate} className={`${className} hover:bg-muted`}>
        {item.label}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      activeOptions={{ exact: true }}
      activeProps={{ className: "bg-navy text-navy-foreground", "aria-current": "page" }}
      inactiveProps={{ className: "hover:bg-muted" }}
      className={className}
    >
      {item.label}
    </Link>
  );
}

function SidebarBranch({ item, onNavigate }: { item: SidebarNavItem; onNavigate: (() => void) | undefined }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const branch = "children" in item ? item : undefined;
  const children = branch?.children;
  const alwaysExpanded = branch?.alwaysExpanded ?? false;
  const isChildPage = children?.some((child) => child.to === pathname) ?? false;
  const [expanded, setExpanded] = useState(isChildPage);
  const id = useId();
  useEffect(() => { if (isChildPage) setExpanded(true); }, [isChildPage]);
  if (!children) return <SidebarLink item={item} onNavigate={onNavigate} />;
  return <>
    <div className="flex items-center gap-1">
      <div className="min-w-0 flex-1"><SidebarLink item={item} onNavigate={onNavigate} /></div>
      {!alwaysExpanded && <button type="button" aria-label={branch?.toggleLabel ?? `Show ${item.label} pages`} aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(!expanded)} className="rounded-lg p-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary">
        <ChevronDown aria-hidden className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>}
    </div>
    <ul id={id} hidden={!alwaysExpanded && !expanded} aria-label={branch?.childrenLabel ?? `${item.label} pages`} className="ml-3 mt-1 space-y-0.5 border-l pl-2">
      {children.map((child) => <li key={child.to}><SidebarLink item={child} onNavigate={onNavigate} /></li>)}
    </ul>
  </>;
}

/** Global navigation shared by the desktop rail and the mobile drawer. */
export function GlobalNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Explore Israel" className="text-sm">
      <ul className="mb-5 border-b pb-4">
        {utilityNav.map((item) => <li key={item.label}><SidebarLink item={item} onNavigate={onNavigate} /></li>)}
      </ul>
      {allNavGroups.map((g) => (
        <section key={g.title} aria-label={g.title} className="mb-6 border-b pb-5">
          <h2 className="mb-2 border-l-2 border-primary/50 pl-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-navy">{g.title}</h2>
          <ul className="space-y-0.5">
            {g.items.map((i) => (
              <li key={i.label}>
                <SidebarBranch item={i} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        </section>
      ))}
      <ul>
        {footerNav.map((item) => <li key={item.label}><SidebarLink item={item} onNavigate={onNavigate} /></li>)}
      </ul>
    </nav>
  );
}

const headerNav = serviceDomains;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-4 sm:py-3">
        <Wordmark />
        <nav aria-label="Services" className="hidden min-w-0 flex-1 lg:block">
          <ul className="flex items-center justify-end gap-1 text-[15px] font-medium xl:gap-3">
            {headerNav.map((n) => (
              <li key={n.label}><Link to={n.to} className="flex min-h-11 items-center justify-center rounded-lg px-2 py-1 text-center leading-5 transition-colors hover:bg-muted hover:text-primary" activeProps={{ className: "bg-primary/10 text-primary" }}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <button type="button" onClick={() => setOpen(true)} className="btn btn-primary shrink-0 whitespace-nowrap gap-1 px-3 py-2 text-sm lg:hidden" aria-haspopup="dialog" aria-expanded={open}>
          <Compass className="h-4 w-4" aria-hidden /> Menu
        </button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto">
            <SheetHeader className="mb-4 text-left">
              <SheetTitle className="font-serif text-2xl">Explore Israel</SheetTitle>
              <SheetDescription>Transportation, tours, accommodation, attractions, religious sites and travel tips for your trip.</SheetDescription>
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
            <li><Link to="/guides/">Travel guides & tips</Link></li>
            <li><Link to="/travel-blog/getting-around-israel/">Getting around Israel</Link></li>
            <li><Link to="/about-moshe-barak/">About Moshe Barak</Link></li>
          </ul>
        </div>
        <div className="text-sm opacity-90">
          <p className="font-semibold">Disclosure</p>
          <p className="mt-3">Some links on this site may earn us a commission at no extra cost to you. Only links from configured affiliate partners are labeled “Sponsored link”. I explain how I choose travel options on the <Link to="/about-moshe-barak/" hash="methodology" className="underline">About Moshe Barak page</Link>.</p>
        </div>
      </div>
    </footer>
  );
}
