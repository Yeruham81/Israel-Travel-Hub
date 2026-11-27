import mountZionPhoto from "@/assets/guides/mount-zion.jpg";
import type { Attraction } from "@/data/attractionGuideTypes";
import type { SacredHillEditorial } from "@/data/sacredHillGuides";

/**
 * Mount Zion visitor-focused edition. All photos are already committed local
 * assets; an unverified photo is never substituted for a specific sacred site.
 */
export const mountZionAttractionUpdate: Required<
  Pick<
    Attraction,
    "title" | "description" | "intro" | "takeaway" | "duration" | "image" | "official" | "faqs"
  >
> = {
  title: "Mount Zion, Jerusalem: What to See & How to Visit",
  description:
    "Explore Mount Zion in Jerusalem: seven places to visit, the Room of the Last Supper, David's Tomb, Dormition Abbey, opening hours and walking routes.",
  intro:
    "Mount Zion sits immediately outside Jerusalem's Old City walls, just beyond Zion Gate. Within a short walk are the traditional Room of the Last Supper, David's Tomb and Dormition Abbey. St Peter in Gallicantu and the Catholic cemetery lie a little farther down the hill. It's an easy addition to an Old City visit, with several important Christian and Jewish places in one neighbourhood.",
  takeaway:
    "If you have an hour or two, walk out through Zion Gate, see Dormition Abbey and visit the Upper Room and David's Tomb in the adjoining complex. With another hour, explore St Peter in Gallicantu or pay your respects at Oskar Schindler's grave. On Sundays, make the abbey an afternoon stop and plan Gallicantu for another day.",
  duration: "About 1–2 hours for the central sites; 2½–3 hours with additional stops",
  image: {
    src: mountZionPhoto,
    alt: "Dormition Abbey on Mount Zion just south of Jerusalem's Old City walls",
  },
  official: [
    {
      label: "Christian Information Center — current holy-site opening hours",
      url: "https://www.cicts.org/en/updated-opening-hours-holy-places-tourist-sites-holy-land",
    },
    {
      label: "Dormition Abbey — church visiting and worship",
      url: "https://dormitio.net/abtei/gottesdienst-oeffnungszeiten/",
    },
    {
      label: "Window to Mount Zion — local heritage map and site details",
      url: "https://www.mountzion.org.il/",
    },
    {
      label: "City of David — Zion Gate access and public transport",
      url: "https://cityofdavid.org.il/en/the-jewish-quarter-to-the-city-of-david-a-journey-of-longing/",
    },
  ],
  faqs: [
    {
      q: "How do I reach Mount Zion from the Old City?",
      a: "Walk through the Armenian or Jewish Quarter to Zion Gate. Dormition Abbey and the Cenacle/David's Tomb complex are only a short walk outside the gate.",
    },
    {
      q: "How long should I allow for Mount Zion?",
      a: "Around one to two hours covers the central sites. Add time if you would like to visit St Peter in Gallicantu, the Catholic cemetery or the Chamber of the Holocaust.",
    },
    {
      q: "Are the Upper Room and David's Tomb in the same building?",
      a: "Yes. The traditional Room of the Last Supper is upstairs, while the traditional Tomb of King David occupies the lower level. Each floor has its own entrance and visitor rules.",
    },
    {
      q: "Is there an entrance fee to Mount Zion?",
      a: "Walking around the hill, visiting Zion Gate and entering the traditional Upper Room and David's Tomb are generally free. See the admission table for entrance fees at other sites.",
    },
    {
      q: "Can I visit Mount Zion on a Sunday?",
      a: "Yes. You can still explore Mount Zion on foot. Dormition Abbey opens later for sightseeing, while St Peter in Gallicantu is usually closed to visitors on Sundays. Check the current church schedules first.",
    },
    {
      q: "Can I visit independently or should I join a tour?",
      a: "The main sites can be visited on foot without a tour. A guided visit can be valuable if you want to explore the traditions and history in more depth; private transport is useful for arrivals, onward travel or a wider city itinerary.",
    },
    {
      q: "What if I have limited mobility?",
      a: "The short circuit near Zion Gate is easier than the additional lower-hillside sites, but the Upper Room involves stairs and surfaces around the Old City can be uneven. Check each building's accessibility and arrange a convenient drop-off if needed.",
    },
  ],
};

