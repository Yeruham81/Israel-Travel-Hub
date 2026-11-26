import { ConsentIframe } from "@/components/ConsentIframe";
import { shoreDestinationRows, shoreHubComparison, shoreMapPoints } from "@/data/shorePlanning";
import type { ShorePortId } from "@/data/registry";
export function ShoreComparisonTable({caption,headers,rows}:{caption:string;headers:readonly string[];rows:readonly (readonly string[])[]}) {
 return <div role="region" aria-label={caption} tabIndex={0} className="mt-4 max-w-full overflow-x-auto rounded-xl border focus-visible:outline-2 focus-visible:outline-primary">
  <table className="w-full min-w-[540px] text-left text-sm leading-relaxed">
   <caption className="sr-only">{caption}</caption>
   <thead className="bg-secondary"><tr>{headers.map((h,i)=><th key={h} scope="col" className={"p-3 font-semibold "+(i===0?"sticky left-0 z-10 bg-secondary":"")}>{h}</th>)}</tr></thead>
   <tbody className="divide-y">{rows.map(row=><tr key={row[0]} className="bg-card">{row.map((cell,i)=>i===0?<th key={i} scope="row" className="sticky left-0 z-10 bg-card p-3 font-semibold">{cell}</th>:<td key={i} className="p-3 align-top">{cell}</td>)}</tr>)}</tbody>
  </table>
 </div>;
}
export function ShoreHubComparison(){return <ShoreComparisonTable caption="Compare destinations by cruise port" headers={["Destination","Ashdod","Haifa"]} rows={shoreHubComparison}/>;}
export function ShorePortPlanning({id,name}:{id:ShorePortId;name:string}){
 const points=shoreMapPoints[id];
 return <>
 <section id="shore-planning" aria-labelledby="shore-planning-h" className="mt-12 scroll-mt-24">
   <h2 id="shore-planning-h" className="text-3xl">Choosing the right shore excursion from {name}</h2>
   <ShoreComparisonTable caption={"Compare destinations from "+name} headers={["Destination","Highlights","Approx. one-way drive","Best suited to"]} rows={shoreDestinationRows[id]}/>
   <p className="mt-3 text-sm text-muted-foreground">Allow extra time for traffic, sightseeing, port access and return to the ship. Distances and driving times are approximate and depend on your pickup point and route.</p>
 </section>
 <section id="shore-map" aria-labelledby="shore-map-h" className="mt-10 scroll-mt-24">
  <h2 id="shore-map-h" className="text-3xl">Destinations from {name} Port</h2>
  <div className="mt-4 overflow-hidden rounded-xl border bg-card">
   <ConsentIframe category="external" src={"/maps/shore-destinations.html?port="+id} title={"Map of destinations from "+name+" Port"} loading="lazy" width="100%" height={420} className="block h-[360px] w-full border-0 sm:h-[440px]"/>
   <ol aria-label={"Map locations from "+name} className="grid grid-cols-2 gap-2 border-t p-3 lg:grid-cols-3">{points.map(([label,lat,lon],i)=><li key={label}><a className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline" href={"https://www.google.com/maps/search/?api=1&query="+lat+","+lon} target="_blank" rel="noopener noreferrer"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs text-primary-foreground">{i+1}</span>{label}</a></li>)}</ol>
  </div>
 </section>
 </>;
}
