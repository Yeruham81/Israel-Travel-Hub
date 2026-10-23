// @vitest-environment node
import { describe, expect, it } from "vitest";
import { SECURITY_HEADERS, withSecurityHeaders } from "@/lib/security-headers.server";
import { readFileSync } from "node:fs";

const request = (hostname: string) => new Request(`https://${hostname}/travel-blog/masada/`);

describe("SSR response security headers", () => {
  it("adds safe hardening headers to normal pages without altering content or cache policy", async () => {
    const response = new Response("<h1>Safe content</h1>", {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=60",
        "Set-Cookie": "visit=yes; Secure; HttpOnly",
      },
    });
    const secured = withSecurityHeaders(response, request("israel-taxi.com"));
    expect(secured.status).toBe(200);
    expect(secured.headers.get("cache-control")).toBe("public, max-age=60");
    expect(secured.headers.get("set-cookie")).toBe("visit=yes; Secure; HttpOnly");
    expect(secured.headers.get("content-type")).toBe("text/html; charset=utf-8");
    expect(await secured.text()).toBe("<h1>Safe content</h1>");
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      expect(secured.headers.get(key)).toBe(value);
    }
    expect(secured.headers.get("x-frame-options")).toBe("SAMEORIGIN");
    expect(response.headers.get("x-frame-options")).toBeNull();
  });

  it.each(["israel-taxi-travel.lovable.app", "preview--israel-taxi-travel.lovable.app", "localhost"])(
    "keeps the %s preview embeddable in Lovable",
    (hostname) => {
      const response = withSecurityHeaders(
        new Response("hello", { headers: { "content-type": "text/html" } }),
        request(hostname),
      );
      expect(response.headers.get("x-frame-options")).toBeNull();
      expect(response.headers.get("permissions-policy")).toContain("camera=()");
    },
  );

  it("applies frame protection on both live website hostnames and never on APIs", () => {
    for (const hostname of ["israel-taxi.com", "www.israel-taxi.com"]) {
      const page = withSecurityHeaders(
        new Response("page", { headers: { "content-type": "text/html" } }), request(hostname),
      );
      expect(page.headers.get("x-frame-options")).toBe("SAMEORIGIN");
      const apiRequest = new Request(`https://${hostname}/api/quote-request/`);
      const api = withSecurityHeaders(
        Response.json({ accepted: true }, { headers: { "Cache-Control": "no-store" } }), apiRequest,
      );
      expect(api.headers.get("x-frame-options")).toBeNull();
      expect(api.headers.get("cache-control")).toBe("no-store");
      expect(api.headers.get("x-content-type-options")).toBe("nosniff");
    }
  });

  it("preserves existing stricter host policies and critical status codes", async () => {
    const response = withSecurityHeaders(
      new Response("not found", {
        status: 404,
        headers: {
          "Content-Type": "text/html",
          "Referrer-Policy": "no-referrer",
          "X-Frame-Options": "DENY",
        },
      }),
      request("israel-taxi.com"),
    );
    expect(response.status).toBe(404);
    expect(response.headers.get("referrer-policy")).toBe("no-referrer");
    expect(response.headers.get("x-frame-options")).toBe("DENY");
    expect(await response.text()).toBe("not found");
    const noContent = withSecurityHeaders(new Response(null, { status: 204 }), request("israel-taxi.com"));
    expect(noContent.status).toBe(204);
    expect(await noContent.text()).toBe("");
  });

  it("protects normal and error responses at the server entrypoint and avoids premature CSP/HSTS", () => {
    const server = readFileSync("src/server.ts", "utf8");
    expect(server).toContain("withSecurityHeaders(await normalizeCatastrophicSsrResponse(response), request)");
    expect(server).toContain("withSecurityHeaders(new Response(renderErrorPage()");
    const headers = readFileSync("src/lib/security-headers.server.ts", "utf8");
    expect(headers).not.toMatch(/headers\.set\(["'](?:content-security-policy|strict-transport-security)["']/i);
  });
});
