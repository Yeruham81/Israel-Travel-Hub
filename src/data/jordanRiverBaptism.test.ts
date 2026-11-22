import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { affiliateConfig, tourBookingOffers, tourProducts } from "@/data/registry";
import { tourPhotos } from "@/data/tours";
import { travelGuides } from "@/data/travelGuides";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { yardenitSite } from "@/data/yardenitSite";
import { qasrElYahudSite } from "@/data/qasrElYahudSite";
import { magdalaSite } from "@/data/magdalaSite";
import { BAPTISM_PATH, BAPTISM_TITLE, BAPTISM_DESCRIPTION, BAPTISM_UPDATED, BAPTISM_HERO, baptismFaqs, baptismSources, baptismTourGroups } from "@/data/jordanRiverBaptism";

const offers=[...baptismTourGroups[0].products, ...baptismTourGroups[1].products];
describe("Jordan River baptism comparison guide",()=>{
  it("preserves the old URL and synchronizes guide-directory metadata",()=>{
    expect(BAPTISM_PATH).toBe("/travel-blog/baptism-in-the-jordan-river/");
    expect(travelGuides.baptism.title).toBe(BAPTISM_TITLE);
    expect(travelGuides.baptism.description).toBe(BAPTISM_DESCRIPTION);
    expect(travelGuides.baptism.updatedAt).toBe(BAPTISM_UPDATED);
    expect(existsSync("public"+BAPTISM_HERO.src)).toBe(true);
  });
  it("pairs a Yardenit photo with visitor facts and shows only two location pins on the comparison map",()=>{
    const page = readFileSync("src/components/JordanRiverBaptismGuide.tsx","utf8");
    const map = readFileSync("public/maps/area.html","utf8");
    expect(page).toContain('data-testid="baptism-yardenit-photo-facts"');
    expect(page).toContain('src={yardenitSite.hero.src}');
    expect(page).toContain('alt={yardenitSite.hero.alt}');
    expect(page).toContain('pinMode: "locations"');
    expect(page).toContain('waypoints: JSON.stringify(baptismMapLocations)');
    expect(page).toContain('src={baptismComparisonMapUrl}');
    expect(page).not.toContain('maps?saddr=');
    expect(page).not.toContain('origin=Yardenit%20Baptismal%20Site%2C%20Israel&destination=Qasr');
    expect(page).not.toContain("The map illustrates their separation, not a guaranteed travel time");
    expect(map).toContain('const locationPinMode = params.get("pinMode") === "locations"');
    expect(map).toContain('locationPinMode ? "Location" : "Stop"');
  });
  it("uses concise, positive practical wording without unnecessary cross-border commentary",()=>{
    const page = readFileSync("src/components/JordanRiverBaptismGuide.tsx","utf8");
    expect(page).not.toContain("The opposite, Jordanian bank is home to");
    expect(page).not.toContain("A riverbank visit is not permission to cross between countries");
    expect(page).not.toContain("Neither tradition nor archaeology establishes");
    expect(page).toContain("Guiding and religious services should be arranged separately.");
    expect(page).not.toContain("Guiding and religious services are arranged separately.");
    expect(page).not.toContain("editorial snapshots, not live offers");
    expect(page).toContain("Check current prices, availability, the exact river stop");
    expect(baptismTourGroups[0].description).toContain("arrange it separately with your officiant and the site");
    expect(baptismTourGroups[0].description).not.toContain("does not automatically include");
  });
  it("has three Galilee and three Qasr tours with approved Travelpayouts links",()=>{
    expect(baptismTourGroups.map(group=>group.products.length)).toEqual([3,3]);
    expect(new Set(offers.map(x=>x.id)).size).toBe(6);
    for(const item of offers){
      const id="tour-"+item.id+"-"+item.provider;
      const offer=tourBookingOffers.find(x=>x.id===id);
      const url=affiliateConfig[id+"@travel-blog-baptism"]?.trackingUrl;
      expect(offer?.productId).toBe(item.id);
      expect(tourProducts.some(p=>p.id===item.id&&p.status==="published")).toBe(true);
      expect(tourPhotos[item.id]?.src).toBeTruthy();
      expect(url).toMatch(/^https:\/\/(viator|getyourguide)\.tpm\.li\/[A-Za-z0-9]+\?sub_id=baptism_/);
      expect(url).not.toBe(offer?.publicUrl);
    }
  });
  it("only displays supplier-verified review snapshots and an explicitly checked USD price",()=>{
    const verifiedIds=offers.map(item=>item.id);
    for(const id of verifiedIds) {
      const product=tourProducts.find(product=>product.id===id);
      expect(product?.rating?.checkedAt).toBe("2026-11-21");
      expect(product?.rating?.count).toBeGreaterThan(0);
      const exactOffer=tourBookingOffers.find(offer=>offer.productId===id && offer.partnerId === (offers.find(x=>x.id===id)!.provider));
      expect(product?.rating?.sourceUrl).toBe(exactOffer?.publicUrl);
    }
    const snapshot=tourBookingOffers.find(o=>o.productId==="bethlehem-jericho-qasr-small-group" && o.partnerId==="viator");
    expect(snapshot?.listedPrice).toMatchObject({amount:471.43,currency:"USD",basis:"per_person",checkedAt:"2026-11-21",kind:"published_snapshot"});
    expect(offers.filter(x=>x.id!=="bethlehem-jericho-qasr-small-group").every(entry=>!tourBookingOffers.find(o=>o.productId===entry.id&&o.partnerId===entry.provider)?.listedPrice)).toBe(true);
  });
  it("uses exact primary destination hero photos for all three special attraction pages",()=>{
    expect(guideHeroPhotoForPath("/attractions/yardenit/")).toEqual(yardenitSite.hero);
    expect(guideHeroPhotoForPath("/attractions/qasr-el-yahud/")).toEqual(qasrElYahudSite.hero);
    expect(guideHeroPhotoForPath("/attractions/magdala/")).toEqual(magdalaSite.hero);
    expect(guideHeroPhotoForPath("/travel-blog/christian-tours-in-israel/")?.src).toBeTruthy();
  });
  it("answers substantive baptism and access questions using authoritative sources",()=>{
    expect(baptismFaqs.length).toBeGreaterThanOrEqual(9);
    expect(baptismFaqs.some(f=>f.q.includes("admission"))).toBe(true);
    expect(baptismFaqs.some(f=>f.q.includes("transfer"))).toBe(true);
    expect(baptismSources.some(s=>s.url.includes("parks.org.il"))).toBe(true);
    expect(baptismSources.some(s=>s.url.includes("yardenit.com"))).toBe(true);
    expect(baptismSources.some(s=>s.url.includes("whc.unesco.org"))).toBe(true);
    expect(baptismSources.some(s=>s.url.includes("inmaa.mod.gov.il"))).toBe(true);
    expect(baptismSources.some(s=>s.label.includes("reservation system"))).toBe(true);
    expect(baptismSources.some(s=>s.url.includes("/ceremony/"))).toBe(false);
  });
});
