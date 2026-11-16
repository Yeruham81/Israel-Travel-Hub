import { createFileRoute } from "@tanstack/react-router";
import { attractionMeta } from "@/components/AttractionGuidePage";
import { TabghaAttractionPage } from "@/components/TabghaAttractionPage";

export const Route = createFileRoute("/attractions/tabgha")({
  head: () => attractionMeta("tabgha"),
  component: TabghaAttractionPage,
});
