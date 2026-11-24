import { createFileRoute } from "@tanstack/react-router";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import {
  BAPTISM_PATH, BAPTISM_TITLE, BAPTISM_DESCRIPTION, BAPTISM_UPDATED,
  BAPTISM_HERO, baptismFaqs, baptismSources,
} from "@/data/jordanRiverBaptism";
import { JordanRiverBaptismGuidePage } from "@/components/JordanRiverBaptismGuide";

export const Route = createFileRoute("/travel-blog/baptism-in-the-jordan-river")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.baptism-in-the-jordan-river.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component:JordanRiverBaptismGuidePage,
});
