import { readFileSync } from "node:fs";
import { render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AreaMap } from "@/components/AreaMap";
import { jerusalemAreaGuides, telAvivAreaGuides, deadSeaStayGuide, tiberiasStayGuide, haifaStayGuide } from "@/data/content";

const html = readFileSync("public/maps/area.html", "utf8");
const viewerScript = html.match(/<script id="map-viewer">([\s\S]*?)<\/script>/)![1]!;
const style = JSON.parse(readFileSync("public/maps/english-style.json", "utf8"));
const areas = [...jerusalemAreaGuides, ...telAvivAreaGuides, deadSeaStayGuide, tiberiasStayGuide, haifaStayGuide];

/** Run the shipped viewer with the graphics engine replaced, without a network or WebGL dependency. */
function viewer(search: string, options: { missingSdk?: boolean; graphicsFailure?: boolean } = {}) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const events = new Map<string, () => void>();
  const pageEvents = new Map<string, (event: { persisted: boolean }) => void>();
  const remove = vi.fn();
  const map = { touchZoomRotate: { disableRotation: vi.fn() }, addControl: vi.fn(), once: (name: string, handler: () => void) => events.set(name, handler), on: (name: string, handler: () => void) => events.set(name, handler), remove };
  const marker = { setLngLat: vi.fn().mockReturnThis(), addTo: vi.fn().mockReturnThis(), getElement: () => doc.createElement("div") };
  const MapConstructor = vi.fn(function () { if (options.graphicsFailure) throw new Error("WebGL unavailable"); return map; });
  const sdk = { Map: MapConstructor, Marker: vi.fn(function () { return marker; }), NavigationControl: vi.fn(function () {}), AttributionControl: vi.fn(function () {}), setWorkerCount: vi.fn() };
  const fakeWindow = { location: { search, href: `https://travel.example/maps/area.html${search}` }, setTimeout: window.setTimeout.bind(window), clearTimeout: window.clearTimeout.bind(window), addEventListener: (name: string, handler: (event: { persisted: boolean }) => void) => pageEvents.set(name, handler) };
  new Function("document", "window", "maplibregl", viewerScript)(doc, fakeWindow, options.missingSdk ? undefined : sdk);
  return { doc, events, pageEvents, Map: MapConstructor, marker, remove };
}

