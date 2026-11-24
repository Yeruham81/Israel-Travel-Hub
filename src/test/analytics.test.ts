import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ANALYTICS_CONSENT_KEY, GA4_MEASUREMENT_ID, createAnalytics } from "@/lib/analytics";

const production = { origin: "https://www.israel-taxi.com", indexable: true };
type Browser = Window & { dataLayer?: IArguments[]; gtag?: (...args: unknown[]) => void };
function browser(origin = production.origin) {
  const location = new URL(origin);
  if (!location.search) { location.search = "?email=visitor%40example.com"; location.hash = "contact"; }
  return { location, document, localStorage } as unknown as Browser;
}
function commands(win: Browser) { return (win.dataLayer ?? []).map(value => Array.from(value)); }
function views(win: Browser) { return commands(win).filter(value => value[0] === "event" && value[1] === "page_view"); }

beforeEach(() => { localStorage.clear(); document.querySelectorAll("#ith-ga4").forEach(node => node.remove()); });
afterEach(() => { vi.restoreAllMocks(); localStorage.clear(); document.querySelectorAll("#ith-ga4").forEach(node => node.remove()); });

describe("single GA4 installation and page-view owner", () => {
  it.each([
    ["https://saddlebrown-guanaco-454061.hostingersite.com", production],
    ["http://localhost:5173", production],
    [production.origin, { ...production, indexable: false }],
    [production.origin, { origin: "https://preview.example.com", indexable: true }],
  ])("keeps Google completely unloaded for %s with a non-production launch", (origin, config) => {
    const win = browser(origin);
    const analytics = createAnalytics(win, config);
    analytics.page("/", "Home");
    analytics.setChoice("granted");
    analytics.lead("contact", "accepted-reference");
    expect(analytics.eligible).toBe(false);
    expect(win.dataLayer).toBeUndefined();
    expect(win.gtag).toBeUndefined();
    expect(document.getElementById("ith-ga4")).toBeNull();
    expect(localStorage.getItem(ANALYTICS_CONSENT_KEY)).toBeNull();
  });

  it("waits for consent and sends only the current page after approval", () => {
    const win = browser();
    const analytics = createAnalytics(win, production);
    analytics.page("/", "Home");
    analytics.page("/about-me/", "About me");
    expect(win.dataLayer).toBeUndefined();
    expect(document.getElementById("ith-ga4")).toBeNull();
    analytics.setChoice("granted");
    analytics.setChoice("granted");
    expect(views(win)).toHaveLength(1);
    expect(views(win)[0]![2]).toMatchObject({ page_location: production.origin + "/about-me/", send_to: GA4_MEASUREMENT_ID });
  });

  it("initializes once, disables automatic load views and counts navigation/back exactly once", () => {
    const win = browser();
    const analytics = createAnalytics(win, production);
    analytics.setChoice("granted");
    analytics.page("/", "Home");
    analytics.page("/", "Home after hydration");
    analytics.page("/travel-blog/", "Guides");
    analytics.page("/travel-blog/", "Guides rerender");
    analytics.page("/", "Home after back");
    expect(views(win)).toHaveLength(3);
    const configs = commands(win).filter(value => value[0] === "config");
    expect(configs).toHaveLength(1);
    expect(configs[0]).toEqual(["config", GA4_MEASUREMENT_ID, expect.objectContaining({ send_page_view: false })]);
    expect(document.querySelectorAll("#ith-ga4")).toHaveLength(1);
    expect(document.getElementById("ith-ga4")).toHaveAttribute("src", `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`);
  });

  it("excludes query data, anchors and external referrer paths from custom measurement", () => {
    vi.spyOn(document, "referrer", "get").mockReturnValue("https://www.google.com/search?q=visitor@example.com");
    const win = browser();
    const analytics = createAnalytics(win, production);
    analytics.setChoice("granted");
    analytics.page("/car-rental/?email=visitor@example.com#contact", "Car rental");
    analytics.page("/car-rental/?topic=changed#other", "Car rental");
    analytics.page("https://another.example.com/path/", "External");
    expect(views(win)).toHaveLength(1);
    expect(views(win)[0]![2]).toMatchObject({ page_location: production.origin + "/car-rental/", page_referrer: "https://www.google.com" });
    expect(JSON.stringify(commands(win))).not.toContain("visitor@");
    expect(JSON.stringify(commands(win))).not.toContain("#contact");
  });

  it("keeps declined or expired choices off and allows a later change", () => {
    const win = browser();
    const analytics = createAnalytics(win, production);
    analytics.page("/", "Home");
    analytics.setChoice("denied");
    expect(document.getElementById("ith-ga4")).toBeNull();
    expect(createAnalytics(browser(), production).getChoice()).toBe("denied");
    localStorage.setItem(ANALYTICS_CONSENT_KEY, JSON.stringify({ choice: "granted", expiresAt: Date.now() - 1 }));
    expect(createAnalytics(browser(), production).getChoice()).toBe("unknown");
    analytics.setChoice("granted");
    expect(views(win)).toHaveLength(1);
  });

  it("preserves named campaign attribution while excluding arbitrary query fields", () => {
    const win = browser(production.origin + "/?utm_source=newsletter&utm_medium=email&utm_campaign=Autumn&email=visitor@example.com");
    const analytics = createAnalytics(win, production);
    analytics.page("/", "Home");
    analytics.setChoice("granted");
    const config = commands(win).find(value => value[0] === "config")!;
    expect(config[2]).toMatchObject({ campaign_source: "newsletter", campaign_medium: "email", campaign_name: "Autumn" });
    expect(JSON.stringify(commands(win))).not.toContain("visitor@");
  });

  it("stops later views, successful leads and existing helper events after withdrawal", () => {
    const win = browser();
    const analytics = createAnalytics(win, production);
    analytics.page("/", "Home");
    analytics.setChoice("granted");
    analytics.setChoice("denied");
    const count = commands(win).length;
    analytics.page("/about-me/", "About");
    analytics.lead("contact", "new-reference");
    win.gtag?.("event", "outbound_click", { provider: "test" });
    expect(commands(win)).toHaveLength(count);
    expect((win as unknown as Record<string, unknown>)[`ga-disable-${GA4_MEASUREMENT_ID}`]).toBe(true);
    analytics.setChoice("granted");
    expect(views(win)).toHaveLength(2);
    expect(commands(win).filter(value => value[0] === "config")).toHaveLength(1);
  });

  it("deduplicates accepted enquiries without sending the reference or enquiry fields", () => {
    const win = browser();
    const analytics = createAnalytics(win, production);
    analytics.page("/", "Home");
    analytics.lead("contact", "before-consent");
    analytics.setChoice("granted");
    analytics.lead("contact", "private-reference");
    analytics.lead("contact", "private-reference");
    const leads = commands(win).filter(value => value[0] === "event" && value[1] === "generate_lead");
    expect(leads).toEqual([["event", "generate_lead", { send_to: GA4_MEASUREMENT_ID, form_type: "contact" }]]);
    expect(JSON.stringify(commands(win))).not.toContain("private-reference");
  });

  it("does not revive an old grant when saving a later rejection fails", () => {
    const win = browser();
    const analytics = createAnalytics(win, production);
    analytics.setChoice("granted");
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Storage full"); });
    analytics.setChoice("denied");
    expect(analytics.getChoice()).toBe("denied");
    expect(createAnalytics(browser(), production).getChoice()).toBe("unknown");
  });
});
