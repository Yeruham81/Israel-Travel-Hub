import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/qasr-el-yahud")({
  head: () => travelGuideMeta("qasr"),
  component: () => <TravelGuidePage id="qasr" />,
});
