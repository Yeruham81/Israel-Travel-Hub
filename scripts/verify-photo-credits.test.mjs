import assert from "node:assert/strict";
import { test } from "node:test";
import { auditPhotoCredits } from "./verify-photo-credits.mjs";

const disclosure = '<section aria-label="Photo credits and licences"><details><summary>Photo credits &amp; licences</summary><ul><li>Photographer / Wikimedia Commons <a href="https://commons.wikimedia.org/wiki/File:Example.jpg">Photo source</a><a href="https://creativecommons.org/licenses/by-sa/4.0/">Licence</a></li></ul></details></section>';
const check = (html) => auditPhotoCredits('<main id="main">' + html + '</main>', "/fixture/").issues;

test("accepts one closed footer disclosure and descriptive captions", () => {
  assert.deepEqual(check('<figure><img src="/photo.webp" alt="Mosaic"><figcaption>Ancient mosaic floor</figcaption></figure><section id="contact"></section><section id="sources"></section>' + disclosure), []);
});

test("detects plain inline attributions even without an attribution component", () => {
  const issues = check('<p>Shepherds’ Field Chapel photo: <a href="https://commons.wikimedia.org/wiki/File:Example.jpg">Photographer / Wikimedia Commons</a> · CC BY-SA 4.0</p>' + disclosure);
  assert(issues.some((issue) => issue.includes("attribution text outside")));
  assert(issues.some((issue) => issue.includes("link outside")));
});

test("detects duplicate, nested, open, misplaced and empty credit blocks", () => {
  assert(check(disclosure + disclosure).some((issue) => issue.includes("more than one")));
  assert(check(disclosure.replace("</details>", "<details></details></details>")).some((issue) => issue.includes("non-nested")));
  assert(check(disclosure.replace("<details>", "<details open>")).some((issue) => issue.includes("open by default")));
  assert(check(disclosure + '<section id="sources"></section><img src="/later.webp">').some((issue) => issue.includes("precede #sources")));
  assert(check(disclosure + '<img src="/later.webp">').some((issue) => issue.includes("content photo after")));
  assert(check(disclosure.replace(/<li>[\s\S]*?<\/li>/, "")).some((issue) => issue.includes("empty")));
});

test("ignores serialized script metadata, not visible attribution", () => {
  assert.deepEqual(check('<script type="application/ld+json">{"credit":"Wikimedia Commons"}</script>'), []);
});

test("fails if a known required attribution disappears", () => {
  assert(auditPhotoCredits('<main id="main"></main>', "/travel-blog/jerusalem-to-bethlehem/").issues.some((issue) => issue.includes("required photo source/licence missing")));
});
