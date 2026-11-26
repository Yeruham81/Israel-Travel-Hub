import { mountZionDestinationContent } from "@/components/MountZionAttractionPage";
import { mountZionSite } from "@/data/mountZionSite";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const PATH = "/attractions/mount-zion/";
export function mountZionMeta() {
  const meta = pageMeta({
    title: mountZionSite.title,
    description: mountZionSite.description,
    path: PATH,
    type: "article",
    image: mountZionSite.hero.src,
    imageAlt: mountZionSite.hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "Mount Zion", path: PATH },
    ],
  });
  const url = CANONICAL_ORIGIN + PATH;
  return {
    ...meta,
    scripts: [...meta.scripts, jsonLd({
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": url + "#article",
      mainEntityOfPage: url,
      headline: mountZionSite.title,
      description: mountZionSite.description,
      inLanguage: "en",
      dateModified: mountZionSite.updatedAt,
      author: authorLd(),
      publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      image: new URL(mountZionSite.hero.src, CANONICAL_ORIGIN).href,
      citation: [...new Set(mountZionDestinationContent.sources.map(source => source.url))],
    })],
  };
}
export const routeHead = mountZionMeta;