import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight, ExternalLink, MapPin, Landmark, UtensilsCrossed,
  Palette, Shirt, Store, CalendarDays, CreditCard, Receipt,
  Accessibility, Package, TrainFront, Lightbulb, Sun,
} from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { HomeContactForm } from "@/components/HomeContactForm";
import { neighborhoodTripContactCopy } from "@/lib/guide-contact";
import {
  jerusalemShoppingPlaces as places, shoppingMapPoints, shoppingTopPicks, shoppingDistricts,
  type ShoppingPlace,
} from "@/data/jerusalemShopping";

import oldCityPhoto from "@/assets/home/jerusalem-old-city.webp";
import mahaneHotelPhoto from "@/assets/jerusalem/mahane-yehuda.webp";
import hotelPhoto from "@/assets/jerusalem/mamilla.webp";
import foodPhoto from "@/assets/guides/2026-10/what-to-eat-in-israel.webp";
import tourPhoto from "@/assets/home/guided-tour-card.webp";
import calendarPhoto from "@/assets/guides/2026-10/calendar-of-events.webp";

const updatedAt = "2026-11-20";
const sections = [
  ["choose", "Choose where to shop"],
  ["compare", "Compare shopping areas"],
  ["shopping-map", "Shopping map"],
  ["places", "Ten places to shop"],
  ["routes", "Shopping routes"],
  ["practical", "Practical shopping tips"],
  ["faq", "FAQ"],
  ["explore-more", "Explore more"],
  ["contact", "Contact me"],
] as const;
const icons = [UtensilsCrossed, Landmark, Shirt, Store, Palette, CalendarDays];
const linkStyle = "inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary";

