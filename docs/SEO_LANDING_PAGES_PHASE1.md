# SEO landing pages — phase 1

Implementation audit: 17 October 2026 (UTC). Exactly ten existing paths; no slug changes or new public pages.

## Before → after
- Root unconditionally emitted `noindex,nofollow` while leaves independently read a launch toggle → root robots removed; leaf `pageMeta()` is the single directive owner. Preview still has one `noindex,nofollow` per page. No indexing activation.
- Canonical origin could retain a trailing slash → pure tested configuration strips trailing slashes and preserves each route's self URL; no production domain/config changes.
- Private airport pages put the email form before route detail → route, address, planning and pickup guidance now precede the unchanged draft-only form; private-service intent retained.
- Hotel metadata had breadcrumbs only → three substantive hotel Articles now identify the existing author, visible image and existing reviewedAt; no fabricated datePublished. Airport pages gain WebPage with Service, no offers/prices/reviews.
- City hub omitted its researched overview and linked to an absent Sources section → overview restored; TOC omits Sources when the existing source filter renders none. Existing publisher-source visibility policy unchanged.
- Hotel FAQs inaccurately promised taxi/train coverage on private landings → links now describe private pickups accurately and route neutral/weekend questions to dedicated guides.
- Useful long-form sections remain; early decision pathways added rather than wholesale rewrites. All ten descriptions are distinct. Existing descriptive titles retained where already appropriate; Shabbat title/H1 sharpened.

## Page records
Query clusters below are **hypotheses**, not researched search volumes or ranking evidence. Links summarize priority next steps, not every existing related link.

### 1. `/travel-blog/ben-gurion-airport-to-jerusalem/`
- **Primary intent:** Arrange a private pickup to a Jerusalem address.
- **Query hypotheses:** private airport transfer Jerusalem; Ben Gurion hotel pickup; Old City drop-off; luggage and group quote.
- **Title / H1:** Private transfer from Ben Gurion Airport to Jerusalem
- **Meta description:** Plan a private Ben Gurion Airport transfer to Jerusalem: drive-time guidance, Old City hotel access, luggage and weekday starting-rate conditions. Prepare a quote request to Moshe.
- **Coverage improvement:** Drive/address guidance moved before form; early hotel-area and Shabbat next steps.
- **Internal next steps:** Jerusalem stay guide; Shabbat arrival guide; arrival tips.
- **Conversion path:** Prepare an email draft to Moshe; confirm quote/booking independently.
- **Schema:** BreadcrumbList + WebPage with nested private-transfer Service.

### 2. `/travel-blog/ben-gurion-airport-to-tel-aviv/`
- **Primary intent:** Arrange a private pickup to Tel Aviv or Jaffa.
- **Query hypotheses:** private airport transfer Tel Aviv; Jaffa airport pickup; beachfront hotel entrance; luggage capacity.
- **Title / H1:** Private transfer from Ben Gurion Airport to Tel Aviv
- **Meta description:** Arrange a private Ben Gurion Airport transfer to Tel Aviv or Jaffa. Check drive-time estimates, hotel entrances, luggage capacity and starting-rate conditions before requesting a quote.
- **Coverage improvement:** Distinct Tel Aviv/Jaffa description; destination and bags before form.
- **Internal next steps:** Tel Aviv stay guide; Jaffa hotels; Shabbat arrival guide.
- **Conversion path:** Prepare an email draft to Moshe.
- **Schema:** BreadcrumbList + WebPage with nested private-transfer Service.

### 3. `/travel-blog/ben-gurion-airport-to-haifa/`
- **Primary intent:** Arrange a private pickup to a Haifa hotel or confirmed terminal.
- **Query hypotheses:** private airport transfer Haifa; Mount Carmel hotel pickup; Haifa cruise connection.
- **Title / H1:** Private transfer from Ben Gurion Airport to Haifa
- **Meta description:** Plan a private Ben Gurion Airport transfer to Haifa, Mount Carmel or a coastal hotel. Check road-time estimates, exact drop-off and cruise-connection margins before requesting a quote.
- **Coverage improvement:** Description highlights hill/coast address and cruise margins, not guaranteed boarding. Planning precedes form.
- **Internal next steps:** Haifa hotel guide; Haifa shore excursions; Shabbat guide.
- **Conversion path:** Prepare an email draft to Moshe.
- **Schema:** BreadcrumbList + WebPage with nested private-transfer Service.

### 4. `/travel-blog/ben-gurion-airport-to-ein-bokek/`
- **Primary intent:** Arrange a private pickup specifically to Ein Bokek.
- **Query hypotheses:** Ben Gurion Ein Bokek private transfer; Dead Sea hotel pickup; Neve Zohar separate quote; return transfer.
- **Title / H1:** Private transfer from Ben Gurion Airport to Ein Bokek
- **Meta description:** Arrange a private Ben Gurion Airport transfer to Ein Bokek on the Israeli Dead Sea shore. Check the longer drive, exact hotel, one-way starting-rate conditions and separate return requests.
- **Coverage improvement:** Explicit Israeli shore, exact destination, longer drive and separate return; planning precedes form.
- **Internal next steps:** Dead Sea hotel guide; Masada; Shabbat guide.
- **Conversion path:** Prepare an email draft to Moshe; other resorts/stops require separate confirmation.
- **Schema:** BreadcrumbList + WebPage with nested private-transfer Service.

