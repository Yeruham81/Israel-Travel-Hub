import { createFileRoute, Link } from "@tanstack/react-router";
import { Church, Clock3, Landmark, MapPin, Ship, Sun, Waves } from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage, Section, SourceList } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { ShoreReadingGuides } from "@/components/ShoreReadingGuides";
import { getShorePort } from "@/data/shoreExcursions";
import { shoreHubGuides } from "@/data/shoreReading";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import akkoHarbour from "@/assets/shore-excursions/akko-port.jpg";
import { shoreHubDescription, shoreHubExperiences, shoreHubFaqs, shoreHubPorts, shoreHubSourceIds, shoreHubTitle, shorePlanningSteps, shoreTourFormats } from "@/data/shoreHub";
import { publicSources, SHORE_EXCURSION_CHECK_DATE, shorePorts, travelGuidePaths } from "@/data/registry";
import { authorLd } from "@/lib/author";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { CANONICAL_ORIGIN, jsonLd, pageMeta, SITE_NAME } from "@/lib/site";

const portIds = ["ashdod", "haifa"] as const;
const heroPhoto = migrationPhotos["EXISTING:jerusalem"];
const crumbs = [{ name: "Home", path: "/" }, { name: "Shore excursions", path: "/shore-excursions/" }] as const;
const sections = [["ports", "Compare the ports"], ["destinations", "Destinations"], ["tour-formats", "Private or guided"], ["planning", "Plan your day"], ["faq", "FAQ"]] as const;
const experienceIcons = { history: Landmark, galilee: Church, coast: Waves, desert: Sun };
const experiencePhotos = {
  history: migrationPhotos["EXISTING:jerusalem"],
  galilee: migrationPhotos["EXISTING:galilee"],
  coast: { src: akkoHarbour, alt: "Fishing boats and historic stone buildings beside Akko's old harbour", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/akko_port_2.jpg", credit: "Akko harbour · photograph from the original Haifa shore-excursion guide" },
  desert: migrationPhotos["EXISTING:masada"],
};

export const Route = createFileRoute("/shore-excursions")({
  head: () => {
    const meta = pageMeta({ title: "Israel shore excursions from Ashdod & Haifa cruise ports", description: shoreHubDescription, path: "/shore-excursions/", crumbs: [...crumbs], image: heroPhoto.src, imageAlt: heroPhoto.alt });
    return { ...meta, scripts: [...meta.scripts, jsonLd({
      "@context": "https://schema.org", "@type": "CollectionPage", name: shoreHubTitle,
      description: shoreHubDescription, url: `${CANONICAL_ORIGIN}/shore-excursions/`, inLanguage: "en",
      dateModified: SHORE_EXCURSION_CHECK_DATE, author: authorLd(), publisher: { "@type": "Organization", name: SITE_NAME },
      image: new URL(heroPhoto.src, CANONICAL_ORIGIN).href,
      mainEntity: { "@type": "ItemList", name: "Israel cruise-port excursion guides", itemListElement: portIds.map((id, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "WebPage", name: getShorePort(id).title, url: `${CANONICAL_ORIGIN}${shorePorts[id].path}` } })) },
      citation: publicSources(shoreHubSourceIds).map((source) => source.url),
    })] };
  },
  component: Shore,
});

