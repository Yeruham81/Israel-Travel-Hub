import type { ShorePortId } from "@/data/registry";
export const shoreDestinationRows: Record<ShorePortId, readonly (readonly string[])[]> = {
 haifa:[
 ["Haifa","Gardens, views & German Colony","Local city travel","Short call"],
 ["Akko","Old City, market & harbour","About 25 km · 30–45 min","Short or medium call"],
 ["Akko & Rosh Hanikra","History and coastal scenery","About 45 km to Rosh Hanikra","Half day or longer"],
 ["Nazareth & Galilee","Christian heritage & lakeside sites","About 40 km to Nazareth; 62 km direct to Tiberias","Full day"],
 ["Tel Aviv & Jaffa","City, markets and waterfront","About 95 km · 1.25–1.75 hr","Full day"],
 ["Jerusalem","Sacred sites and historic quarters","About 150 km · 2 hr or more","Long call"],
 ],
 ashdod:[
 ["Tel Aviv & Jaffa","City, markets and seafront","About 36–40 km to Tel Aviv","Short or medium call"],
 ["Jerusalem","Historic and religious landmarks","About 70 km · 1 hr or more","Full day"],
 ["Jerusalem & Bethlehem","Old City and Christian heritage","Jerusalem drive plus access arrangements","Full day"],
 ["Masada & Dead Sea","Fortress, desert and beach","About 153 km to Masada","Long call"],
 ["Nazareth & Galilee","Christian heritage and lakeside scenery","About 135–140 km to Nazareth","Long call"],
 ["Jerusalem, Masada & Dead Sea","Selected city and desert highlights","Multi-stop journey","Very long call"],
 ],
};
export const shoreHubComparison = [
 ["Jerusalem","Good starting point","Long journey south"],
 ["Jerusalem & Bethlehem","Full day","Long call"],
 ["Tel Aviv & Jaffa","Coastal day","Full day"],
 ["Haifa & Akko","—","Good starting point"],
 ["Nazareth & Galilee","Long call","Good starting point"],
 ["Masada & Dead Sea","Long call","—"],
] as const;
// Approximate landmark locations for orientation, not designated pickup points.
export const shoreMapPoints = {"haifa":[["Haifa Port",32.819,35],["Akko",32.922,35.07],["Rosh Hanikra",33.093,35.105],["Nazareth",32.702,35.297],["Sea of Galilee",32.792,35.532],["Tel Aviv & Jaffa",32.055,34.754],["Jerusalem",31.778,35.234]],"ashdod":[["Ashdod Port",31.831,34.638],["Tel Aviv & Jaffa",32.055,34.754],["Jerusalem",31.778,35.234],["Bethlehem",31.704,35.207],["Masada",31.315,35.353],["Dead Sea",31.197,35.363],["Nazareth",32.702,35.297],["Sea of Galilee",32.792,35.532]]} as const;
