import type { LinkProps } from "@tanstack/react-router";
import type { Attraction } from "@/data/attractionGuideTypes";
import jeep from "@/assets/negev/ramon-jeep.webp";
import beach from "@/assets/dead-sea/beach.webp";
import masada from "@/assets/guides/dead-sea-excursions/masada-aerial.webp";
import einGedi from "@/assets/guides/dead-sea-excursions/ein-gedi-waterfall.webp";
import qumran from "@/assets/guides/dead-sea-excursions/qumran-caves.webp";
import mud from "@/assets/guides/dead-sea-excursions/dead-sea-mud-bathing.webp";
import deadSeaCover from "@/assets/guides/dead-sea-attractions-hero.webp";

/** One canonical image for the Dead Sea attractions guide and every inbound card. */
export const deadSeaAttractionsHero = { src: deadSeaCover, alt: "Two smiling visitors covered in mineral mud beside the Dead Sea" } as const;

export type DeadSeaStop = {
  id: string; title: string; shortTitle: string; area: string; kind: string;
  bestFor: string; allow: string; access: string;
  description: string; practical: string; gettingThere: string; tip: string;
  image?: { src: string; alt: string };
  official?: { label: string; href: string };
  guide?: { label: string; to: LinkProps["to"] };
  extraGuide?: { label: string; to: LinkProps["to"] };
  mapLinks: { label: string; query: string }[];
};

