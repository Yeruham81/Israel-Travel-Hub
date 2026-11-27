import { describe, expect, it } from "vitest";
import { sourceFragment, sourceIndex } from "@/test-utils/source-fragment";

describe("format-invariant source fragment assertions", () => {
  it("accepts whitespace and optional formatter parentheses while preserving exact code", () => {
    expect('aria-pressed={filter === value}').toMatch(sourceFragment('aria-pressed={filter===value}'));
    expect('cards.map((card) => (\n  <Card').toMatch(sourceFragment('cards.map(card => <Card'));
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
  it("accepts the specific formatter changes found in stage 5.5.2", () => {
    expect('["contact", "Contact me"]').toMatch(sourceFragment('["contact","Contact me"]'));
    expect('["wrong", "Contact me"]').not.toMatch(sourceFragment('["contact","Contact me"]'));
    expect('["contact", "Contact Me"]').not.toMatch(sourceFragment('["contact","Contact me"]'));
    expect('<AuthorCard />').toMatch(sourceFragment('<AuthorCard/>'));
    expect('<OtherCard />').not.toMatch(sourceFragment('<AuthorCard/>'));
    expect('<AuthorCard hidden />').not.toMatch(sourceFragment('<AuthorCard/>'));
    const grid = sourceFragment('sm:grid-cols-2 lg:grid-cols-3" data-testid="tel-aviv-affiliate-tours"');
    expect('<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"\n  data-testid="tel-aviv-affiliate-tours">').toMatch(grid);
    expect('<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2"\n  data-testid="tel-aviv-affiliate-tours">').not.toMatch(grid);
    expect('<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"\n  data-testid="wrong">').not.toMatch(grid);
    const link = sourceFragment('href="#contact" className="font-semibold text-primary underline underline-offset-4">arranging a private day trip with a driver');
    expect('<a\n href="#contact"\n className="font-semibold text-primary underline underline-offset-4"\n >\n arranging a private day trip with a driver\n </a>').toMatch(link);
    expect('<a href="#wrong" className="font-semibold text-primary underline underline-offset-4">arranging a private day trip with a driver</a>').not.toMatch(link);
    expect('<a href="#contact" className="font-semibold text-primary underline underline-offset-4">arranging a shared day trip with a driver</a>').not.toMatch(link);
    expect("about 300\n metres from the main plaza").toMatch(sourceFragment("300 metres"));
    expect("about 500 metres from the main plaza").not.toMatch(sourceFragment("300 metres"));
  });
});
