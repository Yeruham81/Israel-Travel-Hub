import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { Link, type LinkProps } from "@tanstack/react-router";
import { BedDouble, BookOpen, CalendarDays, CarFront, Landmark, Plane, type LucideIcon } from "lucide-react";
import deadSeaBeach from "@/assets/dead-sea/beach.webp";
import bestTimeGuidePhoto from "@/assets/guides/2026-10/best-time-to-visit-israel.webp";
import deadSeaLandscape from "@/assets/dead-sea/landscape.webp";
import deadSeaHotelPool from "@/assets/dead-sea/pool.webp";

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
    to: "/attractions/dead-sea/",
    photo: deadSeaBeach,
    alt: "Dead Sea beach and water",
  },
  {
    title: "Getting around Israel",
    description: "Compare transport options for the next leg of your journey.",
    to: "/travel-blog/getting-around-israel/",
    photo: "/images/travel-blog/featured-getting-around-israel.webp",
    alt: "Traffic on a busy Israeli highway in the Tel Aviv area",
  },
  {
    title: "Best time to visit Israel",
    description: "Plan around seasonal heat, outdoor conditions and the time of year.",
    to: "/travel-blog/best-time-to-visit-israel/",
    photo: bestTimeGuidePhoto,
    alt: "Seasonal travel scenery in Israel",
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
    title: "Jerusalem travel guide",
    description: "Plan a sightseeing visit to the capital before or after the Dead Sea.",
    to: "/travel-blog/jerusalem-travel-guide/",
    photo: "/images/attractions/jerusalem.webp",
    alt: "Jerusalem Old City and its historic landmarks",
  },
];

const nextSteps: { title: string; description: string; to: LinkProps["to"]; icon: LucideIcon }[] = [
  { title: "Private Driver", description: "Request a quote for a flexible Dead Sea day trip.", to: "/private-driver-in-israel/", icon: CarFront },
  { title: "Masada & Dead Sea Tours", description: "Compare guided excursions and sightseeing trips.", to: "/tours/masada-dead-sea/", icon: Landmark },
  { title: "Dead Sea Hotels", description: "Choose a hotel area for an overnight visit.", to: "/travel-blog/best-dead-sea-hotels/", icon: BedDouble },
  { title: "Airport to Ein Bokek", description: "Plan direct transport from Ben Gurion Airport.", to: "/airport-transfers/ein-bokek/", icon: Plane },
  { title: "Jerusalem Travel Guide", description: "Explore the capital before or after your trip.", to: "/travel-blog/jerusalem-travel-guide/", icon: BookOpen },
  { title: "Israel's Calendar of Events", description: "Check holidays and local events for your dates.", to: "/travel-blog/calendar-of-events/", icon: CalendarDays },
];

export function DeadSeaGuideFollowUps() {
  return <>
    <section aria-labelledby="deadsea-related-h" className="mt-12">
      <h2 id="deadsea-related-h" className="text-2xl font-bold leading-tight sm:text-3xl">Related practical guides</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="deadsea-related-guides">
        {related.map(item => <li key={String(item.to)} className="min-w-0">
          <Link to={item.to} className="editorial-card-link group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <img src={guideHeroPhotoForPath(String(item.to))?.src ?? item.photo} alt={guideHeroPhotoForPath(String(item.to))?.alt ?? item.alt} width={600} height={400} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
            <span className="flex flex-1 flex-col p-4">
              <span className="text-base font-bold leading-snug text-foreground group-hover:text-primary">{item.title}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</span>
              
            </span>
          </Link>
        </li>)}
      </ul>
    </section>
    <section aria-labelledby="deadsea-next-h" className="mt-12" data-testid="deadsea-next-steps">
      <h2 id="deadsea-next-h" className="text-2xl font-bold leading-tight sm:text-3xl">Plan the next part of your trip</h2>

      <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {nextSteps.map(({ title, description, to, icon: Icon }) => <li key={String(to)} className="min-w-0">
          <Link to={to} className="group flex h-full flex-col gap-2 rounded-xl border bg-card p-3.5 transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-secondary/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-4">
            <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <span className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary sm:text-base">{title}</span>
            <span className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{description}</span>
          </Link>
        </li>)}
      </ul>
    </section>
  </>;
}
