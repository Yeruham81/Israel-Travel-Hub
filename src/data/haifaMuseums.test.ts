import {existsSync,readFileSync} from "node:fs";
import {describe,expect,it} from "vitest";
import {haifaMuseumAreas,haifaMuseums,haifaAdditionalMuseums} from "@/data/haifaMuseums";
import {haifaMuseumPhotos,haifaMuseumPhotoCredits} from "@/data/haifaMuseumPhotos";

describe("Haifa museums editorial guide",()=>{
  it("covers ten independently identifiable museums without mislabelling parks and gardens",()=>{
    expect(haifaMuseums).toHaveLength(10);
    expect(new Set(haifaMuseums.map(m=>m.id)).size).toBe(10);
    const ids=new Set(haifaMuseums.map(m=>m.id));
    for(const id of ["art","city","railway","madatech","struck","tikotin","mane-katz","hecht","maritime","naval"]) {
      expect(ids.has(id),id).toBe(true);
    }
    expect(haifaMuseumAreas).toHaveLength(4);
    expect(haifaAdditionalMuseums).toHaveLength(2);
    expect(haifaMuseums.some(m=>/Bahá|Sculpture Garden|Computer Museum/i.test(m.name))).toBe(false);
  });
  it("preserves the precise distinctions between the maritime museums, free Hecht and closed Mane-Katz",()=>{
    const maritime=haifaMuseums.find(m=>m.id==="maritime")!;
    const naval=haifaMuseums.find(m=>m.id==="naval")!;
    const hecht=haifaMuseums.find(m=>m.id==="hecht")!;
    const mane=haifaMuseums.find(m=>m.id==="mane-katz")!;
    expect(maritime.address).toContain("198 Allenby");
    expect(naval.address).toContain("204 Allenby");
    expect(naval.url).toContain("museums.mod.gov.il");
    expect(maritime.url).toContain("nmm.org.il");
    expect(hecht.priceNis).toBe(0);
    expect(mane.closureNote).toMatch(/Closed for renovation/);
    expect(mane.booking).toMatch(/Do not plan an interior visit/);
  });
  it("uses real operator information, not stale free-weekend claims or guessed private-museum admission",()=>{
    for(const m of haifaMuseums){
      expect(m.url).toMatch(/^https:\/\//);
      expect(m.address,m.id).toBeTruthy();
      expect(m.openingDays,m.id).toBeTruthy();
      expect(m.admission,m.id).toBeTruthy();
      expect(m.booking,m.id).toBeTruthy();
      expect(m.tip,m.id).toBeTruthy();
      expect(m.highlights.length,m.id).toBeGreaterThanOrEqual(2);
    }
    expect(haifaMuseums.find(m=>m.id==="madatech")!.booking).toContain("advance");
    const source=readFileSync("src/data/haifaMuseums.ts","utf8");
    expect(source).not.toContain("Entrance is free on Fridays and Saturdays");
  });
  it("uses ten distinct local photos and credits the three licensed Wikimedia sources",()=>{
    const unique=new Set<string>();
    for(const museum of haifaMuseums){
      const photo=haifaMuseumPhotos[museum.id]!;
      expect(photo,museum.id).toBeDefined();
      expect(photo.src,museum.id).toMatch(/^\/images\/haifa-museums\/[a-z-]+\.webp$/);
      expect(existsSync("public"+photo.src),museum.id).toBe(true);
      expect(photo.width,museum.id).toBeGreaterThan(0);
      expect(photo.height,museum.id).toBeGreaterThan(0);
      expect(photo.alt,museum.id).toBeTruthy();
      expect(unique.has(photo.src),museum.id).toBe(false);
      unique.add(photo.src);
    }
    expect(unique.size).toBe(10);
    expect(haifaMuseumPhotoCredits.map(c=>c.id).sort()).toEqual(["hecht","mane-katz","struck"]);
    for(const credit of haifaMuseumPhotoCredits){
      expect(credit.author).toBeTruthy();
      expect(credit.sourceUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
      expect(credit.licenseUrl).toMatch(/^https:\/\/creativecommons\.org\/licenses\//);
    }
    expect(readFileSync("src/components/HaifaMuseumsGuide.tsx","utf8")).toContain("haifaMuseumPhotoCredits.map");
  });
  it("uses the same wide-card visual system as Jerusalem and Tel Aviv",()=>{
    const haifa=readFileSync("src/components/HaifaMuseumsGuide.tsx","utf8");
    const telAviv=readFileSync("src/components/TelAvivMuseumsGuide.tsx","utf8");
    const jerusalem=readFileSync("src/components/JerusalemMuseumsGuide.tsx","utf8");
    for(const fragment of [
      'data-museum-card="horizontal"',
      "lg:grid-cols-[minmax(0,1fr)_270px]",
      "lg:col-start-2 lg:row-start-1",
      "lg:col-start-1 lg:row-start-1",
      'className="border-t px-4 py-4 sm:px-5 lg:px-6"',
      "lg:grid-cols-2 lg:gap-6",
      'className="mt-5 grid gap-5"',
      "lg:min-w-[360px]",
      'loading="lazy"',
      'decoding="async"',
    ]){
      expect(haifa,fragment).toContain(fragment);
      expect(telAviv,fragment).toContain(fragment);
      expect(jerusalem,fragment).toContain(fragment);
    }
    expect(haifa).not.toContain("md:grid-cols-2\">{museums.filter");
    expect(haifa).toContain('neighborhoodTripContactCopy("Haifa")');
    expect(haifa).toContain('guideHeroPhotoForPath(item.to)');
    expect(haifa).toContain("MuseumMap");
    expect(haifa).toContain("https://www.google.com/maps/dir/?api=1&destination=");
    expect(haifa).not.toContain("Architectural illustration, not a photograph");
  });
  it("routes Haifa museums to its upgraded editorial page rather than the retired generic renderer",()=>{
    const route=readFileSync("src/routes/travel-blog.museums-in-haifa.tsx","utf8");
    expect(route).toContain("component: HaifaMuseumsGuide");
    expect(route).not.toContain('<TravelGuidePage id="haifaMuseums"');
  });
});
