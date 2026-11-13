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

## Editorial economy and reader respect
- **Assume the reader is capable.** Do not explain self-evident facts, add defensive qualifications to ordinary descriptions, or repeat points already made in a paragraph, table or caption.
- **Every note must add new practical value.** Keep a note only when it clarifies a material exception, legally important restriction, specific accessibility issue, time-sensitive figure or a non-obvious action that changes a travel decision. Otherwise delete the note instead of rephrasing it.
- Tables should prioritize **useful comparisons and destinations**, not repetitive “check the stop / confirm the exit / verify the schedule” cells. If a column mostly contains generic warnings, remove the column.
- Do not state that an operator lists the very stations or routes already shown in a sourced table, or remind readers that nearby attractions are not necessarily at the station entrance.
- Generic advice to check current timetables and return services belongs in one suitable planning section, where it has value; do not repeat it below each transit mode or table.
- Preserve substantive safety, fare, booking, legal and accessibility caveats **where they make a real difference**. Removing redundant boilerplate must not remove an actual limitation or imply that an unverified service exists.
- Prefer a short, confident, helpful editorial voice over formulaic hedging. Source references remain available at the end without announcing each source again in body text.
- Where an as-of date matters to prices or operating rules, express it reader-first (e.g. “Information current as of November 2026”), not as a report of the editor's checking action. Keep exact effective dates when important to planning.

## Evergreen titles, summaries and SEO metadata
- **Do not add calendar years to evergreen guide H1 titles, SEO titles or descriptions, introductory copy, section headings, or FAQ questions.** Phrases such as “Taxi Fares in Israel (2026)”, “2026 travel guide”, and “arriving in 2026?” age the guide unnecessarily.
- Keep the year when it carries **actual temporal meaning in the article body**: a visible “Updated November 2026” stamp; “Information current as of November 2026”; a service, tariff or legal change effective from a specified month and year; an expiry date or historical event. Make that purpose explicit, not just a decorative year label.
- Named annual events and source notices may retain their genuine edition/publication dates, because their year identifies the real event or document. Do not suppress meaningful historical dates or alter URLs, reference IDs, SEO slugs or metadata timestamps merely to remove year labels.
- When a page contains time-sensitive prices or fares, put the applicable effective month/year next to the data or source context instead of dating the overall page title. Review the underlying facts as they change; an evergreen title does not mean the prices are permanently current.
- Keep navigation cards, internal link text, excerpts, meta descriptions and on-page titles consistent and independent of a year, even where a URL slug must remain unchanged for existing links.

## Regression and quality gates
- Maintain tests for a single holiday-calendar link, first paragraph preceding a section image, three-column layout for six cards and unique image identities within card collections.
- Before publishing, run the full production build, TypeScript checks, all tests and static prerender validation; review the pages visually in mobile and desktop widths.
