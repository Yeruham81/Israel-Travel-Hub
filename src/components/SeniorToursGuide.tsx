import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, CarFront, Clock3, HeartHandshake, Lightbulb, MapPin, PersonStanding, ShieldCheck } from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { HomeContactForm } from "@/components/HomeContactForm";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { seniorUpdatedAt, seniorPath, seniorHero, seniorDayTrips, seniorTransportPreferences, seniorAccessQuestions, seniorFaqs, seniorSites, seniorPlanning, type SeniorDay, type SeniorRelated } from "@/data/seniorToursGuide";

const lnk="font-semibold text-primary underline underline-offset-4 hover:text-primary/80";
const tripEnquiryLabels: Record<string, string> = {
 jerusalem: "Plan your Jerusalem day with me",
 masada: "Discuss a Masada & Dead Sea trip",
 galilee: "Share your Galilee plans",
 coast: "Plan a coastal day trip",
};
const sections=[
 ["overview","A trip that fits you"],
 ["private-driver","Why private transport"],
 ["day-trips","Suggested day trips"],
 ["choose-pace","Choose your pace"],
 ["accessibility","Mobility and accessibility"],
 ["before-booking","What to tell me"],
 ["faq","FAQ"],
 ["explore-sites","Destinations to explore"],
 ["travel-guides","More planning guides"],
 ["contact","Contact me"],
] as const;
const references=[
 {title:"Israel Nature and Parks Authority - accessibility of national parks",url:"https://en.parks.org.il/accessibility/"},
 {title:"Israel Nature and Parks Authority - Masada visitor information",url:"https://en.parks.org.il/reserve-park/masada-national-park/"},
 {title:"Israel Nature and Parks Authority - Masada cable car access",url:"https://en.parks.org.il/article/the-masada-cable-car/"},
 {title:"Israel Nature and Parks Authority - Caesarea visitor information",url:"https://en.parks.org.il/reserve-park/caesarea-national-park/"},
 {title:"Access Israel - visiting the Old City of Jerusalem",url:"https://aisrael.org/en/useful-info/accessible-tourism/the-old-city-of-jerusalem/"},
 {title:"Accessible JLM map app — Android",url:"https://play.google.com/store/apps/details?id=pami.accessibility.sayyes"},
 {title:"Accessible JLM map app — iPhone",url:"https://apps.apple.com/il/app/accessible-jlm/id1434672106"},
] as const;

