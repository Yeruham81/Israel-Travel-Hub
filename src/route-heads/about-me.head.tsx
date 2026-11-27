import portrait from "@/assets/airport-transfers/moshe.webp";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

export const routeHead = () => {
    const meta = pageMeta({
      title: "About Moshe Barak | Private Driver & Airport Transfers in Israel",
      description: "Get to know Moshe Barak: more than 20 years helping travelers explore Israel, personal service, local knowledge and first-hand reviews from my clients.",
      path: "/about-me/",
      crumbs: [{ name: "Home", path: "/" }, { name: "About me", path: "/about-me/" }],
    });
    const person = authorLd();
    return { ...meta, scripts: [...meta.scripts, jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          "@id": CANONICAL_ORIGIN + "/about-me/#webpage",
          url: CANONICAL_ORIGIN + "/about-me/",
          name: "About Moshe Barak",
          inLanguage: "en",
          isPartOf: { "@id": CANONICAL_ORIGIN + "/#website" },
          mainEntity: { "@id": person["@id"] },
        },
        { ...person, image: new URL(portrait, CANONICAL_ORIGIN).href },
      ],
    })] };
  };