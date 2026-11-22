import type { ReactNode } from "react";
import { SiteLink as Link } from "@/components/SiteLink";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { HomeContactForm } from "@/components/HomeContactForm";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { Lightbulb, ExternalLink, ArrowUpRight, CheckCircle2 } from "lucide-react";

import jerusalem from "@/assets/home/jerusalem-old-city.webp";
import telAviv from "@/assets/home/tel-aviv-coast.webp";
import deadSea from "@/assets/dead-sea/landscape.webp";
import tiberias from "@/assets/home/tiberias-lake.webp";
import haifa from "@/assets/haifa/panorama.webp";
import airport from "@/assets/home/ben-gurion-t3.webp";
import train from "@/assets/airport-journeys/jerusalem-navon-platform.webp";
import masada from "@/assets/home/masada-dead-sea.webp";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { TRAVEL_TIPS_TITLE, TRAVEL_TIPS_UPDATED, travelTipsFaqs, travelTipsSources, travelTipsHero } from "@/data/israelTravelTips";

const linkClass = "font-semibold text-primary underline underline-offset-4 hover:text-primary/80";
const sections = [
  ["essentials", "Essential tips"],
  ["before-you-travel", "Before you travel"],
  ["entry", "Entry & ETA-IL"],
  ["safety", "Safety & insurance"],
  ["when-to-go", "When to visit"],
  ["arriving", "Arriving in Israel"],
  ["shabbat", "Shabbat & holidays"],
  ["plan-your-stay", "Plan your stay"],
  ["where-to-stay", "Where to stay"],
  ["getting-around", "Getting around"],
  ["everyday", "Everyday travel tips"],
  ["faq", "FAQ"],
  ["related", "More guides"],
  ["contact", "Contact me"],
] as const;

const essentials = [
  { title: "Entry rules", detail: "Check ETA-IL or visa eligibility for your passport.", href: "#entry" },
  { title: "Travel advisories", detail: "Review official advice and emergency instructions.", href: "#safety" },
  { title: "Insurance", detail: "Confirm medical, disruption and activity exclusions.", href: "#safety" },
  { title: "Dates & weather", detail: "Match your regions and activities to the season.", href: "#when-to-go" },
  { title: "Airport journey", detail: "Plan the last leg to your accommodation.", href: "#arriving" },
  { title: "Shabbat & holidays", detail: "Check Friday, Saturday and holiday schedules.", href: "#shabbat" },
  { title: "Realistic itinerary", detail: "Allow for traffic, walking and hotel changes.", href: "#plan-your-stay" },
  { title: "Getting around", detail: "Check trains, buses, taxis and private transport.", href: "#getting-around" },
  { title: "Mobile data", detail: "Set up a SIM/eSIM and save maps offline.", href: "#everyday" },
  { title: "Money & customs", detail: "Use shekels and prepare for religious-site rules.", href: "#everyday" },
] as const;

const bases = [
  { name: "Jerusalem", image: jerusalem, alt: "Jerusalem Old City and stone buildings", description: "A strong base for the Old City, religious landmarks, museums and nearby day trips.", href: "/travel-blog/where-to-stay-in-jerusalem/", cta: "Explore Jerusalem hotels" },
  { name: "Tel Aviv", image: telAviv, alt: "Tel Aviv Mediterranean coastline and city", description: "Beaches, restaurants, nightlife and rail connections to major cities and the airport.", href: "/travel-blog/where-to-stay-in-tel-aviv/", cta: "Explore Tel Aviv hotels" },
  { name: "Dead Sea", image: deadSea, alt: "Desert mountains and the Dead Sea shoreline", description: "An overnight desert stay for relaxation, Ein Bokek, Masada and nearby sights.", href: "/travel-blog/best-dead-sea-hotels/", cta: "Explore Dead Sea hotels" },
  { name: "Tiberias", image: tiberias, alt: "The Sea of Galilee from Tiberias", description: "A practical base for the Sea of Galilee, Christian heritage sites and northern excursions.", href: "/travel-blog/best-hotels-in-tiberias/", cta: "Explore Tiberias hotels" },
  { name: "Haifa", image: haifa, alt: "Haifa city and Mediterranean views", description: "An appealing northern base for Haifa, Akko, Caesarea and the Carmel region.", href: "/travel-blog/best-hotels-in-haifa/", cta: "Explore Haifa hotels" },
] as const;

