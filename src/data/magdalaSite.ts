/** Visitor-facing source of truth for the individual Magdala attraction page. */
export const magdalaSite = {
  title: "Magdala: Ancient Synagogue, Archaeology and Duc In Altum",
  description: "Plan a visit to Magdala by the Sea of Galilee: first-century synagogue, Magdala Stone, Duc In Altum, opening hours, tickets, getting there and nearby sites.",
  region: "Sea of Galilee" as const,
  intro: "At Magdala, the remains of a first-century Jewish town stand beside Duc In Altum, a modern Christian prayer centre. I recommend exploring the ancient synagogue and streets before visiting the peaceful chapels overlooking the Sea of Galilee.",
  hero: {
    src: "/images/attractions/magdala-duc-in-altum-exterior.webp",
    alt: "Rounded stone facade of Duc In Altum at Magdala near the Sea of Galilee",
  },
  updatedAt: "2026-11-17",
  visit: {
    archaeologyHours: "08:00–17:30",
    prayerCentreHours: "08:00–18:00",
    days: "Daily",
    visitorPhone: "04-620-9900",
    visitorPhoneHref: "+97246209900",
    visitorEmail: "visit@magdala.org",
    prayerPhone: "053-326-1622",
    prayerPhoneHref: "+972533261622",
    prayerEmail: "ducinaltum@magdala.org",
  },
  sources: {
    plan: "https://www.magdala.org/plan-your-visit",
    archaeology: "https://www.magdala.org/archaeology",
    stoneCatalogue: "https://resources.metmuseum.org/resources/metpublications/pdf/The_World_between_Empires_Art_and_Identity_in_the_Ancient_Middle_East.pdf",
    ducInAltum: "https://www.magdala.org/duc-in-altum",
    contact: "https://www.magdala.org/contact",
    cicHours: "https://www.cicts.org/our-services/",
  },
};
