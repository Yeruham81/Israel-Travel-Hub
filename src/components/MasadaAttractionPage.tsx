import { ConsentIframe } from "@/components/ConsentIframe";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Footprints, CableCar, Sun } from "lucide-react";
import {
  AttractionDestinationPage,
  AttractionHighlight,
  AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { masadaSite } from "@/data/masadaSite";
import palacePhoto from "@/assets/guides/dead-sea-excursions/masada-palace.webp";
import ruinsPhoto from "@/assets/guides/dead-sea-excursions/masada-ruins.webp";
import snakePathPhoto from "@/assets/guides/dead-sea-excursions/masada-snake-path.webp";
import cableCarPhoto from "@/assets/home/masada-cable-car-wide.webp";
import panoramaPhoto from "@/assets/home/hero-refresh-masada-dead-sea-v4-large.webp";
import deadSeaPhoto from "@/assets/dead-sea/landscape.webp";
import desertShorePhoto from "@/assets/guides/dead-sea-excursions/dead-sea-salt-shore.webp";

const fees = masadaSite.visit;
const official = masadaSite.sources;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const eastDirections =
  "https://www.google.com/maps/dir/?api=1&destination=Masada%20National%20Park%20East%20Entrance%2C%20Israel&travelmode=driving";
const westDirections =
  "https://www.google.com/maps/dir/?api=1&destination=Masada%20West%20Entrance%2C%20Israel&travelmode=driving";
const mapEmbed =
  "https://maps.google.com/maps?q=Masada%20National%20Park%2C%20Israel&hl=en&z=11&t=m&output=embed";
const mapLarger =
  "https://www.google.com/maps/search/?api=1&query=Masada%20National%20Park%20Israel";

export const masadaDestinationContent: AttractionDestinationContent = {
  path: "/attractions/masada/",
  placeName: "Masada",
  title: masadaSite.title,
  region: masadaSite.region,
  updatedAt: masadaSite.updatedAt,
  hero: masadaSite.hero,
  intro: masadaSite.intro,
  visitorTitle: "Tickets, cable car, opening hours and visiting rules",
  visitorNavLabel: "Tickets & hours",
  historyTitle: "Herod's fortress and the Roman siege",
  relatedTitle: "Explore the Dead Sea and beyond",
  contactIntroduction:
    "Tell me your travel date, pickup point, number of passengers and whether you would like to combine Masada with the Dead Sea. I can arrange a private driver for the journey.",
  facts: [
    {
      icon: "location",
      label: "Location",
      value: "Judean Desert",
      note: "Above the Dead Sea, between Ein Gedi and Ein Bokek",
    },
    {
      icon: "duration",
      label: "Time needed",
      value: "2–3 hours",
      note: "On the plateau; extra time for hiking or the museum",
    },
    {
      icon: "admission",
      label: "Entry",
      value: fees.adult + " adult",
      note: fees.child + " child, cable car extra",
    },
    {
      icon: "hours",
      label: "Park hours",
      value: "From 08:00",
      note: "Seasonal closing; hiking can begin earlier",
    },
    {
      icon: "highlights",
      label: "Don't miss",
      value: "Northern Palace",
      note: "Roman siege works, storerooms and Dead Sea views",
    },
    {
      icon: "access",
      label: "Getting up",
      value: "Cable car or hike",
      note: "Eastern and western entrances are separate",
    },
  ],
  glanceNote: (
    <>
      <strong>Choose your entrance before setting out:</strong> The cable car and Snake Path are on
      the eastern side, while the Roman Ramp and evening show are accessed from the west. The roads
      do not connect directly.
    </>
  ),
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight
        title="Herod's Northern Palace"
        image={{
          src: palacePhoto,
          alt: "Terraces and stone remains of Herod's Northern Palace above the desert at Masada",
        }}
      >
        <p>
          The Northern Palace was built on terraces on the edge of the mountain, giving Herod
          commanding views of the desert and Dead Sea. Look for the remains of its rooms, columns
          and painted plaster.
        </p>
        <p>
          The terraces involve many stairs. You can enjoy the panorama from the upper viewpoints if
          you prefer not to descend.
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The ancient synagogue, storerooms and casemate wall"
        image={{
          src: ruinsPhoto,
          alt: "Excavated stone rooms, walls and archaeological remains on the Masada plateau",
        }}
      >
        <p>
          Explore the ancient storerooms, living quarters and synagogue used by the Jewish rebels.
          Together they reveal how a remote hilltop fortress supported a large population during the
          Roman siege.
        </p>
        <p>
          I recommend allowing time to read the archaeological signs and enjoy the famous
          viewpoints.
        </p>
      </AttractionHighlight>
      <AttractionHighlight title="The Roman siege camps and ramp">
        <p>
          From the western side and several viewpoints, you can still make out the Roman siege ramp
          and the outlines of military camps in the desert below. These remains reveal how the Roman
          army laid siege to the fortress.
        </p>
        <p>
          The shorter{" "}
          <a
            href={official.romanRamp}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            Roman Ramp Trail
          </a>{" "}
          approaches the plateau from the western entrance, not from the cable-car station.
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The steep Snake Path"
        image={{
          src: snakePathPhoto,
          alt: "Steep winding Snake Path climbing the eastern side of Masada",
        }}
      >
        <p>
          The Snake Path zigzags up the eastern cliff. Its approximately 2 km ascent climbs around
          350 m and takes about an hour for fit hikers. In hot weather, the trail may close to
          hikers several hours before the park closes.
        </p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The cable car to the summit"
        image={{
          src: cableCarPhoto,
          alt: "Masada's cable car climbing the desert mountain towards the fortress summit",
        }}
      >
        <p>
          For an easier ascent, the cable car leaves from Masada East and takes around three minutes
          to reach the summit. It is paid separately from park admission, and the last ascent
          normally leaves one hour before the park closes.
        </p>
      </AttractionHighlight>
      <AttractionHighlight title="The Yigael Yadin Masada Museum">
        <p>
          The museum at the eastern entrance displays artifacts from Herod's palace, the Jewish
          rebels and the Roman army.
        </p>
        <p>
          A museum visit is <strong>included with regular park admission</strong>, but a separate
          time reservation is required. Museum-only entry costs {fees.museumOnly}.{" "}
          <a
            href={official.museum}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            Museum and booking details
          </a>
          .
        </p>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>Park admission and cable-car travel are priced separately.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="masada-hours-tickets">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">National park hours</h3>
          <p className="mt-3 text-sm font-semibold">Summer / daylight saving time</p>
          <p className="mt-1 text-sm leading-relaxed sm:text-base">
            Sunday–Thursday & Saturday: <strong>{fees.summerRegular}</strong>
          </p>
          <p className="mt-1 text-sm leading-relaxed sm:text-base">
            Friday & most holiday eves: <strong>{fees.summerFriday}</strong>
          </p>
          <p className="mt-3 text-sm font-semibold">Winter / standard time</p>
          <p className="mt-1 text-sm leading-relaxed sm:text-base">
            Sunday–Thursday & Saturday: <strong>{fees.winterRegular}</strong>
          </p>
          <p className="mt-1 text-sm leading-relaxed sm:text-base">
            Friday & most holiday eves: <strong>{fees.winterFriday}</strong>
          </p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">
            Rosh Hashanah and Passover eves: <strong>{fees.specialHolidayEves}</strong>. Yom Kippur
            eve: <strong>{fees.yomKippurEve}</strong>.
          </p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">
            <strong>Last park entry and last cable-car ascent are one hour before closing.</strong>{" "}
            The Snake Path may have much earlier cutoffs.{" "}
            <a
              href={official.park}
              target="_blank"
              rel="noopener noreferrer"
              className={inlineLink}
            >
              Check today's official notice
            </a>
            .
          </p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Park entrance (without cable car)</h3>
          <dl className="mt-3 space-y-2 text-sm leading-relaxed sm:text-base">
            <div className="flex items-start justify-between gap-3">
              <dt>Adult</dt>
              <dd className="shrink-0 font-semibold" dir="ltr">
                {fees.adult}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt>Child, ages 5–18</dt>
              <dd className="shrink-0 font-semibold" dir="ltr">
                {fees.child}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt>Student</dt>
              <dd className="shrink-0 font-semibold" dir="ltr">
                {fees.student}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt>Adult in group (more than 30)</dt>
              <dd className="shrink-0 font-semibold" dir="ltr">
                {fees.adultGroup}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt>Child in group (more than 30)</dt>
              <dd className="shrink-0 font-semibold" dir="ltr">
                {fees.childGroup}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt>Active-duty soldier</dt>
              <dd className="shrink-0 font-semibold" dir="ltr">
                {fees.soldier}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt>Active reservist</dt>
              <dd className="shrink-0 font-semibold" dir="ltr">
                {fees.activeReservist}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt>Israeli senior citizen</dt>
              <dd className="shrink-0 font-semibold" dir="ltr">
                {fees.israeliSenior}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-muted-foreground">
            Children under 5 enter free. Reduced fares require eligibility, and group rates apply to
            groups of more than 30 people. Matmon membership covers regular park admission under the
            program's terms.
          </p>
          <a
            href={official.fees}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Official admission prices <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </article>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="masada-cable-prices">
        <div className="flex items-center gap-2">
          <CableCar className="h-5 w-5 text-primary" aria-hidden="true" />
          <h3 className="font-serif text-xl font-semibold">Cable-car tickets - Masada East</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">
          Cable-car tickets are <strong>additional to the entrance fee</strong>. The cable car does
          not reach the western entrance.
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold">One-way</h4>
            <dl className="mt-1 space-y-1 text-sm leading-relaxed sm:text-base">
              <div className="flex justify-between gap-3">
                <dt>Adult</dt>
                <dd className="font-semibold" dir="ltr">
                  {fees.cableOneWayAdult}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Child</dt>
                <dd className="font-semibold" dir="ltr">
                  {fees.cableOneWayChild}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Return</h4>
            <dl className="mt-1 space-y-1 text-sm leading-relaxed sm:text-base">
              <div className="flex justify-between gap-3">
                <dt>Adult</dt>
                <dd className="font-semibold" dir="ltr">
                  {fees.cableReturnAdult}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Child</dt>
                <dd className="font-semibold" dir="ltr">
                  {fees.cableReturnChild}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">
          For example, regular adult entry plus a return cable-car ticket comes to{" "}
          <strong>₪91</strong>; child entry plus return cable car comes to <strong>₪53</strong>.
        </p>
        <a
          href={official.cableCar}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Official cable-car guidance <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
      <AttractionPracticalTip>
        <strong>Heat restrictions can change your hike.</strong> On very hot days the park may limit
        the Snake Path much earlier than normal opening hours; during extreme summer heat, it can
        close for ascent at 07:00 and descent at 08:00. Check the official{" "}
        <a
          href={official.snakePath}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          Snake Path notices
        </a>{" "}
        before departing, and do not plan a midday climb.
      </AttractionPracticalTip>
      <div
        className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5"
        data-testid="masada-visitor-essentials"
      >
        <h3 className="font-serif text-xl font-semibold">
          Museum, reservations and practical essentials
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>
            <strong>Reservations:</strong> Reserve a park entry time in advance, especially during
            busy periods. You must reserve a time to visit the museum, even if admission is included
            in your ticket.
          </li>
          <li>
            <strong>Museum hours:</strong> Sunday–Thursday and Saturday, 08:30–15:30; Friday and
            holiday eves, 08:30–14:30, subject to special closures. Reserve in advance.
          </li>
          <li>
            <strong>Accessibility:</strong> The east-side cable car, bridge, many plateau paths and
            the museum are accessible. Descending to the Northern Palace terraces requires numerous
            steps.
          </li>
          <li>
            <strong>What to bring:</strong> Water, hat, sun protection and sturdy shoes. Shade is
            limited on the plateau; sudden desert flooding can also affect roads and trails.
          </li>
          <li>
            <strong>Facilities:</strong> The eastern visitor complex has parking, restrooms, food
            and shops. The western entrance has more limited services.
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed">
          For access arrangements or temporary closures, check{" "}
          <a href={official.park} target="_blank" rel="noopener noreferrer" className={inlineLink}>
            Masada's official visitor page
          </a>{" "}
          or call the parks authority at{" "}
          <a href="tel:*3639" dir="ltr" className={inlineLink}>
            {fees.sitePhone}
          </a>
          .
        </p>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">The Masada night show</h3>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">
          The approximately 45-minute sound-and-light show takes place at{" "}
          <strong>Masada West</strong>, on Tuesdays and Thursdays. Standard tickets cost{" "}
          {fees.nightShow} per person.
        </p>
        <dl
          className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm leading-relaxed sm:grid-cols-2 sm:text-base"
          aria-label="Masada night show seasonal starting times"
        >
          <div className="flex justify-between gap-3">
            <dt>May–June</dt>
            <dd className="font-semibold" dir="ltr">
              {fees.nightShowMayJune}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>July–August</dt>
            <dd className="font-semibold" dir="ltr">
              {fees.nightShowJulyAugust}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>September–October</dt>
            <dd className="font-semibold" dir="ltr">
              {fees.nightShowSeptemberOctober}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>November–December</dt>
            <dd className="font-semibold" dir="ltr">
              {fees.nightShowNovemberDecember}
            </dd>
          </div>
        </dl>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Closed January–April. November–December shows are weather-dependent; confirm availability
          and the starting time for your date.
        </p>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">
          The show is reached from Arad via Road 3199.{" "}
          <a
            href={official.nightShow}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            Show times and booking
          </a>
          .
        </p>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>
        Most visitors arriving from the Dead Sea use <strong>Masada East</strong>. Choose{" "}
        <strong>Masada West</strong> if you plan to climb the Roman Ramp or attend the evening show.
      </p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="masada-two-entrances">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Masada East - Route 90</h3>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">
            Cable car, Snake Path, visitor center and Yigael Yadin Museum. This is the usual
            entrance when arriving from Ein Bokek, Ein Gedi or the Dead Sea Highway.
          </p>
          <a
            href={eastDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Directions to Masada East <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Masada West - Road 3199</h3>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">
            Roman Ramp Trail, west campground and night show. Approach from Arad; there is{" "}
            <strong>no direct road connection</strong> to the eastern entrance.
          </p>
          <a
            href={westDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Directions to Masada West <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </article>
      </div>
      <p className="text-sm leading-relaxed">
        See the{" "}
        <a
          href={official.complexAccess}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          official English guide to Masada's visitor areas
        </a>{" "}
        for both entrances.
      </p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <CarFront className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">By car or private driver</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              The east-side cable-car complex is around 18 km south of Ein Gedi and 12 km north of
              Ein Bokek.{" "}
              <Link to="/car-rental/" className={inlineLink}>
                Renting a car
              </Link>{" "}
              is practical for combining stops, and a{" "}
              <a href="#contact" className={inlineLink}>
                private driver
              </a>{" "}
              can arrange a customized Dead Sea itinerary.
            </p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <BusFront className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">By public transport</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              From Jerusalem Central Bus Station, <strong>Egged line 486</strong> serves the Masada
              East stop. <strong>Line 444</strong> toward Eilat can also stop at Masada, but
              requires advance seat reservation. Check both your outbound and return departures,
              especially the last bus, in the{" "}
              <a
                href="https://bus.gov.il/en/home"
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                official transport planner
              </a>
              , and consult{" "}
              <a
                href="https://www.egged.co.il/en/information-for-passengers/tickets-information"
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                Egged's reserved-seat information
              </a>
              . Neither bus takes you to Masada West.
            </p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <Footprints className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">By hiking</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              From the east, the Snake Path takes around one hour uphill and requires good fitness.
              From the west, the Roman Ramp normally takes about 30 minutes. Both are subject to
              weather restrictions and use different arrival roads.
            </p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="masada-location-map">
          <h3 className="text-sm font-semibold">Where is Masada?</h3>
          <ConsentIframe
            title="Location of Masada above the Dead Sea in Israel"
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
            View larger map <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">
          A comfortable visit: 2–3 hours on the mountain
        </h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>
            Start early at <strong>Masada East</strong> and take the cable car to the plateau.
          </li>
          <li>
            Visit the <strong>synagogue, storerooms and palace viewpoints</strong>, following the
            marked path.
          </li>
          <li>
            Continue to the <strong>Northern Palace</strong> if you are comfortable with steps, then
            enjoy the Dead Sea panorama.
          </li>
          <li>
            Return by cable car and, if reserved, explore the <strong>Yigael Yadin Museum</strong>{" "}
            at the east-side visitor center.
          </li>
        </ol>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">
          Allow more time if you plan to hike. A stop at the Dead Sea or Ein Gedi can turn the visit
          into a full day, depending on your starting point.
        </p>
      </div>
      <figure
        className="overflow-hidden rounded-xl border bg-card"
        data-testid="masada-wide-panorama"
      >
        <img
          src={panoramaPhoto}
          alt="Wide panoramic view of Masada and the surrounding Judean Desert descending toward the Dead Sea"
          width={1400}
          height={790}
          loading="lazy"
          decoding="async"
          className="h-52 w-full object-cover object-center sm:h-64 lg:h-72"
        />
        <figcaption className="px-3 py-2 text-xs text-muted-foreground">
          Views of the desert and Dead Sea from Masada.
        </figcaption>
      </figure>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-primary" />
          <h3 className="font-serif text-xl font-semibold">Sunrise and hiking plans</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">
          The Snake Path can open about an hour before sunrise, and the western Roman Ramp about
          half an hour before sunrise, subject to conditions.{" "}
          <strong>Regular cable-car service begins after sunrise.</strong> Special sunrise rides
          operate on selected dates and require advance booking.
        </p>
        <AttractionPracticalTip>
          <strong>Hiking safety:</strong> In the heat, hike only when the trail is officially open
          and carry plenty of water. Check the descent trail's opening hours before starting your
          climb.
        </AttractionPracticalTip>
      </div>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>
        King Herod developed Masada as a fortified palace complex during the late first century BCE,
        with impressive storerooms, water systems and terraces overlooking the desert.
      </p>
      <p>
        After the Jewish revolt against Rome began in 66 CE, rebels occupied the mountaintop. Roman
        forces eventually laid siege to Masada, building a ring of camps and a ramp against the
        western side. The events of the final siege are known largely from the first-century
        historian Josephus; not every part of his account can be independently verified
        archaeologically.
      </p>
      <p>
        Today Masada is a UNESCO World Heritage Site. From the summit you can see the ancient
        fortress and the remains of the Roman siege works across the surrounding desert.
      </p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>
        Day tours often pair Masada with the Dead Sea, sometimes adding Ein Gedi when its trails are
        open. Before booking, check whether national-park entry, the cable car and hotel pickup are
        included, and whether the tour uses the eastern entrance.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          to="/tours/masada-dead-sea/"
          className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4"
        >
          <img
            src={deadSeaPhoto}
            alt="Wide Dead Sea landscape near Masada"
            width={128}
            height={100}
            loading="lazy"
            decoding="async"
            className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">
              Explore Masada & Dead Sea tours
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Compare available excursions and departure cities.
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              View tour options <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
        <a
          href="#contact"
          className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4"
        >
          <img
            src={desertShorePhoto}
            alt="Salt formations and the dramatic desert shoreline of the Dead Sea"
            width={128}
            height={100}
            loading="lazy"
            decoding="async"
            className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">
              Plan a private desert day
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Choose stops around Masada and the Dead Sea.
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Request a quote <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    {
      q: "How much does Masada National Park cost?",
      a: "Admission excluding the cable car is ₪37 per adult and ₪21 per child aged 5–18. The cable car is a separate purchase: a return fare is ₪54 for adults and ₪32 for children, making regular entry plus return cable car ₪91 per adult or ₪53 per child.",
    },
    {
      q: "Is the cable car included in the admission ticket?",
      a: "No. Park entrance and cable-car tickets are priced separately; make sure your reservation or tour package specifies both.",
    },
    {
      q: "Which Masada entrance should I use?",
      a: "Masada East serves the cable car, Snake Path and museum; Masada West serves the Roman Ramp and night show. Check the directions for your chosen entrance in the How to get there section.",
    },
    {
      q: "Can I see sunrise at Masada using the cable car?",
      a: "The Snake Path can open before dawn, subject to weather restrictions. Regular cable-car hours start later; special sunrise cable-car departures run only on selected dates and require booking.",
    },
    {
      q: "How difficult is the Snake Path?",
      a: "It is a steep ascent of around 2 km with roughly 900 steps, taking about an hour for fit hikers. Summer heat may close ascent as early as 07:00. Check the park's current instructions.",
    },
    {
      q: "Do I need to reserve entry or the museum?",
      a: "Reserve your visit in advance, especially during busy periods. For the Yigael Yadin Museum, a separate timed reservation is required even if the museum is included with paid park entry.",
    },
    {
      q: "How long does a visit to Masada take?",
      a: "Allow 2–3 hours on site for the main ruins and viewpoints, plus extra time for hiking, the museum, or a separate Dead Sea stop.",
    },
    {
      q: "Where does the Masada night show take place?",
      a: "At Masada West, with separate admission and advance booking. Its seasonal starting times are listed in the visitor information section.",
    },
  ],
  nearby: [
    {
      label: "Ein Gedi",
      to: "/attractions/ein-gedi/",
      note: "A desert oasis with waterfalls and wildlife. Check the currently open trails before visiting.",
    },
    {
      label: "Qasr el-Yahud",
      to: "/attractions/qasr-el-yahud/",
      note: "Historic Jordan River baptism site on the way from Jerusalem.",
    },
    {
      label: "Old City of Jerusalem",
      to: "/attractions/old-city-jerusalem/",
      note: "Jerusalem's historic quarters and landmarks, ideal for a separate sightseeing day.",
    },
    {
      label: "Mitzpe Ramon",
      to: "/attractions/mitzpe-ramon-crater/",
      note: "Ramon Crater's dramatic desert views, best planned as a separate day trip.",
    },
    {
      label: "Mount of Olives",
      to: "/attractions/mount-of-olives/",
      note: "Panoramic Jerusalem viewpoints and churches to explore on a city sightseeing day.",
    },
    {
      label: "Mount Zion",
      to: "/attractions/mount-zion/",
      note: "Churches and landmarks just beyond Jerusalem's walls, suitable for a Jerusalem day.",
    },
  ],
  planningLinks: [
    {
      label: "Jerusalem to the Dead Sea",
      to: "/travel-blog/jerusalem-to-the-dead-sea/",
      description: "Build a realistic route from Jerusalem.",
      icon: "itinerary",
    },
    {
      label: "The Dead Sea visitor guide",
      to: "/attractions/dead-sea/",
      description: "Beaches, distances and day-trip tips.",
      icon: "region",
    },
    {
      label: "Getting around Israel",
      to: "/travel-blog/getting-around-israel/",
      description: "Transport choices for longer journeys.",
      icon: "transport",
    },
    {
      label: "7-day Israel itinerary",
      to: "/travel-blog/israel-itinerary-7-days/",
      description: "Plan a week around the country's highlights.",
      icon: "itinerary",
    },
    {
      label: "10-day Israel itinerary",
      to: "/travel-blog/israel-itinerary-10-days/",
      description: "Allow more time for the desert and coast.",
      icon: "itinerary",
    },
    {
      label: "Best time to visit Israel",
      to: "/travel-blog/best-time-to-visit-israel/",
      description: "Seasonal weather and practical advice.",
      icon: "seasons",
    },
  ],
  sources: [
    {
      label: "Israel Nature and Parks Authority - Masada National Park",
      url: official.park,
      note: "Admission, seasonal hours, access, heat restrictions and visitor information.",
    },
    {
      label: "Israel Nature and Parks Authority - official price list",
      url: official.fees,
      note: "Standard entrance fees and visitor concessions.",
    },
    {
      label: "Israel Nature and Parks Authority - Masada cable car",
      url: official.cableCar,
      note: "Cable-car travel, access and separate ticketing.",
    },
    {
      label: "Israel Nature and Parks Authority - Snake Path",
      url: official.snakePath,
      note: "Route, ascent time and early closures during hot weather.",
    },
    {
      label: "Israel Nature and Parks Authority - Roman Ramp",
      url: official.romanRamp,
      note: "Western approach, accessibility and hiking conditions.",
    },
    {
      label: "Israel Nature and Parks Authority - Yigael Yadin Museum",
      url: official.museum,
      note: "Included admission, separate reservations and museum hours.",
    },
    {
      label: "Israel Nature and Parks Authority - Masada night show",
      url: official.nightShow,
      note: "Western location, seasonal show times and tickets.",
    },
    {
      label: "Israel Nature and Parks Authority - access to Masada's visitor areas",
      url: official.complexAccess,
      note: "Differences between the eastern and western entrances.",
    },
  ],
};

export function MasadaAttractionPage() {
  return <AttractionDestinationPage content={masadaDestinationContent} />;
}