const related = [
  { title: "Best Time to Visit Israel", description: "Seasonal weather and choosing your dates", image: migrationPhotos["best-time-to-visit-israel"].src, alt: "Israeli Mediterranean beach", href: "/travel-blog/best-time-to-visit-israel/" },
  { title: "Israel's Calendar of Events", description: "Holidays and dates that affect your plans", image: migrationPhotos["calendar-of-events"].src, alt: "Calendar showing travel dates", href: "/travel-blog/calendar-of-events/" },
  { title: "Ben Gurion Airport Arrival Tips", description: "A smoother arrival and airport transfer", image: airport, alt: "Ben Gurion Airport Terminal 3", href: "/travel-blog/ben-gurion-airport-arrival-tips/" },
  { title: "Getting Around Israel", description: "Trains, buses, taxis and private journeys", image: train, alt: "Jerusalem Yitzhak Navon railway station platform", href: "/travel-blog/getting-around-israel/" },
  { title: "What to Eat in Israel", description: "Popular dishes and practical food-market tips", image: migrationPhotos["what-to-eat-in-israel"].src, alt: "Israeli foods served together", href: "/travel-blog/what-to-eat-in-israel/" },
  { title: "7-Day Israel Itinerary", description: "A realistic introduction to key destinations", image: masada, alt: "Masada overlooking the Dead Sea", href: "/travel-blog/israel-itinerary-7-days/" },
] as const;





function Heading({ id, children, intro }: { id: string; children: ReactNode; intro?: string }) {
  return <div className="mb-5"><h2 id={id} className="scroll-mt-24 text-2xl font-bold tracking-tight sm:text-3xl">{children}</h2>{intro && <p className="mt-2 max-w-4xl leading-relaxed text-muted-foreground">{intro}</p>}</div>;
}

