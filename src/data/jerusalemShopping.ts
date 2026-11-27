// A single editorial registry drives the shopping cards, comparison and map.
// Images are stored locally after being selected from the owner's Drive library.
export type ShoppingPlace = {
  id: string;
  name: string;
  district: "Old City & Mamilla" | "City center & markets" | "South Jerusalem";
  bestFor: string;
  area: string;
  when: string;
  description: string;
  practical: string;
  gettingThere: string;
  highlights: string;
  lat: number;
  lon: number;
  photo?: { src: string; alt: string };
  official?: { label: string; href: string };
};

const images = "/images/jerusalem-shopping/";
export const jerusalemShoppingPlaces: ShoppingPlace[] = [
  {
    id: "old-city",
    name: "Old City markets",
    district: "Old City & Mamilla",
    bestFor: "Traditional souvenirs, textiles & spices",
    area: "Old City souks",
    when: "Visit around your sightseeing route",
    highlights: "Souvenirs · Spices · Ceramics",
    description:
      "I recommend the Old City's souks for traditional market shopping. Browse ceramics, textiles, spices, religious items and gifts as you walk through the quarters.",
    practical:
      "Before purchasing a special piece, ask where it was made and check the materials and final price. Bargaining is welcome at some market stalls, while many shops have fixed prices.",
    gettingThere:
      "Start near Jaffa Gate, Damascus Gate or the gate closest to your chosen quarter; expect narrow, uneven lanes and some steps.",
    lat: 31.7783,
    lon: 35.231,
    photo: {
      src: images + "old-city-market.webp",
      alt: "Covered Jerusalem Old City souk with market shops",
    },
  },
  {
    id: "cardo",
    name: "The Cardo",
    district: "Old City & Mamilla",
    bestFor: "Judaica, art galleries & history",
    area: "Jewish Quarter",
    when: "Combine with a Jewish Quarter walk",
    highlights: "Galleries · Judaica · Archaeology",
    description:
      "Browse shops and galleries along Jerusalem's ancient Cardo. Small galleries, Judaica shops and craft displays are easy to combine with the Jewish Quarter and the Western Wall area.",
    practical:
      "For artwork or fragile gifts, check whether the piece is handmade, the packing arrangements and any shipping charges before buying.",
    gettingThere:
      "Inside the Jewish Quarter of the Old City; use the quarter's pedestrian routes and allow time for steps.",
    lat: 31.7749,
    lon: 35.2315,
    photo: {
      src: images + "cardo.webp",
      alt: "Shops and galleries along Jerusalem's historic Cardo",
    },
  },
  {
    id: "mamilla",
    name: "Mamilla Avenue",
    district: "Old City & Mamilla",
    bestFor: "Fashion, branded stores & cafés",
    area: "Alrov Mamilla near Jaffa Gate",
    when: "Convenient before or after the Old City",
    highlights: "Fashion · Design · Restaurants",
    description:
      "Mamilla is an open-air shopping promenade just outside the Old City, with fashion, jewellery, cafés and restaurants. It offers a modern shopping experience beside Jaffa Gate, distinct from the Old City's traditional markets.",
    practical:
      "Combine it with a visit to Jaffa Gate or the Tower of David. Shop and restaurant opening times differ, particularly on Fridays, Saturdays and holidays.",
    gettingThere:
      "Walk west from Jaffa Gate or approach from the central city streets and nearby tram/bus connections.",
    lat: 31.7777,
    lon: 35.2234,
    photo: {
      src: images + "mamilla.webp",
      alt: "Mamilla open-air pedestrian shopping avenue in Jerusalem",
    },
    official: { label: "Mamilla shops & opening hours", href: "https://alrovmamilla.com/en/" },
  },
  {
    id: "hutzot",
    name: "Hutzot Hayotzer",
    district: "Old City & Mamilla",
    bestFor: "Local crafts & original artwork",
    area: "Artists' Colony by Sultan's Pool",
    when: "Check individual studio visits",
    highlights: "Pottery · Jewellery · Artwork",
    description:
      "Visit the artists' colony near the Old City walls for handmade crafts and local artists.",
    practical:
      "Check the opening hours of the studio you want to visit and the dates of the annual arts festival.",
    gettingThere:
      "Near Sultan's Pool, a downhill walk from the Mamilla/Jaffa Gate area; allow for the return climb.",
    lat: 31.7729,
    lon: 35.2246,
    photo: {
      src: images + "hutzot-hayotzer.webp",
      alt: "Handcrafted artwork displayed at Hutzot Hayotzer artists' colony",
    },
    official: { label: "Artists' Colony website", href: "https://artistscolony.co.il/" },
  },
  {
    id: "mahane",
    name: "Mahane Yehuda Market",
    district: "City center & markets",
    bestFor: "Food, spices, produce & market atmosphere",
    area: "Jaffa Road / Agripas",
    when: "Morning for produce; Friday early",
    highlights: "Food stalls · Spices · Street food",
    description:
      "Mahane Yehuda is where I would send food lovers first. The market is full of produce sellers, spices, baked goods, specialty food stalls and places to eat. Its evening restaurant and bar scene is quite different from daytime food shopping.",
    practical:
      "Visit in the morning for fresh produce and traditional market stalls, especially on Fridays. Restaurants and tasting tours have their own hours and menus.",
    gettingThere:
      "Near the Mahane Yehuda light-rail stop on Jaffa Road; Agripas Street is another useful approach.",
    lat: 31.7848,
    lon: 35.2118,
    photo: {
      src: images + "mahane-yehuda.webp",
      alt: "Produce and market stalls at Jerusalem's Mahane Yehuda Market",
    },
    official: { label: "Market information", href: "https://en.machne.co.il/" },
  },
  {
    id: "ben-yehuda",
    name: "Ben Yehuda Street",
    district: "City center & markets",
    bestFor: "Central shopping & easy browsing",
    area: "Jerusalem city center",
    when: "Daytime and early evening",
    highlights: "Pedestrian streets · Gift shops · Cafés",
    description:
      "Ben Yehuda Street is a convenient shopping stop in central Jerusalem. Browse gift shops, casual fashion and cafés, with Jaffa Road and King George Street nearby.",
    practical:
      "Combine Ben Yehuda Street with nearby central streets, or continue west to Mahane Yehuda for food shopping.",
    gettingThere:
      "Near the Jaffa Centre light-rail stop, with pedestrian access into Ben Yehuda Street.",
    lat: 31.7812,
    lon: 35.2174,
    photo: {
      src: images + "ben-yehuda.webp",
      alt: "Shops and pedestrian space on Ben Yehuda Street in Jerusalem",
    },
  },
  {
    id: "bezalel",
    name: "Bezalel Arts Fair",
    district: "City center & markets",
    bestFor: "Handmade designs & Friday art stalls",
    area: "Bezalel and Shatz pedestrian streets",
    when: "Usually Friday; check this week's notice",
    highlights: "Jewellery · Prints · Ceramics",
    description:
      "The Friday arts fair brings makers and small stalls to the Bezalel and Shatz pedestrian-street area. Look for jewellery, ceramics, photography, woodwork, prints and independent design.",
    practical:
      "The organiser lists the fair on Fridays on Bezalel pedestrian street. I recommend checking the organiser's latest announcement for the hours and any schedule changes before making a dedicated trip.",
    gettingThere:
      "The Bezalel/Shatz pedestrian streets in the city center, near the Nahalat Shiva and central-city walking areas.",
    lat: 31.7797,
    lon: 35.2149,
    photo: {
      src: images + "bezalel-arts-fair.webp",
      alt: "Jerusalem arts fair stall with original paintings and handmade artwork",
    },
    official: {
      label: "Arts fair organiser & dates",
      href: "https://edisonhafakot.co.il/he/fairline/3",
    },
  },
  {
    id: "emek-refaim",
    name: "Emek Refaim Street",
    district: "South Jerusalem",
    bestFor: "Neighborhood boutiques & cafés",
    area: "German Colony",
    when: "Combine with a relaxed neighborhood walk",
    highlights: "Local shops · Cafés · Design",
    description:
      "Emek Refaim has a calmer neighborhood feel, with cafés, small shops and restaurants in the German Colony. It's ideal for a leisurely stroll, boutique shopping and a coffee break.",
    practical:
      "Combine it with a German Colony walk or a visit to the First Station nearby. Check opening hours with individual shops.",
    gettingThere:
      "South of the city center in the German Colony; buses and taxis may be more convenient than a long walk.",
    lat: 31.762,
    lon: 35.2212,
    photo: {
      src: images + "emek-refaim.webp",
      alt: "Shops and street scene on Emek Refaim in Jerusalem",
    },
  },
  {
    id: "first-station",
    name: "The First Station",
    district: "South Jerusalem",
    bestFor: "Food, events & occasional markets",
    area: "David Remez Street",
    when: "Check the programme, including Shabbat",
    highlights: "Restaurants · Events · Pop-up stalls",
    description:
      "The restored railway station combines restaurants, cultural events, some shops and occasional markets. It's a lively place to combine shopping, dining and family activities.",
    practical:
      "The venue's published shopping hours for Saturday are 18:00–22:00. Saturday food and cultural activities can begin earlier, so check the hours of the business or event you want.",
    gettingThere:
      "On David Remez Street, south of central Jerusalem and close to the German Colony.",
    lat: 31.7685,
    lon: 35.2216,
    photo: {
      src: images + "first-station.webp",
      alt: "The First Station Jerusalem with shops and restaurants",
    },
    official: {
      label: "First Station shops",
      href: "https://www.firststation.co.il/en/shopping-at-the-first-station/",
    },
  },
  {
    id: "malha",
    name: "Malha Mall",
    district: "South Jerusalem",
    bestFor: "Indoor shopping & major chains",
    area: "Malha neighborhood",
    when: "A separate shopping outing",
    highlights: "Indoor mall · Fashion · Chain stores",
    description:
      "Malha Mall brings Israeli and international brands together under one roof, making it a good choice in any weather.",
    practical:
      "It is outside the historic center, so allow for the journey each way. Check the mall directory and the opening hours of the specific store you plan to visit.",
    gettingThere:
      "On Agudat Sport Beitar Street in southwest Jerusalem; take a bus, taxi or drive.",
    lat: 31.7507,
    lon: 35.191,
    photo: {
      src: images + "malha.webp",
      alt: "Interior shopping galleries at Malha Mall in Jerusalem",
    },
    official: {
      label: "Azrieli Jerusalem Mall",
      href: "https://azrieligroup.com/properties/azrieli-mall-jerusalem/",
    },
  },
];

