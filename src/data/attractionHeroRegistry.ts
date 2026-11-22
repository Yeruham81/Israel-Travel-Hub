/** Canonical primary photographs from the actual attraction page data.
 * Link cards must never use a panorama/subsection image instead.
 */
import { akkoSite } from "@/data/akkoSite";
import { annunciationSite } from "@/data/annunciationSite";
import { caesareaSite } from "@/data/caesareaSite";
import { capernaumSite } from "@/data/capernaumSite";
import { eilatSite } from "@/data/eilatSite";
import { einGediSite } from "@/data/einGediSite";
import { haifaSite } from "@/data/haifaSite";
import { jaffaSite } from "@/data/jaffaSite";
import { magdalaSite } from "@/data/magdalaSite";
import { masadaSite } from "@/data/masadaSite";
import { ramonCraterSite } from "@/data/ramonCraterSite";
import { mountBeatitudesSite } from "@/data/mountBeatitudesSite";
import { mountOlivesSite } from "@/data/mountOlivesSite";
import { mountPrecipiceSite } from "@/data/mountPrecipiceSite";
import { mountTaborSite } from "@/data/mountTaborSite";
import { mountZionSite } from "@/data/mountZionSite";
import { oldCityJerusalemSite } from "@/data/oldCityJerusalemSite";
import { viaDolorosaSite } from "@/data/viaDolorosaSite";
import { qasrElYahudSite } from "@/data/qasrElYahudSite";
import { roshHanikraSite } from "@/data/roshHanikraSite";
import { tabghaSite } from "@/data/tabghaSite";
import { telMegiddoSite } from "@/data/telMegiddoSite";
import { yardenitSite } from "@/data/yardenitSite";
import deadSeaHero from "@/assets/dead-sea/landscape.webp";

export const attractionHeroRegistry: Record<string, { src: string; alt: string }> = {
  "/attractions/akko-acre/": akkoSite.hero,
  "/attractions/basilica-of-the-annunciation/": annunciationSite.hero,
  "/attractions/caesarea/": caesareaSite.hero,
  "/attractions/capernaum/": capernaumSite.hero,
  "/attractions/eilat/": eilatSite.hero,
  "/attractions/ein-gedi/": einGediSite.hero,
  "/attractions/haifa/": haifaSite.hero,
  "/attractions/jaffa/": jaffaSite.hero,
  "/attractions/magdala/": magdalaSite.hero,
  "/attractions/masada/": masadaSite.hero,
  "/attractions/mitzpe-ramon-crater/": ramonCraterSite.hero,
  "/attractions/mount-of-beatitudes/": mountBeatitudesSite.hero,
  "/attractions/mount-of-olives/": mountOlivesSite.hero,
  "/attractions/mount-precipice/": mountPrecipiceSite.hero,
  "/attractions/mount-tabor/": mountTaborSite.hero,
  "/attractions/mount-zion/": mountZionSite.hero,
  "/attractions/old-city-jerusalem/": oldCityJerusalemSite.hero,
  "/attractions/via-dolorosa/": viaDolorosaSite.hero,
  "/attractions/qasr-el-yahud/": qasrElYahudSite.hero,
  "/attractions/rosh-hanikra/": roshHanikraSite.hero,
  "/attractions/tabgha/": tabghaSite.hero,
  "/attractions/tel-megiddo/": telMegiddoSite.hero,
  "/attractions/yardenit/": yardenitSite.hero,
  "/attractions/dead-sea/": { src: deadSeaHero, alt: "Dead Sea shoreline and desert scenery" },
  "/attractions/sea-of-galilee/": { src: "/images/attractions/sea-of-galilee.webp", alt: "Blue waters of the Sea of Galilee with the surrounding hills" },
};
