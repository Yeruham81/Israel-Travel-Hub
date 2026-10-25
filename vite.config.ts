// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Static HTML export is used only for Hostinger Premium deploy builds.
    // Ordinary Lovable previews, local dev, and standard CI builds keep SSR.
    ...(process.env["HOSTINGER_STATIC_BUILD"] === "true"
      ? {
          prerender: {
            enabled: true,
            autoSubfolderIndex: true,
            autoStaticPathsDiscovery: true,
            crawlLinks: true,
            // The interactive /maps/*.html assets are served as files, not router pages.
            // A crawler can misinterpret their iframe query strings as broken routes.
            filter: ({ path }) => !path.startsWith("/maps/") && !path.startsWith("/api/"),
            // Do not publish incomplete HTML when any route fails to render.
            failOnError: true,
            concurrency: 5,
          },
        }
      : {}),
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
