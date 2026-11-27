import { authorLd } from "@/lib/author";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { travelGuides } from "@/data/travelGuides";
import {
  JERUSALEM_HUB_PATH, JERUSALEM_HUB_TITLE, JERUSALEM_HUB_DESCRIPTION,
  JERUSALEM_HUB_UPDATED, jerusalemHubFaqs, jerusalemHubSources,
} from "@/data/jerusalemCityHub";

export const routeHead = () => {
    const hero=travelGuides.jerusalem.photo;
    const meta=pageMeta({
      title:JERUSALEM_HUB_TITLE,description:JERUSALEM_HUB_DESCRIPTION,path:JERUSALEM_HUB_PATH,
      type:"article",image:hero.src,imageAlt:hero.alt,
      crumbs:[{name:"Home",path:"/"},{name:"Travel guides",path:"/travel-blog/"},{name:"Jerusalem travel guide",path:JERUSALEM_HUB_PATH}],
    });
    return {...meta,scripts:[
      ...meta.scripts,
      jsonLd({
        "@context":"https://schema.org","@type":"Article",
        "@id":CANONICAL_ORIGIN+JERUSALEM_HUB_PATH+"#article",
        headline:JERUSALEM_HUB_TITLE,description:JERUSALEM_HUB_DESCRIPTION,
        mainEntityOfPage:CANONICAL_ORIGIN+JERUSALEM_HUB_PATH,
        inLanguage:"en",dateModified:JERUSALEM_HUB_UPDATED,
        author:authorLd(),publisher:{"@type":"Organization",name:SITE_NAME,url:CANONICAL_ORIGIN},
        image:new URL(hero.src,CANONICAL_ORIGIN).href,
        citation:jerusalemHubSources.map(source=>source.url),
      }),
      jsonLd({"@context":"https://schema.org","@type":"FAQPage",
        mainEntity:jerusalemHubFaqs.map(faq=>({"@type":"Question",name:faq.q,acceptedAnswer:{"@type":"Answer",text:faq.a}})),
      }),
    ]};
  };