function Heading({id,title,intro}:{id:string;title:string;intro?:ReactNode}){
 return <div className="mb-5"><h2 id={id+"-heading"} className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>{intro&&<p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}</div>;
}
function Tip({children}:{children:ReactNode}){
 return <aside className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed text-amber-950 dark:border-amber-700/50 dark:bg-amber-950/20 dark:text-amber-100"><Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true"/><div>{children}</div></aside>;
}
function External({href,children}:{href:string;children:ReactNode}){
 return <a href={href} target="_blank" rel="noopener noreferrer" className={lnk}>{children}<span className="sr-only"> (opens in a new tab)</span></a>;
}
function CompactResourceLinks({items,className}:{items:readonly {label:string;url:string}[];className?:string}){
 return <ul className={className}>
  {items.map(item=>{
    const match=item.label.match(/^(.*) — (Android|iPhone)$/);
    if(match){
      const base=match[1],android=items.find(other=>other.label===base+" — Android");
      const iphone=items.find(other=>other.label===base+" — iPhone");
      if(android&&iphone){
        if(match[2]==="iPhone")return null;
        return <li key={base}>{base} (<External href={android.url}>Android</External>) (<External href={iphone.url}>iPhone</External>)</li>;
      }
    }
    return <li key={item.url}><External href={item.url}>{item.label}</External></li>;
  })}
 </ul>;
}
function PhotoLink({item}:{item:SeniorRelated}){
 return <Link to={item.to} className="editorial-card-link group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-primary">
  <img src={guideHeroPhotoForPath(String(item.to))?.src ?? item.image} alt={guideHeroPhotoForPath(String(item.to))?.alt ?? item.alt} width={640} height={400} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover"/>
  <span className="flex flex-1 flex-col p-3 sm:p-4"><strong className="text-base leading-snug group-hover:text-primary">{item.title}</strong><span className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</span></span>
 </Link>;
}
function TripCard({item}:{item:SeniorDay}){
 const map="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(item.googlePlace);
 return <article id={item.id} data-senior-day-trip={item.id} data-detailed-card="horizontal" className="scroll-mt-28 overflow-hidden rounded-2xl border bg-card shadow-sm">
  <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_270px] lg:items-start lg:gap-6 lg:p-5">
   <img src={item.image} alt={item.alt} width={800} height={480} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover lg:col-start-2 lg:row-start-1 lg:aspect-[4/3] lg:rounded-xl"/>
   <div className="min-w-0 p-5 lg:col-start-1 lg:row-start-1 lg:p-0">
    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary"><Clock3 className="h-4 w-4" aria-hidden="true"/>{item.duration}</p>
    <h3 className="mt-2 font-serif text-xl font-semibold sm:text-2xl">{item.title}</h3>
    <p className="mt-3 text-sm leading-relaxed">{item.intro}</p>
   </div>
  </div>
  <div className="border-t p-4 sm:p-5 lg:px-6">
   <div className="grid gap-3 lg:grid-cols-2 lg:gap-6">
    <p className="text-sm leading-relaxed"><strong className="text-foreground">A gentler option:</strong> {item.easy}</p>
    <p className="text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Before you go:</strong> {item.watchFor}</p>
   </div>
   <div className="mt-4 rounded-lg bg-secondary/25 p-4" data-senior-sample-route>
    <h4 className="text-sm font-semibold">A suggested, unhurried visit</h4>
    <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">{item.sampleOrder.map((step,i)=><li key={i}>{step}</li>)}</ol>
    <p className="mt-3 text-sm leading-relaxed"><strong>Time to rest:</strong> {item.restStop}</p>
    <p className="mt-2 text-sm leading-relaxed"><strong>If you prefer a shorter day:</strong> {item.shortenDay}</p>
   </div>
   {item.accessInfo&&<div className="mt-3 text-sm" data-senior-access-resources>
    <p className="font-semibold">Check accessibility before visiting</p>
    <CompactResourceLinks items={item.accessInfo} className="mt-1.5 space-y-1.5"/>
   </div>}
   <div className="mt-4 flex flex-wrap gap-2">{item.suggestedStops.map(stop=><Link key={stop.label} to={stop.to} className="rounded-full border px-3 py-1.5 text-xs font-semibold text-primary hover:bg-secondary">{stop.label}</Link>)}</div>
  </div>
  <div className="space-y-3 border-t bg-secondary/10 p-4 sm:p-5 lg:px-6">
   <a href="#contact" data-senior-trip-enquiry={item.id} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground hover:opacity-90 lg:w-auto">{tripEnquiryLabels[item.id]} <ArrowRight className="h-4 w-4" aria-hidden="true"/></a>
   <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
    <Link to={item.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">Browse other tours <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></Link>
    <a href={map} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"><MapPin className="h-4 w-4" aria-hidden="true"/>Google Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></a>
   </div>
  </div>
 </article>;
}

