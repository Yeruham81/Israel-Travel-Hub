import { Link } from "@tanstack/react-router";
import { AuthorCard } from "@/components/AuthorCard";
import { Breadcrumbs, FaqList, OnThisPage, RelatedLinks, Section } from "@/components/Guide";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionPath, type AttractionId } from "@/data/attractionGuideTypes";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { JerusalemClusterLinks, type JerusalemClusterKey } from "@/components/JerusalemClusterLinks";
import { JerusalemPartnerOffers } from "@/components/JerusalemPartnerOffers";

export function attractionMeta(id: AttractionId) {
  const a = attractionGuides[id];
  const path = attractionPath(id);
  const base = pageMeta({
    title: a.title, description: a.description, path, type: "article",
    crumbs: [
      { name: "Home", path: "/" }, { name: "Attractions", path: "/attractions/" },
      { name: a.title, path },
    ],
    ...(a.image ? { image: a.image.src, imageAlt: a.image.alt } : {}),
  });
  const url = CANONICAL_ORIGIN + path;
  return { ...base, scripts: [...base.scripts, jsonLd({
    "@context":"https://schema.org", "@type":"Article",
    "@id": url + "#article", mainEntityOfPage: url, headline:a.title,
    description:a.description, inLanguage:"en", dateModified: a.region === "Jerusalem" ? "2026-10-24" : "2026-10-18",
    author:authorLd(), publisher:{"@type":"Organization",name:SITE_NAME,url:CANONICAL_ORIGIN},
    ...(a.image ? {image:new URL(a.image.src,CANONICAL_ORIGIN).href}:{}),
    citation:a.official.map(o=>o.url),
  })]};
}
const areaLinks: Record<string,{label:string;to:"/travel-blog/jerusalem-travel-guide/"|"/travel-blog/where-to-stay-in-tel-aviv/"|"/travel-blog/best-dead-sea-hotels/"|"/travel-blog/best-hotels-in-haifa/"|"/travel-blog/best-hotels-in-tiberias/"}> = {
  "Jerusalem":{label:"Jerusalem city guide",to:"/travel-blog/jerusalem-travel-guide/"},
  "Tel Aviv & Jaffa":{label:"Where to stay in Tel Aviv",to:"/travel-blog/where-to-stay-in-tel-aviv/"},
  "Dead Sea & Negev":{label:"Dead Sea accommodation",to:"/travel-blog/best-dead-sea-hotels/"},
  "Haifa & northern coast":{label:"Hotels in Haifa",to:"/travel-blog/best-hotels-in-haifa/"},
  "Sea of Galilee":{label:"Tiberias and lakeside hotels",to:"/travel-blog/best-hotels-in-tiberias/"},
};

