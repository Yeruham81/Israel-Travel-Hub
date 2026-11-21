import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarCheck2, Clock3, ExternalLink, Lightbulb, MapPin, Ticket, CalendarDays } from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { HomeContactForm } from "@/components/HomeContactForm";
import { neighborhoodTripContactCopy } from "@/lib/guide-contact";
import { additionalMuseums, museumAreas, museumMapPoints, museums, type MuseumEntry } from "@/data/telAvivMuseums";
import museumHero from "@/assets/guides/2026-10/museums-in-tel-aviv.webp";
import { telAvivMuseumPhotos } from "@/data/telAvivMuseumPhotos";
import jaffaPhoto from "@/assets/tel-aviv/jaffa.webp";
import nevePhoto from "@/assets/tel-aviv/neve-tzedek.webp";
import beachPhoto from "@/assets/guides/2026-10/beaches-in-tel-aviv.webp";
import dizengoffPhoto from "@/assets/tel-aviv/dizengoff.webp";
import rothschildPhoto from "@/assets/tel-aviv/rothschild.webp";
import beachfrontPhoto from "@/assets/tel-aviv/beachfront.webp";

const updatedAt = "2026-11-21";


const related = [
  { title: "Attractions in Tel Aviv", to: "/travel-blog/attractions-in-tel-aviv/" as const, note: "Landmarks and local experiences beyond the museums", image: rothschildPhoto, alt: "Rothschild Boulevard in Tel Aviv" },
  { title: "Explore Old Jaffa", to: "/attractions/jaffa/" as const, note: "Historic lanes, the port and nearby sights", image: jaffaPhoto, alt: "Old Jaffa and its historic streets" },
  { title: "Getting around Tel Aviv", to: "/travel-blog/getting-around-tel-aviv/" as const, note: "Buses, trains, the light rail and other transport", image: dizengoffPhoto, alt: "A street scene in central Tel Aviv" },
  { title: "Beaches in Tel Aviv", to: "/travel-blog/beaches-in-tel-aviv/" as const, note: "Relax with a seaside walk after visiting a museum", image: beachPhoto, alt: "Tel Aviv's Mediterranean beachfront" },
  { title: "Israel events calendar", to: "/travel-blog/calendar-of-events/" as const, note: "Festivals, cultural events and seasonal activities", image: museumHero, alt: "Israel events" },
  { title: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" as const, note: "Compare neighbourhoods and hotels for your visit", image: beachfrontPhoto, alt: "Beachfront and hotels in Tel Aviv" },
];

function OfficialLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary">
    {children}<ExternalLink aria-hidden="true" className="h-3.5 w-3.5 shrink-0" /><span className="sr-only"> (opens in a new tab)</span>
  </a>;
}

function MapLink({ museum }: { museum: MuseumEntry }) {
  const url = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(museum.name + ", " + museum.address + ", Israel");
  return <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
    <MapPin aria-hidden="true" className="h-3.5 w-3.5" /> Directions <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
    <span className="sr-only"> (opens in a new tab)</span>
  </a>;
}

