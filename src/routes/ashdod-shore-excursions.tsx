import { createFileRoute } from "@tanstack/react-router";
import { PortPage, shorePortMeta } from "@/components/PortPage";

export const Route = createFileRoute("/ashdod-shore-excursions")({
  head: () => shorePortMeta("ashdod"),
  component: () => <PortPage id="ashdod" />,
});
