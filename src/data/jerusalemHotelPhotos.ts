/**
 * Hotel card photographs are local illustrative views of Jerusalem districts.
 * They are not claims about the named hotel's rooms, facilities or exterior.
 * Image assets live in src/assets or public/images and are served by this site.
 */
import type { HotelIllustration } from "@/data/telAvivHotelPhotos";
import jerusalemOldCity from "@/assets/home/jerusalem-old-city.webp";
import jerusalemLightRail from "@/assets/guides/2026-11/jerusalem-light-rail.webp";
import jaffaGate from "@/assets/home/hero-refresh-jerusalem-jaffa-gate-v4-medium.webp";

import foodMarket from "@/assets/tours-hub/food-markets.webp";



const neighbourhood = (src: string, alt: string): HotelIllustration => ({
  src,
  alt,
  label: "Illustrative Jerusalem area photograph",
  credit: "Photograph from the site's local Jerusalem image collection",
});

export const jerusalemHotelPhotos: Record<string, HotelIllustration> = {
  "herbert-samuel": neighbourhood(jerusalemLightRail, "Light rail and street scene in central Jerusalem"),
  "arthur": neighbourhood("/images/city-stays/jerusalem-downtown.webp", "Downtown Jerusalem neighbourhood"),
  "mamilla": neighbourhood(jaffaGate, "Jaffa Gate and the historic walls near Mamilla"),
  "king-david": neighbourhood("/images/city-stays/jerusalem-mamilla.webp", "Mamilla and King David Street area of Jerusalem"),
  "new-imperial": {
    src: jerusalemOldCity,
    alt: "Historic Jerusalem Old City skyline and stone buildings",
    label: "Illustrative Jerusalem city photograph",
    credit: "Berthold Werner · Public domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jerusalem_Dome_of_the_rock_BW_14.JPG",
  },
  "sephardic-house": neighbourhood("/images/attractions/old-jerusalem-cardo.webp", "Ancient Cardo stonework in Jerusalem’s Jewish Quarter"),
  "bezalel": neighbourhood("/images/hotel-cards/bezalel.webp", "Nachlaot neighborhood streets in central Jerusalem"),
  "market-courtyard": neighbourhood(foodMarket, "Food-market stalls illustrating the market atmosphere"),
  "american-colony": neighbourhood("/images/attractions/old-jerusalem-damascus-gate.webp", "Damascus Gate and northern Old City surroundings"),
  "jerusalem-hotel": neighbourhood("/images/hotels/jerusalem-night.webp", "Jerusalem skyline at night"),
  "orient": neighbourhood("/images/city-stays/jerusalem-german-colony.webp", "Street scene in Jerusalem’s German Colony"),
  "rafael-residence": neighbourhood("/images/jerusalem/first-station.webp", "Historic First Station area of Jerusalem near Baka"),
};
