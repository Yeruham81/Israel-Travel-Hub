import { Link, Navigate, createFileRoute } from "@tanstack/react-router";
import { seaOfGalileeMeta } from "@/routes/attractions.sea-of-galilee";

/**
 * Navigation alias retained on the trial host; an HTTP 301 is not being enabled.
 * On main-domain launch, add a real server redirect only after approval.
 */
function LegacySeaOfGalileeAlias() {
  return <main className="mx-auto max-w-3xl px-4 py-16">
    <h1 className="text-3xl font-semibold">Sea of Galilee visitor guide</h1>
    <p className="mt-3">My current guide is at <Link to="/attractions/sea-of-galilee/" className="font-semibold text-primary underline">the Sea of Galilee attraction page</Link>.</p>
    <Navigate to="/attractions/sea-of-galilee/" replace />
  </main>;
}
export const Route = createFileRoute("/travel-blog/sea-of-galilee")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.sea-of-galilee.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: LegacySeaOfGalileeAlias,
});
