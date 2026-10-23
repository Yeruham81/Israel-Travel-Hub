import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeHebcalTitle } from "./holiday-source-labels.mjs";

const titleMatch = /^Tish'?a B'Av$/i;

test("2029 postponed Tish'a B'Av is recognized on its observed date", () => {
  const hebcalItem = { title: "Tish’a B’Av (observed)", date: "2029-07-22" };
  const title = normalizeHebcalTitle(hebcalItem.title);
  assert.equal(title, "Tish'a B'Av");
  assert.match(title, titleMatch);
  assert.equal(hebcalItem.date, "2029-07-22"); // Never replace with the Saturday date.
});

test("Both canonical and postponed spellings match", () => {
  for (const label of ["Tish'a B'Av", "Tisha B'Av", "Tisha B'Av (observed)", "Tish’a B’Av (Observed)"]) {
    assert.match(normalizeHebcalTitle(label), titleMatch);
  }
});

test("Other postponed holidays and ordinary names retain their identity", () => {
  assert.equal(normalizeHebcalTitle("Yom HaShoah (observed)"), "Yom HaShoah");
  assert.equal(normalizeHebcalTitle("Rosh Hashana 5789"), "Rosh Hashana 5789");
  assert.equal(normalizeHebcalTitle("Shemini Atzeret"), "Shemini Atzeret");
  assert.equal(normalizeHebcalTitle("Erev Tish’a B’Av"), "Erev Tish'a B'Av");
  assert.doesNotMatch(normalizeHebcalTitle("Erev Tish’a B’Av"), titleMatch);
});
