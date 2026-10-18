import { describe, expect, it } from "vitest";
import { serviceDomains, allNavGroups } from "@/data/nav";
import { reviewHighlights, tripadvisorProfileUrl } from "@/data/homeReviews";

describe("homepage navigation and review sources", () => {
  it("keeps six ordered primary entries and rental only in the sidebar", () => {
    expect(serviceDomains.map(x => x.label)).toEqual(["Airport transfers", "Tours & day trips", "Shore excursions", "Accommodation", "Attractions", "Travel guides"]);
    expect(serviceDomains.some(x => x.to === "/car-rental/" || x.to === "/tickets/")).toBe(false);
    const sidebar = allNavGroups.flatMap(group => group.items.filter(item => "to" in item));
    expect(sidebar.some(x => "to" in x && x.to === "/car-rental/")).toBe(true);
    expect(sidebar.some(x => "to" in x && x.to === "/tickets/")).toBe(false);
  });
  it("attributes one-time summaries to distinct sources", () => {
    expect(reviewHighlights.filter(x => x.source === "Tripadvisor")).toHaveLength(3);
    expect(reviewHighlights.filter(x => x.source === "Israel Taxi Service")).toHaveLength(3);
    expect(tripadvisorProfileUrl).toMatch(/^https:\/\/www\.tripadvisor\.com\//);
  });
});
