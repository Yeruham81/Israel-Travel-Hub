import { mosheBarakAuthor } from "@/data/registry";
import { CANONICAL_ORIGIN } from "@/lib/site";

export function authorLd() {
  return { "@type": "Person", "@id": `${CANONICAL_ORIGIN}/about-moshe-barak/#moshe-barak`, name: mosheBarakAuthor.name, url: `${CANONICAL_ORIGIN}/about-moshe-barak/#moshe-barak`, description: `${mosheBarakAuthor.experience} ${mosheBarakAuthor.bio}`, sameAs: [mosheBarakAuthor.reviewsUrl] };
}
