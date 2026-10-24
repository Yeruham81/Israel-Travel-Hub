# Mount Zion and Mount of Olives page reconstruction — 24 October 2026

## Existing and historical source review
- Historical versions checked: https://www.israel-taxi.com/travel-blog/mount-zion/ and https://www.israel-taxi.com/travel-blog/mount-of-olives/.
- The old Mount Zion article included Zion Gate, Oskar Schindler's grave, the Cenacle, traditional David's Tomb, Dormition Abbey and Gallicantu; some were lost or underexplained in the short new page.
- The old Mount of Olives article included Pater Noster, the Chapel of the Ascension, St Mary Magdalene, Dominus Flevit, Gethsemane, the cemetery and the view; the short new page lacked a usable start-to-finish walking route.
- Old price estimates, hotel review scores, transport routes and duplicate one-day Jerusalem itineraries were not migrated. Accommodation is handled by the existing Jerusalem hotel guides.

## What changed
- `src/data/sacredHillGuides.ts` holds distinct search-intent-led introductions, descriptions, short/long walking routes, individual site explanations, practical transport, history/tradition distinction, FAQ answers and verified source links.
- `src/components/SacredHillGuideContent.tsx` gives these two pages a dedicated route-first layout with compact quick facts, route steps, site-by-site guidance, internal editorial links, and service CTAs.
- Existing URLs and attraction metadata are retained; only these two pages bypass the generic highlight-card layout.
- Existing `JerusalemPartnerOffers` slots remain active as soon as approved product records are configured: `jerusalem-mount-zion-guides`, `jerusalem-mount-olives-guides`. No fake offers or prices are shown in the meantime.
- Existing `JerusalemClusterLinks` remains the bottom-of-page cross-link network; the new text also embeds topical links inside paragraphs.

## Source checks
- Christian Information Center holy-site list, updated 2026-09-15: https://www.cicts.org/en/updated-opening-hours-holy-places-tourist-sites-holy-land. Covers Cenacle, David's Tomb, Dormition Abbey, Gallicantu, Oskar Schindler grave, Pater Noster, Ascension, Dominus Flevit, Mary Magdalene, Gethsemane and Tomb of Mary.
- Window to Mount Zion: https://www.mountzion.org.il/ for sacred compound history and Cenacle access.
- Dormition Abbey: https://www.dormitio.net/.
- The dates given in the guide are explicitly past publication dates, not claims of real-time access or admission.
- Do not reuse imagery or asset URLs from the old website. The two hero images are owned by the new site's asset pipeline.

## Follow-up
- Check layout on a phone and laptop preview, church source links and actual walking-route feasibility on site.
- When partners are ready, populate registry page IDs with verified approved offers, clear sponsored disclosures and provider/operator-specific details.
- Review hours and access again before the 2027 travel season. Separate any fee changes from evergreen editorial text.
