import { useState } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import {
  type CityStayGuide,
  type NeighborhoodStayGuide,
  type StayPreference,
  preferenceLabels,
} from "@/data/content";
import { areaArrivalSignals } from "@/data/localEditorialInsights";
import { INFO_CHECK_DATE } from "@/data/registry";
import { GuideHeader, OnThisPage, FaqList, SourceList } from "@/components/Guide";
import { StayBookingChecklist } from "@/components/StayBookingChecklist";
import { JerusalemHotelBrowser } from "@/components/JerusalemHotelBrowser";
import { JerusalemNeighborhoodGuideCallout } from "@/components/JerusalemNeighborhoodGuideCallout";
import { StayTripLinks } from "@/components/StayTripLinks";
import { HomeContactForm } from "@/components/HomeContactForm";
import { guideContactCopy } from "@/lib/guide-contact";
import { CityHotelPhotoCredits } from "@/components/CityHotelPhotoCredits";
import { AreaPhotoCredit } from "@/components/AreaMap";
import jerusalemHeroPhoto from "@/assets/home/hero-refresh-jerusalem-jaffa-gate-v4-medium.webp";

const pageSections = [
  ["book", "Hotels"],
  ["areas", "Neighborhoods"],
  ["compare", "Compare areas"],
  ["area-guide", "Where to stay"],
  ["checklist", "Booking tips"],
  ["faq", "FAQ"],
  ["explore", "Local guides"],
  ["trip-planning", "Trip planning"],
  ["contact", "Contact me"],
] as const;

