import { createFileRoute } from "@tanstack/react-router";
import { attractionMeta } from "@/components/AttractionGuidePage";
import { MountTaborAttractionPage } from "@/components/MountTaborAttractionPage";

export const Route = createFileRoute("/attractions/mount-tabor")({
  head: () => attractionMeta("mount-tabor"),
  component: MountTaborAttractionPage,
});
