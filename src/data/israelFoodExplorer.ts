/** Food-guide copy is deliberately practical for international first-time visitors.
 * Food origins are described as shared culinary traditions, not exclusive ownership.
 * Ten existing photographs were migrated from the user's older food guide and are
 * already committed as local, web-optimized files.
 */
import { migrationPhotos as photos } from "@/data/guideMigrationPhotos";

export const foodKinds = [
  { id:"all", label:"All 10 dishes" },
  { id:"street", label:"Street food" },
  { id:"plates", label:"Breakfast & plates" },
  { id:"bakery", label:"Bakery" },
  { id:"sweets", label:"Sweet treats" }
] as const;
export type FoodKind = Exclude<(typeof foodKinds)[number]["id"],"all">;

export type FoodDish = {
  id:string; name:string; pronunciation:string; kind:FoodKind;
  summary:string; order:string; note:string; roots:string;
  photo:{src:string;alt:string;credit?:string;sourceUrl?:string;licenseUrl?:string};
};
export const foodDishes:FoodDish[] = [
  {id:"shawarma",name:"Shawarma",pronunciation:"shah-WAR-mah",kind:"street",
    summary:"Spiced meat shaved from a rotating spit and tucked into pita or a soft laffa wrap, usually with salads and sauces.",
    order:"Ask for chicken, turkey or another available meat; choose pita, laffa or a plate. Say whether you want spicy sauce.",
    note:"Meat-based; ask what comes with the meal and which sauces contain sesame or dairy.",
    roots:"A familiar Middle Eastern street-food favourite with roots in Ottoman-era roasting traditions.",
    photo:photos["food-1"]},
  {id:"falafel",name:"Falafel",pronunciation:"fah-LAH-fel",kind:"street",
    summary:"Crisp fried chickpea fritters, often stuffed into pita with chopped salad, pickles and tahini.",
    order:"Try a falafel pita and ask for a small amount of zhug if you want a little heat.",
    note:"The fritters are commonly plant-based; check bread, sauces, shared equipment and sesame allergens.",
    roots:"Part of the wider Middle Eastern food landscape, enjoyed in many local variations.",
    photo:photos["food-2"]},
  {id:"meorav-yerushalmi",name:"Jerusalem mixed grill",pronunciation:"meh-oh-RAV yeh-roo-shal-MEE",kind:"plates",
    summary:"A lively griddle mix of seasoned chicken and other cuts, often including hearts, liver or spleen, with onions and spices.",
    order:"Choose a pita, laffa or plate; ask which cuts are included before ordering.",
    note:"Contains meat and may contain offal. It is quite different from a regular chicken skewer.",
    roots:"An especially characteristic Jerusalem street-food preparation.",
    photo:photos["food-3"]},
  {id:"hummus",name:"Hummus",pronunciation:"HOO-moos",kind:"plates",
    summary:"A bowl of smooth chickpeas and tahini served with warm pita and often whole chickpeas, olive oil or other toppings.",
    order:"Try a hummus plate for lunch; ask for whole chickpeas, masabacha or a cooked topping if available.",
    note:"Tahini contains sesame. A bowl of hummus is often a full meal, not just a small dip.",
    roots:"A cherished dish across the Levant, with Palestinian, Arab and other regional traditions.",
    photo:photos["food-4"]},
  {id:"shakshuka",name:"Shakshuka",pronunciation:"shak-SHOO-kah",kind:"plates",
    summary:"Eggs gently cooked in a tomato-and-pepper sauce, typically served bubbling hot with bread for dipping.",
    order:"A good breakfast or brunch choice; ask whether bread, salad or cheese is included.",
    note:"Contains eggs, and some versions add dairy. Spice levels vary.",
    roots:"Linked to North African cooking traditions and now common on local breakfast menus.",
    photo:photos["food-5"]},
  {id:"sabich",name:"Sabich",pronunciation:"sah-BEEKH",kind:"street",
    summary:"A pita packed with fried aubergine (eggplant), boiled egg, salad, tahini and often tangy amba sauce.",
    order:"Ask for amba if you enjoy a tangy mango-pickle flavour; request less sauce if you prefer a milder sandwich.",
    note:"Usually contains egg and sesame; ask about any additions or substitutions.",
    roots:"Associated with Iraqi-Jewish food traditions and particularly popular as a sandwich.",
    photo:photos["food-6"]},
  {id:"bourekas",name:"Bourekas",pronunciation:"boo-REH-kahs",kind:"bakery",
    summary:"Golden flaky pastries with fillings such as potato, cheese or spinach; an easy bakery stop between sights.",
    order:"Ask for the filling and whether the pastry is priced per piece or by weight.",
    note:"Often contains wheat, and some fillings contain dairy. The shape alone does not guarantee what is inside.",
    roots:"Part of the Balkan, Turkish and Sephardic pastry traditions found across local bakeries.",
    photo:photos["food-7"]},
  {id:"jachnun",name:"Jachnun",pronunciation:"jahkh-NOON",kind:"bakery",
    summary:"Slow-cooked, rich rolled dough with a slightly sweet taste, usually served with tomato, hard-boiled egg and spicy zhug.",
    order:"Look for a weekend breakfast or brunch serving; share a portion if you also want other tastes.",
    note:"Usually wheat-based and commonly served with egg; do not assume the accompaniments are included.",
    roots:"A well-loved Yemenite-Jewish food tradition.",
    photo:photos["food-8"]},
  {id:"malabi",name:"Malabi",pronunciation:"mah-LAH-bee",kind:"sweets",
    summary:"A chilled, silky pudding with floral syrup, often finished with coconut or crushed nuts.",
    order:"Try a small cup after lunch; ask whether the pudding itself is milk-based or made with a nondairy alternative.",
    note:"May contain dairy and often has nut toppings. Versions differ from stall to stall.",
    roots:"A dessert enjoyed across the eastern Mediterranean and Middle East.",
    photo:photos["food-9"]},
  {id:"kanafeh",name:"Kanafeh / knafeh",pronunciation:"kah-NAH-feh",kind:"sweets",
    summary:"Warm crisp pastry with sweet syrup and usually a soft cheese filling, often sprinkled with pistachios.",
    order:"A freshly made portion is worth sharing; ask what kind of filling is used.",
    note:"Often contains dairy, wheat and pistachios or other nuts.",
    roots:"A Levantine dessert especially associated with Palestinian and wider Arab culinary traditions.",
    photo:photos["food-10"]}
];

