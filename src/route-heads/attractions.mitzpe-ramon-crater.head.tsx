import { ramonCraterSite } from "@/data/ramonCraterSite";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const PATH = "/attractions/mitzpe-ramon-crater/";
export function ramonCraterMeta() {
  const meta = pageMeta({
    title: ramonCraterSite.title,
    description: ramonCraterSite.description,
    path: PATH,
    type: "article",
    image: ramonCraterSite.hero.src,
    imageAlt: ramonCraterSite.hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "Ramon Crater", path: PATH },
    ],
  });
  const url = CANONICAL_ORIGIN + PATH;
  return {
    ...meta,
    scripts: [
      ...meta.scripts,
      jsonLd({
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": url + "#article",
        mainEntityOfPage: url,
        headline: ramonCraterSite.title,
        description: ramonCraterSite.description,
        inLanguage: "en",
        dateModified: ramonCraterSite.updatedAt,
        author: authorLd(),
        publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
        image: new URL(ramonCraterSite.hero.src, CANONICAL_ORIGIN).href,
        citation: Object.values(ramonCraterSite.sources),
      }),
    ],
  };
}
export const routeHead = ramonCraterMeta;
