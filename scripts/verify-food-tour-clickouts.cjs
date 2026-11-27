/** Read-only partner clickout verification; does not book or submit customer data. */
const fs = require("node:fs");
const path = "/tmp/food-tour-clickouts.json";
const tours = [
  {
    name: "Carmel Market",
    short: "https://viator.tpm.li/GHQIEpFF",
    product: "198140P1",
    sub: "what_to_eat_israel_carmel_tasting",
  },
  {
    name: "Mahane Yehuda Market",
    short: "https://viator.tpm.li/aDupYDYo",
    product: "6540P10",
    sub: "what_to_eat_israel_mahane_yehuda",
  },
  {
    name: "Levinsky Market",
    short: "https://viator.tpm.li/84FISBew",
    product: "58980P5",
    sub: "what_to_eat_israel_levinsky_tasting",
  },
];
(async () => {
  const all = [];
  for (const tour of tours) {
    const first = new URL(tour.short);
    first.searchParams.set("sub_id", tour.sub);
    let u = first.toString(),
      hops = [],
      error = null,
      matched = false;
    for (let i = 0; i < 7; i++) {
      try {
        const resp = await fetch(u, {
          method: "GET",
          redirect: "manual",
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; IsraelTravelHubQA/1.0)",
            Accept: "text/html,application/xhtml+xml",
          },
          signal: AbortSignal.timeout(17000),
        });
        const loc = resp.headers.get("location");
        hops.push({ status: resp.status, url: u, location: loc, host: new URL(u).hostname });
        if (u.includes(tour.product) || (loc || "").includes(tour.product)) matched = true;
        if (resp.status >= 300 && resp.status < 400 && loc) {
          u = new URL(loc, u).toString();
          continue;
        }
        break;
      } catch (e) {
        error = String(e).slice(0, 260);
        break;
      }
    }
    const gotViator = hops.some((h) => /\bviator\.com$/i.test(h.host));
    all.push({
      ...tour,
      entry: first.toString(),
      hops,
      redirectedToViator: gotViator,
      expectedProductReached: matched,
      error,
    });
    console.log(
      tour.name,
      JSON.stringify({
        redirectedToViator: gotViator,
        expectedProductReached: matched,
        error,
        hops: hops.map((x) => ({
          status: x.status,
          host: x.host,
          location: x.location?.slice(0, 340),
        })),
      }),
    );
  }
  fs.writeFileSync(
    path,
    JSON.stringify({ checkedAt: new Date().toISOString(), records: all }, null, 2),
  );
  const confirmed = all.filter((t) => t.redirectedToViator && t.expectedProductReached).length;
  const blocked = all.filter(
    (t) => t.error || t.hops.some((h) => [403, 429].includes(h.status)),
  ).length;
  console.log("VERIFIED_PRODUCT_REDIRECTS=" + confirmed + " OF 3; PROVIDER_BLOCKED=" + blocked);
  // External anti-bot restrictions must not break the website's build pipeline.
  // A mismatched destination requires manual review; never claim success on uncertainty.
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
