import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { JerusalemChurchesGuide } from "@/components/JerusalemChurchesGuide";

export const Route = createFileRoute("/travel-blog/churches-in-jerusalem")({
  head: () => travelGuideMeta("jerusalemChurches"),
  component: JerusalemChurchesGuide,
});
