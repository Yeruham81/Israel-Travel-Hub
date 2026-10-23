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

## Maintenance

- Check ticket status and organiser announcements before linking a specific offer.
- When an official event page changes its year or programme, update the verified dated entry rather than merely rolling its date forward.
- Use `bun run build`, `npx tsc --noEmit`, and `bun run test` / the existing validation workflow for every change.
