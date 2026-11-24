import { createFileRoute } from "@tanstack/react-router";
import { JerusalemCityHubPage } from "@/components/JerusalemCityHub";
import { authorLd } from "@/lib/author";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { travelGuides } from "@/data/travelGuides";
import {
  JERUSALEM_HUB_PATH, JERUSALEM_HUB_TITLE, JERUSALEM_HUB_DESCRIPTION,
  JERUSALEM_HUB_UPDATED, jerusalemHubFaqs, jerusalemHubSources,
} from "@/data/jerusalemCityHub";

export const Route = createFileRoute("/travel-blog/jerusalem-travel-guide")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.jerusalem-travel-guide.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component:JerusalemCityHubPage,
});
