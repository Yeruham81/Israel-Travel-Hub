import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import ts from "typescript";
import { attractionGuides } from "@/data/attractionGuides";
import { travelGuides } from "@/data/travelGuides";

const srcRoot = resolve(process.cwd(), "src");

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(item => {
    const path = join(directory, item.name);
    if (item.isDirectory()) return item.name === "test" ? [] : sourceFiles(path);
    return /\.(tsx?|css)$/.test(item.name) && item.name !== "routeTree.gen.ts" ? [path] : [];
  });
}

const remoteImagePatterns = [
  // A literal remote URL assigned to a rendered image, image set or background.
  /\b(?:src|srcSet|imageSrc|imageUrl|image_url|backgroundImage)\b\s*[:=]\s*(?:\{\s*)?["'`]https?:\/\//i,
  /\burl\(\s*["']?https?:\/\//i,
  // Prevent regressions to the remote image hosts previously used in guides.
  /(?:thumb|upload)\.wikimedia\.org\/wikipedia\/commons/i,
  /(?:images\.unsplash\.com|source\.unsplash\.com|images\.pexels\.com|cdn\.pixabay\.com)/i,
];

/** Exempt only a literal map iframe src and the specific GA4 script assignment.
 * All other remote image assignments and legacy image hosts remain prohibited. */
function remoteImageViolations(file: string, source: string): number[] {
  const exempt: Array<[number, number]> = [];
  if (/\.tsx?$/.test(file)) {
    const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const visit = (node: ts.Node) => {
      if (ts.isJsxAttribute(node) && node.name.getText(tree) === "src") {
        const element = node.parent.parent;
        if (ts.isJsxOpeningElement(element) || ts.isJsxSelfClosingElement(element)) {
          const tag = element.tagName.getText(tree);
          const literal = node.initializer && (ts.isJsxExpression(node.initializer) ? node.initializer.expression : node.initializer);
          if ((tag === "iframe" || tag === "ConsentIframe") && literal && ts.isStringLiteralLike(literal) &&
              /^https:\/\/maps\.google\.com\//.test(literal.text)) {
            exempt.push([node.getStart(tree), node.end]);
          }
        }
      }
      if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
          ts.isPropertyAccessExpression(node.left) && node.left.expression.getText(tree) === "script" &&
          node.left.name.text === "src" && ts.isStringLiteralLike(node.right) &&
          /^https:\/\/www\.googletagmanager\.com\/gtag\/js(?:\?|$)/.test(node.right.text)) {
        exempt.push([node.getStart(tree), node.end]);
      }
      // GA4's URL includes an interpolated measurement ID.
      if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
          ts.isPropertyAccessExpression(node.left) && node.left.expression.getText(tree) === "script" &&
          node.left.name.text === "src" && ts.isTemplateExpression(node.right) &&
          /^https:\/\/www\.googletagmanager\.com\/gtag\/js\?/.test(node.right.head.text)) {
        exempt.push([node.getStart(tree), node.end]);
      }
      ts.forEachChild(node, visit);
    };
    visit(tree);
  }
  let inspected = source;
  for (const [start, end] of exempt.sort((a, b) => b[0] - a[0])) {
    inspected = inspected.slice(0, start) + inspected.slice(start, end).replace(/[^\r\n]/g, " ") + inspected.slice(end);
  }
  const violations = new Set<number>();
  for (const pattern of remoteImagePatterns) {
    for (const match of inspected.matchAll(new RegExp(pattern.source, pattern.flags + "g"))) {
      violations.add(source.slice(0, match.index).split(/\r?\n/).length);
    }
  }
  return [...violations].sort((a, b) => a - b);
}

describe("local-only image asset policy", () => {
  it("never reintroduces the retired Old City photo in cards or responsive assets", () => {
    const retiredImports = [
      "assets/jerusalem/old-city.webp",
      "assets/travel-blog-hub/old-city-1038598496-420.webp",
    ];
    const offenders: string[] = [];
    for (const file of sourceFiles(srcRoot)) {
      const source = readFileSync(file, "utf8");
      if (retiredImports.some((asset) => source.includes(asset))) {
        offenders.push(relative(process.cwd(), file));
      }
    }
    expect(offenders).toEqual([]);
  });
  it("distinguishes multiline map iframes and scripts from actual remote images", () => {
    const map = '<ConsentIframe\n  src="https://maps.google.com/maps?q=Akko"\n/>';
    const script = 'script.src = "https://www.googletagmanager.com/gtag/js?id=G-TEST";';
    expect(remoteImageViolations("probe.tsx", map)).toEqual([]);
    expect(remoteImageViolations("probe.ts", script)).toEqual([]);
    expect(remoteImageViolations("probe.tsx", '<img\n src="https://maps.google.com/maps?q=Akko"\n/>')).not.toEqual([]);
    expect(remoteImageViolations("probe.tsx", '<img src=\n"https://example.org/remote.webp" />')).not.toEqual([]);
    expect(remoteImageViolations("probe.tsx", map + '\n<img src="https://example.org/remote.webp"/>')).not.toEqual([]);
    expect(remoteImageViolations("probe.tsx", '<ConsentIframe src="https://images.unsplash.com/photo-test"/>')).not.toEqual([]);
  });

  it("never hotlinks images in authored source", () => {
    const violations: string[] = [];
    for (const file of sourceFiles(srcRoot)) {
      for (const line of remoteImageViolations(file, readFileSync(file, "utf8"))) {
        violations.push(relative(process.cwd(), file) + ":" + line);
      }
    }
    expect(violations).toEqual([]);
  });

  it("has a real public file for every literal /images/ photo reference in authored source", () => {
    const missing: string[] = [];
    const legacy: string[] = [];
    const imagePathPattern = /\/images\/[a-zA-Z0-9_./-]+\.(?:webp|avif|jpe?g|png|gif|svg)/g;
    for (const file of sourceFiles(srcRoot)) {
      const lines = readFileSync(file, "utf8").split(/\r?\n/);
      lines.forEach((line, index) => {
        for (const match of line.matchAll(imagePathPattern)) {
          const url = match[0];
          const location = `${relative(process.cwd(), file)}:${index + 1} -> ${url}`;
          if (!existsSync(resolve(process.cwd(), "public", url.slice(1)))) missing.push(location);
          if (url.startsWith("/images/guides/")) legacy.push(location);
        }
      });
    }
    expect(missing).toEqual([]);
    expect(legacy).toEqual([]);
  });

  it("keeps every attraction and travel-guide image on the project's own origin", () => {
    const allImages = [
      ...Object.values(attractionGuides).flatMap(guide => guide.image ? [guide.image.src] : []),
      ...Object.values(travelGuides).flatMap(guide => [
        ...(guide.photo?.src ? [guide.photo.src] : []),
        ...guide.sections.flatMap(section => section.photo?.src ? [section.photo.src] : []),
      ]),
    ];
    expect(allImages.length).toBeGreaterThan(60);
    expect(allImages.filter(src => /^https?:\/\//i.test(src))).toEqual([]);
    expect(allImages.every(src => src.startsWith("/"))).toBe(true);
  });
});
