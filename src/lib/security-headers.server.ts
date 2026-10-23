/**
 * Non-disruptive response hardening shared by SSR pages and server API routes.
 * Deliberately do not enforce a script/style CSP here: TanStack Start includes
 * inline hydration data, and the Lovable preview is embedded in an iframe.
 * Audit a nonce-based CSP separately before enforcing it on the live site.
 */
export const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "X-Permitted-Cross-Domain-Policies": "none",
} as const;

/**
 * The standalone production domain should not be framed by other origins.
 * Do not apply this policy to lovable.app previews: Lovable's editor uses an
 * embedded preview and would otherwise stop displaying the site.
 */
function isLiveWebsite(request: Request): boolean {
  const hostname = new URL(request.url).hostname.toLowerCase();
  return hostname === "israel-taxi.com" || hostname === "www.israel-taxi.com";
}

export function withSecurityHeaders(response: Response, request: Request): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    if (!headers.has(name)) headers.set(name, value);
  }

  const contentType = headers.get("content-type") ?? "";
  const html = /^text\/html(?:;|$)/i.test(contentType);
  if (html && !headers.has("Content-Security-Policy")) {
    // Enforce two low-risk protections that do not block inline hydration,
    // external map widgets, or Lovable's editor iframe. A full script/style
    // CSP requires a separate nonce-based rollout and browser validation.
    headers.set("Content-Security-Policy", "base-uri 'self'; object-src 'none'");
  }
  if (isLiveWebsite(request) && html) {
    // Clickjacking protection only for independently hosted production pages.
    // Do not apply to JSON APIs, static assets, or Lovable's iframe preview.
    if (!headers.has("X-Frame-Options")) headers.set("X-Frame-Options", "SAMEORIGIN");
  }

  // Preserve status, statusText, cookies, cache directives and streamed body.
  // Copying the headers avoids mutating an immutable upstream Response.
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
