/** Published/recorded prices, never live inventory. Each price retains its own evidence. */
export const ESIM_UPDATED = "2026-11-26";
export const esimProviders = ["Saily", "Airalo", "Yesim", "GigSky"] as const;
export type EsimProvider = typeof esimProviders[number];
type Evidence = "provider" | "publisher";
export type EsimPlan = { provider: EsimProvider; gb: number | "Unlimited"; days: number; amount: number; currency: "USD" | "EUR"; checkedAt: string; evidence: Evidence; sourceId: string; regularUsd?: number };
const p = (provider: EsimProvider, gb: EsimPlan["gb"], days: number, usd: number, checkedAt: string, evidence: Evidence, sourceId: string, regularUsd?: number, currency: EsimPlan["currency"] = "USD"): EsimPlan => ({provider,gb,days,amount:usd,currency,checkedAt,evidence,sourceId,...(regularUsd === undefined ? {} : {regularUsd})});
const direct = (provider: EsimProvider, gb: EsimPlan["gb"], days: number, usd: number, sourceId: string) => p(provider,gb,days,usd,ESIM_UPDATED,"provider",sourceId);
const saily = (gb: number, days: number, usd: number) => direct("Saily",gb,days,usd,"guide-esim-saily-usd-price-nov26");
const gig = (gb: number, days: number, usd: number, regularUsd?: number) => p("GigSky",gb,days,usd,ESIM_UPDATED,"publisher","guide-esim-gigsky",regularUsd);
const yesimUnlimited = (days: number, eur: number) => p("Yesim","Unlimited",days,eur,ESIM_UPDATED,"provider","guide-esim-yesim-"+days,undefined,"EUR");
export const esimFixedPlans: EsimPlan[] = [
  saily(1,7,3.99),saily(3,30,5.99),saily(5,30,7.99),saily(10,30,11.99),saily(20,30,16.99),
  ...([[1,3,4],[3,3,5.5],[3,7,6],[5,7,7],[5,15,7.5],[5,30,8],[10,7,10.5],[10,15,11],[10,30,11.5],[20,15,16],[20,30,16.5],[50,30,39]] as const).map(([gb,days,usd])=>direct("Airalo",gb,days,usd,"guide-esim-airalo-fixed")),
  ...([[1,3.74],[5,9.9],[10,16.5],[20,25.41],[30,32.67]] as const).map(([gb,usd])=>direct("Yesim",gb,30,usd,"guide-esim-yesim")),
  gig(1,7,4.99),gig(3,15,10.79),gig(5,30,16.79,20.99),gig(10,30,29.19),
];
export const esimUnlimitedPlans: EsimPlan[] = [
  ...([[3,12.5],[5,18],[7,26.5],[10,34],[15,48],[30,69]] as const).map(([days,usd])=>direct("Airalo","Unlimited",days,usd,"guide-esim-airalo")),
  yesimUnlimited(7,21.7),yesimUnlimited(15,35),yesimUnlimited(30,55),
];
export const esimFairUse: Record<EsimProvider,string> = {
  Saily: "—",
  Airalo: "3 GB/day; then 1 Mbps",
  Yesim: "Operator fair-use limits",
  GigSky: "3.5 GB/day; speed may decrease until the next 24-hour reset",
};
export const esimUsd = (amount: number) => "$" + amount.toFixed(2);
export const esimPlanPrice = (plan: EsimPlan) => (plan.currency === "EUR" ? "€" : "$") + plan.amount.toFixed(2);
export const esimDataLabel = (gb: EsimPlan["gb"]) => gb === "Unlimited" ? gb : gb + " GB";
export const esimPlan = (provider: EsimProvider, gb: EsimPlan["gb"], days: number) => {
  const result = [...esimFixedPlans,...esimUnlimitedPlans].find(plan=>plan.provider===provider&&plan.gb===gb&&plan.days===days);
  if (!result) throw new Error("Missing eSIM recommendation: "+provider+" "+gb+" "+days);
  return result;
};
export const esimPicks = [
  {label:"Short trip",plan:esimPlan("Saily",3,30),reason:"Maps and messages for a week"},
  {label:"Regular holiday",plan:esimPlan("Saily",5,30),reason:"Navigation and everyday browsing"},
  {label:"Frequent data use",plan:esimPlan("Airalo",10,30),reason:"Photos, social media and calls"},
  {label:"Heavy data use",plan:esimPlan("Airalo","Unlimited",30),reason:"3 GB of high-speed data per day"},
];
export const esimFacts = esimPicks.map(({label,plan})=>({label,text:esimDataLabel(plan.gb)+" · "+plan.days+" days · "+esimPlanPrice(plan)}));
export const esimComparison = {caption:"Compare unlimited eSIM plans",headers:["Provider","7 days","15 days","30 days","High-speed data"],rows:esimProviders.map(provider=>[provider,...[7,15,30].map(days=>{const plan=esimUnlimitedPlans.find(p=>p.provider===provider&&p.days===days);return plan?esimPlanPrice(plan):"—";}),esimFairUse[provider]])};
export const esimRegional = {gb:5,days:30,usd:18,sourceId:"guide-esim-airalo-mena"};
export const drimsimEurPerMb = 0.01;
export const esimFeatureRows: string[][] = [
  ["Saily","Local partners; 4G/5G where supported","Supported","Additional plan in app","Optional US number / minutes / texts","First supported network; activate within 180 days","App / help center"],
  ["Airalo","Annatel listed; speed varies","Check selected package","Top-up or renewal where offered","Selected voice/text packages","First covered network for listed data plans","24/7 support"],
  ["Yesim","Local partners; 3G–5G","Operator-dependent","Balance top-up","Data-only plan","First compatible network; within 180 days","24/7 support"],
  ["GigSky","Local partners; 4G/5G where supported","Supported","Add a plan to existing eSIM","Data only","First covered network","App / help center"],
  ["Drimsim","Local partner depends on coverage","Confirm on offer","Prepaid balance","Data eSIM","Follow app setup","Support chat"],
];
