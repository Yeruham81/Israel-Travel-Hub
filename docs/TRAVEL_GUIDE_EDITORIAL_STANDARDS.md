# Travel-guide editorial and layout standards

These rules apply to every travel guide and to future guide updates, not only the Ben Gurion Airport routes. Use the Jerusalem and Tel Aviv airport-comparison pages as the editorial baseline.

## Shabbat and Jewish holidays
- In the “Getting there on Shabbat and Jewish holidays” section, link contextually to **Israel's calendar of events** at `/travel-blog/israel-holidays/` so visitors can check holiday dates and potential transport/venue disruptions.
- Add the link only once per section, beside practical Shabbat/holiday planning text; verify the exact service timetable separately. Do not present general holiday dates as operator-specific departure times.
- Distinguish the free airport terminal shuttle, any limited weekend bus service, ordinary public transport, authorized taxis and separately booked transfers.

## Text before photos
- Never put an editorial photo **between a section or subsection heading and its first explanatory text**.
- The sequence is: heading → short relevant paragraph → image → supporting text, table, list or next subsection. This includes nested headings such as railway-station or hotel-connection advice, option sections and article sections.
- The hero image may follow the page heading **after** its introductory paragraph. A photo should support the point immediately before or after it, not interrupt a heading-to-text transition.
- Keep the route's main train-station comparison and onward-to-hotel details together rather than presenting duplicate tables in separate sections.

## Related practical guides and images
- **Six** related practical guide cards should use one column on mobile, two on small screens and **three on desktop**, yielding two rows of three. Shorter groups may remain two columns on desktop.
- Do not show the same photograph in two cards in the same page. Use `photoIdentity` from `src/lib/photo-uniqueness.ts` to recognize resized/renamed formats of the same photo, not just identical URLs.
- When guide covers overlap, select distinct relevant images **across the whole grid**, not greedily one card at a time. Prefer each guide’s own section photography or an editorially verified local alternative; never leave a photo card blank merely because its cover is shared by another guide. If the current page hero is the only suitable photo, showing that legitimate cover is preferable to a blank card, while ensuring different cards still have distinct images. Add a relevant licensed local asset when a group genuinely lacks enough distinct images; do not add unrelated photography.
- Avoid repeating the same photograph between hero, sections and related-card groups where a distinct suitable alternative exists. Check the combined rendered page, not just individual component datasets.
- The guide directory (`/guides/`), shared `RelatedLinks` grids and accommodation trip-planning groups must follow the same photo-uniqueness rule.

## Contextual links and visual highlights
- Add relevant **internal links in paragraphs where visitors need the answer**, such as hotel-area selection, local transport, airport taxi pickup, ticketing, Shabbat transport, sherut status or destination guides. Supplement with a focused “Related practical guides” group.
- Use the warm yellow lightbulb callout for high-value actionable links (operator timetables, ticketing, official pickup instructions or a relevant form) with a contextual label and one-line explanation. Do **not** add a repeated “Useful link” title.
- Compare routes by the user's whole journey, including terminal, station, final address, bags, Shabbat and real-world access; do not turn informational comparisons into private-transfer advertisements.
- Verify current timetable, prices, official links and service status before describing them as current. If figures are estimates, label them as such.

## Regression and quality gates
- Maintain tests for a single holiday-calendar link, first paragraph preceding a section image, three-column layout for six cards and unique image identities within card collections.
- Before publishing, run the full production build, TypeScript checks, all tests and static prerender validation; review the pages visually in mobile and desktop widths.
