import { Link, type LinkProps } from "@tanstack/react-router";
import { SiteLink } from "@/components/SiteLink";
import deadSeaBeach from "@/assets/dead-sea/beach.webp";
import masada from "@/assets/home/masada-dead-sea.webp";
import einGedi from "@/assets/dead-sea/ein-gedi.webp";
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
    description: "Find managed beaches, facilities and useful arrival tips.",
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
    description: "Check which trails are open before planning a hike.",
    to: "/travel-blog/ein-gedi/",
    photo: einGedi,
    alt: "Green oasis landscape at Ein Gedi",
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
    title: "Explore Masada & Dead Sea tours",
    description: "Compare itineraries and check pickup city, tickets and beach time.",
    to: "/tours/masada-dead-sea/",
    action: "Compare tours",
  },
  {
    title: "Arrange a private driver",
    description: "Request a quote for hotel pickup, sightseeing stops and the return.",
    to: "/private-driver/",
    action: "Request a quote",
  },
  {
    title: "Consider renting a car",
    description: "Compare Israel rental offers if you prefer to plan the drive yourself.",
    to: "/car-rental/",
    action: "Compare rental cars",
  },
  {
    title: "Plan your Jerusalem stay",
    description: "Choose a hotel area that works with your departure and return.",
    to: "/travel-blog/where-to-stay-in-jerusalem/",
    action: "Read the hotel guide",
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
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">Choose a practical next step once you know which Dead Sea destination you want to visit.</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {nextSteps.map(item => <li key={String(item.to)}>
          <SiteLink to={item.to} className="group flex h-full flex-col rounded-xl border bg-card p-4 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <span className="font-semibold text-foreground group-hover:text-primary">{item.title}</span>
            <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</span>
            <span className="mt-3 text-sm font-semibold text-primary">{item.action} →</span>
          </SiteLink>
        </li>)}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">The car-rental comparison is an affiliate link. I may earn a commission at no extra cost to you.</p>
    </section>
  </>;
}