function SectionHeading({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return <div className="mb-5">
    <h2 id={id + "-heading"} className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    {intro && <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}
  </div>;
}

function MuseumCard({ museum }: { museum: MuseumEntry }) {
  const museumPhoto = telAvivMuseumPhotos[museum.id]!;
  const family = ["anu", "steinhardt", "muza", "art", "city", "gutman"].includes(museum.id);
  const advanceBooking = ["palmach", "city", "steinhardt"].includes(museum.id);
  const tags = [museum.theme, museum.priceNis === 0 ? "Free entry" : null, family ? "Family-friendly" : null, advanceBooking ? "Book ahead" : null].filter((x): x is string => Boolean(x));
  const showTicket = museum.id === "palmach" || Boolean(museum.ticketUrl && museum.ticketUrl !== museum.url);
  const ticketLabel = museum.id === "palmach" ? "Reserve by phone" : museum.id === "bauhaus" ? "Tours & audio guide" : museum.id === "liebling" ? "Tours & events" : ["city", "steinhardt", "anu"].includes(museum.id) ? "Reserve a visit" : "Check tickets & rates";

  return <article id={"museum-" + museum.id} data-museum-card="horizontal" className="scroll-mt-28 overflow-hidden rounded-2xl border bg-card shadow-sm">
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_270px] lg:items-start lg:gap-6 lg:p-5">
      <figure className="min-w-0 bg-secondary/20 lg:col-start-2 lg:row-start-1 lg:overflow-hidden lg:rounded-xl">
        <div className="overflow-hidden bg-secondary/40">
          <img
            src={museumPhoto.src}
            alt={museumPhoto.alt}
            width={museumPhoto.width}
            height={museumPhoto.height}
            loading="lazy"
            decoding="async"
            className={`h-48 w-full sm:h-56 lg:aspect-[4/3] lg:h-auto ${museumPhoto.fit === "contain" ? "object-contain" : "object-cover"}`}
          />
        </div>
        
      </figure>
      <div className="min-w-0 p-4 sm:p-5 lg:col-start-1 lg:row-start-1 lg:p-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{museum.neighbourhood}</p>
        <h3 className="mt-1 text-xl font-bold leading-snug sm:text-2xl">{museum.name}</h3>
        {tags.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{tags.map(tag => <span key={tag} className="rounded-full border border-primary/15 bg-secondary/50 px-2.5 py-1 text-[11px] font-medium">{tag}</span>)}</div>}
        {museum.closureNote && <p className="mt-3 w-fit rounded-md border border-amber-300/60 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-900">{museum.closureNote}</p>}
        <p className="mt-3 text-sm leading-relaxed">{museum.intro}</p>
      </div>
    </div>
    <div className="border-t px-4 py-4 sm:px-5 lg:px-6">
      <dl className="grid gap-3 rounded-xl bg-secondary/40 p-3.5 text-sm sm:grid-cols-2">
        <div className="flex min-w-0 items-start gap-2"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /><div><dt className="font-semibold">Allow</dt><dd className="mt-0.5 leading-relaxed text-muted-foreground">{museum.duration}</dd></div></div>
        <div className="flex min-w-0 items-start gap-2"><Ticket className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /><div><dt className="font-semibold">Admission</dt><dd className="mt-0.5 leading-relaxed text-muted-foreground">{museum.admission}</dd></div></div>
        <div className="flex min-w-0 items-start gap-2"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /><div><dt className="font-semibold">Usual opening</dt><dd className="mt-0.5 leading-relaxed text-muted-foreground">{museum.openingDays || "Confirm with the museum"}</dd></div></div>
        <div className="flex min-w-0 items-start gap-2"><CalendarCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /><div><dt className="font-semibold">Booking</dt><dd className="mt-0.5 leading-relaxed text-muted-foreground">{museum.booking}</dd></div></div>
      </dl>
    </div>
    <div className="grid gap-4 border-t px-4 py-4 sm:px-5 lg:grid-cols-2 lg:gap-6 lg:px-6">
      <div>
        <h4 className="text-sm font-semibold">Highlights</h4>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-relaxed text-muted-foreground">{museum.highlights.slice(0, 2).map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
        {museum.highlightsForFamilies && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{museum.highlightsForFamilies}</p>}
      </div>
      <p className="text-sm leading-relaxed"><strong className="text-primary">My tip:</strong> {museum.tip}</p>
    </div>
    <div className="flex flex-col gap-3 border-t bg-secondary/10 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-5 lg:px-6">
      <div className="flex min-w-0 flex-col gap-1 text-xs text-muted-foreground">
        <span>{museum.address}</span>
        <div><MapLink museum={museum} /></div>
      </div>
      <div className={`grid w-full gap-2 text-sm lg:w-auto lg:min-w-[360px] ${showTicket ? "sm:grid-cols-2" : "sm:grid-cols-1"}`}>
        {showTicket && <a href={museum.id === "palmach" ? "tel:+97235459800" : museum.ticketUrl!} target={museum.id === "palmach" ? undefined : "_blank"} rel={museum.id === "palmach" ? undefined : "noopener noreferrer"} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-center font-semibold text-primary-foreground transition-opacity hover:opacity-90">{ticketLabel}{museum.id !== "palmach" && <><ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></>}</a>}
        <a href={museum.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-sky-200 bg-sky-100 px-3 py-2.5 text-center font-semibold text-sky-950 hover:bg-sky-200">{museum.id === "bauhaus" || museum.id === "liebling" ? "Official centre website" : "Official museum website"}<ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
      </div>
    </div>
  </article>;
}

function PlanningTip({ children }: { children: ReactNode }) {
  return <aside className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed text-amber-950">
    <Lightbulb aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
    <div><strong>My tip:</strong> {children}</div>
  </aside>;
}

const museumMapUrl = "/maps/tel-aviv-museums.html?points=" + encodeURIComponent(JSON.stringify(museumMapPoints));

function MuseumMap() {
  const [selectedId, setSelectedId] = useState("all");
  const frame = useRef<HTMLIFrameElement>(null);
  const selected = museums.find(museum => museum.id === selectedId);
  const focus = (id: string) => {
    setSelectedId(id);
    frame.current?.contentWindow?.postMessage({type:"tel-aviv-museum-map-focus",id}, window.location.origin);
  };
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "tel-aviv-museum-map-selected" && museumMapPoints.some(museum => museum.id === event.data.id)) setSelectedId(event.data.id);
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);
  return <section aria-label="Museum locations in Tel Aviv and Jaffa" className="mt-7 overflow-hidden rounded-xl border bg-card">
    <div className="p-4">
      <h3 className="text-lg font-semibold">Museums on the map</h3>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <label htmlFor="museum-map-select" className="min-w-0 flex-1 text-sm font-semibold">Focus on a museum
          <select id="museum-map-select" value={selectedId} onChange={e => focus(e.target.value)} className="mt-2 min-h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm font-normal focus-visible:outline-2 focus-visible:outline-primary">
            <option value="all">All museums — city overview</option>
            {museumAreas.map(area => <optgroup key={area.id} label={area.name}>{museums.filter(museum => museum.area === area.id).map(museum => <option key={museum.id} value={museum.id}>{museums.findIndex(item => item.id === museum.id) + 1}. {museum.name}{museum.id === "independence" ? " (closed)" : ""}</option>)}</optgroup>)}
          </select>
        </label>
        <button type="button" disabled={selectedId === "all"} onClick={() => focus("all")} className="min-h-11 rounded-lg border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary disabled:cursor-default disabled:opacity-50">Show all museums</button>
      </div>
      {selected && <p className="mt-2 text-xs text-muted-foreground">{selected.address}, Israel{selected.closureNote ? " · " + selected.closureNote : ""}</p>}
    </div>
    <iframe ref={frame} title="All fifteen museums in Tel Aviv and Jaffa" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" src={museumMapUrl} onLoad={() => {
      if (selectedId !== "all") frame.current?.contentWindow?.postMessage({type:"tel-aviv-museum-map-focus",id:selectedId},window.location.origin);
    }} width={900} height={440} className="h-[360px] w-full border-0 sm:h-[440px]" />
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 text-xs text-muted-foreground">
      <span>Map data © OpenStreetMap contributors.</span>
      {selected && <OfficialLink href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(selected.name + ", " + selected.address + ", Israel")}>Open in Google Maps</OfficialLink>}
    </div>
  </section>;
}

