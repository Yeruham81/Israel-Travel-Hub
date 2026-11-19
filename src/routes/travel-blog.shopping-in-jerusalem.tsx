import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { JerusalemShoppingGuide } from "@/components/JerusalemShoppingGuide";

export const Route = createFileRoute("/travel-blog/shopping-in-jerusalem")({
  head: () => travelGuideMeta("jerusalemShopping"),
  component: JerusalemShoppingGuide,
});
