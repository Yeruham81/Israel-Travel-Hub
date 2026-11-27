import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: [
      ...configDefaults.exclude,
      ...(process.env["CI_FUNCTIONAL_ONLY"] === "true"
        ? [
            "src/test/detailed-horizontal-card-layouts.test.ts",
            "src/test/editorial-related-mobile-grids.test.ts",
          ]
        : []),
    ],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
