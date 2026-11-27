import { createFileRoute } from "@tanstack/react-router";
import { AkkoAttractionPage } from "@/components/AkkoAttractionPage";
import { akkoSite } from "@/data/akkoSite";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const PATH = "/attractions/akko-acre/";

export function akkoMeta() {
  const meta = pageMeta({
    title: akkoSite.title,
    description: akkoSite.description,
    path: PATH,
    type: "article",
    image: akkoSite.hero.src,
    imageAlt: akkoSite.hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "Old Akko", path: PATH },
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
        headline: akkoSite.title,
        description: akkoSite.description,
        inLanguage: "en",
        dateModified: akkoSite.updatedAt,
        author: authorLd(),
        publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
        image: new URL(akkoSite.hero.src, CANONICAL_ORIGIN).href,
        citation: Object.values(akkoSite.official),
      }),
    ],
  };
}

export const Route = createFileRoute("/attractions/akko-acre")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/attractions.akko-acre.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: AkkoAttractionPage,
});
