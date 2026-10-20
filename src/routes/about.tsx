import { createFileRoute, redirect } from "@tanstack/react-router";

/** Keep old bookmarks working after the personal and methodology pages were merged. */
export const Route = createFileRoute("/about")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/about-moshe-barak/", hash: location.hash, replace: true, statusCode: 301 });
  },
});
