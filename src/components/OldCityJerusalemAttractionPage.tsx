import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Clock3, Footprints, MapPinned, Ticket } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { JerusalemPartnerOffers } from "@/components/JerusalemPartnerOffers";
import { oldCityJerusalemSite } from "@/data/oldCityJerusalemSite";
import oldCityTourPhoto from "@/assets/home/jerusalem-old-city-card.webp";
import gateTourPhoto from "@/assets/home/hero-refresh-jerusalem-jaffa-gate-v4-medium.webp";

const official = oldCityJerusalemSite.official;
const info = oldCityJerusalemSite.visitor;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const mapEmbed = "https://maps.google.com/maps?q=Old%20City%20Jerusalem%2C%20Israel&hl=en&z=14&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Old%20City%20Jerusalem%2C%20Israel";
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
  heroTitle: "Jerusalem's Old City: Sights & Visitor Tips",
  highlightsTitle: "What to see in Jerusalem's Old City",
  region: oldCityJerusalemSite.region,
  updatedAt: oldCityJerusalemSite.updatedAt,
  hero: oldCityJerusalemSite.hero,
  intro: oldCityJerusalemSite.intro,
  visitorTitle: "Opening hours, tickets and accessibility",
  visitorNavLabel: "Hours & tickets",
  historyTitle: "A city of four historic quarters",
  relatedTitle: "Explore Jerusalem and beyond",
  contactIntroduction: "Tell me when you're visiting, where you're staying and which landmarks matter most to you. I'll be happy to help plan a private Jerusalem visit or a longer day in the area.",
  facts: [
    { icon: "location", label: "Location", value: "Inside the city walls", note: "Jaffa, Damascus, Dung and Zion Gates" },
    { icon: "duration", label: "Time needed", value: "3 hours–full day", note: "Allow longer for museums or guided tours" },
    { icon: "admission", label: "Old City streets", value: "Free entry", note: "Museums, tours and the ramparts charge separately" },
    { icon: "hours", label: "Opening hours", value: "Vary by site", note: "Religious services and security affect access" },
    { icon: "highlights", label: "Don't miss", value: "Sacred landmarks", note: "Western Wall, Holy Sepulchre and historic lanes" },
    { icon: "access", label: "Getting around", value: "Mainly on foot", note: "Uneven stones, stairs and some steep routes" },
  ],
  glanceNote: <>The <strong>Old City streets, Western Wall prayer plaza and Church of the Holy Sepulchre</strong> are generally free to enter. Paid experiences such as the <a href={official.tower} target="_blank" rel="noopener noreferrer" className={inlineLink}>Tower of David</a>, the <a href={official.tunnels} target="_blank" rel="noopener noreferrer" className={inlineLink}>Western Wall Tunnels</a> and the <a href={official.ramparts} target="_blank" rel="noopener noreferrer" className={inlineLink}>Ramparts Walk</a> have their own arrangements. Plan your route around the sites you most want to see.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight title="The Western Wall (Kotel)" image={{ src: photos.wall, alt: "Western Wall prayer plaza beneath Jerusalem's ancient stone walls, with the Dome of the Rock visible behind" }}>
        <p>One of the most visited places in Jerusalem, the Western Wall is a Jewish prayer site beside the western retaining wall of the ancient Temple Mount. The open plaza is worth visiting even on a short walk through the Old City.</p>
        <p>The plaza is generally open around the clock and entry is free. Be respectful of worshippers, follow the posted prayer-area arrangements and allow extra time for security screening during holidays. <a href={official.westernWall} target="_blank" rel="noopener noreferrer" className={inlineLink}>Western Wall visitor information</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Free entry to the prayer plaza</p>
      </AttractionHighlight>
      <AttractionHighlight title="Church of the Holy Sepulchre" image={{ src: photos.sepulchre, alt: "Ornate chapel with lamps and religious paintings inside the Church of the Holy Sepulchre" }}>
        <p>In the Christian Quarter, this major pilgrimage church is traditionally associated with the crucifixion, burial and resurrection of Jesus. Its chapels, tomb shrine and prayer spaces are shared by several Christian communities.</p>
        <p>Entry is free, but services and visitor queues can affect access. I recommend allowing at least an hour if you would like to explore more than the entrance area. Check the <a href={official.christianHours} target="_blank" rel="noopener noreferrer" className={inlineLink}>Christian Information Center's current church hours</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Free entry; opening hours vary seasonally</p>
      </AttractionHighlight>
      <AttractionHighlight title="Via Dolorosa and the Christian Quarter" image={{ src: photos.via, alt: "Narrow stone street and shops along the Via Dolorosa in Jerusalem's Old City" }}>
        <p>The Via Dolorosa is the traditional route associated with Jesus carrying the cross. Its Stations of the Cross pass through busy streets, chapels and parts of the Muslim and Christian Quarters, ending at the Holy Sepulchre.</p>
        <p>Walking along the public streets is free. You can follow the marked stations independently or join a pilgrimage-focused guided walk; individual chapels may have restricted hours. <Link to="/travel-blog/churches-in-jerusalem/" className={inlineLink}>Explore more Jerusalem churches</Link>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Free public walking route</p>
      </AttractionHighlight>
      <AttractionHighlight title="Temple Mount / Haram al-Sharif" image={{ src: photos.temple, alt: "Golden Dome of the Rock on the Temple Mount or Haram al-Sharif esplanade in Jerusalem" }}>
        <p>Known as the Temple Mount in Judaism and Haram al-Sharif or the Noble Sanctuary in Islam, this sacred compound includes the Dome of the Rock and Al-Aqsa Mosque. It is one of Jerusalem's most significant places for both religious traditions.</p>
        <p><strong>Visitor access is tightly controlled.</strong> Non-Muslim visits, when permitted, normally use the Mughrabi Gate approach beside the Western Wall, during limited weekday windows. The interiors of Al-Aqsa Mosque and the Dome of the Rock are generally not open to non-Muslim visitors. Check current access conditions before making this a fixed part of your itinerary.</p>
        <p className="text-xs font-semibold text-muted-foreground">Limited visiting windows; no general admission to the shrine interiors</p>
      </AttractionHighlight>
      <AttractionHighlight title="Jewish Quarter, Cardo and Hurva Synagogue" image={{ src: photos.cardo, alt: "Historic vaulted Cardo shopping passage with stone paving in Jerusalem's Jewish Quarter" }}>
        <p>The Jewish Quarter offers restored lanes, archaeological remains, the Cardo's colonnaded Roman-era street and the distinctive Hurva Synagogue. It is an enjoyable area for an unhurried walk between the market streets and the Western Wall.</p>
        <p>The public streets and open sections of the Cardo can be explored freely. Entry to certain archaeological exhibits, synagogue interiors and guided attractions may require a separate ticket or have limited visiting hours.</p>
        <p className="text-xs font-semibold text-muted-foreground">Public lanes free; indoor attractions may be ticketed</p>
      </AttractionHighlight>
      <AttractionHighlight title="Tower of David Jerusalem Museum and Jaffa Gate" image={{ src: photos.tower, alt: "Ancient stone fortress, towers and courtyards at the Tower of David near Jaffa Gate" }}>
        <p>Just inside Jaffa Gate, the Tower of David's citadel offers an excellent introduction to the city's long history through archaeology, exhibitions and views from the fortress. The nearby gate is also a practical starting point for exploring the Christian and Armenian Quarters.</p>
        <p>Allow around 60–90 minutes for the museum if you wish to enter. Museum tickets are separate from other Old City attractions. <a href={official.tower} target="_blank" rel="noopener noreferrer" className={inlineLink}>Tower of David tickets and visitor information</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Museum admission: {info.towerAdult} adult; Jaffa Gate itself is free</p>
      </AttractionHighlight>
      <AttractionHighlight title="Western Wall Tunnels" image={{ src: photos.tunnels, alt: "Illuminated ancient stone vaults along the underground Western Wall Tunnels tour" }}>
        <p>A guided walk beneath the Old City streets reveals historic sections of the Western Wall, archaeological layers and stone passages that are not visible from the plaza above. Several routes are offered, each with a different emphasis.</p>
        <p>Unlike the outdoor plaza, tunnel visits are paid and should be booked for a specific tour time. <a href={official.tunnels} target="_blank" rel="noopener noreferrer" className={inlineLink}>Compare the official routes and reserve a visit</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Ticketed guided tour; advance booking recommended</p>
      </AttractionHighlight>
      <AttractionHighlight title="Damascus Gate, markets and the Ramparts Walk" image={{ src: photos.damascus, alt: "Historic stone Damascus Gate at the entrance to Jerusalem's Old City" }}>
        <p>Damascus Gate leads into the lively markets of the Muslim Quarter, where you can browse traditional food shops, souks and narrow streets. The Armenian Quarter, near Jaffa and Zion Gates, offers a quieter contrast, though many religious buildings are not open for casual touring.</p>
        <p>For panoramic views, the separate <a href={official.ramparts} target="_blank" rel="noopener noreferrer" className={inlineLink}>Ramparts Walk</a> follows accessible sections of the city walls from Jaffa Gate. It is a paid visit with stairs and narrow elevated paths, and is unsuitable for some visitors with mobility limitations.</p>
        <p className="text-xs font-semibold text-muted-foreground">Markets and gates free; Ramparts Walk ticket: {info.rampartsAdult} adult</p>
      </AttractionHighlight>
      <AttractionPracticalTip>For a first visit, I would choose two or three major landmarks and allow time to enjoy the streets between them. The Old City is small on a map, but queues, steps and security checks can add considerably to your day.</AttractionPracticalTip>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>The Old City has no single entrance ticket or unified opening schedule. You can freely explore public streets and many major religious sites, while museums, underground tours and special experiences have their own prices and access rules.</p>
      <div className="grid gap-3 md:grid-cols-2" data-testid="jerusalem-old-city-hours-fees">
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Ticket className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">Free places to visit</h3></div>
          <dl className="mt-3 space-y-2 text-sm sm:text-base">
            <div className="flex justify-between gap-3"><dt>Old City public streets and markets</dt><dd className="font-semibold">Free</dd></div>
            <div className="flex justify-between gap-3"><dt>Western Wall prayer plaza</dt><dd className="font-semibold">Free</dd></div>
            <div className="flex justify-between gap-3"><dt>Church of the Holy Sepulchre</dt><dd className="font-semibold">Free</dd></div>
            <div className="flex justify-between gap-3"><dt>Via Dolorosa public route</dt><dd className="font-semibold">Free</dd></div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed">The Western Wall plaza is accessible 24 hours a day, while churches and individual religious compounds follow their own visiting schedules. Worship, security and religious holidays can affect entry.</p>
          <a href={official.christianHours} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">Current religious-site opening hours <ArrowUpRight className="h-4 w-4"/></a>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">Ticketed attractions</h3></div>
          <dl className="mt-3 space-y-2 text-sm sm:text-base">
            <div className="flex justify-between gap-3"><dt>Tower of David Museum</dt><dd className="shrink-0 font-semibold">{info.towerAdult} adult</dd></div>
            <div className="flex justify-between gap-3"><dt>Ramparts Walk</dt><dd className="shrink-0 font-semibold">{info.rampartsAdult} adult</dd></div>
            <div className="flex justify-between gap-3"><dt>Western Wall Tunnels</dt><dd className="shrink-0 font-semibold">By tour</dd></div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed">The tower museum, ramparts and tunnel routes are operated separately. Their opening hours, reduced fees and booking rules differ, so check the exact venue before committing to a timed visit.</p>
          <p className="mt-3 text-sm leading-relaxed"><a href={official.tower} target="_blank" rel="noopener noreferrer" className={inlineLink}>Tower of David</a> · <a href={official.rampartsTickets} target="_blank" rel="noopener noreferrer" className={inlineLink}>Ramparts tickets</a> · <a href={official.tunnelsBooking} target="_blank" rel="noopener noreferrer" className={inlineLink}>Tunnel reservations</a></p>
        </article>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="jerusalem-old-city-entry">
        <h3 className="font-serif text-xl font-semibold">Which entry gate should you use?</h3>
        <p className="mt-2 text-sm leading-relaxed sm:text-base"><strong>Jaffa Gate</strong> works well for the Tower of David, the Christian Quarter and the Armenian Quarter. <strong>Dung Gate</strong> is convenient for the Western Wall and the Jewish Quarter. <strong>Damascus Gate</strong> leads to the Muslim Quarter's markets and the Via Dolorosa.</p>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">Pedestrian access can be redirected for major holidays, ceremonies or security events. Choose the gate that fits your main destination and arrange any transport to its road-accessible approach.</p>
      </div>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="jerusalem-old-city-access">
        <h3 className="font-serif text-xl font-semibold">Accessibility, safety and facilities</h3>
        <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed sm:columns-2 sm:gap-x-6 sm:text-base [&>li]:mb-2 [&>li]:break-inside-avoid">
          <li><strong>Walking:</strong> Expect stone paving, slopes, steps and narrow alleys; comfortable shoes make a difference.</li>
          <li><strong>Accessibility:</strong> Some adapted routes and entrances are available, but many ancient buildings and elevated walks are not step-free.</li>
          <li><strong>Security:</strong> Screening and temporary pedestrian diversions can occur near major religious sites.</li>
          <li><strong>Dress:</strong> Wear clothing suitable for active places of worship; individual sites may have specific requirements.</li>
          <li><strong>Photography:</strong> Observe the posted rules and avoid photographing people at prayer without consent.</li>
          <li><strong>Facilities:</strong> Public toilets and places to buy refreshments are available in several areas; locations vary by quarter.</li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed">For church schedules, the <a href={official.christianHours} target="_blank" rel="noopener noreferrer" className={inlineLink}>Christian Information Center</a> maintains a practical visitor list. For the Western Wall, see the <a href={official.westernWall} target="_blank" rel="noopener noreferrer" className={inlineLink}>official visitor information</a>.</p>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>Jerusalem's Old City is best explored on foot, but the approach matters. Choose a gate close to your first stop rather than asking a driver to reach a narrow street inside the walls.</p>
      <div className="grid gap-3 sm:grid-cols-3" data-testid="jerusalem-old-city-gates">
        <article className="rounded-xl border bg-card p-3">
          <h3 className="font-serif text-lg font-semibold">Jaffa Gate</h3>
          <p className="mt-2 text-sm">Tower of David, Christian and Armenian Quarters.</p>
          <a href={jaffaGateDirections} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Directions <ArrowUpRight className="h-3.5 w-3.5"/></a>
        </article>
        <article className="rounded-xl border bg-card p-3">
          <h3 className="font-serif text-lg font-semibold">Dung Gate</h3>
          <p className="mt-2 text-sm">Western Wall plaza and Jewish Quarter.</p>
          <a href={dungGateDirections} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Directions <ArrowUpRight className="h-3.5 w-3.5"/></a>
        </article>
        <article className="rounded-xl border bg-card p-3">
          <h3 className="font-serif text-lg font-semibold">Damascus Gate</h3>
          <p className="mt-2 text-sm">Muslim Quarter, markets and Via Dolorosa.</p>
          <a href={damascusGateDirections} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Directions <ArrowUpRight className="h-3.5 w-3.5"/></a>
        </article>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">By train, light rail or bus</h3></div>
            <p className="mt-2 text-sm leading-relaxed">The intercity train terminates at Jerusalem–Yitzhak Navon, near the central bus station. Continue by light rail, bus or taxi toward the gate you need. The light rail can be convenient for the Damascus Gate area and central Jerusalem, but confirm the route and operating hours for your date using the <a href={official.jerusalemTransit} target="_blank" rel="noopener noreferrer" className={inlineLink}>public transport planner</a>.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">By car or private driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Most historic lanes cannot be reached by ordinary cars. Arrange a convenient drop-off near Jaffa, Dung or Damascus Gate and check parking availability outside the walls. For a private sightseeing day, <a href="#contact" className={inlineLink}>contact me</a> with your hotel location and preferred stops.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary"/><h3 className="font-semibold">On foot</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Within the walls, allow more time than the map suggests. If staying nearby, ask your accommodation which gate gives the easiest approach with luggage or a stroller.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="jerusalem-old-city-map">
          <div className="flex items-center gap-2"><MapPinned className="h-4 w-4 text-primary"/><h3 className="text-sm font-semibold">Where is Jerusalem's Old City?</h3></div>
          <iframe title="Map of Jerusalem's Old City and its historic quarters" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56"/>
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">View larger map <ArrowUpRight className="h-3.5 w-3.5"/></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="jerusalem-old-city-walking-plans">
        <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary"/><h3 className="font-serif text-xl font-semibold">Choose your Old City walk</h3></div>
        <div className="mt-3 space-y-3 text-sm leading-relaxed sm:text-base">
          <p><strong>A shorter visit (2–3 hours):</strong> Enter at Jaffa Gate, visit the Church of the Holy Sepulchre and enjoy the nearby Christian Quarter lanes and market streets. Add the Tower of David only if you have enough time.</p>
          <p><strong>A half day (4–5 hours):</strong> Start at Jaffa Gate, visit the Holy Sepulchre, cross the Cardo in the Jewish Quarter and continue to the Western Wall. Leave time for lunch and pauses along the way.</p>
          <p><strong>A full day:</strong> Choose one additional timed or ticketed experience — the Western Wall Tunnels, Tower of David or Ramparts Walk — rather than expecting all three to fit easily. A Temple Mount visit may require reorganising your morning around its permitted visiting window.</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">For a family visit, I recommend choosing three or four main stops and allowing time for breaks. If religious pilgrimage is your priority, follow the <Link to="/travel-blog/churches-in-jerusalem/" className={inlineLink}>Jerusalem churches guide</Link> to plan a route through the relevant stations and chapels.</p>
      </div>
      <AttractionPracticalTip>A guided walk is particularly useful if you want to understand the relationship between the four quarters. For a more flexible day, choose your first and last gate before arranging transport.</AttractionPracticalTip>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>Jerusalem's walled Old City is divided into the Jewish, Christian, Muslim and Armenian Quarters. These neighbourhoods contain places that are deeply significant to different communities, alongside homes, shops, schools and markets.</p>
      <p>The city's present walls largely date to the Ottoman period, while many monuments and archaeological remains reach back much further. The Old City of Jerusalem and its Walls is recognised as a <a href={official.unesco} target="_blank" rel="noopener noreferrer" className={inlineLink}>UNESCO World Heritage Site</a>.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Guided walks can help you understand the major religious traditions and complicated layers of history. Before choosing a tour, check its walking demands, meeting gate, language and the actual sites included.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="jerusalem-old-city-tour-cards">
        <Link to="/tours/jerusalem/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src={oldCityTourPhoto} alt="Jerusalem Old City roofs and historic landmarks" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"/>
          <div className="min-w-0 flex-1"><h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Jerusalem walking and guided tours</h3><p className="mt-1 text-sm text-muted-foreground">Browse guided routes, visiting times and heritage experiences.</p><span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4"/></span></div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src={gateTourPhoto} alt="Jerusalem Jaffa Gate and surrounding Old City stone buildings" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"/>
          <div className="min-w-0 flex-1"><h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Plan a private Jerusalem visit</h3><p className="mt-1 text-sm text-muted-foreground">Choose the sites that matter to you and plan your pickup.</p><span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Send an inquiry <ArrowUpRight className="h-4 w-4"/></span></div>
        </a>
      </div>
      <JerusalemPartnerOffers id="old-city-jerusalem" />
    </div>
  ),
  faqs: [
    { q: "How long should I spend in Jerusalem's Old City?", a: "Allow at least three or four hours for two major sights and a little wandering. A full day is better if you want a museum, the Western Wall Tunnels or a more detailed pilgrimage route." },
    { q: "Which gate is closest to the Western Wall?", a: "Dung Gate is often the simplest approach. Jaffa Gate suits visits beginning near the Tower of David and Christian Quarter, while Damascus Gate is useful for the northern markets and Via Dolorosa." },
    { q: "Can I visit the Old City on Saturday?", a: "Yes. Public streets and the Western Wall plaza remain accessible, and the Church of the Holy Sepulchre usually opens daily. Shops, museums, transport and religious sites have different schedules, so plan around your particular stops." },
    { q: "Can non-Muslims visit the Dome of the Rock or Al-Aqsa Mosque?", a: "The interiors are generally not open to non-Muslim visitors. Access to the Temple Mount/Haram al-Sharif esplanade itself is limited to designated visiting periods when permitted, subject to security and religious events." },
    { q: "Is Jerusalem's Old City wheelchair accessible?", a: "Some adapted routes and places are accessible, but many alleys and old buildings have slopes or stairs. Contact the specific attraction and plan a suitable entry gate before travelling." },
  ],
  nearby: [
    { label: "Mount of Olives", to: "/attractions/mount-of-olives/", note: "Jerusalem skyline views, Gethsemane and hillside churches." },
    { label: "Mount Zion", to: "/attractions/mount-zion/", note: "Cenacle, Dormition Abbey and historic sites near Zion Gate." },
    { label: "Qasr el-Yahud", to: "/attractions/qasr-el-yahud/", note: "Jordan River pilgrimage site on a separate regional excursion." },
    { label: "Masada National Park", to: "/attractions/masada/", note: "Desert fortress and Dead Sea viewpoints on a full-day trip." },
    { label: "Ein Gedi Nature Reserve", to: "/attractions/ein-gedi/", note: "Oasis waterfalls and desert trails beside the Dead Sea." },
    { label: "Caesarea National Park", to: "/attractions/caesarea/", note: "Roman ruins and the Mediterranean coast, for another travel day." },
  ],
  planningLinks: [
    { label: "Jerusalem city guide", to: "/travel-blog/jerusalem-travel-guide/", description: "Plan the rest of your stay beyond the walls.", icon: "region" },
    { label: "Churches in Jerusalem", to: "/travel-blog/churches-in-jerusalem/", description: "A more detailed Christian pilgrimage route.", icon: "region" },
    { label: "Shopping in Jerusalem", to: "/travel-blog/shopping-in-jerusalem/", description: "Historic souks and city markets.", icon: "region" },
    { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/", description: "Choose a hotel area and an arrival route.", icon: "region" },
    { label: "Ben Gurion Airport to Jerusalem", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/", description: "Compare rail, road and transfer options.", icon: "arrival" },
    { label: "3-day Israel itinerary", to: "/travel-blog/israel-itinerary-3-days/", description: "Fit Jerusalem into a short visit.", icon: "itinerary" },
  ],
  sources: [
    { label: "UNESCO — Old City of Jerusalem and its Walls", url: official.unesco },
    { label: "Christian Information Center — church hours and religious-site access", url: official.christianHours },
    { label: "Western Wall Heritage Foundation — visitor information", url: official.westernWall },
    { label: "Western Wall Heritage Foundation — tunnel tours", url: official.tunnels },
    { label: "Tower of David Jerusalem Museum — tickets and visiting", url: official.tower },
    { label: "East Jerusalem Development — Ramparts Walk", url: official.ramparts },
  ],
};

export function OldCityJerusalemAttractionPage() {
  return <AttractionDestinationPage content={oldCityJerusalemDestinationContent} />;
}
