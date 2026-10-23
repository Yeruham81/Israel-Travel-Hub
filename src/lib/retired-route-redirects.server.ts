/**
 * Permanent server-side redirect for a retired index.
 * Matches both trailing-slash variants and leaves accommodation routes intact.
 */
export function redirectRetiredDestinations(request: Request): Response | null {
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  const url = new URL(request.url);
  if (url.pathname !== "/destinations" && url.pathname !== "/destinations/") return null;
  return new Response(null, {
    status: 301,
    headers: {
      Location: new URL("/hotels/", url.origin).toString(),
      "Cache-Control": "public, max-age=3600",
    },
  });
}
