import { createFileRoute } from "@tanstack/react-router";
import { EilatAttractionPage, eilatDestinationContent } from "@/components/EilatAttractionPage";
import { eilatSite } from "@/data/eilatSite";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const PATH = "/attractions/eilat/";

export function eilatMeta() {
  const meta = pageMeta({
    title: eilatSite.title,
    description: eilatSite.description,
    path: PATH,
    type: "article",
    image: eilatSite.hero.src,
    imageAlt: eilatSite.hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "Eilat", path: PATH },
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
      headline: eilatSite.title,
      description: eilatSite.description,
      inLanguage: "en",
      dateModified: eilatSite.updatedAt,
      author: authorLd(),
      publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      image: new URL(eilatSite.hero.src, CANONICAL_ORIGIN).href,
      citation: eilatDestinationContent.sources.map(source => source.url),
    })],
  };
}

export const Route = createFileRoute("/attractions/eilat")({
  head: eilatMeta,
  component: EilatAttractionPage,
});
