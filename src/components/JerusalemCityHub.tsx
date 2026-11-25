import { ExternalProviderTourCard } from "@/components/ExternalProviderTourCard";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowUpRight, CalendarDays, CarFront, Clock3, ExternalLink, Footprints, Hotel, Lightbulb, MapPinned, Star, TrainFront } from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { HomeContactForm } from "@/components/HomeContactForm";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { affiliateConfig, tourBookingOffers, tourProducts } from "@/data/registry";
import { tourPhotos } from "@/data/tours";
import { travelGuides } from "@/data/travelGuides";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { recordAffiliateTourClick } from "@/lib/tour-analytics";
import {
  JERUSALEM_HUB_PATH, JERUSALEM_HUB_TITLE, JERUSALEM_HUB_UPDATED,
  jerusalemTopicCards, jerusalemDayPlans, jerusalemStayAreas,
  jerusalemDayTripCards, jerusalemMoreGuides, jerusalemTourGroups,
  jerusalemHubFaqs, jerusalemHubSources,
} from "@/data/jerusalemCityHub";

const linkClass = "font-semibold text-primary underline underline-offset-4 hover:text-primary/80";
const sections = [
  ["at-a-glance","Plan your visit"],["choose","Choose what to see"],
  ["how-many-days","How many days?"],["city-tours","Jerusalem tours"],
  ["where-to-stay","Where to stay"],["getting-around","Getting around"],
  ["day-trips","Day trips"],["day-trip-tours","Excursion offers"],
  ["practical","My tips"],["faq","FAQ"],["explore-more","More guides"],
  ["contact","Contact me"],
] as const;

function Heading({id,title,intro}:{id:string;title:string;intro?:ReactNode}) {
  return <div className="mb-5"><h2 id={id+"-h"} className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>{intro && <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}</div>;
}
function Tip({children}:{children:ReactNode}) {
  return <aside className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 dark:border-amber-700/70 dark:bg-amber-950/25 dark:text-amber-100"><Lightbulb aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"/><p><strong>My tip:</strong> {children}</p></aside>;
}
type EditorialCards=typeof jerusalemTopicCards|typeof jerusalemDayTripCards|typeof jerusalemMoreGuides;
function CardGrid({id,title,intro,items}:{id:string;title:string;intro:string;items:EditorialCards}) {
  return <section id={id} aria-labelledby={id+"-h"} className="mt-12 scroll-mt-24">
    <Heading id={id} title={title} intro={intro}/>
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3" data-testid={id+"-cards"}>
      {items.map(item=>{
        const photo=guideHeroPhotoForPath(item.to);
        return <Link key={item.to} to={item.to} className="editorial-card-link group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-primary">
          {photo ? <img src={photo.src} alt={photo.alt} width={540} height={320} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover"/> : <span aria-label={"Photo of "+item.title+" to be added"} className="flex aspect-[16/9] items-center justify-center bg-secondary/30 text-xs text-muted-foreground">Photo to be added</span>}
          <span className="flex flex-1 flex-col p-3 sm:p-4">
            <strong className="text-sm leading-snug group-hover:text-primary sm:text-base">{item.title}</strong>
            <span className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.description}</span>
            
          </span>
        </Link>;
      })}
    </div>
  </section>;
}
function TourCards({group}:{group:typeof jerusalemTourGroups[number]}) {
  return <section id={group.id} aria-labelledby={group.id+"-h"} className="mt-12 scroll-mt-24">
    <Heading id={group.id} title={group.title} intro={group.description}/>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid={group.id+"-cards"}>
      {group.products.map(entry=>{
        const product=tourProducts.find(p=>p.id===entry.id);
        const offerId="tour-"+entry.id+"-"+entry.partner;
        const offer=tourBookingOffers.find(o=>o.id===offerId);
        const url=affiliateConfig[offerId+"@jerusalem-hub"]?.trackingUrl;
        const photo=tourPhotos[entry.id];
        if(!product||!offer||!url||!photo) return null;
        return <div key={entry.id} data-testid="jerusalem-hub-tour-card" data-group={group.id} className="min-w-0">
          <ExternalProviderTourCard
            image={photo.src} alt={photo.alt}
            platform={entry.partner === "getyourguide" ? "GetYourGuide" : "Viator"}
            title={product.title} description={product.summary} duration={product.duration} location={entry.label}
            rating={product.rating && {value:product.rating.value,count:product.rating.count}}
            price={offer.listedPrice && {amount:offer.listedPrice.amount,currency:offer.listedPrice.currency,basis:offer.listedPrice.basis,maxPartySize:offer.listedPrice.maxPartySize}}
            href={url}
            onClick={()=>recordAffiliateTourClick({pageId:"travel_blog_jerusalem_hub",productId:entry.id,offerId,provider:entry.partner,linkUrl:url})}
          />
        </div>;
      })}
    </div>
    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">These tours are operated by independent providers and booked through their own platforms. Tour details, availability, prices and booking conditions are set by the operators and may change. Before booking, check the departure date and location, itinerary, guiding, walking requirements, admissions, meeting and return arrangements, and cancellation policy directly with the booking provider.</p>
    <Link to={group.id==="city-tours"?"/tours/jerusalem/":"/tours/"} className="mt-4 inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-primary">
      {group.id==="city-tours"?"Explore all Jerusalem tours":"Explore more tours and day trips"} <ArrowUpRight aria-hidden="true" className="h-4 w-4"/>
    </Link>
  </section>;
}

