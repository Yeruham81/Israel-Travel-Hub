import { ConsentIframe } from "@/components/ConsentIframe";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CalendarCheck2,
  CalendarDays,
  Clock3,
  ExternalLink,
  Lightbulb,
  MapPin,
  Ticket,
} from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { HomeContactForm } from "@/components/HomeContactForm";
import { neighborhoodTripContactCopy } from "@/lib/guide-contact";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { getShorePort } from "@/data/shoreExcursions";
import {
  haifaMuseumAreas as museumAreas,
  haifaMuseums as museums,
  haifaAdditionalMuseums as additionalMuseums,
  haifaMuseumMapPoints as museumMapPoints,
  type HaifaMuseumEntry as MuseumEntry,
} from "@/data/haifaMuseums";
import { haifaMuseumPhotos, haifaMuseumPhotoCredits } from "@/data/haifaMuseumPhotos";
import { migrationPhotos } from "@/data/guideMigrationPhotos";

const updatedAt = "2026-11-21";
const related = [
  {
    title: "Explore Haifa's attractions",
    to: "/attractions/haifa/" as const,
    note: "Gardens, viewpoints, neighborhoods and the coast",
  },
  {
    title: "Haifa travel guide",
    to: "/attractions/haifa/" as const,
    note: "Plan your time in the city, from the Carmel to the port",
  },
  {
    title: "Where to stay in Haifa",
    to: "/travel-blog/best-hotels-in-haifa/" as const,
    note: "Compare practical hotel areas and neighborhoods",
  },
  {
    title: "Haifa shore excursions",
    to: "/shore-excursions/haifa/" as const,
    note: "Plan a city visit around your cruise schedule",
  },
  {
    title: "Old Acre attractions",
    to: "/attractions/akko-acre/" as const,
    note: "Explore the historic coastal city just north of Haifa",
  },
  {
    title: "Getting to Haifa from the airport",
    to: "/travel-blog/ben-gurion-airport-to-haifa/" as const,
    note: "Train, taxi and private transfer options",
  },
];

function OfficialLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
function MapLink({ museum }: { museum: MuseumEntry }) {
  const url =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(museum.name + ", " + museum.address + ", Israel");
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
    >
      <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Directions{" "}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
function SectionHeading({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <div className="mb-5">
      <h2 id={id + "-heading"} className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {intro && <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  );
}
function PlanningTip({ children }: { children: ReactNode }) {
  return (
    <aside className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed text-amber-950">
      <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
      <div>{children}</div>
    </aside>
  );
}
function MuseumCard({ museum }: { museum: MuseumEntry }) {
  const museumPhoto = haifaMuseumPhotos[museum.id];
  const family = ["madatech", "railway", "maritime", "naval", "hecht"].includes(museum.id);
  const advanceBooking = ["madatech", "naval"].includes(museum.id);
  const tags = [
    museum.theme,
    museum.priceNis === 0 ? "Free entry" : null,
    family ? "Family-friendly" : null,
    advanceBooking ? "Book ahead" : null,
  ].filter((x): x is string => Boolean(x));
  const showTicket =
    Boolean(museum.ticketUrl && museum.ticketUrl !== museum.url) && !museum.closureNote;
  const ticketLabel =
    museum.id === "madatech"
      ? "Check dates & tickets"
      : museum.id === "railway"
        ? "Opening & tickets"
        : "Check tickets & rates";
  return (
    <article
      id={"museum-" + museum.id}
      data-museum-card="horizontal"
      className="scroll-mt-28 overflow-hidden rounded-2xl border bg-card shadow-sm"
    >
      <div
        className={
          museumPhoto
            ? "lg:grid lg:grid-cols-[minmax(0,1fr)_270px] lg:items-start lg:gap-6 lg:p-5"
            : "lg:p-5"
        }
      >
        {museumPhoto && (
          <figure className="min-w-0 bg-secondary/20 lg:col-start-2 lg:row-start-1 lg:overflow-hidden lg:rounded-xl">
            <div className="overflow-hidden bg-secondary/40">
              <img
                src={museumPhoto.src}
                srcSet={`${museumPhoto.src.replace(/\.webp$/, "")}-360.webp 360w, ${museumPhoto.src.replace(/\.webp$/, "")}-560.webp 560w, ${museumPhoto.src} ${museumPhoto.width}w`}
                sizes="(min-width: 1024px) 270px, calc(100vw - 32px)"
                alt={museumPhoto.alt}
                width={museumPhoto.width}
                height={museumPhoto.height}
                loading="lazy"
                decoding="async"
                className={`h-48 w-full sm:h-56 lg:aspect-[4/3] lg:h-auto ${museumPhoto.fit === "contain" ? "object-contain" : "object-cover"}`}
              />
            </div>
          </figure>
        )}
        <div className="min-w-0 p-4 sm:p-5 lg:col-start-1 lg:row-start-1 lg:p-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {museum.neighbourhood}
          </p>
          <h3 className="mt-1 text-xl font-bold leading-snug sm:text-2xl">{museum.name}</h3>
          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/15 bg-secondary/50 px-2.5 py-1 text-[11px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {museum.closureNote && (
            <p className="mt-3 w-fit rounded-md border border-amber-300/60 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-900">
              {museum.closureNote}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed">{museum.intro}</p>
        </div>
      </div>
      <div className="border-t px-4 py-4 sm:px-5 lg:px-6">
        <dl className="grid gap-3 rounded-xl bg-secondary/40 p-3.5 text-sm sm:grid-cols-2">
          <div className="relative min-w-0 pl-6">
            <dt className="font-semibold">
              Allow
              <Clock3 className="absolute left-0 top-0.5 h-4 w-4 text-primary" aria-hidden="true" />
            </dt>
            <dd className="mt-0.5 leading-relaxed text-muted-foreground">{museum.duration}</dd>
          </div>
          <div className="relative min-w-0 pl-6">
            <dt className="font-semibold">
              Admission
              <Ticket className="absolute left-0 top-0.5 h-4 w-4 text-primary" aria-hidden="true" />
            </dt>
            <dd className="mt-0.5 leading-relaxed text-muted-foreground">{museum.admission}</dd>
          </div>
          <div className="relative min-w-0 pl-6">
            <dt className="font-semibold">
              Usual opening
              <CalendarDays
                className="absolute left-0 top-0.5 h-4 w-4 text-primary"
                aria-hidden="true"
              />
            </dt>
            <dd className="mt-0.5 leading-relaxed text-muted-foreground">{museum.openingDays}</dd>
          </div>
          <div className="relative min-w-0 pl-6">
            <dt className="font-semibold">
              Booking
              <CalendarCheck2
                className="absolute left-0 top-0.5 h-4 w-4 text-primary"
                aria-hidden="true"
              />
            </dt>
            <dd className="mt-0.5 leading-relaxed text-muted-foreground">{museum.booking}</dd>
          </div>
        </dl>
      </div>
      <div className="grid gap-4 border-t px-4 py-4 sm:px-5 lg:grid-cols-2 lg:gap-6 lg:px-6">
        <div>
          <h4 className="text-sm font-semibold">Highlights</h4>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-relaxed text-muted-foreground">
            {museum.highlights.slice(0, 2).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {museum.highlightsForFamilies && (
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {museum.highlightsForFamilies}
            </p>
          )}
        </div>
        <p className="text-sm leading-relaxed">
          <strong className="text-primary">My tip:</strong> {museum.tip}
        </p>
      </div>
      <div className="flex flex-col gap-3 border-t bg-secondary/10 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-5 lg:px-6">
        <div className="flex min-w-0 flex-col gap-1 text-xs text-muted-foreground">
          <span>{museum.address}</span>
          <div>
            <MapLink museum={museum} />
          </div>
        </div>
        <div
          className={`grid w-full gap-2 text-sm lg:w-auto lg:min-w-[360px] ${showTicket ? "sm:grid-cols-2" : "sm:grid-cols-1"}`}
        >
          {showTicket && (
            <a
              href={museum.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-center font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {ticketLabel}
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          <a
            href={museum.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-sky-200 bg-sky-100 px-3 py-2.5 text-center font-semibold text-sky-950 hover:bg-sky-200"
          >
            Official museum website
            <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}

const museumMapUrl =
  "/maps/haifa-museums.html?points=" + encodeURIComponent(JSON.stringify(museumMapPoints));
function MuseumMap() {
  const [selectedId, setSelectedId] = useState("all");
  const frame = useRef<HTMLIFrameElement>(null);
  const selected = museums.find((m) => m.id === selectedId);
  const focus = (id: string) => {
    setSelectedId(id);
    frame.current?.contentWindow?.postMessage(
      { type: "haifa-museum-map-focus", id },
      window.location.origin,
    );
  };
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow)
        return;
      if (
        event.data?.type === "haifa-museum-map-selected" &&
        museumMapPoints.some((m) => m.id === event.data.id)
      ) {
        setSelectedId(event.data.id);
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);
  return (
    <section
      aria-label="Map of ten selected Haifa museums"
      className="mt-7 overflow-hidden rounded-xl border bg-card"
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold">Museums on the map</h3>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <label htmlFor="haifa-museum-map-select" className="min-w-0 flex-1 text-sm font-semibold">
            Focus on a museum
            <select
              id="haifa-museum-map-select"
              value={selectedId}
              onChange={(e) => focus(e.target.value)}
              className="mt-2 min-h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm font-normal focus-visible:outline-2 focus-visible:outline-primary"
            >
              <option value="all">All ten museums - Haifa overview</option>
              {museumAreas.map((area) => (
                <optgroup key={area.id} label={area.name}>
                  {museums
                    .filter((m) => m.area === area.id)
                    .map((m) => (
                      <option key={m.id} value={m.id}>
                        {museums.findIndex((x) => x.id === m.id) + 1}. {m.name}
                        {m.closureNote ? " (closed)" : ""}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
          <button
            type="button"
            disabled={selectedId === "all"}
            onClick={() => focus("all")}
            className="min-h-11 rounded-lg border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary disabled:cursor-default disabled:opacity-50"
          >
            Show all museums
          </button>
        </div>
        {selected && (
          <p className="mt-2 text-xs text-muted-foreground">
            {selected.address}, Israel{selected.closureNote ? " · " + selected.closureNote : ""}
          </p>
        )}
      </div>
      <ConsentIframe
        ref={frame}
        title="Ten selected Haifa museums, with Mané-Katz marked closed for renovation"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        src={museumMapUrl}
        onLoad={() => {
          if (selectedId !== "all")
            frame.current?.contentWindow?.postMessage(
              { type: "haifa-museum-map-focus", id: selectedId },
              window.location.origin,
            );
        }}
        width={900}
        height={440}
        className="h-[360px] w-full border-0 sm:h-[440px]"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 text-xs text-muted-foreground">
        <span>
          Map data © OpenStreetMap contributors · Blue: museums · Brown: closed for renovation.
        </span>
        {selected && (
          <OfficialLink
            href={
              "https://www.google.com/maps/dir/?api=1&destination=" +
              encodeURIComponent(selected.name + ", " + selected.address + ", Israel")
            }
          >
            Get directions on Google Maps
          </OfficialLink>
        )}
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Which Haifa museums would you prioritise on a first visit?",
    a: "For families, MadaTech is often my first choice. For art, start with Haifa Museum of Art or Tikotin. For archaeology and history, consider Hecht Museum or the National Maritime Museum.",
  },
  {
    q: "Are the two maritime museums in Haifa the same place?",
    a: "No. The National Maritime Museum focuses on maritime archaeology and the history of seafaring. The separate Clandestine Immigration and Naval Museum explores immigration under the British Mandate and Israel's navy. Both are on Allenby Road, but tickets and visiting arrangements differ.",
  },
  {
    q: "Is there a ticket covering all of Haifa's museums?",
    a: "A seven-day combined ticket covers the participating Haifa Museums venues. MadaTech, Hecht, the Railway Museum and the Ministry of Defense naval museum have separate operators and admission arrangements. Check eligibility and price on the official Haifa Museums website.",
  },
  {
    q: "Which museums in Haifa are best for children?",
    a: "MadaTech is the clearest choice for hands-on science. The Railway Museum and vessels at the naval museum also appeal to children, but age limits, accessibility and admission rules differ. Check facilities and schedules before going.",
  },
  {
    q: "Can I visit the museums without a car?",
    a: "Yes, though the city's elevation matters. Pair nearby downtown or Allenby Road museums on foot where practical; reach Hadar, the Carmel Centre and University of Haifa by bus, taxi or another local connection. Allow time for hill climbs.",
  },
  {
    q: "Are Haifa museums open on Saturdays and holidays?",
    a: "Several Haifa Museums venues operate on Saturdays, but the Railway Museum and naval museum normally do not. Hermann Struck is also closed Saturday. Jewish holidays, special events and exhibition changes can alter normal hours.",
  },
  {
    q: "Can I currently visit the Mané-Katz Museum?",
    a: "Mané-Katz Museum is closed for renovation. Check the Haifa Museums website for reopening announcements.",
  },
];
export function HaifaMuseumsGuide() {
  const featured = museums.filter((m) =>
    ["art", "madatech", "tikotin", "maritime", "hecht", "railway"].includes(m.id),
  );
  const jump = [
    ["top-picks", "My top picks"],
    ["compare", "Compare museums"],
    ["by-area", "Museums by area"],
    ["choose", "Which museum?"],
    ["museum-routes", "Suggested visits"],
    ["practical", "Visitor tips"],
    ["faq", "FAQ"],
    ["explore-more", "Explore more"],
    ["contact", "Contact me"],
  ] as const;
  return (
    <main className="mx-auto max-w-5xl px-4 pb-10">
      <article>
        <header className="pt-6">
          <Breadcrumbs
            items={[
              { name: "Home", to: "/" },
              { name: "Travel guides", to: "/travel-blog/" },
              { name: "Museums in Haifa", to: "/travel-blog/museums-in-haifa/" },
            ]}
          />
          <GuideHeroLayout
            image={
              <GuideHeroMedia
                src={migrationPhotos["museums-in-haifa"].src}
                alt={migrationPhotos["museums-in-haifa"].alt}
              />
            }
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Haifa & Coast · Art, science and history
            </p>
            <h1 className="guide-page-title mt-2">Best Museums in Haifa</h1>
            <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed">
              From interactive science and ancient ships to contemporary art and Japanese prints,
              Haifa has museums for very different interests. In my guide, I'll help you choose the
              best options and plan visits around the city's hills and neighborhoods.
            </p>
            <PageUpdated date={updatedAt} />
          </GuideHeroLayout>
          <AuthorCard />
        </header>
        <section
          className="mt-8 rounded-xl border border-primary/20 bg-secondary/40 p-5 sm:p-6"
          aria-label="My quick recommendation"
        >
          <h2 className="text-xl font-bold">Where I'd start</h2>
          <p className="mt-2 leading-relaxed">
            For an engaging family visit, choose{" "}
            <a href="#museum-madatech" className="font-semibold text-primary hover:underline">
              MadaTech
            </a>
            . For culture, pick{" "}
            <a href="#museum-art" className="font-semibold text-primary hover:underline">
              Haifa Museum of Art
            </a>{" "}
            or{" "}
            <a href="#museum-tikotin" className="font-semibold text-primary hover:underline">
              Tikotin
            </a>
            . The{" "}
            <a href="#museum-maritime" className="font-semibold text-primary hover:underline">
              National Maritime Museum
            </a>{" "}
            is my choice for ancient seafaring, while the{" "}
            <a href="#museum-hecht" className="font-semibold text-primary hover:underline">
              Hecht Museum
            </a>{" "}
            offers an excellent, usually free archaeology visit. Choose one main museum and build a
            realistic route around it.
          </p>
        </section>
        <OnThisPage sections={jump} />
        <section id="top-picks" aria-labelledby="top-picks-heading" className="mt-10 scroll-mt-24">
          <SectionHeading
            id="top-picks"
            title="My top museum picks"
            intro="Six museums for a range of interests. Pick the subject that interests you most."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((m) => (
              <a
                href={"#museum-" + m.id}
                key={m.id}
                className="editorial-card-link group flex flex-col rounded-xl border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-secondary/30 focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span className="text-[11px] font-bold uppercase tracking-wide text-primary">
                  {m.theme}
                </span>
                <strong className="mt-2 text-base leading-snug">{m.name}</strong>
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {m.bestFor}
                </span>
                <span className="mt-2 text-xs text-muted-foreground">
                  {m.priceNis === 0
                    ? "Free general entry"
                    : typeof m.priceNis === "number"
                      ? "Adult ₪" + m.priceNis
                      : "Confirm admission"}
                </span>
              </a>
            ))}
          </div>
        </section>
        <section id="compare" aria-labelledby="compare-heading" className="mt-11 scroll-mt-24">
          <SectionHeading
            id="compare"
            title="Compare Haifa museums at a glance"
            intro="Adult prices are shown only where supported by current operator information. Durations are my estimates, and opening days may change around holidays or exhibitions."
          />
          <div
            role="region"
            aria-label="Haifa museums admission and visitor comparison"
            tabIndex={0}
            className="overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary"
          >
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Ten Haifa museums compared by location, subject, price, opening days and booking
              </caption>
              <thead className="bg-secondary/60">
                <tr>
                  {[
                    "Museum",
                    "Best for",
                    "Area",
                    "Adult admission",
                    "Opening days",
                    "Allow",
                    "Booking",
                  ].map((h, index) => (
                    <th
                      scope="col"
                      key={h}
                      className={
                        index === 0
                          ? "sticky left-0 z-10 border-b bg-secondary px-3 py-3 font-semibold"
                          : "border-b px-3 py-3 font-semibold"
                      }
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {museums.map((m) => (
                  <tr key={m.id} className="border-b last:border-0">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 w-[140px] min-w-[136px] bg-card px-3 py-3 font-semibold"
                    >
                      <a href={"#museum-" + m.id} className="text-primary hover:underline">
                        {m.name}
                      </a>
                      {m.closureNote && (
                        <span className="mt-1 block text-xs font-normal text-amber-800">
                          {m.closureNote}
                        </span>
                      )}
                    </th>
                    <td className="px-3 py-3">{m.bestFor}</td>
                    <td className="px-3 py-3">{m.neighbourhood}</td>
                    <td className="whitespace-nowrap px-3 py-3 font-medium">
                      {m.closureNote
                        ? "Closed"
                        : m.priceNis === 0
                          ? "Free*"
                          : typeof m.priceNis === "number"
                            ? "₪" + m.priceNis
                            : "Confirm with operator"}
                    </td>
                    <td className="px-3 py-3">{m.openingDays}</td>
                    <td className="whitespace-nowrap px-3 py-3">{m.duration}</td>
                    <td className="px-3 py-3">{m.booking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            *Free general admission may exclude some specialist activities. The Haifa Museums
            municipal pass does not cover all independent institutions in the city.
          </p>
        </section>
        <section id="by-area" aria-labelledby="by-area-heading" className="mt-12 scroll-mt-24">
          <SectionHeading
            id="by-area"
            title="Explore museums by area"
            intro="I've grouped the venues geographically. Haifa's steep streets mean two museums that look close on a flat map can still take time to reach."
          />
          {museumAreas.map((area, index) => (
            <section
              key={area.id}
              id={"area-" + area.id}
              aria-label={area.name}
              className="mt-9 scroll-mt-24"
            >
              <h3 className="text-2xl font-semibold">{area.name}</h3>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{area.intro}</p>
              <div className="mt-5 grid gap-5">
                {museums
                  .filter((m) => m.area === area.id)
                  .map((m) => (
                    <MuseumCard key={m.id} museum={m} />
                  ))}
              </div>
              {index === 2 && (
                <div className="mt-5">
                  <PlanningTip>
                    The Mané-Katz Museum is closed for renovation, but works from its collection may
                    be shown at other Haifa Museums venues. Check the current exhibitions and
                    opening hours before setting out.
                  </PlanningTip>
                </div>
              )}
              {index === 3 && (
                <div className="mt-5">
                  <PlanningTip>
                    The two Allenby Road maritime museums are separate. I recommend checking each
                    institution's last entry time and ticket rules before planning a combined visit.
                  </PlanningTip>
                </div>
              )}
            </section>
          ))}
          <div className="mt-8 rounded-xl border bg-card p-4">
            <h3 className="text-lg font-semibold">Other cultural places worth knowing about</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              These are not regular museum stops I would plan without extra checking, but they may
              interest visitors with more time.
            </p>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {additionalMuseums.map((item) => (
                <li key={item.name} className="rounded-lg bg-secondary/40 p-4">
                  <strong>{item.name}</strong>
                  <p className="mt-1 text-xs text-muted-foreground">{item.place}</p>
                  <p className="mt-2 text-sm leading-relaxed">{item.note}</p>
                  <p className="mt-3 text-sm">
                    <OfficialLink href={item.url}>More information</OfficialLink>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section id="choose" aria-labelledby="choose-heading" className="mt-12 scroll-mt-24">
          <SectionHeading
            id="choose"
            title="Which museum is right for you?"
            intro="A quick way to match the visit to your interests."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: "Art & exhibitions",
                text: "Haifa Museum of Art for contemporary shows; Tikotin for a Japanese-art collection.",
                href: "#museum-art",
              },
              {
                label: "With children",
                text: "MadaTech for interactive science, or the Railway Museum for historic trains.",
                href: "#museum-madatech",
              },
              {
                label: "Ancient history",
                text: "Hecht Museum for archaeology and the Ma'agan Michael ship.",
                href: "#museum-hecht",
              },
              {
                label: "Ships & maritime heritage",
                text: "National Maritime Museum for seafaring, or the naval museum for immigration stories.",
                href: "#museum-maritime",
              },
              {
                label: "Haifa's local story",
                text: "Haifa City Museum, with a walk through the nearby German Colony.",
                href: "#museum-city",
              },
              {
                label: "Small artist museums",
                text: "Hermann Struck's house and printmaking exhibitions in Hadar.",
                href: "#museum-struck",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-xl border bg-card p-4 hover:border-primary/40 hover:bg-secondary/25"
              >
                <h3 className="font-bold text-primary">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed">{item.text}</p>
              </a>
            ))}
          </div>
        </section>
        <section
          id="museum-routes"
          aria-labelledby="museum-routes-heading"
          className="mt-12 scroll-mt-24"
        >
          <SectionHeading
            id="museum-routes"
            title="Plan a museum day in Haifa"
            intro="Group nearby museums into one outing to reduce travel across the Carmel slopes."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "A downtown art & heritage walk",
                time: "Half a day",
                steps: [
                  "Haifa Museum of Art in Wadi Nisnas",
                  "Haifa City Museum in the German Colony",
                  "Walk along Ben Gurion Avenue",
                ],
                note: "Check the City Museum exhibition calendar before going.",
              },
              {
                title: "Science & Hadar",
                time: "Half to full day",
                steps: [
                  "MadaTech: allow about three hours",
                  "Optional Hermann Struck Museum if open",
                  "Allow time for the hillside streets",
                ],
                note: "Allow time to walk or travel from MadaTech to the Hermann Struck Museum.",
              },
              {
                title: "Two maritime stories",
                time: "Half a day",
                steps: [
                  "National Maritime Museum",
                  "Clandestine Immigration and Naval Museum",
                  "Optional Bat Galim seafront walk",
                ],
                note: "The museums are close together, but each has its own entrance, opening hours and admission ticket.",
              },
            ].map((route) => (
              <div key={route.title} className="rounded-xl border bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {route.time}
                </p>
                <h3 className="mt-1 text-lg font-bold">{route.title}</h3>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
                  {route.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p className="mt-3 text-sm text-muted-foreground">{route.note}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="practical" aria-labelledby="practical-heading" className="mt-12 scroll-mt-24">
          <SectionHeading id="practical" title="My practical museum-planning tips" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border p-5">
              <h3 className="font-bold">Tickets & combinations</h3>
              <p className="mt-2 text-sm leading-relaxed">
                The municipal{" "}
                <OfficialLink href="https://www.hms.org.il/eng/Bundle_ticket">
                  Haifa Museums combined ticket
                </OfficialLink>{" "}
                applies to participating museums, not every institution in the city. MadaTech, the
                naval museum, Israel Railways and the university museum have their own arrangements.
              </p>
            </div>
            <div className="rounded-xl border p-5">
              <h3 className="font-bold">Haifa's hills & transport</h3>
              <p className="mt-2 text-sm leading-relaxed">
                Haifa is a hilly city. Buses, taxis and the Carmelit make travelling between
                neighborhoods easier.
              </p>
            </div>
            <div className="rounded-xl border p-5">
              <h3 className="font-bold">Weekends & Jewish holidays</h3>
              <p className="mt-2 text-sm leading-relaxed">
                Some municipal museums open on Saturdays, while the Railway Museum and naval museum
                typically do not.{" "}
                <Link
                  to="/travel-blog/calendar-of-events/"
                  className="font-semibold text-primary hover:underline"
                >
                  Jewish holidays and holiday eves
                </Link>{" "}
                can change opening times.
              </p>
            </div>
            <div className="rounded-xl border p-5">
              <h3 className="font-bold">Accessibility & cruise visitors</h3>
              <p className="mt-2 text-sm leading-relaxed">
                Historic homes and vessels may involve stairs or restricted access. Cruise
                passengers should allow plenty of time to return to their ship. Check the actual
                museum entrance and last admission.
              </p>
            </div>
          </div>
          <div className="mt-5">
            <PlanningTip>
              I recommend visiting one major museum and a smaller one nearby if you have time,
              followed by a relaxed walk or meal.
            </PlanningTip>
          </div>
          <MuseumMap />
        </section>
        <FaqList faqs={faqs} />
        <section
          id="explore-more"
          aria-labelledby="explore-more-heading"
          className="mt-12 scroll-mt-24"
        >
          <SectionHeading
            id="explore-more"
            title="Explore more of Haifa"
            intro="Continue planning with my Haifa attraction, transport and accommodation guides."
          />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {related.map((item) => {
              const photo =
                guideHeroPhotoForPath(item.to) ??
                (item.to === "/shore-excursions/haifa/"
                  ? getShorePort("haifa").photo
                  : item.to === "/attractions/haifa/"
                    ? {
                        src: "/images/attractions/haifa-german-colony.webp",
                        alt: "Haifa German Colony and Mount Carmel streets",
                      }
                    : undefined);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="editorial-card-link group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50 hover:bg-secondary/30 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary"
                >
                  {photo && (
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      width={640}
                      height={360}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  )}
                  <span className="flex flex-1 flex-col p-4">
                    <strong className="text-base">{item.title}</strong>
                    <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.note}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
        <HomeContactForm
          showTripadvisorBesidePortraitMobile
          guide={neighborhoodTripContactCopy("Haifa")}
        />
        <SourcesDisclosure>
          <p className="mb-3 text-sm leading-relaxed">
            Museum admission, opening days, current closures and booking advice were checked against
            official operator information in November 2026. Exhibitions and visitor arrangements may
            change. Always check the individual museum for your travel dates.
          </p>
          <ul className="grid gap-x-5 gap-y-2 text-sm sm:grid-cols-2">
            {museums.map((m) => (
              <li key={m.id}>
                <OfficialLink href={m.url}>{m.name}</OfficialLink>
              </li>
            ))}
            <li>
              <OfficialLink href="https://www.hms.org.il/eng/Price_List">
                Haifa Museums entry prices
              </OfficialLink>
            </li>
            <li>
              <OfficialLink href="https://www.hms.org.il/eng/Activity_Time">
                Haifa Museums opening times
              </OfficialLink>
            </li>
            <li>
              <OfficialLink href="https://www.madatech.org.il/en/before-you-arrive/visitor-information/">
                MadaTech visitor information
              </OfficialLink>
            </li>
          </ul>
          <div className="mt-4 border-t pt-3 text-xs leading-relaxed text-muted-foreground">
            <p>Photo credits (cropped, resized and converted to WebP):</p>
            <ul className="mt-2 space-y-1">
              {haifaMuseumPhotoCredits.map((photo) => (
                <li key={photo.id}>
                  <a
                    href={photo.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {photo.label}
                  </a>{" "}
                  - {photo.author} ·{" "}
                  <a
                    href={photo.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {photo.license}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </SourcesDisclosure>
      </article>
    </main>
  );
}