export const deadSeaStops: DeadSeaStop[] = [
  {
    "id": "ein-bokek-beach",
    "title": "Float at Ein Bokek's public beach",
    "shortTitle": "Ein Bokek beach",
    "area": "Southern Dead Sea",
    "kind": "Saltwater & relaxation",
    "bestFor": "First-time visitors, swimming facilities & families",
    "allow": "2–3 hours",
    "access": "Free public beach; supervised bathing areas only",
    "description": "The best place to begin a Dead Sea visit is often Ein Bokek's maintained public beachfront. Floating in its highly saline water, then relaxing along the promenade, makes an easy introduction even if you have no plans to visit a hotel spa.",
    "practical": "Public showers, shade and visitor facilities are available in the central beach area. Enter the water slowly, keep your face and eyes clear, avoid swallowing the water, and rinse thoroughly afterwards. Follow lifeguard instructions; do not enter the sea outside permitted bathing zones.",
    "gettingThere": "Set your navigation to Ein Bokek Central Beach. The public beach is beside the hotel strip; check parking conditions and the last transport connection.",
    "tip": "I'd give the beach its own unhurried slot after sightseeing. Fresh water, sandals and a towel make the visit much more comfortable.",
    "image": {
      "src": beach,
      "alt": "Public bathing beach and blue Dead Sea water at Ein Bokek"
    },
    "official": {
      "label": "Ein Bokek Central Beach - Tamar Regional Council",
      "href": "https://www.deadsea.co.il/attractions/ein-bokek-central-beach/?lang=en"
    },
    "guide": {
      "label": "My Dead Sea visitor guide",
      "to": "/attractions/dead-sea/"
    },
    "mapLinks": [
      {
        "label": "Ein Bokek Central Beach",
        "query": "Ein Bokek Central Beach, Israel"
      }
    ]
  },
  {
    "id": "masada",
    "title": "Explore Masada National Park",
    "shortTitle": "Masada",
    "area": "Central Dead Sea",
    "kind": "Archaeology & viewpoints",
    "bestFor": "History, desert views & memorable landscapes",
    "allow": "3–4 hours on site",
    "access": "Paid national-park entry; cable car costs extra",
    "description": "Masada stands above the Judean Desert and the Dead Sea, preserving Herod's palace complex, ancient fortifications and the history of the Jewish revolt against Rome. The sweeping views are as memorable as the archaeological remains.",
    "practical": "The eastern cable-car entrance and western Roman Ramp entrance are reached by different roads. Check admission prices, cable-car fares and booking requirements before visiting Masada. Walking routes may close during heat alerts.",
    "gettingThere": "From the Dead Sea, navigate to the eastern entrance of Masada National Park for the cable car. The western ramp is reached from Arad.",
    "tip": "I'd reserve enough time for the plateau itself. Choose a hike only after checking the day's trail status and weather.",
    "image": {
      "src": masada,
      "alt": "Aerial view of the archaeological plateau of Masada above the Judean Desert"
    },
    "official": {
      "label": "Masada National Park - official access and tickets",
      "href": "https://en.parks.org.il/reserve-park/masada-national-park/"
    },
    "guide": {
      "label": "My guide to Masada",
      "to": "/attractions/masada/"
    },
    "extraGuide": {
      "label": "Jerusalem to the Dead Sea",
      "to": "/travel-blog/jerusalem-to-the-dead-sea/"
    },
    "mapLinks": [
      {
        "label": "Masada east entrance & cable car",
        "query": "Masada National Park East Entrance Cable Car, Israel"
      }
    ]
  },
  {
    "id": "ein-gedi",
    "title": "Visit Ein Gedi Nature Reserve",
    "shortTitle": "Ein Gedi",
    "area": "Central Dead Sea",
    "kind": "Nature reserve & oasis",
    "bestFor": "Desert vegetation, wildlife & walking",
    "allow": "Varies by currently open trail; some walks take around 3 hours",
    "access": "Paid reserve; entry and reservations vary by trail",
    "description": "Ein Gedi is an oasis of springs, vegetation and wildlife beside the desert escarpment. Its stream valleys and resident ibex make a striking contrast with the bare slopes around the Dead Sea.",
    "practical": "Flood and rockfall damage have restricted or changed access to Nahal David and Nahal Arugot. Some hiking trails are demanding and require an early start or advance booking. The archaeological site has separate entry rules. Check which waterfall trails are open, their opening hours and whether advance booking is required.",
    "gettingThere": "Ein Gedi sits on Route 90, north of Masada and Ein Bokek. Follow directions to the specific park entrance listed on your booking, not to Ein Gedi Kibbutz or the hotel.",
    "tip": "I would choose the route only after checking the official trail update and whether the walking time, heat exposure and difficulty match your group.",
    "image": {
      "src": einGedi,
      "alt": "Natural waterfall and greenery in the Ein Gedi oasis near the Dead Sea"
    },
    "official": {
      "label": "Ein Gedi Nature Reserve - routes and reservation information",
      "href": "https://en.parks.org.il/reserve-park/en-gedi-nature-reserve/"
    },
    "guide": {
      "label": "My guide to Ein Gedi",
      "to": "/attractions/ein-gedi/"
    },
    "mapLinks": [
      {
        "label": "Ein Gedi Nature Reserve entrance",
        "query": "Ein Gedi Nature Reserve Nahal David entrance, Israel"
      }
    ]
  },
  {
    "id": "qumran",
    "title": "Discover Qumran National Park",
    "shortTitle": "Qumran",
    "area": "Northern Dead Sea",
    "kind": "Archaeology & Dead Sea Scrolls",
    "bestFor": "Ancient history, archaeology & religious heritage",
    "allow": "1–2 hours",
    "access": "Paid national park; verify opening times",
    "description": "At Qumran, archaeological remains help tell the story of the community associated with the Dead Sea Scrolls. Visitors can examine the excavations and look towards the cliffs and caves where manuscripts were discovered.",
    "practical": "At Qumran, you can explore the archaeological remains and view the famous Dead Sea Scrolls caves from outside. Bring sun protection; much of the visit is exposed.",
    "gettingThere": "Qumran is in the northern Dead Sea area near Kibbutz Kalia, well north of Ein Bokek. Combine it with other sites along the northern Dead Sea.",
    "tip": "If the scrolls interest you, allow time to read the interpretation at the archaeological site.",
    "image": {
      "src": qumran,
      "alt": "Desert cliffs and caves beside the Qumran archaeological landscape"
    },
    "official": {
      "label": "Qumran National Park - Israel Nature & Parks Authority",
      "href": "https://en.parks.org.il/reserve-park/qumran-park"
    },
    "mapLinks": [
      {
        "label": "Qumran National Park",
        "query": "Qumran National Park, Israel"
      }
    ]
  },
  {
    "id": "nahal-bokek",
    "title": "Walk the Nahal Bokek oasis trail",
    "shortTitle": "Nahal Bokek",
    "area": "Southern Dead Sea",
    "kind": "Short canyon walk",
    "bestFor": "An active break near the Ein Bokek hotels",
    "allow": "Around 2–3 hours",
    "access": "Free trail; check weather and trail conditions",
    "description": "A short distance from the resort strip, the Nahal Bokek trail follows a small freshwater stream through a desert canyon. Reeds, shallow pools and changing rock scenery offer a welcome alternative to an entire day on the shore.",
    "practical": "The Tamar Regional Council describes a roughly 3 km out-and-back visit with some walking in shallow water. The entry is from the designated hikers' parking area reached via the Sonol petrol station access road. Do not park on Route 90. Never enter a wadi when flooding is possible, even if local skies look clear.",
    "gettingThere": "Navigate to the Nahal Bokek trailhead at the designated hikers' parking by the Sonol station in Ein Bokek; the waterfront beach is a different destination.",
    "tip": "I'd take water shoes and dry footwear for afterwards, and choose a cooler period of the day. A wet canyon walk needs proper grip even if it is described as family-friendly.",
    "official": {
      "label": "Nahal Bokek trail - Tamar Regional Council",
      "href": "https://www.deadsea.co.il/tracks/ein-bokek/?lang=en"
    },
    "mapLinks": [
      {
        "label": "Nahal Bokek trailhead",
        "query": "Nahal Bokek trailhead Sonol Ein Bokek, Israel"
      }
    ],
    "image": {
      "src": "/images/dead-sea-attractions/nahal-bokek.webp",
      "alt": "The flowing Nahal Bokek spring and stream among desert vegetation near Ein Bokek"
    }
  },
  {
    "id": "einot-tsukim",
    "title": "Enjoy the springs at Einot Tsukim",
    "shortTitle": "Einot Tsukim",
    "area": "Northern Dead Sea",
    "kind": "Nature reserve & freshwater pools",
    "bestFor": "Families, oasis scenery & a quieter stop",
    "allow": "1½–3 hours",
    "access": "Paid reserve; pools depend on lifeguard and seasonal schedules",
    "description": "Einot Tsukim, also known as Enot Tsukim or Ein Feshkha, protects freshwater springs and distinctive wetlands along the northern Dead Sea. It is a good choice when you would like oasis scenery, short walks and picnic time.",
    "practical": "Freshwater pool opening hours vary by season and day. Swim only in designated pools with a lifeguard on duty. The reserve does not offer access to swim in the Dead Sea. Check current reservations, pool arrangements and accessibility.",
    "gettingThere": "The reserve is along Route 90, a few kilometres south of Kibbutz Kalia. It fits a northern Dead Sea day with Qumran.",
    "tip": "I recommend this nature reserve for families with children. Visit Ein Bokek for the classic Dead Sea floating experience.",
    "official": {
      "label": "Einot Tsukim Nature Reserve - official information",
      "href": "https://en.parks.org.il/reserve-park/enot-tsukim-nature-reserve/"
    },
    "mapLinks": [
      {
        "label": "Einot Tsukim Nature Reserve",
        "query": "Enot Tsukim Nature Reserve Ein Feshkha, Israel"
      }
    ],
    "image": {
      "src": "/images/dead-sea-attractions/einot-tsukim.webp",
      "alt": "Freshwater spring pool surrounded by vegetation in Einot Tsukim Nature Reserve"
    }
  },
  {
    "id": "mount-sodom",
    "title": "See Mount Sodom and its salt landscapes",
    "shortTitle": "Mount Sodom",
    "area": "Southern Dead Sea",
    "kind": "Geology & viewpoints",
    "bestFor": "Unusual salt geology and desert scenery",
    "allow": "1–3 hours depending on the route",
    "access": "Public viewpoints or guided routes; site-specific rules",
    "description": "Mount Sodom is a remarkable ridge of salt rock at the southern end of the Dead Sea. The folds, cliffs and pale desert landscape make it an appealing stop for travellers interested in geology and dramatic scenery.",
    "practical": "Not every salt-cave or ridge route is open for independent visits. Caves, technical descents and challenging off-road tracks require appropriate access, equipment and qualified guiding. Do not improvise a route into unstable salt formations.",
    "gettingThere": "Mount Sodom has several distinct trailheads and viewpoints. The signed hiking approaches are not the same as the mapped lookout; consult the Israel Nature and Parks Authority route directions before choosing where to park.",
    "tip": "I would choose a short marked viewpoint or book a specialist guide if exploring the caves is your priority.",
    "image": {
      "src": "/images/dead-sea-attractions/mount-sodom.webp",
      "alt": "Hikers on a pale salt ridge at Mount Sodom overlooking the Dead Sea"
    },
    "official": {
      "label": "Southern Dead Sea activities - regional tourism website",
      "href": "https://www.deadsea.co.il/attractions/?lang=en"
    },
    "mapLinks": [
      {
        "label": "Mount Sedom Lookout - geographical pin",
        "query": "31.08550,35.38864"
      },
      {
        "label": "Mount Sodom trail information",
        "query": "Mount Sodom Fish Trail Israel"
      }
    ]
  },
  {
    "id": "mud-spa",
    "title": "Enjoy Dead Sea mud, spa time and the promenade",
    "shortTitle": "Mud & spa",
    "area": "Southern Dead Sea",
    "kind": "Wellness & easy sightseeing",
    "bestFor": "A relaxing afternoon or a resort stay",
    "allow": "1–3 hours, or a spa session",
    "access": "Promenade free; mud treatments and spa access may cost extra",
    "description": "The Dead Sea experience is about more than floating. Ein Bokek's promenade is a pleasant place to walk between the beach, gardens and cafés, while nearby resorts offer optional mud treatments and spa facilities.",
    "practical": "Natural mud availability and prices vary by beach. Check the spa's treatment menu, age rules and fees before booking. Avoid applying mud to irritated skin, wounds or the eyes, and skip exaggerated claims about detoxification or medical results.",
    "gettingThere": "This works best around Ein Bokek's central beach and hotel district. The promenade and adjacent beach are within walking distance.",
    "tip": "I recommend finishing your sightseeing day with a relaxing spa visit.",
    "image": {
      "src": mud,
      "alt": "Visitor applying Dead Sea mineral mud during a mud-bathing experience"
    },
    "guide": {
      "label": "Where to stay at the Dead Sea",
      "to": "/travel-blog/best-dead-sea-hotels/"
    },
    "mapLinks": [
      {
        "label": "Ein Bokek promenade",
        "query": "Ein Bokek Promenade, Israel"
      },
      {
        "label": "Ein Bokek public beach",
        "query": "Ein Bokek Central Beach, Israel"
      }
    ]
  },
  {
    "id": "novomeysky",
    "title": "Visit the Moshe Novomeysky Visitor Center",
    "shortTitle": "Novomeysky Center",
    "area": "Southern Dead Sea",
    "kind": "Local history & heritage",
    "bestFor": "An indoor-friendly cultural stop",
    "allow": "About 1½ hours for the tour; arrive 15 minutes early",
    "access": "Guided admission by advance booking",
    "description": "The restored historic potash-workers' camp at Sdom tells the story of early Dead Sea industry and the people who worked here. It adds a human and industrial-history perspective to a region better known for beaches and desert ruins.",
    "practical": "Admission is by a pre-booked guided tour. Choose your date and time in the official Hebrew booking calendar, and arrive about 15 minutes early. The operator's public pages show differing opening hours; use the available booking times for your visit.",
    "gettingThere": "The visitor centre is near Sdom, south of Ein Bokek. Set your navigation to the visitor centre itself.",
    "tip": "I'd choose an available guided time on the official website first, arrive 15 minutes early, and then plan the other southern Dead Sea stops around it.",
    "official": {
      "label": "Official visitor information and booking (Hebrew)",
      "href": "https://www.deadseanovo.co.il/%D7%94%D7%97%D7%95%D7%95%D7%99%D7%94-%D7%91%D7%9E%D7%A8%D7%9B%D7%96/%D7%97%D7%A9%D7%95%D7%91-%D7%9C%D7%93%D7%A2%D7%AA/"
    },
    "mapLinks": [
      {
        "label": "Moshe Novomeysky Visitor Center",
        "query": "Moshe Novomeysky Visitor Center Sdom Israel"
      }
    ],
    "image": {
      "src": "/images/dead-sea-attractions/novomeysky.webp",
      "alt": "Preserved buildings at the Moshe Novomeysky visitor centre in the Sdom workers camp"
    }
  },
  {
    "id": "desert-adventures",
    "title": "Guided Desert Adventures & Stargazing",
    "shortTitle": "Desert adventures",
    "area": "Judean Desert & southern Dead Sea",
    "kind": "Guided adventures & stargazing",
    "bestFor": "Jeep trips, desert scenery & night skies",
    "allow": "A few hours or an evening",
    "access": "Operator-dependent; guided activities require booking",
    "description": "Choose a daylight guided jeep outing or specialist canyon adventure for dramatic desert terrain, or book a separate evening stargazing experience when the sky is clear.",
    "practical": "Daytime jeep drives and canyon trips need a qualified operator and route-specific instructions. Rappelling and cave visits require suitable equipment and careful supervision. For night stargazing, ask about moonlight, cloud cover, transport and warm clothing; a star-filled sky is never guaranteed.",
    "gettingThere": "Operators may depart from Ein Bokek, Neve Zohar or other meeting points. Confirm the exact pickup and return transport before booking.",
    "tip": "I'd book a daylight jeep outing for desert scenery or an evening stargazing tour for a quieter experience.",
    "image": {
      "src": jeep,
      "alt": "Four-wheel-drive jeep excursion on rugged desert terrain in southern Israel"
    },
    "official": {
      "label": "Regional desert tours and activities",
      "href": "https://www.deadsea.co.il/attractions/?lang=en"
    },
    "guide": {
      "label": "Masada & Dead Sea tours",
      "to": "/tours/masada-dead-sea/"
    },
    "mapLinks": [
      {
        "label": "Ein Bokek activity base",
        "query": "Ein Bokek, Dead Sea, Israel"
      },
      {
        "label": "Mount Sodom excursion area",
        "query": "Mount Sodom, Dead Sea, Israel"
      }
    ]
  }
];

