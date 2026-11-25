import { ConsentIframe } from "@/components/ConsentIframe";
import { BusFront, CarFront, Sun, Waves } from "lucide-react";
import type { ReactNode } from "react";
import { SiteLink as Link } from "@/components/SiteLink";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { DeadSeaTourOptions } from "@/components/DeadSeaTourOptions";
import overviewPhoto from "@/assets/dead-sea/landscape.webp";
import floatingPhoto from "@/assets/dead-sea/beach.webp";
import beachPhoto from "@/assets/guides/dead-sea-ein-bokek-shore.webp";
import sunbedsPhoto from "@/assets/dead-sea/sunbeds.webp";
import saltFormationPhoto from "@/assets/guides/dead-sea-salt-island.webp";

const links = {
  einBokek: "https://www.deadsea.co.il/attractions/ein-bokek-central-beach/?lang=en",
  hameiZohar: "https://www.deadsea.co.il/attractions/hamei-zohar-central-beach/?lang=en",
  hotelBeaches: "https://www.deadsea.co.il/attractions/the-hotel-beaches/?lang=en",
  egged: "https://www.egged.co.il/",
  masada: "https://en.parks.org.il/reserve-park/masada-national-park/",
  einGedi: "https://en.parks.org.il/reserve-park/en-gedi-nature-reserve/",
  qumran: "https://en.parks.org.il/reserve-park/qumran-park/",
  bathingRules: "https://www.gov.il/he/pages/sea-rules?chapterindex=1",
  geology: "https://www.gov.il/he/departments/topics/dead-sea3",
};
const maps = {
  einBokek: "https://www.google.com/maps/dir/?api=1&destination=Ein%20Bokek%20Central%20Beach%2C%20Israel",
  hameiZohar: "https://www.google.com/maps/dir/?api=1&destination=Hamei%20Zohar%20Central%20Beach%2C%20Israel",
  hotelArea: "https://www.google.com/maps/search/?api=1&query=Ein%20Bokek%20hotels%20Dead%20Sea%20Israel",
};
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const External = ({ href, children }: { href: string; children: ReactNode }) =>
  <a href={href} target="_blank" rel="noopener noreferrer" className={inlineLink}>{children}<span className="sr-only"> (opens in a new tab)</span></a>;

export const deadSeaSite = {
  title: "Dead Sea: Floating, Beaches & Visitor Guide",
  description: "Plan a Dead Sea visit in Israel: where to float for free at Ein Bokek or Hamei Zohar, beach facilities, safe bathing, transport and nearby Masada.",
  updatedAt: "2026-11-21",
  hero: { src: overviewPhoto, alt: "The mineral-rich waters and desert landscape of the Dead Sea in Israel" },
  sources: links,
} as const;

