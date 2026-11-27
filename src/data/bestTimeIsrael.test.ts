import { sourceFragment, sourceIndex } from "@/test-utils/source-fragment";
import { readRouteSource } from "@/test-utils/read-route-source";
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { bestTimeGuide, monthFits, seasonalFits, suitabilityColumns, regionalRecommendations, seasonDetails } from "./bestTimeIsrael";
import { migrationPhotos } from "./guideMigrationPhotos";
import { travelGuides } from "./travelGuides";
import { affiliateConfig, publicSources } from "./registry";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { masadaSite } from "@/data/masadaSite";

describe("Best Time to Visit Israel — editorial and layout regressions",()=>{
  it("keeps the current hero photograph unchanged and preserves guide metadata",()=>{
    expect(bestTimeGuide.photo.src).toBe(migrationPhotos["best-time-to-visit-israel"].src);
    expect(bestTimeGuide.photo.alt).toBe(migrationPhotos["best-time-to-visit-israel"].alt);
    expect(bestTimeGuide.title).toBe("Best Time to Visit Israel: Weather & Seasons");
    expect(bestTimeGuide.updatedAt).toBe("2026-11-21");
    expect(travelGuides.bestTime).toBe(bestTimeGuide);
    const route=readRouteSource("src/routes/travel-blog.best-time-to-visit-israel.tsx");
    expect(route).toMatch(sourceFragment('travelGuideMeta("bestTime")'));
    expect(route).toMatch(sourceFragment("component: BestTimeIsraelGuide"));
    expect(route).not.toMatch(sourceFragment('<TravelGuidePage id="bestTime"'));
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
    expect(suitabilityColumns.find(col=>col.key==="deadSea")?.label).toMatch(/walks/i);
    expect(suitabilityColumns.find(col=>col.key==="deadSea")?.description).toMatch(/Not a swimming suitability rating/);
  });

  it("presents region-specific advice and independent seasonal narratives",()=>{
    expect(regionalRecommendations).toHaveLength(5);
    expect(new Set(regionalRecommendations.map(x=>x.id)).size).toBe(5);
    for(const region of regionalRecommendations){
      expect(region.to).toMatch(/^\/(travel-blog|attractions)\//);
      expect(region.caution).toBeTruthy();
      expect(region.goodMonths).toBeTruthy();
      expect(region.to).not.toMatch(/\/travel-blog\/(?:sea-of-galilee|the-dead-sea)\//);
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
    expect(component).toMatch(sourceFragment("<GuideHeroMedia src={guide.photo.src} alt={guide.photo.alt}"));
    expect(component).toMatch(sourceFragment("aria-pressed={filter===value}"));
    expect(component).toMatch(sourceFragment("<table"));
    expect(component).toMatch(sourceFragment('<caption className="sr-only">'));
    expect(component).toMatch(sourceFragment('role="region"'));
    expect(component).toContain('scroll-mt-24');
    expect(component).toContain("MonthMatrix");
    expect(component).toContain("RegionCards");
    expect(component).toContain("SeasonSections");
    expect(component).toContain("HolidayAndWeather");
    expect(component).toMatch(sourceFragment("https://ims.gov.il/en/warning"));
    expect(component).toMatch(sourceFragment("https://en.parks.org.il/"));
    expect(component).toMatch(sourceFragment('to="/travel-blog/calendar-of-events/"'));
    for(const season of ["spring","summer","autumn","winter"]){
      for(const width of [320,720]){
        const file=`public/images/best-time-israel/${season}-${width}.webp`;
        expect(existsSync(file),file).toBe(true);
        const bytes=readFileSync(file);
        expect(bytes.toString("ascii",0,4),file).toBe("RIFF");
        expect(bytes.toString("ascii",8,12),file).toBe("WEBP");
        expect(bytes.byteLength,file).toBeLessThan(170_000);
      }
    }
    expect(component).toMatch(sourceFragment("srcSet={photo.srcSet}"));
    expect(component).toMatch(sourceFragment("sizes={seasonPhotoSize}"));
    expect(component).toMatch(sourceFragment("src={photo.src}"));
    expect(component).toMatch(sourceFragment("Bahai Gardens"));
    expect(component).not.toContain("hero-haifa-medium.webp");
    expect(component).toMatch(sourceFragment("loading=\"lazy\""));
    expect(component).toMatch(sourceFragment('guideHeroPhotoForPath(String(item.to))'));
    expect(sourceIndex(component, "<SourcesDisclosure>")).toBeGreaterThan(sourceIndex(component, "<HomeContactForm"));
    expect(component).not.toMatch(sourceFragment('<section id="faq"'));
    expect(component).not.toContain('["sources"');
    expect(component).toMatch(sourceFragment('["contact","Contact me"]'));
    expect(component).toMatch(sourceFragment('className="grid grid-cols-2 gap-4 lg:grid-cols-3"'));
    expect(component).toMatch(sourceFragment('role="status" aria-live="polite"'));
    expect(component).toMatch(sourceFragment('aria-controls="month-insight"'));
    expect(component).toMatch(sourceFragment('const activeMonth=visible.find'));
    expect(component).toMatch(sourceFragment('onClick={()=>setSelectedMonth(month.month)}'));
    expect(component).not.toMatch(sourceFragment('visible.map(month=><div key={month.month}'));
    expect(component).toMatch(sourceFragment('to:"/attractions/sea-of-galilee/"'));
    expect(component).toMatch(sourceFragment('to:"/attractions/dead-sea/"'));
  });

  it("only offers existing provider-linked products with distinct page-level click attribution",()=>{
    const configIds=[
      "tour-jerusalem-old-city-walk-viator@tours-jerusalem",
      "tour-jaffa-carmel-walk-getyourguide@tours-tel-aviv-jaffa",
      "jslm-deadsea-masada-viator"
    ];
    for(const id of configIds)expect(affiliateConfig[id]?.trackingUrl).toMatch(/^https:\/\/(?:viator|getyourguide)\.tpm\.li\//);
    const page=readFileSync("src/components/BestTimeIsraelGuide.tsx","utf8");
    expect(page).toMatch(sourceFragment('url.searchParams.set("sub_id",item.sub)'));
    expect(readFileSync("src/components/CuratedPartnerTourCard.tsx","utf8")).toMatch(sourceFragment("<ExternalProviderTourCard"));
    expect(readFileSync("src/components/ExternalProviderTourCard.tsx","utf8")).toMatch(sourceFragment("rel={relFor(affiliate)}"));
    expect(readFileSync("src/components/CuratedPartnerTourCard.tsx","utf8")).toContain("recordOutboundClick");
    expect(page).not.toMatch(sourceFragment("starting price"));
    expect(page).toMatch(sourceFragment('data-testid="best-time-seasonal-tours"'));
    expect(page).toMatch(sourceFragment('image={item.image} alt={item.alt}'));
    expect(page).toMatch(sourceFragment("<CuratedPartnerTourCard"));
    expect(page).toContain("masadaTourPhoto");
    expect(page).toContain("/images/attractions/old-jerusalem-cardo.webp");
    expect(page).toContain("/images/attractions/jaffa-flea-market.webp");
  });
  it("resolves the three formerly blank cards to the exact target guide hero",()=>{
    const paths=[
      "/attractions/sea-of-galilee/",
      "/attractions/dead-sea/",
      "/attractions/masada/"
    ];
    for(const to of paths){
      const photo=guideHeroPhotoForPath(to);
      expect(photo,to).toBeDefined();
      expect(photo?.src,to).toBeTruthy();
      expect(photo?.alt,to).toBeTruthy();
    }
    expect(guideHeroPhotoForPath("/attractions/masada/")).toEqual(masadaSite.hero);
    const component=readFileSync("src/components/BestTimeIsraelGuide.tsx","utf8");
    for(const to of paths)expect(component).toMatch(sourceFragment(`to:"${to}"`));
    expect(component).not.toMatch(sourceFragment('to:"/travel-blog/sea-of-galilee/"'));
    expect(component).not.toMatch(sourceFragment('to:"/travel-blog/the-dead-sea/"'));
  });

  it("resolves every declared citation ID to an independent external source",()=>{
    const sources=publicSources(bestTimeGuide.sourceIds);
    expect(sources).toHaveLength(bestTimeGuide.sourceIds.length);
    expect(sources.map(source=>source.id)).toEqual(bestTimeGuide.sourceIds);
    expect(sources.find(s=>s.id==="m26-ims")?.url).toBe("https://ims.gov.il/en/ClimateAtlas");
    expect(sources.find(s=>s.id==="m26-hebcal")?.url).toContain("hebcal.com/holidays");
    expect(sources.find(s=>s.id==="m26-parks")?.url).toContain("en.parks.org.il");
  });

});