export function AttractionGuidePage({ id }: {id:AttractionId}) {
  const a=attractionGuides[id];
  const ids=Object.keys(attractionGuides) as AttractionId[];
  const nearby=ids.filter(other=>other!==id && attractionGuides[other].region===a.region).slice(0,4);
  const sections=[["highlights","What to see"],["getting-there","Getting there"],["tips","Practical tips"],["official","Official visitor information"],["faq","Questions"]] as const;
  return <main className="mx-auto max-w-5xl px-4 pb-16">
    <header className="pt-6">
      <Breadcrumbs items={[{name:"Home",to:"/"},{name:"Attractions",to:"/attractions/"},{name:a.title,to:attractionPath(id)}]}/>
      <p className="eyebrow mt-6">{a.region} · Visitor guide</p>
      <h1 className="mt-3 text-4xl leading-tight md:text-5xl">{a.title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{a.intro}</p>
      <p className="mt-4 text-sm text-muted-foreground"><strong>Suggested time:</strong> {a.duration}</p>
      {a.image && <img src={a.image.src} alt={a.image.alt} width={1200} height={675} fetchPriority="high" decoding="async" className="mt-7 aspect-[16/9] max-h-[450px] w-full rounded-2xl object-cover"/>}
      <AuthorCard/>
    </header>
    <div className="mt-8 rounded-2xl border border-primary/20 bg-secondary/40 p-6">
      <h2 className="text-2xl">Plan your visit</h2>
      <p className="mt-3 leading-relaxed">{a.takeaway}</p>
    </div>
    <OnThisPage sections={sections}/>
    <Section id="highlights" title="What to see and do">
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {a.highlights.map(h=><article key={h.name} className="rounded-xl border bg-card p-5">
          <h3 className="text-xl font-semibold">{h.name}</h3>
          <p className="mt-3">{h.description}</p>
          <p className="mt-3 text-sm text-muted-foreground"><strong>Tip:</strong> {h.tip}</p>
        </article>)}
      </div>
    </Section>
    <Section id="getting-there" title="How to get there">
      <ul className="mt-3 list-disc space-y-3 pl-5">{a.arrival.map(t=><li key={t}>{t}</li>)}</ul>
      <p className="mt-5">For comfortable transport between sites, you can also <Link to="/private-driver/" className="font-semibold text-primary underline underline-offset-4">explore a private driver</Link>. Confirm the route, availability and total quote directly before booking.</p>
    </Section>
    <Section id="tips" title="Practical advice before you go">
      <ul className="mt-3 list-disc space-y-3 pl-5">{a.planning.map(t=><li key={t}>{t}</li>)}</ul>
      <p className="mt-4 text-sm text-muted-foreground">Admission, security restrictions, public transport, opening hours and trail conditions can change. Verify the specific date with the operator or responsible authority.</p>
    </Section>
    <Section id="official" title="Official visitor information">
      <p>Use the relevant attraction or managing body's current website to confirm opening hours, reservations, accessibility and seasonal restrictions.</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">{a.official.map(o=><li key={o.url}><a href={o.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border bg-card p-4 font-semibold text-primary underline underline-offset-4">{o.label} <span className="sr-only">(opens in a new tab)</span>↗</a></li>)}</ul>
    </Section>
    {a.region === "Jerusalem" && <JerusalemPartnerOffers id={id} />}
    {a.region === "Jerusalem" && <JerusalemClusterLinks pageKey={id as JerusalemClusterKey} />}
    <FaqList faqs={a.faqs}/>
    {a.region !== "Jerusalem" && <>
    <RelatedLinks title="Plan a multi-day Israel itinerary" items={
      a.region === "Sea of Galilee" ? [
        { label: "7 days: Jerusalem, Galilee and coast", to: "/travel-blog/israel-itinerary-7-days/" },
        { label: "10 days: a longer Galilee stay", to: "/travel-blog/israel-itinerary-10-days/" },
      ] : a.region === "Haifa & northern coast" ? [
        { label: "5-day coast and Jerusalem itinerary", to: "/travel-blog/israel-itinerary-5-days/" },
        { label: "10 days: Akko and northern coast", to: "/travel-blog/israel-itinerary-10-days/" },
      ] : a.region === "Dead Sea & Negev" ? [
        { label: "3-day itinerary with Masada and Dead Sea", to: "/travel-blog/israel-itinerary-3-days/" },
        { label: "7-day itinerary and desert day", to: "/travel-blog/israel-itinerary-7-days/" },
      ] : [
        { label: "3 days in Jerusalem and Tel Aviv", to: "/travel-blog/israel-itinerary-3-days/" },
        { label: "7 days across Israel", to: "/travel-blog/israel-itinerary-7-days/" },
      ]
    }/>
    <RelatedLinks title="Continue exploring" items={[
      ...nearby.map(other=>({label:attractionGuides[other].title,to:attractionPath(other)})),
      {label:areaLinks[a.region]!.label,to:areaLinks[a.region]!.to},
      {label:"All attractions",to:"/attractions/" as const},
    ]}/>
    </>}
  </main>;
}