### 5. `/travel-blog/from-ben-gurion-airport-on-shabbat/`
- **Primary intent:** Find workable airport transport for a Shabbat arrival.
- **Query hypotheses:** airport on Shabbat; Friday-night arrival; Saturday airport transport; Terminal 1 Line 711; Saturday-evening restart.
- **Title / H1:** From Ben Gurion Airport on Shabbat: transport options
- **Meta description:** Plan a Friday-night or Saturday arrival at Ben Gurion Airport: check Terminal 1 weekend Line 711, authorized taxis, confirmed private pickups and the first regular service for your date.
- **Coverage improvement:** Sharper departure-focused H1/title and description; early terminal/route next steps; existing researched bus/taxi/restart sections retained.
- **Internal next steps:** Arrival tips; private Jerusalem pickup; private Tel Aviv pickup.
- **Conversion path:** Choose a suitable transport path after neutral quick answer; no direct booking claim.
- **Schema:** BreadcrumbList + Article with existing Moshe author identity, image and dateModified; no publication date invented.

### 6. `/travel-blog/getting-around-israel/`
- **Primary intent:** Choose a practical mix of transport for an Israel itinerary.
- **Query hypotheses:** getting around Israel; train versus bus; travel without a car; Rav-Kav; rural driver versus rental.
- **Title / H1:** Getting around Israel: a practical transport guide
- **Meta description:** Decide how to get around Israel by train, bus, light rail, taxi or rental car. Compare door-to-door routes, payment and rural trips, with links to dedicated city and Shabbat advice.
- **Coverage improvement:** Keep broad comparison; shorten overlap with Shabbat detail and link directly to dedicated guide. Add early fare/payment/rental pathways.
- **Internal next steps:** Taxi guide; Shabbat airport guide; car rental.
- **Conversion path:** Continue to rental or private-driver information if itinerary warrants.
- **Schema:** BreadcrumbList + Article with existing Moshe author identity, image and dateModified; no publication date invented.

### 7. `/travel-blog/taxis-in-israel/`
- **Primary intent:** Understand and use licensed taxi services.
- **Query hypotheses:** taxis Israel; metered fare versus fixed quote; Gett airport pickup; cash/card; receipts; luggage.
- **Title / H1:** Taxis in Israel: meters, apps, payment & airport pickups
- **Meta description:** Understand taxis in Israel: licensed stands and apps, metered fares versus private quotes, card or cash payment, receipts and the correct Ben Gurion Airport pickup for your booking.
- **Coverage improvement:** More precise description and early airport/Shabbat/private-pickup pathways; neutral booking/fare/payment sections retained.
- **Internal next steps:** Arrival tips; Shabbat guide; transfer hub.
- **Conversion path:** Choose arranged private pickup only if needed, after neutral taxi guidance.
- **Schema:** BreadcrumbList + Article with existing Moshe author identity, image and dateModified; no publication date invented.

### 8. `/travel-blog/where-to-stay-in-jerusalem/`
- **Primary intent:** Choose a Jerusalem neighborhood before comparing hotels.
- **Query hypotheses:** where stay Jerusalem; Old City versus city centre; Mamilla; quieter neighborhoods; luggage access.
- **Title / H1:** Where to stay in Jerusalem: areas and hotel booking tips
- **Meta description:** Choose where to stay in Jerusalem: compare six areas for Old City access, nightlife, quieter streets and luggage arrival. Explore neighborhood hotel guides and check booking terms.
- **Coverage improvement:** Restore previously unrendered overview paragraphs; destination-specific decision H2; correct FAQ falsely describing private landing as all-mode guide; remove dead Sources TOC anchor.
- **Internal next steps:** Six area guides; private Jerusalem pickup; Shabbat guide; Masada.
- **Conversion path:** Open area/hotel advice or browse Expedia/Booking.com, retaining actual sponsorship.
- **Schema:** BreadcrumbList + Article with existing Moshe author identity, image and dateModified; no publication date invented.

### 9. `/travel-blog/where-to-stay-in-tel-aviv/`
- **Primary intent:** Choose a Tel Aviv/Jaffa neighborhood before comparing hotels.
- **Query hypotheses:** where stay Tel Aviv; beachfront versus Dizengoff; Jaffa; nightlife versus quiet; car-free stay.
- **Title / H1:** Where to stay in Tel Aviv: beachfront, Jaffa and city areas
- **Meta description:** Choose where to stay in Tel Aviv or Jaffa: compare eight areas for beach access, cafés, nightlife and historic character, with maps, arrival tips and neighborhood hotel guides.
- **Coverage improvement:** Restore unrendered overview; decision H2; correct private-route FAQ; link city mobility guide; remove dead Sources TOC anchor.
- **Internal next steps:** Eight area guides; private Tel Aviv pickup; getting around Tel Aviv; rental.
- **Conversion path:** Open neighborhood guide or browse provider rooms for actual dates.
- **Schema:** BreadcrumbList + Article with existing Moshe author identity, image and dateModified; no publication date invented.