export function SeniorToursGuide(){
 return <main className="mx-auto max-w-5xl px-4 pb-12"><article>
   <header className="pt-6">
    <Breadcrumbs items={[{name:"Home",to:"/"},{name:"Travel guides",to:"/travel-blog/"},{name:"Israel tours for seniors",to:seniorPath}]}/>
    <GuideHeroLayout image={<GuideHeroMedia src={seniorHero.src} mobileSrc={seniorHero.mobileSrc} alt={seniorHero.alt} compact/>}>
     <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Private travel · Flexible day trips</p>
     <h1 className="guide-page-title mt-2">Israel Tours for Seniors: Private Day Trips at Your Own Pace</h1>
     <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed">I'm Moshe Barak. I arrange comfortable private day trips for senior travelers, with flexible itineraries tailored to your interests and mobility needs. Tell me about your preferred destinations and walking distances, and I'll help plan your trip.</p>
     <PageUpdated date={seniorUpdatedAt}/>
    </GuideHeroLayout>
    <AuthorCard/>
   </header>

   <section id="overview" aria-labelledby="overview-heading" className="mt-10 scroll-mt-24">
    <Heading id="overview" title="See Israel at your own pace" intro="I'll tailor your itinerary to your preferred walking distances, sightseeing pace and time for breaks."/>
    <p className="leading-relaxed">A private vehicle gives you more control over your day: convenient pickup, time for coffee or lunch, shorter walks where possible and the option to skip a stop when you are tired. I'll help you check walking routes, terrain and visitor facilities before choosing the places that best suit you.</p>
    <div className="mt-5"><Tip>Tell me what you enjoy doing and what makes a day comfortable for you. We can plan active sightseeing, shorter visits or a relaxed mix of both.</Tip></div>
   </section>
   <OnThisPage sections={sections}/>

   <section id="private-driver" aria-labelledby="private-driver-heading" className="mt-12 scroll-mt-24">
    <Heading id="private-driver" title="Benefits of a private driver for senior travelers" intro="Personalized transport can help you shape the day around your energy, preferred departure time and the destinations you care most about."/>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{seniorTransportPreferences.map((item,i)=><div key={item.title} className="rounded-xl border bg-card p-5"><div className="flex items-center gap-2 text-primary">{i===0?<CarFront className="h-5 w-5" aria-hidden="true"/>:i===1?<Clock3 className="h-5 w-5" aria-hidden="true"/>:i===2?<PersonStanding className="h-5 w-5" aria-hidden="true"/>:i===3?<MapPin className="h-5 w-5" aria-hidden="true"/>:i===4?<ShieldCheck className="h-5 w-5" aria-hidden="true"/>:<HeartHandshake className="h-5 w-5" aria-hidden="true"/>}<h3 className="font-semibold text-foreground">{item.title}</h3></div><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p></div>)}</div>
   </section>

   <section id="day-trips" aria-labelledby="day-trips-heading" className="mt-12 scroll-mt-24">
    <Heading id="day-trips" title="Four private day-trip ideas for senior travelers" intro="Customize these day trips to your interests and mobility needs. I recommend choosing a few stops and allowing plenty of time at each."/>
    <div className="grid gap-5" data-testid="senior-detailed-trip-cards">{seniorDayTrips.map(item=><TripCard key={item.id} item={item}/>)}</div>
    <div data-senior-midpage-cta className="mt-6 flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
     <div><h3 className="font-semibold">Would you prefer a different pace or route?</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">Tell me which places matter most and how much walking feels comfortable. I can discuss an individual private transport plan.</p></div>
     <a href="#contact" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold text-primary hover:bg-secondary">Plan your day with me <ArrowRight className="h-4 w-4" aria-hidden="true"/></a>
    </div>
    <div className="mt-5"><Tip>For Jewish heritage, consider the Western Wall, <External href="https://www.yadvashem.org/visiting.html">Yad Vashem</External> or <External href="https://www.anumuseum.org.il/">ANU — Museum of the Jewish People</External>. For Christian heritage, I have a separate <Link to="/travel-blog/christian-tours-in-israel/" className={lnk}>Christian tours guide</Link>. Religious services, entry arrangements and each site's accessibility must be checked for your date.</Tip></div>
   </section>

   <section id="choose-pace" aria-labelledby="choose-pace-heading" className="mt-12 scroll-mt-24">
    <Heading id="choose-pace" title="Choose the pace that feels right" intro="Before choosing attractions, decide how much standing and walking you would enjoy in a typical half-day."/>
    <div className="grid gap-4 md:grid-cols-3">
     {[
      {name:"Mostly scenic stops",label:"Very short walking segments",detail:"A drive between viewpoints, one easily reached attraction, seating and an unhurried lunch.",note:"Good when walking distances need to be kept to a minimum; entrance access still needs confirmation."},
      {name:"Short, manageable visits",label:"Short walks with breaks",detail:"One or two major attractions, short pedestrian routes, frequent pauses and flexible pickup.",note:"Useful for travelers who can walk but prefer to avoid long queues, hills and packed schedules."},
      {name:"Active but flexible",label:"More exploration, fewer deadlines",detail:"Selected museums, archaeological sites or historic districts with comfortable timing and transport between regions.",note:"For visitors who enjoy walking but want a private car available for the longer connections."},
     ].map(item=><article key={item.name} className="rounded-xl border bg-card p-5"><p className="text-xs font-semibold uppercase tracking-wide text-primary">{item.label}</p><h3 className="mt-2 text-lg font-bold">{item.name}</h3><p className="mt-3 text-sm leading-relaxed">{item.detail}</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.note}</p></article>)}
    </div>
   </section>

   <section id="accessibility" aria-labelledby="accessibility-heading" className="mt-12 scroll-mt-24">
    <Heading id="accessibility" title="Mobility and accessibility: what to check" intro="Israel's historic cities and archaeological areas vary significantly. An accessible vehicle, a convenient drop-off point and an accessible entrance are three separate things."/>
    <div className="space-y-4 leading-relaxed">
     <p>In <Link to="/attractions/old-city-jerusalem/" className={lnk}>Jerusalem's Old City</Link>, some routes have been improved for visitors with reduced mobility, but steep sections, stone surfaces and steps remain. At <Link to="/attractions/masada/" className={lnk}>Masada</Link>, the cable car offers an alternative to hiking, but the archaeological plateau is not uniformly step-free. <Link to="/attractions/caesarea/" className={lnk}>Caesarea</Link> has designated accessible visitor areas; the precise entrance and route still matter.</p>
     <p>If you use a cane, walker or wheelchair, please tell me in advance. A folding walking aid may fit in a standard vehicle, while travelling in a wheelchair without transferring to a seat requires a specially adapted vehicle. <strong>Tell me what you need so I can check suitable vehicle availability and any specialist assistance separately before confirming arrangements.</strong></p>
     <p>For the Old City, check the Accessible JLM map app (<External href="https://play.google.com/store/apps/details?id=pami.accessibility.sayyes">Android</External>) (<External href="https://apps.apple.com/il/app/accessible-jlm/id1434672106">iPhone</External>) to plan a suitable pedestrian route, then confirm current obstructions locally. For Masada and Caesarea, the <External href="https://en.parks.org.il/accessibility/">Israel Nature and Parks Authority's accessibility guide and site map</External> explains visitor facilities; the relevant official site pages are also linked beside each day-trip idea. Ask each venue about the actual step-free entrance, toilets, parking, queues and routes available on your planned day.</p>
    </div>
    <div className="mt-5"><Tip>Even a short route can include slopes or uneven paving. I'll help you plan suitable car stops and check the final walking approach, including parking and site access.</Tip></div>
   </section>

   <section id="before-booking" aria-labelledby="before-booking-heading" className="mt-12 scroll-mt-24">
    <Heading id="before-booking" title="Seven details that help me tailor your day" intro="Walking distances, seating preferences, mobility equipment and preferred stops are the most useful details for planning your transport."/>
    <ol className="grid gap-3 sm:grid-cols-2">{seniorAccessQuestions.map((q,i)=><li key={q} className="flex gap-3 rounded-xl border bg-card p-4"><span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary">{i+1}</span><span className="text-sm leading-relaxed">{q}</span></li>)}</ol>
    <p className="mt-4 text-sm text-muted-foreground">If you use mobility equipment or have specific support needs, please share the practical transport details. I'll check any adapted vehicle or specialist services separately and confirm exactly what is included before booking.</p>
   </section>

   <FaqList faqs={seniorFaqs}/>

   <section id="explore-sites" aria-labelledby="explore-sites-heading" className="mt-12 scroll-mt-24">
    <Heading id="explore-sites" title="Explore destinations before choosing your route" intro="Explore my attraction guides and choose your preferred stops. I'll help arrange a convenient driving route."/>
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{seniorSites.map(item=><PhotoLink key={item.to} item={item}/>)}</div>
   </section>
   <section id="travel-guides" aria-labelledby="travel-guides-heading" className="mt-12 scroll-mt-24">
    <Heading id="travel-guides" title="Practical guides for planning your visit" intro="Transport, hotel location, arrival arrangements and the dates of your visit can all make a difference to a comfortable journey."/>
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{seniorPlanning.map(item=><PhotoLink key={item.to} item={item}/>)}</div>
   </section>

   <HomeContactForm showTripadvisorBesidePortraitMobile guide={{
     heading:"Need a private driver for a comfortable day trip?",
     introduction:"I arrange comfortable private day trips with a driver in Israel. Send me your dates, pickup location, destinations and any walking or vehicle needs, and I'll reply personally.",
     subject:"",
     placeholder:"Your dates, hotel or pickup, passengers, places you hope to visit, walking preferences, mobility equipment and preferred duration…",
   }}/>
   <SourcesDisclosure>
     <p className="text-sm leading-relaxed">Accessibility depends on the route, date and facilities available. Please confirm the details directly with each attraction; I'll check vehicle requirements separately when planning your journey.</p>
     <CompactResourceLinks items={references.map(item=>({label:item.title,url:item.url}))} className="mt-3 list-disc space-y-2 pl-5 text-sm"/>
   </SourcesDisclosure>
 </article></main>;
}
