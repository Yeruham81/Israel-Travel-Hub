import { ConsentIframe } from "@/components/ConsentIframe";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront } from "lucide-react";
import {
  AttractionContentImage,
  AttractionDestinationPage,
  AttractionHighlight,
  AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { capernaumSite } from "@/data/capernaumSite";
import galileePhoto from "@/assets/home/hero-galilee-sm.webp";

const visitSources = capernaumSite.sources;

const visitorAreas = [
  {
    name: "Archaeological site",
    details: (
      <>
        <strong>{capernaumSite.franciscan.fee}</strong> admission.{" "}
        <strong>{capernaumSite.franciscan.morning}</strong> (last entry{" "}
        {capernaumSite.franciscan.lastMorningEntry}) and{" "}
        <strong>{capernaumSite.franciscan.afternoon}</strong> (last entry{" "}
        {capernaumSite.franciscan.lastAfternoonEntry}). Holiday closures and shortened hours apply.
      </>
    ),
    source: "Christian Information Center",
    url: visitSources.franciscan,
  },
  {
    name: "Greek Orthodox monastery",
    details: (
      <>
        Visits <strong>by prior phone arrangement</strong> with the monastery's superior. Separate
        access and religious-service schedules.
      </>
    ),
    source: "Monastery visitor information",
    url: visitSources.orthodox,
  },
  {
    name: "National park & marine terminal",
    details: (
      <div className="space-y-2">
        <p>
          Admission is <strong>free, with no advance booking required</strong>.
        </p>
        <ul className="list-disc space-y-1 pl-4">
          <li>
            <strong>Sun–Thu & Saturday:</strong> {capernaumSite.park.regular}, year-round.
          </li>
          <li>
            <strong>Fridays and holiday eves:</strong> {capernaumSite.park.fridays}, year-round.
          </li>
          <li>
            <strong>Rosh Hashanah, Passover and Yom Kippur eves:</strong>{" "}
            {capernaumSite.park.specialHolidayEves}.
          </li>
        </ul>
        <p className="text-xs text-muted-foreground">Last admission is one hour before closing.</p>
      </div>
    ),
    source: "Parks Authority — official visitor hours",
    url: visitSources.parkHebrew,
  },
] as const;

/** Map shown in English, zoomed out enough to show Capernaum's place beside the Sea of Galilee.
 * The classic Google Maps iframe supports language selection without a project API key. */
const locationMapEmbed =
  "https://maps.google.com/maps?q=Capernaum%2C%20Sea%20of%20Galilee%2C%20Israel&hl=en&z=11&t=m&output=embed";
const locationMapLarger =
  "https://www.google.com/maps/search/?api=1&query=Capernaum%2C%20Israel&hl=en";

const page: AttractionDestinationContent = {
  path: "/attractions/capernaum/",
  placeName: "Capernaum",
  title: capernaumSite.title,
  region: capernaumSite.region,
  historyTitle: "History and biblical significance",
  relatedTitle: "Explore related sites",
  updatedAt: capernaumSite.updatedAt,
  contactIntroduction:
    "Tell me when you plan to visit, where you are starting and which Galilee sites interest you. I can arrange a private day trip with a driver including Capernaum.",
  hero: capernaumSite.hero,
  intro: capernaumSite.intro,
  facts: [
    {
      icon: "location",
      label: "Location",
      value: "Northern Sea of Galilee",
      note: "Near Route 87, east of Route 90",
    },
    {
      icon: "duration",
      label: "Time needed",
      value: "60–90 minutes",
      note: "At the archaeological site",
    },
    {
      icon: "admission",
      label: "Entry fee",
      value: capernaumSite.franciscan.fee,
      note: "Archaeological site",
    },
    {
      icon: "hours",
      label: "Opening hours",
      value: `${capernaumSite.franciscan.morning} / ${capernaumSite.franciscan.afternoon}`,
      note: "Last entry 11:40 / 16:30",
    },
    {
      icon: "highlights",
      label: "Highlights",
      value: "Synagogue & Peter's house",
      note: "Inside the archaeological site",
    },
    {
      icon: "access",
      label: "Getting there",
      value: "Car or organised tour",
      note: "Public transport is less convenient",
    },
  ],
  glanceNote: (
    <>
      The opening hours and entry fee above apply to the <strong>archaeological site</strong>. For
      the Orthodox monastery and national park, see the{" "}
      <a href="#visitor-info" className="font-semibold text-primary underline underline-offset-4">
        visitor information below
      </a>
      .
    </>
  ),
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight
        title="The ancient synagogue"
        image={{
          src: "/images/attractions/capernaum-synagogue-aerial.webp",
          alt: "Aerial close-up of Capernaum’s limestone synagogue surrounded by basalt village remains",
        }}
      >
        <p>
          White limestone columns and carved details stand out against the darker basalt of the
          village. This is the best-known archaeological landmark at Capernaum.
        </p>
        <p>
          The synagogue visible today is generally dated to the fifth century, much later than the
          time of Jesus. Remains of earlier buildings lie beneath the synagogue.
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The traditional House of Peter"
        image={{
          src: "/images/attractions/capernaum-peters-house.webp",
          alt: "Basalt dwelling remains and the elevated modern memorial above the traditional House of Peter at Capernaum",
        }}
      >
        <p>
          Excavated rooms near the synagogue are traditionally associated with the apostle Peter.
          Christian worship developed here over centuries, and a Byzantine octagonal church later
          enclosed part of the earlier site.
        </p>
        <p>
          The modern memorial church rises above the excavations, allowing visitors to see the
          remains below. Christian tradition identifies these remains as Peter's home, although this
          has not been established archaeologically.
        </p>
      </AttractionHighlight>
      <AttractionHighlight title="The basalt houses of the old village">
        <p>
          Take a few minutes to explore the low stone walls and courtyards between the main
          monuments. The remains of ancient homes reveal how the lakeside village was laid out.
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The Greek Orthodox Church of the Twelve Apostles"
        image={{
          src: "/images/attractions/capernaum-orthodox-church.webp",
          alt: "Greek Orthodox Church of the Twelve Apostles in Capernaum with bright red domes and crosses",
        }}
      >
        <p>
          The neighbouring Greek Orthodox monastery is recognisable by its red-domed church and
          peaceful grounds.
        </p>
        <p>
          <strong>Visits must be arranged in advance</strong> with the monastery.
        </p>
      </AttractionHighlight>
      <AttractionHighlight title="The national park and the lakeshore">
        <p>
          Kfar Nahum National Park offers a lakeside visitor area and marine terminal. Access to the
          terminal area is free without advance booking.
        </p>
        <p>
          Swimming is not permitted within the national park. Check signs on site and enjoy the
          views from the shore instead.
        </p>
      </AttractionHighlight>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-4">
      <p>
        Known in Hebrew as Kfar Nahum (“village of Nahum”), Capernaum was a lakeside Jewish
        settlement during the Roman period. The New Testament describes Jesus teaching and healing
        here, including events associated with the synagogue and Peter's house (Mark 1:21–31).
      </p>
      <div className="grid gap-4 rounded-xl border bg-secondary/20 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,220px)] sm:items-start sm:p-5 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <h3 className="font-serif text-xl font-semibold">How the site changed over time</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
            <li>
              <strong>Roman period:</strong> A village of basalt houses stood beside the lake.
            </li>
            <li>
              <strong>Early Christian period:</strong> One domestic complex became a place of
              veneration according to the archaeological interpretation.
            </li>
            <li>
              <strong>Byzantine period:</strong> The monumental limestone synagogue and an octagonal
              church reflect later religious life.
            </li>
            <li>
              <strong>Today:</strong> Visitors can compare the excavated layers with the modern
              memorial built over the traditional House of Peter.
            </li>
          </ul>
        </div>
        <AttractionContentImage
          src="/images/attractions/capernaum-peter-memorial-interior.webp"
          alt="Archaeological rooms visible through the floor of the modern memorial above Peter's traditional house"
        />
      </div>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>
        Compare opening hours, admission and booking requirements for the three visitor areas below.
      </p>

      <div
        role="region"
        aria-label="Visitor information comparison"
        tabIndex={0}
        className="max-w-full overflow-x-auto rounded-xl border focus-visible:outline-2 focus-visible:outline-primary"
      >
        <table
          className="w-full min-w-[700px] border-collapse text-left text-sm"
          data-testid="capernaum-visitor-table"
        >
          <thead className="bg-secondary/70">
            <tr>
              <th scope="col" className="w-[26%] px-4 py-3 font-bold">
                Visitor area
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Admission and visiting rules
              </th>
              <th scope="col" className="w-[26%] px-4 py-3 font-bold">
                Official information
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {visitorAreas.map((site) => (
              <tr key={site.name}>
                <th scope="row" className="px-4 py-3 align-top font-semibold">
                  {site.name}
                </th>
                <td className="px-4 py-3 align-top leading-relaxed">{site.details}</td>
                <td className="px-4 py-3 align-top">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline underline-offset-4"
                  >
                    {site.source}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AttractionPracticalTip>
        <strong>Plan around the midday break.</strong> I recommend visiting the archaeological site
        in the morning or after 14:00. Its gates close from 12:00 to 14:00, so arriving at lunchtime
        can disrupt the rest of your Galilee itinerary.
      </AttractionPracticalTip>
      <AttractionPracticalTip>
        <strong>
          Check Christian and{" "}
          <Link
            to="/travel-blog/calendar-of-events/"
            className="font-semibold text-primary underline underline-offset-4"
          >
            Jewish holiday observances
          </Link>
          .
        </strong>{" "}
        The archaeological site is closed on Christmas Day, New Year's Day, Easter Sunday and Yom
        Kippur, with reduced hours on certain other religious dates. Verify the official schedule
        shortly before travelling.
      </AttractionPracticalTip>
      <div
        className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5"
        data-testid="capernaum-visitor-facilities"
      >
        <h3 className="font-serif text-xl font-semibold">Facilities and visitor essentials</h3>
        <p className="mt-2 text-sm leading-relaxed">
          The following facilities are available within the <strong>national park</strong>.
        </p>
        <div
          className="mt-3 grid gap-x-5 gap-y-1 sm:grid-cols-2"
          data-testid="capernaum-facilities-columns"
        >
          <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed sm:text-base">
            <li>
              <strong>Parking:</strong> Parking near the entrance, with a paved accessible path.
            </li>
            <li>
              <strong>Restrooms and drinking water:</strong> Toilets and water fountains, including
              accessible facilities.
            </li>
            <li>
              <strong>Shade and seating:</strong> Shaded seating overlooking the lake.
            </li>
          </ul>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed sm:text-base">
            <li>
              <strong>Accessibility:</strong> Accessible entrances and surfaced paths within the
              park. Check access to the separate archaeological and church grounds directly.
            </li>
            <li>
              <strong>Refreshments:</strong> Accessible café and restaurant facilities with variable
              opening hours.
            </li>
            <li>
              <strong>Useful contacts:</strong> Archaeological site{" "}
              <a
                href={`tel:${capernaumSite.franciscan.phoneHref}`}
                className="inline-block whitespace-nowrap font-semibold text-primary underline underline-offset-4"
                dir="ltr"
              >
                {capernaumSite.franciscan.phone}
              </a>
              ; national park{" "}
              <a
                href={`tel:${capernaumSite.park.phoneHref}`}
                className="inline-block whitespace-nowrap font-semibold text-primary underline underline-offset-4"
                dir="ltr"
              >
                {capernaumSite.park.phone}
              </a>
              .
            </li>
          </ul>
        </div>
      </div>
      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
        <li>
          <strong>Clothing:</strong> Choose respectful dress for churches and sacred spaces.
        </li>
        <li>
          <strong>Comfort:</strong> Wear shoes suitable for uneven stones; bring drinking water and
          sun protection.
        </li>
        <li>
          <strong>Orthodox monastery:</strong> Arrange a visit with the superior by phone at{" "}
          <a
            href="tel:+972532840991"
            className="inline-block whitespace-nowrap font-semibold text-primary underline underline-offset-4"
            dir="ltr"
          >
            053-2840991
          </a>
          .
        </li>
      </ul>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>
        Capernaum is on the <strong>northwestern shore of the Sea of Galilee</strong>, northeast of
        Tiberias.
      </p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <CarFront className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="font-semibold">By car or with a driver</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              From Route 90, turn east onto <strong>Route 87</strong> and follow signs to Capernaum
              (about 4 km from the junction). The site can also be approached from Route 92 along
              the eastern side of the lake. Use Google Maps to navigate to the entrance of the site
              you wish to visit.
            </p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <BusFront className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="font-semibold">By public transport</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              Bus services are infrequent, and the entrance requires a walk from the bus stop.{" "}
              <strong>I recommend a car, taxi, or prearranged group or private tour</strong> for an
              easier visit, especially when combining several lakeside sites.
            </p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="capernaum-location-map">
          <h3 className="text-sm font-semibold">Where is Capernaum?</h3>
          <ConsentIframe
            title="Map of Capernaum on the northern shore of the Sea of Galilee"
            src={locationMapEmbed}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56"
          />
          <a
            href={locationMapLarger}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary underline-offset-4 hover:underline"
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
        <h3 className="font-serif text-xl font-semibold">A short visit: 60–90 minutes</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>
            Start with the <strong>white limestone synagogue</strong> and its carved details.
          </li>
          <li>
            Continue to the <strong>traditional House of Peter</strong> and look towards the remains
            beneath the modern memorial.
          </li>
          <li>
            Walk past the <strong>basalt village foundations</strong> and enjoy the lakeside
            setting.
          </li>
        </ul>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">
          A full-day Galilee and Sea of Galilee trip
        </h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">
          A day trip can start in <strong>Tel Aviv</strong> or <strong>Jerusalem</strong>, or be
          arranged as a <strong>shore excursion from Haifa Port</strong>. Include Capernaum and
          choose other stops to suit your interests, available time and departure point:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>
            <strong>Northern lakeshore:</strong>{" "}
            <Link
              to="/attractions/tabgha/"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Tabgha
            </Link>
            , the{" "}
            <Link
              to="/attractions/mount-of-beatitudes/"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Mount of Beatitudes
            </Link>{" "}
            and{" "}
            <Link
              to="/attractions/magdala/"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Magdala
            </Link>
            .
          </li>
          <li>
            <strong>Galilee towns and the Jordan River:</strong>{" "}
            <Link
              to="/attractions/basilica-of-the-annunciation/"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Nazareth’s Basilica of the Annunciation
            </Link>
            ,{" "}
            <Link
              to="/attractions/sea-of-galilee/"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Tiberias and the Sea of Galilee
            </Link>
            , and{" "}
            <Link
              to="/attractions/yardenit/"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Yardenit
            </Link>
            .
          </li>
          <li>
            <strong>Lower Galilee:</strong>{" "}
            <Link
              to="/attractions/mount-tabor/"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Mount Tabor
            </Link>
            .
          </li>
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          I recommend visiting three to five sites, including Capernaum. Plan your day around your
          starting point, opening hours and driving times. If you're joining a shore excursion,
          allow enough time to return to Haifa Port.
        </p>
      </div>
      <figure className="overflow-hidden rounded-xl border bg-card">
        <img
          src="/images/attractions/capernaum-aerial-overview.webp"
          alt="Aerial view of the archaeological compound, shoreline and Sea of Galilee at Capernaum"
          loading="lazy"
          decoding="async"
          width={1100}
          height={714}
          className="h-52 w-full object-cover object-center sm:h-64"
        />
      </figure>
      <AttractionPracticalTip>
        <strong>A relaxing break by the lake.</strong> The national park's shaded seating areas
        offer a pleasant spot for a short break overlooking the Sea of Galilee. Bring a light snack
        before continuing to Tabgha or the Mount of Beatitudes. Swimming and lighting fires are
        prohibited in the national park; please take your litter with you.
      </AttractionPracticalTip>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>
        Galilee day tours may include Capernaum alongside Nazareth, Tabgha or the Mount of
        Beatitudes. Choose a tour that <strong>includes Capernaum</strong>, and compare departure
        points, visiting time, guiding languages and admission arrangements.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          to="/tours/nazareth-sea-of-galilee/"
          className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4"
          data-testid="capernaum-galilee-tours-card"
        >
          <img
            src="/images/attractions/sea-of-galilee.webp"
            alt="Sea of Galilee landscape representing guided visits around its northern shore"
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
              Browse local and full-day options. Check which stops are included and compare prices
              on the tour pages.
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Explore tours <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </Link>
        <a
          href="#contact"
          className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4"
          data-testid="capernaum-private-driver-card"
        >
          <img
            src={galileePhoto}
            alt="Green hills above the Sea of Galilee on a northern Israel day-trip route"
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
              Message me to arrange a private day trip from Jerusalem or Tel Aviv, or a shore
              excursion from Haifa Port, with stops tailored to your group.
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
      q: "Are Capernaum and Kfar Nahum the same place?",
      a: "Yes. Kfar Nahum is the Hebrew name of Capernaum, on the northwestern shore of the Sea of Galilee.",
    },
    {
      q: "Do I need to book admission to the archaeological site?",
      a: "Individual visitors can usually buy their admission tickets at the entrance to the Franciscan archaeological site. Check current holiday and group rules with the Christian Information Center before arriving.",
    },
    {
      q: "Is one ticket valid for all parts of Capernaum?",
      a: "No. The Franciscan ruins, Orthodox monastery and national park visitor area are separately managed. The monastery asks for advance phone arrangements.",
    },
    {
      q: "Is the synagogue standing today from the time of Jesus?",
      a: "No. The white limestone synagogue dates mainly to the fifth century and stands above the remains of earlier buildings.",
    },
    {
      q: "Can I combine Capernaum with Nazareth in one day?",
      a: "Yes, if you have a vehicle or suitable prearranged tour. Capernaum combines naturally with Tabgha and the Mount of Beatitudes; Allow extra time for the drive to Nazareth and sightseeing there.",
    },
    {
      q: "Is a public bus a convenient way to visit?",
      a: "Usually not. Some connections are possible, but stops can be far from the entrance and buses are not frequent. A car, taxi or organised day trip is generally simpler.",
    },
    {
      q: "Is the visit suitable for people with limited mobility?",
      a: "The visitor areas have different surfaces and accessibility arrangements. The ancient basalt stone paths can be uneven. Contact the site directly for wheelchair access information.",
    },
  ],
  nearby: [
    {
      label: "Tabgha",
      to: "/attractions/tabgha/",
      note: "Lakeside churches, mosaics and early Christian traditions.",
    },
    {
      label: "Mount of Beatitudes",
      to: "/attractions/mount-of-beatitudes/",
      note: "Hilltop church and broad views over the Sea of Galilee.",
    },
    {
      label: "Magdala",
      to: "/attractions/magdala/",
      note: "A first-century synagogue and archaeological heritage on the western shore.",
    },
    {
      label: "Yardenit",
      to: "/attractions/yardenit/",
      note: "Jordan River baptism site often included on longer Galilee days.",
    },
    {
      label: "Basilica of the Annunciation",
      to: "/attractions/basilica-of-the-annunciation/",
      note: "An important Christian pilgrimage landmark in Nazareth.",
    },
    {
      label: "Mount Tabor",
      to: "/attractions/mount-tabor/",
      note: "The Transfiguration church and scenic Lower Galilee viewpoints.",
    },
  ],
  planningLinks: [
    {
      label: "Sea of Galilee travel guide",
      to: "/attractions/sea-of-galilee/",
      description: "Places to see around the lake.",
      icon: "region",
    },
    {
      label: "7-day Israel itinerary",
      to: "/travel-blog/israel-itinerary-7-days/",
      description: "Plan a balanced week.",
      icon: "itinerary",
    },
    {
      label: "10-day Israel itinerary",
      to: "/travel-blog/israel-itinerary-10-days/",
      description: "Explore more without rushing.",
      icon: "itinerary",
    },
    {
      label: "Best time to visit Israel",
      to: "/travel-blog/best-time-to-visit-israel/",
      description: "Weather, seasons and holidays.",
      icon: "seasons",
    },
    {
      label: "Getting around Israel",
      to: "/travel-blog/getting-around-israel/",
      description: "Trains, buses, taxis and driving.",
      icon: "transport",
    },
    {
      label: "Arrival tips at Ben Gurion Airport",
      to: "/travel-blog/ben-gurion-airport-arrival-tips/",
      description: "Practical first steps on arrival.",
      icon: "arrival",
    },
  ],
  sources: [
    {
      label: "Israel Nature and Parks Authority - Hebrew visitor information",
      url: visitSources.parkHebrew,
      note: "Official notice about free marine-terminal access and national-park visitor rules.",
    },
    {
      label: "Christian Information Center - Capernaum entrance and opening hours",
      url: visitSources.franciscan,
      note: "Franciscan compound: published entrance fee, last-admission times and holiday exceptions.",
    },
    {
      label: "Custody of the Holy Land - Capernaum archaeology and history",
      url: visitSources.archaeology,
      note: "Historical background, excavation history, synagogue dating and traditional Peter's house.",
    },
    {
      label: "Greek Orthodox Monastery of the Twelve Apostles - visitor arrangements",
      url: visitSources.orthodox,
      note: "Official advance-contact requirement and monastery details.",
    },
    {
      label: "Israel Nature and Parks Authority - Kfar Nahum National Park",
      url: visitSources.park,
      note: "Separate visitor area, marine terminal, accessibility information, navigation and park rules.",
    },
  ],
};

export function CapernaumAttractionPage() {
  return <AttractionDestinationPage content={page} />;
}

export { page as capernaumDestinationContent };