### 10. `/travel-blog/best-dead-sea-hotels/`
- **Primary intent:** Choose a suitable hotel and location on the Israeli Dead Sea shore.
- **Query hypotheses:** best Dead Sea hotels Israel; Ein Bokek versus Neve Zohar versus Ein Gedi; family/spa; beach access.
- **Title / H1:** Best Dead Sea hotels in Israel: spa, family & luxury stays
- **Meta description:** Choose a Dead Sea hotel on the Israeli shore: compare Ein Bokek, Neve Zohar and Ein Gedi, beach access, spa age policies and family stays. Check room and meal inclusions before booking.
- **Coverage improvement:** Early location tradeoffs before categories/property comparison; distinct location-first description; preserve researched eleven-stay material.
- **Internal next steps:** Spa guide; family guide; private Ein Bokek transfer; Masada.
- **Conversion path:** Check exact room, guest ages, meals and total on existing providers.
- **Schema:** BreadcrumbList + Article with existing Moshe author identity, image and dateModified; no publication date invented.

## Technical findings and guardrails
- All ten leaf heads use unique title/description, matching OG text, `og:type`, Twitter card, one self canonical and one robots entry. Root has no canonical or robots override; `html lang="en"` and skip link unchanged.
- Existing `trailingSlash: "always"` preserved. Local slashless requests/navigation resolve to the existing slash paths; no new redirect code. Production HTTP redirects remain unverified until launch.
- All ten images are bundled local assets. No new OG/Twitter image URL added: bundled relative URLs do not establish an appropriate publicly accessible, share-sized rendition. Removed the three scoped practical guides' constructed staging share-image tags; schema image URLs still refer to the actual visible local images. A real production origin and share-size/HTTP verification remain launch tasks.
- Existing visible image alt text, dimensions and responsive crops retained; transfer/practical first images retain high fetch priority. No LCP performance score is claimed. Hotel images are below the text intro and lazy-loaded in city guides; no image replacement or source/license change.
- Structured text safely JSON-encoded with HTML-sensitive escaping. Tested correct self origin and existing author identity. Service contains no fake Product, offer, address, price, aggregate rating or review. Hotel dateModified uses existing reviewedAt, not a newly asserted fact-check date. Existing source dates and prices were not refreshed.
- Author card, Tripadvisor link, cited official pages, image credits, provider URLs, affiliate disclosures, currency estimates and price basis retained. Actual current provider/affiliate state is whatever the existing typed registry provides, not the older conversation's unconfigured assumption.
- Quote form still only prepares a local email draft. No delivery, lead or booking success event added. Existing Israel-local validation preserved.
- No edits to homepage visuals, global navigation design, /tours/ or /destinations/ hubs, provider data, public paths, dependencies or publication settings.

## Validation and limitations
- Full `bunx vitest run`: **157/157 tests passed across 20 files** (23:36 UTC). New tests cover ten unique heads, root/leaf robots, staging/production config without publishing, canonical origin, JSON encoding, schemas, actual SSR information, valid route/static-map/anchor targets and intent boundaries. No CSS snapshots.
- Automatic harness TypeScript/production-build verification: latest source result `build OK`; no manual build/typecheck was invoked because the managed environment performs them automatically. The existing GitHub full validation workflow is preserved; its remote result has not been checked.
- `git diff --check`: **passed** after the final source/test edits.
- Browser Chromium 1280×1800 and 390×1800: all ten paths returned 200; one robots directive/canonical/H1; English language; valid JSON-LD; actual SSR H1/title present; all page images loaded after scrolling; no horizontal overflow or page errors. Screenshots reviewed for transfer, hotel and Shabbat content. A valid private-transfer request read back as an **unsent** email draft, not transmitted.
- Clicked private-transfer → Jerusalem hotel guide on desktop, and hotel guide → private-transfer on mobile. Slashless route normalized to the retained trailing-slash URL. Browser evidence is under `/tmp/browser/seo-phase1/` and `/tmp/browser/seo-links/` (temporary verification files, not public site assets).
- SEO Review skill: stored scanners were all `not_scanned`, with no findings. No current scanner verdict, rankings, keyword volumes or indexing/traffic evidence is claimed. Source/browser audit and tests were used for this authorized implementation.
- GSC/GA4 query, traffic, conversions, canonical selection and cannibalization need real property access and an explicit later production launch. Google Rich Results Test/Schema Validator and social-platform share previews were not run; schema tests do not promise eligibility or rich results.
- Live field LCP/CLS, Google crawl/index behavior, published response headers/redirects and share-image HTTP rendition checks remain unverified. Browser checks here are staging checks, not those production measurements.
- GitHub: edits stay compatible with managed Lovable synchronization. No commits, force pushes or stateful Git commands were issued; delivery to `Yeruham81/Israel-Travel-Hub` and remote CI completion cannot be independently established from this sandbox.