export const deadSeaMapPoints = [
  {
    "id": "qumran",
    "name": "Qumran National Park",
    "label": "Qumran",
    "lat": 31.741,
    "lon": 35.458,
    "query": "Qumran National Park, Israel"
  },
  {
    "id": "einot-tsukim",
    "name": "Einot Tsukim Nature Reserve",
    "label": "Tsukim",
    "lat": 31.747,
    "lon": 35.445,
    "query": "Einot Tsukim Nature Reserve, Israel"
  },
  {
    "id": "ein-gedi",
    "name": "Ein Gedi Nature Reserve",
    "label": "Ein Gedi",
    "lat": 31.4667,
    "lon": 35.3939,
    "query": "Ein Gedi Nature Reserve Nahal David, Israel"
  },
  {
    "id": "masada",
    "name": "Masada East Entrance",
    "label": "Masada",
    "lat": 31.315,
    "lon": 35.352,
    "query": "Masada National Park East Entrance Cable Car, Israel"
  },
  {
    "id": "ein-bokek-beach",
    "name": "Ein Bokek Beach",
    "label": "Beach",
    "lat": 31.20017,
    "lon": 35.36382,
    "query": "Ein Bokek Central Beach, Israel"
  },
  {
    "id": "nahal-bokek",
    "name": "Nahal Bokek Trail",
    "label": "Bokek",
    "lat": 31.201,
    "lon": 35.36,
    "query": "Nahal Bokek trailhead Sonol Ein Bokek, Israel"
  },
  {
    "id": "mount-sodom",
    "name": "Mount Sedom Lookout",
    "label": "Lookout",
    "lat": 31.0855,
    "lon": 35.38864,
    "query": "31.08550,35.38864"
  },
  {
    "id": "novomeysky",
    "name": "Moshe Novomeysky Visitor Center",
    "label": "Heritage",
    "lat": 31.07037,
    "lon": 35.39731,
    "query": "Moshe Novomeysky Visitor Center Sdom, Israel"
  }
] as const;

