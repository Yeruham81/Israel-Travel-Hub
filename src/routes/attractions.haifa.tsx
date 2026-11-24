import { createFileRoute } from "@tanstack/react-router";
import { HaifaAttractionPage } from "@/components/HaifaAttractionPage";
import { haifaSite } from "@/data/haifaSite";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const PATH = "/attractions/haifa/";

export function haifaMeta() {
  const meta = pageMeta({
    title: haifaSite.title,
    description: haifaSite.description,
    path: PATH,
    type: "article",
    image: haifaSite.hero.src,
    imageAlt: haifaSite.hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "Haifa", path: PATH },
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
      headline: haifaSite.title,
      description: haifaSite.description,
      inLanguage: "en",
      dateModified: haifaSite.updatedAt,
      author: authorLd(),
      publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      image: new URL(haifaSite.hero.src, CANONICAL_ORIGIN).href,
      citation: Object.values(haifaSite.official),
    })],
  };
}

export const Route = createFileRoute("/attractions/haifa")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/attractions.haifa.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: HaifaAttractionPage,
});
