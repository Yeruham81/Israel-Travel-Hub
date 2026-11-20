import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Clock3, Shirt, Ticket } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { qasrElYahudSite } from "@/data/qasrElYahudSite";
import { carRentalAffiliateUrl } from "@/lib/car-rental-affiliate";
import riverbankPhoto from "@/assets/guides/dead-sea-excursions/jordan-river-qasr-al-yahud.webp";
import ceremonyPhoto from "@/assets/guides/qasr-el-yahud.jpg";
const jordanRiverTourPhoto = "/images/attractions/jordan-river-baptism.webp";
import deadSeaPhoto from "@/assets/dead-sea/landscape.webp";

const visit = qasrElYahudSite.visit;
const official = qasrElYahudSite.sources;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const routeDirections = "https://www.google.com/maps/dir/?api=1&destination=Qasr%20el%20Yahud%20Baptismal%20Site%2C%20Israel&travelmode=driving";
const mapEmbed = "https://maps.google.com/maps?q=Qasr%20el%20Yahud%20Baptismal%20Site&hl=en&z=13&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Qasr%20el%20Yahud%20Baptismal%20Site";

export const qasrElYahudDestinationContent: AttractionDestinationContent = {
  path: "/attractions/qasr-el-yahud/",
  placeName: "Qasr el-Yahud",
  title: qasrElYahudSite.title,
  region: qasrElYahudSite.region,
  updatedAt: qasrElYahudSite.updatedAt,
  hero: qasrElYahudSite.hero,
  intro: qasrElYahudSite.intro,
  visitorTitle: "Admission, reservations and opening hours",
  visitorNavLabel: "Visit information",
  historyTitle: "A sacred place on the lower Jordan",
  relatedTitle: "Explore the Jordan Valley, Dead Sea and Jerusalem",
  contactIntroduction: "Planning a visit to Qasr el-Yahud? Tell me your date, departure point, group size and whether you'd like to visit other places along the Dead Sea or around Jerusalem. I'll be happy to help arrange a suitable private journey.",
  facts: [
    { icon: "location", label: "Location", value: "Lower Jordan River", note: "Near Jericho, north of the Dead Sea" },
    { icon: "duration", label: "Time needed", value: visit.visitorTime, note: "Longer if joining a baptism ceremony" },
    { icon: "admission", label: "Admission", value: visit.admission, note: "Advance online registration required" },
    { icon: "hours", label: "Opening hours", value: "From 08:00", note: "Seasonal closing; last entry one hour earlier" },
    { icon: "highlights", label: "Main experience", value: "Riverbank & baptism", note: "Prayer, observation and ceremonies" },
    { icon: "access", label: "Accessibility", value: "Visitor areas accessible", note: "River immersion itself is not accessible" },
  ],
  glanceNote: <>The visitor entrance is on the western bank of the Jordan River. If you are planning a baptism, arrange your officiant and ceremony details before the visit.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight
        title="The Jordan River baptism area"
        image={{ src: ceremonyPhoto, alt: "Christian pilgrims gathering for a baptism ceremony beside the lower Jordan River at Qasr el-Yahud" }}
      >
        <p>At the designated riverbank area, visitors can see the water and the steps used during Christian baptism ceremonies. The place is associated by tradition with Jesus' baptism by John the Baptist and remains important to pilgrims from many churches.</p>
        <p>You can also come simply to observe, reflect or pray. If a ceremony is in progress, leave space for participants and ask permission before taking close-up photographs.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="River terraces and places for reflection"
        image={{ src: riverbankPhoto, alt: "Visitor terraces, shade structures and the Jordan River at the Qasr el-Yahud site" }}
      >
        <p>Look across the narrow river to the opposite, Jordanian bank. The visitor area includes places to pause beside the water, with shaded space and access to the designated baptism steps.</p>
        <p>The site has been improved with a wider river deck, a prayer area and renewed visitor facilities. Stick to the marked public area and follow the attendants' instructions at the water.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Monasteries and the Jordan Valley landscape">
        <p>Historic Christian monasteries and chapels dot the Jordan Valley, reflecting centuries of religious life and pilgrimage. Some were established in the Byzantine period and still lend the landscape its distinctive character.</p>
        <p>From the marked visitor area, take in the river, desert vegetation and nearby religious landmarks. For a closer look at the monastery corridor, ask about officially arranged visits.</p>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>Qasr el-Yahud is operated by the Israel Nature and Parks Authority. Admission is free for all visitors; book a visit online before arriving. Baptism services and any purchases are arranged separately.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="qasr-hours-booking">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Opening hours</h3>
          <p className="mt-3 text-sm font-semibold">Summer / daylight saving time</p>
          <p className="mt-1 text-sm leading-relaxed sm:text-base">Sunday–Thursday and Saturday: <strong>{visit.summerRegular}</strong></p>
          <p className="mt-1 text-sm leading-relaxed sm:text-base">Fridays and ordinary holiday eves: <strong>{visit.summerFriday}</strong></p>
          <p className="mt-3 text-sm font-semibold">Winter / standard time</p>
          <p className="mt-1 text-sm leading-relaxed sm:text-base">Sunday–Thursday and Saturday: <strong>{visit.winterRegular}</strong></p>
          <p className="mt-1 text-sm leading-relaxed sm:text-base">Fridays and ordinary holiday eves: <strong>{visit.winterFriday}</strong></p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">Rosh Hashanah, Passover and Yom Kippur eves: <strong>{visit.holidayEves}</strong>; closed on Yom Kippur.</p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>Last entry is one hour before closing.</strong> Access and hours can change under security instructions. <a href={official.operatorEnglish} target="_blank" rel="noopener noreferrer" className={inlineLink}>Check the official notice</a>.</p>
        </article>
        <article className="rounded-xl border bg-card p-4" data-testid="qasr-free-reservation">
          <div className="flex items-center gap-2"><Ticket className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-serif text-xl font-semibold">Free entry — reserve first</h3></div>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">The entry price is <strong>free for visitors of all ages</strong>. Since {visit.registerSince}, the operator has required registration before arriving at the site.</p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">Choose your date directly on the Qasr el-Yahud visitor page. Reservation dates normally open <strong>up to two weeks in advance</strong>; dates farther ahead may not appear yet. Booking the visit does not include a baptism ceremony or transport.</p>
          <a href={official.operatorEnglish} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Book a free Qasr el-Yahud visit <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></a>
        </article>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="qasr-baptism-guidance">
        <div className="flex items-center gap-2"><Shirt className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">Baptism and entering the water</h3></div>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">Entering the river is permitted in the designated baptism area when staff allow it. Clothing must <strong>cover shoulders and knees</strong>; swimwear alone is not permitted. Baptism robes and towels can be purchased on site, subject to availability.</p>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">Arrange your own officiant and ceremony time; the parks authority does not provide clergy. <strong>Organized group ceremonies or special events may require separate advance coordination and approval</strong> from the site manager, in addition to the visitor reservation. See the <a href={official.ceremonies} target="_blank" rel="noopener noreferrer" className={inlineLink}>official ceremony guidelines</a>, and allow time to prepare and change.</p>
        <AttractionPracticalTip>
          <strong>River safety:</strong> This is a baptism site, not a swimming beach. Use only the designated access steps, follow staff instructions and avoid entering the river if conditions or access restrictions do not permit it.
        </AttractionPracticalTip>
      </div>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="qasr-visitor-essentials">
        <h3 className="font-serif text-xl font-semibold">Facilities and practical details</h3>
        <ul className="mt-3 grid list-disc gap-x-6 gap-y-2 pl-5 text-sm leading-relaxed sm:grid-cols-2 sm:text-base">
          <li><strong>Facilities:</strong> Parking, toilets, changing rooms and hot showers are available in the renewed visitor complex.</li>
          <li><strong>Accessibility:</strong> Parking, reception, toilets, changing rooms, gathering areas and river viewpoints have accessible features. Because of the steep, muddy riverbank and water conditions, <strong>immersion in the river is not accessible</strong>.</li>
          <li><strong>Refreshments:</strong> The visitor shop may offer drinks, snacks, towels and baptism clothing for purchase.</li>
          <li><strong>Comfort:</strong> Bring water, sun protection, suitable footwear and a change of clothes if entering the river.</li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">For accessibility questions or changes to the operating arrangements, call the site at <a href={"tel:" + visit.sitePhoneInternational} dir="ltr" className={inlineLink}>{visit.sitePhone}</a> or use the <a href={official.operatorEnglish} target="_blank" rel="noopener noreferrer" className={inlineLink}>official park page</a>.</p>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>The entrance is on the <strong>western bank of the lower Jordan River, near Jericho</strong>, roughly 10 km north of the Dead Sea. Follow the signposted access road; do not take unmarked tracks in this border-area landscape.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">By car or private driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">From Jerusalem, take Route 1 east toward the Dead Sea, then Route 90 north and follow the signs to Qasr el-Yahud. In Waze, search <strong>Kasr el Yahud – The Baptismal Site – The Jordan Pass</strong>. A <a href={carRentalAffiliateUrl("/attractions/qasr-el-yahud/")} target="_blank" rel="sponsored noopener noreferrer" className={inlineLink}>rental car</a> or <a href="#contact" className={inlineLink}>prearranged driver</a> makes this an easy regional stop. With a rental car, confirm that your agreement and insurance permit the exact route before setting out.</p>
            <a href={routeDirections} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Driving directions <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></a>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">Public transport and the final approach</h3></div>
            <p className="mt-2 text-sm leading-relaxed">There is no convenient public-bus stop at the riverbank entrance. Buses along Route 90 do not remove the need for an arranged final transfer, and the access road is not an appropriate walk. Confirm your round-trip transport before leaving Jerusalem or the Dead Sea. Check regional services with the <a href="https://bus.gov.il/en/home" target="_blank" rel="noopener noreferrer" className={inlineLink}>official journey planner</a>.</p>
          </article>
          <AttractionPracticalTip>
            <strong>Stay on the marked road.</strong> The access road is controlled, and surrounding monastery tracks may be restricted because of security and former minefield hazards. Check official access instructions before travelling.
          </AttractionPracticalTip>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="qasr-location-map">
          <h3 className="text-sm font-semibold">Where is Qasr el-Yahud?</h3>
          <iframe title="Map showing Qasr el-Yahud baptism site near Jericho and the Jordan River" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56" />
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">View larger map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">A relaxed visit: 45–90 minutes</h3></div>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>Arrive for your <strong>reserved visit</strong>, park and make your way into the designated riverbank area.</li>
          <li>Pause at the <strong>river viewpoint and prayer space</strong>, watching any ceremonies respectfully.</li>
          <li>Visit the <strong>designated baptism steps</strong> if you have arranged an immersion or ceremony.</li>
          <li>Use the changing facilities if needed and allow time to leave before the site's closing time.</li>
        </ol>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">A planned group baptism can take longer, especially when participants need to change and prepare. Allow additional time for the road approach and any access checks.</p>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">Choose the right Jordan River destination</h3>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">For a baptism pilgrimage, these three Jordan River locations serve different routes and traditions:</p>
        <div className="mt-3 space-y-3 text-sm leading-relaxed sm:text-base">
          <div><strong>Qasr el-Yahud:</strong> The lower Jordan near Jericho, traditionally associated with Jesus' baptism. The site described in this guide.</div>
          <div><strong><Link to="/attractions/yardenit/" className={inlineLink}>Yardenit</Link>:</strong> A separately operated baptism site at the southern outlet of the Sea of Galilee, much farther north.</div>
          <div><strong><a href={official.baptismJordan} target="_blank" rel="noopener noreferrer" className={inlineLink}>Al-Maghtas / Bethany Beyond the Jordan</a>:</strong> The UNESCO-listed baptism heritage area on the Jordanian side, with separate country-entry and visitor arrangements.</div>
        </div>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">A visit here does not include crossing to the Jordanian site. For practical differences and ceremony planning, see my <Link to="/travel-blog/baptism-in-the-jordan-river/" className={inlineLink}>Jordan River baptism guide</Link>.</p>
      </div>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>Christian tradition connects this stretch of the Jordan River with the baptism of Jesus by John the Baptist. The area also carries Jewish and biblical traditions relating to the crossing of the Jordan by Joshua and the prophet Elijah.</p>
      <p>Monastic communities developed along the river from the Byzantine period onward. Pilgrimages continued through different periods of regional history, and the river remains a shared landscape of memory and religious practice.</p>
      <p>Today the river remains a place for prayer, baptism and shared heritage, linking the historical landscape with the religious lives of the visitors who arrive each year.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Some regional excursions combine the baptism site with Jericho, Bethlehem or Dead Sea viewpoints. Check how much time each tour allows at the riverbank, especially if your group is planning a ceremony.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/bethlehem-jericho-jordan-river/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="qasr-organized-tour">
          <img src={jordanRiverTourPhoto} alt="Pilgrims in white robes gathering for baptism beside the Jordan River" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"/>
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Explore Bethlehem, Jericho & Jordan River tours</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Compare regional excursions and their included stops.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">See tour options <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></span>
          </div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="qasr-private-journey">
          <img src={deadSeaPhoto} alt="Dead Sea desert shoreline on a customized Jordan Valley journey" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"/>
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Plan a private Jordan Valley visit</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Choose a pickup point and suitable nearby stops.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "Is Qasr el-Yahud free to visit?", a: "Yes. Entry is free, but the Israel Nature and Parks Authority requires advance online registration. Baptism clothing, refreshments, clergy and transport are not included." },
    { q: "Do I need to register in advance?", a: "Yes. Choose a visit slot on the official Qasr el-Yahud page. Dates normally open up to two weeks ahead, so a more distant date may not yet appear in the calendar." },
    { q: "What are the opening hours?", a: "The site opens at 08:00. In summer it closes at 17:00 on most days and 16:00 on Fridays; in winter at 16:00 and 15:00 respectively. Special holiday eves close at 13:00. Last entry is one hour before closing, and security restrictions can change access." },
    { q: "Can I enter the river in a swimsuit?", a: "No. The operator requires clothing that covers the shoulders and knees; ordinary swimwear alone is not permitted. Use the authorized baptism steps and follow instructions from site staff." },
    { q: "Is a priest provided for a baptism?", a: "Arrange your own officiant. Organized ceremonies and large events may also require the site manager's prior approval, separately from an individual visit reservation." },
    { q: "Can wheelchair users visit Qasr el-Yahud?", a: "Accessible facilities include the car park, reception, toilets, changing areas and river viewpoint. Immersion itself cannot be made accessible because of the riverbank terrain and water conditions." },
    { q: "Is Qasr el-Yahud the same as Yardenit?", a: "No. Yardenit is much farther north near the Sea of Galilee, while Qasr el-Yahud is on the lower Jordan near Jericho." },
    { q: "Can I cross the river to the Jordanian baptism site?", a: "No. Jordan's Al-Maghtas site has its own border-entry and booking arrangements. A visit to the western-bank river deck does not allow crossing into Jordan." },
  ],
  nearby: [
    { label: "Masada National Park", to: "/attractions/masada/", note: "Herod's dramatic desert fortress, best visited as a longer Dead Sea outing." },
    { label: "Ein Gedi Nature Reserve", to: "/attractions/ein-gedi/", note: "Waterfalls and oasis trails; check which routes are currently open." },
    { label: "Yardenit", to: "/attractions/yardenit/", note: "Compare the separate baptism site near the Sea of Galilee." },
    { label: "Jerusalem's Old City", to: "/attractions/old-city-jerusalem/", note: "Historic quarters and pilgrimage landmarks for a Jerusalem sightseeing day." },
    { label: "Mount of Olives", to: "/attractions/mount-of-olives/", note: "Viewpoints and sacred sites overlooking Jerusalem." },
    { label: "Mount Zion", to: "/attractions/mount-zion/", note: "Churches and historic places near Jerusalem's Old City walls." },
  ],
  planningLinks: [
    { label: "Baptism in the Jordan River", to: "/travel-blog/baptism-in-the-jordan-river/", description: "Compare Qasr el-Yahud and Yardenit.", icon: "region" },
    { label: "Jerusalem to the Dead Sea", to: "/travel-blog/jerusalem-to-the-dead-sea/", description: "Plan the route and nearby stops.", icon: "itinerary" },
    { label: "The Dead Sea visitor guide", to: "/travel-blog/the-dead-sea/", description: "Beaches, facilities and distances.", icon: "region" },
    { label: "Masada National Park", to: "/attractions/masada/", description: "Plan another Judean Desert visit.", icon: "itinerary" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Compare road and public transport.", icon: "transport" },
    { label: "7-day Israel itinerary", to: "/travel-blog/israel-itinerary-7-days/", description: "Build a varied city and desert route.", icon: "itinerary" },
  ],
  sources: [
    { label: "Israel Nature and Parks Authority — Qasr el-Yahud", url: official.operatorEnglish, note: "Official access, general hours, directions and contact information." },
    { label: "Israel Nature and Parks Authority — visitor rules (Hebrew)", url: official.operatorHebrew, note: "Advance registration, seasonal hours, clothing, accessibility and baptism requirements." },
    { label: "Israel Nature and Parks Authority — visit reservation calendar", url: official.reservations, note: "Booking dates normally open two weeks in advance." },
    { label: "Israel Nature and Parks Authority — Qasr el-Yahud ceremonies", url: official.ceremonies, note: "Special event permissions, coordination and the site manager's contact." },
    { label: "Israel Nature and Parks Authority — accessibility information", url: official.accessibility, note: "Accessible facilities and limitations at the designated riverbank." },
    { label: "UNESCO — Baptism Site 'Bethany Beyond the Jordan'", url: official.baptismJordan, note: "The separately managed heritage site on the Jordanian bank." },
  ],
};

export function QasrElYahudAttractionPage() {
  return <AttractionDestinationPage content={qasrElYahudDestinationContent} />;
}
