import { createFileRoute } from "@tanstack/react-router";
import { attractionMeta } from "@/components/AttractionGuidePage";
import { JerusalemMuseumsGuide } from "@/components/JerusalemMuseumsGuide";

export const Route = createFileRoute("/travel-blog/museums-in-jerusalem")({
  head: () => attractionMeta("museums-in-jerusalem"),
  component: JerusalemMuseumsGuide,
});
