// Homepage image credits. Commons metadata re-read 16 Oct 2026.
export type PhotoCredit = {
  asset: string;
  subject: string;
  author?: string;
  sourceUrl?: string;
  license: string;
  licenseUrl?: string;
  changes: string;
};

const RESIZED = "Resized and converted to WebP";

export const photoCredits: PhotoCredit[] = [
  { asset: "dead-sea-beach", subject: "Ein Bokek beach and promenade (Dead Sea accommodation cards)", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/dead_sea_beach_1.jpg", license: "Reused from the publisher's original Dead Sea guide", changes: RESIZED },
  { asset: "hero-tel-aviv", subject: "Tel Aviv beach promenade (hero)", author: "FLASHPACKER TRAVELGUIDE", sourceUrl: "https://commons.wikimedia.org/wiki/File:Tel_Aviv_Tayelet-Strand-Promenade_Beach_(34257299744).jpg", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/", changes: "Cropped to panorama, resized and converted to WebP" },
  { asset: "hero-haifa", subject: "Haifa Bay and Bahá'í Gardens from Mount Carmel (hero)", author: "Юкатан", sourceUrl: "https://commons.wikimedia.org/wiki/File:Panorama_Haifa_(cropped).jpg", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/", changes: "Cropped to panorama, resized and converted to WebP" },
  { asset: "tel-aviv-coast", subject: "Tel Aviv shoreline from Jaffa", author: "Ariel Manor", sourceUrl: "https://commons.wikimedia.org/wiki/File:PikiWiki_Israel_58105_jaffa_-_old_city.jpg", license: "CC BY 2.5", licenseUrl: "https://creativecommons.org/licenses/by/2.5/", changes: RESIZED },
  { asset: "tiberias-lake", subject: "Tiberias from the Sea of Galilee (hero slide and cards)", author: "Ian Scott", sourceUrl: "https://commons.wikimedia.org/wiki/File:Tiberias_from_the_Sea_of_Galilee_(5809646279).jpg", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/", changes: RESIZED },
  { asset: "ben-gurion-t3", subject: "Ben Gurion Airport Terminal 3 reception hall", author: "GeorgeDement", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ben_Gurion_Airport_terminal_3_reception_hall.jpg", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/", changes: RESIZED },
  { asset: "bethlehem-nativity", subject: "Church of the Nativity, Bethlehem", author: "Britchi Mirela", sourceUrl: "https://commons.wikimedia.org/wiki/File:Palestine,_Bethlehem,_Church_of_the_Nativity_or_Birthplace_of_Jesus_(Square).jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", changes: RESIZED },
  { asset: "masada-dead-sea", subject: "Masada from the air (hero slide and cards)", author: "Godot13", sourceUrl: "https://commons.wikimedia.org/wiki/File:Israel-2013-Aerial_13-Masada.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", changes: RESIZED },
  { asset: "masada-cable-car", subject: "Masada cable car", author: "James Emery from Douglasville, United States", sourceUrl: "https://commons.wikimedia.org/wiki/File:Masada_Cable_Car_1438_(511094328).jpg", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", changes: RESIZED },
  { asset: "caesarea-dusk", subject: "Caesarea National Park at dusk (hero slide and feature)", author: "זאב שטיין (Zeev Stein)", sourceUrl: "https://commons.wikimedia.org/wiki/File:125342_caesarea_national_park_PikiWiki_Israel.jpg", license: "CC BY 2.5", licenseUrl: "https://creativecommons.org/licenses/by/2.5/", changes: RESIZED },
  { asset: "caesarea-aqueduct", subject: "Caesarea aqueduct", author: "זאב שטיין (Zeev Stein)", sourceUrl: "https://commons.wikimedia.org/wiki/File:125359_caesarea_national_park_PikiWiki_Israel.jpg", license: "CC BY 2.5", licenseUrl: "https://creativecommons.org/licenses/by/2.5/", changes: RESIZED },
  { asset: "masada-cable-car-wide", subject: "Masada aerial ropeway", author: "Berthold Werner", sourceUrl: "https://commons.wikimedia.org/wiki/File:Israel_Aerial_Ropeway_Masada_BW_1.jpg", license: "Public domain", changes: RESIZED },
  { asset: "caesarea-theatre", subject: "Caesarea Roman theatre", author: "Berthold Werner", sourceUrl: "https://commons.wikimedia.org/wiki/File:Caesarea_maritima_BW_4.JPG", license: "Public domain", changes: RESIZED },
  { asset: "jerusalem-old-city", subject: "Dome of the Rock and Jerusalem Old City from the Mount of Olives (hero slide and Jerusalem cards)", author: "Berthold Werner", sourceUrl: "https://commons.wikimedia.org/wiki/File:Jerusalem_Dome_of_the_rock_BW_14.JPG", license: "Public domain", changes: "Cropped to panorama for the hero, resized and converted to WebP" },
  { asset: "ashdod-port", subject: "Ashdod Port from the air (shore-excursion cards and Ashdod page)", author: "Amos Meron", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ashdod_Port_Aerial_View.jpg", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/", changes: "Cropped to 3:2, resized and converted to WebP" },
  { asset: "haifa-port", subject: "Haifa Port and Haifa Bay from Mount Carmel (shore-excursion cards and Haifa page)", author: "Юкатан", sourceUrl: "https://commons.wikimedia.org/wiki/File:Panorama_Haifa_(cropped).jpg", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/", changes: "Cropped from the hero version to 3:2, resized and converted to WebP" },
  { asset: "category illustrations", subject: "Hotel room, airport pickup, guided walk, cruise passengers at a harbour, road trip", license: "AI-generated illustrations for this site; not real properties, companies or people", changes: "Resized and converted to WebP" },
];
