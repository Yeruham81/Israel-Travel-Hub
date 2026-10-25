import { mkdirSync, writeFileSync } from "node:fs";
import { airportTransferRates, privateDriverServices, shoreExcursionRates, shorePorts, referenceFxSource } from "../../src/data/registry";

// Build-time input shared with TS forms, not manually maintained PHP allowlists.
const data = {
  destinations: Object.fromEntries(airportTransferRates.map(r => [r.id, r.destination])),
  driver: Object.fromEntries(privateDriverServices.map(r => [r.id, r.label])),
  ports: Object.fromEntries(Object.entries(shorePorts).map(([id, r]) => [id, r.name])),
  itineraries: Object.fromEntries(["haifa","ashdod"].map(port => [port,
    Object.fromEntries(shoreExcursionRates.filter(r => r.portId === port).map(r => [r.id,r.destination]))])),
  fxSourceId: referenceFxSource.id,
};
mkdirSync(".output/hostinger-build-meta", { recursive: true });
writeFileSync(".output/hostinger-build-meta/options.json", JSON.stringify(data, null, 2) + "\n");
console.log("PHP form options generated", {
  destinations: Object.keys(data.destinations).length,
  driver: Object.keys(data.driver).length,
  ports: Object.keys(data.ports).length,
  shore: Object.fromEntries(Object.entries(data.itineraries).map(([key, list]) => [key,Object.keys(list).length])),
});