const faqs = [
  { q: "Is there a combined ticket for Bialik Square?", a: "Bialik House lists a ₪75 combined ticket for Bialik Square. The square includes the City Museum, Bialik House, Liebling Haus, Rubin Museum and Felicja Blumental Centre; confirm which venues and exhibitions the pass currently covers." },
  { q: "Which museum would you choose for a first visit to Tel Aviv?", a: "I'd start with the Tel Aviv Museum of Art for art, ANU for the story of Jewish communities, or the Steinhardt Museum for natural history. If you're short on time, the museums around Bialik Square make a satisfying cultural walk." },
  { q: "Which museums are best for children?", a: "The Steinhardt Museum is particularly approachable for families. ANU's Heroes gallery is aimed at children aged 6–12 and requires an advance reservation. Check any special programme's age range and language before booking." },
  { q: "Are there free museums in Tel Aviv?", a: "Liebling Haus normally offers free general entry, while exhibitions or special events elsewhere can have separate charges. MUZA's outdoor park areas have different entry arrangements from the exhibitions. Always check the specific event or museum before arrival." },
  { q: "Can I visit several museums in one day?", a: "Yes, especially around Bialik Square. In Ramat Aviv, I recommend choosing one major museum, or two only if their opening times and your transport arrangements fit. Allow time for meals and breaks." },
  { q: "Are museums open on Saturdays and Jewish holidays?", a: "Opening days differ from one museum to another; some open on Saturdays and others do not. Holiday eves and special events can change hours even at museums that normally open. Check the official timetable before making the journey." },
  { q: "Can I visit Independence Hall right now?", a: "Independence Hall is closed until further notice for restoration. You can still include its exterior on a Rothschild Boulevard walk; check the operator for reopening news before planning an interior visit." },
];

