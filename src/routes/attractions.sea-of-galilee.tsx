import { createFileRoute } from "@tanstack/react-router";
import { SeaOfGalileeAttractionPage, seaOfGalileeSite } from "@/components/SeaOfGalileeAttractionPage";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const PATH = "/attractions/sea-of-galilee/";

export function seaOfGalileeMeta() {
  const meta = pageMeta({
    title: seaOfGalileeSite.title,
    description: seaOfGalileeSite.description,
    path: PATH,
    type: "article",
    image: seaOfGalileeSite.hero.src,
    imageAlt: seaOfGalileeSite.hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "Sea of Galilee", path: PATH },
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
      headline: seaOfGalileeSite.title,
      description: seaOfGalileeSite.description,
      inLanguage: "en",
      dateModified: seaOfGalileeSite.updatedAt,
      author: authorLd(),
      publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      image: new URL(seaOfGalileeSite.hero.src, CANONICAL_ORIGIN).href,
      citation: Object.values(seaOfGalileeSite.sources).filter((value, index, all) => all.indexOf(value) === index),
    })],
  };
}

export const Route = createFileRoute("/attractions/sea-of-galilee")({
  head: seaOfGalileeMeta,
  component: SeaOfGalileeAttractionPage,
});
