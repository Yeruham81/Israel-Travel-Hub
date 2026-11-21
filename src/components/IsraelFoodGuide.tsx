import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import {
  ArrowUpRight, ChefHat, Clock3, ExternalLink,
  Flame, Heart, Lightbulb, MapPin, UtensilsCrossed
} from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { PageUpdated } from "@/components/PageUpdated";
import { HomeContactForm } from "@/components/HomeContactForm";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { travelGuides } from "@/data/travelGuides";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import fiveDayPhoto from "@/assets/home/hero-caesarea-sm.webp";
import travelByTrainPhoto from "@/assets/airport-journeys/ben-gurion-rail-platform.webp";
import { affiliateConfig, publicSources } from "@/data/registry";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import {
 foodDishes, foodKinds, foodStarterIdeas, foodExtras, foodMarkets,
 foodTours, foodFAQs, type FoodKind, type FoodDish
} from "@/data/israelFoodExplorer";

const guide=travelGuides.food;
const shortLink="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary";
const nav=[
  ["quick-start","Where to start"],
  ["dishes","10 foods to try"],
  ["food-words","Food words"],
  ["food-day","A first food day"],
  ["markets","Food markets"],
  ["food-tours","Food tours"],
  ["practical","Before you order"],
  ["faq","FAQ"],
  ["explore-more","Explore places"],
  ["plan-trip","Plan your visit"],
  ["contact","Contact me"]
] as const;

function SectionHeading({id,title,intro}:{id:string;title:string;intro?:ReactNode}){
  return <div className="mb-5"><h2 id={id+"-heading"} className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>{intro&&<p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}</div>;
}
function Tip({children}:{children:ReactNode}){
  return <aside className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed text-amber-950 dark:border-amber-700/60 dark:bg-amber-950/20 dark:text-amber-100"><Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true"/><div>{children}</div></aside>;
}
function External({href,children}:{href:string;children:ReactNode}){
  return <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary">{children}<ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true"/><span className="sr-only"> (opens in a new tab)</span></a>;
}

const dishVisual = {street:{label:"Street food",icon:Flame},plates:{label:"Breakfast & plates",icon:UtensilsCrossed},bakery:{label:"From the bakery",icon:ChefHat},sweets:{label:"Something sweet",icon:Heart}} as const;