/** One individual visitor destination, distinct from the regional attractions roundup. */
export const deadSeaDestinationContent: AttractionDestinationContent = {
  path: "/attractions/dead-sea/",
  placeName: "the Dead Sea",
  factsTitle: "The Dead Sea at a glance",
  title: deadSeaSite.title,
  heroTitle: "The Dead Sea",
  region: "Dead Sea & Masada",
  intro: "Floating in the Dead Sea is one of Israel's most unusual travel experiences. In this guide I'll show you where to enjoy the water, how to choose a public beach, what to know before entering and how to fit in a desert attraction or two.",
  hero: deadSeaSite.hero,
  updatedAt: deadSeaSite.updatedAt,
  highlightsTitle: "Experience the Dead Sea",
  visitorTitle: "Beaches, access and facilities",
  visitorNavLabel: "Beaches & facilities",
  transportTitle: "Getting to the Dead Sea",
  itineraryTitle: "How to plan your Dead Sea day",
  historyTitle: "What makes the Dead Sea special?",
  relatedTitle: "Explore the Dead Sea and beyond",
  contactIntroduction: "Planning a day at the Dead Sea or a private trip to Masada and Ein Gedi? Tell me where you're starting, your travel date and the stops you have in mind. I'll be happy to help with private transport and a practical itinerary.",
  facts: [
    { icon: "location", label: "Location", value: "Judean Desert", note: "Between Israel and Jordan; Ein Bokek is the main resort area" },
    { icon: "duration", label: "Time needed", value: "2–4 hours", note: "Beach visit; a full day with Masada" },
    { icon: "admission", label: "Public beach", value: "Free entry", note: "Ein Bokek and Hamei Zohar central beaches" },
    { icon: "hours", label: "Bathing", value: "Lifeguard hours", note: "Enter only when the designated area is supervised" },
    { icon: "highlights", label: "Best known for", value: "Effortless floating", note: "Very salty water and desert views" },
    { icon: "access", label: "Easiest base", value: "Ein Bokek", note: "Shops, promenade, showers and hotels" },
  ],
  glanceNote: <><strong>My starting point for most first-time visitors is Ein Bokek Central Beach.</strong> Admission to the public beach is free, and you can make a relaxed day of it without booking a hotel or spa package.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight title="Float in the Dead Sea" image={{ src: floatingPhoto, alt: "Saltwater shoreline at the Dead Sea in Israel" }}>
        <p>The Dead Sea's exceptionally salty water makes floating feel almost effortless. Enter slowly, lean back and let the water support you. This is a place for gentle floating, rather than ordinary swimming or diving.</p>
        <p>Keep your face above water, avoid splashing and use a freshwater shower immediately if saltwater gets into your eyes. Choose a designated beach where lifeguards are on duty.</p>
      </AttractionHighlight>
      <AttractionPracticalTip>Bring water shoes, a towel and plenty of drinking water. A small cut or freshly shaved skin can sting surprisingly strongly in the salty water; rinse off after your float.</AttractionPracticalTip>
      <AttractionHighlight title="Dead Sea mud and mineral treatments">
        <p>Mineral-rich Dead Sea mud is a famous part of the spa tradition here. For a simple experience, look for packaged mud in local shops or ask a hotel spa what is included. Mud is not guaranteed to be available naturally at the managed Ein Bokek beaches.</p>
        <p>Avoid putting mud on broken or irritated skin and keep it away from your eyes. Rinse off with fresh water afterwards, and never enter an unmarked shoreline or sinkhole zone in search of natural mud.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Ein Bokek Central Beach" image={{ src: beachPhoto, alt: "The public beach and blue waters of the Dead Sea at Ein Bokek" }}>
        <p>Ein Bokek is my usual recommendation for a straightforward first visit. Its central public beach has free entry, shaded areas, freshwater showers, changing facilities and a nearby promenade, shops and cafés.</p>
        <p>The <External href={links.einBokek}>regional tourism authority's beach page</External> explains the public facilities, including accessible beach equipment. <External href={maps.einBokek}>Find Ein Bokek Central Beach on Google Maps</External>.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Hamei Zohar Central Beach" image={{ src: sunbedsPhoto, alt: "Sun loungers and shade at the southern Dead Sea beaches" }}>
        <p>South of the main Ein Bokek hotel strip, Hamei Zohar is another free public bathing choice, with managed beach facilities and a more spread-out coastal setting. It can work well if your hotel or driving route brings you farther south.</p>
        <p>See the <External href={links.hameiZohar}>official Hamei Zohar beach information</External> and <External href={maps.hameiZohar}>location on Google Maps</External>.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Salt scenery, desert cliffs and the promenade" image={{ src: saltFormationPhoto, alt: "White salt formations rising from the turquoise Dead Sea" }}>
        <p>The contrast between pale salt, blue-green water and the dry desert hills is part of the appeal. Allow time for a short walk along an established promenade and a few photographs before or after your beach visit.</p>
        <p>Stay on marked public paths. Sinkholes make sections of the northern shore unstable. Keep to designated access areas and bathing beaches.</p>
      </AttractionHighlight>
      <AttractionHighlight title="A hotel spa or an overnight stay">
        <p>Hotels around Ein Bokek offer spa treatments, pools and overnight accommodation. A spa day can be attractive in hot or cool weather, but access, opening hours and inclusions depend on the property and its current offer.</p>
        <p>If you're considering staying overnight, my <Link to="/accommodation/dead-sea/" className={inlineLink}>Dead Sea accommodation guide</Link> compares areas and hotel options. A free public beach visit remains a good choice for travellers staying elsewhere.</p>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>You don't need a hotel reservation to float in the Dead Sea. The official beach pages currently list <strong>07:00–18:00 in summer</strong> and <strong>07:00–16:00 in winter</strong> for the Ein Bokek and Hamei Zohar central beaches. Confirm lifeguard hours and local notices before entering the water.</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-testid="dead-sea-beach-comparison">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-lg font-semibold">Ein Bokek Central Beach</h3>
          <p className="mt-2 text-sm"><strong>Admission:</strong> Free</p>
          <p className="mt-1 text-sm leading-relaxed">A convenient first choice with showers, changing rooms, council-provided free chairs and umbrellas, and access to the hotel-area promenade. Nearby parking is generally paid.</p>
          <External href={links.einBokek}>Official beach information</External>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-lg font-semibold">Hamei Zohar Central Beach</h3>
          <p className="mt-2 text-sm"><strong>Admission:</strong> Free</p>
          <p className="mt-1 text-sm leading-relaxed">A public beach farther south, with showers, changing rooms, free council-provided chairs and umbrellas, and lifeguard services during operating hours.</p>
          <External href={links.hameiZohar}>Official beach information</External>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-lg font-semibold">Hotel-operated beach areas</h3>
          <p className="mt-2 text-sm"><strong>Beach access:</strong> Public</p>
          <p className="mt-1 text-sm leading-relaxed">Some hotel-operated sections charge for chairs or umbrellas unless you're a guest. Spa and pool access are separate.</p>
          <External href={links.hotelBeaches}>Compare beach facilities</External>
        </article>
      </div>
      <AttractionPracticalTip><strong>Free entry does not mean supervised bathing at every hour.</strong> Beach promenades may remain accessible outside lifeguard shifts, but enter the water only within the marked swimming area while lifeguards are operating. Check the posted notices on arrival.</AttractionPracticalTip>
      <div className="rounded-xl border bg-secondary/20 p-4">
        <h3 className="font-serif text-lg font-semibold">Where to go and what to budget for</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li><strong>Public beach:</strong> Entry is free at the central Ein Bokek and Hamei Zohar beaches.</li>
          <li><strong>Extra costs:</strong> Parking, meals, optional rentals, treatments and hotel facilities may cost extra.</li>
          <li><strong>Water and shade:</strong> Bring drinking water and use the public showers to remove salt after bathing.</li>
          <li><strong>Accessibility:</strong> Central beaches advertise accessible paths and beach wheelchairs; check the available facilities at the lifeguard station.</li>
          <li><strong>Weather:</strong> Summer heat can be extreme, while desert storms can affect the roads and hiking access.</li>
        </ul>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>For a beach visit, use <strong>Ein Bokek Central Beach</strong> as your destination rather than simply entering “Dead Sea” in the map. The shoreline is long, and northern and southern beaches are not interchangeable.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="flex items-center gap-2 font-serif text-lg font-semibold"><CarFront className="size-5 text-primary" aria-hidden="true" />By car or private driver</h3>
          <p className="mt-2 text-sm leading-relaxed">Jerusalem is generally about 1½–2 hours from Ein Bokek, while Tel Aviv is commonly 2½–3 hours away, depending on traffic, weather and your starting point. The usual approach is via Route 1 and Route 90; follow current navigation and road notices.</p>
          <p className="mt-2 text-sm leading-relaxed">For more than one stop, such as Masada and the beach, a car or <Link to="/private-driver-in-israel/" className={inlineLink}>private driver</Link> gives the most flexibility.</p>
          <div className="mt-2"><External href={maps.einBokek}>Directions to Ein Bokek beach</External></div>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="flex items-center gap-2 font-serif text-lg font-semibold"><BusFront className="size-5 text-primary" aria-hidden="true" />By public transport</h3>
          <p className="mt-2 text-sm leading-relaxed">Egged operates intercity buses along the Dead Sea corridor, including services from Jerusalem. Frequencies vary, and service can be limited on weekends and holidays. Check the exact route and return journey for your travel date.</p>
          <p className="mt-2 text-sm leading-relaxed">There is no railway station at Ein Bokek. Use <External href={links.egged}>Egged's current timetable and route planner</External> for bus numbers, fares and departure times.</p>
        </article>
      </div>
      <p className="text-sm leading-relaxed">Arriving from Ben Gurion Airport? My <Link to="/airport-transfers/ein-bokek/" className={inlineLink}>airport-to-Ein-Bokek transfer guide</Link> explains the journey, while the <Link to="/travel-blog/jerusalem-to-the-dead-sea/" className={inlineLink}>Jerusalem to the Dead Sea guide</Link> compares options from the city.</p>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-lg font-semibold">A relaxed beach visit</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
            <li>Arrive at Ein Bokek, confirm lifeguard hours and find a safe public bathing area.</li>
            <li>Spend around two hours floating, taking breaks, showering and relaxing in the shade.</li>
            <li>Enjoy the promenade, stop for lunch or browse the nearby shops before leaving.</li>
          </ol>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-lg font-semibold">A full day with Masada</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
            <li>Visit <Link to="/attractions/masada/" className={inlineLink}>Masada</Link> in the cooler morning hours; allow two to three hours for the plateau.</li>
            <li>Continue to Ein Bokek for a late-morning or afternoon beach stop within supervised bathing hours.</li>
            <li>Keep extra time for the drive home. Add <Link to="/attractions/ein-gedi/" className={inlineLink}>Ein Gedi</Link> only when its trails are open and the day's timing makes sense.</li>
          </ol>
        </article>
      </div>
      <AttractionPracticalTip>For a comfortable day, choose <strong>two principal stops</strong>, usually Masada and the beach. If you also want to hike in Ein Gedi, check its current route access and start early; the reserve may limit entry after floods.</AttractionPracticalTip>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-lg font-semibold">Dead Sea area map</h3>
        <p className="mt-1 text-sm text-muted-foreground">The map is centred on the Ein Bokek resort area. Use the individual location links above for each beach.</p>
        <ConsentIframe title="Map of Ein Bokek and the southern Dead Sea in Israel" src="https://maps.google.com/maps?q=Ein%20Bokek%2C%20Israel&hl=en&z=11&t=m&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-3 h-64 w-full rounded-lg border sm:h-80" />
        <div className="mt-3"><External href={maps.hotelArea}>Open the resort area in Google Maps</External></div>
      </div>
    </div>
  ),
  practicalContent: (
    <div className="mt-4 space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="flex items-center gap-2 font-serif text-lg font-semibold"><Waves className="size-5 text-primary" aria-hidden="true" />Floating safely</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>Keep your head and face above the water; never dive or try to swim underwater.</li>
            <li>Move gently rather than splashing other bathers, and avoid swallowing the water.</li>
            <li>Wear water shoes; salt crystals and hot sand can be sharp or uncomfortable.</li>
            <li>Rinse thoroughly after bathing and protect phones and jewellery from salt.</li>
          </ul>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="flex items-center gap-2 font-serif text-lg font-semibold"><Sun className="size-5 text-primary" aria-hidden="true" />Desert weather and essentials</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>Pack sunscreen, a hat, swimwear, towel, water shoes and plenty of drinking water.</li>
            <li>Spring and autumn are often more comfortable than the hottest summer afternoons.</li>
            <li>Never cross closed trails, sinkhole zones or temporary flood barriers.</li>
            <li>For <Link to="/travel-blog/calendar-of-events/" className={inlineLink}>Jewish holidays and special dates</Link>, check altered bus and service hours.</li>
          </ul>
        </article>
      </div>
      <AttractionPracticalTip>If a sudden desert storm is forecast, check Route 90 conditions and park notices before setting out. Flash floods can occur even if it is not raining at your beach or trail.</AttractionPracticalTip>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3 leading-relaxed">
      <p>The Dead Sea is a hypersaline lake in the Jordan Rift Valley, bordered by Israel and the West Bank on its western side and Jordan on the eastern side. Its shoreline is the lowest land elevation on Earth, but the precise level changes as the lake recedes.</p>
      <p>The southern bathing area near Ein Bokek is maintained as an evaporation-pond basin, while much of the northern lake and shoreline has changed considerably over recent decades. This distinction is important: scenic salt formations along the unregulated northern shore do not indicate a safe place to enter the water.</p>
      <p>The area also has deep historical connections. <Link to="/attractions/masada/" className={inlineLink}>Masada</Link> rises above the shore, and the <External href={links.qumran}>Qumran archaeological site</External> is associated with the discovery of the Dead Sea Scrolls. For a broader selection of places to visit, see my <Link to="/travel-blog/dead-sea-attractions/" className={inlineLink}>Dead Sea attractions guide</Link>.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-3">
      <p>Guided day trips are useful if you'd rather not drive. These sample tours depart from Jerusalem and range from a relaxed beach excursion to a Masada-and-Dead-Sea combination.</p>
      <AttractionPracticalTip>Tour operators may use different Dead Sea beaches, including northern-shore beaches rather than Ein Bokek or Hamei Zohar. Check the exact beach stop, entrance fees, admissions and pickup point before booking.</AttractionPracticalTip>
      <DeadSeaTourOptions selectedIds={["jslm-deadsea-beach-viator", "jslm-deadsea-masada-viator", "jslm-deadsea-masada-gyg"]} pageId="attractions-dead-sea" />
      <p className="text-sm">For more departure options, including Tel Aviv, explore my <Link to="/tours/masada-dead-sea/" className={inlineLink}>Masada & Dead Sea tours</Link>. For a flexible route with a private driver, <a href="#contact" className={inlineLink}>send me your plans</a>.</p>
    </div>
  ),
  faqs: [
    { q: "Can I visit the Dead Sea for free?", a: "Yes. Ein Bokek Central Beach and Hamei Zohar Central Beach on the Israeli southern shore offer free public access. Hotel spas and optional rentals may cost extra." },
    { q: "Where is the easiest place to float in the Dead Sea?", a: "Ein Bokek Central Beach is a convenient first-time choice because of its public facilities, freshwater showers, promenade and nearby shops." },
    { q: "Is it safe to swim in the Dead Sea?", a: "Float gently at a designated, lifeguard-supervised beach. Do not dive, splash, put your face underwater or swallow the water. Rinse off immediately if saltwater reaches your eyes." },
    { q: "Are the Dead Sea beaches open 24 hours a day?", a: "Public promenades can be accessible beyond bathing service hours, but you should enter the water only within the designated beach and while lifeguards are on duty. Hours can change seasonally." },
    { q: "What should I bring?", a: "Bring swimwear, a towel, water shoes, sunscreen, a hat and plenty of drinking water. A change of clothes helps after showering off the salt." },
    { q: "How much time should I allow for the Dead Sea?", a: "Two to four hours works for a relaxed beach visit. Allow most of a day if you want to combine it with Masada, particularly when travelling from Tel Aviv." },
    { q: "Can I visit Masada and the Dead Sea on the same day?", a: "Yes. Masada in the cooler morning hours followed by an Ein Bokek beach visit is a practical combination. Allow time for driving and check the national park's opening hours." },
    { q: "What is the best time of year to visit?", a: "Spring and autumn often offer the most comfortable daytime temperatures. Summer can be extremely hot; winter days may be pleasant but desert storms can disrupt travel." },
    { q: "Can I reach the Dead Sea by bus?", a: "Yes, Egged intercity buses serve the Dead Sea corridor, including Ein Bokek. Check the operator's current route, timetable and return journey for your date. There is no train to the resort." },
    { q: "Where can I stay near the Dead Sea?", a: "Ein Bokek has the main cluster of hotels and spas beside the public beaches. Compare the resorts and check current spa access and hotel policies before booking." },
  ],
  nearby: [
    { label: "Masada National Park", to: "/attractions/masada/", note: "Desert fortress, cable car and remarkable views" },
    { label: "Ein Gedi Nature Reserve", to: "/attractions/ein-gedi/", note: "Desert oasis and managed hiking trails" },
    { label: "Qasr el-Yahud", to: "/attractions/qasr-el-yahud/", note: "Historic baptism site along the Jordan River" },
    { label: "Dead Sea attractions", to: "/travel-blog/dead-sea-attractions/", note: "Browse more sights across the wider region" },
    { label: "Ramon Crater", to: "/attractions/mitzpe-ramon-crater/", note: "Continue into the Negev for a longer desert itinerary" },
    { label: "Jerusalem travel guide", to: "/travel-blog/jerusalem-travel-guide/", note: "Explore Jerusalem before or after the desert" },
  ],
  planningLinks: [
    { label: "Jerusalem to the Dead Sea", to: "/travel-blog/jerusalem-to-the-dead-sea/", icon: "transport", description: "Driving and public transport options" },
    { label: "Ben Gurion Airport to Ein Bokek", to: "/airport-transfers/ein-bokek/", icon: "arrival", description: "Plan a transfer from the airport" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", icon: "seasons", description: "Choose comfortable seasons and plan for desert heat" },
    { label: "Israel travel calendar", to: "/travel-blog/calendar-of-events/", icon: "seasons", description: "Holidays and special dates" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", icon: "transport", description: "Buses, roads and longer journeys" },
    { label: "Private driver in Israel", to: "/private-driver-in-israel/", icon: "itinerary", description: "A flexible day at your own pace" },
  ],
  sources: [
    { label: "Tamar Regional Council - Ein Bokek Central Beach", url: links.einBokek },
    { label: "Tamar Regional Council - Hamei Zohar Central Beach", url: links.hameiZohar },
    { label: "Dead Sea Land - hotel beach facilities", url: links.hotelBeaches },
    { label: "Israel Ministry of Interior - safe sea bathing rules", url: links.bathingRules },
    { label: "Egged - official bus schedules", url: links.egged },
    { label: "Israel Nature and Parks Authority - Masada", url: links.masada },
    { label: "Israel Nature and Parks Authority - Ein Gedi", url: links.einGedi },
    { label: "Israel Nature and Parks Authority - Qumran", url: links.qumran },
    { label: "Geological Survey of Israel - Dead Sea", url: links.geology },
  ],
};

export function DeadSeaAttractionPage() {
  return <AttractionDestinationPage content={deadSeaDestinationContent} />;
}
