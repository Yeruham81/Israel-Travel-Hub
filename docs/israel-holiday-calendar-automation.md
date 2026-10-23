# Israel holiday calendar — rolling data and maintenance

The evergreen page stays at `/travel-blog/israel-holidays/`. Its title has no year.

## How it moves forward

- Calendar and list start from the current month **in Israel**; past months and quarters disappear automatically in the browser.
- The visual trip picker shows up to **15 months**. It does not show months beyond `HOLIDAY_COVERAGE.to`, so missing data is never represented as an all-clear.
- The current and next-year references in the Sources section advance automatically.
- Editors can continue to update the explanatory text without changing the calendar infrastructure.

## Automated source refresh

Workflow: `.github/workflows/refresh-israel-holidays.yml`

Runs Tuesday at **04:23 UTC**; can also be launched through **Actions → Refresh Israel holiday calendar → Run workflow**. Runs when the workflow or generation script is changed.

Script: `node scripts/sync-israel-holidays.mjs`.

- **Hebcal**: future Jewish observances and Israeli national memorial/holiday dates (`i=on` selects Israeli practice). Requires known festival dates to exist before publishing.
- **Western and Orthodox Easter**: date calculations for each year, with corresponding Holy Week and Christmas events.
- **AlAdhan**: future Ramadan and Eid dates, explicitly **tentative**; local moon-sighting decisions still take priority.
- **Druze pilgrimage**: published fixed annual period; area-specific effects are editorial planning guidance.
- The curated 2026/2027 content remains in `src/data/israelHolidays.ts`, including its bespoke travel details.
- The generated snapshot `src/data/israelHolidayFuture.generated.json` contains **2028 onward** plus the generation date and end of coverage.

The script validates records, dates, communities and source responses before writing. If any API fails or required data is incomplete, the existing snapshot remains untouched and the workflow fails visibly. It does **not** silently replace missing dates with guessed confirmed dates.

The script records an updated source-review timestamp approximately monthly, even if dates do not change. This also helps avoid automatic disablement of scheduled workflows in public GitHub repositories due to prolonged inactivity, but GitHub still controls scheduling.

## First-run checklist

1. Open the GitHub Actions workflow and launch **Run workflow** if its initial push run did not run.
2. Check that the workflow is green and its resulting commit updates `src/data/israelHolidayFuture.generated.json` with a non-null `generatedAt`, at least 55 holiday records, and future coverage.
3. Check the main validation workflow (build, TypeScript, tests).
4. If its commit/push is rejected, inspect **Settings → Actions → General → Workflow permissions** and branch protection; the workflow requires the ability to write to `main`.
5. Periodically spot-check Muslim dates against locally announced dates and revise editorial travel guidance where needed.

**Do not edit the generated JSON by hand.** Make source-specific changes in the script; edits to evergreen explanations should go in the associated source template or curated data.
