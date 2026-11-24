import { createFileRoute } from "@tanstack/react-router";
import { ViaDolorosaAttractionPage, viaDolorosaDestinationContent } from "@/components/ViaDolorosaAttractionPage";
import { viaDolorosaSite } from "@/data/viaDolorosaSite";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const PATH = "/attractions/via-dolorosa/";

export function viaDolorosaMeta() {
  const meta = pageMeta({
    title: viaDolorosaSite.title,
    description: viaDolorosaSite.description,
    path: PATH,
    type: "article",
    image: viaDolorosaSite.hero.src,
    imageAlt: viaDolorosaSite.hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "Via Dolorosa", path: PATH },
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
      headline: viaDolorosaSite.title,
      description: viaDolorosaSite.description,
      inLanguage: "en",
      dateModified: viaDolorosaSite.updatedAt,
      author: authorLd(),
      publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      image: new URL(viaDolorosaSite.hero.src, CANONICAL_ORIGIN).href,
      citation: [...new Set(viaDolorosaDestinationContent.sources.map(source => source.url))],
    })],
  };
}

export const Route = createFileRoute("/attractions/via-dolorosa")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/attractions.via-dolorosa.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: ViaDolorosaAttractionPage,
});
