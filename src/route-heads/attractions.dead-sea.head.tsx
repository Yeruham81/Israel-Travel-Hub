import { DeadSeaAttractionPage, deadSeaSite } from "@/components/DeadSeaAttractionPage";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const PATH = "/attractions/dead-sea/";
export function deadSeaMeta() {
  const meta = pageMeta({
    title: deadSeaSite.title,
    description: deadSeaSite.description,
    path: PATH,
    type: "article",
    image: deadSeaSite.hero.src,
    imageAlt: deadSeaSite.hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "The Dead Sea", path: PATH },
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
      headline: deadSeaSite.title,
      description: deadSeaSite.description,
      inLanguage: "en",
      dateModified: deadSeaSite.updatedAt,
      author: authorLd(),
      publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      image: new URL(deadSeaSite.hero.src, CANONICAL_ORIGIN).href,
      citation: Object.values(deadSeaSite.sources).filter((u, i, all) => all.indexOf(u) === i),
    })],
  };
}
export const routeHead = deadSeaMeta;