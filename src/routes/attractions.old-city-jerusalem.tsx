import { createFileRoute } from "@tanstack/react-router";
import { OldCityJerusalemAttractionPage, oldCityJerusalemDestinationContent } from "@/components/OldCityJerusalemAttractionPage";
import { oldCityJerusalemSite } from "@/data/oldCityJerusalemSite";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const PATH = "/attractions/old-city-jerusalem/";

export function oldCityJerusalemMeta() {
  const meta = pageMeta({
    title: oldCityJerusalemSite.title,
    description: oldCityJerusalemSite.description,
    path: PATH,
    type: "article",
    image: oldCityJerusalemSite.hero.src,
    imageAlt: oldCityJerusalemSite.hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "Jerusalem's Old City", path: PATH },
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
      headline: oldCityJerusalemSite.title,
      description: oldCityJerusalemSite.description,
      inLanguage: "en",
      dateModified: oldCityJerusalemSite.updatedAt,
      author: authorLd(),
      publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      image: new URL(oldCityJerusalemSite.hero.src, CANONICAL_ORIGIN).href,
      citation: [...new Set(oldCityJerusalemDestinationContent.sources.map(source => source.url))],
    })],
  };
}

export const Route = createFileRoute("/attractions/old-city-jerusalem")({
  head: oldCityJerusalemMeta,
  component: OldCityJerusalemAttractionPage,
});
