import { describe, expect, it } from "vitest";
import { carRentalAffiliateUrl, carRentalSubId, DISCOVERCARS_ISRAEL_AFFILIATE_URL, isCarRentalRoute } from "@/lib/car-rental-affiliate";

describe("DiscoverCars Israel affiliate tracking", () => {
  it("uses the verified Travelpayouts short link, not an untracked provider URL", () => {
    expect(DISCOVERCARS_ISRAEL_AFFILIATE_URL).toBe("https://discovercars.tpm.li/w2RwEsmb");
  });

  it.each([
    ["/", "itt_car_home"],
    ["/travel-blog/getting-around-israel/", "itt_car_getting_around_israel"],
    ["/travel-blog/israel-travel-tips/", "itt_car_israel_travel_tips"],
    ["/travel-blog/where-to-stay-in-jerusalem/", "itt_car_where_to_stay_in_jerusalem"],
    ["/attractions/caesarea/", "itt_car_attractions_caesarea"],
    ["/private-driver/", "itt_car_private_driver"],
  ])("tracks source page %s with SubID %s", (path, subId) => {
    expect(carRentalSubId(path)).toBe(subId);
    const url = new URL(carRentalAffiliateUrl(path));
    expect(url.origin + url.pathname).toBe(DISCOVERCARS_ISRAEL_AFFILIATE_URL);
    expect(url.searchParams.get("sub_id")).toBe(subId);
  });

  it("recognizes only the planned internal rental destination", () => {
    expect(isCarRentalRoute("/car-rental/")).toBe(true);
    expect(isCarRentalRoute("/car-rental")).toBe(true);
    expect(isCarRentalRoute("/travel-blog/car-rental/")).toBe(false);
  });
});
