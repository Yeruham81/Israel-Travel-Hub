import { Navigate, Link, createFileRoute } from "@tanstack/react-router";
import { haifaMeta } from "@/routes/attractions.haifa";

/** Backward-compatible client navigation for existing links; the host's protected
 * server config must be used for a permanent HTTP 301 at public-domain launch. */
function LegacyHaifaRedirect() {
  return <main className="mx-auto max-w-3xl px-4 py-16">
    <h1 className="text-3xl font-semibold">Haifa city guide</h1>
    <p className="mt-3">My Haifa attractions guide has moved to <Link to="/attractions/haifa/" className="font-semibold text-primary underline">the new Haifa city guide</Link>.</p>
    <Navigate to="/attractions/haifa/" replace />
  </main>;
}
export const Route = createFileRoute("/travel-blog/haifa")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.haifa.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: LegacyHaifaRedirect,
});
