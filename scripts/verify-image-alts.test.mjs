import assert from "node:assert/strict";
import { test } from "node:test";
import { auditImageHtml, auditImageSource } from "./verify-image-alts.mjs";

test("accepts descriptive content and deliberately decorative images", () => {
  const result = auditImageHtml(
    '<img src="/jaffa.webp" alt="Historic Jaffa harbour"><img src="/logo.svg" alt="" aria-hidden="true" data-decorative-image="true">',
    "/fixture/",
  );
  assert.deepEqual(result, { images: 2, decorative: 1, issues: [] });
});

test("rejects missing, blank, whitespace, generic and filename alternatives", () => {
  const result = auditImageHtml(
    '<img src="a"><img src="b" alt=""><img src="c" alt=" "><img src="d" alt="Photo"><img src="e" alt="hotel.webp">',
    "/fixture/",
  );
  assert.equal(result.issues.length, 5);
  assert(result.issues.every((issue) => issue.startsWith("/fixture/:")));
});

test("requires explicit and consistent decorative exemption", () => {
  const result = auditImageHtml(
    '<img alt="" aria-hidden="true"><img alt="" data-decorative-image="true"><img alt="A view" aria-hidden="true" data-decorative-image="true"><img aria-hidden="true" data-decorative-image="true">',
    "/fixture/",
  );
  assert.equal(result.issues.length, 4);
  assert.equal(result.decorative, 0);
});

test("handles picture elements and ignores serialized markup", () => {
  const result = auditImageHtml(
    '<picture><source srcset="small.webp"><img src="large.webp" alt="Sea of Galilee"></picture><script>const ignored = "<img>";</script>',
    "/fixture/",
  );
  assert.deepEqual(result, { images: 1, decorative: 0, issues: [] });
});

test("inspects JSX without treating comments as images", () => {
  const result = auditImageSource(
    '// <img> comment\nconst a = <img src="a" alt={photo.alt} />;\nconst b = <img src="b" alt="" aria-hidden="true" data-decorative-image="true" />;',
    "fixture.tsx",
  );
  assert.deepEqual(result, { images: 2, issues: [] });
});

test("detects invalid source attributes in conditional and client-only JSX", () => {
  const result = auditImageSource(
    'const a = ready && <img src="a" />; const b = <img alt={""} />; const c = <img alt="image" />; const d = <img alt="" data-decorative-image="true" />;',
    "fixture.tsx",
  );
  assert.equal(result.images, 4);
  assert.equal(result.issues.length, 4);
});
