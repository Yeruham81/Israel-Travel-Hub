import annunciationHero from "@/assets/guides/2026-11/basilica-annunciation-courtyard.webp";

/** Shared visitor facts for the Basilica of the Annunciation in Nazareth. */
export const annunciationSite = {
  title: "Basilica of the Annunciation in Nazareth: Visitor Guide",
  description: "Visit Nazareth's Basilica of the Annunciation: the Grotto, upper church, Marian mosaics, free admission, opening hours and nearby Christian sites.",
  region: "Nazareth & Lower Galilee" as const,
  updatedAt: "2026-11-17",
  intro: "The Basilica of the Annunciation stands in the heart of Nazareth, above the grotto traditionally associated with the angel Gabriel's message to Mary. I recommend making time for both the quiet lower sanctuary and the bright upper church, as well as the remarkable Marian artworks from around the world.",
  hero: {
    src: annunciationHero,
    alt: "Courtyard and domed exterior of the Basilica of the Annunciation in Nazareth",
  },
  hours: {
    generalVisitors: "08:00–18:00",
    lastEntry: "17:45",
    eveningPrayer: "18:00–21:00",
  },
  pilgrimsOffice: {
    phone: "04-656-0001",
    href: "+97246560001",
    email: "pilgoffice@gmail.com",
  },
  sources: {
    custody: "https://www.custodia.org/en/sanctuaries/nazareth-basilica-of-the-annunciation/",
    cic: "https://www.cicts.org/our-services/",
    brochure: "https://www.custodia.org/wp-content/uploads/2024/12/ENG-nazaret-bis.pdf",
    parish: "https://www.lpj.org/en/the-patriarchate/diocese/parishes/israel-1/nazareth-parish-church-of-the-annunciation",
  },
};
