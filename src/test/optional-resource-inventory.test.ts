import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";
it("routes every application iframe through the consent boundary", () => {
  for (const folder of ["src/components", "src/routes"]) {
    for (const name of readdirSync(folder).filter(file => file.endsWith(".tsx") && file !== "ConsentIframe.tsx")) {
      const source = readFileSync(join(folder, name), "utf8");
      expect(source, name).not.toMatch(/<iframe\b/);
      if (!["BookingWidgetFrame.tsx"].includes(name)) expect(source, name).not.toMatch(/createElement\(["']script["']\)/);
    }
  }
});
it("makes every standalone map/widget external resource inert before consent", () => {
  for (const folder of ["public/maps", "public/widgets"]) {
    for (const name of readdirSync(folder).filter(file => file.endsWith(".html"))) {
      const html = readFileSync(join(folder, name), "utf8");
      expect(html, name).toContain('src="/consent-embed.js"');
      expect(html, name).toContain('data-category="' + (folder.endsWith("maps") ? "external" : "marketing") + '"');
      expect(html, name).not.toMatch(/<(?:script|link)\b[^>]*\s(?:src|href)="https?:/);
      const scripts = [...html.matchAll(/<script\b([^>]*)>/g)];
      expect(scripts.filter(match => !match[1]!.includes('src="/consent-embed.js"')).every(match => match[1]!.includes('type="application/x-consent"'))).toBe(true);
    }
  }
});
