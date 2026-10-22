import { createFileRoute, redirect } from "@tanstack/react-router";

/** Keep the former URL useful while giving the transport guide one canonical home. */
export const Route = createFileRoute("/tours/bethlehem-from-jerusalem")({
  beforeLoad: () => {
    throw redirect({ to: "/travel-blog/jerusalem-to-bethlehem/", search: {}, hash: "", replace: true, statusCode: 301 });
  },
});
