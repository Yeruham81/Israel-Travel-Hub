import { Link } from "@tanstack/react-router";
import type { AttractionRegionLink } from "@/data/attractionRegionLinks";

/**
 * Topic-level backlinks to existing Attractions sections.
 * No extra pages, stale opening hours, or duplicated guide snippets.
 */
export function AttractionRegionTrail({
  links,
}: {
  links: readonly AttractionRegionLink[];
}) {
  if (!links.length) return null;
  return (
    <nav aria-label="Attractions and sights in these areas" className="mt-5 border-y py-4">
      <p className="text-sm font-semibold">Explore the sights before planning your route</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {links.map((item) => (
          <li key={item.hash}>
            <Link to="/attractions/" hash={item.hash} className="chip">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
