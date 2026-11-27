import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Footprints } from "lucide-react";
import {
  AttractionDestinationPage,
  AttractionHighlight,
  AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { mountOlivesEditorialUpdate } from "@/data/mountOlivesRevision";
import { mountOlivesSite } from "@/data/mountOlivesSite";
import guidedTourPhoto from "@/assets/home/guided-tour-card.webp";
import oldCityTourPhoto from "@/assets/home/jerusalem-old-city-card.webp";
import { MountOlivesRouteMap } from "@/components/MountOlivesRouteMap";
import { CuratedPartnerTourCard } from "@/components/CuratedPartnerTourCard";

const official = mountOlivesSite.official;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const viewpointDirections =
  "https://www.google.com/maps/dir/?api=1&destination=Seven%20Arches%20Hotel%20Mount%20of%20Olives%20Jerusalem&travelmode=driving";
const gethsemaneDirections =
  "https://www.google.com/maps/dir/?api=1&destination=Church%20of%20All%20Nations%20Gethsemane%20Jerusalem&travelmode=driving";
const lionGateWalk =
  "https://www.google.com/maps/dir/?api=1&origin=Church%20of%20All%20Nations%20Gethsemane%20Jerusalem&destination=Lions%20Gate%20Jerusalem&travelmode=walking";
const upperRidgeWalk =
  "https://www.google.com/maps/dir/?api=1&origin=Pater%20Noster%20Church%20Jerusalem&destination=Seven%20Arches%20Hotel%20Mount%20of%20Olives%20Jerusalem&travelmode=walking";
const downhillWalk =
  "https://www.google.com/maps/dir/?api=1&origin=Seven%20Arches%20Hotel%20Mount%20of%20Olives%20Jerusalem&destination=Church%20of%20All%20Nations%20Gethsemane%20Jerusalem&travelmode=walking";
const walkingLinks = [
  {
    title: "Pater Noster to Seven Arches",
    url: upperRidgeWalk,
    description: "Upper ridge, before the main descent",
  },
  {
    title: "Seven Arches to Gethsemane",
    url: downhillWalk,
    description: "Check the traditional Palm Sunday Road and church entrances",
  },
  {
    title: "Gethsemane to Lion’s Gate",
    url: lionGateWalk,
    description: "Continue into the Old City on foot",
  },
];

const mountOlivesTours = [
  {
    id: "6540P87",
    platform: "Viator" as const,
    title: "Jerusalem Mount of Olives Tour",
    summary:
      "A guided visit to Ascension traditions, Gethsemane, the Tomb of Mary and the historic hillside cemetery.",
    duration: "3 hr 30 min",
    editorialRating: { value: 5.0, count: 1 },
    editorialPrice: {
      amount: 60,
      currency: "USD" as const,
      basis: "per_person" as const,
      approximate: true,
    },
    photo: guidedTourPhoto,
    alt: "Guided sightseeing in Jerusalem",
    sourceUrl:
      "https://www.viator.com/en-GB/tours/Jerusalem/Jerusalem-Mount-of-Olives-Tour/d921-6540P87",
    href: "https://viator.tpk.lv/frgpZFls",
  },
  {
    id: "117240P3",
    platform: "Viator" as const,
    title: "From the Ascension Chapel to Gethsemane",
    summary:
      "A guided downhill pilgrimage walk across the Mount of Olives, starting with an arranged local bus transfer.",
    duration: "3–4 hours",
    editorialRating: { value: 5.0, count: 1 },
    editorialPrice: {
      amount: 225,
      currency: "USD" as const,
      basis: "per_group" as const,
      approximate: true,
    },
    photo: oldCityTourPhoto,
    alt: "Jerusalem Old City near the tour departure area",
    sourceUrl:
      "https://www.viator.com/en-GB/tours/Jerusalem/Mt-of-Olives-from-the-Church-of-the-Ascension-to-Gethsemane/d921-117240P3",
    href: "https://viator.tpk.lv/v3Tk4hG1",
  },
  {
    id: "208675P3",
    platform: "Viator" as const,
    title: "Jerusalem Classic Tour: Mount of Olives & Old City",
    summary:
      "A longer guided day covering the Mount of Olives viewpoint and the Old City's Christian and Jewish landmarks.",
    duration: "About 7 hours",
    editorialRating: { value: 5.0, count: 3 },
    editorialPrice: { amount: 122.62, currency: "EUR" as const, basis: "per_person" as const },
    photo: "/images/attractions/old-jerusalem-damascus-gate.webp",
    alt: "Damascus Gate in the historic Old City of Jerusalem",
    sourceUrl: "https://www.viator.com/tours/Jerusalem/jerusalem-daily-tour/d921-208675P3",
    href: "https://viator.tpk.lv/YV4HrN5E",
  },
] as const;

export const mountOlivesDestinationContent: AttractionDestinationContent = {
  path: "/attractions/mount-of-olives/",
  placeName: "Mount of Olives",
  title: mountOlivesSite.title,
  heroTitle: "Mount of Olives, Jerusalem: What to See & How to Visit",
  highlightsTitle: "What to see on the Mount of Olives",
  region: mountOlivesSite.region,
  updatedAt: mountOlivesSite.updatedAt,
  hero: mountOlivesSite.hero,
  intro: mountOlivesSite.intro,
  visitorTitle: "Opening hours, admission and accessibility",
  visitorNavLabel: "Hours & tickets",
  historyTitle: "The Mount of Olives in Jewish, Christian and Muslim history",
  relatedTitle: "Continue exploring Jerusalem",
  itineraryFirst: true,
  itineraryTitle: "How to plan your Mount of Olives visit",
  contactIntroduction:
    "Tell me your date, pickup point, passenger count and the Mount of Olives sites you plan to visit. I can arrange private transport with a driver to a suitable drop-off point and a pickup after your visit.",
  facts: [
    {
      icon: "location",
      label: "Location",
      value: "East of the Old City",
      note: "Across the Kidron Valley",
    },
    {
      icon: "duration",
      label: "Time needed",
      value: "30 min–half day",
      note: "About 2–3 hours for the lookout and selected churches",
    },
    {
      icon: "admission",
      label: "Viewpoint",
      value: "Free",
      note: "Individual compounds may charge admission",
    },
    {
      icon: "hours",
      label: "Church hours",
      value: "Vary by site",
      note: "Pater Noster and St Mary Magdalene have limited days",
    },
    {
      icon: "highlights",
      label: "Don't miss",
      value: "Panorama & Gethsemane",
      note: "Dominus Flevit on the downhill route",
    },
    {
      icon: "access",
      label: "Walking",
      value: "Steep hillside",
      note: "Arrange separate upper and lower stops if needed",
    },
  ],
  glanceNote: (
    <>
      For the classic Jerusalem panorama, head to the public terrace near the{" "}
      <a
        href={viewpointDirections}
        target="_blank"
        rel="noopener noreferrer"
        className={inlineLink}
      >
        Seven Arches Hotel
      </a>
      . If you would like to visit churches, choose your day carefully:{" "}
      <a
        href={official.churchHours}
        target="_blank"
        rel="noopener noreferrer"
        className={inlineLink}
      >
        opening hours
      </a>{" "}
      are different at each site.
    </>
  ),
  highlightContent: (
    <div className="mt-4 space-y-3">
      <p className="text-sm leading-relaxed sm:text-base">{mountOlivesEditorialUpdate.stopIntro}</p>
      {mountOlivesEditorialUpdate.stops.map((stop) => (
        <AttractionHighlight
          key={stop.name}
          title={stop.name}
          mobileImageFirst
          image={stop.image ? { src: stop.image.src, alt: stop.image.alt } : undefined}
        >
          <p>{stop.description}</p>
          <p>{stop.visit}</p>
        </AttractionHighlight>
      ))}
      <AttractionPracticalTip>
        Planning a longer pilgrimage? You could also consider the Augusta Victoria church complex or
        the traditional Palm Sunday site at Bethphage. These are optional stops away from the main
        downhill route; confirm public visiting arrangements directly before adding them.
      </AttractionPracticalTip>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>
        The open-air panoramic viewpoint is free. The churches, monasteries and pilgrimage sites
        below follow separate schedules, and Pater Noster and the Chapel of the Ascension charge
        their own entrance fees. Opening hours can change during religious services and holidays;
        check before visiting.
      </p>
      <div
        role="region"
        aria-label="Mount of Olives opening hours and admission comparison"
        tabIndex={0}
        className="max-w-full overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary"
        data-testid="mount-olives-hours-fees"
      >
        <table className="w-full min-w-[790px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Mount of Olives visitor sites, opening hours, admissions and important notes
          </caption>
          <thead className="bg-secondary/60">
            <tr>
              {["Site", "Visiting hours", "Admission", "Important notes"].map((heading, index) => (
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
              ))}
            </tr>
          </thead>
          <tbody>
            {mountOlivesSite.hours.map((fact) => (
              <tr key={fact.name} className="border-b last:border-0">
                <th
                  scope="row"
                  className="sticky left-0 z-10 w-[150px] min-w-[136px] bg-card px-3 py-3 align-top font-semibold"
                >
                  {fact.name}
                </th>
                <td className="px-3 py-3 align-top">{fact.time}</td>
                <td className="px-3 py-3 align-top font-medium">{fact.admission}</td>
                <td className="px-3 py-3 align-top text-muted-foreground">{fact.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm leading-relaxed">
        <strong>Pater Noster:</strong> The table lists the published temporary visiting schedule.
        The standard timetable also mentions Saturday; confirm its actual opening day with the{" "}
        <a
          href={official.churchHours}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          Christian Information Center
        </a>{" "}
        for changes.
      </p>
      <p className="text-sm leading-relaxed">
        <strong>Grotto of the Apostles:</strong> Unlike the adjoining Church of All Nations, the
        grotto has a midday break. It generally opens 07:30–12:00 and 14:30–18:00 (until 17:00
        October–March), with last entry ten minutes before the scheduled closure.
      </p>
      <div
        className="rounded-xl border bg-secondary/20 p-4 sm:p-5"
        data-testid="mount-olives-access"
      >
        <h3 className="font-serif text-xl font-semibold">
          Accessibility, visiting etiquette and practical details
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>
            <strong>Steep walk:</strong> The Palm Sunday road descends sharply, with uneven paving
            and some steps. It is not a reliably step-free route and can be tiring on the return
            uphill.
          </li>
          <li>
            <strong>Alternative:</strong> For limited mobility, visit the lookout by vehicle and
            arrange a separate drop-off near Gethsemane. Check step-free access to each church
            directly.
          </li>
          <li>
            <strong>Tomb of Mary:</strong> Reaching the underground sanctuary involves a long
            stairway.
          </li>
          <li>
            <strong>Respectful visits:</strong> Wear modest clothing inside churches, observe
            service times and follow photography instructions.
          </li>
          <li>
            <strong>Jewish cemetery:</strong> This is an active burial ground, not a walking
            shortcut. Use the{" "}
            <a
              href={official.graveLocator}
              target="_blank"
              rel="noopener noreferrer"
              className={inlineLink}
            >
              City of David cemetery mapping system
            </a>{" "}
            to locate particular graves and approaches. Guided cemetery tours for organised groups
            require booking at least eight working days ahead; the{" "}
            <a
              href={official.cemetery}
              target="_blank"
              rel="noopener noreferrer"
              className={inlineLink}
            >
              information center
            </a>{" "}
            is temporarily closed. Respect funerals and mourners.
          </li>
        </ul>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>
        For the panorama, head to the <strong>upper ridge</strong> near Seven Arches. If you're
        going straight to Gethsemane or the other <strong>lower sites</strong>, ask to be dropped
        off at the foot of the hill.
      </p>
      <div className="grid gap-3 sm:grid-cols-3" data-testid="mount-olives-access-points">
        <article className="rounded-xl border bg-card p-3">
          <h3 className="font-serif text-lg font-semibold">Seven Arches viewpoint</h3>
          <p className="mt-2 text-sm">Best starting point for the panorama and a downhill walk.</p>
          <a
            href={viewpointDirections}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            Driving directions <ArrowUpRight className="inline h-4 w-4" />
          </a>
        </article>
        <article className="rounded-xl border bg-card p-3">
          <h3 className="font-serif text-lg font-semibold">Gethsemane</h3>
          <p className="mt-2 text-sm">
            Lower pickup point near the Church of All Nations and Tomb of Mary.
          </p>
          <a
            href={gethsemaneDirections}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            Driving directions <ArrowUpRight className="inline h-4 w-4" />
          </a>
        </article>
        <article className="rounded-xl border bg-card p-3">
          <h3 className="font-serif text-lg font-semibold">Lion's Gate</h3>
          <p className="mt-2 text-sm">
            Continue into Jerusalem's Old City from the foot of the hill.
          </p>
          <a href="#visit-plan" className={inlineLink}>
            See walking connections
          </a>
        </article>
      </div>
      <div className="space-y-3">
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2">
            <BusFront className="h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="font-semibold">By public bus</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed">
            For the <strong>Seven Arches viewpoint</strong>, City of David lists bus 84 from
            Ammunition Hill near the light rail. For{" "}
            <strong>Pater Noster and the Chapel of the Ascension</strong>, buses 255 and 275 serve
            the Church of the Ascension/Rabia Al-Adawiya area. Routes 83, 83A and 51 serve Derech
            Yericho near the lower cemetery approach. Check the exact stop, direction and service
            day with the{" "}
            <a
              href={official.transit}
              target="_blank"
              rel="noopener noreferrer"
              className={inlineLink}
            >
              public transport planner
            </a>
            ; routes may change.
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            The light rail and most Israeli city buses do not operate during Shabbat, from Friday
            afternoon until Saturday evening. Other local services can follow different schedules.
          </p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2">
            <CarFront className="h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="font-semibold">By taxi or private driver</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed">
            A taxi to Seven Arches avoids climbing up from the Kidron Valley. If you plan to walk
            downhill, arrange pickup near Gethsemane. For a visit without the steep downhill walk, I
            can help arrange separate drop-offs at the viewpoint and near Gethsemane;{" "}
            <a href="#contact" className={inlineLink}>
              send me your preferred date and pickup location
            </a>
            .
          </p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2">
            <Footprints className="h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="font-semibold">On foot from the Old City</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed">
            From Lion's Gate, cross toward Gethsemane near the foot of the Mount of Olives. You can
            visit the lower churches without climbing the entire hillside. The full ascent to the
            upper viewpoint is steep, especially in warm weather.
          </p>
        </article>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <p>{mountOlivesEditorialUpdate.routeIntro}</p>
      <div className="grid gap-3 md:grid-cols-3" data-testid="mount-olives-visit-choices">
        <article className="rounded-xl border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">30–45 minutes</p>
          <h3 className="mt-2 text-lg font-semibold">Just the panoramic viewpoint</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Arrive directly at Seven Arches for the classic Jerusalem panorama. Suitable when you
            have limited time or prefer to avoid the steep walk.
          </p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Around 2–3 hours</p>
          <h3 className="mt-2 text-lg font-semibold">The classic downhill walk</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Start at the lookout, walk past Dominus Flevit and finish at Gethsemane; continue to
            Lion's Gate if time allows.
          </p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Half a day</p>
          <h3 className="mt-2 text-lg font-semibold">A longer pilgrimage route</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Include Pater Noster, the Ascension chapel and other church interiors, choosing your day
            around restricted opening hours.
          </p>
        </article>
      </div>
      <MountOlivesRouteMap />
      <h3 className="pt-3 text-xl font-semibold">Two suggested itineraries</h3>
      <div className="grid gap-3 md:grid-cols-2" data-testid="mount-olives-walking-routes">
        {mountOlivesEditorialUpdate.routes.map((route) => (
          <article key={route.name} className="rounded-xl border bg-card p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase text-primary">{route.time}</p>
            <h3 className="mt-2 font-serif text-xl font-semibold">{route.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{route.bestFor}</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
              {route.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-3 border-t pt-3 text-sm text-muted-foreground">{route.note}</p>
          </article>
        ))}
      </div>
      <div
        className="rounded-xl border bg-card p-4 sm:p-5"
        data-testid="mount-olives-walking-connections"
      >
        <h3 className="font-serif text-xl font-semibold">Walking connections</h3>
        <ul className="mt-3 grid list-none gap-3 p-0 sm:grid-cols-3">
          {walkingLinks.map((leg) => (
            <li key={leg.url} className="list-none rounded-lg border bg-secondary/20 p-3">
              <a href={leg.url} target="_blank" rel="noopener noreferrer" className={inlineLink}>
                {leg.title} <ArrowUpRight className="inline h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {leg.description}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm leading-relaxed">
          Google Maps may suggest a different path from the traditional{" "}
          <strong>Palm Sunday Road</strong>. Check pedestrian signs and each church's actual
          entrance, or see the{" "}
          <a
            href={official.trailGuide}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            Mount of Olives walking route from Enjoy Jerusalem
          </a>
          .
        </p>
      </div>
      <AttractionPracticalTip>
        Tuesday or Thursday morning currently offers the best chance to visit both Pater Noster and
        St Mary Magdalene. Confirm their opening hours before visiting. My{" "}
        <Link to="/attractions/old-city-jerusalem/" className={inlineLink}>
          Jerusalem Old City guide
        </Link>{" "}
        covers the quarters and gates, and the{" "}
        <Link to="/attractions/via-dolorosa/" className={inlineLink}>
          Via Dolorosa walking guide
        </Link>{" "}
        follows the Stations of the Cross inside the walls.
      </AttractionPracticalTip>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      {mountOlivesEditorialUpdate.history.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>
        Jerusalem’s eastern landscape also has a long Muslim and Arab history. The hillside
        neighborhood of At-Tur and the surrounding religious landmarks are part of a living
        community. I recommend visiting with respect for local residents, worshippers and the
        different traditions associated with the area.
      </p>
      <p>
        For a deeper look at the hill’s history, see the{" "}
        <a
          href={official.cemeteryGraves}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          Mount of Olives cemetery heritage project
        </a>{" "}
        and my{" "}
        <Link to="/travel-blog/churches-in-jerusalem/" className={inlineLink}>
          Jerusalem churches guide
        </Link>
        .
      </p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>
        These three tours visit the Mount of Olives. Two focus on the hillside, while the longest
        also explores Jerusalem’s Old City. Check the itinerary, meeting point, admissions, dates
        and accessibility with the provider before booking.
      </p>
      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        data-testid="mount-olives-tour-cards"
      >
        {mountOlivesTours.map((tour) => (
          <div key={tour.id} data-tour-id={tour.id} className="min-w-0">
            <CuratedPartnerTourCard
              title={tour.title}
              description={tour.summary}
              platform={tour.platform}
              duration={tour.duration}
              image={tour.photo}
              alt={tour.alt}
              href={tour.href}
              pageId="mount-of-olives"
              productId={"viator-" + tour.id}
              offerId={"viator-" + tour.id + "-mount-olives"}
              editorialRating={tour.editorialRating}
              editorialPrice={tour.editorialPrice}
            />
          </div>
        ))}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Shown prices and review counts were published by the tour providers and can change. Confirm
        current dates, total price, inclusions, recent reviews and cancellation conditions before
        booking.
      </p>
      <p className="text-sm leading-relaxed">
        For more options,{" "}
        <Link to="/tours/jerusalem/" className={inlineLink}>
          browse Jerusalem guided tours
        </Link>
        .
      </p>
    </div>
  ),
  faqs: [
    {
      q: "Where is the best Mount of Olives viewpoint?",
      a: "The classic open-air panorama is near the Seven Arches Hotel on the ridge, overlooking the Jewish cemetery and Jerusalem's Old City.",
    },
    {
      q: "How long should I allow?",
      a: "Around 30–45 minutes is enough for the panorama. Allow two to three hours for a downhill walk with selected churches, or half a day for a fuller pilgrimage route.",
    },
    {
      q: "Is the Mount of Olives free to visit?",
      a: "The public viewpoint is free. Pater Noster currently lists ₪12 admission (₪10 for students), and the Chapel of the Ascension lists ₪10. Other sites have separate visiting arrangements.",
    },
    {
      q: "Can I visit the churches on Sunday?",
      a: "Gethsemane and the Church of All Nations generally admit visitors on Sunday, and Dominus Flevit has split visiting hours. Pater Noster is closed Sunday, and St Mary Magdalene normally opens for visitors on Tuesday, Thursday and Saturday mornings.",
    },
    {
      q: "Can I walk to the Old City after visiting?",
      a: "Yes. From Gethsemane at the foot of the hill, you can walk towards Lion's Gate. The downhill route from the upper viewpoint is steep and may be unsuitable for some visitors.",
    },
    {
      q: "Is there a wheelchair-accessible route?",
      a: "The traditional downhill pilgrimage path is not a reliably step-free route. Consider separate vehicle approaches for the public viewpoint and Gethsemane, then confirm accessibility with each site.",
    },
    {
      q: "Can I visit the Jewish cemetery?",
      a: "This is an active cemetery with separate sections, funerals and families visiting graves. Access depends on the section and purpose of your visit. The Mount of Olives Information Center currently reports a temporary closure to visitors.",
    },
  ],
  nearby: [
    {
      label: "Jerusalem’s Old City",
      to: "/attractions/old-city-jerusalem/",
      note: "Continue through Lion's Gate to Jerusalem's historic quarters.",
    },
    {
      label: "Churches in Jerusalem",
      to: "/travel-blog/churches-in-jerusalem/",
      note: "See how the Mount of Olives churches relate to sites across the city.",
    },
    {
      label: "Mount Zion",
      to: "/attractions/mount-zion/",
      note: "Visit Dormition Abbey and other hilltop heritage landmarks.",
    },
    {
      label: "Jerusalem travel guide",
      to: "/travel-blog/jerusalem-travel-guide/",
      note: "Plan more time in the city after your Mount of Olives visit.",
    },
    {
      label: "Museums in Jerusalem",
      to: "/travel-blog/museums-in-jerusalem/",
      note: "Discover museums, collections and historic exhibits around the city.",
    },
    {
      label: "Via Dolorosa",
      to: "/attractions/via-dolorosa/",
      note: "Follow the fourteen Stations of the Cross after visiting Gethsemane.",
    },
  ],
  planningLinks: [
    {
      label: "Where to stay in Jerusalem",
      to: "/travel-blog/where-to-stay-in-jerusalem/",
      description: "Choose a base for Old City visits.",
      icon: "region",
    },
    {
      label: "Getting around Israel",
      to: "/travel-blog/getting-around-israel/",
      description: "Plan public transport and other connections.",
      icon: "region",
    },
    {
      label: "Israel’s calendar of events",
      to: "/travel-blog/calendar-of-events/",
      description: "Check dates that may affect church visiting hours.",
      icon: "region",
    },
    {
      label: "Ben Gurion Airport to Jerusalem",
      to: "/travel-blog/ben-gurion-airport-to-jerusalem/",
      description: "Compare airport transfer and train options.",
      icon: "arrival",
    },
    {
      label: "3-day Israel itinerary",
      to: "/travel-blog/israel-itinerary-3-days/",
      description: "Fit Jerusalem into a short visit.",
      icon: "itinerary",
    },
    {
      label: "Private driver in Israel",
      to: "/private-driver-in-israel/",
      description: "Discuss a flexible day and convenient transport.",
      icon: "region",
    },
  ],
  photoCredits: [
    {
      label: "Jewish cemetery photograph",
      credit: "Berthold Werner / Wikimedia Commons · CC BY-SA 3.0; resized and compressed to WebP",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Jerusalem_Mount_of_Olives_BW_2010-09-20_07-57-31.JPG",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
  ],
  sources: [
    {
      label: "Christian Information Center - Holy Land church hours and fees",
      url: official.churchHours,
    },
    { label: "City of David - Mount of Olives visitor access and buses", url: official.cemetery },
    { label: "City of David - cemetery mapping and grave locator", url: official.graveLocator },
    { label: "Mount of Olives cemetery information", url: official.cemeteryGraves },
    { label: "Israel public transportation planner", url: official.transit },
    { label: "City of David - Jerusalem Trail route", url: official.jerusalemWalk },
    { label: "Enjoy Jerusalem - Mount of Olives walking route", url: official.trailGuide },
    { label: "Viator - Jerusalem Mount of Olives Tour", url: mountOlivesTours[0].sourceUrl },
    {
      label: "Viator - Ascension Chapel to Gethsemane guided walk",
      url: mountOlivesTours[1].sourceUrl,
    },
    {
      label: "Viator - Jerusalem Classic Tour, Mount of Olives & Old City",
      url: mountOlivesTours[2].sourceUrl,
    },
  ],
};

export function MountOlivesAttractionPage() {
  return <AttractionDestinationPage content={mountOlivesDestinationContent} />;
}