export const foodStarterIdeas = [
  {title:"For your first street-food lunch",description:"Start with falafel or sabich in pita and add tahini only after asking about the sauces.",ids:["falafel","sabich"]},
  {title:"For a sit-down breakfast",description:"Order shakshuka with bread or pick up a warm boureka at a bakery.",ids:["shakshuka","bourekas"]},
  {title:"For a classic local lunch",description:"Try a bowl of hummus with pita; choose toppings and portion size before ordering.",ids:["hummus"]},
  {title:"For something sweet",description:"Share warm kanafeh or try chilled malabi, depending on your taste and dietary needs.",ids:["kanafeh","malabi"]}
];

export const foodExtras = [
  {name:"Pita and laffa",text:"Pita is a pocket bread; laffa is a larger, soft flatbread often used as a wrap."},
  {name:"Tahini (tahina)",text:"Creamy sauce made from ground sesame, often mixed with lemon and water; a common allergen."},
  {name:"Amba",text:"Tangy, seasoned mango-pickle sauce, often added to sabich and some meat wraps."},
  {name:"Zhug (schug)",text:"A spicy chilli-and-herb condiment; the heat varies by kitchen."},
  {name:"Za’atar and labneh",text:"Herb-and-spice blend with tangy strained yogurt, often enjoyed with bread; labneh contains dairy."},
  {name:"Israeli-style salad",text:"Finely chopped tomato and cucumber with other vegetables and herbs; often served at breakfast or beside a main."}
];

export const foodMarkets = [
  {id:"jerusalem",title:"Mahane Yehuda Market",place:"Jerusalem",mood:"Market stalls, bakeries and hearty home-style dishes",
    why:"A useful place to taste pastries, spices, filled sandwiches and cooked meals in one walk. The nearby streets also have evening venues.",
    tip:"Friday shopping can be busy and many stalls close for Shabbat; verify the particular vendor's hours.",
    image:"/images/jerusalem-shopping/mahane-yehuda.webp",alt:"Produce stalls in Jerusalem's Mahane Yehuda Market",
    guide:"/travel-blog/shopping-in-jerusalem/",
    map:"https://www.google.com/maps/search/?api=1&query=Mahane+Yehuda+Market+Jerusalem+Israel"},
  {id:"carmel",title:"Carmel Market & Kerem HaTeimanim",place:"Tel Aviv",mood:"Street-food stands, fruit, juices and nearby small eateries",
    why:"Combine a savoury snack with a walk through the market and adjacent historic streets without needing a formal restaurant meal.",
    tip:"Some businesses open on different schedules; the whole market does not share one opening time.",
    image:"/images/tel-aviv-attractions/carmel-market.webp",alt:"Food and produce stalls at Tel Aviv's Carmel Market",
    guide:"/travel-blog/attractions-in-tel-aviv/",
    map:"https://www.google.com/maps/search/?api=1&query=Carmel+Market+Tel+Aviv+Israel"},
  {id:"levinsky",title:"Levinsky Market",place:"Tel Aviv",mood:"Spices, olives, pickles, dried fruit and tasting stops",
    why:"A great contrast to Carmel Market if you want to explore small food shops and the many traditions behind the ingredients.",
    tip:"A tasting walk can be easier with a guide if you want context and several small samples.",
    image:"/images/hotel-cards/tlv-levinski-market.webp",alt:"Levinsky Market district in Tel Aviv",
    guide:"/travel-blog/attractions-in-tel-aviv/",
    map:"https://www.google.com/maps/search/?api=1&query=Levinsky+Market+Tel+Aviv+Israel"},
  {id:"jaffa",title:"Old Jaffa & the flea-market streets",place:"Tel Aviv–Jaffa",mood:"Arab bakeries, small cafés and wider Levantine food traditions",
    why:"Pair a meal or pastry with a relaxed walk through Jaffa's old streets, craft shops and waterfront.",
    tip:"Choose a specific café or bakery for your dates; availability can vary substantially between streets and weekends.",
    image:"/images/attractions/jaffa-food.webp",alt:"Local food served in Jaffa",
    guide:"/attractions/jaffa/",
    map:"https://www.google.com/maps/search/?api=1&query=Jaffa+Flea+Market+Tel+Aviv+Israel"}
];

