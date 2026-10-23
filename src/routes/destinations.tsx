import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Retired directory: no page is rendered, indexed or linked.
 * Old client-side bookmarks go to Accommodation.
 * The SSR entry returns a permanent HTTP 301 for legacy public URLs.
 */
export const Route = createFileRoute("/destinations")({
  beforeLoad: () => {
    throw redirect({ to: "/hotels/", replace: true });
  },
});