export const mountZionEditorialUpdate: SacredHillEditorial = {
  eyebrow: "Jerusalem · Beside Zion Gate",
  snapshot: [
    { label: "Where to start", value: "Zion Gate, south of the Old City" },
    { label: "Allow", value: "1–2 hours; longer for Gallicantu or the cemetery" },
    { label: "Easy to combine", value: "Armenian and Jewish Quarters" },
    { label: "Public transport", value: "Bus 38; also bus 2 at Zion Gate" },
  ],
  routeIntro:
    "Mount Zion works best as part of a walking day in Jerusalem. The Upper Room, David's Tomb and Dormition Abbey are all within a few minutes' walk of Zion Gate. Pick the order that suits your Old City itinerary.",
  routes: [
    {
      name: "From the Old City to Mount Zion",
      time: "Around 1–2 hours on Mount Zion",
      bestFor: "First-time visitors and anyone already exploring the Old City",
      steps: [
        "Walk through the Armenian Quarter or Jewish Quarter and leave the Old City through Zion Gate. Take a moment to look at the historic gate and its marks from the 1948 fighting.",
        "Continue to Dormition Abbey to see its striking round basilica and, when accessible, the crypt associated with Mary's Dormition.",
        "Visit the Cenacle, traditionally remembered as the Room of the Last Supper, on the upper floor of the David's Tomb complex.",
        "Go downstairs to the traditional Tomb of King David, an active Jewish prayer site, then return toward Zion Gate or continue to your next Jerusalem stop.",
      ],
      note: "On Sundays, visit the Upper Room and David's Tomb first, then Dormition Abbey after it opens at 11:30.",
    },
    {
      name: "Mount Zion first, then the Old City",
      time: "About 2–3 hours including an additional site",
      bestFor: "A wider pilgrimage or heritage itinerary",
      steps: [
        "Start with the central Mount Zion circuit: Dormition Abbey, the Upper Room and David's Tomb, all within a short walk.",
        "Choose an additional stop: St Peter in Gallicantu for the Passion story, or the Catholic cemetery for Oskar Schindler's grave.",
        "Return to Zion Gate if you have visited the lower sites, or arrange a pickup at a suitable road-accessible point.",
        "Enter the Old City through Zion Gate and explore the Armenian and Jewish Quarters; you can continue toward the Western Wall or the Christian Quarter.",
      ],
      note: "Choose either the church or the cemetery, as they are on different parts of the hillside. Allow time to walk back uphill to Zion Gate.",
    },
  ],
  stopIntro:
    "Begin near Zion Gate for the main landmarks. The last two stops lead downhill to separate entrances; allow more time for either one.",
  stops: [
    {
      name: "Room of the Last Supper (Cenacle)",
      description:
        "Tradition identifies this vaulted upper chamber with the Last Supper and Pentecost. Its Gothic-style ribbed vaults reflect centuries of religious and architectural change, including the building’s later use as a mosque.",
      visit:
        "Enter from the historic courtyard and climb the stairs to the hall. Look for the ribbed stone vaults and Islamic-era architectural details; the traditional Tomb of David is downstairs.",
      tipLabel: "Finding the entrance",
      image: {
        src: "/images/jerusalem/mount-zion/cenacle-upper-room.webp",
        alt: "Gothic arches and visitors inside the Cenacle, the traditional Room of the Last Supper on Mount Zion",
      },
    },
    {
      name: "David's Tomb",
      description:
        "The traditional Tomb of King David occupies the lower level beneath the Cenacle. Its identification with the biblical king developed in medieval traditions, and the chamber remains an active Jewish prayer site.",
      visit:
        "Respect the separate Jewish prayer areas and keep your visit quiet, especially during prayers. Men should bring a head covering.",
      tipLabel: "A respectful visit",
      image: {
        src: "/images/jerusalem/mount-zion/davids-tomb.webp",
        alt: "The traditional cenotaph of King David inside the Mount Zion prayer chamber",
      },
    },
    {
      name: "Dormition Abbey",
      description:
        "Dormition Abbey’s round basilica and bell tower rise beside Zion Gate. The Benedictine church commemorates Mary’s Dormition, or falling asleep; the main church is decorated with mosaics and the crypt has a reclining image of Mary.",
      visit:
        "I would include both the mosaics in the main church and the crypt when they are open. The round architecture is easier to appreciate when you also walk around the exterior.",
      tipLabel: "Don't miss",
      image: {
        src: "/images/jerusalem/mount-zion/dormition-abbey-and-bell-tower.webp",
        alt: "Dormition Abbey basilica and bell tower rising above Mount Zion in Jerusalem",
      },
      link: {
        label: "Dormition Abbey visiting hours",
        url: "https://dormitio.net/abtei/gottesdienst-oeffnungszeiten/",
      },
    },
    {
      name: "St Peter in Gallicantu",
      description:
        "St Peter in Gallicantu commemorates the tradition of Peter's denial of Jesus and the site associated with the house of High Priest Caiaphas. Inside and around the church are chapels, archaeological remains and views over the valley.",
      visit:
        "Allow time for the sanctuary, the underground spaces and the ancient stone stairway beside the church, traditionally associated with the events of Holy Thursday. Enjoy views over the Kidron Valley and the surrounding hills.",
      tipLabel: "Allow extra time",
      link: {
        label: "St Peter in Gallicantu official visitor information",
        url: "https://www.stpeter-gallicantu.org/?lang=en",
      },
      image: {
        src: "/images/jerusalem/mount-zion/st-peter-in-gallicantu.webp",
        alt: "Stone church of St Peter in Gallicantu overlooking Jerusalem's Kidron Valley",
      },
    },
    {
      name: "Zion Gate",
      description:
        "Zion Gate connects Mount Zion with the Armenian and Jewish Quarters of the Old City. Its stone entrance is one of Jerusalem's most memorable gates; marks left by the battles of 1948 can still be seen in the masonry.",
      visit:
        "Zion Gate is a convenient entrance to the Old City after visiting Mount Zion. If you want to visit the Western Wall afterwards, continue through the Jewish Quarter.",
      tipLabel: "Continue your walk",
      image: {
        src: "/images/jerusalem/mount-zion/zion-gate.webp",
        alt: "The arched entrance to Zion Gate through Jerusalem’s Old City walls",
      },
    },
    {
      name: "Oskar Schindler's grave",
      description:
        "Oskar Schindler, honoured as Righteous Among the Nations for rescuing Jews during the Holocaust, is buried in Mount Zion's Catholic cemetery. Visitors often leave a small stone on his grave as a sign of remembrance.",
      visit:
        "The grave is in the lower Catholic cemetery, not beside the three main Mount Zion churches. Allow extra time to walk down to the cemetery, visit Schindler's grave and return uphill.",
      tipLabel: "Before going down",
      image: {
        src: "/images/jerusalem/mount-zion/oskar-schindler-grave.webp",
        alt: "Oskar Schindler’s grave in the Mount Zion Catholic cemetery, with small memorial stones",
      },
    },
    {
      name: "The Chamber of the Holocaust",
      description:
        "Founded in 1949, this memorial honours Jewish communities destroyed in the Holocaust. Memorial plaques, rescued sacred objects and urns containing victims’ ashes make it a place for a reflective visit.",
      visit:
        "Find the museum near David’s Tomb and allow time for its memorial displays. It normally welcomes visitors Sunday to Thursday, 09:00–14:00; groups should arrange a visit ahead of time.",
      tipLabel: "An additional stop",
      image: {
        src: "/images/jerusalem/mount-zion/chamber-of-the-holocaust.webp",
        alt: "Entrance sign for the Chamber of the Holocaust memorial on Mount Zion",
      },
      link: {
        label: "Chamber of the Holocaust visiting information",
        url: "https://martefhashoa.org/",
      },
    },
  ],
  transportIntro:
    "Zion Gate is the easiest landmark to use when arranging a drop-off or checking a bus. From there, the main sites are a short walk from one another.",
  transport: [
    {
      title: "Walking from the Old City",
      text: "From the Armenian or Jewish Quarter, follow signs to Zion Gate and walk outside the southern city wall. If you are near Jaffa Gate, you can cross through the Armenian Quarter to reach Zion Gate, or approach Mount Zion from the road outside the walls. Choose according to the sights you want to see along the way.",
    },
    {
      title: "Bus 38 and nearby stops",
      text: "Route 38 makes a loop through central Jerusalem, Mamilla and the Old City area. Useful stops include Har Tsiyon/Ma'ale HaShalom and Zion Gate/Habad; route 2 also serves Zion Gate/Habad. Be sure to choose the right stop and direction because route 38 is circular. Check departures on the day of your trip.",
      links: [
        {
          label: "Line 38 route and stops",
          url: "https://your-way.org.il/he/areas/%D7%9E%D7%A8%D7%9B%D7%96-%D7%94%D7%A2%D7%99%D7%A8/lines/29619/38",
        },
        {
          label: "Zion Gate stop timetable (Moovit)",
          url: "https://moovitapp.com/index/he/%D7%AA%D7%97%D7%91%D7%95%D7%A8%D7%94_%D7%A6%D7%99%D7%91%D7%95%D7%A8%D7%99%D7%AA-%D7%A9%D7%A2%D7%A8_%D7%A6%D7%99%D7%95%D7%9F_%D7%97%D7%91_%D7%93-Israel-stop_44975360-1",
        },
      ],
    },
    {
      title: "Taxi or private driver",
      text: "I can arrange a ride to a road-accessible point near Zion Gate or Mount Zion, with a pickup after your visit. If you plan to see Gallicantu or the Catholic cemetery as well, tell me beforehand so we can choose the most convenient meeting point.",
    },
  ],
  practical: [
    {
      title: "Choose the right day",
      text: "Sunday is fine for the main outdoor walk and many central sites. Dormition Abbey generally opens later for sightseeing that day, while Gallicantu is usually closed. Saturday and religious holidays may affect access to Jewish prayer areas.",
    },
    {
      title: "For church and prayer visits",
      text: "Cover shoulders and knees in the churches and bring a head covering for men entering David's Tomb. Services and prayer take priority; follow any notices about photographs.",
    },
    {
      title: "The central sites are close together",
      text: "Dormition Abbey and the Upper Room/David's Tomb complex are only a few minutes apart. The optional walk toward Gallicantu or the cemetery involves extra steps or a slope, so allow more time for those stops.",
    },
    {
      title: "If you're visiting with children",
      text: "Families can enjoy a short walk from Zion Gate to the nearby churches and David's Tomb. For younger children, choose a small number of interiors rather than trying to fit in every museum and church.",
    },
  ],
  historyTitle: "Mount Zion: sacred traditions and Jerusalem history",
  history: [
    "The name Zion originally refers to the ancient Jerusalem of the Bible, with its earliest associations linked to the City of David. Over time the name moved across Jerusalem’s religious geography. The hill now called Mount Zion lies south of today’s Old City walls, just outside Zion Gate.",
    "For Christians, the Cenacle recalls the Last Supper and Pentecost, Dormition Abbey commemorates the Virgin Mary, and St Peter in Gallicantu is associated with Peter’s denial and the house of the High Priest Caiaphas. The major sanctuaries and their buildings changed through Byzantine, Crusader and later periods.",
    "The traditional Tomb of David became an important Jewish place of prayer. The shared historic complex also has Muslim associations: it was used as a mosque and linked to the veneration of the prophet David (Nabi Daoud), with the Dajani family among its custodians during Ottoman rule.",
    "During the years of divided Jerusalem, 1948–1967, Mount Zion stood on the Israeli side of the armistice line while the Old City was under Jordanian control. David’s Tomb became a focus of Jewish pilgrimage, and the hill also preserved memories of the 1948 fighting, visible today in the stone around Zion Gate.",
    "The Chamber of the Holocaust was established in 1949 as an early memorial to murdered Jewish communities. Oskar Schindler is buried in the Catholic cemetery on Mount Zion.",
  ],
  hotelNote:
    "Staying near Mamilla or Jaffa Gate makes it easier to explore Mount Zion and the Old City on foot; a hotel in central Jerusalem also works well if you plan to use public transport.",
  relatedHotel: {
    text: "Jerusalem accommodation guide",
    to: "/travel-blog/where-to-stay-in-jerusalem/",
  },
};
