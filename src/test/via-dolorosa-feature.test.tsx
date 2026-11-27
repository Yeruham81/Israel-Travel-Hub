import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { viaDolorosaDestinationContent as content } from "@/components/ViaDolorosaAttractionPage";
import { viaDolorosaSite as site } from "@/data/viaDolorosaSite";
import { viaDolorosaMeta } from "@/routes/attractions.via-dolorosa";
import { attractionHubCards, attractionHubRegions } from "@/data/attractionsHub";
import { attractionSidebarGuideLabels, attractionSidebarRegions } from "@/data/nav";
import { attractionPath } from "@/data/attractionGuideTypes";
import { affiliateConfig } from "@/data/registry";
import { christianAreas } from "@/data/christianToursGuide";

const page=readFileSync("src/components/ViaDolorosaAttractionPage.tsx","utf8");
const map=readFileSync("src/components/ViaDolorosaRouteMap.tsx","utf8");
const mapHtml=readFileSync("public/maps/via-dolorosa.html","utf8");

describe("Via Dolorosa standalone Jerusalem attraction",()=>{
  it("uses the shared attraction template, canonical metadata and current local hero",()=>{
    const route=readFileSync("src/routes/attractions.via-dolorosa.tsx","utf8");
    expect(route).toContain('createFileRoute("/attractions/via-dolorosa")');
    expect(route).toContain("ViaDolorosaAttractionPage");
    expect(page).toContain("AttractionDestinationPage");
    expect(content.path).toBe("/attractions/via-dolorosa/");
    expect(attractionPath("via-dolorosa")).toBe(content.path);
    expect(content.heroTitle).toContain("14 Stations");
    expect(content.hero.src).toBe(site.hero.src);
    expect(site.hero.src).toBe("/images/attractions/old-jerusalem-via-dolorosa.webp");
    expect(existsSync("public"+site.hero.src)).toBe(true);
    expect(site.hero.mobileSrc).toBe("/images/attractions/via-dolorosa-mobile.webp");
    expect(existsSync("public"+site.hero.mobileSrc)).toBe(true);
    expect(content.itineraryFirst).toBe(true);
    expect(content.itineraryBeforeHighlights).toBe(true);
    expect(content.facts).toHaveLength(6);
    expect(content.faqs).toHaveLength(7);
    expect(content.sources).toHaveLength(8);
    const meta=viaDolorosaMeta();
    expect(meta.links.some(link=>link.rel==="canonical"&&link.href?.includes(content.path))).toBe(true);
    const schema=meta.scripts.map(script=>JSON.parse(script.children as string)).find(entry=>entry["@type"]==="Article");
    expect(schema.dateModified).toBe("2026-11-23");
    expect(schema.citation).toEqual(content.sources.map(source=>source.url));
  });

  it("guides visitors along all fourteen stations with ten sensible map markers",()=>{
    expect(site.stations).toHaveLength(14);
    expect(site.stations.map(s=>s.n)).toEqual(Array.from({length:14},(_,i)=>i+1));
    expect(site.stations.slice(0,9).every(s=>!s.place.includes("Holy Sepulchre"))).toBe(true);
    expect(site.stations.slice(9).every(s=>s.place.includes("Holy Sepulchre"))).toBe(true);
    expect(page).toContain("stations.map");
    expect(page).toContain("min-w-[680px]");
    expect(page).toContain("overflow-x-auto");
    expect(page).toContain("min-w-[790px]");
    expect(page).toContain("<ViaDolorosaRouteMap />");
    expect(page).toContain("walkingLegs.map");
    expect(page).toContain("Stations VII–XIV");
    expect(page).toContain("Station VIII Via Dolorosa");
    expect(page).toContain("Station IX Via Dolorosa");
    expect(site.stations[12].place).toContain("Our Lady of Sorrows");
    expect(site.stations[12].note).toContain("Stone of Anointing");
    expect(map).toContain('data-testid="via-dolorosa-map"');
    expect(map).toContain('type: "via-dolorosa-map-focus"');
    expect(map).toContain('via-dolorosa-map-selected');
    expect(map).toContain('focus("all")');
    expect(mapHtml).toContain("points.length!==10");
    expect(mapHtml).toContain("new maplibregl.Marker");
    expect(mapHtml).toContain("points.forEach");
    expect(mapHtml).toContain("www.google.com/maps/search");
  });

  it("provides meaningful visiting hours, the Friday procession and three guided options",()=>{
    for(const text of [
      'data-testid="via-dolorosa-hours"',
      'data-testid="via-dolorosa-friday"',
      'data-testid="via-dolorosa-arrival"',
      'data-testid="via-dolorosa-visit-choices"',
      'data-testid="via-dolorosa-accessibility"',
      'data-testid="via-dolorosa-tour-cards"',
      "15:00 in winter","16:00 in summer",
      "Ecce Homo","Church of the Flagellation","Church of the Holy Sepulchre",
      "CuratedPartnerTourCard","ExternalTourCard","lg:grid-cols-3",
    ])expect(page).toContain(text);
    expect(page).toContain("https://viator.tpk.lv/YV4HrN5E");
    expect(page).toContain("featuredWalks.map");
    expect(page).toContain("Tue–Sun 09:00–18:00 summer");
    expect(page).toContain("Last admission 30 minutes");
    expect(page).toContain("₪30 Via Dolorosa Experience");
    expect(page).toContain("₪50 combined ticket");
    expect(site.official.flagellationMuseum).toContain("/en/visit-us/");
    expect(page).toContain('pageId="attractions-via-dolorosa" compact');
    expect(page).not.toContain('pageId="attractions-old-city-jerusalem" compact');
    for (const key of ["tour-jerusalem-old-city-walk-viator@attractions-via-dolorosa", "tour-jerusalem-private-oldcity-walk-viator@attractions-via-dolorosa"]) {
      expect(affiliateConfig[key]?.trackingUrl).toContain("sub_id=attractions_via_dolorosa_");
    }
    expect(page).toContain("pageId=\"attractions-via-dolorosa\"");
    expect(page).not.toContain("DEMO");
  });

  it("is integrated under Jerusalem on the attractions hub and both sidebar menus",()=>{
    const card=attractionHubCards.find(item=>item.to===content.path);
    expect(card?.title).toBe("Via Dolorosa");
    expect(card?.photo.src).toBe(site.hero.src);
    expect(attractionHubRegions.find(region=>region.id==="jerusalem")?.cards.some(item=>item.to===content.path)).toBe(true);
    const menu=attractionSidebarRegions.find(item=>"children" in item&&item.label==="Jerusalem");
    expect(menu&&"children" in menu&&menu.children?.some(item=>item.to===content.path)).toBe(true);
    expect(attractionSidebarGuideLabels["via-dolorosa"]).toBe("Via Dolorosa");
    expect(content.nearby).toHaveLength(6);
    const hub=readFileSync("src/routes/attractions.index.tsx","utf8");
    expect(hub).toContain('className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-3"');
    expect(christianAreas.find(area=>area.id==="jerusalem")?.sites).toContainEqual({
      name:"Via Dolorosa",
      note:"The traditional Stations of the Cross",
      to:"/attractions/via-dolorosa/",
    });
    for(const path of [
      "/attractions/old-city-jerusalem/",
      "/attractions/mount-of-olives/",
      "/attractions/mount-zion/",
      "/travel-blog/churches-in-jerusalem/",
    ])expect(content.nearby?.some(item=>item.to===path)).toBe(true);
  });

  it("has reciprocal Jerusalem links and keeps distinct photos and station illustrations",()=>{
    for(const file of [
      "src/components/OldCityJerusalemAttractionPage.tsx",
      "src/components/MountOlivesAttractionPage.tsx",
      "src/components/MountZionAttractionPage.tsx",
      "src/components/JerusalemChurchesGuide.tsx",
      "src/components/JerusalemCityHub.tsx",
    ])expect(readFileSync(file,"utf8")).toContain("/attractions/via-dolorosa/");
    const images=[site.hero.src,
      "/images/jerusalem/churches/flagellation.webp",
      "/images/jerusalem/churches/ecce-homo.webp",
      "/images/attractions/old-jerusalem-holy-sepulchre.webp",
      "/images/attractions/via-dolorosa-stations-3-5.svg",
      "/images/attractions/via-dolorosa-stations-6-9.svg"];
    expect(new Set(images).size).toBe(images.length);
    for(const photo of images)expect(existsSync("public"+photo)).toBe(true);
    expect(page).toContain("mobileImageFirst");
  });
});
