/**
 * Hotel card photographs are local illustrative views of Jerusalem districts.
 * They are not claims about the named hotel's rooms, facilities or exterior.
 * Image assets live in src/assets or public/images and are served by this site.
 */
import type { HotelIllustration } from "@/data/telAvivHotelPhotos";
import jerusalemOldCity from "@/assets/home/jerusalem-old-city.webp";
import downtown from "@/assets/jerusalem/downtown.webp";
import eastJerusalem from "@/assets/jerusalem/east-jerusalem.webp";
import germanColony from "@/assets/jerusalem/german-colony.webp";
import mamilla from "@/assets/jerusalem/mamilla.webp";
import mahaneYehuda from "@/assets/jerusalem/mahane-yehuda.webp";
import oldCity from "@/assets/jerusalem/old-city.webp";

const neighbourhood = (src: string, alt: string): HotelIllustration => ({
  src,
  alt,
  label: "Illustrative Jerusalem area photograph",
  credit: "Photograph from the site's local Jerusalem image collection",
});

export const jerusalemHotelPhotos: Record<string, HotelIllustration> = {
  "herbert-samuel": neighbourhood(downtown, "View of central Jerusalem streets and buildings"),
  "arthur": neighbourhood("/images/city-stays/jerusalem-downtown.webp", "Downtown Jerusalem neighbourhood"),
  "mamilla": neighbourhood(mamilla, "Mamilla and the historic city surroundings"),
  "king-david": neighbourhood("/images/city-stays/jerusalem-mamilla.webp", "Mamilla and King David Street area of Jerusalem"),
  "new-imperial": {
    src: jerusalemOldCity,
    alt: "Historic Jerusalem Old City skyline and stone buildings",
    label: "Illustrative Jerusalem city photograph",
    credit: "Berthold Werner · Public domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jerusalem_Dome_of_the_rock_BW_14.JPG",
  },
  "sephardic-house": neighbourhood(oldCity, "Stone buildings and narrow streets of Jerusalem Old City"),
  "bezalel": neighbourhood("/images/attractions/jerusalem-shopping.webp", "Jerusalem market streets and shopping area"),
  "market-courtyard": neighbourhood(mahaneYehuda, "Market surroundings in Jerusalem"),
  "american-colony": neighbourhood(eastJerusalem, "Jerusalem's eastern districts"),
  "jerusalem-hotel": neighbourhood("/images/hotels/jerusalem-night.webp", "Jerusalem skyline at night"),
  "orient": neighbourhood(germanColony, "Jerusalem's German Colony neighbourhood"),
  "rafael-residence": neighbourhood("/images/jerusalem/first-station.webp", "Historic First Station area of Jerusalem near Baka"),
};