export function JerusalemCityHubPage(){
  const hero=travelGuides.jerusalem.photo;
  return <main className="mx-auto max-w-5xl px-4 pb-12"><article>
    <header className="pt-6">
      <Breadcrumbs items={[{name:"Home",to:"/"},{name:"Travel guides",to:"/travel-blog/"},{name:"Jerusalem travel guide",to:JERUSALEM_HUB_PATH}]}/>
      <GuideHeroLayout image={<GuideHeroMedia src={hero.src} alt={hero.alt} width={640} height={400}/>}>
        <p className="text-xs font-bold uppercase tracking-wide text-primary">My guide to planning Jerusalem</p>
        <h1 className="guide-page-title mt-2">{JERUSALEM_HUB_TITLE}</h1>
        <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed">I recommend planning Jerusalem by area and interest rather than trying to see every landmark in a single walk. Use this guide to choose what matters to you, decide how many days to stay, and find my detailed Jerusalem guides, tours and transport advice.</p>
        <PageUpdated date={JERUSALEM_HUB_UPDATED}/>
      </GuideHeroLayout>
      <AuthorCard/>
    </header>

    <section id="at-a-glance" aria-labelledby="at-a-glance-h" className="mt-8 scroll-mt-24">
      <Heading id="at-a-glance" title="Jerusalem at a glance" intro="A quick starting point for a first visit, followed by guides to help with each decision."/>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" data-testid="jerusalem-hub-facts">
        {[
          {icon:<CalendarDays className="h-5 w-5" aria-hidden="true"/>,label:"Suggested stay",value:"2–3 days for a first visit"},
          {icon:<Footprints className="h-5 w-5" aria-hidden="true"/>,label:"Best starting point",value:"Old City + one nearby area"},
          {icon:<TrainFront className="h-5 w-5" aria-hidden="true"/>,label:"Airport arrival",value:"Train to Yitzhak Navon or direct road transfer"},
          {icon:<Hotel className="h-5 w-5" aria-hidden="true"/>,label:"Choose a base",value:"Match your hotel to your priorities"},
        ].map(x=><article key={x.label} className="rounded-xl border bg-card p-3 sm:p-4"><span className="text-primary">{x.icon}</span><h3 className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{x.label}</h3><p className="mt-2 text-sm leading-relaxed font-semibold">{x.value}</p></article>)}
      </div>
      <div className="mt-5 rounded-xl border border-primary/20 bg-secondary/40 p-4 sm:p-5" id="quick-answer" aria-label="Quick answer">
        <h2 className="text-lg font-bold">Where I'd start</h2>
        <p className="mt-2 leading-relaxed">For a first visit, I'd spend one day getting to know the <Link className={linkClass} to="/attractions/old-city-jerusalem/">Old City</Link>, including the <Link className={linkClass} to="/attractions/via-dolorosa/">Via Dolorosa</Link> if Christian pilgrimage interests you; use a second day for the <Link className={linkClass} to="/attractions/mount-of-olives/">Mount of Olives</Link> or a <Link className={linkClass} to="/travel-blog/museums-in-jerusalem/">museum</Link>, then leave time for <Link className={linkClass} to="/travel-blog/shopping-in-jerusalem/">Mahane Yehuda</Link> and the neighbourhoods. Keep a day trip outside Jerusalem separate from a full city day.</p>
      </div>
    </section>
    <OnThisPage sections={sections}/>

    <CardGrid id="choose" title="Explore Jerusalem by interest" intro="Choose the subject that interests you. Each illustrated card opens a detailed guide with attractions, logistics and further links, so you can go deeper without reading the same information twice." items={jerusalemTopicCards}/>

    <section id="how-many-days" aria-labelledby="how-many-days-h" className="mt-12 scroll-mt-24">
      <Heading id="how-many-days" title="How many days do you need in Jerusalem?" intro="My suggestions are flexible starting points, not fixed hourly itineraries. Prioritise the experiences you care about and leave time for the walking between them."/>
      <div className="grid gap-4 md:grid-cols-3" data-testid="jerusalem-day-plans">
        {jerusalemDayPlans.map(plan=><article key={plan.label} className="flex min-w-0 flex-col rounded-xl border bg-card p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">{plan.label}</p>
          <h3 className="mt-2 text-lg font-bold">{plan.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
          <p className="mt-3 rounded-lg bg-secondary/40 p-3 text-xs leading-relaxed">{plan.route}</p>
          <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-4">{plan.links.map(link=>link.to==="#day-trips"?<a key={link.title} href="#day-trips" className="text-xs font-semibold text-primary underline underline-offset-4">{link.title}</a>:<Link key={link.title} to={link.to} className="text-xs font-semibold text-primary underline underline-offset-4">{link.title}</Link>)}</div>
        </article>)}
      </div>
      <Tip>On a first day, I'd choose the Old City gate that makes sense for your priorities and mobility. A route with fewer stops can be more rewarding than a list of famous places you only see from outside.</Tip>
    </section>

    <TourCards group={jerusalemTourGroups[0]}/>

    <section id="where-to-stay" aria-labelledby="where-to-stay-h" className="mt-12 scroll-mt-24">
      <Heading id="where-to-stay" title="Where should you stay in Jerusalem?" intro="The best neighbourhood depends on your interests, how you arrive and how much walking you want. These are area-level suggestions, not recommendations for individual hotels."/>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-testid="jerusalem-stay-areas">
        {jerusalemStayAreas.map(area=><article key={area.to} className="editorial-card-link group overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50 hover:bg-secondary/20">
          <Link to={area.to} className="flex h-full flex-col p-4 focus-visible:outline-2 focus-visible:outline-primary" aria-label={"Explore hotels in "+area.name}>
            <h3 className="text-base font-bold group-hover:text-primary">{area.name}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary">{area.character}</p>
            <p className="mt-3 text-sm"><strong>Good for:</strong> {area.best}</p>
            <p className="mt-2 text-sm text-muted-foreground"><strong>Check:</strong> {area.consider}</p>
            
          </Link>
        </article>)}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link to="/travel-blog/where-to-stay-in-jerusalem/" className="editorial-card-link group flex flex-col rounded-xl border border-primary/20 bg-secondary/40 p-4 hover:border-primary/60">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">Choose your area</span>
          <strong className="mt-1 text-base">Where to Stay in Jerusalem</strong>
          <span className="mt-2 text-sm leading-relaxed text-muted-foreground">My detailed comparison of the city's six most useful neighbourhoods for visitors.</span>
          
        </Link>
        <Link to="/accommodation/jerusalem/" className="editorial-card-link group flex flex-col rounded-xl border border-primary/20 bg-secondary/40 p-4 hover:border-primary/60">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">Compare places to stay</span>
          <strong className="mt-1 text-base">Hotels in Jerusalem</strong>
          <span className="mt-2 text-sm leading-relaxed text-muted-foreground">Browse accommodation areas and selected hotels, then check rooms and terms with the booking provider.</span>
          
        </Link>
      </div>
      <Tip>A hotel close to the Old City on a map may still involve steps or a long walk with luggage. I would check the exact entrance, permitted drop-off and final approach before choosing a room.</Tip>
    </section>

    <section id="getting-around" aria-labelledby="getting-around-h" className="mt-12 scroll-mt-24">
      <Heading id="getting-around" title="Getting to and around Jerusalem" intro="Plan the entire journey to your actual hotel or attraction, not just the train station or a point labelled “Jerusalem”."/>
      <p className="max-w-4xl leading-relaxed">The fast intercity train reaches <strong>Jerusalem–Yitzhak Navon</strong>, near the central bus station—not the Old City. From there you may need light rail, a bus, a taxi or a final walk with your bags. Most of the Old City's historic lanes are pedestrian routes; a driver can help between road-accessible stops but cannot drive through the quarters. Check <Link to="/travel-blog/calendar-of-events/" className={linkClass}>Jewish holidays and special dates</Link> before relying on a regular weekday timetable.</p>
      <p className="mt-3 max-w-4xl text-sm leading-relaxed text-muted-foreground">For current rail changes and service notices, consult <a className={linkClass} href="https://rail.co.il/?lan=en&page=updates" target="_blank" rel="noopener noreferrer">Israel Railways</a>. For official visitor information about Jerusalem, check the <a className={linkClass} href="https://www.gov.il/en/government-service-branches/jerusalem-tourism-office" target="_blank" rel="noopener noreferrer">Jerusalem tourism office</a>.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2" data-testid="jerusalem-transport-links">
        {[
          {to:"/travel-blog/ben-gurion-airport-to-jerusalem/",title:"How to get to Jerusalem",description:"Compare airport trains, taxis, buses and private transfers.",icon:<TrainFront className="h-5 w-5"/>},
          {to:"/travel-blog/getting-around-israel/",title:"Public transport and travel in Israel",description:"Rav-Kav or approved apps, buses, trains and local connections.",icon:<Footprints className="h-5 w-5"/>},
          {to:"/travel-blog/from-ben-gurion-airport-on-shabbat/",title:"Shabbat and holiday transport",description:"Understand when regular services stop and how to plan alternatives.",icon:<CalendarDays className="h-5 w-5"/>},
          {to:"/airport-transfers/jerusalem/",title:"Direct airport transfer to Jerusalem",description:"Arrange a confirmed pickup to your specified destination.",icon:<CarFront className="h-5 w-5"/>},
        ].map(item=><Link key={item.to} to={item.to} className="editorial-card-link group flex items-start gap-3 rounded-xl border bg-card p-4 hover:border-primary/50">
          <span className="mt-0.5 shrink-0 text-primary" aria-hidden="true">{item.icon}</span><span className="flex-1"><strong className="text-sm group-hover:text-primary">{item.title}</strong><span className="mt-1 block text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.description}</span></span>
        </Link>)}
      </div>
    </section>

    <CardGrid id="day-trips" title="Day trips from Jerusalem" intro="The Dead Sea, Bethlehem, Jericho and the coast are separate journeys with different access requirements. I'd choose one main destination per day, then check the realistic travel time and return." items={jerusalemDayTripCards}/>
    <TourCards group={jerusalemTourGroups[1]}/>

    <section id="practical" aria-labelledby="practical-h" className="mt-12 scroll-mt-24">
      <Heading id="practical" title="My practical Jerusalem planning tips" intro="A handful of considerations will affect your day more than a rigid list of attractions."/>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="jerusalem-practical-tips">
        {[
          {title:"Plan for hills and uneven ground",description:"Old City cobbles, stairways and steep approaches on the Mount of Olives can make short map distances deceptive. Ask about accessible entrances rather than assuming each route is level."},
          {title:"Treat worship sites respectfully",description:"Cover shoulders and knees where required, keep voices low and respect prayers, security checks and local photography rules. Different religious compounds set their own visitor access."},
          {title:"Check the calendar, not just the season",description:"Shabbat, Jewish holidays and Christian or Muslim festivals affect services, shopping and visitor hours in different ways. Use the actual travel dates before making a detailed plan."},
          {title:"Check museum and attraction details",description:"Individual museums, tours and historic sites use their own tickets, visiting windows and reservations. Follow the dedicated guide to confirm the operator's current information."},
          {title:"Prepare for warm afternoons and cool evenings",description:"Jerusalem's elevation brings seasonal variation. Carry water, comfortable shoes and a weather-appropriate layer rather than planning exclusively around a forecast average."},
          {title:"Check current travel advice",description:"Conditions can change. Review the relevant official travel advisories, local guidance and your insurer's terms before travelling; avoid treating old reassurance as a current safety assessment."},
        ].map(item=><article key={item.title} className="rounded-xl border bg-card p-4"><h3 className="font-bold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p></article>)}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">For specific church visiting arrangements, the <a className={linkClass} href="https://www.cicts.org/our-services/" target="_blank" rel="noopener noreferrer">Christian Information Center</a> is a useful starting point. Always confirm admission and worship arrangements with the relevant site before you travel.</p>
      <Tip>If your plans include a private day trip, I'd set the main destination and realistic walking time first, then add optional stops. A private driver handles transport; licensed guiding and entrance tickets are separate unless specifically arranged.</Tip>
    </section>

    <FaqList faqs={[...jerusalemHubFaqs]}/>
    <CardGrid id="explore-more" title="Plan the next part of your Israel trip" intro="Jerusalem may be the centre of your visit or one stop on a wider route. These guides help with time, holidays and practical preparation." items={jerusalemMoreGuides}/>

    <HomeContactForm showTripadvisorBesidePortraitMobile guide={{
      heading:"Planning a trip to Jerusalem?",
      introduction:"I'm Moshe Barak. I offer private airport transfers, day trips with a driver and tailored journeys within Jerusalem and around Israel. Tell me your date, pickup point, number of passengers, preferred stops and any luggage or mobility needs. I'll reply personally about transport and a practical route. Licensed guiding and entrance tickets are separate arrangements.",
      subject:"",
      placeholder:"Your travel date, Jerusalem pickup, passengers, sightseeing priorities and private transport needs…",
    }}/>
    <SourcesDisclosure>
      <p className="mb-3 text-sm leading-relaxed">Useful official references for travel planning. Transport, security instructions, access and religious-site opening hours can change, so please confirm the details for your visit.</p>
      <ul className="space-y-2 text-sm">{jerusalemHubSources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline">{source.label}<ExternalLink aria-hidden="true" className="h-3.5 w-3.5"/></a></li>)}</ul>
    </SourcesDisclosure>
  </article></main>;
}
