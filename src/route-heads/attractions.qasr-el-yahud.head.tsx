import { qasrElYahudSite } from "@/data/qasrElYahudSite";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const PATH = "/attractions/qasr-el-yahud/";
export function qasrElYahudMeta() {
  const meta = pageMeta({
    title: qasrElYahudSite.title,
    description: qasrElYahudSite.description,
    path: PATH,
    type: "article",
    image: qasrElYahudSite.hero.src,
    imageAlt: qasrElYahudSite.hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Attractions", path: "/attractions/" },
      { name: "Qasr el-Yahud", path: PATH },
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
      headline: qasrElYahudSite.title,
      description: qasrElYahudSite.description,
      inLanguage: "en",
      dateModified: qasrElYahudSite.updatedAt,
      author: authorLd(),
      publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      image: new URL(qasrElYahudSite.hero.src, CANONICAL_ORIGIN).href,
      citation: Object.values(qasrElYahudSite.sources),
    })],
  };
}
export const routeHead = qasrElYahudMeta;