type PickFood = (event:MouseEvent<HTMLAnchorElement>,dishId:string)=>void;
function QuickStart({onPickFood}:{onPickFood:PickFood}){
  return <section id="quick-start" aria-labelledby="quick-start-heading" className="mt-12 scroll-mt-24">
    <SectionHeading id="quick-start" title="New to Israeli food? Start here" intro="You do not need a complicated tasting itinerary. These are four easy ways to choose your first bite — in a market, bakery, café or hummus shop."/>
    <div className="grid gap-4 sm:grid-cols-2">
      {foodStarterIdeas.map((idea,index)=><article key={idea.title} className="rounded-xl border bg-card p-4 sm:p-5">
        <div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">{index+1}</span><div>
          <h3 className="font-bold leading-snug">{idea.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{idea.description}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">{idea.ids.map(id=><a key={id} href={"#"+id} onClick={event=>onPickFood(event,id)} className={shortLink}>{foodDishes.find(d=>d.id===id)?.name}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></a>)}</div>
        </div></div>
      </article>)}
    </div>
    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">The dishes below come from shared Palestinian, Arab and other Levantine traditions as well as North African, Balkan, Turkish and Jewish-diaspora kitchens. My aim is to help you recognise what is on local menus, not to claim that each dish originated in one country.</p>
  </section>;
}
function DishCard({dish,index}:{dish:FoodDish;index:number}){
  const label=dishVisual[dish.kind],Icon=label.icon;
  return <article id={dish.id} aria-labelledby={dish.id+"-heading"} className="scroll-mt-28 flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card">
    <figure><img src={dish.photo.src} alt={dish.photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover"/></figure>
    <div className="flex flex-1 flex-col p-4 sm:p-5">
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary"><Icon className="h-3.5 w-3.5" aria-hidden="true"/>{label.label}</p>
      <h3 id={dish.id+"-heading"} tabIndex={-1} className="text-xl font-bold leading-tight sm:text-2xl">{index+1}. {dish.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">Say it: {dish.pronunciation}</p>
      <p className="mt-3 text-sm leading-relaxed">{dish.summary}</p>
      <div className="mt-4 rounded-lg bg-secondary/50 p-3 text-sm leading-relaxed"><strong>My ordering tip:</strong> {dish.order}</div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground"><strong className="text-foreground">Good to know:</strong> {dish.note}</p>
      <details className="mt-3 rounded-lg border border-border/70 px-3 py-2 text-xs text-muted-foreground">
        <summary className="cursor-pointer font-medium text-foreground">About this food tradition</summary>
        <p className="mt-2 leading-relaxed">{dish.roots}</p>
      </details>
      {dish.photo.credit&&<div className="mt-auto pt-3"><GuidePhotoCredit photo={dish.photo}/></div>}
    </div>
  </article>;
}
function TenDishes({filter,setFilter,onPickFood}:{filter:FoodKind|"all";setFilter:(value:FoodKind|"all")=>void;onPickFood:PickFood}){
 const visible=filter==="all"?foodDishes:foodDishes.filter(d=>d.kind===filter);
 return <section id="dishes" aria-labelledby="dishes-heading" className="mt-12 scroll-mt-24">
   <SectionHeading id="dishes" title="10 foods to try in Israel" intro="Each card tells you what the dish is, how to say its name, what to order and what to ask before you eat. Pick a category if you prefer a shorter list."/>
   <nav aria-label="Jump to a food dish" className="mb-6 rounded-xl border bg-secondary/20 p-3 sm:p-4">
     <h3 className="text-sm font-bold">Jump straight to a dish</h3>
     <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
       {foodDishes.map((dish,index)=><a key={dish.id} href={"#"+dish.id} onClick={event=>onPickFood(event,dish.id)} className="inline-flex min-h-10 items-center gap-2 rounded-md border bg-card px-3 py-2 text-xs font-semibold text-primary hover:border-primary/40 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary sm:text-sm"><span className="text-muted-foreground">{index+1}.</span>{dish.name}</a>)}
     </div>
   </nav>
   <div role="group" aria-label="Filter dishes by food category" className="mb-5 flex flex-wrap gap-2">{foodKinds.map(kind=><button key={kind.id} type="button" aria-pressed={filter===kind.id} onClick={()=>setFilter(kind.id)} className={"min-h-10 rounded-full border px-3.5 py-1.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-primary "+(filter===kind.id?"border-primary bg-primary text-primary-foreground":"bg-card hover:bg-secondary")}>{kind.label}</button>)}</div>
   <p className="mb-3 text-xs text-muted-foreground" role="status" aria-live="polite">Showing {visible.length} of {foodDishes.length} dishes</p>
   <div className="grid gap-5 sm:grid-cols-2" data-testid="israel-food-dish-grid">{visible.map(dish=><DishCard key={dish.id} dish={dish} index={foodDishes.findIndex(d=>d.id===dish.id)}/>)}</div>
 </section>;
}
function FoodWords(){
 return <section id="food-words" aria-labelledby="food-words-heading" className="mt-12 scroll-mt-24">
   <SectionHeading id="food-words" title="Six useful food words" intro="You will see these on menus and at food stalls. Knowing a few makes it much easier to choose the bread, sauces and accompaniments."/>
   <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{foodExtras.map(item=><article key={item.name} className="rounded-xl border bg-card p-4"><h3 className="font-bold">{item.name}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></article>)}</div>
   <Tip>Prefer mild food? You can say <strong>“Lo charif, bevakasha”</strong> (“Not spicy, please”). If you have an allergy, explain the exact ingredient rather than relying on one general phrase.</Tip>
 </section>;
}
function FoodDay({onPickFood}:{onPickFood:PickFood}){
 const plan=[
  {when:"Breakfast",title:"Bakery or café",text:"Pick up a warm boureka or order shakshuka with bread. Choose one, not both, if you want room for lunch.",anchor:"shakshuka"},
  {when:"Lunch",title:"A hummus shop or pita stand",text:"Try a bowl of hummus, a falafel pita or sabich. Ask how big the serving is.",anchor:"hummus"},
  {when:"Afternoon",title:"Wander one food district",text:"Browse a market, look at spices and pickles, and choose a small drink or tasting stop.",anchor:"markets"},
  {when:"After dinner",title:"Share something sweet",text:"Finish with malabi or warm kanafeh. Ask about dairy and nuts before ordering.",anchor:"kanafeh"}
 ] as const;
 return <section id="food-day" aria-labelledby="food-day-heading" className="mt-12 scroll-mt-24">
   <SectionHeading id="food-day" title="A simple first food day" intro="This is a loose tasting plan, not a fixed itinerary. Follow it in one city rather than criss-crossing the country for a meal."/>
   <div className="grid gap-3 md:grid-cols-4">{plan.map((step,i)=><article key={step.when} className="flex min-w-0 flex-col rounded-xl border bg-card p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-primary">{String(i+1).padStart(2,"0")} · {step.when}</p><h3 className="mt-2 font-bold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p><a className={"mt-auto pt-3 "+shortLink} href={"#"+step.anchor} onClick={event=>{if(step.anchor!=="markets")onPickFood(event,step.anchor);}}>Read more<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></a>
    </article>)}</div>
 </section>;
}
function Markets(){
 return <section id="markets" aria-labelledby="markets-heading" className="mt-12 scroll-mt-24">
   <SectionHeading id="markets" title="Where to explore local food" intro="Markets and old neighbourhoods make good introductions because you can see the ingredients, watch food being prepared and choose a few stops at your own pace."/>
   <div className="grid gap-5 sm:grid-cols-2">{foodMarkets.map(market=><article key={market.id} className="flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card">
     <img src={market.image} alt={market.alt} width={755} height={460} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover"/>
     <div className="flex flex-1 flex-col p-4 sm:p-5">
       <p className="text-xs font-semibold uppercase tracking-wide text-primary"><MapPin className="mr-1 inline h-3.5 w-3.5" aria-hidden="true"/>{market.place}</p>
       <h3 className="mt-1 text-lg font-bold">{market.title}</h3>
       <p className="mt-1 text-sm font-medium">{market.mood}</p>
       <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{market.why}</p>
       <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{market.tip}</p>
       <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-4 text-sm">
         <Link className={shortLink} to={market.guide as LinkProps["to"]}>My area guide<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></Link>
         <External href={market.map}>View on Google Maps</External>
       </div>
     </div>
   </article>)}</div>
 </section>;
}
function Tours(){
 const offers=foodTours.map(tour=>{
   const tracking=affiliateConfig[tour.id]?.trackingUrl;
   if(!tracking||!/^https:\/\/(?:viator|getyourguide)\.tpm\.li\//.test(tracking))return null;
   const url=new URL(tracking);
   url.searchParams.set("sub_id",tour.subId);
   return {...tour,href:url.toString()};
 }).filter((item):item is NonNullable<typeof item>=>Boolean(item));
 if(offers.length===0)return null;
 return <section id="food-tours" aria-labelledby="food-tours-heading" className="mt-12 scroll-mt-24">
   <SectionHeading id="food-tours" title="Food walks and market tastings" intro="You can explore independently, but a guided tasting can help explain the ingredients, neighbourhoods and stories behind the food. These experiences are offered by external providers; check availability, exact tastings, meeting points and dietary arrangements for your dates."/>
   <div data-testid="israel-food-tour-cards" className="grid gap-4 md:grid-cols-3">{offers.map(tour=><article key={tour.id} className="flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card">
      <img src={tour.image} alt={tour.alt} width={560} height={350} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover"/>
      <div className="flex flex-1 flex-col p-4">
       <p className="text-xs font-semibold uppercase tracking-wide text-primary">{tour.provider} · {tour.location}</p>
       <h3 className="mt-2 text-lg font-bold leading-snug">{tour.name}</h3>
       <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tour.description}</p>
       <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground"><Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"/>{tour.detail}</p>
       <a href={tour.href} rel={relFor(true)} target="_blank" onClick={()=>recordOutboundClick({pageId:"what_to_eat_in_israel",productId:tour.id,offerId:tour.subId})} className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-primary/30 px-3 py-2.5 pt-4 text-sm font-semibold text-primary hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary">Check tour details<ExternalLink className="h-3.5 w-3.5" aria-hidden="true"/><span className="sr-only"> (opens in a new tab)</span></a>
      </div>
    </article>)}</div>
 </section>;
}
function Practical(){
 const items=[
  {title:"Ingredients and allergies",text:"Sesame (tahini), wheat, eggs, dairy and nuts appear frequently. Tell the person taking the order what you must avoid, including sauces, toppings and shared preparation."},
  {title:"Kosher, halal and plant-based",text:"These are different dietary questions. A kosher certificate is not the same as halal certification; a vegetarian description does not guarantee a vegan dish or allergen-safe preparation."},
  {title:"Portions and prices",text:"Check whether your order is a pita, laffa or full plate, and whether salads, extra dips, drinks or desserts cost more. Bakery items can be priced by weight."},
  {title:"Shabbat and holidays",text:"Many market stalls close ahead of Shabbat or holiday evenings. Other cafés and restaurants may remain open. Check the hours of the specific business rather than assuming every venue behaves alike."},
  {title:"Payment and service",text:"Prices are usually listed in Israeli shekels (ILS). Cards are common but a backup payment option is useful at small stalls. For table service, around 10–15% tipping is customary; check the bill."},
  {title:"A few easy ordering words",text:"Pita = pocket bread; laffa = wrap; charif = spicy; bli = without; bevakasha = please. If you need exact dietary control, ask for the full ingredient details."}
 ];
 return <section id="practical" aria-labelledby="practical-heading" className="mt-12 scroll-mt-24">
    <SectionHeading id="practical" title="Before you order: six useful tips" intro="A few questions make your first food stops much easier, especially if you are unfamiliar with the menu or have dietary needs."/>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{items.map((item,i)=><article key={item.title} className="rounded-xl border bg-card p-4"><h3 className="flex items-start gap-2 font-bold"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs text-primary">{i+1}</span>{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></article>)}</div>
    <div className="mt-5"><Tip>Want a market visit on Friday, a Jewish holiday or a religious festival? Check the <Link className="font-semibold underline underline-offset-2" to="/travel-blog/israel-holidays/">holiday dates</Link> and the individual business's hours. If you have a severe food allergy, obtain clear confirmation from the vendor; a dish name alone cannot confirm safety.</Tip></div>
    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">For more information about local payment and tipping customs, see <External href="https://visit.tel-aviv.gov.il/info/money">Tel Aviv's official visitor guidance</External>.</p>
 </section>;
}
type NavCard={title:string;description:string;to:LinkProps["to"];image:string;alt:string};
const exploreCards:NavCard[]=[
 {title:"Markets & shopping in Jerusalem",description:"Explore Mahane Yehuda, Old City markets and shopping neighbourhoods",to:"/travel-blog/shopping-in-jerusalem/",image:"/images/jerusalem-shopping/old-city-market.webp",alt:"Market lanes in Jerusalem's Old City"},
 {title:"Explore Tel Aviv",description:"Street markets, food stops and city highlights",to:"/travel-blog/attractions-in-tel-aviv/",image:"/images/attractions/tel-aviv-jaffa.webp",alt:"Tel Aviv skyline near the Mediterranean"},
 {title:"Old Jaffa",description:"Local cafés, historic streets and the old port",to:"/attractions/jaffa/",image:"/images/attractions/jaffa-port.webp",alt:"Old Jaffa Port and its waterfront"},
 {title:"Discover Akko",description:"Old City food lanes and northern coastal attractions",to:"/attractions/akko-acre/",image:"/images/attractions/akko-market.webp",alt:"Market stalls in Old Akko"},
 {title:"Explore Haifa",description:"The northern coast, gardens, local markets and neighbourhoods",to:"/attractions/haifa/",image:"/images/attractions/haifa-bahai-gardens.webp",alt:"Haifa Bahai Gardens terraces and harbour"},
 {title:"Jerusalem's Old City",description:"Historic quarters and places to explore on foot",to:"/attractions/old-city-jerusalem/",image:"/images/attractions/old-jerusalem-cardo.webp",alt:"Jerusalem's historic Cardo"}
];
const planningCards:NavCard[]=[
 {title:"Best time to visit Israel",description:"Weather, seasons and holiday planning",to:"/travel-blog/best-time-to-visit-israel/",image:migrationPhotos["best-time-to-visit-israel"].src,alt:migrationPhotos["best-time-to-visit-israel"].alt},
 {title:"3 days in Israel",description:"A short itinerary with time for a food stop",to:"/travel-blog/israel-itinerary-3-days/",image:"/images/attractions/jerusalem.webp",alt:"Jerusalem cityscape"},
 {title:"5 days in Israel",description:"Combine city visits and local neighbourhoods",to:"/travel-blog/israel-itinerary-5-days/",image:fiveDayPhoto,alt:"Caesarea archaeological coastline"},
 {title:"7 days in Israel",description:"Take more time between the cities",to:"/travel-blog/israel-itinerary-7-days/",image:"/images/attractions/sea-of-galilee.webp",alt:"Sea of Galilee"},
 {title:"Israel holidays",description:"Plan Shabbat, public holidays and opening hours",to:"/travel-blog/israel-holidays/",image:"/images/attractions/old-jerusalem-tower-of-david.webp",alt:"Historic Jerusalem"},
 {title:"Getting around Israel",description:"Trains, buses, city travel and private transfers",to:"/travel-blog/getting-around-israel/",image:travelByTrainPhoto,alt:"Train platforms at Ben Gurion Airport"}
];
function RelatedCard({item}:{item:NavCard}){
 // Match the linked destination's own hero photo, never an unrelated category shot.
 const canonicalPhoto=guideHeroPhotoForPath(String(item.to));
 const image=canonicalPhoto??{src:item.image,alt:item.alt};
 return <Link to={item.to} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-primary">
   <img src={image.src} alt={image.alt} width={560} height={350} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover"/>
   <span className="flex flex-1 flex-col p-3 sm:p-4"><strong className="text-sm leading-snug group-hover:text-primary sm:text-base">{item.title}</strong><span className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.description}</span><span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-primary">Explore guide<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></span></span>
 </Link>;
}

export function IsraelFoodGuide(){
 const sources=publicSources(guide.sourceIds);
 const [foodFilter,setFoodFilter]=useState<FoodKind|"all">("all");
 const [pendingDish,setPendingDish]=useState<string|null>(null);
 const onPickFood:PickFood=(event,dishId)=>{
   event.preventDefault();
   setFoodFilter("all");
   setPendingDish(dishId);
 };
 // Reveal a hidden dish before navigating to it. This also works after a user
 // selects a category and then returns to the quick-start or food-day links.
 useEffect(()=>{
   if(!pendingDish)return;
   const target=document.getElementById(pendingDish);
   if(target){
     window.history.replaceState(window.history.state,"","#"+pendingDish);
     target.scrollIntoView?.({behavior:"auto",block:"start"});
     target.querySelector("h3")?.focus?.({preventScroll:true});
   }
   setPendingDish(null);
 },[pendingDish,foodFilter]);
 return <main className="mx-auto max-w-5xl px-4 pb-10"><article>
   <header className="pt-6"><Breadcrumbs items={[{name:"Home",to:"/"},{name:"Travel guides",to:"/travel-blog/"},{name:"What to Eat in Israel",to:"/travel-blog/what-to-eat-in-israel/"}]}/>
     <GuideHeroLayout image={<GuideHeroMedia src={guide.photo.src} alt={guide.photo.alt}/>}>
       <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Israel travel food guide · Street food & markets</p>
       <h1 className="guide-page-title mt-2">What to Eat in Israel</h1>
       <p className="mt-4 max-w-3xl text-lg leading-relaxed" data-guide-intro>{guide.intro}</p>
       <PageUpdated date={guide.updatedAt||"2026-11-21"}/>
     </GuideHeroLayout>
     <AuthorCard/>
   </header>
   <section aria-label="My quick food recommendation" className="mt-8 rounded-xl border border-primary/20 bg-secondary/40 p-5 sm:p-6">
     <h2 className="text-xl font-bold">My first food recommendation</h2>
     <p className="mt-2 leading-relaxed">{guide.answer}</p>
   </section>
   <OnThisPage sections={nav}/>
   <QuickStart onPickFood={onPickFood}/>
   <TenDishes filter={foodFilter} setFilter={setFoodFilter} onPickFood={onPickFood}/>
   <FoodWords/>
   <FoodDay onPickFood={onPickFood}/>
   <Markets/>
   <Tours/>
   <Practical/>
   <FaqList faqs={foodFAQs}/>
   <section id="explore-more" aria-labelledby="explore-more-heading" className="mt-12 scroll-mt-24">
      <SectionHeading id="explore-more" title="Explore the neighbourhoods behind the flavours" intro="Turn your food stop into part of a bigger walking route or city visit."/>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{exploreCards.map(item=><RelatedCard key={item.to} item={item}/>)}</div>
   </section>
   <section id="plan-trip" aria-labelledby="plan-trip-heading" className="mt-12 scroll-mt-24">
      <SectionHeading id="plan-trip" title="Plan the rest of your Israel trip" intro="Use the food stops as a starting point, then match them with your dates, destinations and transport options."/>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{planningCards.map(item=><RelatedCard key={item.to} item={item}/>)}</div>
   </section>
   <HomeContactForm guide={{
     heading:"Planning a trip around Israel?",
     introduction:"I'm Moshe Barak. Tell me your travel dates, destinations and group size if you need an airport transfer, a private sightseeing day or a driver to help you explore more of Israel. I can also help you plan realistic stops along your route.",
     subject:"",
     placeholder:"Travel dates, destinations, number of passengers, pickup location or your question…"
   }}/>
   <SourcesDisclosure>
     <p className="leading-relaxed">This is an introductory guide to foods found across Israel, not a list of live restaurant recommendations. Dish recipes, dietary suitability, tour availability and opening hours vary by business. These tourism resources support practical planning:</p>
     <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
       {sources.map(source=><li key={source.id}><External href={source.url}>{source.publisher}: {source.title}</External></li>)}
       <li>Mahane Yehuda market-stall photograph: <External href="https://commons.wikimedia.org/wiki/File:Mahane_Yehuda_shoppers.jpg">Yoninah / Wikimedia Commons</External> · <External href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</External>; cropped and resized into WebP.</li>
       <li>Levinsky Market spice-shop photograph: <External href="https://commons.wikimedia.org/wiki/File:PikiWiki_Israel_9177_Levinsky_market_in_Tel_Aviv.JPG">Lior Golgher / PikiWiki Israel</External> · <External href="https://creativecommons.org/licenses/by/2.5/">CC BY 2.5</External>; cropped and resized into WebP.</li>
     </ul>
   </SourcesDisclosure>
 </article></main>;
}
