# Reusable individual attraction page - editorial and visual standard

The fully researched Capernaum article at /attractions/capernaum/ is the first
reference implementation. Reuse the structural component
src/components/AttractionDestinationPage.tsx with attraction-specific content
instead of cloning the entire Capernaum page.

## Universal layout

1. Home / Attractions / attraction breadcrumbs.
2. Compact hero: title and a two-to-four-line introduction left, small
   authentic photo right on desktop; photo beneath the text on narrow screens.
   Use GuideHeroLayout, GuideHeroMedia, AuthorCard and PageUpdated.
3. Six compact **At a glance** fact cards on a distinct warm-toned background (two columns mobile, three desktop). Each fact chooses its own semantically appropriate icon.
   Only high-value, verified facts (location, duration, published fee/hours,
   accessibility, booking). Identify the operator that published a fee or
   time, and clarify distinct entrances.
4. OnThisPage navigation for real article sections, never Sources.
5. Main highlights first, with specific historic/architectural interpretation
   and a few non-duplicative, authentic, locally stored photographs.
6. History/context where relevant: distinguish documented finds from tradition.
7. Operator-specific hours, prices, reservations, mobility access and visitor
   preparation. Show a small table on desktop and stacked cards on mobile for
   separately managed compounds. Include a few editorial tips using the shared
   yellow lightbulb callout; never invent first-hand experience.
8. Getting there: target the correct entrance, not a remote road junction.
   A compact location map with an accessible larger-map fallback is useful when
   verified coordinates are available. Clearly state when public transport is
   cumbersome without repeating junction names.
9. Suggested focused site visit and optional nearby itinerary, without
   unsupported travel-time estimates.
10. Relevant guided tours and a restrained private-driver reference after the
    substantive visitor content; never fabricate tour prices or availability.
11. Concise FAQs for remaining questions.
12. Six related attraction cards when relevant, in a two-row three-column
    desktop grid. Use `Related sites` to allow thematic connections across the
    region. Do not repeat photographs.
13. A quiet `Plan your trip to Israel` text-link panel beneath the attractions.
14. Shared contact form once only; Sources last, closed by default.

## Site-specific variation

- Religious sites: separate worship/visitor entrances and appointment rules.
- Archaeological sites: periods, excavation evidence, scholarly uncertainty.
- National parks: trail status, weather, safety notices, ranger instructions.
- City sights: walking order, local streets and entry points.
- Omit a genuinely irrelevant module instead of filling space.

## Image and data integrity

All images must be local project assets. Prefer licensed/owned photos from the
owner's archived site and truthful alt descriptions. Never insert an image
between a heading and its introductory paragraph. No duplicate images within
an article, except the author portrait near the top and the contact form.
Do not publish source filenames, invented visitor prices, ratings or tickets.

Do not add a repeating "Worth knowing:" label to every highlight. Remove
redundant historical disclaimers, use lists for multi-step visitor instructions,
and keep highlight paragraphs short. Use original photographs of the exact site
where possible and confirm rights and required credits.

Keep H1 and opening year-free. Show an authentic Updated Month Year and use
the corresponding structured-data dateModified. Keep the site owner's voice
in first-person singular when describing his services, and preserve
affiliate tracking on linked external tour catalogues. Booking inquiries
require confirmation.
