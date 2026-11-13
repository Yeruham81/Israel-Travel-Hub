import { Link, type LinkProps } from "@tanstack/react-router";
import deadSeaBeach from "@/assets/dead-sea/beach.webp";
import masada from "@/assets/home/masada-dead-sea.webp";
import einGediIbex from "@/assets/guides/ein-gedi-ibex.webp";
import deadSeaLandscape from "@/assets/dead-sea/landscape.webp";
import deadSeaHotelPool from "@/assets/dead-sea/pool.webp";
import jerusalemOldCity from "@/assets/jerusalem/old-city.webp";

/** Six focused guide cards with local, relevant photographs, followed by
 * genuinely useful onward planning links. Specific to the Jerusalem–Dead Sea
 * page; do not alter the established layouts of other Jerusalem guides.
 */
const related: {
  title: string;
  description: string;
  to: LinkProps["to"];
  photo: string;
  alt: string;
}[] = [
  {
    title: "Dead Sea visitor guide",
    description: "Explore beaches, facilities, floating tips and useful visitor information.",
    to: "/travel-blog/the-dead-sea/",
    photo: deadSeaBeach,
    alt: "Dead Sea beach and water",
  },
  {
    title: "Visiting Masada",
    description: "Plan the park entrance, opening hours and cable car.",
    to: "/travel-blog/masada/",
    photo: masada,
    alt: "Masada plateau above the Dead Sea",
  },
  {
    title: "Ein Gedi Nature Reserve",
    description: "Discover the reserve's waterfalls, green trails and desert wildlife.",
    to: "/travel-blog/ein-gedi/",
    photo: einGediIbex,
    alt: "Nubian ibex near a stream in Ein Gedi Nature Reserve",
  },
  {
    title: "Dead Sea attractions",
    description: "Choose the stops that suit your time, interests and route.",
    to: "/travel-blog/dead-sea-attractions/",
    photo: deadSeaLandscape,
    alt: "Desert mountains and the Dead Sea",
  },
  {
    title: "Where to stay at the Dead Sea",
    description: "Compare the Ein Bokek hotel area with other locations.",
    to: "/travel-blog/best-dead-sea-hotels/",
    photo: deadSeaHotelPool,
    alt: "Pool at a Dead Sea resort",
  },
  {
    title: "Day trips from Jerusalem",
    description: "Compare the Dead Sea with other realistic day trips.",
    to: "/travel-blog/day-trips-from-jerusalem/",
    photo: jerusalemOldCity,
    alt: "Jerusalem Old City skyline",
  },
];

const nextSteps: { title: string; description: string; to: LinkProps["to"]; action: string }[] = [
  {
    title: "Arriving from Ben Gurion Airport?",
    description: "Find ways to reach the Ein Bokek hotel area directly from the airport.",
    to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/",
    action: "Airport to Ein Bokek",
  },
  {
    title: "When is the best time to visit Israel?",
    description: "Plan around seasonal weather, holidays and major travel periods.",
    to: "/travel-blog/best-time-to-visit-israel/",
    action: "Israel travel seasons",
  },
  {
    title: "Plan more of Jerusalem",
    description: "Find places to visit before or after your Dead Sea excursion.",
    to: "/travel-blog/jerusalem-travel-guide/",
    action: "Read Jerusalem guide",
  },
  {
    title: "Choose a Jerusalem hotel area",
    description: "Consider where to stay for an early departure or late return.",
    to: "/travel-blog/where-to-stay-in-jerusalem/",
    action: "Where to stay in Jerusalem",
  },
];

export function DeadSeaGuideFollowUps() {
  return <>
    <section aria-labelledby="deadsea-related-h" className="mt-12">
      <h2 id="deadsea-related-h" className="text-2xl font-bold leading-tight sm:text-3xl">Related practical guides</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="deadsea-related-guides">
        {related.map(item => <li key={String(item.to)} className="min-w-0">
          <Link to={item.to} className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <img src={item.photo} alt={item.alt} width={600} height={400} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
            <span className="flex flex-1 flex-col p-4">
              <span className="text-base font-bold leading-snug text-foreground group-hover:text-primary">{item.title}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</span>
              <span className="mt-3 text-sm font-semibold text-primary">Read guide</span>
            </span>
          </Link>
        </li>)}
      </ul>
    </section>
    <section aria-labelledby="deadsea-next-h" className="mt-12" data-testid="deadsea-next-steps">
      <h2 id="deadsea-next-h" className="text-2xl font-bold leading-tight sm:text-3xl">Plan the next part of your trip</h2>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {nextSteps.map(item => <li key={String(item.to)}>
          <Link to={item.to} className="group flex h-full flex-col rounded-xl border bg-card p-4 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <span className="font-semibold text-foreground group-hover:text-primary">{item.title}</span>
            <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</span>
            <span className="mt-3 text-sm font-semibold text-primary">{item.action} →</span>
          </Link>
        </li>)}
      </ul>
    </section>
  </>;
}
