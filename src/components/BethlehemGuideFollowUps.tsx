import { Link, type LinkProps } from "@tanstack/react-router";
import jerusalemCity from "@/assets/home/jerusalem-old-city.webp";
import oldCity from "@/assets/jerusalem/old-city.webp";
import churches from "@/assets/guides/holy-sepulchre.jpg";
import deadSeaRoute from "@/assets/guides/2026-10/jerusalem-to-the-dead-sea.webp";
import masada from "@/assets/home/masada-dead-sea.webp";

/** Six illustrated, contextually relevant links, followed by secondary planning. */
const related: { title: string; description: string; to: LinkProps["to"]; image: string; alt: string }[] = [
  { title: "Jerusalem Travel Guide", description: "Plan the city sites and neighbourhoods around a Bethlehem visit.", to: "/travel-blog/jerusalem-travel-guide/", image: jerusalemCity, alt: "Jerusalem Old City skyline" },
  { title: "Jerusalem's Old City", description: "Find Damascus Gate, the historic quarters and walking routes.", to: "/travel-blog/old-city-jerusalem/", image: oldCity, alt: "Jerusalem Old City stone streets and walls" },
  { title: "Churches in Jerusalem", description: "Explore Christian heritage sites before or after Bethlehem.", to: "/travel-blog/churches-in-jerusalem/", image: churches, alt: "Church of the Holy Sepulchre in Jerusalem" },
  { title: "Jerusalem to the Dead Sea", description: "Compare another popular road excursion, buses and tours.", to: "/travel-blog/jerusalem-to-the-dead-sea/", image: deadSeaRoute, alt: "Road through the desert toward the Dead Sea" },
  { title: "Day Trips from Jerusalem", description: "Compare Bethlehem with Masada, the Dead Sea and other day visits.", to: "/travel-blog/day-trips-from-jerusalem/", image: masada, alt: "Masada overlooking the Dead Sea" },
  { title: "Where to Stay in Jerusalem", description: "Choose a hotel neighbourhood suited to an early departure.", to: "/travel-blog/where-to-stay-in-jerusalem/", image: "/images/city-stays/jerusalem-downtown.webp", alt: "Jerusalem downtown district" },
];
const next: {title:string;description:string;to:LinkProps["to"];action:string}[] = [
  { title:"Getting Around Israel", description:"Plan buses, tickets, taxis and onward travel elsewhere in Israel.", to:"/travel-blog/getting-around-israel/", action:"Read the transport guide" },
  { title:"Israel's Calendar of Events", description:"Check religious dates and holidays that may affect visiting hours.", to:"/travel-blog/calendar-of-events/", action:"Check important dates" },
  { title:"Jerusalem Tours", description:"Explore other locally arranged guided visits in Jerusalem.", to:"/tours/jerusalem/", action:"Browse Jerusalem tours" },
  { title:"Best Time to Visit Israel", description:"Plan around seasonal weather, holidays and busy travel periods.", to:"/travel-blog/best-time-to-visit-israel/", action:"Choose your travel season" },
];

export function BethlehemGuideFollowUps() {
  return <>
    <section aria-labelledby="bethlehem-related-h" className="mt-12" data-testid="bethlehem-related-guides">
      <h2 id="bethlehem-related-h" className="text-2xl font-bold leading-tight sm:text-3xl">Related practical guides</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map(item => <li key={String(item.to)} className="min-w-0">
          <Link to={item.to} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <img src={item.image} alt={item.alt} width={600} height={400} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
            <span className="flex flex-1 flex-col p-4">
              <span className="text-base font-bold leading-snug text-foreground group-hover:text-primary">{item.title}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</span>
              <span className="mt-3 text-sm font-semibold text-primary">Read guide</span>
            </span>
          </Link>
        </li>)}
      </ul>
    </section>
    <section aria-labelledby="bethlehem-next-h" className="mt-12" data-testid="bethlehem-next-steps">
      <h2 id="bethlehem-next-h" className="text-2xl font-bold leading-tight sm:text-3xl">Plan the next part of your trip</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {next.map(item => <li key={String(item.to)}>
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