export const deadSeaRouteIdeas = [
  {
    "title": "A first visit from Jerusalem",
    "kind": "One-day highlights",
    "intro": "Start early with Masada's eastern entrance, then spend a relaxed afternoon at Ein Bokek Central Beach.",
    "stopIds": [
      "masada",
      "ein-bokek-beach"
    ],
    "tip": "I would keep the programme to these two main stops and allow plenty of time for road travel, parking and showers.",
    "timeBudget": "Allow a full day, usually around 8–10 hours including travel from Jerusalem.",
    "travel": "Best by car, private driver or an organised tour; check the Masada east-entrance access and afternoon beach facilities."
  },
  {
    "title": "An easy day based in Ein Bokek",
    "kind": "Beach & local nature",
    "intro": "Enjoy the beach and promenade, then consider the Nahal Bokek canyon walk if the forecast and trail conditions are suitable.",
    "stopIds": [
      "ein-bokek-beach",
      "nahal-bokek",
      "mud-spa"
    ],
    "tip": "Choose either the walk or a longer spa session for a comfortable afternoon.",
    "timeBudget": "Allow roughly 5–7 hours around Ein Bokek, depending on hiking and spa time.",
    "travel": "Stay locally or drive between the hotel area and the designated canyon parking; avoid midday hiking in hot weather."
  },
  {
    "title": "Two days from north to south",
    "kind": "History & landscapes",
    "intro": "Use one day for Qumran and Einot Tsukim in the north, then devote another day to Masada and the central or southern shore.",
    "stopIds": [
      "qumran",
      "einot-tsukim",
      "masada",
      "ein-bokek-beach"
    ],
    "tip": "Plan an overnight base before assigning times. Keep Ein Gedi as an alternative only after confirming the trail you want is open.",
    "timeBudget": "Allow two sightseeing days and an overnight stay for a comfortable north-to-south plan.",
    "travel": "A car, confirmed driver or pre-arranged tour is considerably more flexible than attempting multiple nature reserves by bus."
  }
] as const;

