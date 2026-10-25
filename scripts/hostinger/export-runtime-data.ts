// Build-time only: derive exact allowable form choices from the site's typed
// registry, so PHP never accepts arbitrary journeys and stays aligned with UI.
import { writeFileSync, mkdirSync } from "node:fs";
import { airportTransferRates, privateDriverServices, shoreExcursionRates, shorePorts, referenceFxSource } from "../../src/data/registry";

const destinations = Object.fromEntries(airportTransferRates.map(item => [item.id, item.destination]));
const driver = Object.fromEntries(privateDriverServices.map(item => [item.id, item.label]));
const ports = Object.fromEntries(Object.entries(shorePorts).map(([id, port]) => [id, port.name]));
const itineraries = Object.fromEntries(["haifa", "ashdod"].map(port =>
  [port, Object.fromEntries(shoreExcursionRates.filter(item => item.portId === port).map(item => [item.id, item.destination]))],
));
const data = { destinations, driver, ports, itineraries, fxSourceId: referenceFxSource.id };
mkdirSync(".output/public/api/_private-test", { recursive: true });
// This file is ONLY a build intermediate, not the final public API configuration:
// it will be placed under an Apache-denied folder by the packager.
writeFileSync(".output/public/api/_private-test/options.json", JSON.stringify(data, null, 2) + "\n");
console.log("Hostinger PHP option snapshot:", JSON.stringify({
  destinations: Object.keys(destinations).length,
  driver: Object.keys(driver).length,
  ports,
  itineraries: Object.fromEntries(Object.entries(itineraries).map(([k,v]) => [k,Object.keys(v).length])),
  fxSourceId: referenceFxSource.id,
}, null, 2));
