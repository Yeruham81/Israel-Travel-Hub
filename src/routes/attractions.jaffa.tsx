import { createFileRoute } from "@tanstack/react-router";
import { JaffaAttractionPage } from "@/components/JaffaAttractionPage";
import { jaffaSite } from "@/data/jaffaSite";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const PATH = "/attractions/jaffa/";

export function jaffaMeta() {
  const meta = pageMeta({
    title: jaffaSite.title,
    description: jaffaSite.description,
    path: PATH,
    type: "article",
    image: jaffaSite.hero.src,
    imageAlt: jaffaSite.hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "Old Jaffa", path: PATH },
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
      headline: jaffaSite.title,
      description: jaffaSite.description,
      inLanguage: "en",
      dateModified: jaffaSite.updatedAt,
      author: authorLd(),
      publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      image: new URL(jaffaSite.hero.src, CANONICAL_ORIGIN).href,
      citation: [
        jaffaSite.official.oldJaffa,
        jaffaSite.official.municipality,
        jaffaSite.official.municipalWalkingMap,
        jaffaSite.official.museum,
        jaffaSite.official.nalagaat,
      ],
    })],
  };
}

export const Route = createFileRoute("/attractions/jaffa")({
  head: jaffaMeta,
  component: JaffaAttractionPage,
});
