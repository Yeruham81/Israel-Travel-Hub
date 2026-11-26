import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import react from "@vitejs/plugin-react";

// The production website uses static HTML on Hostinger. Standard SSR builds
// use Nitro's Node server; no hosted editor or provider-specific shim is needed.
export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      ...(process.env["HOSTINGER_STATIC_BUILD"] === "true"
        ? {
            prerender: {
              enabled: true,
              autoSubfolderIndex: true,
              autoStaticPathsDiscovery: true,
              crawlLinks: true,
              // Maps are static HTML assets; PHP APIs are managed on the host.
              filter: ({ path }: { path: string }) => !path.startsWith("/maps/") && !path.startsWith("/api/"),
              failOnError: true,
              concurrency: 5,
            },
          }
        : {}),
      // Preserve the custom SSR error handler and response security headers.
      server: { entry: "server" },
    }),
    ...(command === "build" ? [nitro({ preset: "node-server" })] : []),
    react(),
  ],
  css: { transformer: "lightningcss" },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
    ignoreOutdatedRequests: true,
  },
  // Only VITE_ variables are exposed to the client (Vite's native default).
  server: {
    host: "::",
    port: 8080,
    watch: { awaitWriteFinish: { stabilityThreshold: 1000, pollInterval: 100 } },
  },
}));
