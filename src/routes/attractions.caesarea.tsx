import { createFileRoute } from "@tanstack/react-router";
import { CaesareaAttractionPage } from "@/components/CaesareaAttractionPage";
import { caesareaSite } from "@/data/caesareaSite";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import caesareaSharePhoto from "@/assets/home/hero-caesarea-coast-desktop.jpg";

const PATH = "/attractions/caesarea/";

export function caesareaMeta() {
  const meta = pageMeta({
    title: caesareaSite.title,
    description: caesareaSite.description,
    path: PATH,
    type: "article",
    image: caesareaSharePhoto,
    imageAlt: "Aerial panorama of Caesarea National Park and its ancient Mediterranean harbor",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "Caesarea", path: PATH },
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
      headline: caesareaSite.title,
      description: caesareaSite.description,
      inLanguage: "en",
      dateModified: caesareaSite.updatedAt,
      author: authorLd(),
      publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      image: new URL(caesareaSharePhoto, CANONICAL_ORIGIN).href,
      citation: Object.values(caesareaSite.sources),
    })],
  };
}

export const Route = createFileRoute("/attractions/caesarea")({
  head: caesareaMeta,
  component: CaesareaAttractionPage,
});
