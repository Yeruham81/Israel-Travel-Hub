import { createFileRoute } from "@tanstack/react-router";
import { attractionMeta } from "@/components/AttractionGuidePage";
import { MountBeatitudesAttractionPage } from "@/components/MountBeatitudesAttractionPage";

export const Route = createFileRoute("/attractions/mount-of-beatitudes")({
  head: () => attractionMeta("mount-of-beatitudes"),
  component: MountBeatitudesAttractionPage,
});
