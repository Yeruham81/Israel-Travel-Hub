import { ConsentIframe } from "@/components/ConsentIframe";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Footprints } from "lucide-react";
import {
  AttractionDestinationPage,
  AttractionHighlight,
  AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { mountTaborSite } from "@/data/mountTaborSite";
import galileePhoto from "@/assets/home/hero-galilee-sm.webp";

const inlineLink = "font-semibold text-primary underline underline-offset-4";
const mapEmbed =
  "https://maps.google.com/maps?q=Church%20of%20the%20Transfiguration%2C%20Mount%20Tabor%2C%20Israel&hl=en&z=14&t=m&output=embed";
const mapLarger =
  "https://www.google.com/maps/search/?api=1&query=Church%20of%20the%20Transfiguration%2C%20Mount%20Tabor%2C%20Israel&hl=en";
const churchDirections =
  "https://www.google.com/maps/dir/?api=1&destination=Church%20of%20the%20Transfiguration%2C%20Mount%20Tabor%2C%20Israel&travelmode=driving";
const terminalDirections =
  "https://www.google.com/maps/dir/?api=1&destination=Har%20Tabor%20Terminal%2C%20Shibli%2C%20Israel&travelmode=driving";

export const mountTaborDestinationContent: AttractionDestinationContent = {
  path: "/attractions/mount-tabor/",
  placeName: "Mount Tabor",
  title: mountTaborSite.title,
  region: mountTaborSite.region,
  updatedAt: mountTaborSite.updatedAt,
  hero: mountTaborSite.hero,
  intro: mountTaborSite.intro,
  historyTitle: "Mount Tabor's history and the Transfiguration",
  visitorTitle: "Opening hours, admission and visitor information",
  visitorNavLabel: "Hours & visits",
  relatedTitle: "Explore more in Lower Galilee and the Sea of Galilee",
  contactIntroduction:
    "Tell me your date, pickup point, number of passengers and the Galilee sites you would like to visit. I can arrange private transport or a day trip with a driver to Mount Tabor.",
  facts: [
    {
      icon: "location",
      label: "Location",
      value: "Lower Galilee",
      note: "Above the Jezreel Valley, east of Nazareth",
    },
    {
      icon: "duration",
      label: "Time needed",
      value: "60–90 minutes",
      note: "At the summit; allow time for the ascent",
    },
    {
      icon: "admission",
      label: "Admission",
      value: "Free entry",
      note: "Local taxi transport is charged separately",
    },
    {
      icon: "hours",
      label: "Franciscan church",
      value: "Mon–Fri " + mountTaborSite.visit.weekdayHours,
      note: "Sat–Sun " + mountTaborSite.visit.weekendHours,
    },
    {
      icon: "access",
      label: "Summit access",
      value: "Car or local taxi",
      note: "No large coaches on the summit road",
    },
    {
      icon: "highlights",
      label: "Summit trail",
      value: "About 2 km",
      note: "Marked walking loop around the summit",
    },
  ],
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight title="The Church of the Transfiguration">
        <p>
          The Franciscan basilica is the main reason pilgrims visit Mount Tabor. Designed by Antonio
          Barluzzi and completed in 1924, it has two distinctive towers flanking a pale stone
          entrance. The towers recall Moses and Elijah, who appear in the Gospel account of the
          Transfiguration.
        </p>
        <p>
          Approaching the Franciscan compound, you pass the historic{" "}
          <strong>Gate of the Wind</strong>, restored from an earlier gateway. Beside the basilica,
          look for the ruins of the <strong>medieval Benedictine monastery</strong>, including its
          former chapel and other stone structures.
        </p>
        <p>The basilica stands above the remains of earlier churches.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The golden mosaic and crypt"
        image={{
          src: "/images/attractions/mount-tabor-mosaic.webp",
          alt: "Golden mosaic showing Jesus between Moses and Elijah inside the Basilica of the Transfiguration",
        }}
      >
        <p>
          The golden mosaic above the sanctuary shows Jesus in radiant white, with Moses and Elijah
          alongside him.
        </p>
        <p>Visit the lower crypt to see an older apse and mosaics from an earlier period.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The hilltop basilica and its terraces"
        image={{
          src: "/images/attractions/mount-tabor-basilica-aerial.webp",
          alt: "Aerial view of the Basilica of the Transfiguration and surrounding monastery buildings on Mount Tabor",
        }}
      >
        <p>
          This view from above shows how the basilica and monastery sit on the wooded summit,
          surrounded by the open landscape of Lower Galilee.
        </p>
        <p>
          After exploring the church, walk out to the terraces for views across the Jezreel Valley
          and the surrounding hills, especially on clear days.
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The Greek Orthodox church of St. Elias"
        image={{
          src: "/images/attractions/mount-tabor-orthodox-interior.webp",
          alt: "Painted arches, religious icons and the iconostasis inside Mount Tabor's Greek Orthodox church",
        }}
      >
        <p>
          The Greek Orthodox monastery on the summit also commemorates the Transfiguration. Its
          church was rebuilt in the early twentieth century over earlier remains.
        </p>
        <p>
          Contact the monastery in advance to arrange a visit, as{" "}
          <strong>the church is generally closed to casual visitors.</strong>
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The forested mountain and summit paths"
        image={{
          src: "/images/attractions/mount-tabor-landscape.webp",
          alt: "The green, rounded silhouette of Mount Tabor rising above the surrounding Lower Galilee landscape",
        }}
      >
        <p>
          Mount Tabor's rounded outline is striking even from the surrounding valley. At the top,
          marked paths lead past oak woodland, old defensive walls and viewpoints.
        </p>
        <p>Follow the black-marked circular trail for a scenic walk around the summit.</p>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>
        The Franciscan basilica, Greek Orthodox monastery and summit trails have different visiting
        arrangements. Start with the church's visitor hours and plan the rest around them.
      </p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="mount-tabor-visitor-hours">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Franciscan basilica hours</h3>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">
            <strong>Monday–Friday:</strong> {mountTaborSite.visit.weekdayHours}.
          </p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">
            <strong>Saturday–Sunday:</strong> {mountTaborSite.visit.weekendHours}, with a midday
            break.
          </p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">
            These are the Franciscan sanctuary's published hours. Visiting arrangements may change
            during services or holidays, so confirm special dates before going up.
          </p>
          <a
            href={mountTaborSite.sources.franciscan}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Franciscan opening hours <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Admission and contact</h3>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">
            Admission to Mount Tabor is free. If you take a local taxi to the summit, agree on the
            fare and arrange your return journey in advance.
          </p>
          <p className="mt-3 text-sm">
            <strong>Visitor enquiries: </strong>
            <a
              href={"tel:" + mountTaborSite.visit.visitorPhoneHref}
              dir="ltr"
              className={inlineLink}
            >
              {mountTaborSite.visit.visitorPhone}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <strong>Franciscan community: </strong>
            <a
              href={"tel:" + mountTaborSite.visit.friarsPhoneHref}
              dir="ltr"
              className={inlineLink}
            >
              {mountTaborSite.visit.friarsPhone}
            </a>
          </p>
          <a
            href={mountTaborSite.sources.franciscan}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Franciscan sanctuary information{" "}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </article>
      </div>
      <AttractionPracticalTip>
        <strong>Leave time for the basilica and views.</strong> Aim to arrive well before closing so
        you can see the interior, the terraces and the historic remains without rushing.
      </AttractionPracticalTip>
      <div
        className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5"
        data-testid="mount-tabor-visitor-essentials"
      >
        <h3 className="font-serif text-xl font-semibold">Useful things to know before visiting</h3>
        <ul className="mt-3 grid list-disc gap-x-6 gap-y-2 pl-5 text-sm leading-relaxed sm:grid-cols-2 sm:text-base">
          <li>
            <strong>Dress:</strong> Cover shoulders and knees in the basilica, which remains an
            active place of worship.
          </li>
          <li>
            <strong>Footwear:</strong> Comfortable shoes are useful on stone paths, terraces and
            uneven ground near historic remains.
          </li>
          <li>
            <strong>Accessibility:</strong> Some church and outdoor areas have steps. Ask the
            sanctuary about suitable access if your mobility is limited.
          </li>
          <li>
            <strong>Holiday closures:</strong> The Christian Information Center lists Christmas Day,
            1 January, Yom Kippur, Holy Week Thursday–Saturday and the weekend closest to the
            Orthodox Transfiguration feast in August.
          </li>
        </ul>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>
        Mount Tabor rises between <strong>Daburiyya</strong> and{" "}
        <strong>Shibli–Umm al-Ghanam</strong>, east of Nazareth. A narrow, winding road leads from
        the villages at the foot of the mountain to the basilica at the summit.
      </p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <CarFront className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="font-semibold">By car or with a driver</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              From Route 65, turn towards Daburiyya via Route 7266 or approach through Shibli.{" "}
              <strong>Private cars can use the narrow summit road</strong> when access is permitted,
              but large coaches cannot negotiate its sharp bends. Coach passengers generally
              transfer to local taxis at the Mount Tabor terminal below the summit.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <a
                href={churchDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Driving directions to the basilica
              </a>
              <a
                href={terminalDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Directions to Mount Tabor terminal
              </a>
            </div>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <BusFront className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="font-semibold">By public transport</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              Bus routes <strong>350 and 352</strong> serve{" "}
              <strong>Har Tabor Terminal (מסוף הר תבור)</strong> in the Shibli area, below the
              summit. From there, arrange a local taxi for the steep winding road to the basilica.
              Check the bus route, service frequency and return times in the{" "}
              <a
                href="https://bus.gov.il/en/home"
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                official public transport planner
              </a>
              . For several stops in one day, consider{" "}
              <Link to="/car-rental/" className={inlineLink}>
                renting a car
              </Link>
              , joining a{" "}
              <Link to="/tours/nazareth-sea-of-galilee/" className={inlineLink}>
                Galilee tour
              </Link>{" "}
              or{" "}
              <a href="#contact" className={inlineLink}>
                arranging a private driver
              </a>
              .
            </p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <Footprints className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="font-semibold">On foot around the summit</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              The <strong>black-marked summit circuit</strong> is about 2 km and takes approximately
              1–2 hours, passing woodland and old fortifications. Walking to the summit from the
              villages below is a much steeper climb.{" "}
              <a
                href={mountTaborSite.sources.trail}
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                See the official KKL-JNF trail guide.
              </a>
            </p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="mount-tabor-location-map">
          <h3 className="text-sm font-semibold">Where is Mount Tabor?</h3>
          <ConsentIframe
            title="Google Maps location of the Basilica of the Transfiguration on Mount Tabor"
            src={mapEmbed}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56"
          />
          <a
            href={mapLarger}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            View larger map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">A relaxed summit visit: 60–90 minutes</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>
            Explore the <strong>Church of the Transfiguration</strong>, especially the mosaic and
            crypt.
          </li>
          <li>
            Enjoy the <strong>views from the terraces</strong> around the basilica.
          </li>
          <li>
            Look for the historic gateway and the surviving medieval remains around the Franciscan
            compound.
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed">
          Add another 1–2 hours if you want to walk the summit trail.
        </p>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">
          A full-day Galilee and Nazareth itinerary
        </h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">
          I recommend choosing three to five stops, including Mount Tabor, depending on your
          starting point and how much time you spend at each.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>
            <strong>Nazareth:</strong> Combine Mount Tabor with the{" "}
            <Link to="/attractions/basilica-of-the-annunciation/" className={inlineLink}>
              Basilica of the Annunciation
            </Link>{" "}
            and{" "}
            <Link to="/attractions/mount-precipice/" className={inlineLink}>
              Mount Precipice
            </Link>
            .
          </li>
          <li>
            <strong>Jezreel Valley:</strong> Add{" "}
            <Link to="/attractions/tel-megiddo/" className={inlineLink}>
              Tel Megiddo
            </Link>{" "}
            if archaeology interests you.
          </li>
          <li>
            <strong>A longer northern day:</strong> Visit{" "}
            <Link to="/attractions/magdala/" className={inlineLink}>
              Magdala
            </Link>
            , the{" "}
            <Link to="/attractions/sea-of-galilee/" className={inlineLink}>
              Sea of Galilee
            </Link>{" "}
            or{" "}
            <Link to="/attractions/yardenit/" className={inlineLink}>
              Yardenit
            </Link>{" "}
            if your schedule allows.
          </li>
        </ul>
      </div>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>
        Christian tradition identifies Mount Tabor as the place where Jesus was transfigured before
        Peter, James and John, with Moses and Elijah beside him. The Gospels describe the event but{" "}
        <strong>do not name the mountain</strong>; the association with Mount Tabor developed in
        early Christian tradition.
      </p>
      <p>
        The summit was also fortified in antiquity and in the Crusader period. Remains of walls and
        medieval buildings can still be seen around the modern sanctuaries.
      </p>
      <p>
        The present Franciscan basilica was completed in 1924 to a design by Antonio Barluzzi, above
        the remains of earlier churches. Its distinctive architecture, mosaic and crypt reflect
        centuries of pilgrimage to the mountain.
      </p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>
        Mount Tabor combines well with Nazareth and other Galilee sites. Choose a guided tour that
        includes the Church of the Transfiguration at the summit.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          to="/tours/nazareth-sea-of-galilee/"
          className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4"
          data-testid="mount-tabor-galilee-tours-card"
        >
          <img
            src="/images/attractions/sea-of-galilee.webp"
            alt="Sea of Galilee landscape on a guided northern Israel day trip"
            width={128}
            height={100}
            loading="lazy"
            decoding="async"
            className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">
              Compare guided Galilee tours
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Explore tour options and check whether the Mount Tabor summit is included.
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Explore tours <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </Link>
        <a
          href="#contact"
          className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4"
          data-testid="mount-tabor-private-driver-card"
        >
          <img
            src={galileePhoto}
            alt="Green Galilee hills seen along a private day-trip route"
            width={128}
            height={100}
            loading="lazy"
            decoding="async"
            className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">
              Explore with a private driver
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Tell me where you will start and which Galilee stops matter most to you.
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    {
      q: "Can I drive to the summit of Mount Tabor?",
      a: "Private cars may drive up when permitted. Large coaches stop below the summit; passengers can continue by local taxi.",
    },
    {
      q: "What are the Church of the Transfiguration's opening hours?",
      a: "Monday–Friday 08:00–17:00; Saturday–Sunday 08:00–12:00 and 14:00–16:30, according to the Franciscan sanctuary. Confirm changes for services and holidays.",
    },
    {
      q: "Is Mount Tabor free to visit?",
      a: "Entry to Mount Tabor is free. Local taxi transport to the summit is charged separately.",
    },
    {
      q: "Can I visit the Greek Orthodox monastery?",
      a: "The monastery and its church are not normally open to casual sightseeing. Confirm any special visit directly with the monastery.",
    },
    {
      q: "How long should I spend on Mount Tabor?",
      a: "Allow about 60–90 minutes for the basilica and terraces, plus the journey up and down. Add 1–2 hours for the 2 km summit walking loop.",
    },
    {
      q: "Is Mount Tabor the same as the Mount of Beatitudes?",
      a: "No. Mount Tabor rises over the Jezreel Valley in Lower Galilee; the Mount of Beatitudes overlooks the Sea of Galilee.",
    },
    {
      q: "Did the Transfiguration definitely take place here?",
      a: "Christian tradition identifies Mount Tabor with the Transfiguration, but the Gospels do not name the mountain.",
    },
    {
      q: "Can I reach the church by public bus?",
      a: "Lines 350 and 352 serve Har Tabor Terminal near Shibli, below the summit. Arrange the final ascent by local taxi and check return bus times.",
    },
  ],
  nearby: [
    {
      label: "Basilica of the Annunciation",
      to: "/attractions/basilica-of-the-annunciation/",
      note: "Nazareth's major church and pilgrimage site.",
    },
    {
      label: "Mount Precipice",
      to: "/attractions/mount-precipice/",
      note: "Views over the Jezreel Valley near Nazareth.",
    },
    {
      label: "Tel Megiddo",
      to: "/attractions/tel-megiddo/",
      note: "Ancient settlements and archaeology in the valley.",
    },
    {
      label: "Magdala",
      to: "/attractions/magdala/",
      note: "First-century archaeology and lakeside chapels.",
    },
    {
      label: "Yardenit",
      to: "/attractions/yardenit/",
      note: "Jordan River baptism near the southern Sea of Galilee.",
    },
    {
      label: "Mount of Beatitudes",
      to: "/attractions/mount-of-beatitudes/",
      note: "Hilltop church, gardens and lake views.",
    },
  ],
  planningLinks: [
    {
      label: "Sea of Galilee travel guide",
      to: "/attractions/sea-of-galilee/",
      description: "Explore Tiberias and lakeside sites.",
      icon: "region",
    },
    {
      label: "7-day Israel itinerary",
      to: "/travel-blog/israel-itinerary-7-days/",
      description: "Make time for Nazareth and the Galilee.",
      icon: "itinerary",
    },
    {
      label: "10-day Israel itinerary",
      to: "/travel-blog/israel-itinerary-10-days/",
      description: "Explore northern Israel at a gentler pace.",
      icon: "itinerary",
    },
    {
      label: "Best time to visit Israel",
      to: "/travel-blog/best-time-to-visit-israel/",
      description: "Consider seasons and religious holidays.",
      icon: "seasons",
    },
    {
      label: "Getting around Israel",
      to: "/travel-blog/getting-around-israel/",
      description: "Compare buses, cars and private transport.",
      icon: "transport",
    },
    {
      label: "Ben Gurion Airport arrival tips",
      to: "/travel-blog/ben-gurion-airport-arrival-tips/",
      description: "Plan your arrival and onward travel.",
      icon: "arrival",
    },
  ],
  sources: [
    {
      label: "Christian Information Center — Mount Tabor visitor hours",
      url: mountTaborSite.sources.cic,
      note: "Visiting hours, last entry, telephone and special closures.",
    },
    {
      label: "Custody of the Holy Land — Basilica of the Transfiguration",
      url: mountTaborSite.sources.franciscan,
      note: "Official weekday and weekend hours, architecture, medieval remains and contact.",
    },
    {
      label: "Israel Nature and Parks Authority — Mount Tabor",
      url: mountTaborSite.sources.parks,
      note: "Free entry, church and monastery access, taxi transport and trails.",
    },
    {
      label: "KKL-JNF — Mount Tabor summit trail",
      url: mountTaborSite.sources.trail,
      note: "Road directions, the summit trail, Gate of the Wind and historic remains.",
    },
  ],
};

export function MountTaborAttractionPage() {
  return <AttractionDestinationPage content={mountTaborDestinationContent} />;
}
