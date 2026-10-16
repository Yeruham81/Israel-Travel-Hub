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
  { asset: "tel-aviv-coast", subject: "Tel Aviv shoreline from Jaffa", author: "Ariel Manor", sourceUrl: "https://commons.wikimedia.org/wiki/File:PikiWiki_Israel_58105_jaffa_-_old_city.jpg", license: "CC BY 2.5", licenseUrl: "https://creativecommons.org/licenses/by/2.5/", changes: RESIZED },
  { asset: "tiberias-lake", subject: "Tiberias from the Sea of Galilee", author: "Ian Scott", sourceUrl: "https://commons.wikimedia.org/wiki/File:Tiberias_from_the_Sea_of_Galilee_(5809646279).jpg", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/", changes: RESIZED },
  { asset: "ben-gurion-t3", subject: "Ben Gurion Airport Terminal 3 reception hall", author: "GeorgeDement", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ben_Gurion_Airport_terminal_3_reception_hall.jpg", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/", changes: RESIZED },
  { asset: "bethlehem-nativity", subject: "Church of the Nativity, Bethlehem", author: "Britchi Mirela", sourceUrl: "https://commons.wikimedia.org/wiki/File:Palestine,_Bethlehem,_Church_of_the_Nativity_or_Birthplace_of_Jesus_(Square).jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", changes: RESIZED },
  { asset: "masada-dead-sea", subject: "Masada from the air", author: "Godot13", sourceUrl: "https://commons.wikimedia.org/wiki/File:Israel-2013-Aerial_13-Masada.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", changes: RESIZED },
  { asset: "masada-cable-car", subject: "Masada cable car", author: "James Emery from Douglasville, United States", sourceUrl: "https://commons.wikimedia.org/wiki/File:Masada_Cable_Car_1438_(511094328).jpg", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", changes: RESIZED },
  { asset: "caesarea-dusk", subject: "Caesarea National Park at dusk", author: "זאב שטיין (Zeev Stein)", sourceUrl: "https://commons.wikimedia.org/wiki/File:125342_caesarea_national_park_PikiWiki_Israel.jpg", license: "CC BY 2.5", licenseUrl: "https://creativecommons.org/licenses/by/2.5/", changes: RESIZED },
  { asset: "caesarea-aqueduct", subject: "Caesarea aqueduct", author: "זאב שטיין (Zeev Stein)", sourceUrl: "https://commons.wikimedia.org/wiki/File:125359_caesarea_national_park_PikiWiki_Israel.jpg", license: "CC BY 2.5", licenseUrl: "https://creativecommons.org/licenses/by/2.5/", changes: RESIZED },
  { asset: "masada-cable-car-wide", subject: "Masada aerial ropeway", author: "Berthold Werner", sourceUrl: "https://commons.wikimedia.org/wiki/File:Israel_Aerial_Ropeway_Masada_BW_1.jpg", license: "Public domain", changes: RESIZED },
  { asset: "caesarea-theatre", subject: "Caesarea Roman theatre", author: "Berthold Werner", sourceUrl: "https://commons.wikimedia.org/wiki/File:Caesarea_maritima_BW_4.JPG", license: "Public domain", changes: RESIZED },
  { asset: "jerusalem-hero", subject: "Jerusalem Old City (hero and Jerusalem cards)", license: "Image created for this site", changes: "Card copy resized and converted to WebP" },
  { asset: "category illustrations", subject: "Hotel pool, airport pickup, guided walk, road trip", license: "AI-generated illustrations for this site; not real properties, companies or people", changes: "Resized and converted to WebP" },
];
