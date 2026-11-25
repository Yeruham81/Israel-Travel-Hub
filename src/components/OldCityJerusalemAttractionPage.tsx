import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Footprints } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { ExternalTourCard } from "@/components/TourCatalog";
import { CuratedPartnerTourCard } from "@/components/CuratedPartnerTourCard";
import { OldCityJerusalemRouteMap } from "@/components/OldCityJerusalemRouteMap";
import { tourProducts } from "@/data/registry";
import { oldCityJerusalemSite } from "@/data/oldCityJerusalemSite";
import guidedTourPhoto from "@/assets/home/guided-tour-card.webp";

const featuredOldCityTours = tourProducts.filter(tour => tour.status === "published" && (tour.id === "jerusalem-old-city-walk" || tour.id === "jerusalem-private-oldcity-walk"));

const official = oldCityJerusalemSite.official;
const info = oldCityJerusalemSite.visitor;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const jaffaGateDirections = "https://www.google.com/maps/dir/?api=1&destination=Jaffa%20Gate%2C%20Jerusalem%2C%20Israel&travelmode=driving";
const dungGateDirections = "https://www.google.com/maps/dir/?api=1&destination=Dung%20Gate%2C%20Jerusalem%2C%20Israel&travelmode=driving";
const damascusGateDirections = "https://www.google.com/maps/dir/?api=1&destination=Damascus%20Gate%2C%20Jerusalem%2C%20Israel&travelmode=walking";
const photos = {
  wall: "/images/attractions/old-jerusalem-western-wall.webp",
  sepulchre: "/images/attractions/old-jerusalem-holy-sepulchre.webp",
  via: "/images/attractions/old-jerusalem-via-dolorosa.webp",
  temple: "/images/attractions/old-jerusalem-temple-mount.webp",
  cardo: "/images/attractions/old-jerusalem-cardo.webp",
  tower: "/images/attractions/old-jerusalem-tower-of-david.webp",
  tunnels: "/images/attractions/old-jerusalem-western-wall-tunnels.webp",
  damascus: "/images/attractions/old-jerusalem-damascus-gate.webp",
} as const;