export const deadSeaFaqs = [
  {
    "q": "Which Dead Sea attractions should I choose on a first visit?",
    "a": "For one day, I'd usually choose Masada and a designated Ein Bokek public beach. If you prefer nature to archaeology, consider a suitable open Ein Gedi trail or the Nahal Bokek walk instead."
  },
  {
    "q": "Can I float in the Dead Sea at any point along the shore?",
    "a": "No. Unregulated shoreline access can be dangerous because of sinkholes and unstable ground. Use a designated supervised bathing beach such as Ein Bokek and follow local instructions."
  },
  {
    "q": "Are Masada, Ein Gedi and Ein Bokek close enough for one day?",
    "a": "Masada, Ein Gedi and Ein Bokek are all accessible from Route 90. A full day combining all three can become rushed, especially when travelling from Jerusalem. I recommend choosing two main stops unless your schedule and access conditions genuinely allow more."
  },
  {
    "q": "Does Einot Tsukim have a Dead Sea swimming beach?",
    "a": "No. Einot Tsukim has freshwater nature-reserve facilities and designated pools on certain days, but visitors cannot enter the Dead Sea from the reserve."
  },
  {
    "q": "Can I explore Ein Gedi's waterfalls and canyons as normal?",
    "a": "Access has changed following flood damage. Nahal David, Nahal Arugot and the antiquities area have different visitor arrangements; check the current official park updates and reserve the entrance and trail that are available for your date."
  },
  {
    "q": "Is the Dead Sea suitable for a visit without a car?",
    "a": "Some bus services reach Ein Bokek and other stops, but timetables, Sabbath service and access to individual trailheads vary. A focused beach visit is simpler by public transport than a multi-stop day. Compare buses, a guided tour or a private driver for your actual route."
  }
];

