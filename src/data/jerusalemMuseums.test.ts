import {existsSync,readFileSync} from "node:fs";
import {jerusalemMuseumPhotos} from "@/data/jerusalemMuseumPhotos";
import {describe,expect,it} from "vitest";
import {jerusalemMuseumAreas,jerusalemMuseums,jerusalemMuseumMapPoints,jerusalemAdditionalMuseums} from "@/data/jerusalemMuseums";

describe("Jerusalem museums editorial guide",()=>{
  it("provides distinct locally stored images for every museum",()=>{
    const sources = new Set<string>();
    for(const museum of jerusalemMuseums){
      const photo = jerusalemMuseumPhotos[museum.id]!;
      expect(photo,museum.id).toBeDefined();
      expect(photo.alt,museum.id).toBeTruthy();
      expect(photo.src,museum.id).toMatch(/^\/images\/jerusalem-museums\//);
      expect(existsSync("public"+photo.src),museum.id).toBe(true);
      expect(sources.has(photo.src),museum.id).toBe(false);
      sources.add(photo.src);
    }
    expect(jerusalemMuseumPhotos["music"]!.illustrative).toBe(true);
  });
  it("retains all twelve original subjects and adds three central museums",()=>{
    expect(jerusalemMuseums).toHaveLength(15);
    expect(new Set(jerusalemMuseums.map(m=>m.id)).size).toBe(15);
    for(const id of ["israel","yad","tower","bible","time","rockefeller","islamic","science","prison","begin","friends","tolerance","music","italian","seam"]){
      expect(jerusalemMuseums.some(m=>m.id===id),id).toBe(true);
    }
    expect(jerusalemAdditionalMuseums).toHaveLength(2);
    expect(jerusalemMuseumAreas).toHaveLength(4);
  });
  it("has official visitor links and usable visitor data",()=>{
    const areaIds=new Set(jerusalemMuseumAreas.map(x=>x.id));
    for(const m of jerusalemMuseums){
      expect(areaIds.has(m.area),m.id).toBe(true);
      expect(m.address,m.id).toBeTruthy();
      expect(m.duration,m.id).toBeTruthy();
      expect(m.admission,m.id).toBeTruthy();
      expect(m.openingDays,m.id).toBeTruthy();
      expect(m.booking,m.id).toBeTruthy();
      expect(m.tip,m.id).toBeTruthy();
      expect(m.highlights.length,m.id).toBeGreaterThanOrEqual(2);
      expect(m.url,m.id).toMatch(/^https:\/\//);
      if(m.ticketUrl)expect(m.ticketUrl).toMatch(/^https:\/\//);
    }
    expect(jerusalemMuseums.filter(m=>m.featured).length).toBeGreaterThanOrEqual(4);
  });
  it("qualifies sensitive entry arrangements instead of repeating obsolete old-guide claims",()=>{
    const yad=jerusalemMuseums.find(m=>m.id==="yad")!;
    const rockefeller=jerusalemMuseums.find(m=>m.id==="rockefeller")!;
    const science=jerusalemMuseums.find(m=>m.id==="science")!;
    const time=jerusalemMuseums.find(m=>m.id==="time")!;
    expect(yad.priceNis).toBe(0);
    expect(yad.tip).toContain("aged 10 and over");
    expect(yad.booking).toContain("Reserve");
    expect(rockefeller.priceNis).toBeUndefined();
    expect(rockefeller.closureNote).toContain("Closed to regular walk-in visitors");
    expect(rockefeller.tip).not.toContain("free entry");
    expect(science.booking).toContain("required");
    expect(time.theme).toBe("Multimedia attraction");
  });
  it("uses accurately positioned pins and clustered map messaging",()=>{
    expect(jerusalemMuseumMapPoints).toHaveLength(15);
    for(const m of jerusalemMuseumMapPoints){
      expect(m.lat).toBeGreaterThan(31.7);
      expect(m.lat).toBeLessThan(31.85);
      expect(m.lon).toBeGreaterThan(35.14);
      expect(m.lon).toBeLessThan(35.28);
    }
    expect(jerusalemMuseumMapPoints.filter(m=>m.closed).map(m=>m.id)).toEqual(["rockefeller"]);
    const html=readFileSync("public/maps/jerusalem-museums.html","utf8");
    const guide=readFileSync("src/components/JerusalemMuseumsGuide.tsx","utf8");
    expect(html).toContain("cluster:true");
    expect(html).toContain("getClusterExpansionZoom");
    expect(html).toContain("jerusalem-museum-map-focus");
    expect(html).toContain("jerusalem-museum-map-selected");
    expect(guide).toContain("https://www.google.com/maps/dir/?api=1&destination=");
    expect(guide).toContain("Show all museums");
    expect(guide).not.toContain("Swipe the table horizontally");
    expect(guide).not.toContain("Every listing has its own Directions link");
  });
});
