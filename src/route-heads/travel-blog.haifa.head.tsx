import { haifaMeta } from "@/routes/attractions.haifa";
import { Route } from "../routes/travel-blog.haifa";

export const routeHead = () => {
    const current = haifaMeta();
    return { ...current, meta: [...current.meta, { name: "robots", content: "noindex,follow" }] };
  };