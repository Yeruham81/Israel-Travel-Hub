import { seaOfGalileeMeta } from "@/routes/attractions.sea-of-galilee";
import { Route } from "../routes/travel-blog.sea-of-galilee";

export const routeHead = () => {
    const current = seaOfGalileeMeta();
    return {
      ...current,
      meta: [...current.meta.filter(item => !("name" in item && item.name === "robots")), { name: "robots", content: "noindex,follow" }],
    };
  };