/**
 * Normalize Hebcal event labels without changing the published observance date.
 * In postponed-fast years (e.g. Tish'a B'Av 2029) Hebcal appends "(observed)"
 * to the correct observed date's label.
 */
export function normalizeHebcalTitle(title) {
  if (typeof title !== "string") throw new TypeError("Expected Hebcal event title");
  return title
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s*\(\s*observed\s*\)\s*$/i, "")
    .trim();
}
