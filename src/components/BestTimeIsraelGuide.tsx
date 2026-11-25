import { useState, type ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, Check, Compass, ExternalLink, Lightbulb, Sun, Waves, Mountain, Flower2, CloudRain } from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { HomeContactForm } from "@/components/HomeContactForm";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { affiliateConfig } from "@/data/registry";
import { CuratedPartnerTourCard } from "@/components/CuratedPartnerTourCard";
import {
  bestTimeGuide as guide, monthFits, suitabilityColumns, seasonalFits,
  regionalRecommendations as regions, seasonDetails, type SeasonKey, type SeasonalFit
} from "@/data/bestTimeIsrael";
import masadaTourPhoto from "@/assets/guides/dead-sea-excursions/masada-ruins.webp";

// The primary guide image is supplied separately by guide.photo and never changed.
// Local secondary photos have two loss-aware WebP sizes, optimized for mobile.
const seasonPhotoSize = "(min-width: 1024px) 240px, (min-width: 640px) 192px, 128px";
const photoBySeason = {
  spring:{src:"/images/best-time-israel/spring-720.webp",srcSet:"/images/best-time-israel/spring-320.webp 320w, /images/best-time-israel/spring-720.webp 720w",alt:"Green Bahai Gardens terraces on Mount Carmel in Haifa"},
  summer:{src:"/images/best-time-israel/summer-720.webp",srcSet:"/images/best-time-israel/summer-320.webp 320w, /images/best-time-israel/summer-720.webp 720w",alt:"Sunny Tel Aviv promenade and Mediterranean beach"},
  autumn:{src:"/images/best-time-israel/autumn-720.webp",srcSet:"/images/best-time-israel/autumn-320.webp 320w, /images/best-time-israel/autumn-720.webp 720w",alt:"Historic stone lane in Jerusalem's Jewish Quarter"},
  winter:{src:"/images/best-time-israel/winter-720.webp",srcSet:"/images/best-time-israel/winter-320.webp 320w, /images/best-time-israel/winter-720.webp 720w",alt:"Eilat mountain range and the southern desert"}
} as const;

const seasonNames = ["spring","summer","autumn","winter"] as const;
const seasonLabels: Record<SeasonKey,string> = {spring:"Spring",summer:"Summer",autumn:"Autumn",winter:"Winter"};
const fits:Record<SeasonalFit,{short:string;style:string;dot:string}>={
  favourable:{short:"Good",style:"bg-emerald-50 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100",dot:"bg-emerald-600"},
  variable:{short:"Depends",style:"bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100",dot:"bg-amber-500"},
  challenging:{short:"Harder",style:"bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",dot:"bg-slate-500"}
};
const related:{title:string;to:LinkProps["to"];desc:string}[]=[
  {title:"My Jerusalem travel guide",to:"/travel-blog/jerusalem-travel-guide/",desc:"Plan Old City walks and outdoor heritage stops"},
  {title:"Beaches in Tel Aviv",to:"/travel-blog/beaches-in-tel-aviv/",desc:"Choose a supervised beach and check swimming conditions"},
  {title:"Sea of Galilee guide",to:"/attractions/sea-of-galilee/",desc:"Build a northern trip around the weather"},
  {title:"Explore the Dead Sea",to:"/attractions/dead-sea/",desc:"Beaches, landscapes and practical access"},
  {title:"Eilat & the Red Sea",to:"/attractions/eilat/",desc:"Compare southern coast and desert activities"},
  {title:"Visit Masada",to:"/attractions/masada/",desc:"Plan a heat-aware visit to the national park"}
];
const planning:{title:string;to:LinkProps["to"];desc:string}[]=[
  {title:"3 days in Israel",to:"/travel-blog/israel-itinerary-3-days/",desc:"A focused first-time sightseeing plan"},
  {title:"5 days in Israel",to:"/travel-blog/israel-itinerary-5-days/",desc:"Cities, coast and one extra region"},
  {title:"7 days in Israel",to:"/travel-blog/israel-itinerary-7-days/",desc:"Combine highlights at a more comfortable pace"},
  {title:"10 days in Israel",to:"/travel-blog/israel-itinerary-10-days/",desc:"Explore more regions without rushing"},
  {title:"Israeli holidays guide",to:"/travel-blog/calendar-of-events/",desc:"Check the dates that affect transport and openings"},
  {title:"Getting around Israel",to:"/travel-blog/getting-around-israel/",desc:"Compare trains, buses, taxis and private transfers"}
];
const partnerOptions=[
  {id:"tour-jerusalem-old-city-walk-viator@tours-jerusalem",productId:"jerusalem-old-city-walk",duration:"About 4 hours",platform:"Viator",title:"Jerusalem Old City walking tour",desc:"A guided heritage walk for a comfortable city-sightseeing day.",sub:"best_time_israel_jerusalem_old_city",image:"/images/attractions/old-jerusalem-cardo.webp",alt:"Ancient stone Cardo shopping street in Jerusalem Old City"},
  {id:"tour-jaffa-carmel-walk-getyourguide@tours-tel-aviv-jaffa",productId:"jaffa-carmel-walk",duration:"About 6 hours",platform:"GetYourGuide",title:"Jaffa & Carmel Market walking tour",desc:"A city-and-market option when the coast is more comfortable for walking.",sub:"best_time_israel_jaffa_carmel",image:"/images/attractions/jaffa-flea-market.webp",alt:"Historic Jaffa flea market streets and shops"},
  {id:"jslm-deadsea-masada-viator",productId:"masada-dead-sea-jerusalem",duration:"About 9 hours",platform:"Viator",title:"Masada & the Dead Sea from Jerusalem",desc:"An outdoor day that benefits from careful heat and weather planning.",sub:"best_time_israel_masada_dead_sea",image:masadaTourPhoto,alt:"Ancient stone remains at Masada above the Dead Sea"}
] as const;

