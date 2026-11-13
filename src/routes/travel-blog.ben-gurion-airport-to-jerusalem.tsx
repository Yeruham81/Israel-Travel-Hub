import { createFileRoute, redirect } from "@tanstack/react-router";

/** Permanent redirect: private-transfer pages now live under Airport Transfers. */
export const Route = createFileRoute("/travel-blog/ben-gurion-airport-to-jerusalem")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/airport-transfers/ben-gurion-airport-to-jerusalem/", search: {}, hash: location.hash, replace: true, statusCode: 301 });
  },
});
