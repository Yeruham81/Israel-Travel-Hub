# Israel Events Calendar — phase 1

Public route (unchanged): `/travel-blog/calendar-of-events/`

The previous generic 2027 holiday article is replaced by a dedicated events page with a rolling 15-month date picker (Israel local time), region/type filters, upcoming confirmed editions, and a separate directory of annual festivals. It links to `/travel-blog/israel-holidays/` for closures and transport advice.

## Source and editorial model

- `src/data/israelEvents.ts` — dated, manually checked event editions and undated recurring festivals.
- `src/data/eventTicketLinks.ts` — **single place** to add exact-ticket links and future affiliate links. No booking CTAs appear unless an event has an explicitly configured verified ticket offer.
- `src/routes/travel-blog.calendar-of-events.tsx` — renders the calendar and cards; no ticket URLs or affiliate parameters are hard-coded into JSX.
- Dated entries have `from`, `to`, named location, source URL, and a checked date. A date range matching a festival's edition is not proof of access to every specific performance.
- Annual festival records have **no** future date fields. The organiser must confirm each edition.
- Past dated events are excluded automatically by the frontend. If the current list is empty, the interface says `No verified events are currently listed`, never that there are no events.
- **Phase 2** will evaluate licensed feeds/APIs, deduplicate source records, verify cancellation/rescheduling, and refresh current listings automatically. No API feed or scheduled importer is connected in phase 1.

## Affiliate integration later

Add to `EVENT_LINKS[eventId]` a `ticket` object:
`{ url: "https://...", kind: "direct" | "affiliate", provider: "Partner", verifiedAt: "YYYY-MM-DD" }`.

The ticket URL must point to the **correct event edition, date/venue or appropriate ticket page**, not an unrelated provider search page. Confirm link terms and affiliate authorization first; remove expired event offers. Links classified `affiliate` receive `rel="sponsored noopener noreferrer"`. The component logs anonymous outbound click information using the website's existing outbound-click helper. No purchases, availability, prices or commissions are invented.

The separate `officialUrl` remains available even when ticketing is unavailable.

## Phase 2 — scheduled source integration (2026-10-23)

- Workflow: `.github/workflows/refresh-israel-events.yml`, scheduled **daily** and available from GitHub Actions **Run workflow**.
- Source normalizer: `scripts/israel-events-source.mjs`.
- Source downloader: `scripts/sync-israel-events.mjs`. It uses the documented **Ticketmaster Discovery API** scoped to `countryCode=IL`, and needs the optional repository Actions secret `TICKETMASTER_API_KEY`.
- Generated data: `src/data/israelEventFeed.generated.json`. The page merges the resulting records with the vetted manual event list without duplicating matching event/date/venue records.
- Without an API key, the job **does not retrieve or fabricate events**, and leaves the previous snapshot untouched. This is expected until a Ticketmaster developer or publisher key is configured.
- To activate: obtain authorization from Ticketmaster; verify the commercial/API terms for the site, set the key under **Settings → Secrets and variables → Actions → New repository secret** using the exact name `TICKETMASTER_API_KEY`, and run the workflow. Never commit or display the key in website code.
- The importer discards non-Israeli venues, entries with missing dates, TBA/TBD entries, cancellations and postponements. Rescheduled entries use the provider's updated local date. Entries with no verified official HTTPS event URL do not pass.
- The importer is capped at 800 source records; if paging becomes incomplete or a request fails, **no partial file** is published. The previous validated snapshot is preserved, and the job reports failure.
- A successful update replaces the API-source snapshot (so removed or cancelled entries disappear). Imported events automatically expire from the **visible website** after eight days without a new successful verification. Editorial festival profiles remain available separately.
- Imported source URLs are **event details links**, not ticket sales offers and never affiliate URLs. Add a ticket CTA only after a separately verified exact-edition link is configured in the central registry.
- Source attribution is shown with each imported listing. Do not promise ticket availability, live pricing, English-language performances, or complete national coverage.
- The workflow runs the production build, TypeScript check and all Vitest tests before its calendar-only commit and safe rebase/push. It never force-pushes or rewrites other developers' files.
- **Not activated by default:** municipal calendars that disallow scraping under current terms, unverified third-party feeds, and affiliate inventory APIs without confirmed permission.
- Ticketmaster Discovery API documentation: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/
- Ticketmaster API terms: https://www.developer.ticketmaster.com/support/terms-of-use/
- Tel Aviv data terms (do not collect automatically without verifying permission): https://opendata.tel-aviv.gov.il/he/terms

## Visitor relevance editorial policy

The page is a **travel guide, not a catalogue of all Israeli concerts**. Ticketmaster's first 52 confirmed Israel entries consisted exclusively of music, including 33 performances at Eilat Port during the 2026 Red Sea Jazz Festival. Showing every artist in the main list was not useful for most visitors.

- `src/data/touristEventSelection.ts` holds edition-specific visitor selections with an editorial reason. The policy is about visitor accessibility and the event format, **never the artist's nationality**. Language-dependent local shows are not automatically shown, but distinctive Israeli productions can be included following an individual editorial review.
- The main list retains manually checked festival/cultural records and only **editor-reviewed individual source events** (initially Boy George and Celtic Throne's announced 2026 productions). Matching the artist name alone does not approve a new year's concert.
- For the published 11–14 November 2026 Red Sea Jazz Festival, the page shows **one festival entry and one link to the official festival website**. Do not display or expand its individual Ticketmaster performance records. The organiser's site is responsible for the detailed programme and ticket selection. Avoid inventing event dates or applying this edition's dates to future years.
- The raw provider snapshot is retained for audit and may contain local concerts not shown publicly. The site does not automatically treat all API entries as visitor-relevant.
- Provider test or placeholder inventory, including URLs containing `/event/BDIKA/`, is rejected during normalization and by a display-time safeguard.
- Prefer future data sources for visitor-friendly activities: architecture weekends, food festivals, cinema with English subtitles, international music/dance, museums and city festivals. Confirm each programme's dates, organiser links, language and allowed API/data reuse first.
- Keep the public wording clear that the list is curated, not exhaustive. Avoid implying the event is in English unless verified.

## Maintenance

- Check ticket status and organiser announcements before linking a specific offer.
- When an official event page changes its year or programme, update the verified dated entry rather than merely rolling its date forward.
- Use `bun run build`, `npx tsc --noEmit`, and `bun run test` / the existing validation workflow for every change.
