import { describe, expect, it } from "vitest";
import { sourceFragment, sourceIndex } from "@/test-utils/source-fragment";

describe("format-invariant source fragment assertions", () => {
  it("accepts whitespace and optional formatter parentheses while preserving exact code", () => {
    expect('aria-pressed={filter === value}').toMatch(sourceFragment('aria-pressed={filter===value}'));
    expect('cards.map((card) => (\n  <Card')).toMatch(sourceFragment('cards.map(card => <Card'));
    expect('<Photo\n  loading="lazy"\n  decoding="async"\n/>').toMatch(sourceFragment('<Photo loading="lazy" decoding="async" />'));
    expect('const overviewUrl =\n  "/maps/example.html?points="').toMatch(sourceFragment('const overviewUrl = "/maps/example.html?points="'));
    expect('A useful\n  sentence').toMatch(sourceFragment('A useful sentence'));
    expect('A useful{" "}\n  sentence').toMatch(sourceFragment('A useful sentence'));
    expect('aria-pressed={filter !== value}').not.toMatch(sourceFragment('aria-pressed={filter===value}'));
    expect('cards.map((other) => <Card').not.toMatch(sourceFragment('cards.map(card => <Card'));
    expect('<Photo loading="eager" decoding="async" />').not.toMatch(sourceFragment('<Photo loading="lazy" decoding="async" />'));
    expect('<div className="lg:grid-cols-2" />').not.toMatch(sourceFragment('className="lg:grid-cols-3"'));
    expect('to: "/wrong/"').not.toMatch(sourceFragment('to:"/correct/"'));
    expect('A usefulsentence').not.toMatch(sourceFragment('A useful sentence'));
    expect(sourceIndex('<section\n id="a">', '<section id="a"')).toBe(0);
    expect(sourceIndex('<section id="b">', '<section id="a"')).toBe(-1);
  });
});
