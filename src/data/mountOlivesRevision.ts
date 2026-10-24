import type { Attraction } from "@/data/attractionGuideTypes";
import type { SacredHillEditorial } from "@/data/sacredHillGuides";

/**
 * Mount of Olives editorial edition: an actual visit plan, not a generic attraction list.
 * Images use existing site assets or source-attributed small Wikimedia thumbnails.
 */
export const mountOlivesAttractionUpdate: Partial<Attraction> = {
  title: "Mount of Olives, Jerusalem: Viewpoint, Churches & How to Visit",
  description: "Plan a Mount of Olives visit: where to find the Jerusalem viewpoint, how to reach it by bus, Gethsemane, churches, walking routes and Old City connections.",
  intro: "From the Mount of Olives, Jerusalem's Old City spreads out before you, with the Dome of the Rock, ancient walls and church towers rising beyond the Jewish cemetery. Just below the lookout are places closely associated with the life of Jesus, from Dominus Flevit to the Garden of Gethsemane. Here's how to choose the stops and fit the hill into your time in Jerusalem.",
  takeaway: "For a first visit, begin at the lookout near the Seven Arches Hotel, then follow the Palm Sunday road to Dominus Flevit and Gethsemane. Allow about two to three hours if you want to enter churches. You can continue from the foot of the hill to the Old City, or make the viewpoint a final stop after exploring Jerusalem.",
  duration: "30–45 minutes for the panorama; around 2–3 hours with Gethsemane and selected churches",
  image: { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Jerusalem_from_the_Mount_of_Olives_%2853714451089%29.jpg/1280px-Jerusalem_from_the_Mount_of_Olives_%2853714451089%29.jpg", alt: "Wide panoramic view from the Mount of Olives over Jerusalem's Old City, Temple Mount, historic walls and hillside cemetery" },
  official: [
    { label: "Christian Information Center — church hours", url: "https://www.cicts.org/en/updated-opening-hours-holy-places-tourist-sites-holy-land" },
    { label: "City of David — Mount of Olives access and buses", url: "https://cityofdavid.org.il/en/sites/mount-of-olives-eng/" },
    { label: "Moovit — routes near the viewpoint", url: "https://moovitapp.com/index/en/public_transit-%D7%9E%D7%A6%D7%A4%D7%94_%D7%94%D7%A8_%D7%94%D7%96%D7%99%D7%AA%D7%99%D7%9D_%D7%9E%D7%9C%D7%95%D7%9F_%D7%A9%D7%91%D7%A2_%D7%94%D7%A7%D7%A9%D7%AA%D7%95%D7%AA-Israel-stop_34625826-1" },
  ],
  faqs: [
    { q: "Where is the Mount of Olives viewpoint?", a: "The familiar panorama is beside the Seven Arches Hotel, on the upper Mount of Olives ridge east of the Old City. Look for the public terrace overlooking the Jewish cemetery and the Temple Mount/Haram al-Sharif." },
    { q: "Which bus goes to the Mount of Olives?", a: "Route 84 connects the Ammunition Hill light-rail area with Ma'ale HaZeitim near Seven Arches. Routes 255 and 275 serve the Church of the Ascension/Rabia Al-Adawiya area from Sultan Suleiman Street near Damascus Gate. The stops are not identical; choose your destination in a current transit planner." },
    { q: "Can I combine the Mount of Olives with the Old City?", a: "Yes. A popular plan is to start at the panorama, visit Dominus Flevit and Gethsemane, then enter the Old City through Lion's Gate. You can also see the Old City first and finish with a vehicle trip up to the lookout, particularly for late-afternoon views." },
    { q: "How much time do I need?", a: "Allow about half an hour for the panorama alone, or two to three hours for the viewpoint, Dominus Flevit and Gethsemane with church visits. The upper sites such as Pater Noster and the Chapel of the Ascension make a longer half-day more worthwhile." },
    { q: "Is the Mount of Olives free to visit?", a: "The public lookout and streets are generally free. Some enclosed religious sites, including Pater Noster and the Chapel of the Ascension, have their own admission rules and visiting hours." },
    { q: "Can I visit Pater Noster and the Church of Mary Magdalene?", a: "Both are possible stops, but their opening days are more limited than those of the open-air viewpoint. Check the Christian Information Center's current church-hours page before planning a route around either one." },
    { q: "Is the walk suitable for someone with limited mobility?", a: "If walking is difficult, enjoy the panorama as a separate vehicle-accessible stop and consider a second drop-off near Gethsemane. The traditional route connecting the churches includes a significant descent and uneven surfaces." },
    { q: "Should I book a private driver or a guided tour?", a: "A private driver can take you to the lookout and arrange collection at another accessible point. If you want an accompanied visit explaining the churches and their biblical traditions, choose a guided tour and review the listed stops, guide language and duration." },
  ],
};

const commons = (name: string, thumb: string, alt: string, photographer: string, license: string, licenseUrl: string) => ({
  src: thumb,
  alt,
  credit: { label: photographer + " · " + license, url: "https://commons.wikimedia.org/wiki/File:" + name, licenseUrl },
});

export const mountOlivesEditorialUpdate: SacredHillEditorial = {
  eyebrow: "Jerusalem · Viewpoint & pilgrimage route",
  snapshot: [
    { label: "Main viewpoint", value: "Seven Arches Hotel terrace" },
    { label: "Allow", value: "30–45 min for the view; half a day with churches" },
    { label: "Combine with", value: "Lion's Gate, Gethsemane and the Old City" },
    { label: "Bus connections", value: "84, 255 or 275, depending on your starting point" },
  ],
  routeIntro: "You can enjoy the panorama on its own, or make the Mount of Olives the beginning of a day in Jerusalem's Old City. For church visits, it helps to decide in advance whether you want the upper sites near At-Tur as well as those below the lookout.",
  routes: [
    {
      name: "From the viewpoint to the Old City",
      time: "Around 2–3 hours on the hill, plus Old City time",
      bestFor: "First-time visitors, panoramas and the main Christian sites",
      steps: [
        "Start at the Seven Arches lookout for a wide view of the Old City. This is an ideal moment to orient yourself before walking into Jerusalem.",
        "Take the historic Palm Sunday road toward Dominus Flevit, the small church recalling Jesus' tears over Jerusalem.",
        "Continue to Gethsemane and the Church of All Nations at the foot of the hill. The nearby Tomb of Mary is an optional addition.",
        "Cross toward Lion's Gate to continue into the Old City, where you can follow the Via Dolorosa or explore the Christian Quarter.",
      ],
      note: "For a relaxed day, choose one or two church interiors on the hill and keep the rest of your time for the Old City.",
    },
    {
      name: "A longer Mount of Olives pilgrimage",
      time: "Roughly 3–4 hours; more with services",
      bestFor: "Visitors interested in the traditional biblical sites",
      steps: [
        "Begin in the At-Tur area with Pater Noster, known for its displays of the Lord's Prayer in many languages.",
        "Visit the Chapel of the Ascension nearby, then continue to the main Seven Arches panorama.",
        "Follow the route to Dominus Flevit. If the Church of St Mary Magdalene is open during your visit, allow extra time for it.",
        "Finish at Gethsemane, the Church of All Nations and, if you wish, the Tomb of Mary.",
      ],
      note: "Pater Noster and St Mary Magdalene are not open every day. Choose your visit day around those two sites if they are important to you.",
    },
  ],
  stopIntro: "From the open-air terrace to the churches along the slope, each stop has a different character. These are the places I would consider first when planning a visit.",
  stops: [
    {
      name: "The panoramic viewpoint",
      description: "The classic Jerusalem photograph is taken from the terrace near the Seven Arches Hotel. Across the hillside cemetery you can see the Dome of the Rock, the city walls and many of the Old City's most recognisable landmarks.",
      visit: "Early morning is particularly good for photographing the city, with the sun coming from behind the viewpoint. A short stop here also works well at the end of an Old City tour.",
      tipLabel: "My tip",
      image: { src: "/images/attractions/mount-of-olives.webp", alt: "The Mount of Olives panorama towards Jerusalem's Old City" },
    },
    {
      name: "Pater Noster Church",
      description: "On the upper ridge, the Carmelite compound commemorates Jesus teaching the Lord's Prayer. Its cloisters are lined with ceramic versions of the prayer in languages from around the world, making this one of the hill's most distinctive stops.",
      visit: "The church currently lists restricted morning visiting sessions on selected days. If Pater Noster is on your must-see list, check its opening before choosing your travel date.",
      tipLabel: "Plan around",
      image: commons("Jerusalem_-_Pater_Noster_Church.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Jerusalem_-_Pater_Noster_Church.jpg/330px-Jerusalem_-_Pater_Noster_Church.jpg", "Stone courtyard and colonnade at Pater Noster Church", "Marco Plassio", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0/"),
    },
    {
      name: "Chapel of the Ascension",
      description: "This small domed chapel in At-Tur is a traditional site of the Ascension of Jesus. It stands within a modest walled enclosure, a short distance from Pater Noster; other Christian denominations also maintain Ascension traditions on the hill.",
      visit: "It is best visited together with Pater Noster rather than as a separate trip to the upper ridge. The chapel has its own entrance and admission arrangements.",
      tipLabel: "Good to pair with",
      image: commons("Chapel_of_the_Ascension_in_Jerusalem.jpg", "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Chapel_of_the_Ascension_in_Jerusalem.jpg/330px-Chapel_of_the_Ascension_in_Jerusalem.jpg", "Small stone Chapel of the Ascension in Jerusalem", "David Castor", "Public domain", "https://creativecommons.org/publicdomain/mark/1.0/"),
    },
    {
      name: "Dominus Flevit",
      description: "The teardrop-shaped Franciscan church marks the Gospel tradition of Jesus weeping over Jerusalem. Architect Antonio Barluzzi designed its altar window to frame a view of the Old City. The small garden and setting invite a quieter pause.",
      visit: "I recommend leaving enough time to go inside rather than treating this as a photo stop. The window behind the altar is one of the memorable views on the walk.",
      tipLabel: "Worth making time for",
      image: commons("Dominus_Flevit_Church-Jerusalem.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Dominus_Flevit_Church-Jerusalem.jpg/330px-Dominus_Flevit_Church-Jerusalem.jpg", "Dome of the Dominus Flevit church on the Mount of Olives", "Yair Haklai", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0/"),
    },
    {
      name: "Church of St Mary Magdalene",
      description: "The Russian Orthodox church's golden onion domes are among the best-known features of the Mount of Olives skyline. Dedicated to Mary Magdalene, it stands above Gethsemane among terraced gardens and trees.",
      visit: "The church currently opens to general visitors on selected mornings, so it is a worthwhile addition when the visiting window fits your day.",
      tipLabel: "When to go",
      image: commons("Maria_Magdalena_Church_Jerusalem.jpg", "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Maria_Magdalena_Church_Jerusalem.jpg/330px-Maria_Magdalena_Church_Jerusalem.jpg", "Golden domes of St Mary Magdalene Church in Jerusalem", "Avraham Greitzer", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/"),
    },
    {
      name: "Garden of Gethsemane & Church of All Nations",
      description: "At the foot of the hill, Gethsemane is remembered as the place where Jesus prayed before his arrest. The garden's ancient olive trees stand beside the Church of All Nations, also known as the Basilica of the Agony, with its richly decorated façade and atmospheric interior.",
      visit: "This is a natural final stop before crossing to Lion's Gate. Allow time inside the basilica as well as at the garden railings; services may take place during the day.",
      tipLabel: "Onward route",
      image: { src: "/images/jerusalem/church-of-all-nations.webp", alt: "Church of All Nations beside the Garden of Gethsemane" },
    },
    {
      name: "Tomb of the Virgin Mary",
      description: "Near Gethsemane, a long stone stairway leads down to the traditional Tomb of Mary, an important pilgrimage church in Eastern Christian tradition. Lamps, icons and the underground setting give it a different atmosphere from the basilica nearby.",
      visit: "It is only a short addition to a Gethsemane visit. The staircase is substantial, so visitors who prefer to stay at street level may want to enjoy the adjacent sites instead.",
      tipLabel: "Nearby",
      image: commons("149140_jerusalem_tomb_of_mary_PikiWiki_Israel.jpg", "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/149140_jerusalem_tomb_of_mary_PikiWiki_Israel.jpg/250px-149140_jerusalem_tomb_of_mary_PikiWiki_Israel.jpg", "Interior shrine at the traditional Tomb of Mary", "Zeller Zalmanson / PikiWiki Israel", "CC BY 2.5", "https://creativecommons.org/licenses/by/2.5/"),
    },
    {
      name: "Mount of Olives Jewish cemetery",
      description: "The Jewish cemetery covers much of the western hillside and is one of Jerusalem's most significant historic burial grounds. It is part of Jewish religious tradition and continues to serve families and mourners today.",
      visit: "The panoramic terrace offers a clear view over the cemetery. If you want to visit particular graves or learn about its history, consult the Mount of Olives cemetery information before your trip.",
      tipLabel: "For a closer look",
      image: commons("Mount_of_Olives_Jewish_Cemetery.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Mount_of_Olives_Jewish_Cemetery.jpg/320px-Mount_of_Olives_Jewish_Cemetery.jpg", "Historic Jewish cemetery on the Mount of Olives hillside", "Antoine Taveneaux", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0/"),
    },
  ],
  transportIntro: "You can reach the upper viewpoint directly by car or bus. For an Old City visit, the most useful distinction is between transport to the upper ridge and transport to Gethsemane at its foot.",
  transport: [
    {
      title: "By bus to the viewpoint",
      text: "Bus 84 runs from Ammunition Hill, beside the light-rail station, toward Ma'ale HaZeitim near the Seven Arches Hotel. From the Sultan Suleiman Street terminal near Damascus Gate, routes 255 and 275 serve the Church of the Ascension/Rabia Al-Adawiya area, a short walk from the upper ridge. If your main destination is Gethsemane or the cemetery information area, routes 83, 83A and 51 serve nearby Jericho Road stops. Check the exact stop and service day before leaving.",
      links: [
        { label: "Mount of Olives bus directions (Moovit)", url: "https://moovitapp.com/index/en/public_transit-Monte_de_los_Olivos-Israel-site_61262338-1" },
        { label: "Mount of Olives access information", url: "https://cityofdavid.org.il/en/sites/mount-of-olives-eng/" },
      ],
    },
    {
      title: "Taxi or private transport",
      text: "A direct ride to the Seven Arches lookout is the simplest way to fit the panorama around other Jerusalem stops. For a walk down to Gethsemane, I suggest agreeing on a pickup near the lower entrance in advance. If you are spending the morning inside the Old City, the lookout can also be an enjoyable final stop.",
    },
    {
      title: "Walking from the Old City",
      text: "From Lion's Gate, the road toward Gethsemane brings you to the foot of the Mount of Olives. You can explore the gardens and nearby churches there and return to the Old City; reaching the main lookout requires continuing up the hillside. Wear comfortable walking shoes, especially if you plan to follow the historic Palm Sunday road.",
    },
  ],
  practical: [
    { title: "Choose your church day", text: "Pater Noster and St Mary Magdalene have fewer public visiting sessions than the other major stops. If either is important to you, plan around its opening day first and build the rest of the route around it." },
    { title: "Walking comfort", text: "Allow for the slope between the ridge and Gethsemane. The lookout can be enjoyed separately by anyone who would rather travel between upper and lower stops by vehicle." },
    { title: "Dress and services", text: "Modest clothing is appropriate for the churches. Worship services may take priority over sightseeing, so leave a little flexibility in a tightly timed programme." },
    { title: "The view in different light", text: "Morning light illuminates the Old City from the east. Late afternoon can be atmospheric too, especially if the viewpoint is your final stop after a city tour." },
  ],
  historyTitle: "The Mount of Olives in Christian and Jewish tradition",
  history: [
    "The Mount of Olives is closely linked with the final days of Jesus' ministry. Christian pilgrims come to remember his approach to Jerusalem on Palm Sunday, his lament over the city at Dominus Flevit and his prayer in the Garden of Gethsemane. Pater Noster and the Ascension chapels honour other moments in the Gospel tradition.",
    "The ridge also has a central place in Jewish history and religious tradition. For centuries, people have chosen burial on its slopes overlooking Jerusalem, giving the hillside cemetery its distinctive appearance today.",
  ],
  hotelNote: "If you're staying several nights, a hotel near Jaffa Gate, Mamilla or the centre can make Old City visits easier; a Mount of Olives hotel is a different choice, often made for the setting and the views.",
  relatedHotel: { text: "Jerusalem accommodation guide", to: "/travel-blog/where-to-stay-in-jerusalem/" },
};