function label(expression: unknown, properties: Record<string, string>): unknown {
  if (!Array.isArray(expression)) return expression;
  if (expression[0] === "get") return properties[String(expression[1])] ?? null;
  if (expression[0] === "coalesce") return expression.slice(1).map((part) => label(part, properties)).find((value) => value !== null && value !== undefined);
  if (expression[0] === "to-string") return String(label(expression[1], properties));
  throw new Error(`Unexpected label operation: ${expression[0]}`);
}

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("free English maps throughout the accommodation guides", () => {
  it("all 17 area/destination locations keep their bounds and marker in both the lazy embed and larger English map", () => {
    vi.useFakeTimers();
    for (const [index, area] of areas.entries()) {
      const { container, unmount } = render(<AreaMap area={area} compact={index % 2 === 0} />);
      const iframe = container.querySelector("iframe")!;
      const link = container.querySelector('a[href^="/maps/area.html"]')!;
      expect(iframe).toHaveAttribute("loading", "lazy");
      expect(iframe.title).toContain("English map");
      expect(link.getAttribute("href")).toBe(iframe.getAttribute("src"));
      const url = new URL(iframe.getAttribute("src")!, "https://travel.example");
      expect(url.pathname).toBe("/maps/area.html");
      expect(url.searchParams.get("lang")).toBe("en");
      const result = viewer(url.search);
      expect(result.Map).toHaveBeenCalledWith(expect.objectContaining({
        style: "https://travel.example/maps/english-style.json",
        center: [area.map.lon, area.map.lat],
        bounds: [[area.map.bounds[0], area.map.bounds[1]], [area.map.bounds[2], area.map.bounds[3]]],
        cooperativeGestures: true,
      }));
      expect(result.marker.setLngLat).toHaveBeenCalledWith([area.map.lon, area.map.lat]);
      const caption = container.querySelector("figcaption")!;
      expect(caption).toHaveTextContent(area.map.reference);
      expect(caption).toHaveTextContent("Open a larger map");
      expect(caption).not.toHaveTextContent(/The pin is an area reference|English names or Latin transliterations|Data ©|Style: OSM Liberty/);
      expect(caption.querySelectorAll("a")).toHaveLength(1);
      // Supplier attribution is shown by the embedded MapLibre control, not
      // repeated in a bulky block below the map.
      expect(html).toContain("new maplibregl.AttributionControl({ compact: true");
      expect(html).toContain("OSM Liberty");
      unmount();
    }
  });

  it("every named label prefers English, uses a Latin fallback and never falls back to the Hebrew local name", () => {
    const names = style.layers.filter((layer: { type: string; layout?: Record<string, unknown> }) => layer.type === "symbol" && JSON.stringify(layer.layout?.["text-field"] ?? "").includes("name:"));
    expect(names.length).toBeGreaterThan(15);
    for (const layer of names) {
      const expression = layer.layout["text-field"];
      expect(label(expression, { "name:en": "Jerusalem", "name:latin": "Yerushalayim", name: "ירושלים", name_en: "ירושלים", "name:nonlatin": "ירושלים" })).toBe("Jerusalem");
      expect(label(expression, { "name:latin": "Yerushalayim", name: "ירושלים", name_en: "ירושלים" })).toBe("Yerushalayim");
      expect(label(expression, { name: "ירושלים", name_en: "ירושלים", "name:nonlatin": "ירושלים" })).toBe("");
    }
    const shields = style.layers.filter((layer: { layout?: Record<string, unknown> }) => JSON.stringify(layer.layout?.["text-field"] ?? "").includes('"ref"'));
    expect(shields.length).toBeGreaterThan(0);
    for (const layer of shields) expect(label(layer.layout["text-field"], { ref: "90" })).toBe("90");
    expect(style.sources.openmaptiles.url).toBe("https://tiles.openfreemap.org/planet");
    expect(JSON.stringify(style)).not.toMatch(/api[_-]?key|access_token|mapbox:\/\//i);
  });

  it("keeps an English location fallback if the SDK or WebGL cannot load", () => {
    vi.useFakeTimers();
    for (const options of [{ missingSdk: true }, { graphicsFailure: true }]) {
      const result = viewer("?marker=32.8191,34.9884&bbox=34.951,32.785,35.017,32.837&name=Haifa", options);
      expect(result.doc.getElementById("message")!.textContent).toContain("temporarily unavailable");
      const fallback = new URL(result.doc.getElementById("fallback")!.getAttribute("href")!);
      expect(fallback.origin).toBe("https://www.google.com");
      expect(fallback.searchParams.get("query")).toBe("32.8191,34.9884");
      expect(fallback.searchParams.get("hl")).toBe("en");
    }
  });

  it("shows a fallback after a slow load, recovers on load and survives the browser back cache", () => {
    vi.useFakeTimers();
    const result = viewer("?marker=32.8191,34.9884&bbox=34.951,32.785,35.017,32.837&name=Haifa");
    vi.advanceTimersByTime(20000);
    expect(result.doc.getElementById("message")!.textContent).toContain("temporarily unavailable");
    result.events.get("load")!();
    expect(result.doc.getElementById("status")!.hasAttribute("hidden")).toBe(true);
    result.events.get("error")!();
    expect(result.doc.getElementById("status")!.hasAttribute("hidden")).toBe(true);
    result.pageEvents.get("pagehide")!({ persisted: true });
    expect(result.remove).not.toHaveBeenCalled();
    result.pageEvents.get("pagehide")!({ persisted: false });
    expect(result.remove).toHaveBeenCalledOnce();
  });

  it("rejects malformed or out-of-bounds coordinates instead of displaying the wrong location", () => {
    for (const search of ["", "?marker=NaN,34&bbox=33,31,36,33", "?marker=32,34&bbox=35,31,36,33", "?marker=32,34&bbox=34,,35,33", "?marker=90,34&bbox=33,31,35,91"]) {
      const result = viewer(search);
      expect(result.Map).not.toHaveBeenCalled();
      expect(result.doc.getElementById("message")!.textContent).toContain("Please return to the guide");
      expect(result.doc.getElementById("fallback")!.hasAttribute("hidden")).toBe(true);
    }
  });
});
