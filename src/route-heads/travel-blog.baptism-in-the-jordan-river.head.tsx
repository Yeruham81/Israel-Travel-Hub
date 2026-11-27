import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import {
  BAPTISM_PATH,
  BAPTISM_TITLE,
  BAPTISM_DESCRIPTION,
  BAPTISM_UPDATED,
  BAPTISM_HERO,
  baptismFaqs,
  baptismSources,
} from "@/data/jordanRiverBaptism";

export const routeHead = () => {
  const meta = pageMeta({
    title: BAPTISM_TITLE,
    description: BAPTISM_DESCRIPTION,
    path: BAPTISM_PATH,
    type: "article",
    image: BAPTISM_HERO.src,
    imageAlt: BAPTISM_HERO.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Travel guides", path: "/travel-blog/" },
      { name: "Jordan River baptism", path: BAPTISM_PATH },
    ],
  });
  return {
    ...meta,
    scripts: [
      ...meta.scripts,
      jsonLd({
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": CANONICAL_ORIGIN + BAPTISM_PATH + "#article",
        headline: BAPTISM_TITLE,
        description: BAPTISM_DESCRIPTION,
        mainEntityOfPage: CANONICAL_ORIGIN + BAPTISM_PATH,
        inLanguage: "en",
        dateModified: BAPTISM_UPDATED,
        author: authorLd(),
        publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
        image: new URL(BAPTISM_HERO.src, CANONICAL_ORIGIN).href,
        citation: baptismSources.map((source) => source.url),
      }),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: baptismFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }),
    ],
  };
};
