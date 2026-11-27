import { createFileRoute } from "@tanstack/react-router";
import { JerusalemShoppingGuide } from "@/components/JerusalemShoppingGuide";

export const Route = createFileRoute("/travel-blog/shopping-in-jerusalem")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.shopping-in-jerusalem.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: JerusalemShoppingGuide,
});