const related = [
  { title: "Explore Jerusalem's Old City", to: "/attractions/old-city-jerusalem/" as const, desc: "Quarters, gates and walking routes", image: oldCityPhoto, alt: "Stone streets in Jerusalem's Old City" },
  { title: "Stay near Mahane Yehuda", to: "/accommodation/jerusalem/mahane-yehuda-nachlaot/" as const, desc: "Accommodation around the market and Nachlaot", image: mahaneHotelPhoto, alt: "Mahane Yehuda market area in Jerusalem" },
  { title: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" as const, desc: "Choose a convenient neighbourhood for your visit", image: hotelPhoto, alt: "Mamilla neighbourhood in Jerusalem" },
  { title: "Food & market tours", to: "/tours/food-market-tours/" as const, desc: "Compare guided food walks and tastings", image: foodPhoto, alt: "Food served in Israel" },
  { title: "Jerusalem tours", to: "/tours/jerusalem/" as const, desc: "Guided city walks and day visits", image: tourPhoto, alt: "A guided tour in Israel" },
  { title: "Israel's calendar of events", to: "/travel-blog/calendar-of-events/" as const, desc: "Holidays and special dates that affect shopping", image: calendarPhoto, alt: "Israel holidays and special events" },
];

const faqs = [
  { q: "Where is the best place to shop for souvenirs in Jerusalem?", a: "I suggest starting with the Old City souks for traditional gifts, the Cardo for Judaica and art, or Hutzot Hayotzer for original craft. Ask about where more expensive pieces were made and the materials used." },
  { q: "Where should I go shopping on a rainy day?", a: "Malha Mall is a practical indoor choice. You can also visit enclosed shops in central Jerusalem, but a day at Malha is a separate journey from the Old City." },
  { q: "Can I shop in Jerusalem on Shabbat?", a: "Many city-centre shops and Mahane Yehuda market stalls close for Shabbat. The First Station hosts food and cultural activities on Saturdays, but its published shopping hours are 18:00–22:00. Check the business or event you want before setting out." },
  { q: "Can tourists get a VAT refund on purchases in Israel?", a: "Eligible tourists can apply for a VAT refund on qualifying goods bought at participating businesses, subject to the Israel Tax Authority's rules and documentation. Ask the retailer for the required paperwork and check the official procedure before departure." },
  { q: "Should I bargain in Jerusalem's markets?", a: "In some traditional market stalls polite bargaining is welcome; fixed-price shops, galleries and chain stores work differently. Confirm the total price before paying rather than assuming there is a standard discount." },
  { q: "When does the Bezalel Arts Fair take place?", a: "The arts fair is associated with Friday mornings in the Bezalel and Shatz pedestrian-street area. Dates, hours and the programme may change with weather or special events, so I recommend checking the current organiser listing before going." },
];

function OfficialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={linkStyle}>
    {children}<ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
    <span className="sr-only"> (opens in a new tab)</span>
  </a>;
}
function LocationLink({ place }: { place: ShoppingPlace }) {
  const url = "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(place.name + ", Jerusalem, Israel");
  return <a href={url} target="_blank" rel="noopener noreferrer" className={linkStyle}>
    <MapPin aria-hidden="true" className="h-4 w-4" />View on Google Maps
    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
    <span className="sr-only"> (opens in a new tab)</span>
  </a>;
}
function Heading({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return <div className="mb-5">
    <h2 id={id + "-h"} className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    {intro && <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}
  </div>;
}
function Tip({ children }: { children: React.ReactNode }) {
  return <aside className="flex gap-3 rounded-xl border border-amber-300/50 bg-amber-50/80 p-4 text-sm leading-relaxed text-slate-800">
    <Lightbulb aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
    <div>{children}</div>
  </aside>;
}
function PlacePhoto({ place }: { place: ShoppingPlace }) {
  return place.photo ? <img src={place.photo.src} alt={place.photo.alt} loading="lazy"
    decoding="async" width={880} height={495} className="aspect-[16/9] w-full object-cover" />
    : <div aria-hidden="true" data-shopping-photo-slot={place.id}
        className="flex aspect-[16/9] w-full items-center justify-center bg-secondary/50 text-primary/30">
        <Palette className="h-12 w-12" strokeWidth={1.25} />
      </div>;
}
function PlaceCard({ place, index }: { place: ShoppingPlace; index: number }) {
  return <article id={"shop-" + place.id} className="flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm">
    <PlacePhoto place={place} />
    <div className="flex flex-1 flex-col p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">{place.bestFor}</p>
      <h4 className="mt-1 text-xl font-bold">{index + 1}. {place.name}</h4>
      <p className="mt-3 text-sm leading-relaxed">{place.description}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{place.practical}</p>
      <div className="mt-4 space-y-2 rounded-lg bg-secondary/40 px-3 py-3 text-xs leading-relaxed">
        <p><strong>Look for:</strong> {place.highlights}</p>
        <p><strong>When to go:</strong> {place.when}</p>
        <p><strong>Getting there:</strong> {place.gettingThere}</p>
      </div>
    </div>
    <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t px-4 py-4 sm:px-5">
      <LocationLink place={place} />
      {place.official && <OfficialLink href={place.official.href}>{place.official.label}</OfficialLink>}
    </div>
  </article>;
}

const mapUrl = "/maps/jerusalem-shopping.html?waypoints=" + encodeURIComponent(JSON.stringify(shoppingMapPoints));

export function JerusalemShoppingGuide() {
  const [chosenPlace, setChosenPlace] = useState("all");
  const mapRef = useRef<HTMLIFrameElement>(null);
  const focusMap = (id: string) => {
    setChosenPlace(id);
    mapRef.current?.contentWindow?.postMessage({ type: "jerusalem-shopping-map-focus", id }, window.location.origin);
  };
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== mapRef.current?.contentWindow) return;
      if (event.data?.type !== "jerusalem-shopping-map-selected") return;
      const id = event.data.id;
      if (typeof id === "string" && shoppingMapPoints.some(place => place.id === id)) setChosenPlace(id);
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  return <main className="mx-auto max-w-5xl px-4 pb-10">
    <article>
      <header className="pt-6">
        <Breadcrumbs items={[
          { name: "Home", to: "/" },
          { name: "Travel guides", to: "/travel-blog/" },
          { name: "Shopping in Jerusalem", to: "/travel-blog/shopping-in-jerusalem/" },
        ]} />
        <GuideHeroLayout image={<GuideHeroMedia src="/images/jerusalem-shopping/hero.webp"
          alt="Evening shopping promenade lined with fashion boutiques in Jerusalem" />}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Jerusalem · Markets, shops & local design</p>
          <h1 className="guide-page-title mt-2">Shopping in Jerusalem: Markets, Crafts, Malls & Local Streets</h1>
          <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed">
            From the lively Mahane Yehuda Market and the Old City souks to Mamilla's boutiques and the city's arts stalls, my guide will help you decide where to shop in Jerusalem and how to combine nearby places.
          </p>
          <PageUpdated date={updatedAt} />
        </GuideHeroLayout>
        <AuthorCard />
      </header>

      <section aria-label="My shopping recommendation" className="mt-8 rounded-xl border border-primary/20 bg-secondary/40 p-5 sm:p-6">
        <h2 className="text-xl font-bold">Where I'd start</h2>
        <p className="mt-2 leading-relaxed">For food and market atmosphere, I'd choose <a href="#shop-mahane" className={linkStyle}>Mahane Yehuda</a>. For traditional gifts and historic streets, try the <a href="#shop-old-city" className={linkStyle}>Old City markets</a>. If you prefer branded shopping near Jaffa Gate, walk through <a href="#shop-mamilla" className={linkStyle}>Mamilla</a>. For original crafts, look into <a href="#shop-hutzot" className={linkStyle}>Hutzot Hayotzer</a> or the <a href="#shop-bezalel" className={linkStyle}>Bezalel Arts Fair</a> on an operating Friday.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Planning more than a shopping outing? My <Link to="/travel-blog/jerusalem-travel-guide/" className={linkStyle}>Jerusalem travel guide</Link> connects the Old City, museums, neighbourhoods, transport and day trips.</p>
      </section>
      <OnThisPage sections={sections} />

      <section id="choose" aria-labelledby="choose-h" className="mt-10 scroll-mt-24">
        <Heading id="choose" title="Where should you shop in Jerusalem?"
          intro="Pick the shopping experience you want, then jump to the full description, location and practical tips." />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {shoppingTopPicks.map((pick, index) => {
            const Icon = icons[index]!;
            return <a key={pick.id} href={"#shop-" + pick.id}
              className="group flex min-w-0 flex-col rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-secondary/25 focus-visible:outline-2 focus-visible:outline-primary">
              <Icon aria-hidden="true" className="h-6 w-6 text-primary" />
              <strong className="mt-3 text-sm leading-snug sm:text-base">{pick.title}</strong>
              <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick.description}</span>
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-primary">Explore this place <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></span>
            </a>;
          })}
        </div>
      </section>

      <section id="compare" aria-labelledby="compare-h" className="mt-12 scroll-mt-24">
        <Heading id="compare" title="Jerusalem shopping areas at a glance"
          intro="Ten distinct choices, from traditional markets to an indoor shopping mall. Opening hours vary between individual shops and events." />
        <div className="overflow-hidden rounded-xl border bg-card">
          <table className="hidden w-full table-fixed border-collapse text-left text-sm md:table">
            <caption className="sr-only">Comparison of ten Jerusalem shopping destinations</caption>
            <thead className="bg-secondary/60"><tr>
              <th scope="col" className="w-[26%] border-b px-3 py-3">Place</th>
              <th scope="col" className="w-[28%] border-b px-3 py-3">Best for</th>
              <th scope="col" className="w-[22%] border-b px-3 py-3">Area</th>
              <th scope="col" className="w-[24%] border-b px-3 py-3">When to go</th>
            </tr></thead>
            <tbody>{places.map(place => <tr key={place.id} className="border-b last:border-0">
              <th scope="row" className="px-3 py-3 font-semibold"><a href={"#shop-" + place.id} className="text-primary hover:underline">{place.name}</a></th>
              <td className="px-3 py-3">{place.bestFor}</td>
              <td className="px-3 py-3">{place.area}</td>
              <td className="px-3 py-3 text-muted-foreground">{place.when}</td>
            </tr>)}</tbody>
          </table>
          <ul className="divide-y md:hidden">
            {places.map(place => <li key={place.id} className="px-4 py-3">
              <a href={"#shop-" + place.id} className="font-semibold text-primary hover:underline">{place.name}</a>
              <p className="mt-1 text-sm">{place.bestFor}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{place.area} · {place.when}</p>
            </li>)}
          </ul>
        </div>
      </section>

      <section id="shopping-map" aria-labelledby="shopping-map-h" className="mt-12 scroll-mt-24">
        <Heading id="shopping-map" title="Jerusalem shopping map"
          intro="See which places make sense together on foot and which need a separate journey. Select a destination to zoom in." />
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-end">
            <label htmlFor="jerusalem-shop-select" className="w-full min-w-0 text-sm font-semibold sm:w-auto sm:flex-1">
              Focus on a shopping destination
              <select id="jerusalem-shop-select" value={chosenPlace} onChange={event => focusMap(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm font-normal focus-visible:outline-2 focus-visible:outline-primary">
                <option value="all">All 10 places</option>
                {shoppingDistricts.map(district => <optgroup key={district.id} label={district.title}>
                  {places.filter(place => place.district === district.title).map(place => <option key={place.id} value={place.id}>{places.indexOf(place) + 1}. {place.name}</option>)}
                </optgroup>)}
              </select>
            </label>
            <button type="button" onClick={() => focusMap("all")} disabled={chosenPlace === "all"}
              className="min-h-11 w-full rounded-lg border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary disabled:opacity-40 sm:w-auto">Show all places</button>
          </div>
          <iframe ref={mapRef} title="Interactive map of ten Jerusalem shopping locations"
            loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
            src={mapUrl} width={900} height={440}
            onLoad={() => { if (chosenPlace !== "all") mapRef.current?.contentWindow?.postMessage({ type: "jerusalem-shopping-map-focus", id: chosenPlace }, window.location.origin); }}
            className="h-[340px] w-full border-0 sm:h-[440px]" />
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 text-xs text-muted-foreground">
            <span>Map markers indicate approximate shopping-area locations. Map data © OpenStreetMap contributors.</span>
            {chosenPlace === "all" ?
              <OfficialLink href="https://www.google.com/maps/search/?api=1&query=Jerusalem+shopping">Open in Google Maps</OfficialLink> :
              <LocationLink place={places.find(place => place.id === chosenPlace)!} />}
          </div>
        </div>
      </section>

      <section id="places" aria-labelledby="places-h" className="mt-12 scroll-mt-24">
        <Heading id="places" title="My guide to ten places to shop in Jerusalem"
          intro="I've grouped the destinations by area so you can combine places without unnecessary trips across the city." />
        {shoppingDistricts.map((district, index) => <section key={district.id} className="mt-9" aria-label={district.title}>
          <h3 className="text-xl font-bold sm:text-2xl">{district.title}</h3>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{district.intro}</p>
          <div className={"mt-5 grid items-stretch gap-5 md:grid-cols-2 " + (places.filter(place => place.district === district.title).length === 3 ? "lg:grid-cols-3" : "")}>
            {places.filter(place => place.district === district.title).map(place =>
              <PlaceCard key={place.id} place={place} index={places.indexOf(place)} />)}
          </div>
          {index === 0 && <div className="mt-5"><Tip>If you want both the traditional market and Mamilla, choose an Old City gate that suits your walking route. The Cardo is inside the Jewish Quarter, with steps and uneven paving on some approaches.</Tip></div>}
          {index === 1 && <div className="mt-5"><Tip>Mahane Yehuda is best for food shopping earlier in the day. The Bezalel Arts Fair is a Friday event, so check its current schedule rather than assuming the same stalls will be there every day.</Tip></div>}
        </section>)}
      </section>

      <section id="routes" aria-labelledby="routes-h" className="mt-12 scroll-mt-24">
        <Heading id="routes" title="Three easy ways to combine shopping and sightseeing"
          intro="Choose one area that suits your day, then allow time for browsing, breaks and anything you want to carry back." />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-5"><Landmark aria-hidden="true" className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-bold">Old City & Mamilla</h3>
            <p className="mt-2 text-sm leading-relaxed">Browse the Old City souks and the Cardo, then continue towards Jaffa Gate and Mamilla. I would make the markets the main outing and leave Mamilla for a relaxed finish.</p>
            <p className="mt-3 text-xs text-muted-foreground">Best for: traditional gifts, history and modern shops</p>
          </div>
          <div className="rounded-xl border bg-card p-5"><UtensilsCrossed aria-hidden="true" className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-bold">Mahane Yehuda & downtown</h3>
            <p className="mt-2 text-sm leading-relaxed">Start with the market, then walk towards Ben Yehuda and the central pedestrian streets. On a Friday when the arts fair is running, consider adding the Bezalel/Shatz area.</p>
            <p className="mt-3 text-xs text-muted-foreground">Best for: food, street life and local design</p>
          </div>
          <div className="rounded-xl border bg-card p-5"><Sun aria-hidden="true" className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-bold">German Colony & First Station</h3>
            <p className="mt-2 text-sm leading-relaxed">Explore Emek Refaim's cafés and boutiques, then continue to the First Station for a meal or a scheduled event. Check pop-up market dates before relying on shopping stalls.</p>
            <p className="mt-3 text-xs text-muted-foreground">Best for: relaxed neighbourhood browsing</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">For an indoor mall day, I suggest visiting Malha separately and planning your return journey.</p>
      </section>

      <section id="practical" aria-labelledby="practical-h" className="mt-12 scroll-mt-24">
        <Heading id="practical" title="My practical shopping tips"
          intro="A little planning makes market visits and larger purchases much easier, especially around Shabbat and holidays." />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-5"><CalendarDays aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-2 font-bold">Fridays, Shabbat & holidays</h3>
            <p className="mt-2 text-sm leading-relaxed">Many shops and market stalls close early on Friday and remain closed on Saturday. The First Station runs some food and cultural activities on Saturday, but its shopping page lists Saturday shopping hours of 18:00–22:00. Check the specific venue. See my <Link to="/travel-blog/calendar-of-events/" className="font-semibold text-primary hover:underline">Israel calendar of events</Link> for holidays that may affect shopping.</p>
          </div>
          <div className="rounded-xl border bg-card p-5"><CreditCard aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-2 font-bold">Payment & bargaining</h3>
            <p className="mt-2 text-sm leading-relaxed">Cards are widely accepted in established shops, while some small market stalls may prefer cash. Confirm the total price in shekels before paying. Negotiate politely only where it is welcomed; there is no universal market discount.</p>
          </div>
          <div className="rounded-xl border bg-card p-5"><Receipt aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-2 font-bold">Tourist VAT refunds</h3>
            <p className="mt-2 text-sm leading-relaxed">Eligible tourists may qualify for a VAT refund on certain goods bought from approved participating retailers. Ask for the required documentation at purchase and follow the <OfficialLink href="https://www.gov.il/en/pages/vat-refund-guide-for-tourists?chapterIndex=1">Israel Tax Authority guide</OfficialLink> for current conditions.</p>
          </div>
          <div className="rounded-xl border bg-card p-5"><Package aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-2 font-bold">Authenticity, returns & packing</h3>
            <p className="mt-2 text-sm leading-relaxed">Ask about materials, the maker and return or exchange policies, especially for jewellery and artwork. Keep your receipt and check whether delicate or large purchases can be packed or shipped safely. Food gifts also need to comply with your destination's import rules.</p>
          </div>
          <div className="rounded-xl border bg-card p-5"><Accessibility aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-2 font-bold">Accessibility & walking</h3>
            <p className="mt-2 text-sm leading-relaxed">Parts of the Old City include steps, narrow lanes and uneven surfaces. Mamilla and modern malls offer a different walking environment. For specific step-free access or mobility help, check the entrance and route to the individual business.</p>
          </div>
          <div className="rounded-xl border bg-card p-5"><TrainFront aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-2 font-bold">Getting around with purchases</h3>
            <p className="mt-2 text-sm leading-relaxed">The light rail serves central Jerusalem near Mahane Yehuda and Ben Yehuda Street. A taxi can be easier with bulky shopping or for Malha, Emek Refaim and the First Station. Keep your return route and luggage in mind.</p>
          </div>
        </div>
      </section>

      <FaqList faqs={faqs} />

      <section id="explore-more" aria-labelledby="explore-more-h" className="mt-12 scroll-mt-24">
        <Heading id="explore-more" title="Explore Jerusalem further"
          intro="Use my related guides to fit shopping around your sightseeing, food experiences and where you stay." />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {related.map(item => <Link key={item.to} to={item.to}
            className="group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-primary">
            <img src={item.image} alt={item.alt} loading="lazy" decoding="async" width={560} height={340}
              className="aspect-[16/10] w-full object-cover" />
            <span className="flex flex-1 flex-col p-3 sm:p-4">
              <strong className="text-sm leading-snug group-hover:text-primary sm:text-base">{item.title}</strong>
              <span className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.desc}</span>
              <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-primary">Explore guide <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></span>
            </span>
          </Link>)}
        </div>
      </section>

      <HomeContactForm guide={neighborhoodTripContactCopy("Jerusalem")} />
      <SourcesDisclosure>
        <p className="mb-3 text-sm leading-relaxed">I use destination and venue information for the markets, shopping venues and tax guidance. Check current event dates and individual shop opening times before visiting.</p>
        <ul className="grid gap-x-5 gap-y-3 text-sm sm:grid-cols-2">
          <li><OfficialLink href="https://en.machne.co.il/">Mahane Yehuda — independent market visitor guide</OfficialLink></li>
          <li><OfficialLink href="https://edisonhafakot.co.il/he/fairline/3">Bezalel Arts Fair — organiser and Friday schedule (Hebrew)</OfficialLink></li>
          <li><OfficialLink href="https://alrovmamilla.com/en/">Alrov Mamilla Avenue — official shops and hours</OfficialLink></li>
          <li><OfficialLink href="https://azrieligroup.com/properties/azrieli-mall-jerusalem/">Azrieli Jerusalem Mall — official mall information</OfficialLink></li>
          <li><OfficialLink href="https://artistscolony.co.il/">Hutzot Hayotzer — artists' colony website</OfficialLink></li>
          <li><OfficialLink href="https://www.firststation.co.il/en/shopping-at-the-first-station/">The First Station — shopping hours</OfficialLink></li>
          <li><OfficialLink href="https://www.firststation.co.il/en/saturdays-at-the-first-station/">The First Station — Saturday dining and activities</OfficialLink></li>
          <li><OfficialLink href="https://www.gov.il/en/pages/vat-refund-guide-for-tourists?chapterIndex=1">Israel Tax Authority — tourist VAT refund rules</OfficialLink></li>
        </ul>
      </SourcesDisclosure>
    </article>
  </main>;
}
