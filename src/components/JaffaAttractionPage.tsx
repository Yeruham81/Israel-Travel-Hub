import { ConsentIframe } from "@/components/ConsentIframe";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Clock3, Footprints, TrainFront } from "lucide-react";
import {
  AttractionDestinationPage,
  AttractionHighlight,
  AttractionContentImage,
  AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { jaffaSite } from "@/data/jaffaSite";
import { JaffaAttractionsMap } from "@/components/JaffaAttractionsMap";
import { ExternalTourCard } from "@/components/TourCatalog";
import { tourProducts } from "@/data/registry";

const official = jaffaSite.official;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const photos = {
  clock: "/images/attractions/jaffa-clock-tower.webp",
  mosque: "/images/attractions/jaffa-mahmoudiya-mosque.webp",
  square: "/images/attractions/jaffa-kedumim-square.webp",
  church: "/images/attractions/jaffa-st-peters-church.webp",
  alleys: "/images/attractions/jaffa-zodiac-alleys.webp",
  garden: "/images/attractions/jaffa-summit-garden.webp",
  port: "/images/attractions/jaffa-port.webp",
  market: "/images/attractions/jaffa-flea-market.webp",
  museum: "/images/attractions/jaffa-ilana-goor-museum.webp",
  nalagaat: "/images/attractions/jaffa-nalagaat-center.webp",
  food: "/images/attractions/jaffa-food.webp",
} as const;
const clockDirections =
  "https://www.google.com/maps/dir/?api=1&destination=Jaffa%20Clock%20Tower%2C%20Tel%20Aviv-Yafo%2C%20Israel&travelmode=walking";
/** Three ordered waypoints per route work on both mobile and desktop Google Maps. */
const shortWalkMapUrl =
  "https://www.google.com/maps/dir/?api=1&origin=Jaffa%20Clock%20Tower%2C%20Tel%20Aviv-Yafo%2C%20Israel&destination=Jaffa%20Port%2C%20Tel%20Aviv-Yafo%2C%20Israel&travelmode=walking&waypoints=HaPisga%20Garden%2C%20Old%20Jaffa%2C%20Israel%7CKedumim%20Square%2C%20Tel%20Aviv-Yafo%2C%20Israel%7CMazal%20Dagim%20Street%2C%20Old%20Jaffa%2C%20Israel";
const halfDayWalkMapUrl =
  "https://www.google.com/maps/dir/?api=1&origin=Jaffa%20Flea%20Market%2C%20Tel%20Aviv-Yafo%2C%20Israel&destination=Jaffa%20Port%2C%20Tel%20Aviv-Yafo%2C%20Israel&travelmode=walking&waypoints=Jaffa%20Clock%20Tower%2C%20Tel%20Aviv-Yafo%2C%20Israel%7CHaPisga%20Garden%2C%20Old%20Jaffa%2C%20Israel%7CKedumim%20Square%2C%20Tel%20Aviv-Yafo%2C%20Israel";
const gentleWalkMapUrl =
  "https://www.google.com/maps/dir/?api=1&origin=Jaffa%20Port%2C%20Tel%20Aviv-Yafo%2C%20Israel&destination=Jaffa%20Flea%20Market%2C%20Tel%20Aviv-Yafo%2C%20Israel&travelmode=walking&waypoints=Jaffa%20Clock%20Tower%2C%20Tel%20Aviv-Yafo%2C%20Israel";
const jaffaTours = ["old-jaffa-walk", "tel-aviv-jaffa-small-group", "jaffa-carmel-walk"].map((id) =>
  tourProducts.find((tour) => tour.id === id)!,
);

export const jaffaDestinationContent: AttractionDestinationContent = {
  path: "/attractions/jaffa/",
  placeName: "Jaffa",
  title: jaffaSite.title,
  heroTitle: "Old Jaffa: Attractions & Walking Guide",
  highlightsTitle: "What to see in Jaffa",
  region: jaffaSite.region,
  updatedAt: jaffaSite.updatedAt,
  hero: jaffaSite.hero,
  intro: jaffaSite.intro,
  itineraryFirst: true,
  itineraryBeforeHighlights: true,
  itineraryTitle: "Suggested walking routes in Jaffa",
  visitorTitle: "Visiting Jaffa: entrance, hours and accessibility",
  visitorNavLabel: "Visitor essentials",
  historyTitle: "Jaffa's history and cultural heritage",
  relatedTitle: "Explore Tel Aviv further",
  navigationSections: [
    ["visit-plan", "Walking routes & map"],
    ["highlights", "What to see"],
    ["visitor-info", "Hours & admission"],
    ["getting-there", "Getting there"],
    ["food", "Food & cafés"],
    ["practical", "Practical tips"],
    ["history", "History"],
    ["tours", "Guided tours"],
    ["faq", "Questions"],
    ["nearby", "Explore Tel Aviv"],
    ["trip-planning", "Plan your trip"],
    ["contact", "Contact me"],
  ],
  contactIntroduction:
    "Tell me your date, pickup point, group size and the places you would like to see in Tel Aviv or Jaffa. I can arrange a private transfer or a sightseeing day with a driver.",
  facts: [
    {
      icon: "location",
      label: "Location",
      value: "South Tel Aviv–Yafo",
      note: "Historic hill, harbour and surrounding streets",
    },
    {
      icon: "duration",
      label: "Time needed",
      value: "2–5 hours",
      note: "Choose a short walk or relaxed half-day",
    },
    {
      icon: "admission",
      label: "Public areas",
      value: "Free to explore",
      note: "Museums and performances charge separately",
    },
    {
      icon: "highlights",
      label: "Best for",
      value: "History, markets & coast",
      note: "Churches, galleries, viewpoints and food",
    },
    {
      icon: "access",
      label: "Getting around",
      value: "Mostly on foot",
      note: "Some hills, steps and uneven paving",
    },
    {
      icon: "hours",
      label: "When to visit",
      value: "Daytime or sunset",
      note: "Individual businesses have their own hours",
    },
  ],
  glanceNote: (
    <>
      I suggest combining the old town, its hilltop viewpoints and the port in one walk. Add the
      flea market or a museum when you have more time, and leave room for a relaxed meal.
    </>
  ),
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight
        mobileImageFirst
        title="Clock Tower Square"
        image={{
          src: photos.clock,
          alt: "The Ottoman Clock Tower at the entrance to historic Jaffa",
        }}
      >
        <p>
          I recommend starting your walk at Jaffa's Ottoman-era Clock Tower, built around 1902–1903.
          The square links the old town, harbour and flea-market streets.
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        mobileImageFirst
        title="Mahmoudiya Mosque"
        image={{
          src: photos.mosque,
          alt: "Historic stone architecture of the Mahmoudiya Mosque in Jaffa",
        }}
      >
        <p>
          Mahmoudiya Mosque is one of Jaffa's most important Ottoman landmarks, recognised by its
          minaret and decorated entrances. Admire the mosque's exterior and respect local customs
          and prayer times.
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        mobileImageFirst
        title="Kedumim Square"
        image={{ src: photos.square, alt: "Kedumim Square on Old Jaffa's historic hill" }}
      >
        <p>
          The hilltop square sits beside galleries, historic lanes and sea-facing viewpoints. The
          Visitors Center beneath it has presented Jaffa's archaeological history; check the{" "}
          <a
            href={official.oldJaffa}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            Old Jaffa website (Hebrew)
          </a>{" "}
          for current visitor activities.
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        mobileImageFirst
        title="St. Peter's Church"
        image={{ src: photos.church, alt: "St. Peter's Church overlooking Jaffa's harbour" }}
      >
        <p>
          St. Peter's Church is a Franciscan landmark associated with Christian traditions about
          Peter in Joppa. It is an active church; dress respectfully and check{" "}
          <a
            href={official.church}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            visiting arrangements (Hebrew)
          </a>{" "}
          around services and holidays.
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        mobileImageFirst
        title="Zodiac Alleys and artists' galleries"
        image={{
          src: photos.alleys,
          alt: "Narrow historic stone alleyway in the artists' quarter of Old Jaffa",
        }}
      >
        <p>
          Take a leisurely stroll through the winding alleys named after the signs of the zodiac.
          You will find restored stone buildings, studios, small art galleries and quiet corners
          between the busier squares.
        </p>
        <p>
          Explore several adjoining lanes to discover the artists’ quarter; comfortable shoes help
          on steps and uneven historic paving.
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        mobileImageFirst
        title="Summit Garden and Wishing Bridge"
        image={{
          src: photos.garden,
          alt: "The wooden Wishing Bridge leads into the green slopes of Gan HaPisga in Old Jaffa",
        }}
      >
        <p>
          Summit Garden (Gan HaPisga, also called Abrasha Park) offers one of the best views north
          towards Tel Aviv's coastline. Explore the garden's sculptures and open spaces, and visit
          the nearby Wishing Bridge.
        </p>
        <p>
          The bridge has bronze plaques depicting the twelve zodiac signs. Local tradition invites
          visitors to touch their own sign, look towards the sea and make a wish. I particularly
          like the view from the garden in the late afternoon.
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        mobileImageFirst
        title="Jaffa Port and the waterfront"
        image={{
          src: photos.port,
          alt: "Fishing boats and waterfront buildings around Jaffa Port",
        }}
      >
        <p>
          Jaffa's historic harbour is home to fishing boats and waterfront restaurants. Enjoy a
          stroll along the harbour with its open views of the Mediterranean.
        </p>
        <p>
          Look towards the offshore rocks associated with the legend of Andromeda, or spend time by
          the waterfront before a meal. Ask local boat operators about available trips.
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        mobileImageFirst
        title="Flea Market and Greek Market streets"
        image={{
          src: photos.market,
          alt: "Antique shops and outdoor stalls in the Jaffa Flea Market area",
        }}
      >
        <p>
          Jaffa's flea-market district lies southeast of the Clock Tower. Browse antique stalls,
          vintage shops and designer boutiques, and enjoy the cafés and restaurants around the flea
          market and nearby Greek Market.
        </p>
        <p>
          Visit during the day when the market stalls and shops are open. The{" "}
          <a href="#visitor-info" className={inlineLink}>
            visitor table
          </a>{" "}
          lists typical market hours, with a link to the{" "}
          <a
            href={official.fleaMarketHours}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            market website
          </a>{" "}
          for updates.
        </p>
      </AttractionHighlight>
      <AttractionPracticalTip>
        For a first-time visit, I would prioritise the hilltop old town, Summit Garden, the port and
        either the flea market or a museum according to your interests. Allow time to enjoy a coffee
        or meal along the way.
      </AttractionPracticalTip>
      <h3 className="pt-3 font-serif text-xl font-semibold">More cultural experiences in Jaffa</h3>
      <AttractionHighlight
        mobileImageFirst
        title="Ilana Goor Museum and local art"
        image={{
          src: photos.museum,
          alt: "Historic stone building of the Ilana Goor Museum in Old Jaffa",
          position: "38% center",
        }}
      >
        <p>
          The{" "}
          <a
            href={official.museum}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            Ilana Goor Museum
          </a>
          , at 4 Mazal Dagim Street, combines an eclectic art collection with a historic building
          and sea views. See the{" "}
          <a href="#visitor-info" className={inlineLink}>
            visitor table
          </a>{" "}
          for published hours, adult admission and official discounts.
        </p>
        <p>
          Other small galleries and studios are scattered throughout the old town. The{" "}
          <a
            href={official.uriGeller}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            Uri Geller Museum
          </a>{" "}
          at 7 Mazal Arieh Street offers guided group or private visits. Make an{" "}
          <strong>advance reservation</strong> and check age guidance when booking.
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        mobileImageFirst
        title="Na Laga'at Center"
        image={{
          src: photos.nalagaat,
          alt: "Na Laga'at cultural center at the Jaffa Port complex",
        }}
      >
        <p>
          The{" "}
          <a
            href={official.nalagaat}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            Na Laga'at Center
          </a>{" "}
          near Jaffa Port presents accessible cultural experiences, including theatre, workshops and
          dining in darkness at the BlackOut restaurant.
        </p>
        <p>Book a performance, workshop or dinner in advance.</p>
      </AttractionHighlight>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <p>
        Jaffa is especially rewarding on foot. Choose a highlights walk or a relaxed half-day, and
        add cultural stops to suit your interests.
      </p>
      <div className="grid gap-3 md:grid-cols-2" data-testid="jaffa-walking-routes">
        <article className="rounded-xl border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <Footprints className="h-5 w-5 text-primary" />
            <h3 className="font-serif text-xl font-semibold">A short walk — around 2–3 hours</h3>
          </div>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
            <li>Start at Clock Tower Square and Mahmoudiya Mosque.</li>
            <li>Climb to Summit Garden and the Wishing Bridge.</li>
            <li>Continue to Kedumim Square and St. Peter’s Church.</li>
            <li>Wander the zodiac alleys and galleries.</li>
            <li>Finish at Jaffa Port.</li>
          </ol>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">
            This is a good first-time route focused on the old town and waterfront.
          </p>
          <a
            href={shortWalkMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4"
          >
            Open short walking route in Google Maps{" "}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </article>
        <article className="rounded-xl border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <Clock3 className="h-5 w-5 text-primary" />
            <h3 className="font-serif text-xl font-semibold">
              A relaxed half-day — around 4–5 hours
            </h3>
          </div>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
            <li>Begin at the Flea Market during trading hours.</li>
            <li>Continue via Clock Tower Square.</li>
            <li>Visit Summit Garden and the Wishing Bridge.</li>
            <li>Explore Kedumim Square and St. Peter’s Church.</li>
            <li>Browse the zodiac alleys, adding an art stop if desired.</li>
            <li>Finish at the port for a meal.</li>
          </ol>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">
            Art lovers can add the{" "}
            <a
              href={official.museum}
              target="_blank"
              rel="noopener noreferrer"
              className={inlineLink}
            >
              Ilana Goor Museum
            </a>
            .
          </p>
          <a
            href={halfDayWalkMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4"
          >
            Open half-day walking route in Google Maps{" "}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </article>
      </div>
      <JaffaAttractionsMap />
      <article
        className="rounded-xl border bg-secondary/20 p-4 sm:p-5"
        data-testid="jaffa-gentler-walk"
      >
        <h3 className="font-serif text-xl font-semibold">
          A gentler option — waterfront and flea market
        </h3>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">
          Walk from Jaffa Port towards Clock Tower Square and the flea-market streets. This
          lower-Jaffa route avoids many of the hilltop steps. If you need step-free access, check
          crossings, paving and the entrances to the places you plan to visit.
        </p>
        <a
          href={gentleWalkMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4"
        >
          Open waterfront and market route in Google Maps{" "}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </article>
      <p>
        Explore adjoining stone lanes between the route stops. You can also approach Jaffa from Tel
        Aviv along the seafront. For a local overview, use the{" "}
        <a
          href={official.municipalWalkMapShort}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          official Old Jaffa walking map (Hebrew PDF)
        </a>
        ; the city also offers a{" "}
        <a
          href={official.municipalWalkingMap}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          full illustrated walking booklet (Hebrew PDF)
        </a>{" "}
        and{" "}
        <a
          href={official.municipalWalkingGuide}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          route descriptions (Hebrew)
        </a>
        .
      </p>
      <AttractionPracticalTip>
        For late-afternoon photographs, allow time for a coastal viewpoint near sunset.
      </AttractionPracticalTip>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>
        Jaffa is a historic port city and part of modern Tel Aviv–Yafo. Its old streets, public
        viewpoints, gardens and harbour can be explored without an admission ticket. Museums,
        cultural performances and optional tours set their own prices and opening schedules.
      </p>
      <div
        role="region"
        aria-label="Jaffa opening hours and admission table"
        tabIndex={0}
        className="max-w-full overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary"
        data-testid="jaffa-hours-admission-table"
      >
        <table className="w-full min-w-[810px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Typical opening hours, prices and admission arrangements for Jaffa attractions
          </caption>
          <thead className="bg-secondary/60">
            <tr>
              {["Site", "Opening hours", "Admission", "Booking and access"].map(
                (heading, index) => (
                  <th
                    key={heading}
                    scope="col"
                    className={
                      index === 0
                        ? "sticky left-0 z-10 border-b bg-secondary px-3 py-3 font-semibold"
                        : "border-b px-3 py-3 font-semibold"
                    }
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold"
              >
                Old Jaffa streets, Clock Tower and Summit Garden
              </th>
              <td className="px-3 py-3 align-top">Public outdoor areas throughout the day</td>
              <td className="px-3 py-3 align-top">Free</td>
              <td className="px-3 py-3 align-top">Historic steps, slopes and stone paving</td>
            </tr>
            <tr className="border-b">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold"
              >
                Jaffa Port waterfront
              </th>
              <td className="px-3 py-3 align-top">Public quays throughout the day</td>
              <td className="px-3 py-3 align-top">Free</td>
              <td className="px-3 py-3 align-top">
                Restaurants and activities set individual schedules
              </td>
            </tr>
            <tr className="border-b">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold"
              >
                Jaffa Flea Market
              </th>
              <td className="px-3 py-3 align-top">
                Sun–Thu 09:00–17:00; Fri 09:00–14:00; stalls closed Saturday
              </td>
              <td className="px-3 py-3 align-top">Free to browse</td>
              <td className="px-3 py-3 align-top">
                <a
                  href={official.fleaMarketHours}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={inlineLink}
                >
                  Market information
                </a>
                ; cafés may differ
              </td>
            </tr>
            <tr className="border-b">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold"
              >
                St. Peter's Church
              </th>
              <td className="px-3 py-3 align-top">Access depends on services</td>
              <td className="px-3 py-3 align-top">Free when open for visitors</td>
              <td className="px-3 py-3 align-top">
                <a
                  href={official.church}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={inlineLink}
                >
                  Church visitor information
                </a>
              </td>
            </tr>
            <tr className="border-b">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold"
              >
                Ilana Goor Museum
              </th>
              <td className="px-3 py-3 align-top">Sun–Thu & Sat 10:00–16:00; Fri 10:00–14:00</td>
              <td className="px-3 py-3 align-top">₪45 adult</td>
              <td className="px-3 py-3 align-top">
                <a
                  href={official.museum}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={inlineLink}
                >
                  Museum admission, discounts and updates
                </a>
              </td>
            </tr>
            <tr className="border-b">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold"
              >
                Uri Geller Museum
              </th>
              <td className="px-3 py-3 align-top">Advance reservations</td>
              <td className="px-3 py-3 align-top">By booked visit</td>
              <td className="px-3 py-3 align-top">
                <a
                  href={official.uriGeller}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={inlineLink}
                >
                  Arrange guided visit
                </a>
              </td>
            </tr>
            <tr className="border-b">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold"
              >
                Na Laga'at Center
              </th>
              <td className="px-3 py-3 align-top">By programme</td>
              <td className="px-3 py-3 align-top">By activity</td>
              <td className="px-3 py-3 align-top">
                <a
                  href={official.nalagaat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={inlineLink}
                >
                  Performances, workshops and dining
                </a>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="sticky left-0 z-10 bg-card px-3 py-3 align-top font-semibold"
              >
                Jaffa tourist information center
              </th>
              <td className="px-3 py-3 align-top">
                Sun–Thu 09:00–17:30; Fri 09:00–16:00; Sat 10:00–16:00
              </td>
              <td className="px-3 py-3 align-top">Free visitor information</td>
              <td className="px-3 py-3 align-top">
                2 Marzouk & Azar St · +972 3-681-4466 ·{" "}
                <a
                  href={official.touristInformation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={inlineLink}
                >
                  Official details
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm leading-relaxed">
        On{" "}
        <Link to="/travel-blog/calendar-of-events/" className={inlineLink}>
          religious holidays and special dates
        </Link>
        , check the venue's published schedule before visiting.
      </p>
      <article className="rounded-xl border bg-secondary/20 p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">Accessibility and family visits</h3>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">
          The port promenade and parts of the surrounding streets offer relatively level approaches,
          while the historic hill has slopes, stone paving, steps and narrow passages. If you're
          visiting with a wheelchair or stroller, I recommend starting with the flatter streets
          around the port.
        </p>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">
          For a booked Na Laga'at activity, consult the center's{" "}
          <a
            href={official.nalagaatAccess}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            accessibility arrangements
          </a>{" "}
          in advance.
        </p>
      </article>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4" data-testid="jaffa-transport">
      <p>
        Jaffa is part of Tel Aviv–Yafo, so you can reach it by light rail, bus, taxi or a walk along
        the sea. Once you arrive, the central historic area is best explored on foot.
      </p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <TrainFront className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Red Line light rail and buses</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              The Red Line (DAN KAL) runs along Jerusalem Boulevard in Jaffa. Bloomfield Stadium
              station is useful for approaching the flea market, while Shalma is another option for
              northern Jaffa. For routes from your accommodation, consult the{" "}
              <a
                href={official.transit}
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                light rail operator
              </a>{" "}
              or{" "}
              <a
                href={official.buses}
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                official bus planner
              </a>
              .
            </p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <Footprints className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Walk from Tel Aviv's seafront</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              If you are staying near the southern beaches, the promenade through Charles Clore Park
              is a pleasant way to approach Jaffa. From more northern districts, check the distance
              before deciding to walk the whole way. My{" "}
              <Link to="/travel-blog/getting-around-tel-aviv/" className={inlineLink}>
                getting around Tel Aviv guide
              </Link>{" "}
              explains the city transport options.
            </p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <BusFront className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Free weekend shuttle buses</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              On Shabbat and some holidays, when regular public transport is limited, the municipal{" "}
              <a
                href={official.weekendBuses}
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                Naim BaSofash weekend service (Hebrew)
              </a>{" "}
              provides free buses on selected routes. The city lists lines 706 and 718 serving the
              flea-market area and other Jaffa stops. Check the current stops and operating days
              before travelling; this is separate from the Red Line light rail.
            </p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <CarFront className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Taxi, private driver and parking</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              Ask your driver to drop you off at Clock Tower Square or an accessible point near the
              port. The historic hill is best explored on foot. If driving, check parking near Jaffa
              Port, Tzorfim Street or the flea market, as listed by the{" "}
              <a
                href={official.oldJaffaArrival}
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                Old Jaffa visitor information (Hebrew)
              </a>
              . For a private transfer or wider itinerary,{" "}
              <a href="#contact" className={inlineLink}>
                send me an inquiry
              </a>
              .
            </p>
            <a
              href={clockDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary"
            >
              Walking directions to the Clock Tower <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </article>
        </div>
        <aside className="rounded-xl border bg-card p-4" data-testid="jaffa-parking-directions">
          <h3 className="font-serif text-lg font-semibold">Arrival points on Google Maps</h3>
          <p className="mt-2 text-sm leading-relaxed">
            See the arrival area below and choose a central drop-off or car park near your route.
          </p>
          <ConsentIframe
            title="Google Maps overview of the Jaffa Clock Tower, historic hill and nearby parking areas"
            src="https://maps.google.com/maps?q=Jaffa%20Clock%20Tower%2C%20Tel%20Aviv-Yafo%2C%20Israel&hl=en&z=15&t=m&output=embed"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="mt-3 h-48 w-full rounded-lg border-0 sm:h-52"
          />
          <ul className="mt-3 space-y-3 text-sm leading-relaxed">
            <li>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Jaffa%20Clock%20Tower%2C%20Tel%20Aviv-Yafo%2C%20Israel"
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                Clock Tower Square
              </a>{" "}
              - central starting point
            </li>
            <li>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=15a%20HaTzorfim%20Street%2C%20Tel%20Aviv-Yafo%2C%20Israel&travelmode=driving"
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                Tzorfim car park
              </a>{" "}
              - 15A HaTzorfim St
            </li>
            <li>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=46%20Jaffa%20Port%2C%20Tel%20Aviv-Yafo%2C%20Israel&travelmode=driving"
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                Jaffa Port car park
              </a>{" "}
              - Jaffa Port 46
            </li>
            <li>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=4%20Rabbi%20Pinchas%20Street%2C%20Tel%20Aviv-Yafo%2C%20Israel&travelmode=driving"
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                Flea Market car park
              </a>{" "}
              - Rabbi Pinchas 4
            </li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Official parking information:{" "}
            <a
              href={official.tzorfimParking}
              target="_blank"
              rel="noopener noreferrer"
              className={inlineLink}
            >
              Tzorfim
            </a>{" "}
            and{" "}
            <a
              href={official.jaffaPortParking}
              target="_blank"
              rel="noopener noreferrer"
              className={inlineLink}
            >
              Jaffa Port
            </a>
            .
          </p>
        </aside>
      </div>
    </div>
  ),
  foodContent: (
    <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px] lg:grid-cols-[minmax(0,1fr)_260px]">
      <div className="space-y-3">
        <p>
          Jaffa is a good place to explore local food, whether you want a quick bite or a longer
          dinner after sightseeing. The flea-market streets have casual cafés and lively
          restaurants, while the waterfront has spots for a slower meal beside the harbour.
        </p>
        <p>
          For traditional flavours, look for hummus, falafel, shakshuka, freshly baked pastries and
          seafood. Long-established names such as Abu Hassan, Dr. Shakshuka and Abulafia Bakery are
          associated with Jaffa, but check their current branches and hours before making a special
          journey.
        </p>
        <p>
          I would choose a lunch stop around the flea market if you are visiting during the day, or
          end your walk at the port for an evening meal. For more ideas, see my guide to{" "}
          <Link to="/travel-blog/what-to-eat-in-israel/" className={inlineLink}>
            what to eat in Israel
          </Link>
          .
        </p>
      </div>
      <AttractionContentImage
        src={photos.food}
        alt="A bowl of hummus topped with chickpeas and fresh herbs, served with bread"
      />
    </div>
  ),
  practicalContent: (
    <div className="mt-4 space-y-4">
      <p>
        Most visits are straightforward, but a few small planning decisions can make the walk more
        comfortable.
      </p>
      <AttractionPracticalTip>
        <strong>Shoes and slopes:</strong> Choose shoes with good grip for the historic stone
        paving. The{" "}
        <a href="#visit-plan" className={inlineLink}>
          waterfront and market walk
        </a>{" "}
        offers a gentler alternative.
      </AttractionPracticalTip>
      <AttractionPracticalTip>
        <strong>Sunny days:</strong> Parts of the garden, quay and market streets are exposed to
        direct sun. Bring water and plan a shady café break on hot afternoons.
      </AttractionPracticalTip>
      <AttractionPracticalTip>
        <strong>Churches and neighbourhoods:</strong> Dress respectfully at religious sites and be
        considerate when photographing people, worshippers and residential doors.
      </AttractionPracticalTip>
      <p>
        Jaffa works well as part of a larger Tel Aviv visit. If you have additional time, combine it
        with the southern beachfront or{" "}
        <Link to="/travel-blog/beaches-in-tel-aviv/" className={inlineLink}>
          Tel Aviv's beaches
        </Link>{" "}
        for a relaxed outing.
      </p>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>
        Jaffa, historically known as Joppa, has been a Mediterranean port and gateway to the region
        for thousands of years. It appears in ancient texts and in biblical and Christian
        traditions, including the story of Jonah and accounts connected to Peter.
      </p>
      <p>
        The streets visible today reflect many layers: medieval remains, Ottoman-era mosques and
        commercial buildings, churches, and more recent neighborhoods. Modern Jaffa is also home to
        diverse communities and active cultural life. The port, Clock Tower and market show
        different parts of this history during one compact walk.
      </p>
      <p>
        The{" "}
        <a
          href={official.oldJaffa}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          Old Jaffa development authority
        </a>{" "}
        and the{" "}
        <a
          href={official.municipality}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          Tel Aviv–Yafo municipality
        </a>{" "}
        provide further information about the historic district.
      </p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>
        These guided walks explore Old Jaffa or combine the old town with Tel Aviv neighborhoods and
        markets. Compare meeting points, walking distances and inclusions. Check current prices and
        reviews on the booking website.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="jaffa-tour-cards">
        {jaffaTours.map((tour) => (
          <ExternalTourCard key={tour.id} tour={tour} pageId="attractions-jaffa" />
        ))}
      </ul>
      <p className="text-sm leading-relaxed">
        For more options,{" "}
        <Link to="/tours/tel-aviv-jaffa/" className={inlineLink}>
          browse guided tours of Tel Aviv and Jaffa
        </Link>
        . For a customized driving day or transfer,{" "}
        <a href="#contact" className={inlineLink}>
          contact me
        </a>
        .
      </p>
    </div>
  ),
  faqs: [
    {
      q: "Is Jaffa worth visiting from Tel Aviv?",
      a: "Yes. Old Jaffa offers a historic harbour, distinctive stone streets, viewpoints and a flea market within easy reach of central Tel Aviv. Even a short visit gives you a different side of the city.",
    },
    {
      q: "How long should I spend in Jaffa?",
      a: "Around two or three hours covers a highlights walk. Allow four or five hours for the flea market, a museum or an unhurried meal.",
    },
    {
      q: "Do you need a guide to explore Old Jaffa?",
      a: "No. The main outdoor sights are close enough for an independent walk. A guided tour can add historical context and help you discover less obvious corners.",
    },
    {
      q: "Is Jaffa open on Saturdays?",
      a: "The public outdoor areas remain accessible, but flea-market stalls, museums, places of worship and businesses follow their own schedules. Public transport services also differ on Shabbat.",
    },
    {
      q: "Can I visit Jaffa with a stroller or wheelchair?",
      a: "Parts of the harbour and surrounding streets can be easier to navigate, but the old hill has steep slopes, steps and uneven paving. Plan an adapted route and confirm access at any paid venue.",
    },
    {
      q: "Is Jaffa part of Tel Aviv?",
      a: "Yes. Jaffa and Tel Aviv form the same municipality, Tel Aviv–Yafo. Jaffa is the older port and historic district at the southern end of the city's coastline.",
    },
  ],
  nearby: [
    {
      label: "Things to do in Tel Aviv",
      to: "/travel-blog/attractions-in-tel-aviv/",
      note: "Explore markets, neighborhoods, culture and coastal sights.",
    },
    {
      label: "Beaches in Tel Aviv",
      to: "/travel-blog/beaches-in-tel-aviv/",
      note: "Find popular beaches and advice for a seafront day.",
    },
    {
      label: "Museums in Tel Aviv",
      to: "/travel-blog/museums-in-tel-aviv/",
      note: "Art, heritage and family-friendly museum ideas.",
    },
    {
      label: "Best time to visit Israel",
      to: "/travel-blog/best-time-to-visit-israel/",
      note: "Match your travel dates with the activities you want.",
    },
    {
      label: "Where to stay in Tel Aviv",
      to: "/travel-blog/where-to-stay-in-tel-aviv/",
      note: "Compare neighborhoods and hotel areas.",
    },
    {
      label: "Getting around Tel Aviv",
      to: "/travel-blog/getting-around-tel-aviv/",
      note: "Learn about the light rail, buses and walking routes.",
    },
  ],
  planningLinks: [
    {
      label: "Tel Aviv and Jaffa tours",
      to: "/tours/tel-aviv-jaffa/",
      description: "Explore guided walks and sightseeing.",
      icon: "region",
    },
    {
      label: "What to eat in Israel",
      to: "/travel-blog/what-to-eat-in-israel/",
      description: "Local dishes and food traditions.",
      icon: "region",
    },
    {
      label: "Getting around Israel",
      to: "/travel-blog/getting-around-israel/",
      description: "Public transport and road travel.",
      icon: "transport",
    },
    {
      label: "Best time to visit Israel",
      to: "/travel-blog/best-time-to-visit-israel/",
      description: "Seasonal planning and weather.",
      icon: "seasons",
    },
    {
      label: "5-day Israel itinerary",
      to: "/travel-blog/israel-itinerary-5-days/",
      description: "Combine the coast with Jerusalem.",
      icon: "itinerary",
    },
    {
      label: "Israel travel tips",
      to: "/travel-blog/israel-travel-tips/",
      description: "Practical advice before your visit.",
      icon: "region",
    },
  ],
  photoCredits: [
    {
      label: "Wishing Bridge",
      credit: "Dr. Avishai Teicher / PikiWiki Israel · CC BY 2.5; resized and converted to WebP",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:PikiWiki_Israel_14029_Wishing_Bridge_in_Old_Jaffa.JPG",
      licenseUrl: "https://creativecommons.org/licenses/by/2.5/",
    },
  ],
  sources: [
    {
      label: "Old Jaffa development authority - attractions and visitors (Hebrew)",
      url: official.oldJaffa,
    },
    {
      label: "Tel Aviv–Yafo municipality - short Old Jaffa route map (Hebrew PDF)",
      url: official.municipalWalkMapShort,
    },
    {
      label: "Tel Aviv–Yafo municipality - Old Jaffa walking route (Hebrew)",
      url: official.municipalWalkingGuide,
    },
    {
      label: "Tel Aviv–Yafo municipality - walking-route booklet (Hebrew PDF)",
      url: official.municipalWalkingMap,
    },
    { label: "Old Jaffa - arrival directions and parking (Hebrew)", url: official.oldJaffaArrival },
    { label: "Old Jaffa - Tzorfim parking information (Hebrew)", url: official.tzorfimParking },
    {
      label: "Old Jaffa - Jaffa Port parking information (Hebrew)",
      url: official.jaffaPortParking,
    },
    {
      label: "Jaffa Flea Market - visitor information and trading hours",
      url: official.fleaMarketHours,
    },
    {
      label: "Tel Aviv–Yafo municipality - Naim BaSofash weekend buses (Hebrew)",
      url: official.weekendBuses,
    },
    {
      label: "Visit Tel Aviv - Jaffa tourist information center (English)",
      url: official.touristInformation,
    },
    { label: "Old Jaffa - St. Peter's Church (Hebrew)", url: official.church },
    { label: "Ilana Goor Museum - visiting information", url: official.museum },
    { label: "Uri Geller Museum - arranged visits", url: official.uriGeller },
    { label: "Na Laga'at - performances and experiences", url: official.nalagaat },
    { label: "DAN KAL - Red Line information", url: official.transit },
  ],
};

export function JaffaAttractionPage() {
  return <AttractionDestinationPage content={jaffaDestinationContent} />;
}