function Topic({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return <section id={id} className="mt-7 scroll-mt-24"><h3 className="text-xl font-bold">{title}</h3><div className="mt-3 space-y-3 leading-relaxed">{children}</div></section>;
}

function Tip({ children }: { children: ReactNode }) {
  return <aside role="note" className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 dark:border-amber-700/70 dark:bg-amber-950/25 dark:text-amber-100"><Lightbulb aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"/><p><strong>My tip:</strong> {children}</p></aside>;
}

function PhotoCard({ image, alt, name, description, href }: { image: string; alt: string; name: string; description: string; href: string; cta: string }) {
  const photo = guideHeroPhotoForPath(href);
  return <li className="min-w-0">
    <a href={href} className="editorial-card-link group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:border-primary/60 hover:bg-secondary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
      <span className="block overflow-hidden">
        <img src={photo?.src ?? image} alt={photo?.alt ?? alt} width={600} height={360} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"/>
      </span>
      <span className="flex flex-1 flex-col p-4"><strong className="text-lg group-hover:text-primary">{name}</strong><span className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</span></span>
    </a>
  </li>;
}

export function IsraelTravelTipsGuide() {
  return <main className="mx-auto max-w-5xl px-4 pb-12">
    <article>
      <header className="pt-6">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/travel-blog/" }, { name: "Israel Travel Tips", to: "/travel-blog/israel-travel-tips/" }]}/>
        <GuideHeroLayout image={<GuideHeroMedia src={travelTipsHero.src} alt={travelTipsHero.alt} width={640} height={400}/>}>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">My practical guide for first-time visitors</p>
          <h1 className="guide-page-title mt-2">{TRAVEL_TIPS_TITLE}</h1>
          <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed">Israel may be small, but transport schedules, religious holidays, regional weather and airport procedures can make a difference to your trip. Here are the practical tips I share with visitors, from planning your first day to getting around with confidence.</p>
          <PageUpdated date={TRAVEL_TIPS_UPDATED}/>
        </GuideHeroLayout>
        <AuthorCard/>
      </header>

      <section id="essentials" className="mt-8 scroll-mt-24" aria-labelledby="essentials-heading">
        <Heading id="essentials-heading" intro="Start here if you have only a few minutes. Each tip links to its explanation further down the page.">10 essential Israel travel tips</Heading>
        <div className="grid gap-3 sm:grid-cols-2" data-testid="essential-tips">
          {essentials.map((tip, index) => <a key={tip.title} href={tip.href} className={`${index >= 5 ? "hidden sm:flex" : "flex"} gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary`}>
            <span className="text-sm font-bold tabular-nums text-primary">{String(index + 1).padStart(2, "0")}</span><div className="min-w-0"><h3 className="font-bold">{tip.title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tip.detail}</p></div><ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4 shrink-0 text-primary"/>
          </a>)}
        </div>
        <details className="mt-3 rounded-xl border bg-card p-3 sm:hidden" data-testid="mobile-extra-quick-tips">
          <summary className="cursor-pointer px-2 py-1 text-sm font-semibold text-primary">Show 5 more quick tips</summary>
          <div className="mt-2 space-y-2">
            {essentials.slice(5).map(tip => <a key={tip.title} href={tip.href} className="block rounded-lg border bg-background p-3 hover:bg-secondary">
              <span className="font-semibold">{tip.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{tip.detail}</span>
            </a>)}
          </div>
        </details>
      </section>

      <OnThisPage sections={sections}/>

      <section id="before-you-travel" className="mt-11 scroll-mt-24" aria-labelledby="before-title">
        <Heading id="before-title" intro="A few checks before you pay for flights or accommodation can prevent expensive changes later.">Before you travel</Heading>
        <Topic id="entry" title="Check entry requirements and ETA-IL">
          <p>Entry rules depend on your nationality, passport and immigration status. Travelers from eligible visa-exempt countries generally need an approved <a href="https://israel-entry.piba.gov.il/" target="_blank" rel="noopener noreferrer" className={linkClass}>ETA-IL</a> before starting their journey; other visitors may need a visa. Use the official government portal rather than paying an unofficial intermediary.</p>
          <p>The Population and Immigration Authority recommends applying at least 72 hours <strong>before making flight, hotel or other travel bookings</strong>, allowing time for processing or corrections. An ETA-IL can be valid for up to two years or until your passport expires, whichever comes first; permitted stays and admission remain subject to the applicable rules and border decision. Recheck the portal shortly before departure.</p>
          <p>Keep copies of your passport, entry approval, flight details, accommodation address and insurance contacts available offline. Check requirements for any separate border crossing or destination on your itinerary.</p>
        </Topic>
        <Topic id="safety" title="Check safety advice and choose suitable insurance">
          <p>Conditions can change quickly and vary by region. Check your home government's current travel advisory and any official Israeli guidance before booking and again before departure. Keep your plans flexible and verify flights, road access, public transport and site opening when conditions change.</p>
          <p>While in Israel, follow instructions from local authorities and ask your accommodation provider where the nearest protected space is. For official visitor assistance consult the <a href="https://www.gov.il/BlobFolder/generalpage/emergency-information-for-tourists-in-israel/en/emergency-information-for-tourists-in-israel-new.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>Ministry of Tourism's emergency information for tourists (PDF)</a> and the <a href="https://www.oref.org.il/eng" target="_blank" rel="noopener noreferrer" className={linkClass}>Home Front Command</a>. Save these numbers: <strong>Police 100 · Ambulance 101 · Fire 102 · Home Front Command 104</strong>.</p>
          <p>Before buying travel insurance, compare emergency medical care, hospitalization, medical evacuation, cancellation, delays, luggage and any hiking or adventure activities. Read exclusions carefully, particularly those related to government travel advisories or regional security events. Confirm coverage for your precise destinations, dates and any pre-existing conditions.</p>
        </Topic>
        <Topic id="when-to-go" title="Choose your dates and pack for different regions">
          <p>Spring (March–May) and autumn (September–November) often suit sightseeing. Summers are usually hot, with coastal humidity and more intense heat around the Dead Sea, Eilat and the Negev. Winters can be mild on the coast but cool or rainy in Jerusalem and northern Israel. Check forecasts by destination, not only a countrywide average.</p>
          <p>Pack comfortable walking shoes, sun protection and a refillable water bottle. Add layers and a rain jacket for cooler months, modest clothing for religious sites, and suitable footwear for archaeological sites or desert trails. Israel uses 230V/50Hz electricity, commonly with Type H sockets; check your device and adapter.</p>
          <p>See my <Link to="/travel-blog/best-time-to-visit-israel/" className={linkClass}>season-by-season guide</Link> and <Link to="/travel-blog/calendar-of-events/" className={linkClass}>Israel's calendar of events</Link> for religious holidays, festivals and dates that can affect visitor plans.</p>
        </Topic>
        <Tip>Don't plan a desert walk around a summer afternoon. Check weather, trail access, opening hours, water requirements and official warnings before heading out.</Tip>
      </section>

      <section id="arriving" className="mt-12 scroll-mt-24" aria-labelledby="arrival-title">
        <Heading id="arrival-title" intro="Plan the journey to your actual hotel address—not just to the nearest city.">Arriving in Israel</Heading>
        <Topic title="Prepare for Ben Gurion Airport">
          <p>At Ben Gurion Airport, allow time for border procedures, baggage and customs before an onward connection. Decide in advance whether the train, an official taxi or a confirmed <Link to="/airport-transfers/" className={linkClass}>private airport transfer</Link> suits your destination, luggage and arrival hour.</p>
          <p>For your return flight, the <a href="https://www.iaa.gov.il/en/airports/ben-gurion/securitybgn/" target="_blank" rel="noopener noreferrer" className={linkClass}>Israel Airports Authority</a> advises arriving three hours before departure for security procedures; follow any more specific airline instructions and confirm your departure terminal.</p>
          <p>See my <Link to="/travel-blog/ben-gurion-airport-arrival-tips/" className={linkClass}>Ben Gurion Airport arrival tips</Link> and <Link to="/travel-blog/ben-gurion-airport-taxis/" className={linkClass}>official airport taxi guide</Link> for practical instructions.</p>
        </Topic>
        <Topic id="shabbat" title="Plan around Shabbat and Jewish holidays">
          <p>Shabbat begins on Friday evening and ends on Saturday evening, with times changing through the year. Trains and most regular bus services usually stop during this period; many businesses and attractions also close or reduce hours. Transport can stop well before sunset on Friday and resume after Shabbat ends.</p>
          <p>This does not mean every service is unavailable. Some communities have limited weekend shuttle networks, including the <a href="https://www.tel-aviv.gov.il/Residents/Transportation/Pages/naimbesofash.aspx" target="_blank" rel="noopener noreferrer" className={linkClass}>Tel Aviv-area Na'im Busofash service</a>. Taxis and private drivers may operate, subject to availability. These networks are not substitutes for regular national rail or bus service.</p>
          <p>When arriving or changing hotels on Friday or Saturday, verify your exact route, opening hours, luggage needs and check-in arrangements. My <Link to="/travel-blog/from-ben-gurion-airport-on-shabbat/" className={linkClass}>airport travel on Shabbat guide</Link> explains the options, while <Link to="/travel-blog/calendar-of-events/" className={linkClass}>Israel's calendar of events</Link> helps with holiday dates.</p>
        </Topic>
        <Tip>For Friday arrivals, check your flight's scheduled landing time against the final train or bus and any transfer to your hotel. The final part of the journey is easy to overlook.</Tip>
      </section>

      <section id="plan-your-stay" className="mt-12 scroll-mt-24" aria-labelledby="plan-title">
        <Heading id="plan-title" intro="A shorter, well-paced route is often more enjoyable than spending half your trip changing hotels.">Plan your stay</Heading>
        <Topic title="Decide how long to stay and what to prioritize">
          <p>For a first visit, seven to ten days can cover Jerusalem and Tel Aviv plus some time in the Dead Sea or northern Israel without rushing. Three days is better spent in one area; five days can combine the two main cities and perhaps a day trip. Leave time for traffic, meals, queues, check-in and journeys between stops.</p>
          <p>Compare my <Link to="/travel-blog/israel-itinerary-3-days/" className={linkClass}>3-day</Link>, <Link to="/travel-blog/israel-itinerary-5-days/" className={linkClass}>5-day</Link>, <Link to="/travel-blog/israel-itinerary-7-days/" className={linkClass}>7-day</Link> and <Link to="/travel-blog/israel-itinerary-10-days/" className={linkClass}>10-day</Link> travel plans. Reserve timed admission or special tours where needed, and recheck religious-site access before traveling.</p>
        </Topic>
        <div id="where-to-stay" className="mt-9 scroll-mt-24" aria-labelledby="stays-title">
          <h3 id="stays-title" className="text-xl font-bold">Where to stay in Israel</h3>
          <p className="mt-2 leading-relaxed">Jerusalem and Tel Aviv make convenient first-trip bases, but one or two nights elsewhere can reduce long return drives. Choose the location according to your main sights and the transport you plan to use.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="israel-stay-cards">
            {bases.map(base => <PhotoCard key={base.name} name={base.name} image={base.image} alt={base.alt} description={base.description} href={base.href} cta={base.cta}/>)}
          </ul>
        </div>
        <Topic id="getting-around" title="Choose transport by journey, not by habit">
          <p>Israel Railways connects major destinations, while buses cover many additional towns and sights. Jerusalem and Tel Aviv also have local transit and light rail. Check actual date-specific connections with <a href="https://rail.co.il/?lan=en" target="_blank" rel="noopener noreferrer" className={linkClass}>Israel Railways</a> and the <a href="https://bus.gov.il/en/home" target="_blank" rel="noopener noreferrer" className={linkClass}>national public transport planner</a>, especially on Fridays, holidays and late evenings.</p>
          <p>Use a <strong>Rav-Kav card or an authorized payment app</strong> for ordinary public transport where supported. Some bus operators accept contactless bank cards on selected routes, but it is not a universal replacement. Validate each trip as required, including before boarding light rail.</p>
          <p>Licensed taxis are helpful for shorter rides and luggage; a <Link to="/private-driver-in-israel/" className={linkClass}>private driver</Link> can suit multi-stop days, families or travellers needing an easier pace. Rental cars are useful in some rural areas but can add parking and traffic hassles in major city centers. Review my <Link to="/travel-blog/getting-around-israel/" className={linkClass}>getting around Israel guide</Link> and <Link to="/travel-blog/sherut-in-israel/" className={linkClass}>sherut guide</Link> before relying on an old shared-taxi route.</p>
        </Topic>
        <Tip>Allow more time than a map's fastest driving estimate when planning intercity days. Traffic, vehicle access to historic areas, parking and walking can add substantial time.</Tip>
      </section>

      <section id="everyday" className="mt-12 scroll-mt-24" aria-labelledby="everyday-title">
        <Heading id="everyday-title" intro="These small details make it easier to navigate once you arrive.">Everyday travel tips</Heading>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-5"><h3 className="text-lg font-bold">Stay connected</h3><p className="mt-2 text-sm leading-relaxed">Check roaming prices or arrange a local SIM/eSIM for navigation, booking messages and transport updates. Confirm that your phone is unlocked and compatible. Download offline maps, bookings and hotel addresses, and keep a charging cable and power bank handy.</p><p className="mt-3 text-sm"><Link to="/travel-blog/best-esim-for-israel/" className={linkClass}>Compare Israel eSIM options</Link></p></div>
          <div className="rounded-xl border bg-card p-5"><h3 className="text-lg font-bold">Money and payment</h3><p className="mt-2 text-sm leading-relaxed">The currency is the Israeli new shekel (ILS/NIS, ₪). Cards are widely accepted, but a little cash is useful in markets and small businesses. Check ATM fees and avoid unfavorable home-currency conversion at card terminals. A restaurant tip of around 10–15% is customary when service is not included.</p><p className="mt-3 text-sm">Check <a href="https://www.boi.org.il/en/" target="_blank" rel="noopener noreferrer" className={linkClass}>Bank of Israel exchange rates</a> for reference.</p></div>
          <div className="rounded-xl border bg-card p-5"><h3 className="text-lg font-bold">Weekdays and traffic</h3><p className="mt-2 text-sm leading-relaxed">The regular Israeli working week is Sunday to Thursday. Friday is shorter for many businesses, and weekend opening varies. Allow extra time around commuting periods and confirm your stop and station; signage and navigation apps often provide English names, but exact spellings can differ.</p></div>
          <div className="rounded-xl border bg-card p-5"><h3 className="text-lg font-bold">Religion and respectful visits</h3><p className="mt-2 text-sm leading-relaxed">Jewish, Muslim, Christian, Druze and Baháʼí communities have different customs and observances. Cover shoulders and knees where requested, follow local instructions, avoid interrupting prayers and ask before photographing worshippers. Some religious sites restrict visitor access during ceremonies.</p></div>
          <div className="rounded-xl border bg-card p-5"><h3 className="text-lg font-bold">Food and drinking water</h3><p className="mt-2 text-sm leading-relaxed">Try hummus, falafel, sabich, shakshuka and local market dishes. Kosher restaurants may close for Shabbat, while others remain open. Vegetarian and vegan options are common in larger cities. Tap water is generally safe, subject to any local notice; always carry water on hot days.</p><p className="mt-3 text-sm"><Link to="/travel-blog/what-to-eat-in-israel/" className={linkClass}>Discover what to eat in Israel</Link></p></div>
          <div className="rounded-xl border bg-card p-5"><h3 className="text-lg font-bold">Accessibility and special routes</h3><p className="mt-2 text-sm leading-relaxed">Old City lanes, archaeological sites and nature reserves can include steep paths, steps and uneven surfaces. Verify accessible entrances and suitable vehicles ahead of time. Border crossings and some areas have different entry, vehicle and insurance rules; check them separately rather than assuming any rental car or standard tour can enter.</p></div>
        </div>
        <div className="mt-6 flex items-start gap-3 rounded-xl border bg-secondary/40 p-4"><CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary"/><p className="text-sm leading-relaxed">Before setting out each day, check the venue's latest opening hours, weather, any required reservation and the return journey. For travel decisions affected by security or official restrictions, follow the relevant authorities' current advice.</p></div>
      </section>

      <FaqList faqs={[...travelTipsFaqs]}/>

      <section id="related" className="mt-12 scroll-mt-24" aria-labelledby="related-title">
        <Heading id="related-title" intro="Dive deeper only where you need more detail. These six guides help with the next stage of planning.">Related practical Israel travel guides</Heading>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3" data-testid="travel-tips-related-guides">
          {related.map(card => <li key={card.href} className="editorial-card-link min-w-0 overflow-hidden rounded-xl border bg-card"><a href={card.href} className="group flex h-full flex-col"><img src={guideHeroPhotoForPath(card.href)?.src ?? card.image} alt={guideHeroPhotoForPath(card.href)?.alt ?? card.alt} width={600} height={360} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover"/><div className="flex flex-1 flex-col p-4"><h3 className="font-bold group-hover:text-primary">{card.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p></div></a></li>)}
        </ul>
      </section>

      <HomeContactForm guide={{
        heading: "Need a private driver for your Israel trip?",
        introduction: "I'm Moshe Barak. I arrange private airport transfers, city-to-city journeys and personalized day trips with a driver. Tell me your travel dates, pickup point, destinations, passengers and luggage, and I'll reply personally about private transport options.",
        subject: "",
        placeholder: "Travel dates, pickup point, destinations, passengers, luggage and the journey you need…",
      }}/>

      <SourcesDisclosure>
        <p className="mb-3 leading-relaxed">Official information and planning resources. Entry conditions, security guidance, transport services and opening hours can change; check again for your travel dates.</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {travelTipsSources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 font-medium text-primary underline underline-offset-4 hover:text-primary/80">{source.label}<ExternalLink aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0"/></a></li>)}
        </ul>
      </SourcesDisclosure>
    </article>
  </main>;
}
