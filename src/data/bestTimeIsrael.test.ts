import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { bestTimeGuide, monthFits, seasonalFits, suitabilityColumns, regionalRecommendations, seasonDetails } from "./bestTimeIsrael";
import { migrationPhotos } from "./guideMigrationPhotos";
import { travelGuides } from "./travelGuides";
import { affiliateConfig } from "./registry";

describe("Best Time to Visit Israel — editorial and layout regressions",()=>{
  it("keeps the current hero photograph unchanged and preserves guide metadata",()=>{
    expect(bestTimeGuide.photo.src).toBe(migrationPhotos["best-time-to-visit-israel"].src);
    expect(bestTimeGuide.photo.alt).toBe(migrationPhotos["best-time-to-visit-israel"].alt);
    expect(bestTimeGuide.title).toBe("Best Time to Visit Israel");
    expect(bestTimeGuide.updatedAt).toBe("2026-11-21");
    expect(travelGuides.bestTime).toBe(bestTimeGuide);
    const route=readFileSync("src/routes/travel-blog.best-time-to-visit-israel.tsx","utf8");
    expect(route).toContain('travelGuideMeta("bestTime")');
    expect(route).toContain("component: BestTimeIsraelGuide");
    expect(route).not.toContain('<TravelGuidePage id="bestTime"');
  });

  it("covers exactly twelve calendar months and five distinct travel purposes",()=>{
    expect(monthFits).toHaveLength(12);
    expect(monthFits.map(month=>month.month)).toEqual([
      "January","February","March","April","May","June","July","August","September","October","November","December"
    ]);
    expect(suitabilityColumns.map(column=>column.key)).toEqual(["city","swimming","north","deadSea","desert"]);
    for(const month of monthFits){
      for(const col of suitabilityColumns)expect(Object.keys(seasonalFits)).toContain(month[col.key]);
      expect(month.insight.length).toBeGreaterThan(25);
    }
    expect(monthFits.filter(m=>m.season==="spring")).toHaveLength(3);
    expect(monthFits.filter(m=>m.season==="summer")).toHaveLength(3);
    expect(monthFits.filter(m=>m.season==="autumn")).toHaveLength(3);
    expect(monthFits.filter(m=>m.season==="winter")).toHaveLength(3);
    expect(monthFits.find(x=>x.month==="August")?.desert).toBe("challenging");
    expect(monthFits.find(x=>x.month==="January")?.swimming).toBe("challenging");
    expect(monthFits.find(x=>x.month==="September")?.city).toBe("variable");
  });

  it("presents region-specific advice and independent seasonal narratives",()=>{
    expect(regionalRecommendations).toHaveLength(5);
    expect(new Set(regionalRecommendations.map(x=>x.id)).size).toBe(5);
    for(const region of regionalRecommendations){
      expect(region.to).toMatch(/^\/(travel-blog|attractions)\//);
      expect(region.caution).toBeTruthy();
      expect(region.goodMonths).toBeTruthy();
    }
    expect(seasonDetails.map(x=>x.id)).toEqual(["spring","summer","autumn","winter"]);
    for(const section of seasonDetails){
      expect(section.paragraphs).toHaveLength(2);
      expect(section.links.length).toBeGreaterThan(0);
      expect(section.tip).toBeTruthy();
    }
  });

  it("ships the custom accessible layout, local seasonal photos and relevant official safety links",()=>{
    const component=readFileSync("src/components/BestTimeIsraelGuide.tsx","utf8");
    expect(component).toContain("GuideHeroLayout");
    expect(component).toContain("<GuideHeroMedia src={guide.photo.src} alt={guide.photo.alt}");
    expect(component).toContain("aria-pressed={filter===value}");
    expect(component).toContain("<table");
    expect(component).toContain('<caption className="sr-only">');
    expect(component).toContain('role="region"');
    expect(component).toContain('scroll-mt-24');
    expect(component).toContain("MonthMatrix");
    expect(component).toContain("RegionCards");
    expect(component).toContain("SeasonSections");
    expect(component).toContain("HolidayAndWeather");
    expect(component).toContain("https://ims.gov.il/en/warning");
    expect(component).toContain("https://en.parks.org.il/");
    expect(component).toContain('to="/travel-blog/israel-holidays/"');
    for(const file of [
      "src/assets/home/hero-galilee-medium.webp",
      "src/assets/tel-aviv/beachfront.webp",
      "src/assets/home/hero-haifa-medium.webp",
      "src/assets/home/hero-eilat-mountains-sm.webp"
    ])expect(existsSync(file),file).toBe(true);
    expect(component).toContain("loading=\"lazy\"");
    expect(component).toContain('guideHeroPhotoForPath(String(item.to))');
    expect(component.indexOf("<SourcesDisclosure>")).toBeGreaterThan(component.indexOf("<HomeContactForm"));
    expect(component).not.toContain('<section id="faq"');
    expect(component).not.toContain('["sources"');
    expect(component).toContain('["contact","Contact me"]');
    expect(component).toContain('className="grid grid-cols-2 gap-4 lg:grid-cols-3"');
  });

  it("only offers existing provider-linked products with distinct page-level click attribution",()=>{
    const configIds=[
      "tour-jerusalem-old-city-walk-viator@tours-jerusalem",
      "tour-jaffa-carmel-walk-getyourguide@tours-tel-aviv-jaffa",
      "jslm-deadsea-masada-viator"
    ];
    for(const id of configIds)expect(affiliateConfig[id]?.trackingUrl).toMatch(/^https:\/\/(?:viator|getyourguide)\.tpm\.li\//);
    const page=readFileSync("src/components/BestTimeIsraelGuide.tsx","utf8");
    expect(page).toContain('url.searchParams.set("sub_id",item.sub)');
    expect(page).toContain("rel={relFor(true)}");
    expect(page).toContain("recordOutboundClick");
    expect(page).not.toContain("starting price");
    expect(page).toContain('data-testid="best-time-seasonal-tours"');
  });
});
