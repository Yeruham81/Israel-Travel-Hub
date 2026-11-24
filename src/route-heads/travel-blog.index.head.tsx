import { pageMeta } from "@/lib/site";
import { Route } from "../routes/travel-blog.index";

export const routeHead = () => pageMeta({ title: "Israel travel guides: transport, destinations and trip planning", description: "Browse guides to Israel's airport arrivals, taxis, public transport, hotel areas, Jerusalem, the Dead Sea, attractions and day trips.", path: "/travel-blog/", crumbs: [{ name: "Home", path: "/" }, { name: "Travel guides", path: "/travel-blog/" }] });