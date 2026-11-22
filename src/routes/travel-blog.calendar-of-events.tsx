import { createFileRoute } from "@tanstack/react-router";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { holidayGuideSources } from "@/data/israelHolidayVisitorGuide";
import {
  HOLIDAY_GUIDE_PATH, HOLIDAY_GUIDE_TITLE, HOLIDAY_GUIDE_DESCRIPTION, HOLIDAY_GUIDE_UPDATED,
  HOLIDAY_GUIDE_PHOTO, IsraelHolidayVisitorGuidePage,
} from "@/components/IsraelHolidayVisitorGuide";

export const Route = createFileRoute("/travel-blog/calendar-of-events")({
  head: () => {
    const crumbs = [{name:"Home",path:"/"},{name:"Travel guides",path:"/travel-blog/"},{name:"Calendar of events",path:HOLIDAY_GUIDE_PATH}];
    const meta = pageMeta({
      title:HOLIDAY_GUIDE_TITLE,description:HOLIDAY_GUIDE_DESCRIPTION,path:HOLIDAY_GUIDE_PATH,
      type:"article",crumbs,image:HOLIDAY_GUIDE_PHOTO.src,imageAlt:HOLIDAY_GUIDE_PHOTO.alt,
    });
    return {...meta,scripts:[...meta.scripts,jsonLd({
      "@context":"https://schema.org","@type":"Article",
      "@id":CANONICAL_ORIGIN+HOLIDAY_GUIDE_PATH+"#article",
      headline:HOLIDAY_GUIDE_TITLE,description:HOLIDAY_GUIDE_DESCRIPTION,
      mainEntityOfPage:CANONICAL_ORIGIN+HOLIDAY_GUIDE_PATH,
      inLanguage:"en",dateModified:HOLIDAY_GUIDE_UPDATED,author:authorLd(),
      publisher:{"@type":"Organization",name:SITE_NAME,url:CANONICAL_ORIGIN},
      image:new URL(HOLIDAY_GUIDE_PHOTO.src,CANONICAL_ORIGIN).href,
      citation:holidayGuideSources.map(source=>source.url),
    })]};
  },
  component:IsraelHolidayVisitorGuidePage,
});
