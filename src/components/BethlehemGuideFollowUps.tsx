import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { Link, type LinkProps } from "@tanstack/react-router";
import { BookOpen, CalendarDays, CarFront, Church, Clock, Plane, type LucideIcon } from "lucide-react";
import { christianToursHero } from "@/data/christianToursGuide";
import jerusalemCity from "@/assets/home/jerusalem-old-city.webp";
import oldCity from "@/assets/guides/2026-11/jerusalem-old-city-market-lanes.webp";
import churches from "@/assets/guides/holy-sepulchre.jpg";
import deadSeaRoute from "@/assets/guides/2026-10/jerusalem-to-the-dead-sea.webp";

/** Six illustrated, contextually relevant links, followed by secondary planning. */
const related: { title: string; description: string; to: LinkProps["to"]; image: string; alt: string }[] = [
  { title: "Jerusalem Travel Guide", description: "Plan the city sites and neighbourhoods around a Bethlehem visit.", to: "/travel-blog/jerusalem-travel-guide/", image: jerusalemCity, alt: "Jerusalem Old City skyline" },
  { title: "Jerusalem's Old City", description: "Find Damascus Gate, the historic quarters and walking routes.", to: "/attractions/old-city-jerusalem/", image: oldCity, alt: "Historic market lanes in Jerusalem’s Old City" },
  { title: "Churches in Jerusalem", description: "Explore Christian heritage sites before or after Bethlehem.", to: "/travel-blog/churches-in-jerusalem/", image: churches, alt: "Church of the Holy Sepulchre in Jerusalem" },
  { title: "Jerusalem to the Dead Sea", description: "Compare another popular road excursion, buses and tours.", to: "/travel-blog/jerusalem-to-the-dead-sea/", image: deadSeaRoute, alt: "Road through the desert toward the Dead Sea" },
  { title: "Christian Tours in Israel", description: "Explore biblical sites, pilgrimage routes and guided visits around Israel.", to: "/travel-blog/christian-tours-in-israel/", image: christianToursHero.src, alt: christianToursHero.alt },
  { title: "Where to Stay in Jerusalem", description: "Choose a hotel neighbourhood suited to an early departure.", to: "/travel-blog/where-to-stay-in-jerusalem/", image: "/images/city-stays/jerusalem-downtown.webp", alt: "Jerusalem downtown district" },
];
const next: { title: string; description: string; to: LinkProps["to"]; icon: LucideIcon }[] = [
  { title: "Getting Around Israel", description: "Compare trains, buses, taxis and private travel.", to: "/travel-blog/getting-around-israel/", icon: BookOpen },
  { title: "Israel's Calendar of Events", description: "Check holidays and religious dates.", to: "/travel-blog/calendar-of-events/", icon: CalendarDays },
  { title: "Jerusalem Tours", description: "Compare guided visits and day trips.", to: "/tours/jerusalem/", icon: Church },
  { title: "Best Time to Visit Israel", description: "Plan for seasons and busy dates.", to: "/travel-blog/best-time-to-visit-israel/", icon: Clock },
  { title: "Airport to Jerusalem", description: "Choose your arrival transport from Ben Gurion.", to: "/travel-blog/ben-gurion-airport-to-jerusalem/", icon: Plane },
  { title: "Private Driver in Israel", description: "Discuss a tailored journey to or from Jerusalem.", to: "/private-driver-in-israel/", icon: CarFront },
];

export function BethlehemGuideFollowUps() {
  return <>
    <section aria-labelledby="bethlehem-related-h" className="mt-12" data-testid="bethlehem-related-guides">
      <h2 id="bethlehem-related-h" className="text-2xl font-bold leading-tight sm:text-3xl">Related practical guides</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map(item => <li key={String(item.to)} className="min-w-0">
          <Link to={item.to} className="editorial-card-link group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <img src={guideHeroPhotoForPath(String(item.to))?.src ?? item.image} alt={guideHeroPhotoForPath(String(item.to))?.alt ?? item.alt} width={600} height={400} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
            <span className="flex flex-1 flex-col p-4">
              <span className="text-base font-bold leading-snug text-foreground group-hover:text-primary">{item.title}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</span>
              
            </span>
          </Link>
        </li>)}
      </ul>
    </section>
    <section aria-labelledby="bethlehem-next-h" className="mt-12" data-testid="bethlehem-next-steps">
      <h2 id="bethlehem-next-h" className="text-2xl font-bold leading-tight sm:text-3xl">Plan the next part of your trip</h2>
      <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {next.map(({ title, description, to, icon: Icon }) => <li key={String(to)} className="min-w-0">
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
