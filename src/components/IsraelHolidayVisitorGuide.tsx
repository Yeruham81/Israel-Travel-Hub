import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { CalendarDays, CheckCircle2, Clock3, ExternalLink, Lightbulb, Train, Wallet, MapPinned } from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { HomeContactForm } from "@/components/HomeContactForm";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { guideContactCopy } from "@/lib/guide-contact";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { holidayGuideGroups, holidayGuideSources, holidayImpactLevels, schoolCalendarPlanning, type HolidayGuideItem } from "@/data/israelHolidayVisitorGuide";

export const HOLIDAY_GUIDE_PATH = "/travel-blog/calendar-of-events/";
export const HOLIDAY_GUIDE_TITLE = "Israel's Calendar of events: A practical guide for visitors";
export const HOLIDAY_GUIDE_DESCRIPTION = "Plan your Israel trip around Shabbat, religious holidays, national remembrance days and school breaks, with transport, opening-hour and crowd advice.";
export const HOLIDAY_GUIDE_UPDATED = "2026-11-22";
export const HOLIDAY_GUIDE_PHOTO = {src:"/images/holiday-guide/israel-calendar-of-events.webp",alt:"Close-up of a wall calendar with highlighted dates"};

const TOC = [
  ["overview","What visitors need to know"],["travel-effects","Closures, crowds & prices"],
  ["weekly","Shabbat & holiday eves"],["jewish-major","Major Jewish holidays"],
  ["other-jewish","Other Jewish dates"],["national","National days"],
  ["other-traditions","Muslim, Christian & Druze"],["practical","Planning checklist"],
  ["dates","Check the exact dates"],["faq","Common questions"],
  ["explore-more","More Israel guides"],["contact","Contact me"],
] as const;
const IMPACT_CLASS = {
  "very-high":"border-rose-300 bg-rose-50 text-rose-950",
  "high":"border-amber-300 bg-amber-50 text-amber-950",
  "moderate":"border-sky-200 bg-sky-50 text-sky-900",
  "local":"border-slate-200 bg-slate-100 text-slate-800",
} as const;
const rows=[
  {situation:"Yom Kippur",transport:"Normal public transport stops and flight operations are suspended",visitor:"Most businesses close; arrange meals and stay near your accommodation",pressure:"Not an ordinary sightseeing or transfer day"},
  {situation:"Shabbat & major Jewish festival days",transport:"Most trains and regular buses do not operate; services end early on the eve",visitor:"Closures vary across cities, neighbourhoods and operators",pressure:"A confirmed transfer or walkable itinerary may be necessary"},
  {situation:"Chol HaMoed (intermediate festival days)",transport:"Many regular services run; special schedules and high demand are possible",visitor:"Family attractions, national parks and hotels can be especially busy",pressure:"Book popular visits and lodging in advance"},
  {situation:"National memorial days & Independence Day",transport:"Ceremonies, road closures and holiday schedules affect particular routes",visitor:"Sirens, solemn observance, then celebrations and family outings",pressure:"Check the exact city and programme"},
  {situation:"Muslim, Christian & Druze holidays",transport:"Local schedules and road access may change around major celebrations",visitor:"Religious sites and local businesses may open differently",pressure:"Expect neighbourhood-level differences, not a nationwide shutdown"},
  {situation:"School breaks & summer",transport:"Normal weekday public transport generally continues",visitor:"Beach towns, attractions and accommodation can see high demand",pressure:"Budget and reserve early when dates are popular"},
];
const planning=[
  {title:"Transport before and after a holiday",text:"Check when the last train or bus leaves before the holiday and when services resume. Pay particular attention to transport schedules on Fridays and holiday eves."},
  {title:"Hotel prices and minimum stays",text:"Demand for hotels often rises during Passover, Sukkot, school holidays and major pilgrimage events. Compare refundable rates, check any minimum stay and book early where flexibility matters."},
  {title:"Restaurants, shops and grocery supplies",text:"Restaurants may close, change menus or operate on different hours. Buy essentials before a major holiday and ask your hotel about breakfast and dinner arrangements."},
  {title:"Museums, parks and religious sites",text:"Museums, national parks, the Western Wall area and churches follow different calendars. Check opening hours and booking requirements on the attraction's official website."},
  {title:"Road closures and local crowds",text:"Purim parades, memorial ceremonies, Jerusalem Day events, religious processions and pilgrimage gatherings can change meeting points or traffic, even on an otherwise normal weekday."},
  {title:"Departure, flights and airport transfers",text:"Ben Gurion Airport normally operates during Shabbat, although airlines have different policies; Yom Kippur is a major exception. Check your flight times and available airport transport before travelling."},
];
const faq=[
  {q:"Does Israel shut down for every Jewish holiday?",a:"No. Shabbat and the main Jewish festival days often bring major transport and business-hour changes, while Hanukkah, Purim and intermediate festival days have different rules. Shops and services in non-Jewish neighbourhoods may remain open."},
  {q:"Do trains and buses operate on Shabbat?",a:"Israel Railways and most regular bus routes generally stop for Shabbat, but some limited weekend municipal and local services exist. Check whether the weekend service connects to the airport."},
  {q:"Can I fly into or out of Israel on Yom Kippur?",a:"Ben Gurion Airport suspends regular flights during Yom Kippur. Check the Israeli Airports Authority and your airline for precise times; do not plan a flight or connection based on the day before or after without confirmation."},
  {q:"Why do Jewish holiday dates change each year?",a:"Jewish holidays follow the Hebrew calendar, so their dates change each year on the international calendar. Jewish holidays normally begin at sunset on the preceding civil evening. Some dates also differ between Israel and communities abroad."},
  {q:"What is Chol HaMoed?",a:"Chol HaMoed means the intermediate days of Passover or Sukkot. Transport and businesses generally follow different schedules during these days than on the main festival days. School holidays and domestic tourism can make attractions and hotels crowded."},
  {q:"Are hotels and tours more expensive during holidays?",a:"They can be. Demand often rises around Passover, Sukkot, long school breaks and important pilgrimage dates. Hotel and tour prices vary during holidays. Compare prices and booking conditions for your travel dates."},
  {q:"Do Christmas and Easter close transport nationwide?",a:"Public transport generally operates as usual during Christmas and Easter. Church visiting hours, processions, road access and accommodation demand may change in particular places such as Jerusalem, Nazareth and Bethlehem."},
  {q:"Will Ramadan affect a visit to Jerusalem?",a:"It can affect meal hours, mosque access, Old City crowds and local traffic, particularly near Friday prayers and at iftar. Nationwide public transport generally follows its regular schedule during Ramadan. Verify local arrangements and be respectful around worshippers."},
  {q:"Are Muslim holiday dates fixed in advance?",a:"Some dates depend on religious and local confirmation, so published dates can shift by a day. Check an updated holiday calendar close to your visit."},
];
const related=[
  {to:"/travel-blog/what-to-eat-in-israel/" as const,title:"What to eat in Israel",note:"Local foods and markets for an enjoyable visit"},
  {to:"/travel-blog/from-ben-gurion-airport-on-shabbat/" as const,title:"Arriving at the airport on Shabbat",note:"Train, taxi and weekend alternatives at Ben Gurion Airport"},
  {to:"/travel-blog/getting-around-israel/" as const,title:"Getting around Israel",note:"Intercity trains, buses, local travel and private transport"},
  {to:"/travel-blog/best-time-to-visit-israel/" as const,title:"When to visit Israel",note:"Weather, school breaks and seasonal crowds"},
  {to:"/travel-blog/jerusalem-travel-guide/" as const,title:"My Jerusalem travel guide",note:"Sightseeing and practical planning in the capital"},
  {to:"/travel-blog/churches-in-jerusalem/" as const,title:"Churches in Jerusalem",note:"Plan visits around services, pilgrimages and opening hours"},
];
const linkStyle="font-semibold text-primary underline-offset-4 hover:underline";
function Heading({id,children,intro}:{id:string;children:string;intro?:string}){
  return <div className="mb-5"><h2 id={id+"-heading"} className="text-2xl font-bold tracking-tight sm:text-3xl">{children}</h2>{intro&&<p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}</div>;
}
function MyTip({children}:{children:ReactNode}){
  return <aside className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3.5 text-sm leading-relaxed text-amber-950"><Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true"/><p><strong>My tip:</strong> {children}</p></aside>;
}
function HolidayRow({item}:{item:HolidayGuideItem}) {
  const impact=holidayImpactLevels[item.impact];
  return <article id={"holiday-"+item.id} data-holiday-card className="scroll-mt-28 overflow-hidden rounded-xl border bg-card">
    <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-6">
      <div className="min-w-0">
        <h3 className="text-lg font-bold leading-snug">{item.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{item.season}</p>
        <span className={"mt-3 inline-flex rounded-md border px-2 py-1 text-xs font-semibold "+IMPACT_CLASS[item.impact]}>{impact.label}</span>
      </div>
      <div className="min-w-0">
        <p className="text-sm leading-relaxed">{item.why}</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <p className="text-sm leading-relaxed text-muted-foreground"><strong className="block text-foreground">Transport</strong>{item.transport}</p>
          <p className="text-sm leading-relaxed text-muted-foreground"><strong className="block text-foreground">For visitors</strong>{item.visitor}</p>
        </div>
      </div>
    </div>
    <p className="border-t bg-secondary/20 px-4 py-3 text-sm leading-relaxed sm:px-5"><strong className="text-primary">My tip:</strong> {item.tip}</p>
  </article>;
}
function RelatedGuides(){
  return <section id="explore-more" className="mt-12 scroll-mt-24" aria-labelledby="explore-more-heading">
    <Heading id="explore-more" intro="More of my guides for choosing dates, planning journeys and visiting important places.">Plan the rest of your trip</Heading>
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {related.map(item=>{
        const photo=guideHeroPhotoForPath(item.to);
        return <Link key={item.to} to={item.to} className="editorial-card-link group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/40 hover:bg-secondary/20">
          {photo&&<img src={photo.src} alt={photo.alt} width={640} height={360} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover"/>}
          <span className="flex flex-1 flex-col p-3 sm:p-4"><strong className="text-sm leading-snug sm:text-base">{item.title}</strong><span className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.note}</span></span>
        </Link>;
      })}
    </div>
  </section>;
}
export function IsraelHolidayVisitorGuidePage(){
  return <main className="mx-auto max-w-5xl px-4 pb-12"><article>
    <header className="pt-6">
      <Breadcrumbs items={[{name:"Home",to:"/"},{name:"Travel guides",to:"/travel-blog/"},{name:"Calendar of events",to:HOLIDAY_GUIDE_PATH}]}/>
      <GuideHeroLayout image={<GuideHeroMedia src={HOLIDAY_GUIDE_PHOTO.src} alt={HOLIDAY_GUIDE_PHOTO.alt} width={640} height={480}/>}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Practical Israel travel guide</p>
        <h1 className="guide-page-title mt-2">{HOLIDAY_GUIDE_TITLE}</h1>
        <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed">From Shabbat and Yom Kippur to Passover, Ramadan, Christmas and national memorial days, special dates shape daily life in Israel. I'll explain what visitors should expect before choosing travel days, hotels and sightseeing plans.</p>
        <PageUpdated date={HOLIDAY_GUIDE_UPDATED}/>
      </GuideHeroLayout>
      <AuthorCard/>
    </header>
    <section id="overview" aria-labelledby="overview-heading" className="mt-8 scroll-mt-24 rounded-xl border border-primary/20 bg-secondary/40 p-5 sm:p-6">
      <h2 id="overview-heading" className="text-xl font-bold">What matters most when planning your visit?</h2>
      <p className="mt-2 leading-relaxed">Check whether your dates include <strong>Shabbat or a major Jewish festival day</strong>, whether you are travelling on a <strong>holiday eve</strong>, and whether school holidays or religious pilgrimages will bring extra crowds. <strong>Yom Kippur needs particular care</strong> because regular travel and normal flight operations stop. Other religious and national events may affect traffic, opening hours and local services.</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">This guide explains recurring traditions and their typical effects. It is not a live events or performance directory. For actual dates, consult <a href="https://www.hebcal.com/holidays/?i=on" target="_blank" rel="noopener noreferrer" className={linkStyle}>the Israel Jewish holiday calendar</a> and check schedules with the relevant operator.</p>
    </section>
    <OnThisPage sections={TOC}/>
    <section id="travel-effects" className="mt-11 scroll-mt-24" aria-labelledby="travel-effects-heading">
      <Heading id="travel-effects" intro="The same word 'holiday' can mean very different things for transport, shops and visitor attractions.">Which dates affect travel most?</Heading>
      <div role="region" tabIndex={0} aria-label="Typical impact of Israeli holidays on transport and visitor plans" className="overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary">
        <table className="w-full min-w-[650px] text-left text-sm leading-relaxed">
          <caption className="sr-only">Comparison of common Israeli holiday and observance travel effects</caption>
          <thead className="bg-secondary/60"><tr>{["Date or situation","Public transport","Businesses & attractions","What I would plan"].map(s=><th key={s} scope="col" className="border-b px-3 py-3 font-semibold">{s}</th>)}</tr></thead>
          <tbody>{rows.map(r=><tr key={r.situation} className="border-b last:border-0"><th scope="row" className="p-3 font-semibold">{r.situation}</th><td className="p-3">{r.transport}</td><td className="p-3">{r.visitor}</td><td className="p-3">{r.pressure}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-4"><Clock3 className="mb-2 h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-bold">Dates begin at sunset</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Jewish festivals start the evening before the main civil date. Last buses and trains may leave well before sunset.</p></div>
        <div className="rounded-xl border bg-card p-4"><Train className="mb-2 h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-bold">Main festival days vs. intermediate days</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">On Passover and Sukkot, the first and final festival days differ from Chol HaMoed for work and transport.</p></div>
        <div className="rounded-xl border bg-card p-4"><MapPinned className="mb-2 h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-bold">Different cities, different rhythms</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Business hours and holiday customs vary among Jerusalem, Tel Aviv, Haifa, Nazareth and other communities.</p></div>
      </div>
      <div className="mt-5 rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-bold">{schoolCalendarPlanning.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{schoolCalendarPlanning.body}</p>
      </div>
      <div className="mt-5"><MyTip>Shop opening hours vary by location and by the stage of the holiday: the eve, a full festival day or an intermediate day. Check the opening hours of the places you plan to visit.</MyTip></div>
    </section>
    {holidayGuideGroups.map(group=><section key={group.id} id={group.id} className="mt-12 scroll-mt-24" aria-labelledby={group.id+"-heading"}>
      <Heading id={group.id} intro={group.intro}>{group.title}</Heading>
      <div className="space-y-3">{group.items.map(item=><HolidayRow key={item.id} item={item}/>)}</div>
      {group.id==="weekly"&&<p className="mt-4 text-sm leading-relaxed">For airport arrivals over the weekend, read my <Link to="/travel-blog/from-ben-gurion-airport-on-shabbat/" className={linkStyle}>Shabbat airport transport guide</Link>. For regular rail, bus and taxi choices, see <Link to="/travel-blog/getting-around-israel/" className={linkStyle}>getting around Israel</Link>.</p>}
      {group.id==="other-traditions"&&<p className="mt-4 text-sm leading-relaxed">If Jerusalem churches are on your itinerary, check visiting times and liturgical access in my <Link to="/travel-blog/churches-in-jerusalem/" className={linkStyle}>Jerusalem churches guide</Link>. These are active places of worship.</p>}
    </section>)}
    <section id="practical" className="mt-12 scroll-mt-24" aria-labelledby="practical-heading">
      <Heading id="practical" intro="A few checks before you pay for your flights, hotel and sightseeing can prevent the most common holiday-related surprises.">My practical event-date planning checklist</Heading>
      <div className="grid gap-3 sm:grid-cols-2">{planning.map(p=><article key={p.title} className="rounded-xl border bg-card p-4 sm:p-5"><h3 className="flex items-start gap-2 font-bold"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true"/>{p.title}</h3><p className="mt-2 pl-7 text-sm leading-relaxed text-muted-foreground">{p.text}</p></article>)}</div>
      <div className="mt-5"><MyTip>I would build some flexibility into a trip during Passover, Sukkot or a major pilgrimage period. A nearby alternative attraction and a confirmed return journey are often more useful than an overpacked itinerary.</MyTip></div>
    </section>
    <section id="dates" className="mt-12 scroll-mt-24" aria-labelledby="dates-heading">
      <Heading id="dates" intro="Holiday dates can move between years. Islamic dates may also need local confirmation, and some Christian observances follow different church calendars.">Check the exact dates before you travel</Heading>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-secondary/40 p-5"><CalendarDays className="mb-2 h-6 w-6 text-primary" aria-hidden="true"/><h3 className="text-lg font-bold">Find the exact holiday dates</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Jewish holidays move on the civil calendar, and holiday dates observed in Israel can differ from those followed abroad. Muslim dates may be confirmed closer to the observance. Use the appropriate calendar for your travel year.</p><div className="mt-3 flex flex-wrap gap-x-4 gap-y-2"><a href="https://www.hebcal.com/holidays/?i=on" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Jewish dates in Israel <ExternalLink className="h-4 w-4" aria-hidden="true"/></a><a href="https://www.timeanddate.com/holidays/israel/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Other holidays and observances <ExternalLink className="h-4 w-4" aria-hidden="true"/></a></div></div>
        <div className="rounded-xl border bg-card p-5"><Wallet className="mb-2 h-6 w-6 text-primary" aria-hidden="true"/><h3 className="text-lg font-bold">Confirm services and prices</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Holiday travel can involve early departures, different taxi tariff periods and busy hotels. Check the provider's holiday timetable and total price for your date.</p><a href="https://rail.co.il/?lan=en&page=holidays-information" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Official Israel Railways holiday information <ExternalLink className="h-4 w-4" aria-hidden="true"/></a></div>
      </div>
    </section>
    <FaqList faqs={faq}/>
    <RelatedGuides/>
    <HomeContactForm showTripadvisorBesidePortraitMobile guide={guideContactCopy(HOLIDAY_GUIDE_TITLE,"itinerary")}/>
    <SourcesDisclosure>
      <p className="mb-3 text-sm leading-relaxed">I use Israeli public transport and holiday guidance to explain the usual patterns, not to guarantee an individual opening time, price or train departure. Check dates and arrangements with the relevant operator before travelling.</p>
      <ul className="space-y-2 text-sm">{holidayGuideSources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">{source.label}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true"/></a></li>)}</ul>
    </SourcesDisclosure>
  </article></main>;
}