function SectionHeading({id,title,intro}:{id:string;title:string;intro?:ReactNode}) {
  return <div className="mb-5"><h2 id={id+"-heading"} className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>{intro&&<p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}</div>;
}
function Tip({children}:{children:ReactNode}) {
  return <aside className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed text-amber-950 dark:border-amber-700/60 dark:bg-amber-950/20 dark:text-amber-100"><Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true"/><div>{children}</div></aside>;
}
function External({href,children}:{href:string;children:ReactNode}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary">{children}<ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true"/><span className="sr-only"> (opens in a new tab)</span></a>;
}
function Status({value}:{value:SeasonalFit}){
  const view=fits[value];
  return <span title={seasonalFits[value].hint} className={"inline-flex min-w-[76px] items-center justify-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold "+view.style}><span className={"h-2 w-2 shrink-0 rounded-full "+view.dot} aria-hidden="true"/>{view.short}</span>;
}
function GuideCard({item}:{item:{title:string;to:LinkProps["to"];desc:string}}){
  const photo=guideHeroPhotoForPath(String(item.to));
  return <Link to={item.to} className="editorial-card-link group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-primary">
    {photo&&<img src={photo.src} alt={photo.alt} width={560} height={350} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover"/>}
    <span className="flex flex-1 flex-col p-3 sm:p-4"><strong className="text-sm leading-snug group-hover:text-primary sm:text-base">{item.title}</strong><span className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.desc}</span></span>
  </Link>;
}
function MonthMatrix(){
  const [filter,setFilter]=useState<SeasonKey|"all">("all");
  const [selectedMonth,setSelectedMonth]=useState<string|null>(null);
  const visible=filter==="all"?monthFits:monthFits.filter(month=>month.season===filter);
  const activeMonth=visible.find(month=>month.month===selectedMonth);
  return <section id="months" aria-labelledby="months-heading" className="mt-12 scroll-mt-24">
    <SectionHeading id="months" title="Choose your month at a glance" intro="These are broad seasonal tendencies for typical outdoor comfort, not weather forecasts, price predictions or safety advice. Compare the activities you care about, then look at the region and specific travel dates."/>
    <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter the month comparison by season">
      {(["all",...seasonNames] as const).map(value=><button type="button" key={value} aria-pressed={filter===value} onClick={()=>{setFilter(value);setSelectedMonth(null);}} className={"min-h-10 rounded-full border px-3.5 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-primary "+(filter===value?"border-primary bg-primary text-primary-foreground":"bg-card hover:bg-secondary")}>{value==="all"?"All months":seasonLabels[value]}</button>)}
    </div>
    <div className="mb-4 flex flex-col items-start gap-2 text-xs text-muted-foreground" aria-label="Month comparison legend">
      {(["favourable","variable","challenging"] as const).map(value=><span key={value} className="inline-flex items-center gap-2"><Status value={value}/><span>{seasonalFits[value].hint}</span></span>)}
    </div>
    <div className="overflow-x-auto rounded-xl border bg-card" role="region" aria-label="Scroll horizontally to compare activities for each month" tabIndex={0}>
      <table className="w-full min-w-[850px] border-collapse text-left text-sm">
        <caption className="sr-only">Twelve-month indicative suitability for sightseeing, Mediterranean beach time, northern scenery, the Dead Sea and desert walks</caption>
        <thead className="bg-secondary/70 text-xs"><tr><th scope="col" className="sticky left-0 z-10 min-w-[108px] border-b bg-secondary px-3 py-3 font-semibold">Month</th>{suitabilityColumns.map(column=><th scope="col" title={column.description} className="min-w-[135px] border-b px-2 py-3 text-center font-semibold" key={column.key}>{column.label}</th>)}</tr></thead>
        <tbody>{visible.map((month,index)=><tr key={month.month} className={index%2===0?"bg-card":"bg-secondary/20"}>
          <th scope="row" className="sticky left-0 z-10 border-b bg-card px-3 py-3 align-middle font-semibold"><button type="button" aria-pressed={selectedMonth===month.month} aria-controls="month-insight" onClick={()=>setSelectedMonth(month.month)} className={"rounded-md px-2 py-1.5 text-left underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary "+(selectedMonth===month.month?"bg-primary text-primary-foreground":"")}>{month.month}<span className="mt-0.5 block text-[11px] font-normal opacity-75">{seasonLabels[month.season]}</span></button></th>
          {suitabilityColumns.map(column=><td className="border-b px-2 py-2 text-center" key={column.key}><Status value={month[column.key]}/></td>)}
        </tr>)}</tbody>
      </table>
    </div>
    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">“Dead Sea / Masada walks” and “Desert walks” both rate exposed outdoor sightseeing, not swimming at the Dead Sea or resort activities in Eilat.</p>
    <div id="month-insight" role="status" aria-live="polite" className="mt-5 rounded-xl border bg-secondary/20 p-4 sm:p-5">
      {activeMonth ? <>
        <h3 className="text-base font-bold">My planning note for {activeMonth.month}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{activeMonth.insight}</p>
      </> : <p className="text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Want month-specific advice?</strong> Select any month in the left column to see one practical planning note without scrolling through twelve separate cards.</p>}
    </div>
  </section>;
}
function RegionCards(){
  const icons=[Compass,Waves,Mountain,Sun,Mountain] as const;
  return <section id="regions" aria-labelledby="regions-heading" className="mt-12 scroll-mt-24">
    <SectionHeading id="regions" title="Best time to visit each region" intro="I choose the month after choosing the places. A week in Jerusalem and the Galilee needs different planning from a seaside holiday in Eilat or an exposed hike near Masada."/>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {regions.map((region,i)=>{const Icon=icons[i]!;return <article key={region.id} className="flex min-w-0 flex-col rounded-xl border bg-card p-4 sm:p-5">
        <div className="flex items-start gap-2"><span className="rounded-lg bg-secondary p-2 text-primary"><Icon className="h-5 w-5" aria-hidden="true"/></span><div><h3 className="text-lg font-bold leading-snug">{region.name}</h3><p className="mt-1 text-xs font-semibold text-primary">{region.goodMonths}</p></div></div>
        <p className="mt-3 text-sm leading-relaxed">{region.note}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{region.caution}</p>
        <Link to={region.to as LinkProps["to"]} className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-primary hover:underline">{region.linkLabel}<ArrowUpRight className="h-4 w-4" aria-hidden="true"/></Link>
      </article>})}
    </div>
  </section>;
}
function SeasonSections(){
  return <section id="seasons" aria-labelledby="seasons-heading" className="mt-12 scroll-mt-24">
    <SectionHeading id="seasons" title="Israel through the four seasons" intro="Each season can work for a different kind of trip. Here is how I would plan the activities, not just the packing list."/>
    <div className="space-y-10">
      {seasonDetails.map((season,i)=>{
        const photo=photoBySeason[season.id];
        const Icon=[Flower2,Sun,CalendarDays,CloudRain][i]!;
        return <article id={season.id} aria-labelledby={season.id+"-heading"} key={season.id} className="flow-root scroll-mt-28 rounded-2xl border bg-card p-4 sm:p-6">
          <div className="flex items-start gap-3"><span className="rounded-lg bg-secondary p-2 text-primary"><Icon className="h-5 w-5" aria-hidden="true"/></span><div><p className="text-xs font-semibold uppercase tracking-wide text-primary">{season.months}</p><h3 id={season.id+"-heading"} className="mt-1 text-xl font-bold sm:text-2xl">{season.title}</h3></div></div>
          <figure className="float-right mb-3 ml-4 mt-3 w-32 overflow-hidden rounded-xl sm:mb-4 sm:ml-6 sm:w-48 lg:w-60"><img src={photo.src} srcSet={photo.srcSet} sizes={seasonPhotoSize} alt={photo.alt} width={480} height={300} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover"/></figure>
          <p className="mt-3 text-sm font-semibold leading-relaxed">{season.summary}</p>
          <p className="mt-3 leading-relaxed">{season.paragraphs[0]}</p>
          <p className="mt-4 leading-relaxed">{season.paragraphs[1]}</p>
          <div className="clear-both mt-5 max-w-3xl"><Tip>{season.tip}</Tip></div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">{season.links.map(link=><Link key={link.to} to={link.to as LinkProps["to"]} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">{link.label}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></Link>)}</div>
        </article>;
      })}
    </div>
  </section>;
}
function HolidayAndWeather(){
  return <section id="planning" aria-labelledby="planning-heading" className="mt-12 scroll-mt-24">
    <SectionHeading id="planning" title="Holidays, weather and planning around your dates" intro="The month gives you a starting point. Religious calendars, transport schedules, weather warnings and your particular itinerary determine what is practical."/>
    <div className="grid gap-5 lg:grid-cols-2">
      <article className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="text-lg font-bold">Holidays can change the entire day</h3>
        <p className="mt-2 text-sm leading-relaxed">Passover and the autumn Jewish holidays change dates on the Gregorian calendar every year. Shabbat begins on Friday evening. During some holidays and on Shabbat, public transport is limited or unavailable, and individual attractions and shops may close or change hours. Easter and major religious celebrations also affect visits to churches and heritage sites.</p>
        <p className="mt-3 text-sm leading-relaxed">I recommend checking the specific dates before booking a hotel, a tour or an airport arrival. A busy holiday can be rewarding, but it needs a different travel plan.</p>
        <div className="mt-4 text-sm"><Link className="font-semibold text-primary hover:underline" to="/travel-blog/calendar-of-events/">Israel’s calendar of events</Link></div>
      </article>
      <article className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="text-lg font-bold">Check your whole journey, not just the air temperature</h3>
        <p className="mt-2 text-sm leading-relaxed">A Jerusalem morning may call for a jacket while a stop near the Dead Sea needs sun protection. Rain, sea conditions and wind can matter as much as temperature. In winter, shorter daylight affects opening hours and how many outdoor stops you can enjoy.</p>
        <p className="mt-3 text-sm leading-relaxed">Hotel prices depend on location, events, demand and school holidays. I recommend comparing the total trip cost, including flights and accommodation.</p>
        <p className="mt-3 text-sm"><External href="https://ims.gov.il/en/ClimateAtlas">Official climate information</External></p>
      </article>
    </div>
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      <Tip><strong>Hot-weather days:</strong> Start exposed sightseeing early, schedule shade and indoor breaks, carry adequate water and sun protection, and follow the conditions at supervised swimming beaches. A desert trip can be uncomfortable or unsafe in extreme heat.</Tip>
      <Tip><strong>Rain and desert floods:</strong> Flash floods can occur downstream of rainfall. Never enter a desert streambed under a flood warning; check the <External href="https://ims.gov.il/en/warning">official weather alerts</External> and <External href="https://en.parks.org.il/">park notices</External> before setting out.</Tip>
    </div>
    <div className="mt-6 rounded-xl border bg-secondary/30 p-4 sm:p-5">
      <h3 className="font-bold">My simple booking checklist</h3>
      <ul className="mt-3 grid gap-x-7 gap-y-2 sm:grid-cols-2">{guide.checklist.map(item=><li key={item} className="flex items-start gap-2 text-sm leading-relaxed"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true"/>{item}</li>)}</ul>
    </div>
  </section>;
}
function CuratedTours(){
  const offers=partnerOptions.map(item=>{
    const tracking=affiliateConfig[item.id]?.trackingUrl;
    if(!tracking||!/^https:\/\/(?:viator|getyourguide)\.tpm\.li\//.test(tracking))return null;
    const url=new URL(tracking);
    url.searchParams.set("sub_id",item.sub);
    return {...item,url:url.toString()};
  }).filter((x):x is NonNullable<typeof x>=>Boolean(x));
  if(!offers.length)return null;
  return <section id="tours" aria-labelledby="tours-heading" className="mt-12 scroll-mt-24">
    <SectionHeading id="tours" title="Guided experiences to consider" intro="For a trip with fixed dates, these third-party activities can help you choose what fits the season. Check each provider's availability, actual itinerary, weather arrangements and cancellation terms before booking."/>
    <div className="grid gap-4 md:grid-cols-3" data-testid="best-time-seasonal-tours">
      {offers.map(item=><CuratedPartnerTourCard key={item.id} title={item.title} description={item.desc} platform={item.platform} image={item.image} alt={item.alt} href={item.url} productId={item.productId} duration={item.duration} offerId={item.sub} pageId="best_time_to_visit_israel"/>)}
    </div>
  </section>;
}
export function BestTimeIsraelGuide(){
  const nav=[
    ["months","Month by month"],["regions","By region"],["seasons","Four seasons"],
    ["planning","Weather & holidays"],["tours","Guided experiences"],["faq","FAQ"],
    ["explore-more","Explore more"],["next-trip","Plan your trip"],["contact","Contact me"]
  ] as const;
  return <main className="mx-auto max-w-5xl px-4 pb-10"><article>
    <header className="pt-6"><Breadcrumbs items={[{name:"Home",to:"/"},{name:"Travel guides",to:"/travel-blog/"},{name:"Best Time to Visit Israel",to:"/travel-blog/best-time-to-visit-israel/"}]}/>
      <GuideHeroLayout image={<GuideHeroMedia src={guide.photo.src} alt={guide.photo.alt}/>}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Israel trip planning · Weather & seasons</p>
        <h1 className="guide-page-title mt-2">{guide.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed" data-guide-intro>{guide.intro}</p>
        <PageUpdated date={guide.updatedAt||"2026-11-21"}/>
      </GuideHeroLayout><AuthorCard/>
    </header>
    <section className="mt-8 rounded-xl border border-primary/20 bg-secondary/40 p-5 sm:p-6" aria-label="My quick recommendation"><h2 className="text-xl font-bold">When I would visit</h2>
      <p className="mt-2 leading-relaxed">{guide.answer}</p>
    </section>
    <OnThisPage sections={nav}/>
    <MonthMatrix/>
    <RegionCards/>
    <SeasonSections/>
    <HolidayAndWeather/>
    <CuratedTours/>
    <FaqList faqs={guide.faqs}/>
    <section id="explore-more" aria-labelledby="explore-more-heading" className="mt-12 scroll-mt-24">
      <SectionHeading id="explore-more" title="Explore Israel by season and region" intro="These guides help you connect the time of year with the places and activities you actually want to experience."/>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{related.map(item=><GuideCard key={item.to} item={item}/>)}</div>
    </section>
    <section id="next-trip" aria-labelledby="next-trip-heading" className="mt-12 scroll-mt-24">
      <SectionHeading id="next-trip" title="Plan the rest of your Israel trip" intro="Once you've chosen a season, use my itineraries, holiday information and transport advice to build a realistic visit."/>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{planning.map(item=><GuideCard key={item.to} item={item}/>)}</div>
    </section>
    <HomeContactForm key="best-time-to-visit-israel" guide={{
      heading:"Planning your trip to Israel?",
      introduction:"I'm Moshe Barak. Tell me your travel dates and the places you want to see. I can discuss an airport transfer, private sightseeing with a driver or a day trip that suits your itinerary and the season.",
      subject:"",
      placeholder:"Travel dates, places to visit, pickup location, passengers or your question…"
    }}/>
    <SourcesDisclosure>
      <p className="leading-relaxed">Seasonal recommendations describe typical patterns, not precise forecasts. I recommend checking these official resources for your dates:</p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li><External href="https://ims.gov.il/en/ClimateAtlas">Israel Meteorological Service - climate atlas</External></li>
        <li><External href="https://ims.gov.il/en/warning">Israel Meteorological Service - current warnings</External></li>
        <li><External href="https://en.parks.org.il/">Israel Nature and Parks Authority - park notices and visitor information</External></li>
        <li><External href="https://visit.tel-aviv.gov.il/info/shabbat">Tel Aviv official visitor information - Shabbat</External></li>
      </ul>
    </SourcesDisclosure>
  </article></main>;
}