export function TelAvivMuseumsGuide() {
  const featured = museums.filter(museum => ["art", "city", "steinhardt", "anu", "muza", "liebling"].includes(museum.id));
  const featuredCta: Record<string, string> = {
    art: "See art highlights", city: "Explore visitor details",
    steinhardt: "Discover natural history", anu: "Plan your museum visit",
    muza: "Explore MUZA exhibitions", liebling: "Discover the White City",
  };
  const jump = [
    ["top-picks", "My top picks"], ["compare", "Compare museums"], ["by-area", "Museums by area"],
    ["choose", "Which museum?"], ["museum-routes", "Suggested visits"], ["practical", "Visitor tips"],
    ["faq", "FAQ"], ["explore-more", "Explore more"], ["contact", "Contact me"],
  ] as const;

  return <main className="mx-auto max-w-5xl px-4 pb-10">
    <article>
      <header className="pt-6">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/travel-blog/" }, { name: "Museums in Tel Aviv", to: "/travel-blog/museums-in-tel-aviv/" }]} />
        <GuideHeroLayout image={<GuideHeroMedia src={museumHero} alt="Geometric exterior of the Tel Aviv Museum of Art"><p className="mt-1 text-[10px] text-muted-foreground">Photo: © www.artursalisz.com</p></GuideHeroMedia>}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Tel Aviv & Jaffa · Art and culture</p>
          <h1 className="guide-page-title mt-2">Best Museums in Tel Aviv & Jaffa</h1>
          <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed">From major art collections to intimate artist houses, Tel Aviv's museums reward a little planning. In my guide, I'll help you compare the options and put together a realistic cultural day.</p>
          <PageUpdated date={updatedAt} />
        </GuideHeroLayout>
        <AuthorCard />
      </header>

      <section className="mt-8 rounded-xl border border-primary/20 bg-secondary/40 p-5 sm:p-6" aria-label="My quick recommendation">
        <h2 className="text-xl font-bold">Where I'd start</h2>
        <p className="mt-2 leading-relaxed">For a first museum day, choose the <a className="font-semibold text-primary hover:underline" href="#museum-art">Tel Aviv Museum of Art</a> for art, <a className="font-semibold text-primary hover:underline" href="#museum-anu">ANU</a> for Jewish history, or the <a className="font-semibold text-primary hover:underline" href="#museum-steinhardt">Steinhardt Museum</a> for natural history. Prefer a compact walking outing? Start around Bialik Square, where several smaller cultural museums sit close together.</p>
      </section>

      <OnThisPage sections={jump} />

      <section id="top-picks" aria-labelledby="top-picks-heading" className="mt-10 scroll-mt-24">
        <SectionHeading id="top-picks" title="My top museum picks" intro="A few very different places worth considering first. Choose according to your interests instead of trying to visit all of them." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(museum => <a key={museum.id} href={"#museum-" + museum.id} className="group flex flex-col rounded-xl border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-secondary/30 focus-visible:outline-2 focus-visible:outline-primary">
            <span className="text-[11px] font-bold uppercase tracking-wide text-primary">{museum.theme}</span>
            <strong className="mt-2 text-base leading-snug">{museum.name}</strong>
            <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{museum.bestFor}</span>
            <span className="mt-2 text-xs text-muted-foreground">{museum.priceNis === 0 ? "Free general entry" : typeof museum.priceNis === "number" ? "Adult ₪" + museum.priceNis : "Check admission"}</span>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-primary">{featuredCta[museum.id] ?? "See museum details"} <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></span>
          </a>)}
        </div>
      </section>

      <section id="compare" aria-labelledby="compare-heading" className="mt-11 scroll-mt-24">
        <SectionHeading id="compare" title="Compare Tel Aviv museums at a glance" intro="Regular adult admission rates checked in November 2026. Visit durations are my estimates; opening days, concessions, exhibitions and booking terms may change." />
        <div role="region" aria-label="Museum admission and visiting comparison" tabIndex={0} className="overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <caption className="sr-only">Fifteen museums compared by area, adult admission, regular opening days and booking</caption>
            <thead className="bg-secondary/60"><tr>{["Museum", "Best for", "Area", "Adult admission", "Opening days", "Allow", "Booking"].map((h, index) => <th scope="col" key={h} className={index === 0 ? "sticky left-0 z-10 border-b bg-secondary px-3 py-3 font-semibold" : "border-b px-3 py-3 font-semibold"}>{h}</th>)}</tr></thead>
            <tbody>{museums.map(museum => <tr key={museum.id} className="border-b last:border-0">
              <th scope="row" className="sticky left-0 z-10 w-[140px] min-w-[136px] bg-card px-3 py-3 font-semibold"><a href={"#museum-" + museum.id} className="text-primary hover:underline">{museum.name}</a>{museum.closureNote && <span className="mt-1 block text-xs font-normal text-amber-800">{museum.closureNote}</span>}</th>
              <td className="px-3 py-3">{museum.bestFor}</td><td className="px-3 py-3">{museum.neighbourhood}</td>
              <td className="whitespace-nowrap px-3 py-3 font-medium">{museum.id === "independence" ? "Closed" : museum.priceNis === 0 ? "Free*" : typeof museum.priceNis === "number" ? "₪" + museum.priceNis : "Confirm with operator"}</td>
              <td className="px-3 py-3">{museum.openingDays || "Check official hours"}</td><td className="whitespace-nowrap px-3 py-3">{museum.duration}</td><td className="px-3 py-3">{museum.booking}</td>
            </tr>)}</tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">*Free general admission only; guided experiences, exhibitions or programmes may have additional charges. Check each venue's official page before booking.</p>
      </section>

      <section id="by-area" aria-labelledby="by-area-heading" className="mt-12 scroll-mt-24">
        <SectionHeading id="by-area" title="Explore museums by area" intro="These clusters make it easier to choose what to visit together. I recommend two or three nearby stops rather than racing across the city." />
        {museumAreas.map((area, index) => <section key={area.id} id={"area-" + area.id} aria-label={area.name} className="mt-9 scroll-mt-24">
          <h3 className="text-2xl font-semibold">{area.name}</h3>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{area.intro}</p>
          <div className="mt-5 grid gap-5">{museums.filter(museum => museum.area === area.id).map(museum => <MuseumCard key={museum.id} museum={museum} />)}</div>
          {index === 0 && <div className="mt-5"><PlanningTip>For a walkable cultural afternoon, choose two or three cultural venues around Bialik Square: the City Museum, Bialik House, Rubin Museum, Liebling Haus and Felicja Blumental Centre are nearby. <OfficialLink href="https://www.bialikmuseum.org.il/pages?pageid=14">Bialik House advertises a ₪75 combined ticket</OfficialLink>; confirm its participating venues before purchasing. Save the main Tel Aviv Museum of Art for a separate substantial visit.</PlanningTip></div>}
          {index === 1 && <div className="mt-5"><PlanningTip>The university-area museums are separate institutions. Check each ticket, English-language option and visiting time before travelling. The MUZA planetarium is closed as of November 2026, although the museum campus remains open.</PlanningTip></div>}
        </section>)}
        <div className="mt-8 rounded-xl border bg-card p-4">
          <h3 className="text-lg font-semibold">Other interesting museum visits</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">These are more specialised venues or visits that need advance coordination, but they are worth knowing about.</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">{additionalMuseums.map(item => <li key={item.name} className="rounded-lg bg-secondary/40 p-4">
            <strong>{item.name}</strong><p className="mt-1 text-xs text-muted-foreground">{item.place}</p><p className="mt-2 text-sm leading-relaxed">{item.note}</p><p className="mt-3 text-sm"><OfficialLink href={item.url}>Official information</OfficialLink></p>
          </li>)}</ul>
        </div>
      </section>

      <section id="choose" aria-labelledby="choose-heading" className="mt-12 scroll-mt-24">
        <SectionHeading id="choose" title="Which museum is right for you?" intro="These are my quick recommendations based on what you would most like to see." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Art and exhibitions", text: "Tel Aviv Museum of Art, or Rubin Museum for a smaller artist-house visit.", href: "#museum-art" },
            { label: "With children", text: "Steinhardt's natural history displays or ANU's book-ahead Heroes gallery.", href: "#museum-steinhardt" },
            { label: "Jewish culture", text: "ANU for a broad, interactive account of Jewish communities worldwide.", href: "#museum-anu" },
            { label: "Architecture", text: "Liebling Haus and a White City walk, with the Bauhaus Center as an optional stop.", href: "#museum-liebling" },
            { label: "Israeli history", text: "Palmach Museum or the Yitzhak Rabin Center for different historic perspectives.", href: "#museum-palmach" },
            { label: "Old Jaffa", text: "Ilana Goor Museum, followed by the lanes and port of Old Jaffa.", href: "#museum-ilana" },
          ].map(item => <a key={item.label} href={item.href} className="rounded-xl border bg-card p-4 hover:border-primary/40 hover:bg-secondary/25">
            <h3 className="font-bold text-primary">{item.label}</h3><p className="mt-2 text-sm leading-relaxed">{item.text}</p>
          </a>)}
        </div>
      </section>

      <section id="museum-routes" aria-labelledby="museum-routes-heading" className="mt-12 scroll-mt-24">
        <SectionHeading id="museum-routes" title="Plan a museum day in Tel Aviv" intro="Here are three manageable ideas, with enough time to enjoy the exhibitions and the neighbourhood around them." />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Bialik Square cultural walk", time: "Around half a day", steps: ["Tel Aviv–Yafo City Museum", "Rubin Museum", "Liebling Haus or Bialik House"], note: "Mostly walkable, with cafés and central streets nearby." },
            { title: "Ramat Aviv museum day", time: "Half to full day", steps: ["Choose ANU or Steinhardt", "Add MUZA, Palmach or Rabin Center if time allows", "Plan a break and the return journey"], note: "Check each venue's opening and booking requirements." },
            { title: "Art and Old Jaffa", time: "Around half a day", steps: ["Ilana Goor Museum", "Old Jaffa's streets and historic sights", "Optional later visit to Neve Tzedek"], note: "The walk to Neve Tzedek adds time and may suit a longer outing." },
          ].map(route => <div key={route.title} className="rounded-xl border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{route.time}</p>
            <h3 className="mt-1 text-lg font-bold">{route.title}</h3>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">{route.steps.map(step => <li key={step}>{step}</li>)}</ol>
            <p className="mt-3 text-sm text-muted-foreground">{route.note}</p>
          </div>)}
        </div>
      </section>

      <section id="practical" aria-labelledby="practical-heading" className="mt-12 scroll-mt-24">
        <SectionHeading id="practical" title="My practical museum-planning tips" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border p-5"><h3 className="font-bold">Tickets and language</h3><p className="mt-2 text-sm leading-relaxed">Check official websites for current admission, final entry time, English interpretation and age guidance. Structured experiences like the Palmach Museum require a booked time; the City Museum and Steinhardt sell tickets online.</p></div>
          <div className="rounded-xl border p-5"><h3 className="font-bold">Transport between museums</h3><p className="mt-2 text-sm leading-relaxed">Walk between the Bialik Square venues, but allow transit time for Ramat Aviv. Check buses, Israel Railways and the Red Line light rail on my <Link to="/travel-blog/getting-around-tel-aviv/" className="font-semibold text-primary underline-offset-4 hover:underline">getting around Tel Aviv guide</Link>.</p></div>
          <div className="rounded-xl border p-5"><h3 className="font-bold">Weekends and holidays</h3><p className="mt-2 text-sm leading-relaxed">Museums have different Friday and Saturday hours. <Link to="/travel-blog/calendar-of-events/" className="font-semibold text-primary underline-offset-4 hover:underline">Jewish holidays and holiday eves</Link> may affect admissions, opening hours and public transport.</p></div>
          <div className="rounded-xl border p-5"><h3 className="font-bold">Accessibility and family visits</h3><p className="mt-2 text-sm leading-relaxed">Some historic buildings have steps or narrow interiors. Check wheelchair routes, lifts, stroller arrangements and family programmes directly with the museum before setting out.</p></div>
        </div>
        <div className="mt-5"><PlanningTip>My preferred approach is one substantial museum, a nearby lighter visit if time permits, and a walk or meal afterwards. It is a more enjoyable day than a rushed checklist.</PlanningTip></div>
        <MuseumMap />
      </section>

      <FaqList faqs={faqs} />

      <section id="explore-more" aria-labelledby="explore-more-heading" className="mt-12 scroll-mt-24">
        <SectionHeading id="explore-more" title="Explore more of Tel Aviv" intro="Continue planning your stay with my related city, transport and sightseeing guides." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map(item => <Link key={item.to} to={item.to} className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/40 hover:bg-secondary/20">
            <img src={guideHeroPhotoForPath(item.to)!.src} alt={guideHeroPhotoForPath(item.to)!.alt} width={640} height={360} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
            <span className="flex flex-1 flex-col p-4"><strong className="text-base">{item.title}</strong><span className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</span><span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-primary">Explore my guide <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></span></span>
          </Link>)}
        </div>
      </section>
      <HomeContactForm guide={neighborhoodTripContactCopy("Tel Aviv")} />
      <SourcesDisclosure>
        <p className="mb-3 text-sm leading-relaxed">I use official museum and operator pages for visitor arrangements. Opening hours, temporary closures, admission and exhibitions may change. Please confirm the details with the venue for your visit date.</p>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Photo credits for the four added museum photographs (resized and compressed to WebP): <a href="https://commons.wikimedia.org/wiki/File:Bauhaus_Center_Tel_Aviv.JPG" target="_blank" rel="noopener noreferrer" className="underline">Bauhaus Center — Itzuvit, CC BY-SA 3.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Bialik_Bldg.jpg" target="_blank" rel="noopener noreferrer" className="underline">Bialik House — Ori Lubin</a>; <a href="https://commons.wikimedia.org/wiki/File:Bauhaus_Tel-Aviv_museum.jpg" target="_blank" rel="noopener noreferrer" className="underline">Bauhaus-era building — Talmoryair, CC BY 3.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Rubin_Museum_Tel_Aviv,_Room_39.jpg" target="_blank" rel="noopener noreferrer" className="underline">Rubin Museum — Yoram Shoval, CC BY-SA 4.0</a>. The historic Bauhaus Museum photograph illustrates the White City architecture discussed in the Liebling Haus entry.</p>
        <ul className="grid gap-x-5 gap-y-2 text-sm sm:grid-cols-2">
          {museums.map(museum => <li key={museum.id}><OfficialLink href={museum.url}>{museum.name}</OfficialLink></li>)}
        </ul>
      </SourcesDisclosure>
    </article>
  </main>;
}