/** Shared editorial metadata for the regional overview and its structured data. */
export const deadSeaAttractionsUpdatedAt = "2026-11-20";
export const deadSeaEditorialOverview: Attraction = {
  title: "Dead Sea Attractions: Best Things to Do",
  description: "Discover ten Dead Sea attractions from Ein Bokek to Masada, Ein Gedi, Qumran, southern heritage sites and desert trails, with map links and realistic routes.",
  region: "Dead Sea & Negev",
  image: deadSeaAttractionsHero,
  duration: "One full day to several days",
  intro: "Explore ten different attractions in the Dead Sea region, from safe public bathing and historic Masada to freshwater oases, nature walks and heritage sites.",
  takeaway: "For a first visit, choose two or three compatible stops rather than attempting the whole shoreline in a single day.",
  highlights: deadSeaStops.map(stop => ({ name: stop.title, description: stop.description, tip: stop.tip })),
  arrival: deadSeaStops.map(stop => stop.gettingThere),
  planning: [
    "Use designated supervised bathing facilities and avoid unstable shoreline with sinkholes.",
    "Check heat, flash floods, opening hours and trail reservations before leaving.",
    "Allow extra driving time between the northern and southern parts of the region.",
  ],
  faqs: deadSeaFaqs,
  official: deadSeaStops.flatMap(stop => stop.official ? [{ label: stop.official.label, url: stop.official.href }] : []),
};
