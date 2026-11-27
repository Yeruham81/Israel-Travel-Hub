import { mosheBarakAuthor } from "@/data/site-identity";
import { CANONICAL_ORIGIN } from "@/lib/site";

export function authorLd() {
  return {
    "@type": "Person",
    "@id": `${CANONICAL_ORIGIN}/about-me/#moshe-barak`,
    name: mosheBarakAuthor.name,
    url: `${CANONICAL_ORIGIN}/about-me/#moshe-barak`,
    description: [mosheBarakAuthor.experience, mosheBarakAuthor.bio].filter(Boolean).join(" "),
    sameAs: [mosheBarakAuthor.reviewsUrl],
  };
}
