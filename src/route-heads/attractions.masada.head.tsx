import { masadaSite } from "@/data/masadaSite";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const PATH = "/attractions/masada/";
export function masadaMeta() {
  const meta = pageMeta({
    title: masadaSite.title,
    description: masadaSite.description,
    path: PATH,
    type: "article",
    image: masadaSite.hero.src,
    imageAlt: masadaSite.hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "Masada", path: PATH },
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
      headline: masadaSite.title,
      description: masadaSite.description,
      inLanguage: "en",
      dateModified: masadaSite.updatedAt,
      author: authorLd(),
      publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      image: new URL(masadaSite.hero.src, CANONICAL_ORIGIN).href,
      citation: Object.values(masadaSite.sources),
    })],
  };
}
export const routeHead = masadaMeta;