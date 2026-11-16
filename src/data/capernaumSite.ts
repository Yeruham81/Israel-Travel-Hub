import capernaumPhoto from "@/assets/guides/capernaum.jpg";

export const capernaumSite = {
  title: "Capernaum (Kfar Nahum): Visitor Guide",
  description: "Plan a visit to Capernaum: ancient synagogue, traditional Peter's house, Franciscan opening hours and admission, Orthodox monastery and access near the Sea of Galilee.",
  region: "Sea of Galilee" as const,
  duration: "60–90 minutes at the Franciscan archaeological site",
  intro: "On the northwestern shore of the Sea of Galilee, Capernaum preserves the remains of a Jewish village closely associated with Jesus' ministry. Visit the ancient synagogue and the traditional site of Peter's house, then discover the nearby Greek Orthodox monastery and Kfar Nahum National Park along the lakeshore.",
  hero: { src: capernaumPhoto, alt: "Basalt village remains and part of the ancient limestone synagogue at Capernaum, beside the Sea of Galilee" },
  updatedAt: "2026-11-16",
  franciscan: {
    fee: "₪10",
    morning: "08:00–12:00",
    afternoon: "14:00–17:00",
    lastMorningEntry: "11:40",
    lastAfternoonEntry: "16:30",
    phone: "04 672 1059",
    phoneHref: "+97246721059",
  },
  park: {
    regular: "08:00–16:00",
    winterFridays: "08:00–15:00",
    publishedSummerFridays: "13:00–15:00",
    specialHolidayEves: "08:00–13:00",
    phone: "04 679 3865",
    phoneHref: "+97246793865",
  },
  sources: {
    franciscan: "https://www.cicts.org/our-services/",
    archaeology: "https://www.custodia.org/en/sanctuaries/capernaum/",
    orthodox: "https://capernaum.info/opening-hours-and-contacts/",
    park: "https://en.parks.org.il/reserve-park/kfar-nahum-capernaum-national-park/",
    parkHebrew: "https://www.parks.org.il/reserve-park/%D7%92%D7%9F-%D7%9C%D7%90%D7%95%D7%9E%D7%99-%D7%9B%D7%A4%D7%A8-%D7%A0%D7%97%D7%95%D7%9D/",
  },
};