export const foodTours = [
  {id:"tour-carmel-market-food-tour-viator@tours-food-markets",key:"carmel",location:"Tel Aviv",provider:"Viator",name:"Carmel Market food-tasting walk",
    description:"An organised introduction to market stalls, local bites and the adjacent Yemenite Quarter.",
    detail:"Approximately 3 hours · Check tastings and meeting place",
    image:"/images/tel-aviv-attractions/carmel-food-tasting.webp",alt:"Food-tasting atmosphere in Carmel Market",
    subId:"what_to_eat_israel_carmel_tasting"},
  {id:"tour-mahane-yehuda-tasting-viator@tours-food-markets",key:"mahane-yehuda",location:"Jerusalem",provider:"Viator",name:"Mahane Yehuda Market tasting tour",
    description:"A guided way to discover market stories and sample foods from several vendors.",
    detail:"Approximately 3 hours · Verify the Jerusalem meeting point",
    image:"/images/jerusalem-shopping/mahane-yehuda.webp",alt:"Food shops and stalls at Mahane Yehuda Market",
    subId:"what_to_eat_israel_mahane_yehuda"},
  {id:"tour-levinsky-market-tasting-viator@tours-food-markets",key:"levinsky",location:"Tel Aviv",provider:"Viator",name:"Levinsky Market tasting walk",
    description:"Explore speciality food shops, ingredients and neighbourhood food traditions with a guide.",
    detail:"Approximately 2 hours · Confirm substitutions and schedule",
    image:"/images/hotel-cards/tlv-levinski-market.webp",alt:"Shops around Tel Aviv's Levinsky Market",
    subId:"what_to_eat_israel_levinsky_tasting"}
];

export const foodFAQs = [
 {q:"What should I eat first on a trip to Israel?",a:"For an easy start, try a falafel pita, hummus as a meal or shakshuka for breakfast. If you enjoy meat, shawarma is another widely available option. Add a bakery stop or one shared dessert rather than attempting everything in one day."},
 {q:"What are the best vegetarian foods to try?",a:"Falafel, hummus, bourekas, sabich and shakshuka are common choices, although some contain egg or dairy. Ask about each preparation, tahini and cross-contact if you follow a strict diet."},
 {q:"Are these foods originally Israeli?",a:"Not all of them. Many dishes are part of shared Arab, Palestinian, Levantine, North African, Balkan, Turkish and Jewish-diaspora food histories. The guide focuses on what a visitor will encounter in Israel, not on claiming exclusive origins."},
 {q:"Is kosher food the same as halal food?",a:"No. Kosher and halal are different religious dietary frameworks; one certification does not automatically establish the other. If certification matters, check the specific establishment and the requirements you follow."},
 {q:"Do food markets close on Shabbat or Jewish holidays?",a:"Stalls and restaurants do not all follow the same schedule. Many traditional market vendors close before Shabbat, while some restaurants elsewhere remain open. Always confirm the specific venue's Friday, Saturday and holiday hours."},
 {q:"What should I ask when ordering at a street-food stall?",a:"Check the filling, any spicy sauce, allergenic ingredients, the portion size, and whether salads, sides or drinks are included. For bakeries, confirm whether the price is per piece or by weight."},
 {q:"Is it necessary to book a guided food tour?",a:"No. A self-guided tasting walk can be rewarding. A food tour is most useful if you want a guide to explain the traditions, help you visit several stalls and arrange tastings. Confirm the menu, meeting point and any dietary needs before booking."},
 {q:"What is a typical tip in a restaurant?",a:"For table service, about 10–15% is customary according to Tel Aviv's official visitor information; a tip is not ordinarily expected for every self-service takeaway purchase. Check your bill for any service charge."}
];
