import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { JSDOM } from "jsdom";
import ts from "typescript";

function altProblem(value) {
  if (value === null || value === undefined) return "missing alt attribute";
  const text = value.trim();
  if (!text) return "empty alt text";
  const plain = /^(?:image|photo(?:graph)?|picture|illustration|thumbnail|placeholder|img)[.!]?$/i;
  if (
    plain.test(text) ||
    /^(?:https?:\/\/|data:image\/)/i.test(text) ||
    /\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(text)
  ) {
    return "generic alt text or image filename";
  }
  return null;
}

export function auditImageHtml(html, page) {
  const dom = new JSDOM(html);
  try {
    const images = [...dom.window.document.querySelectorAll("img")];
    const issues = [];
    let decorative = 0;
    for (const img of images) {
      const src = img.getAttribute("src") ?? "(no src)";
      const alt = img.getAttribute("alt");
      const marked = img.getAttribute("data-decorative-image") === "true";
      const hidden = img.getAttribute("aria-hidden") === "true";
      if (marked) {
        if (alt === "" && hidden) decorative++;
        else issues.push(`${page}: invalid decorative image exemption: ${src}`);
        continue;
      }
      const problem = altProblem(alt);
      if (problem) issues.push(`${page}: ${problem}: ${src}`);
    }
    return { images: images.length, decorative, issues };
  } finally {
    dom.window.close();
  }
}

function literalValue(attribute) {
  const value = attribute?.initializer;
  if (!value) return undefined;
  if (ts.isStringLiteral(value)) return value.text;
  if (ts.isJsxExpression(value) && value.expression && ts.isStringLiteralLike(value.expression)) {
    return value.expression.text;
  }
  return undefined;
}

// Catch omissions even in client-only JSX and conditional rendering branches.
export function auditImageSource(text, path) {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let images = 0;
  const issues = [];
  function visit(node) {
    if (
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
      node.tagName.getText(source) === "img"
    ) {
      images++;
      const attributes = node.attributes.properties.filter(ts.isJsxAttribute);
      const attr = (name) => attributes.find((item) => item.name.getText(source) === name);
      const alt = attr("alt");
      const value = literalValue(alt);
      const marked = literalValue(attr("data-decorative-image")) === "true";
      const hidden = literalValue(attr("aria-hidden")) === "true";
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      const location = `${path}:${line}`;
      if (marked) {
        if (value !== "" || !hidden) {
          issues.push(location + ": invalid decorative image exemption");
        }
      } else if (!alt || !alt.initializer) {
        issues.push(location + ": missing alt attribute");
      } else if (value !== undefined) {
        const problem = altProblem(value);
        if (problem) issues.push(location + ": " + problem);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return { images, issues };
}

export function verifyImageAlts({ root, paths }) {
  const issues = [];
  let sourceFiles = 0;
  let sourceImages = 0;
  function walk(dir) {
    for (const item of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, item.name);
      if (item.isDirectory()) {
        if (!["test", "tests", "__tests__", "generated"].includes(item.name)) walk(path);
      } else if (/\.[jt]sx$/.test(item.name) && !/\.(?:test|spec)\./.test(item.name)) {
        sourceFiles++;
        const result = auditImageSource(readFileSync(path, "utf8"), path);
        sourceImages += result.images;
        issues.push(...result.issues);
      }
    }
  }
  walk("src");
  console.log(
    "Image alt source audit: " +
      sourceFiles +
      " files, " +
      sourceImages +
      " JSX images, " +
      issues.length +
      " issues.",
  );

  let images = 0;
  let decorative = 0;
  for (const page of paths) {
    const file = join(root, page === "/" ? "index.html" : page.slice(1) + "index.html");
    const result = auditImageHtml(readFileSync(file, "utf8"), page);
    images += result.images;
    decorative += result.decorative;
    issues.push(...result.issues);
  }
  console.log(
    "Image alt HTML audit: " +
      paths.size +
      " sitemap pages, " +
      images +
      " images, " +
      decorative +
      " decorative.",
  );
  console.log(`Image alt audit total issues: ${issues.length}.`);
  for (const issue of issues) console.error(issue);
  assert.equal(issues.length, 0, "Image alternative text audit failed");
}
