import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useId, useState, type ReactNode } from "react";
import { ChevronDown, Compass } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { allNavGroups, serviceNav, serviceDomains, hotelNav, utilityNav, footerNav, type SidebarNavItem } from "@/data/nav";
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

function SidebarLink({ item, onNavigate }: { item: SidebarNavItem; onNavigate: (() => void) | undefined }) {
  const className = "block rounded-lg px-3 py-1.5 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  if ("href" in item) {
    return (
      <a href={item.href} target="_blank" rel={relFor(false)} onClick={onNavigate} className={`${className} hover:bg-muted`}>
        {item.label}
        <span className="sr-only"> (on israel-taxi.com, opens in a new tab)</span>
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
  const isChildPage = children?.some((child) => child.to === pathname) ?? false;
  const [expanded, setExpanded] = useState(isChildPage);
  const id = useId();
  useEffect(() => { if (isChildPage) setExpanded(true); }, [isChildPage]);
  if (!children) return <SidebarLink item={item} onNavigate={onNavigate} />;
  return <>
    <div className="flex items-center gap-1">
      <div className="min-w-0 flex-1"><SidebarLink item={item} onNavigate={onNavigate} /></div>
      <button type="button" aria-label={branch?.toggleLabel ?? `Show ${item.label} pages`} aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(!expanded)} className="rounded-lg p-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary">
        <ChevronDown aria-hidden className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
    </div>
    <ul id={id} hidden={!expanded} aria-label={branch?.childrenLabel ?? `${item.label} pages`} className="ml-3 mt-1 space-y-0.5 border-l pl-2">
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
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-3">
        <Wordmark />
        <nav aria-label="Services" className="hidden 2xl:block">
          <ul className="flex items-center gap-4 text-sm font-medium">
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
              <SheetDescription>Transportation, tours, accommodation, attractions and travel tips, with popular links for your trip.</SheetDescription>
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
