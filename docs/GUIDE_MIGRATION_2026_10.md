# Planning, city and heritage guides · 20 October 2026

The requested publisher articles were read and rewritten into the existing `TravelGuidePage` design. Sixteen original paths were added and the existing Jerusalem–Dead Sea article was substantively updated. The safety article, multi-day itineraries, senior/Christian-tour landing pages and private-tour product catalogue were outside this change.

## Pages

| Topic | Original path retained | Change |
| --- | --- | --- |
| When to visit | `/travel-blog/best-time-to-visit-israel/` | New seasonal and regional planning guide |
| Food | `/travel-blog/what-to-eat-in-israel/` | New guide retaining all ten dishes and photographs |
| Calendar | `/travel-blog/calendar-of-events/` | New recurring-calendar guide and checked 2027 Israel holiday table |
| Eilat | `/travel-blog/eilat/` | New full destination guide; accommodation and destination cards now link internally |
| Tel Aviv beaches | `/travel-blog/beaches-in-tel-aviv/` | Ten local beach choices and separate out-of-city suggestions |
| Tel Aviv museums | `/travel-blog/museums-in-tel-aviv/` | Twelve museum options; booking, language and access distinctions |
| Haifa museums | `/travel-blog/museums-in-haifa/` | Museum comparison, independent venues and separate outdoor visits |
| Megiddo | `/travel-blog/tel-megiddo/` | Archaeology, World Heritage and water-system planning |
| Mount Precipice | `/travel-blog/mount-precipice/` | Viewpoint visit; tradition distinguished from proven location |
| Annunciation | `/travel-blog/basilica-of-the-annunciation/` | Sanctuary spaces, worship and visiting arrangements |
| Magdala | `/travel-blog/magdala/` | Archaeological park distinguished from modern Duc In Altum |
| Yardenit | `/travel-blog/yardenit/` | Dedicated visitor and ceremony guide |
| Qasr el-Yahud | `/travel-blog/qasr-el-yahud/` | Dedicated lower-Jordan guide; separate country-access context |
| Dead Sea | `/travel-blog/the-dead-sea/` | Full visitor guide, separate from hotels and attraction listings |
| Jerusalem–Bethlehem | `/travel-blog/jerusalem-to-bethlehem/` | Independent transport comparison, separate from organised tours |
| Top ten experiences | `/travel-blog/top-10-things-to-do-in-israel/` | All ten original themes retained, with practical regional links |
| Jerusalem–Dead Sea | `/travel-blog/jerusalem-to-the-dead-sea/` | Existing article rewritten and updated, without adding a duplicate route |

## Facts and source handling

Typed source records are in `guideMigrationSources.ts`; provenance for the publisher originals stays in the registry but is excluded from public citations and visible source lists. Official managing bodies and operators supply visitor facts. Sources whose live public-access information could not be confirmed are explicitly marked `checkedAt: null` and are not represented as confirmed operating schedules.

- Climate: Israel Meteorological Service climate atlas; regions are distinguished and no season promises a forecast, low price or absence of crowds.
- Calendar: Hebcal's **Israel** 2027 calendar; sunset starts and nightfall ends are explicit, and Hanukkah's end falls in January 2028. Religious dates are not presented as venue or transport timetables.
- Tel Aviv Museum of Art: current entrance notice and visitor page; old prices and opening tables were removed. Steinhardt's online-ticket requirement is retained from its official page.
- Independence Hall: the heritage operator's old renovation timeframe is not treated as a current reopening confirmation.
- Uri Geller Museum: its operator explicitly requires advance booking and excludes walk-ins; no old ticket price was copied.
- Haifa: the municipal museum network is distinguished from MadaTech, railway and Ministry of Defense venues. The Bahá’í Gardens are not labelled a museum. The original misleading shrine header was replaced with an actual Haifa Museum of Art photograph.
- Megiddo: INPA and UNESCO's Biblical Tels entry; biblical attribution and traditional structure names are not treated as established archaeological certainty.
- Nazareth: Custodia sanctuary information; the Mount Precipice identification is described as a medieval religious tradition. Catholic and Greek Orthodox Annunciation sanctuaries are distinguished.
- Magdala: the official archaeological park and Duc In Altum pages; the modern sanctuary is not described as the ancient synagogue or proof of a particular birthplace.
- Yardenit: the operator FAQ confirms location, white robes, no resident priest, free site entry/ceremony and separate robe/facility charges. Conflicting seasonal hour sets and old robe prices are not reproduced.
- Qasr el-Yahud: INPA visitor/road information and UNESCO's Jordanian-bank entry; Yardenit, Qasr and Al-Maghtas remain distinct destinations. No river crossing, guaranteed access or unverified robe-hire service is promised.
- Bethlehem: South Buses' current line directory identifies 231 as **Beit Jala** and 234 as **Bethlehem**. No fixed fare, departure interval or universal vehicle permission is asserted. Citizenship-specific entry and dual-nationality context links to official government information.
- Dead Sea journeys: destinations and entrances are explicit; no one-size-fits-all journey time or old fixed bus timetable is retained. Managed beaches, hotel amenities, parks and the final return are separate planning decisions. Unsupported health-benefit claims were removed.

## Design, photographs and discovery

All articles use the existing responsive hero, author card, month/year update label, quick answer, comparison table, wrapping contents links, sections, checklist, FAQ, source list and related links. Section-level internal links were added without changing existing articles' layout. Per-article `updatedAt` prevents the migration from changing the update date of untouched guides.

Twenty-five publisher photographs were visually checked, resized and saved locally as WebP. Contact, GPS, EXIF/IPTC/XMP metadata is omitted; identified author/copyright credits are retained in typed photo data and the asset README. Existing licensed destination photographs retain their external credits. Food sections retain one image for each of the ten dishes.

The directory has **63 unique cards**, each with a local image. Regional attraction links, destination links, the planning navigation and the Eilat accommodation card lead to the new articles. A pre-existing tour card and the new Bethlehem transport guide have different directory IDs, preventing React reconciliation errors during search.

## Verification

- TypeScript `--noEmit`: passed.
- All **191 tests across 27 files**: passed.
- Production build and sitemap generation: passed; **101 page URLs**.
- New integration coverage renders all 17 affected articles, checks substantive content, headings, local images, source records, internal routes, canonical/robots/Article metadata, date preservation, directory ID uniqueness and regional discovery.
- The safety article remains absent. Existing staging `noindex,nofollow`, canonical origin, provider/affiliate separation and booking behaviour are unchanged.
- Visual inspection covered the imported photographs. Browser layout inspection was not available; the articles reuse the established layout and are covered by server-rendered and DOM integration checks.
