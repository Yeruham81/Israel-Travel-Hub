import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Church, Clock3, ExternalLink, Lightbulb, MapPin, Ticket } from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { HomeContactForm } from "@/components/HomeContactForm";
import { neighborhoodTripContactCopy } from "@/lib/guide-contact";
import { churchAreas, churchesSourceUrl, jerusalemChurches, type JerusalemChurch } from "@/data/jerusalemChurches";
import { affiliateConfig } from "@/data/registry";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import hero from "@/assets/guides/holy-sepulchre.jpg";
import oldCityPhoto from "@/assets/attractions-hub/card-old-city-jerusalem-420.webp";
import olivePhoto from "@/assets/attractions-hub/card-mount-of-olives-420.webp";
import zionPhoto from "@/assets/attractions-hub/card-mount-zion-420.webp";
import bethlehemPhoto from "@/assets/guides/2026-10/jerusalem-to-bethlehem.webp";
import cityPhoto from "@/assets/attractions-hub/related-jerusalem-360.webp";
import calendarPhoto from "@/assets/guides/2026-10/calendar-of-events.webp";
import guideTourPhoto from "@/assets/home/guided-tour-card.webp";
import bethlehemTourPhoto from "@/assets/guides/bethlehem/nativity-courtyard.jpg";

const updatedAt = "2026-11-21";
const sections = [
  ["choose", "Choose your church visits"], ["church-map", "Map of churches"],
  ["old", "Old City churches"], ["olives", "Mount of Olives"],
  ["zion", "Mount Zion"], ["karem", "Ein Karem"],
  ["routes", "Suggested routes"], ["practical", "Visitor information"],
  ["tours", "Guided tours"], ["faq", "Frequently asked questions"],
  ["explore-more", "Explore more"], ["contact", "Contact me"],
] as const;
const related = [
  {title:"Explore the Old City",to:"/attractions/old-city-jerusalem/" as const,text:"Historic quarters, gates and walking routes",photo:oldCityPhoto,alt:"Old City of Jerusalem"},
  {title:"Mount of Olives visitor guide",to:"/attractions/mount-of-olives/" as const,text:"Plan the hillside churches and viewpoints",photo:olivePhoto,alt:"Mount of Olives in Jerusalem"},
  {title:"Explore Mount Zion",to:"/attractions/mount-zion/" as const,text:"Dormition Abbey, the Cenacle and Gallicantu",photo:zionPhoto,alt:"Mount Zion in Jerusalem"},
  {title:"Jerusalem to Bethlehem",to:"/travel-blog/jerusalem-to-bethlehem/" as const,text:"Nativity Church and practical travel options",photo:bethlehemPhoto,alt:"Church of the Nativity in Bethlehem"},
  {title:"Jerusalem travel guide",to:"/travel-blog/jerusalem-travel-guide/" as const,text:"Plan your days, areas and connections",photo:cityPhoto,alt:"Jerusalem Old City panorama"},
  {title:"Israel's calendar of events",to:"/travel-blog/calendar-of-events/" as const,text:"Religious dates and holidays that affect visits",photo:calendarPhoto,alt:"Calendar with dates highlighted"},
];
const tours = [
  {title:"Old City of Jerusalem guided walking tour",platform:"Viator",duration:"About 4 hours",text:"Guided walk through historic religious landmarks; verify which church interiors are included.",affiliateKey:"churches-jerusalem-old-city-walk-viator",image:"/images/attractions/old-jerusalem-via-dolorosa.webp",alt:"Via Dolorosa street in Jerusalem",startingPriceUsd:55,rating:4.8,reviewCount:71},
  {title:"Private Jerusalem Old City walking tour",platform:"Viator",duration:"3–4 hours",text:"Private guiding through the Old City; confirm access to the Holy Sepulchre and other chapels.",affiliateKey:"churches-jerusalem-private-oldcity-viator",image:guideTourPhoto,alt:"Travelers on a guided Jerusalem tour"},
  {title:"Bethlehem half-day guided tour from Jerusalem",platform:"GetYourGuide",duration:"About 4 hours",text:"A separate Bethlehem outing centred on the Nativity Church and nearby Christian sites.",affiliateKey:"churches-jerusalem-bethlehem-halfday-gyg",startingPriceUsd:75,rating:4.8,reviewCount:610,image:bethlehemTourPhoto,alt:"Courtyard of the Church of the Nativity in Bethlehem"},
];
const faqs = [
  {q:"Which churches are essential on a first visit to Jerusalem?",a:"For most first visits, I would prioritise the Church of the Holy Sepulchre and selected stops along the Via Dolorosa. Add Gethsemane on the Mount of Olives or Dormition Abbey on Mount Zion if your time and interests allow."},
  {q:"Can I visit all the major churches in one day?",a:"Not comfortably. The sites lie in four distinct areas, and opening windows, religious services, queues and steep paths affect visits. Choose one or two nearby clusters rather than trying to see every church."},
  {q:"Are Jerusalem churches free to enter?",a:"Many offer free general entry, but some compounds, archaeological areas and towers charge separately. St Anne, Pater Noster, the Chapel of the Ascension and the Redeemer tower have published admission charges."},
  {q:"Is the Garden Tomb the same place as the Church of the Holy Sepulchre?",a:"No. They are separate places. The Holy Sepulchre is the traditional site of the crucifixion and resurrection for numerous historic churches; the Garden Tomb is a different site popular with some Protestant visitors."},
  {q:"Is the Mount of Olives walk accessible to everyone?",a:"No. The slope is steep, paths can be uneven and some compounds have stairs. A drive to an upper viewpoint can avoid the uphill climb, but the descent may still be difficult. Confirm accessibility for specific sites."},
  {q:"Can tourists attend a religious service or arrange group prayer?",a:"Visitor opening hours do not automatically authorise worship participation, private ceremonies or group services. Contact the church or responsible community before arranging group prayer."},
  {q:"Do holidays affect church opening times?",a:"Yes. Christian feast days, Holy Week, worship services, Jewish holidays and special events may change access. Check the relevant church and Israel's events calendar before travelling."},
];

