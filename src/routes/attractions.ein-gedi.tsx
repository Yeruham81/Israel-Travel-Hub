import { createFileRoute } from "@tanstack/react-router";
import { EinGediAttractionPage } from "@/components/EinGediAttractionPage";
import { einGediSite } from "@/data/einGediSite";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const PATH = "/attractions/ein-gedi/";

export function einGediMeta() {
  const meta = pageMeta({
    title: einGediSite.title,
    description: einGediSite.description,
    path: PATH,
    type: "article",
    image: einGediSite.hero.src,
    imageAlt: einGediSite.hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "Ein Gedi Nature Reserve", path: PATH },
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
      headline: einGediSite.title,
      description: einGediSite.description,
      inLanguage: "en",
      dateModified: einGediSite.updatedAt,
      author: authorLd(),
      publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      image: new URL(einGediSite.hero.src, CANONICAL_ORIGIN).href,
      citation: Object.values(einGediSite.sources),
    })],
  };
}

export const Route = createFileRoute("/attractions/ein-gedi")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/attractions.ein-gedi.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: EinGediAttractionPage,
});
