import { mosheBarakAuthor } from "@/data/site-identity";
import { authorEntityId } from "@/lib/site";

export function authorLd() {
  return {
    "@type": "Person",
    "@id": authorEntityId(),
    name: mosheBarakAuthor.name,
    url: authorEntityId(),
    description: [mosheBarakAuthor.experience, mosheBarakAuthor.bio].filter(Boolean).join(" "),
    sameAs: [mosheBarakAuthor.reviewsUrl],
  };
}
