import { Link, type LinkProps } from "@tanstack/react-router";
import tourPhoto from "@/assets/home/guided-tour-card.webp";

type Related = { title: string; summary: string; to: LinkProps["to"]; photo: string; alt: string };
const related: Related[] = [
  {
    title: "Jerusalem's Old City",
    summary: "Walk through the gates and quarters, and connect Mount Zion with the Jewish and Armenian Quarters.",
    to: "/travel-blog/old-city-jerusalem/",
    photo: "/images/attractions/jerusalem.webp",
    alt: "Jerusalem Old City walls and skyline",
  },
  {
    title: "Churches in Jerusalem",
    summary: "Find other important Christian landmarks and organise a wider Jerusalem pilgrimage.",
    to: "/travel-blog/churches-in-jerusalem/",
    photo: "/images/jerusalem/church-of-all-nations.webp",
    alt: "Church of All Nations at Gethsemane",
  },
  {
    title: "Mount of Olives",
    summary: "The famous lookout, Palm Sunday road, Dominus Flevit and the Garden of Gethsemane.",
    to: "/travel-blog/mount-of-olives/",
    photo: "/images/attractions/mount-of-olives.webp",
    alt: "Mount of Olives hillside with Church of All Nations",
  },
  {
    title: "Jerusalem travel guide",
    summary: "Markets, historic neighbourhoods, local transport and ideas for spending more time in the city.",
    to: "/travel-blog/jerusalem-travel-guide/",
    photo: "/images/attractions/hero-jerusalem.webp",
    alt: "View across Jerusalem",
  },
  {
    title: "Jerusalem tours & day trips",
    summary: "Discover sightseeing itineraries and guided experiences covering the city and its holy places.",
    to: "/tours/jerusalem/",
    photo: tourPhoto,
    alt: "Sightseeing scene",
  },
  {
    title: "Where to stay in Jerusalem",
    summary: "Compare Mamilla, the Old City surroundings, downtown and other accommodation areas.",
    to: "/travel-blog/where-to-stay-in-jerusalem/",
    photo: "/images/city-stays/jerusalem-mamilla.webp",
    alt: "Mamilla area in central Jerusalem",
  },
];

export function MountZionRelatedGuides() {
  return <section aria-labelledby="zion-related-heading" className="mt-12 border-t pt-8" data-testid="mount-zion-related-guides">
    <h2 id="zion-related-heading" className="text-2xl font-semibold sm:text-3xl">Explore more around Jerusalem</h2>
    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">Keep exploring after Mount Zion, or plan the rest of your time in Jerusalem.</p>
    <ul className="mt-5 grid gap-4 sm:grid-cols-2">
      {related.map(item => <li key={String(item.to)}>
        <Link to={item.to} className="group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <img loading="lazy" decoding="async" width={112} height={104} src={item.photo} alt={item.alt} className="h-[104px] w-[112px] shrink-0 rounded-lg object-cover" />
          <span className="flex min-w-0 flex-1 flex-col self-stretch py-0.5">
            <span className="font-semibold leading-snug group-hover:text-primary">{item.title}</span>
            <span className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{item.summary}</span>
            <span className="mt-auto pt-2 text-xs font-semibold text-primary">Read more <span aria-hidden="true">→</span></span>
          </span>
        </Link>
      </li>)}
    </ul>
  </section>;
}