function OutLink({href,children}:{href:string;children:ReactNode}) {
  return <a href={href} target="_blank" rel={href.includes(".tpm.li/")?"sponsored noopener noreferrer":"noopener noreferrer"} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">{children}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true"/><span className="sr-only"> (opens in a new tab)</span></a>;
}
function Heading({id,title,intro}:{id:string;title:string;intro?:string}) {
  return <div className="mb-5"><h2 id={id+"-heading"} className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>{intro&&<p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}</div>;
}
function Tip({children}:{children:ReactNode}) {
  return <aside className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed text-amber-950"><Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true"/><p>{children}</p></aside>;
}
function ChurchCard({church}:{church:JerusalemChurch}) {
  const locationUrl=`https://www.google.com/maps/dir/?api=1&destination=${church.lat}%2C${church.lon}`;
  return <article id={"church-"+church.id} data-church-card="horizontal" className="scroll-mt-28 overflow-hidden rounded-2xl border bg-card shadow-sm">
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_270px] lg:items-start lg:gap-6 lg:p-5">
      <figure className="min-w-0 bg-secondary/20 lg:col-start-2 lg:row-start-1 lg:overflow-hidden lg:rounded-xl">
        {church.photo
          ? <img src={church.photo} alt={church.photoAlt} width={960} height={540} loading="lazy" decoding="async" className="aspect-[16/9] w-full bg-secondary/20 object-contain"/>
          : <div data-church-photo-slot={church.id} aria-label={"Photograph of "+church.name+" to be added"} className="flex aspect-[16/9] w-full items-center justify-center bg-secondary/50"><Church className="h-12 w-12 text-primary/25" strokeWidth={1.25} aria-hidden="true"/></div>}
      {church.photoSourceUrl && <figcaption className="px-2 py-1.5 text-xs text-muted-foreground"><details><summary className="cursor-pointer font-medium">Photo credit & licence</summary><span>{church.photoCredit ? church.photoCredit+" · " : "See original photographer and licence · "}</span><a className="underline" href={church.photoSourceUrl} target="_blank" rel="noopener noreferrer">Source</a>{church.photoLicenseUrl && <> · <a href={church.photoLicenseUrl} target="_blank" rel="noopener noreferrer" className="underline">Licence</a></>}</details></figcaption>}
      </figure>
      <div className="min-w-0 p-4 sm:p-5 lg:col-start-1 lg:row-start-1 lg:p-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{church.tradition}</p>
        <h3 className="mt-1 text-xl font-bold leading-snug sm:text-2xl">{church.name}</h3>
        <p className="mt-3 text-sm leading-relaxed">{church.description}</p>
      </div>
    </div>
    <div className="border-t px-4 py-4 sm:px-5 lg:px-6">
      <dl className="grid gap-3 rounded-xl bg-secondary/40 p-3.5 text-sm sm:grid-cols-2">
        <div className="flex min-w-0 items-start gap-2"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true"/><div><dt className="font-semibold">Published visiting hours</dt><dd className="mt-0.5 leading-relaxed text-muted-foreground">{church.hours}</dd></div></div>
        <div className="flex min-w-0 items-start gap-2"><Ticket className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true"/><div><dt className="font-semibold">Admission</dt><dd className="mt-0.5 leading-relaxed text-muted-foreground">{church.admission}</dd></div></div>
      </dl>
    </div>
    <div className="grid gap-4 border-t px-4 py-4 sm:px-5 lg:grid-cols-2 lg:gap-6 lg:px-6">
      <p className="text-sm leading-relaxed"><strong className="text-foreground">Don't miss:</strong> {church.highlight}</p>
      <p className="text-sm leading-relaxed"><strong className="text-primary">My tip:</strong> {church.tip}</p>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-secondary/10 px-4 py-4 sm:px-5 lg:px-6">
      <OutLink href={locationUrl}><MapPin className="h-3.5 w-3.5" aria-hidden="true"/> View on Google Maps</OutLink>
      {church.officialUrl ? <OutLink href={church.officialUrl}>{church.officialLabel || "Church website"}</OutLink> : <OutLink href={churchesSourceUrl}>Published hours (CIC)</OutLink>}
    </div>
  </article>;
}
const mapData=jerusalemChurches.map(({id,name,area,lat,lon})=>({id,name,area,lat,lon}));
const mapUrl="/maps/jerusalem-churches.html?points="+encodeURIComponent(JSON.stringify(mapData));
function ChurchMap(){
  const [selected,setSelected]=useState("all");
  const frame=useRef<HTMLIFrameElement>(null);
  const focused=jerusalemChurches.find(c=>c.id===selected);
  const focus=(id:string)=>{
    setSelected(id);
    frame.current?.contentWindow?.postMessage({type:"jerusalem-church-map-focus",id},window.location.origin);
  };
  useEffect(()=>{
    const receive=(event:MessageEvent)=>{
      if(event.origin!==window.location.origin||event.source!==frame.current?.contentWindow)return;
      if(event.data?.type==="jerusalem-church-map-selected"&&jerusalemChurches.some(c=>c.id===event.data.id))setSelected(event.data.id);
    };
    window.addEventListener("message",receive);
    return ()=>window.removeEventListener("message",receive);
  },[]);
  return <section id="church-map" aria-labelledby="church-map-heading" className="mt-11 scroll-mt-24">
    <Heading id="church-map" title="Jerusalem churches on the map" intro="Browse all 20 locations. The colours separate the four areas; they are not a continuous walking route."/>
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_1fr]">
        <div aria-label="Church areas and map colours" className="space-y-2 text-sm">{churchAreas.map(a=><div key={a.id} className="flex items-center gap-2"><span className="h-3.5 w-3.5 shrink-0 rounded-sm" style={{backgroundColor:a.color}} aria-hidden="true"/>{a.title}</div>)}</div>
        <div className="space-y-2"><label htmlFor="church-map-focus" className="block text-sm font-semibold">Find a church</label><select id="church-map-focus" className="min-h-11 w-full rounded-lg border bg-background p-2 text-sm" value={selected} onChange={e=>focus(e.target.value)}><option value="all">All churches</option>{churchAreas.map(a=><optgroup key={a.id} label={a.title}>{jerusalemChurches.filter(c=>c.area===a.id).map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</optgroup>)}</select></div>
      </div>
      <iframe ref={frame} title="Interactive map of 20 churches and Christian heritage sites in Jerusalem" src={mapUrl} width={900} height={445} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="h-[390px] w-full border-0 sm:h-[445px]" onLoad={()=>{if(selected!=="all")frame.current?.contentWindow?.postMessage({type:"jerusalem-church-map-focus",id:selected},window.location.origin);}}/>
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-muted-foreground"><span>Map data © OpenStreetMap contributors. Locations are for orientation.</span>{focused&&<OutLink href={`https://www.google.com/maps/dir/?api=1&destination=${focused.lat}%2C${focused.lon}`}>Directions to selected church</OutLink>}</div>
    </div>
  </section>;
}
export function JerusalemChurchesGuide(){
  const availableTours = tours.flatMap(t => { const url = affiliateConfig[t.affiliateKey]?.trackingUrl; return url ? [{ ...t, url }] : []; });
  return <main className="mx-auto max-w-5xl px-4 pb-10"><article>
    <header className="pt-6">
      <Breadcrumbs items={[{name:"Home",to:"/"},{name:"Travel guides",to:"/travel-blog/"},{name:"Churches in Jerusalem",to:"/travel-blog/churches-in-jerusalem/"}]}/>
      <GuideHeroLayout image={<GuideHeroMedia src={hero} alt="The Church of the Holy Sepulchre in Jerusalem's Old City"/>}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Jerusalem · Christian heritage</p>
        <h1 className="guide-page-title mt-2">Churches in Jerusalem: What to See &amp; How to Visit</h1>
        <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed">From the Church of the Holy Sepulchre to the hillside churches of the Mount of Olives, I have organised Jerusalem's Christian sites by area to help you choose meaningful stops, understand their traditions and plan a practical visit.</p>
        <PageUpdated date={updatedAt}/>
      </GuideHeroLayout>
      <AuthorCard/>
    </header>
    <section className="mt-8 rounded-xl border border-primary/20 bg-secondary/40 p-5 sm:p-6" aria-labelledby="quick-answer">
      <h2 id="quick-answer" className="text-xl font-bold">Where I would start</h2>
      <p className="mt-2 leading-relaxed">For a first visit, start at the <a className="font-semibold text-primary hover:underline" href="#church-holy-sepulchre">Church of the Holy Sepulchre</a> and follow part of the Via Dolorosa. If you have more time, add <a className="font-semibold text-primary hover:underline" href="#church-all-nations">Gethsemane</a> or <a className="font-semibold text-primary hover:underline" href="#church-dormition">Dormition Abbey</a>. Ein Karem is a separate journey, not a quick extension of an Old City walk.</p>
    </section>
    <OnThisPage sections={sections}/>
    <section id="choose" aria-labelledby="choose-heading" className="mt-10 scroll-mt-24">
      <Heading id="choose" title="Choose churches by area" intro="Jerusalem's churches are clustered across four different neighbourhoods. Select the area that best fits your interests and time."/>
      <div className="grid gap-3 sm:grid-cols-2">{churchAreas.map(a=><a key={a.id} href={"#"+a.id} className="rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-secondary/20"><span className="mb-3 inline-block h-1.5 w-12 rounded-full" style={{backgroundColor:a.color}} aria-hidden="true"/><h3 className="text-lg font-semibold">{a.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.intro}</p><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">See churches <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></span></a>)}</div>
      <div role="region" aria-label="Compare Jerusalem church visiting areas" tabIndex={0} className="mt-5 overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary">
        <table className="w-full min-w-[650px] text-left text-sm">
          <caption className="sr-only">Four areas to visit Jerusalem churches compared by main sites, typical time and walking conditions</caption>
          <thead className="bg-secondary/60"><tr>{["Area","Main focus","Allow","Terrain and transport"].map(h=><th key={h} scope="col" className="border-b px-3 py-3 font-semibold">{h}</th>)}</tr></thead>
          <tbody>{[
            ["Old City","Holy Sepulchre, Via Dolorosa, St Anne","Half day","Walkable lanes; stairs, crowds and uneven paving"],
            ["Mount of Olives","Gethsemane, Dominus Flevit, Pater Noster","Half day","Steep hillside; consider a vehicle to the upper viewpoint"],
            ["Mount Zion","Dormition Abbey, Cenacle, Gallicantu","2–3 hours","A compact cluster with individual stairs and entrances"],
            ["Ein Karem","Visitation and St John the Baptist","Half day including transport","Separate drive; uphill paths between the churches"],
          ].map(row=><tr key={row[0]} className="border-b last:border-0">{row.map((cell,i)=>i===0?<th key={cell} scope="row" className="p-3 font-semibold">{cell}</th>:<td key={i} className="p-3 leading-relaxed">{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </section>
    <ChurchMap/>
    {churchAreas.map((area,index)=><section key={area.id} id={area.id} aria-labelledby={area.id+"-heading"} className="mt-12 scroll-mt-24">
      <Heading id={area.id} title={area.title} intro={area.intro}/>
      {index===0&&<Tip>The <strong>Via Dolorosa</strong> is a traditional route through the Old City, not a single church. The early Stations of the Cross and the Holy Sepulchre are different stops; follow my <Link to="/attractions/old-city-jerusalem/" className="font-semibold text-primary underline">Old City guide</Link> for the wider walking context.</Tip>}
      {index===1&&<Tip>I usually suggest a vehicle to an upper Mount of Olives viewpoint, then a downhill walk if suitable. Consult my <Link to="/attractions/mount-of-olives/" className="font-semibold text-primary underline">Mount of Olives visitor guide</Link> for the hill's access and pickup options.</Tip>}
      <div className="mt-5 grid gap-5">{jerusalemChurches.filter(c=>c.area===area.id).map(c=><ChurchCard key={c.id} church={c}/>)}</div>
      {index===2&&<p className="mt-4 text-sm leading-relaxed text-muted-foreground">The Cenacle is included as an important Christian heritage site, although it is not a church. My <Link to="/attractions/mount-zion/" className="font-semibold text-primary underline">Mount Zion guide</Link> covers these places in more detail.</p>}
    </section>)}
    <section id="routes" aria-labelledby="routes-heading" className="mt-12 scroll-mt-24">
      <Heading id="routes" title="Three realistic ways to plan your visit" intro="These are flexible suggestions, not timed promises of entry to every church."/>
      <div className="grid gap-4 md:grid-cols-3">{[
        {time:"Half day",title:"Old City Christian highlights",steps:["Begin near Lion's Gate with St Anne and selected Stations of the Cross","Follow part of the Via Dolorosa","Allow unhurried time at the Holy Sepulchre"],note:"Queues at the Edicule may be long. Choose fewer stops if you join services."},
        {time:"Full day",title:"Old City and one nearby cluster",steps:["Visit the Holy Sepulchre in the morning","Add Mount Zion churches OR a Mount of Olives hillside route","Leave extra time for a transfer and hillside walking"],note:"Do not attempt both hills plus all Old City churches on a rigid schedule."},
        {time:"Another half day",title:"Ein Karem village churches",steps:["Travel to Ein Karem separately","Visit St John the Baptist and the Church of the Visitation","Enjoy time in the neighbourhood before returning"],note:"Allow for the Visitation's uphill approach and midday closing."}
      ].map(r=><div key={r.title} className="rounded-xl border bg-card p-5"><p className="text-xs font-bold uppercase tracking-wide text-primary">{r.time}</p><h3 className="mt-2 text-lg font-bold">{r.title}</h3><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">{r.steps.map(s=><li key={s}>{s}</li>)}</ol><p className="mt-4 text-sm text-muted-foreground">{r.note}</p></div>)}</div>
    </section>
    <section id="practical" aria-labelledby="practical-heading" className="mt-12 scroll-mt-24">
      <Heading id="practical" title="My practical advice for church visits"/>
      <div className="grid gap-4 sm:grid-cols-2">{[
        {title:"Dress and worship",text:"Cover shoulders and knees as a good starting point, keep voices low, and respect active liturgies. Group services and photography may require permission."},
        {title:"Opening hours and admission",text:"The published times and charges above are based on the Christian Information Center's September 2026 list. Holy Week, feast days and site-specific events can change access."},
        {title:"Stairs and steep paths",text:"The Old City has uneven paving; Mount of Olives paths can be steep; the Tomb of the Virgin Mary has a long staircase. Verify accessibility directly for your destination."},
        {title:"Transport and meeting places",text:"Vehicles cannot enter most Old City lanes. Arrange a realistic gate or road-accessible pickup, and allow time between the Old City, Mount of Olives and Ein Karem."}
      ].map(t=><div key={t.title} className="rounded-xl border bg-card p-5"><h3 className="font-bold">{t.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p></div>)}</div>
      <div className="mt-5"><Tip><Link to="/travel-blog/calendar-of-events/" className="font-semibold text-primary underline">Israel's calendar of events</Link> is useful for understanding holiday and special-date changes. Church-specific schedules should still be checked directly with the relevant community.</Tip></div>
    </section>
    <section id="tours" aria-labelledby="tours-heading" className="mt-12 scroll-mt-24">
      <Heading id="tours" title="Guided church and Christian heritage tours" intro="These external tours can help with context and navigation. Read the specific church stops, languages, departure city and entry conditions before booking. Price and review figures are provider snapshots from November 2026, not live quotes."/>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{availableTours.map(t=><article key={t.url} className="flex flex-col overflow-hidden rounded-xl border bg-card"><img src={t.image} alt={t.alt} width={640} height={360} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover"/><div className="flex flex-1 flex-col p-4"><p className="text-xs font-semibold uppercase text-primary">{t.platform}</p><h3 className="mt-2 text-lg font-semibold">{t.title}</h3><p className="mt-2 text-xs font-semibold text-muted-foreground">{t.duration}</p>
          {"startingPriceUsd" in t && typeof t.startingPriceUsd === "number" && <p className="mt-2 text-sm"><strong>From US${t.startingPriceUsd}</strong><span className="text-muted-foreground"> · previously listed</span></p>}
          {"rating" in t && typeof t.rating === "number" && <p className="mt-1 text-sm text-muted-foreground">★ {t.rating.toFixed(1)}/5 ({t.reviewCount} reviews)</p>}<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p><div className="mt-auto pt-4"><OutLink href={t.url}>See dates and rates</OutLink></div></div></article>)}</div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Starting prices and review counts are historical reference figures. Check current prices, availability and recent reviews with the booking provider before paying. The Bethlehem option is a separate excursion outside Jerusalem.</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">For more guided options, browse my <Link to="/tours/jerusalem/" className="font-semibold text-primary underline">Jerusalem tours</Link>. My <Link to="/private-driver/" className="font-semibold text-primary underline">private driver service</Link> is transport, not automatically a licensed guiding service.</p>
    </section>
    <FaqList faqs={faqs}/>
    <section id="explore-more" aria-labelledby="explore-more-heading" className="mt-12 scroll-mt-24">
      <Heading id="explore-more" title="Explore Jerusalem further" intro="More of my practical guides for planning your days in and around Jerusalem."/>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{related.map(item=><Link key={item.to} to={item.to} className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/40 hover:bg-secondary/20">{guideHeroPhotoForPath(item.to) && <img src={guideHeroPhotoForPath(item.to)!.src} alt={guideHeroPhotoForPath(item.to)!.alt} width={640} height={360} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover"/>}<span className="flex flex-1 flex-col p-4"><strong>{item.title}</strong><span className="mt-2 text-sm text-muted-foreground">{item.text}</span><span className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-primary">Explore my guide <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></span></span></Link>)}</div>
    </section>
    <HomeContactForm guide={neighborhoodTripContactCopy("Jerusalem")}/>
    <SourcesDisclosure>
      <p className="mb-3 text-sm leading-relaxed">Visiting hours and admission information: Christian Information Center shrine listing updated 15 September 2026, supplemented by church operators. These times are published guidance, not real-time opening guarantees.</p>
      <ul className="space-y-2 text-sm">
        <li><OutLink href={churchesSourceUrl}>Christian Information Center — church hours and entrance information</OutLink></li>
        <li><OutLink href="https://www.dormitio.net/">Dormition Abbey — official website</OutLink></li>
        <li><OutLink href="https://www.stpeter-gallicantu.org/Practical-Information.html?lang=en">St Peter in Gallicantu — practical information</OutLink></li>
        <li><OutLink href="https://www.custodia.org/en/">Custody of the Holy Land — Franciscan sites</OutLink></li>
        <li><OutLink href="https://www.seetheholyland.net/">See the Holy Land — historical context</OutLink></li>
      </ul>
    </SourcesDisclosure>
  </article></main>;
}