export function JerusalemStayHub({
  g,
  areas,
}: {
  g: CityStayGuide;
  areas: NeighborhoodStayGuide[];
}) {
  const [preference, setPreference] = useState<StayPreference | null>(null);
  const preferences: StayPreference[] = [
    "first-visit",
    "car-free",
    "heritage",
    "luxury",
    "family",
    "quiet",
  ];
  const visibleAreas = preference ? areas.filter((area) => area.suits.includes(preference)) : areas;

  return (
    <main className="pb-10" data-testid="jerusalem-stay-hub">
      <GuideHeader
        crumbs={[
          { name: "Home", to: "/" },
          { name: "Accommodation", to: "/accommodation/" },
          { name: "Jerusalem", to: g.path as LinkProps["to"] },
        ]}
        eyebrow="Accommodation · Jerusalem"
        title={g.title}
        intro={g.intro}
        checkedAt={g.reviewedAt || INFO_CHECK_DATE}
        image={{ src: jerusalemHeroPhoto, alt: "Jaffa Gate and Jerusalem Old City walls" }}
      />
      <OnThisPage sections={pageSections} />
      <article className="mx-auto max-w-5xl px-4">
        <JerusalemHotelBrowser />

        <section id="areas" aria-labelledby="areas-h" className="mt-12 scroll-mt-28">
          <h2 id="areas-h" className="text-2xl font-semibold sm:text-3xl">
            Choose your Jerusalem neighborhood
          </h2>
          <p className="mt-3 w-full text-pretty leading-relaxed text-muted-foreground">
            Explore hotels in six Jerusalem neighborhoods and filter by your preferred travel style.
          </p>
          <div
            className="mt-5 flex flex-wrap gap-2"
            role="group"
            aria-label="Choose areas by travel style"
          >
            <button
              type="button"
              className="chip"
              aria-pressed={preference === null}
              onClick={() => setPreference(null)}
            >
              All areas
            </button>
            {preferences.map((pref) => (
              <button
                key={pref}
                type="button"
                className="chip"
                aria-pressed={preference === pref}
                onClick={() => setPreference(preference === pref ? null : pref)}
              >
                {preferenceLabels[pref]}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground" role="status" aria-live="polite">
            {visibleAreas.length} {visibleAreas.length === 1 ? "area" : "areas"}
            {preference ? " for " + preferenceLabels[preference].toLowerCase() : " to explore"}
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {visibleAreas.map((area) => (
              <li key={area.id} data-testid="neighborhood-card" className="min-w-0">
                <Link
                  to={area.path as LinkProps["to"]}
                  aria-label={"Explore " + area.name + ": area guide and hotel recommendations"}
                  className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-secondary/20 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="block min-w-0 overflow-hidden bg-muted">
                    <img
                      src={area.photo.src}
                      alt={area.photo.alt}
                      width={755}
                      height={503}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-4">
                    <span className="text-xs font-medium text-muted-foreground">
                      {area.bestFor}
                    </span>
                    <h3 className="mt-1 text-base font-semibold leading-snug sm:text-lg">
                      {area.name}
                    </h3>
                    <span className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {area.summary}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex gap-3 rounded-xl border border-amber-200/60 bg-amber-50/60 p-4 dark:border-amber-400/20 dark:bg-amber-500/5">
              <Lightbulb
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400"
                aria-hidden
              />
              <p className="text-sm leading-relaxed">
                <strong>Consider the walk to your hotel.</strong> Jerusalem is hilly, and the
                nearest taxi stop or light-rail station may still be uphill from your hotel.
              </p>
            </div>
            <div className="flex gap-3 rounded-xl border border-amber-200/60 bg-amber-50/60 p-4 dark:border-amber-400/20 dark:bg-amber-500/5">
              <Lightbulb
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400"
                aria-hidden
              />
              <p className="text-sm leading-relaxed">
                <strong>Check your dates.</strong> Shabbat and{" "}
                <Link
                  to="/travel-blog/calendar-of-events/"
                  className="font-semibold text-primary underline underline-offset-2"
                >
                  Jewish holidays
                </Link>{" "}
                can affect transport and dining in West Jerusalem; other neighborhoods may follow
                different schedules.
              </p>
            </div>
          </div>
        </section>

        <section id="compare" aria-labelledby="compare-h" className="mt-12 scroll-mt-28">
          <h2 id="compare-h" className="text-2xl font-semibold sm:text-3xl">
            Compare areas in Jerusalem
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Compare accommodation styles and luggage access across Jerusalem's neighborhoods. My
            Where to Stay guide explores each area in greater detail.
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border bg-card">
            <div
              className="overflow-x-auto"
              role="region"
              aria-label="Jerusalem neighborhood comparison"
              tabIndex={0}
            >
              <table className="w-full min-w-[680px] text-left text-sm">
                <caption className="sr-only">
                  Jerusalem neighborhoods, ideal guests, arrival considerations and tradeoffs
                </caption>
                <thead className="bg-secondary">
                  <tr>
                    {["Area", "Accommodation", "Arriving with bags", "Hotels"].map((label) => (
                      <th key={label} scope="col" className="px-4 py-3 font-semibold">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {areas.map((area) => (
                    <tr key={area.id}>
                      <th scope="row" className="px-4 py-3 font-semibold">
                        {area.shortName}
                      </th>
                      <td className="px-4 py-3">{area.priceLevel}</td>
                      <td className="max-w-60 px-4 py-3">
                        {areaArrivalSignals[area.id] || area.arrivalTips[0]}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={area.path as LinkProps["to"]}
                          className="font-semibold text-primary underline underline-offset-2"
                        >
                          Browse hotels
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <JerusalemNeighborhoodGuideCallout />

        <section id="checklist" aria-labelledby="checklist-h" className="mt-12 scroll-mt-28">
          <h2 id="checklist-h" className="text-2xl font-semibold sm:text-3xl">
            Before you book
          </h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
            Check the exact hotel entrance and walking route, especially near the Old City, and
            compare the final price and cancellation terms.
          </p>
          <StayBookingChecklist
            groups={[
              { title: "Location & arrival", items: g.checklist.slice(0, 4) },
              {
                title: "Room & booking conditions",
                items: [
                  "Confirm bed setup and guest occupancy",
                  "Check the total price, taxes and breakfast",
                  "Review cancellation and payment terms",
                  "Verify parking and step-free access where needed",
                ],
              },
            ]}
          />
        </section>

        <FaqList faqs={g.faqs} compact />
        <StayTripLinks region="jerusalem" currentPath={g.path} />
        <HomeContactForm
          showTripadvisorBesidePortraitMobile
          guide={guideContactCopy(g.title, "accommodation", g.city)}
        />
        <SourceList ids={g.sourceIds} />
        <AreaPhotoCredit areas={areas} />
        <CityHotelPhotoCredits city="jerusalem" />
      </article>
    </main>
  );
}
