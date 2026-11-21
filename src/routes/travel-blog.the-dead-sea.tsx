import { Navigate, Link, createFileRoute } from "@tanstack/react-router";
import { deadSeaMeta } from "@/routes/attractions.dead-sea";

/** The old route remains an accessible navigation alias.
 * Add a true HTTP 301 on the main domain at launch; do not edit the trial host's protected .htaccess.
 */
function LegacyDeadSeaRedirect() {
  return <main className="mx-auto max-w-3xl px-4 py-16">
    <h1 className="text-3xl font-semibold">The Dead Sea visitor guide</h1>
    <p className="mt-3">My updated guide is available at <Link to="/attractions/dead-sea/" className="font-semibold text-primary underline">the Dead Sea attraction guide</Link>.</p>
    <Navigate to="/attractions/dead-sea/" replace />
  </main>;
}
export const Route = createFileRoute("/travel-blog/the-dead-sea")({
  head: () => {
    const current = deadSeaMeta();
    return { ...current, meta: [...current.meta, { name: "robots", content: "noindex,follow" }] };
  },
  component: LegacyDeadSeaRedirect,
});
