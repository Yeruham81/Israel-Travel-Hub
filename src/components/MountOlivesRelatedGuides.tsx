import { Link, type LinkProps } from "@tanstack/react-router";
import mountZion from "@/assets/guides/mount-zion.jpg";
import tourPhoto from "@/assets/home/guided-tour-card.webp";

const related: { title: string; summary: string; to: LinkProps["to"]; photo: string; alt: string }[] = [
  {
    title: "Walking through Jerusalem's Old City",
    summary: "Choose your gate, explore the quarters and plan a route from Lion's Gate.",
    to: "/travel-blog/old-city-jerusalem/",
    photo: "/images/attractions/jerusalem.webp",
    alt: "View across Jerusalem Old City",
  },
  {
    title: "Churches in Jerusalem",
    summary: "A practical guide to Christian sites around the Old City, Mount Zion and Ein Karem.",
    to: "/travel-blog/churches-in-jerusalem/",
    photo: "/images/jerusalem/church-of-all-nations.webp",
    alt: "Church of All Nations in Jerusalem",
  },
  {
    title: "Mount Zion",
    summary: "See the traditional Last Supper Room, Dormition Abbey and St Peter in Gallicantu.",
    to: "/travel-blog/mount-zion/",
    photo: mountZion,
    alt: "Dormition Abbey on Mount Zion",
  },
  {
    title: "Jerusalem travel guide",
    summary: "Plan the rest of your stay, including markets, museums, transport and neighbourhoods.",
    to: "/travel-blog/jerusalem-travel-guide/",
    photo: "/images/attractions/hero-jerusalem.webp",
    alt: "Panorama of Jerusalem's historic centre",
  },
  {
    title: "Jerusalem tours & day trips",
    summary: "Browse sightseeing routes and guided experiences offered by independent operators.",
    to: "/tours/jerusalem/",
    photo: tourPhoto,
    alt: "Jerusalem sightseeing tour scene",
  },
  {
    title: "Where to stay in Jerusalem",
    summary: "Compare hotel areas near the Old City, Mamilla, downtown and other neighbourhoods.",
    to: "/travel-blog/where-to-stay-in-jerusalem/",
    photo: "/images/city-stays/jerusalem-mamilla.webp",
    alt: "Jerusalem Mamilla and Old City district",
  },
];

export function MountOlivesRelatedGuides() {
  return <section aria-labelledby="olives-related-heading" className="mt-12 border-t pt-8" data-testid="mount-olives-related-guides">
    <h2 id="olives-related-heading" className="text-2xl font-semibold sm:text-3xl">Explore more around Jerusalem</h2>
    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">Continue into the Old City, choose another sacred site or plan the rest of your stay.</p>
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