export const shoppingMapPoints = jerusalemShoppingPlaces.map(({ id, name, lat, lon }) => ({
  id,
  name,
  lat,
  lon,
}));
export const shoppingTopPicks = [
  {
    id: "mahane",
    title: "Food & market atmosphere",
    description: "Stalls, spices and tastes at Mahane Yehuda",
  },
  {
    id: "old-city",
    title: "Traditional souvenirs",
    description: "Explore the Old City souks and crafts",
  },
  { id: "mamilla", title: "Fashion & brands", description: "Modern shops beside Jaffa Gate" },
  { id: "malha", title: "Indoor shopping", description: "Chain stores and covered walkways" },
  { id: "hutzot", title: "Artisan workshops", description: "Local makers and distinctive gifts" },
  { id: "bezalel", title: "Friday arts fair", description: "Design stalls on Bezalel and Shatz" },
] as const;
export const shoppingDistricts = [
  {
    id: "old",
    title: "Old City & Mamilla",
    intro: "Combine historic market streets with modern shopping near Jaffa Gate.",
  },
  {
    id: "center",
    title: "City center & markets",
    intro: "Food stalls, pedestrian shopping and independent design close to central transport.",
  },
  {
    id: "south",
    title: "South Jerusalem",
    intro: "Neighborhood boutiques, a cultural complex and an indoor mall on separate routes.",
  },
] as const;