export const oldCityJerusalemDestinationContent: AttractionDestinationContent = {
  path: "/attractions/old-city-jerusalem/",
  placeName: "Jerusalem's Old City",
  title: oldCityJerusalemSite.title,
  heroTitle: "Jerusalem’s Old City: What to See & How to Visit",
  highlightsTitle: "What to see in Jerusalem's Old City",
  region: oldCityJerusalemSite.region,
  updatedAt: oldCityJerusalemSite.updatedAt,
  hero: oldCityJerusalemSite.hero,
  intro: oldCityJerusalemSite.intro,
  visitorTitle: "Opening hours, tickets and accessibility",
  visitorNavLabel: "Hours & tickets",
  historyTitle: "A city of four historic quarters",
  relatedTitle: "Continue exploring Jerusalem",
  itineraryFirst: true,
  itineraryTitle: "Plan your Old City visit",
  contactIntroduction: "Tell me your hotel or pickup point, visiting date, passengers and the Old City landmarks you want to see. I can arrange private transport with a driver to a suitable entrance gate and pickup after your walk.",
  facts: [
    { icon: "location", label: "Location", value: "Inside the city walls", note: "Six main entrance gates featured on the map" },
    { icon: "duration", label: "Time needed", value: "2–3 hours to a full day", note: "Around 4–5 hours for a classic cross-quarter walk" },
    { icon: "admission", label: "Old City streets", value: "Free entry", note: "Museums, tours and the ramparts charge separately" },
    { icon: "hours", label: "Opening hours", value: "Vary by site", note: "Religious services and security affect access" },
    { icon: "highlights", label: "Don't miss", value: "Sacred landmarks", note: "Western Wall, Holy Sepulchre and historic lanes" },
    { icon: "access", label: "Getting around", value: "Mainly on foot", note: "Uneven stones, stairs and some steep routes" },
  ],
  glanceNote: <>The <strong>Old City streets, Western Wall prayer plaza and Church of the Holy Sepulchre</strong> are generally free to enter. Paid experiences such as the <a href={official.tower} target="_blank" rel="noopener noreferrer" className={inlineLink}>Tower of David</a>, the <a href={official.tunnels} target="_blank" rel="noopener noreferrer" className={inlineLink}>Western Wall Tunnels</a> and the <a href={official.ramparts} target="_blank" rel="noopener noreferrer" className={inlineLink}>Ramparts Walk</a> have their own arrangements. Plan your route around the sites you most want to see.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight mobileImageFirst title="The Western Wall (Kotel)" image={{ src: photos.wall, alt: "Western Wall prayer plaza beneath Jerusalem's ancient stone walls, with the Dome of the Rock visible behind" }}>
        <p>One of the most visited places in Jerusalem, the Western Wall is a Jewish prayer site beside the western retaining wall of the ancient Temple Mount. The open plaza is worth visiting even on a short walk through the Old City.</p>
        <p>The plaza is generally open around the clock and entry is free. Be respectful of worshippers, follow the posted prayer-area arrangements and allow extra time for security screening during holidays. <a href={official.westernWall} target="_blank" rel="noopener noreferrer" className={inlineLink}>Western Wall visitor information</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Free entry to the prayer plaza</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst title="Church of the Holy Sepulchre" image={{ src: photos.sepulchre, alt: "Ornate chapel with lamps and religious paintings inside the Church of the Holy Sepulchre" }}>
        <p>In the Christian Quarter, this major pilgrimage church is traditionally associated with the crucifixion, burial and resurrection of Jesus. Its chapels, tomb shrine and prayer spaces are shared by several Christian communities.</p>
        <p>Entry is free, but services and visitor queues can affect access. I recommend allowing at least an hour if you would like to explore more than the entrance area. Check the <a href={official.christianHours} target="_blank" rel="noopener noreferrer" className={inlineLink}>Christian Information Center's current church hours</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Free entry; opening hours vary seasonally</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst title="Via Dolorosa and the Christian Quarter" image={{ src: photos.via, alt: "Narrow stone street and shops along the Via Dolorosa in Jerusalem's Old City" }}>
        <p>The Via Dolorosa is the traditional route associated with Jesus carrying the cross. Its Stations of the Cross pass through busy streets, chapels and parts of the Muslim and Christian Quarters, ending at the Holy Sepulchre.</p>
        <p>Walking along the public streets is free. You can follow the marked stations independently or join a pilgrimage-focused guided walk; individual chapels may have restricted hours. <Link to="/attractions/via-dolorosa/" className={inlineLink}>Follow my complete Via Dolorosa route and all 14 stations</Link>, or <Link to="/travel-blog/churches-in-jerusalem/" className={inlineLink}>explore more Jerusalem churches</Link>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Free public walking route</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst title="Temple Mount" image={{ src: photos.temple, alt: "Golden Dome of the Rock on the Temple Mount in Jerusalem" }}>
        <p>The Temple Mount is sacred to Judaism and Islam. The compound includes the Dome of the Rock and Al-Aqsa Mosque and is one of the most significant religious sites in Jerusalem.</p>
        <p><strong>Visitor access is tightly controlled.</strong> Non-Muslim visits, when permitted, normally use the Mughrabi Gate approach beside the Western Wall, on Sunday–Thursday during limited visiting windows. Access for non-Muslim visitors is generally closed on Fridays and Saturdays, and may also be restricted on religious holidays or for security reasons. The interiors of Al-Aqsa Mosque and the Dome of the Rock are generally not open to non-Muslim visitors. Check the latest access arrangements shortly before your visit.</p>
        <p className="text-xs font-semibold text-muted-foreground">Limited visiting windows; no general admission to the shrine interiors</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst title="Jewish Quarter, Cardo and Hurva Synagogue" image={{ src: photos.cardo, alt: "Historic vaulted Cardo shopping passage with stone paving in Jerusalem's Jewish Quarter" }}>
        <p>The Jewish Quarter offers restored lanes, archaeological remains, the Cardo's colonnaded Roman-era street and the distinctive Hurva Synagogue. It is an enjoyable area for an unhurried walk between the market streets and the Western Wall.</p>
        <p>The public streets and open sections of the Cardo can be explored freely. Entry to certain archaeological exhibits, synagogue interiors and guided attractions may require a separate ticket or have limited visiting hours.</p>
        <p className="text-xs font-semibold text-muted-foreground">Public lanes free; indoor attractions may be ticketed</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst title="Tower of David Jerusalem Museum and Jaffa Gate" image={{ src: photos.tower, alt: "Ancient stone fortress, towers and courtyards at the Tower of David near Jaffa Gate" }}>
        <p>Just inside Jaffa Gate, the Tower of David's citadel offers an excellent introduction to the city's long history through archaeology, exhibitions and views from the fortress. The nearby gate is also a practical starting point for exploring the Christian and Armenian Quarters.</p>
        <p>Allow around 60–90 minutes for the museum. The main visitor entrance is opposite Jaffa Gate Plaza, near the exit from Mamilla Avenue, rather than through the historic Jaffa Gate passage. Museum tickets are separate from other Old City attractions. <a href={official.towerEntrance} target="_blank" rel="noopener noreferrer" className={inlineLink}>Find the museum entrance</a> and <a href={official.tower} target="_blank" rel="noopener noreferrer" className={inlineLink}>check tickets and hours</a>.</p>
        <p>From Jaffa Gate, you can also explore the quieter Armenian Quarter and the Cathedral of St. James. The cathedral normally admits visitors only during short prayer-service periods, and the surrounding monastery is not open for casual visits. <a href={official.stJames} target="_blank" rel="noopener noreferrer" className={inlineLink}>Check the visitor arrangements</a> before going.</p>
        <p className="text-xs font-semibold text-muted-foreground">Museum admission: {info.towerAdult} adult; Jaffa Gate itself is free</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst title="Western Wall Tunnels" image={{ src: photos.tunnels, alt: "Illuminated ancient stone vaults along the underground Western Wall Tunnels tour" }}>
        <p>A guided walk beneath the Old City streets reveals historic sections of the Western Wall, archaeological layers and stone passages that are not visible from the plaza above. Several routes are offered, each with a different emphasis.</p>
        <p>Unlike the outdoor plaza, tunnel visits are paid and should be booked for a specific tour time. <a href={official.tunnelsBooking} target="_blank" rel="noopener noreferrer" className={inlineLink}>View tours and book directly with the Western Wall Heritage Foundation</a>.</p>
        <p>Accessibility varies considerably by route: the Great Stone Tour is partly accessible with advance arrangements for wheelchair users, while the Great Bridge route is not wheelchair accessible. Check the <a href={official.tunnelsAccessibility} target="_blank" rel="noopener noreferrer" className={inlineLink}>official tour-by-tour accessibility guidance</a> before booking.</p>
        <p className="text-xs font-semibold text-muted-foreground">Ticketed guided tour; advance booking recommended</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst title="Damascus Gate and the Muslim Quarter Markets" image={{ src: photos.damascus, alt: "Historic stone Damascus Gate at the entrance to Jerusalem's Old City" }}>
        <p>Damascus Gate leads into the lively markets of the Muslim Quarter, where you can browse traditional food shops, souks and narrow streets. The gate is also a useful approach to the early stations of the Via Dolorosa.</p>
        <p>For panoramic views, begin the <a href={official.ramparts} target="_blank" rel="noopener noreferrer" className={inlineLink}>Ramparts Walk</a> at Jaffa Gate. Its north and south routes have stairs, uneven paving and elevated stone paths, which affect wheelchair and stroller access.</p>
        <p className="text-xs font-semibold text-muted-foreground">Markets and gate free; separate Ramparts Walk: {info.rampartsAdult} per adult</p>
      </AttractionHighlight>
      <AttractionPracticalTip>Following the Via Dolorosa? Save a station-by-station route before setting out. The numbered stops can be easy to miss among busy market lanes, and the final stations are inside the Church of the Holy Sepulchre.</AttractionPracticalTip>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>Explore the streets, prayer plazas and market lanes at your own pace. Use this table to compare visiting arrangements for individual landmarks and book time-specific experiences.</p>
      <div role="region" aria-label="Old City opening hours and admission table" tabIndex={0} className="max-w-full overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary" data-testid="jerusalem-old-city-hours-fees">
        <table className="w-full min-w-[830px] border-collapse text-left text-sm">
          <caption className="sr-only">Opening hours, prices and entry information for Old City landmarks</caption>
          <thead className="bg-secondary/60">
            <tr>{["Site", "Visiting hours", "Admission", "Booking and entry"].map((heading,index)=><th key={heading} scope="col" className={index===0?"sticky left-0 z-10 border-b bg-secondary px-3 py-3 font-semibold":"border-b px-3 py-3 font-semibold"}>{heading}</th>)}</tr>
          </thead>
          <tbody>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold">Old City streets and markets</th><td className="px-3 py-3 align-top">Public pedestrian routes throughout the day</td><td className="px-3 py-3 align-top">Free</td><td className="px-3 py-3 align-top">Shop hours vary by quarter and day</td></tr>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold">Western Wall plaza</th><td className="px-3 py-3 align-top">Generally open day and night</td><td className="px-3 py-3 align-top">Free</td><td className="px-3 py-3 align-top"><a href={official.westernWall} target="_blank" rel="noopener noreferrer" className={inlineLink}>Prayer and visitor guidance</a>; screening at busy times</td></tr>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold">Church of the Holy Sepulchre</th><td className="px-3 py-3 align-top">Daily; hours vary seasonally and for services</td><td className="px-3 py-3 align-top">Free</td><td className="px-3 py-3 align-top"><a href={official.christianHours} target="_blank" rel="noopener noreferrer" className={inlineLink}>Church opening hours</a>; allow time for queues</td></tr>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold">Via Dolorosa</th><td className="px-3 py-3 align-top">Public lanes throughout the day</td><td className="px-3 py-3 align-top">Free</td><td className="px-3 py-3 align-top">Chapels along the route have individual schedules</td></tr>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold">Jewish Quarter & Cardo</th><td className="px-3 py-3 align-top">Public streets throughout the day</td><td className="px-3 py-3 align-top">Free public lanes</td><td className="px-3 py-3 align-top">Hurva Synagogue interiors and exhibits have separate visiting arrangements</td></tr>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold">Temple Mount</th><td className="px-3 py-3 align-top">Non-Muslim visiting windows generally Sunday–Thursday, when permitted</td><td className="px-3 py-3 align-top">Subject to access arrangements</td><td className="px-3 py-3 align-top">Use the designated approach near the Western Wall and check current entry instructions</td></tr>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold">Tower of David Museum</th><td className="px-3 py-3 align-top">Sun 12:00–17:00; Mon, Wed, Thu 09:00–17:00; Tue 09:00–20:00; Fri, Sat 09:00–15:00</td><td className="px-3 py-3 align-top">{info.towerAdult} adult</td><td className="px-3 py-3 align-top"><a href={official.tower} target="_blank" rel="noopener noreferrer" className={inlineLink}>Tickets and hours</a>; last entry one hour before closing</td></tr>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold">Ramparts Walk</th><td className="px-3 py-3 align-top">Sat–Thu 09:00–16:00 winter / 17:00 summer; Fridays and holiday eves 09:00–14:00</td><td className="px-3 py-3 align-top">{info.rampartsAdult} adult</td><td className="px-3 py-3 align-top"><a href={official.rampartsTickets} target="_blank" rel="noopener noreferrer" className={inlineLink}>Tickets</a>; enter at Jaffa Gate and choose north or south</td></tr>
            <tr className="border-b"><th scope="row" className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold">Western Wall Tunnels</th><td className="px-3 py-3 align-top">Timed guided visits by reservation</td><td className="px-3 py-3 align-top">By tour</td><td className="px-3 py-3 align-top"><a href={official.tunnelsBooking} target="_blank" rel="noopener noreferrer" className={inlineLink}>Choose and book a tour</a>; follow its specific meeting-point directions</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm leading-relaxed">For religious holidays and special events, check <Link to="/travel-blog/calendar-of-events/" className={inlineLink}>Israel's calendar of events</Link> and the relevant operator's opening notice.</p>
      <section className="rounded-xl border bg-secondary/20 p-4 sm:p-5" data-testid="jerusalem-old-city-published-hours">
        <h3 className="font-serif text-xl font-semibold">Two worthwhile paid experiences</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div><h4 className="font-semibold">Ramparts Walk</h4><p className="mt-1 text-sm leading-relaxed">The <strong>southern route</strong> runs from Jaffa Gate toward Dung Gate above the Armenian and Jewish Quarters (around 45 minutes). The <strong>northern route</strong> runs toward Lion's Gate above the Christian and Muslim Quarters (around 90 minutes). Friday access is limited to the southern route and Jaffa Gate–New Gate northern section. Both routes have stairs and elevated stone paths. <a href={official.ramparts} target="_blank" rel="noopener noreferrer" className={inlineLink}>Routes, hours and tickets</a>.</p></div>
          <div><h4 className="font-semibold">Western Wall Tunnels</h4><p className="mt-1 text-sm leading-relaxed">Book the route that interests you: archaeological passages reveal sections of the Western Wall and historic structures beneath today's streets. Check <a href={official.tunnelsAccessibility} target="_blank" rel="noopener noreferrer" className={inlineLink}>accessibility for the individual tour</a> and the <a href={official.tunnelsBooking} target="_blank" rel="noopener noreferrer" className={inlineLink}>available guided sessions</a>.</p></div>
        </div>
      </section>
      <AttractionPracticalTip>If you book a Western Wall Tunnels tour, save its confirmation and follow the operator’s exact meeting-point instructions.</AttractionPracticalTip>
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="jerusalem-old-city-entry">
        <h3 className="font-serif text-xl font-semibold">Choose the right entrance gate</h3>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">Begin at <strong>Jaffa Gate</strong> for the Tower of David and the Christian and Armenian Quarters; use <strong>Dung Gate</strong> for the Western Wall; choose <strong>Damascus Gate</strong> for the Muslim Quarter markets; or enter through <strong>Zion Gate</strong> when arriving from Mount Zion. <strong>New Gate</strong> serves the Christian Quarter, while <strong>Lion's Gate</strong> connects the eastern Old City with the Mount of Olives.</p>
        <p className="mt-2 text-sm leading-relaxed">The <a href="#getting-there" className={inlineLink}>gate comparison and approach instructions</a> below help you plan a pickup or drop-off.</p>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="jerusalem-old-city-access">
        <h3 className="font-serif text-xl font-semibold">Accessibility, families and practical facilities</h3>
        <div className="mt-3 grid gap-3 text-sm leading-relaxed sm:grid-cols-2 sm:text-base">
          <p><strong>Walking:</strong> Historic stone paving, slopes and stairs make distances feel longer. Shoes with a good grip and regular rests help on longer visits.</p>
          <p><strong>Accessible routes:</strong> Adapted paths are available through parts of the city. The <a href={official.accessibleJlmIos} target="_blank" rel="noopener noreferrer" className={inlineLink}>Accessible JLM iPhone guide</a> and <a href={official.accessibleJlmAndroid} target="_blank" rel="noopener noreferrer" className={inlineLink}>Android app</a> can help identify suitable routes. Check specific buildings and entrances.</p>
          <p><strong>Strollers and wheelchairs:</strong> Jaffa Gate offers a convenient arrival from Mamilla. Dung Gate is useful for approaching the Western Wall. Ramparts stairs and some historic interiors require a different visitor plan.</p>
          <p><strong>Places of worship:</strong> Wear appropriate clothing, follow worship-area instructions and respect people at prayer. Screening and temporary pedestrian changes may occur during ceremonies and holidays.</p>
          <p><strong>Breaks and facilities:</strong> Public toilets, food stalls and cafés are available in different quarters. Plan a rest near a market or open plaza between major stops.</p>
          <p><strong>Current routes:</strong> Check local signs for street works and temporary diversions. <a href={official.christianQuarterWorks} target="_blank" rel="noopener noreferrer" className={inlineLink}>Christian Quarter access updates</a> may help during improvement works.</p>
        </div>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>Choose a gate close to your first stop. The Old City is best explored on foot; private vehicles and taxis approach from the roads outside its historic walls.</p>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3" data-testid="jerusalem-old-city-gates">
        <article className="rounded-xl border bg-card p-3 sm:p-4">
          <h3 className="font-serif text-lg font-semibold">Jaffa Gate</h3>
          <p className="mt-2 text-sm leading-relaxed">Tower of David, Christian and Armenian Quarters. Convenient from Mamilla for car drop-offs.</p>
          <a href={jaffaGateDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Directions <ArrowUpRight className="inline size-3.5" aria-hidden="true"/></a>
        </article>
        <article className="rounded-xl border bg-card p-3 sm:p-4">
          <h3 className="font-serif text-lg font-semibold">Dung Gate</h3>
          <p className="mt-2 text-sm leading-relaxed">Western Wall plaza and Jewish Quarter, near a road-accessible drop-off.</p>
          <a href={dungGateDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Directions <ArrowUpRight className="inline size-3.5" aria-hidden="true"/></a>
        </article>
        <article className="rounded-xl border bg-card p-3 sm:p-4">
          <h3 className="font-serif text-lg font-semibold">Damascus Gate</h3>
          <p className="mt-2 text-sm leading-relaxed">Muslim Quarter markets and the beginning of many northern Old City walks. Steps lead down toward the gate.</p>
          <a href={damascusGateDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Directions <ArrowUpRight className="inline size-3.5" aria-hidden="true"/></a>
        </article>
        <article className="rounded-xl border bg-card p-3 sm:p-4">
          <h3 className="font-serif text-lg font-semibold">Zion Gate</h3>
          <p className="mt-2 text-sm leading-relaxed">Armenian and Jewish Quarters; a convenient connection to <Link to="/attractions/mount-zion/" className={inlineLink}>Mount Zion</Link>.</p>
          <a href="https://www.google.com/maps/dir/?api=1&destination=Zion%20Gate%20Jerusalem%20Israel&travelmode=driving" target="_blank" rel="noopener noreferrer" className={inlineLink}>Directions <ArrowUpRight className="inline size-3.5" aria-hidden="true"/></a>
        </article>
        <article className="rounded-xl border bg-card p-3 sm:p-4">
          <h3 className="font-serif text-lg font-semibold">Lion's Gate</h3>
          <p className="mt-2 text-sm leading-relaxed">Eastern access to the Via Dolorosa and the walk toward the <Link to="/attractions/mount-of-olives/" className={inlineLink}>Mount of Olives</Link>.</p>
          <a href="https://www.google.com/maps/dir/?api=1&destination=Lions%20Gate%20Jerusalem%20Israel&travelmode=walking" target="_blank" rel="noopener noreferrer" className={inlineLink}>Directions <ArrowUpRight className="inline size-3.5" aria-hidden="true"/></a>
        </article>
        <article className="rounded-xl border bg-card p-3 sm:p-4">
          <h3 className="font-serif text-lg font-semibold">New Gate</h3>
          <p className="mt-2 text-sm leading-relaxed">Direct entrance to the Christian Quarter, near the approach from Notre Dame and western Jerusalem.</p>
          <a href="https://www.google.com/maps/dir/?api=1&destination=New%20Gate%20Old%20City%20Jerusalem%20Israel&travelmode=walking" target="_blank" rel="noopener noreferrer" className={inlineLink}>Directions <ArrowUpRight className="inline size-3.5" aria-hidden="true"/></a>
        </article>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><BusFront className="size-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">By train, light rail or bus</h3></div>
          <p className="mt-2 text-sm leading-relaxed">From Jerusalem–Yitzhak Navon railway station, continue by light rail, bus or taxi. The light rail serves approaches near the northern and western walls. Check your route with the <a href={official.jerusalemTransit} target="_blank" rel="noopener noreferrer" className={inlineLink}>official journey planner</a>.</p>
          <p className="mt-2 text-sm leading-relaxed">Friday and Shabbat: Israeli Railways, the light rail and most Jerusalem city buses generally pause from Friday afternoon until Saturday evening. Check your travel date.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><CarFront className="size-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">By taxi or private driver</h3></div>
          <p className="mt-2 text-sm leading-relaxed">Choose a road-accessible drop-off near Jaffa Gate, Dung Gate, Zion Gate or another suitable entrance. For a private sightseeing day with convenient pickup after your walk, <a href="#contact" className={inlineLink}>send me your preferred stops and pickup details</a>.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Footprints className="size-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">On foot</h3></div>
          <p className="mt-2 text-sm leading-relaxed">Walking is the easiest way to reach most landmarks. The alleys have stairs, changing gradients and smooth stone paving; allow time for breaks and queues at major sites.</p>
        </article>
      </div>
      <AttractionPracticalTip>For pickup after a walking tour, agree on a named gate and a nearby road-accessible meeting point. Share the location with your driver before entering the Old City.</AttractionPracticalTip>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <p>Choose a route based on the time you have and the landmarks that interest you most. Walking times below allow for sightseeing stops and can vary with queues and services.</p>
      <div className="grid gap-3 md:grid-cols-3" data-testid="jerusalem-old-city-visit-choices">
        <article className="rounded-xl border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">2–3 hours</p>
          <h3 className="mt-2 text-lg font-semibold">An introduction to the Old City</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Start at Jaffa Gate, visit the Church of the Holy Sepulchre and explore the nearby Christian Quarter and market streets. Finish at New Gate or return to Jaffa Gate.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">4–5 hours</p>
          <h3 className="mt-2 text-lg font-semibold">The classic cross-quarter walk</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Start at Jaffa Gate, continue to the Holy Sepulchre, cross the Cardo and Jewish Quarter, and finish at the Western Wall. Arrange pickup near Dung Gate.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">A full day</p>
          <h3 className="mt-2 text-lg font-semibold">A deeper heritage visit</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Follow the classic route and add the Tower of David, a booked Western Wall Tunnels tour or the Ramparts Walk. For a Temple Mount visit, plan your morning around the permitted visiting window.</p>
        </article>
      </div>
      <OldCityJerusalemRouteMap />
      <h3 className="pt-2 font-serif text-xl font-semibold">Two suggested walking routes</h3>
      <div className="grid gap-3 md:grid-cols-2" data-testid="jerusalem-old-city-walking-plans">
        <article className="rounded-xl border bg-card p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">About 4–5 hours</p>
          <h4 className="mt-2 font-serif text-xl font-semibold">The Old City's major landmarks</h4>
          <p className="mt-2 text-sm text-muted-foreground">A balanced first visit across the Christian and Jewish Quarters.</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
            <li>Enter through Jaffa Gate, with an optional visit to the Tower of David.</li>
            <li>Walk through the Christian Quarter to the Church of the Holy Sepulchre.</li>
            <li>Continue through the markets toward the Jewish Quarter and the Cardo.</li>
            <li>Visit the Western Wall and finish near Dung Gate.</li>
          </ol>
          <a href="https://www.google.com/maps/dir/?api=1&origin=Jaffa%20Gate%20Jerusalem%20Israel&destination=Western%20Wall%20Jerusalem%20Israel&waypoints=Church%20of%20the%20Holy%20Sepulchre%20Jerusalem%7CCardo%20Jewish%20Quarter%20Jerusalem&travelmode=walking" target="_blank" rel="noopener noreferrer" className={inlineLink}>Open the walking route in Google Maps <ArrowUpRight className="inline size-4" aria-hidden="true"/></a>
        </article>
        <article className="rounded-xl border bg-card p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">About 2–3 hours</p>
          <h4 className="mt-2 font-serif text-xl font-semibold">Via Dolorosa and the Christian Quarter</h4>
          <p className="mt-2 text-sm text-muted-foreground">A pilgrimage-focused walk following the traditional Stations of the Cross.</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
            <li>Enter through Damascus Gate for the Muslim Quarter markets, or Lion's Gate for an approach nearer the early stations.</li>
            <li>Follow the early stations of the Via Dolorosa along the marked streets and chapels.</li>
            <li>Continue to the Church of the Holy Sepulchre for the final stations.</li>
            <li>Explore the surrounding Christian Quarter and finish at New Gate or Jaffa Gate.</li>
          </ol>
          <a href="https://www.google.com/maps/dir/?api=1&origin=Damascus%20Gate%20Jerusalem%20Israel&destination=Church%20of%20the%20Holy%20Sepulchre%20Jerusalem%20Israel&waypoints=Via%20Dolorosa%20Jerusalem%20Israel&travelmode=walking" target="_blank" rel="noopener noreferrer" className={inlineLink}>Open the walking route in Google Maps <ArrowUpRight className="inline size-4" aria-hidden="true"/></a>
        </article>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="jerusalem-old-city-walking-connections">
        <h3 className="font-serif text-xl font-semibold">Continue exploring on foot</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <a href="https://www.google.com/maps/dir/?api=1&origin=Jaffa%20Gate%20Jerusalem&destination=Zion%20Gate%20Jerusalem&travelmode=walking" target="_blank" rel="noopener noreferrer" className="rounded-lg border bg-secondary/20 p-3 text-sm font-semibold text-primary hover:border-primary/50">Jaffa Gate to Zion Gate <ArrowUpRight className="inline size-4" aria-hidden="true"/></a>
          <a href="https://www.google.com/maps/dir/?api=1&origin=Western%20Wall%20Jerusalem&destination=Dung%20Gate%20Jerusalem&travelmode=walking" target="_blank" rel="noopener noreferrer" className="rounded-lg border bg-secondary/20 p-3 text-sm font-semibold text-primary hover:border-primary/50">Western Wall to Dung Gate <ArrowUpRight className="inline size-4" aria-hidden="true"/></a>
          <a href="https://www.google.com/maps/dir/?api=1&origin=Lions%20Gate%20Jerusalem&destination=Church%20of%20All%20Nations%20Gethsemane%20Jerusalem&travelmode=walking" target="_blank" rel="noopener noreferrer" className="rounded-lg border bg-secondary/20 p-3 text-sm font-semibold text-primary hover:border-primary/50">Lion's Gate to Gethsemane <ArrowUpRight className="inline size-4" aria-hidden="true"/></a>
        </div>
      </div>
      <AttractionPracticalTip>For the most enjoyable walking day, plan your fixed-time booking first and build the remaining stops around it. Allow extra time for prayer services, holiday crowds and security queues.</AttractionPracticalTip>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-4">
      <p>Jerusalem’s Old City is a small area with an exceptionally layered history. Its streets and sacred buildings reflect Jewish, Christian, Muslim and Armenian traditions, while its everyday markets and neighbourhoods remain active parts of the city.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border bg-card p-4"><h3 className="font-semibold">Christian Quarter</h3><p className="mt-2 text-sm leading-relaxed">The Church of the Holy Sepulchre, pilgrim routes, chapels and guesthouses are connected by market lanes near Jaffa Gate and New Gate.</p></article>
        <article className="rounded-xl border bg-card p-4"><h3 className="font-semibold">Muslim Quarter</h3><p className="mt-2 text-sm leading-relaxed">A lively network of souks, historic homes, religious institutions and early Stations of the Cross extends south from Damascus Gate.</p></article>
        <article className="rounded-xl border bg-card p-4"><h3 className="font-semibold">Jewish Quarter</h3><p className="mt-2 text-sm leading-relaxed">Rebuilt streets, synagogues, archaeological remains and the Cardo lead toward the Western Wall prayer plaza.</p></article>
        <article className="rounded-xl border bg-card p-4"><h3 className="font-semibold">Armenian Quarter</h3><p className="mt-2 text-sm leading-relaxed">The Armenian community preserves a distinctive religious, cultural and artistic heritage around the Patriarchate, St James Cathedral and nearby workshops. The cathedral has limited visiting windows associated with services.</p></article>
      </div>
      <h3 className="font-serif text-xl font-semibold">How the Old City took shape</h3>
      <p>Ancient Jerusalem developed over many centuries, with especially significant periods under the kingdoms of Judah, the Hasmoneans and Herod. Roman and Byzantine rule shaped successive phases of the city, and Christian pilgrimage became central to its religious life.</p>
      <p>From the seventh century, Islamic rulers established major shrines on the Temple Mount, known in Muslim tradition as Al-Haram al-Sharif. Crusader and later Ayyubid and Mamluk periods left additional religious buildings, markets and architectural layers.</p>
      <p>The walls that visitors see today were rebuilt under the Ottoman sultan Suleiman the Magnificent in the sixteenth century. The city’s modern history includes the changes of 1948 and 1967; its quarters and sacred sites continue to hold profound meaning for different communities.</p>
      <p>The <a href={official.unesco} target="_blank" rel="noopener noreferrer" className={inlineLink}>Old City of Jerusalem and its Walls</a> is listed as a UNESCO World Heritage Site.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Compare two walking tours focused on the Old City with a longer Jerusalem experience that also visits the Mount of Olives. Each has a different starting point and pace.</p>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-testid="jerusalem-old-city-featured-tours">
        {featuredOldCityTours.map(tour => <ExternalTourCard key={tour.id} tour={tour} pageId="attractions-old-city-jerusalem" compact />)}
        <li className="h-full min-w-0" data-tour-id="viator-208675P3">
          <CuratedPartnerTourCard
            title="Jerusalem Classic Tour: Mount of Olives & Old City"
            description="A longer guided Jerusalem day including the Mount of Olives viewpoint and the Old City's historic and religious landmarks."
            platform="Viator"
            duration="About 7 hours"
            image={guidedTourPhoto}
            alt="Visitors exploring Jerusalem with a guide"
            href="https://viator.tpk.lv/YV4HrN5E"
            pageId="attractions-old-city-jerusalem"
            productId="viator-208675P3"
            offerId="viator-208675P3-old-city-jerusalem"
            editorialRating={{ value: 5, count: 3 }}
            editorialPrice={{ amount: 122.62, currency: "EUR", basis: "per_person" }}
          />
        </li>
      </ul>
      <p className="text-sm leading-relaxed"><Link to="/tours/jerusalem/" className={inlineLink}>Browse more Jerusalem guided tours</Link>, or <a href="#contact" className={inlineLink}>contact me about private transport</a> to your chosen entrance gate.</p>
    </div>
  ),
  faqs: [
    { q: "How long should I spend in Jerusalem’s Old City?", a: "Allow two to three hours for a short introduction, around four to five hours for a walk through the Christian and Jewish Quarters, or a full day with a museum or guided tour." },
    { q: "Which entrance gate is best for the Western Wall?", a: "Dung Gate is the most direct common entrance to the Western Wall plaza. Jaffa Gate is convenient for a route beginning at the Tower of David and the Christian Quarter." },
    { q: "Which gate is best for the Via Dolorosa?", a: "Damascus Gate is useful for approaching through the Muslim Quarter markets. Lion’s Gate is closer to the early Stations of the Cross. The traditional route ends inside the Church of the Holy Sepulchre." },
    { q: "Can I visit Jerusalem’s Old City on Saturday?", a: "Yes. The public streets and Western Wall plaza are accessible, and the Holy Sepulchre generally opens daily. Individual museums and shops have their own opening hours. Israeli trains, the light rail and most city buses generally pause during Shabbat." },
    { q: "How can I visit the Ramparts Walk?", a: "Start at Jaffa Gate and choose the northern route towards Lion’s Gate or the southern route towards Dung Gate. Both involve stairs and elevated stone paths. Check operating hours and buy a ticket on the official East Jerusalem Development website." },
    { q: "Can non-Muslims visit the Temple Mount?", a: "When permitted, non-Muslim visits usually use a designated approach near the Western Wall during limited Sunday–Thursday morning or midday windows. The Dome of the Rock and Al-Aqsa Mosque interiors are generally reserved for Muslim worshippers. Check current arrangements before your visit." },
    { q: "Is Jerusalem’s Old City accessible by wheelchair?", a: "Some streets and main approaches are adapted, particularly near major gates. Other historic alleys, stairways and buildings have limited access. Choose the entrance that suits your destination and consult Accessible JLM for suitable routes." },
  ],
  nearby: [
    { label: "Mount of Olives", to: "/attractions/mount-of-olives/", note: "Jerusalem skyline views, Gethsemane and hillside churches." },
    { label: "Mount Zion", to: "/attractions/mount-zion/", note: "Dormition Abbey, the Upper Room and sites near Zion Gate." },
    { label: "Jerusalem travel guide", to: "/travel-blog/jerusalem-travel-guide/", note: "Plan the rest of your sightseeing in the city." },
    { label: "Churches in Jerusalem", to: "/travel-blog/churches-in-jerusalem/", note: "Pilgrimage traditions, visitor hours and historic churches." },
    { label: "Museums in Jerusalem", to: "/travel-blog/museums-in-jerusalem/", note: "Explore archaeology, art and Jerusalem's layered history." },
    { label: "Via Dolorosa", to: "/attractions/via-dolorosa/", note: "Follow all fourteen Stations of the Cross through the Old City." },
  ],
  planningLinks: [
    { label: "Jerusalem city guide", to: "/travel-blog/jerusalem-travel-guide/", description: "Plan the rest of your stay beyond the walls.", icon: "region" },
    { label: "Churches in Jerusalem", to: "/travel-blog/churches-in-jerusalem/", description: "A more detailed Christian pilgrimage route.", icon: "region" },
    { label: "Shopping in Jerusalem", to: "/travel-blog/shopping-in-jerusalem/", description: "Historic souks and city markets.", icon: "region" },
    { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/", description: "Choose a hotel area and an arrival route.", icon: "region" },
    { label: "Ben Gurion Airport to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/", description: "Compare rail, road and transfer options.", icon: "arrival" },
    { label: "3-day Israel itinerary", to: "/travel-blog/israel-itinerary-3-days/", description: "Fit Jerusalem into a short visit.", icon: "itinerary" },
  ],
  sources: [
    { label: "UNESCO — Old City of Jerusalem and its Walls", url: official.unesco },
    { label: "Christian Information Center — church hours and religious-site access", url: official.christianHours },
    { label: "Western Wall Heritage Foundation — visitor information", url: official.westernWall },
    { label: "Western Wall Heritage Foundation — tunnel tours and booking", url: official.tunnels },
    { label: "Tower of David Jerusalem Museum — tickets and visiting", url: official.tower },
    { label: "Tower of David Jerusalem Museum — entrance and directions", url: official.towerEntrance },
    { label: "East Jerusalem Development — Ramparts Walk", url: official.ramparts },
    { label: "Viator — Jerusalem Classic Tour: Mount of Olives & Old City", url: "https://www.viator.com/tours/Jerusalem/jerusalem-daily-tour/d921-208675P3" },
  ],
};

export function OldCityJerusalemAttractionPage() {
  return <AttractionDestinationPage content={oldCityJerusalemDestinationContent} />;
}
