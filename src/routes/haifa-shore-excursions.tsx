import { createFileRoute } from "@tanstack/react-router";
import { PortPage, shorePortMeta } from "@/components/PortPage";

export const Route = createFileRoute("/haifa-shore-excursions")({
  head: () => shorePortMeta("haifa"),
  component: () => <PortPage id="haifa" />,
});
