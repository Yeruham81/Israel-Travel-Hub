import { deadSeaMeta } from "@/routes/attractions.dead-sea";
import { Route } from "../routes/travel-blog.the-dead-sea";

export const routeHead = () => {
    const current = deadSeaMeta();
    return { ...current, meta: [...current.meta, { name: "robots", content: "noindex,follow" }] };
  };