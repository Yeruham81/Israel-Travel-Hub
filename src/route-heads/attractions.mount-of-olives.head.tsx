import { mountOlivesDestinationContent } from "@/components/MountOlivesAttractionPage";
import { mountOlivesSite } from "@/data/mountOlivesSite";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const PATH = "/attractions/mount-of-olives/";
export function mountOlivesMeta() {
  const meta = pageMeta({
    title: mountOlivesSite.title,
    description: mountOlivesSite.description,
    path: PATH,
    type: "article",
    image: mountOlivesSite.hero.src,
    imageAlt: mountOlivesSite.hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "Mount of Olives", path: PATH },
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
      headline: mountOlivesSite.title,
      description: mountOlivesSite.description,
      inLanguage: "en",
      dateModified: mountOlivesSite.updatedAt,
      author: authorLd(),
      publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      image: new URL(mountOlivesSite.hero.src, CANONICAL_ORIGIN).href,
      citation: [...new Set(mountOlivesDestinationContent.sources.map(source => source.url))],
    })],
  };
}
export const routeHead = mountOlivesMeta;