function Shore() {
  const photos = [heroPhoto, ...portIds.map((id) => getShorePort(id).photo), ...Object.values(experiencePhotos), ...shoreHubGuides.map((guide) => guide.photo)].filter(hasPublicPhotoCredit);
  return <main className="mx-auto max-w-5xl px-4 pb-10">
    <header className="pt-6">
      <Breadcrumbs items={crumbs.map((crumb) => ({ name: crumb.name, to: crumb.path }))} />
      <div className="mt-6 overflow-hidden rounded-3xl bg-navy text-navy-foreground">
        <div className="grid lg:grid-cols-[1.2fr_1fr]">
          <div className="p-6 sm:p-8 lg:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sand">One port call. A world of discovery.</p>
            <h1 className="mt-4 text-4xl leading-[1.1] md:text-5xl">{shoreHubTitle}</h1>
            <p className="mt-5 text-lg leading-relaxed opacity-90">Turn your time ashore into a day to remember: Jerusalem's sacred streets, Galilee's lakeside heritage, old Mediterranean harbours or the desert around Masada and the Dead Sea. Discover guided excursions and private day trips from Ashdod and Haifa, with pickup and return planned around your ship.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={shorePorts.ashdod.path} className="btn btn-light">Excursions from Ashdod</Link>
              <Link to={shorePorts.haifa.path} className="btn btn-light">Excursions from Haifa</Link>
            </div>
          </div>
          <figure className="relative min-h-64 lg:min-h-full">
            <img src={heroPhoto.src} alt={heroPhoto.alt} width={900} height={700} fetchPriority="high" decoding="async" className="h-full min-h-64 w-full object-cover lg:absolute lg:inset-0" />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-navy/80 px-4 py-2 text-xs font-medium backdrop-blur">Jerusalem · The Old City</figcaption>
          </figure>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 px-6 py-4 text-sm sm:px-8">
          <li className="flex items-center gap-2"><Ship className="h-4 w-4" aria-hidden />Ashdod & Haifa ports</li>
          <li className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden />Port pickup & return</li>
          <li className="flex items-center gap-2"><Clock3 className="h-4 w-4" aria-hidden />Private & guided day trips</li>
        </ul>
      </div>
      <PageUpdated date={SHORE_EXCURSION_CHECK_DATE} />
      <AuthorCard />
    </header>
    <OnThisPage sections={sections} />

    <section id="ports" aria-labelledby="ports-h" className="mt-10 scroll-mt-24">
      <p className="eyebrow">Two gateways to Israel</p>
      <h2 id="ports-h" className="mt-2 text-3xl">Your cruise port makes the difference</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">The most rewarding Israel shore excursion starts with the right route for your port. Ashdod opens up Jerusalem, the southern coast and the Dead Sea region; Haifa puts northern coastal towns and the Galilee within a more natural day's reach. Your ship's actual schedule determines what fits.</p>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2">
        {portIds.map((id) => {
          const port = getShorePort(id);
          const details = shoreHubPorts[id];
          return <li key={id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card">
            <img src={port.photo.src} alt={port.photo.alt} width={900} height={600} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="eyebrow">{details.location}</p>
              <h3 className="mt-2 text-3xl font-semibold">Shore excursions from {port.name}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{details.description}</p>
              <ul className="mt-4 space-y-2 text-sm">{details.highlights.map((highlight) => <li key={highlight} className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{highlight}</li>)}</ul>
              <p className="mt-4 border-t pt-4 text-sm leading-relaxed text-muted-foreground">{details.planning}</p>
              <div className="mt-auto pt-5"><Link to={port.path} className="btn btn-primary w-full">Explore {port.name} excursions</Link></div>
            </div>
          </li>;
        })}
      </ul>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Haifa's passenger terminal connects with the downtown area; Ashdod has its own terminal and port-access arrangements. Confirm the meeting point for your ship with the operator rather than assuming every pickup is beside the gangway.</p>
    </section>

    <section id="destinations" aria-labelledby="destinations-h" className="mt-14 scroll-mt-24">
      <p className="eyebrow">Find your kind of day</p>
      <h2 id="destinations-h" className="mt-2 text-3xl">Where can you go on an Israel shore excursion?</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {shoreHubExperiences.map((experience) => {
          const Icon = experienceIcons[experience.id];
          const image = experiencePhotos[experience.id];
          return <article key={experience.id} data-experience={experience.id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card">
            <img src={image.src} alt={image.alt} width={800} height={450} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="flex items-center gap-3"><span className="shrink-0 rounded-xl bg-secondary p-2.5 text-primary"><Icon className="h-5 w-5" aria-hidden /></span><h3 className="text-2xl font-semibold">{experience.title}</h3></div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{experience.description}</p>
              <p className="mt-3 text-sm"><span className="font-semibold">A great fit for: </span>{experience.bestFor}</p>
              <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-5">{experience.links.map((link) => <li key={`${link.portId}-${link.destination}`}><Link to={shorePorts[link.portId].path} search={{ destination: link.destination }} className="text-sm font-semibold text-primary underline underline-offset-4">{link.label}</Link></li>)}</ul>
            </div>
          </article>;
        })}
      </div>
    </section>

    <section id="tour-formats" aria-labelledby="tour-formats-h" className="mt-14 scroll-mt-24 rounded-3xl bg-secondary/70 p-5 sm:p-7">
      <p className="eyebrow">Choose how you explore</p>
      <h2 id="tour-formats-h" className="mt-2 text-3xl">Private driver or guided shore excursion?</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">Travel at your family's pace, spend the day with a dedicated guide, or join a shared itinerary. Compare the experience and the full cost for your party, as well as the headline price.</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">{shoreTourFormats.map((format) => <article key={format.title} className="rounded-2xl border bg-card p-5">
        <h3 className="text-2xl font-semibold">{format.title}</h3>
        <p className="mt-3 text-sm font-medium text-primary">{format.bestFor}</p>
        <p className="mt-3 text-sm leading-relaxed"><span className="font-semibold">What to expect: </span>{format.includes}.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{format.tradeoff}</p>
      </article>)}</div>
    </section>

    <section id="planning" aria-labelledby="planning-h" className="mt-14 scroll-mt-24">
      <p className="eyebrow">Make every hour count</p>
      <h2 id="planning-h" className="mt-2 text-3xl">Plan a day that works with your cruise</h2>
      <ol className="mt-6 grid gap-5 sm:grid-cols-2">{shorePlanningSteps.map((step, index) => <li key={step.title} className="flex gap-4 rounded-2xl border p-5">
        <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-navy-foreground">{index + 1}</span>
        <div><h3 className="text-xl font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p></div>
      </li>)}</ol>
    </section>

    <Section id="visit-tips" title="Small details that make a better day ashore">
      <p>Wear comfortable shoes for the stone lanes of Jerusalem, Jaffa and Akko. Discuss steps and walking distances before choosing a route, and check dress expectations at religious sites. A private vehicle helps connect stops, but it does not remove the walking inside historic quarters.</p>
      <p>For Masada and the Dead Sea, plan for sun, water and a realistic balance between the fortress and any beach stop. Cable-car operation, admission and weather conditions can affect the visit. A designated beach with the facilities you need is a separate choice from simply reaching a Dead Sea viewpoint.</p>
      <p>Save your pickup details and operator's number, and keep enough phone battery for the return. My <Link to={travelGuidePaths.travelTips} className="text-primary underline">Israel travel tips</Link> and <Link to={travelGuidePaths.esim} className="text-primary underline">Israel eSIM guide</Link> help with practical preparations. For travel beyond your port call, explore <Link to="/tours/" className="text-primary underline">Israel tours and day trips</Link> or <Link to="/private-driver/" className="text-primary underline">a private driver for a custom itinerary</Link>.</p>
    </Section>

    <ShoreReadingGuides guides={shoreHubGuides} title="Get to know the places on your route" />
    <FaqList faqs={shoreHubFaqs} />
    <section aria-labelledby="shore-ready-h" className="mt-14 rounded-3xl bg-navy p-6 text-navy-foreground sm:p-8">
      <h2 id="shore-ready-h" className="text-3xl">Make your day in Israel your own</h2>
      <p className="mt-3 max-w-3xl leading-relaxed opacity-90">Choose your port to discover the day trips and guided excursions, or share your ship's schedule and favorite places for a personal car-and-driver plan. A memorable day starts with the right route for you.</p>
      <div className="mt-5 flex flex-wrap gap-3"><Link to={shorePorts.ashdod.path} hash="request-quote" className="btn btn-light">Plan my day from Ashdod</Link><Link to={shorePorts.haifa.path} hash="request-quote" className="btn btn-light">Plan my day from Haifa</Link></div>
    </section>
    <SourceList ids={shoreHubSourceIds} intro="Official terminal and national-park information for planning your visit. Your cruise line and the individual operator confirm the arrangements for your actual ship and date." />
    <details className="mt-8 rounded-xl border p-5"><summary className="cursor-pointer text-sm font-medium">Image credits</summary><ul className="mt-3 space-y-3">{[...new Map(photos.map((photo) => [photo.src, photo])).values()].map((photo) => <li key={photo.src}><p className="text-sm">{photo.alt}</p><GuidePhotoCredit photo={photo} insideDisclosure /></li>)}</ul></details>
  </main>;
}
